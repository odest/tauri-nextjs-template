import path from "node:path";
import fs from "fs-extra";
import * as p from "@clack/prompts";
import { SEARCH_TERMS, SKIP_PATTERNS } from "../consts.js";
import type { ScaffoldOptions } from "../prompts.js";

/**
 * Build ordered replacement pairs (longer/more-specific patterns first
 * so partial matches don't interfere).
 */
function buildReplacementMap(opts: ScaffoldOptions): [string, string][] {
  return [
    [SEARCH_TERMS.identifier, opts.identifier],
    ["tntstack_lib", `${opts.projectNameSnake}_lib`],
    [SEARCH_TERMS.namePascal, opts.projectNamePascal],
    [SEARCH_TERMS.githubUser, opts.githubUser],
    [SEARCH_TERMS.name, opts.projectName],
  ];
}

/** Check whether a path should be skipped (binary, build artifact, etc.). */
function shouldSkip(filePath: string): boolean {
  const normalized = filePath.replace(/\\/g, "/");
  const basename = path.basename(filePath);
  return SKIP_PATTERNS.some((pattern) => {
    if (pattern.startsWith("*.")) {
      return basename.endsWith(pattern.slice(1));
    }
    return basename === pattern || normalized.includes(`/${pattern}/`);
  });
}

/** Recursively list all files, respecting skip patterns. */
async function walkFiles(dir: string): Promise<string[]> {
  const results: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (shouldSkip(fullPath)) continue;
    if (entry.isDirectory()) {
      results.push(...(await walkFiles(fullPath)));
    } else if (entry.isFile()) {
      results.push(fullPath);
    }
  }
  return results;
}

function applyReplacements(content: string, map: [string, string][]): string {
  let result = content;
  for (const [from, to] of map) {
    result = result.replaceAll(from, to);
  }
  return result;
}

/**
 * Scan every text file in `projectDir`, replace template identifiers with the
 * user's values, update version fields, and rename Android Java package dirs.
 * Returns the number of files whose content was modified.
 */
export async function renameProject(
  projectDir: string,
  opts: ScaffoldOptions,
): Promise<void> {
  const map = buildReplacementMap(opts);
  const files = await walkFiles(projectDir);

  // 1. Replace file contents
  for (const file of files) {
    try {
      const content = await fs.readFile(file, "utf-8");
      const updated = applyReplacements(content, map);
      if (updated !== content) {
        await fs.writeFile(file, updated, "utf-8");
      }
    } catch (err: unknown) {
      if (err instanceof Error && !err.message.includes("is not valid UTF-8")) {
        p.log.warn(`Could not rename contents of ${file}: ${err.message}`);
      }
    }
  }

  // 2. Rename Android Java package directories
  await renameAndroidDirs(projectDir, opts);

  // 3. Update version fields in known config files
  await replaceVersions(projectDir, opts);
}

// ---------------------------------------------------------------------------
// Android directory rename
// ---------------------------------------------------------------------------

async function renameAndroidDirs(
  projectDir: string,
  opts: ScaffoldOptions,
): Promise<void> {
  const oldSegments = SEARCH_TERMS.identifier.split(".");
  const newSegments = opts.identifier.split(".");

  const androidGenDir = path.join(
    projectDir,
    "apps",
    "native",
    "src-tauri",
    "gen",
    "android",
  );
  if (!(await fs.pathExists(androidGenDir))) return;

  // Find every `java` directory under the Android gen tree
  const javaDirs = await findDirsByName(androidGenDir, "java");

  for (const javaDir of javaDirs) {
    const oldDir = path.join(javaDir, ...oldSegments);
    if (!(await fs.pathExists(oldDir))) continue;

    const newDir = path.join(javaDir, ...newSegments);
    await fs.ensureDir(path.dirname(newDir));
    await fs.move(oldDir, newDir, { overwrite: true });

    // Remove empty ancestor directories left behind
    await removeEmptyParents(path.dirname(oldDir), javaDir);
  }
}

async function findDirsByName(
  root: string,
  targetName: string,
): Promise<string[]> {
  const results: string[] = [];
  const entries = await fs.readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const full = path.join(root, entry.name);
    if (entry.name === targetName) {
      results.push(full);
    } else {
      results.push(...(await findDirsByName(full, targetName)));
    }
  }
  return results;
}

async function removeEmptyParents(dir: string, stopAt: string): Promise<void> {
  if (dir === stopAt || !dir.startsWith(stopAt)) return;
  try {
    const entries = await fs.readdir(dir);
    if (entries.length === 0) {
      await fs.rmdir(dir);
      await removeEmptyParents(path.dirname(dir), stopAt);
    }
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------------------------
// Targeted version replacement
// ---------------------------------------------------------------------------

async function replaceVersions(
  projectDir: string,
  opts: ScaffoldOptions,
): Promise<void> {
  // All package.json files – update the `version` field
  const pkgFiles = await findFilesByName(projectDir, "package.json");
  for (const pkgPath of pkgFiles) {
    try {
      const pkg = await fs.readJson(pkgPath);
      if (pkg.version) {
        pkg.version = opts.version;
        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
      }
    } catch (err: unknown) {
      p.log.warn(
        `Failed to update version in ${pkgPath}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  // .release-please-manifest.json
  const manifestPath = path.join(projectDir, ".release-please-manifest.json");
  if (await fs.pathExists(manifestPath)) {
    try {
      const manifest = await fs.readJson(manifestPath);
      for (const key of Object.keys(manifest)) {
        manifest[key] = opts.version;
      }
      await fs.writeJson(manifestPath, manifest, { spaces: 2 });
    } catch (err: unknown) {
      p.log.warn(
        `Failed to update .release-please-manifest.json: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  // Cargo.toml
  const cargoPath = path.join(
    projectDir,
    "apps",
    "native",
    "src-tauri",
    "Cargo.toml",
  );
  if (await fs.pathExists(cargoPath)) {
    try {
      let cargo = await fs.readFile(cargoPath, "utf-8");
      cargo = cargo.replace(
        /^version\s*=\s*"[^"]*"/m,
        `version = "${opts.version}"`,
      );
      await fs.writeFile(cargoPath, cargo, "utf-8");
    } catch (err: unknown) {
      p.log.warn(
        `Failed to update Cargo.toml: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  // Cargo.lock
  const cargoLockPath = path.join(
    projectDir,
    "apps",
    "native",
    "src-tauri",
    "Cargo.lock",
  );
  if (await fs.pathExists(cargoLockPath)) {
    try {
      let cargoLock = await fs.readFile(cargoLockPath, "utf-8");
      const regex = new RegExp(
        `(name = "${opts.projectName}"\\s+version = )([^\\s]+)`,
        "g",
      );
      cargoLock = cargoLock.replace(regex, `$1"${opts.version}"`);
      await fs.writeFile(cargoLockPath, cargoLock, "utf-8");
    } catch (err: unknown) {
      p.log.warn(
        `Failed to update Cargo.lock: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  // tauri.conf.json
  const tauriConf = path.join(
    projectDir,
    "apps",
    "native",
    "src-tauri",
    "tauri.conf.json",
  );
  if (await fs.pathExists(tauriConf)) {
    try {
      const conf = await fs.readJson(tauriConf);
      if (conf.version) conf.version = opts.version;
      await fs.writeJson(tauriConf, conf, { spaces: 2 });
    } catch (err: unknown) {
      p.log.warn(
        `Failed to update tauri.conf.json: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
}

async function findFilesByName(root: string, name: string): Promise<string[]> {
  const results: string[] = [];
  const entries = await fs.readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (shouldSkip(full)) continue;
      results.push(...(await findFilesByName(full, name)));
    } else if (entry.name === name) {
      results.push(full);
    }
  }
  return results;
}
