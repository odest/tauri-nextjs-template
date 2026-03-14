export const TEMPLATE_SOURCE = "github:odest/tntstack#master";

export const DEFAULT_VERSION = "0.1.0";

/** Search terms used for automatic find-replace across the entire project. */
export const SEARCH_TERMS = {
  name: "tntstack",
  namePascal: "TNTStack",
  identifier: "com.tntstack.app",
  githubUser: "odest",
} as const;

/** Glob pattern to find Android Java package dirs that need renaming. */
export const ANDROID_PACKAGE_GLOB = "**/java/com/tntstack";

/**
 * Directories and files to skip when scanning for replacements.
 * Binary files, lock files, and build artifacts are excluded.
 */
export const SKIP_PATTERNS = [
  "node_modules",
  ".git",
  "target",
  "dist",
  ".turbo",
  ".next",
  // Binary / non-text
  "*.png",
  "*.ico",
  "*.icns",
  "*.webp",
  "*.woff",
  "*.woff2",
  "*.ttf",
  "*.eot",
  "*.jar",
  "*.so",
  "*.dylib",
  "*.exe",
  "*.dll",
  // Lock files managed by tools (pnpm-lock will be regenerated)
  "pnpm-lock.yaml",
] as const;

/** Files/dirs to delete after cloning (relative to project root). */
export const FILES_TO_CLEAN = [
  "CHANGELOG.md",
  "packages/cli",
  ".github/FUNDING.yml",
  ".github/workflows/publish-cli.yml",
] as const;

/**
 * JSON config files that reference packages/cli.
 * The clean action removes these entries after deleting the CLI package.
 */
export const CLI_CONFIG_REFS = [
  "release-please-config.json",
  ".release-please-manifest.json",
] as const;
