import * as p from "@clack/prompts";
import path from "node:path";
import fs from "fs-extra";
import type { ScaffoldOptions } from "./prompts.js";
import { cloneTemplate } from "./actions/clone.js";
import { renameProject } from "./actions/rename/index.js";
import { cleanFiles } from "./actions/clean.js";
import { initGit } from "./actions/git.js";
import { installDeps } from "./actions/install.js";

export async function scaffold(opts: ScaffoldOptions): Promise<void> {
  const projectDir = path.resolve(opts.directory);

  // Guard: target directory must be empty
  if (await fs.pathExists(projectDir)) {
    const entries = await fs.readdir(projectDir);
    if (entries.length > 0) {
      const overwrite = await p.confirm({
        message: `Directory ${opts.directory} is not empty. Overwrite?`,
        initialValue: false,
      });

      if (p.isCancel(overwrite) || !overwrite) {
        p.cancel("Setup cancelled.");
        process.exit(1);
      }
    }
  }

  const s = p.spinner();

  // 1. Download
  s.start("Downloading TNTStack core files…");
  try {
    await cloneTemplate(projectDir);
  } catch (err) {
    s.stop("Download failed.");
    p.cancel(
      err instanceof Error ? err.message : "Failed to download core files.",
    );
    process.exit(1);
  }
  s.stop("Core files downloaded.");

  // 2. Rename
  s.start("Configuring project…");
  await renameProject(projectDir, opts);
  s.stop("Project configured.");

  // 3. Clean
  s.start("Cleaning up…");
  await cleanFiles(projectDir);
  s.stop("Done.");

  // 4. Git
  s.start("Initialising git…");
  try {
    await initGit(projectDir);
    s.stop("Git ready.");
  } catch (err: unknown) {
    s.stop("Skipped git init.");
    p.log.warn(
      `Could not initialize git: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  // 5. Install
  if (opts.installDeps) {
    s.start("Installing dependencies…");
    try {
      await installDeps(projectDir);
      s.stop("Dependencies installed.");
    } catch (err: unknown) {
      s.stop("Dependency installation failed.");
      p.log.warn(
        `Could not install dependencies: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  // Done
  p.note(
    [
      `cd ${opts.directory}`,
      !opts.installDeps ? "pnpm install" : "",
      "pnpm dev",
    ]
      .filter(Boolean)
      .join("\n"),
    "Next steps",
  );

  p.outro("Your project is ready! 🚀");
}
