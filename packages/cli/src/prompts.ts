import * as p from "@clack/prompts";
import pc from "picocolors";
import { DEFAULT_VERSION } from "./consts.js";
import {
  validateProjectName,
  validateVersion,
  validateIdentifier,
  toPascalCase,
  toSnakeCase,
} from "./utils/validate.js";

export interface ScaffoldOptions {
  projectName: string;
  projectNamePascal: string;
  projectNameSnake: string;
  directory: string;
  githubUser: string;
  identifier: string;
  version: string;
  installDeps: boolean;
}

/**
 * Run interactive prompts and return the scaffold options.
 * If the user cancels at any point, the process exits.
 */
export async function runPrompts(
  defaultDir?: string,
): Promise<ScaffoldOptions> {
  while (true) {
    const projectName = await p.text({
      message: "What is your project name?",
      placeholder: "my-awesome-app",
      validate: validateProjectName,
    });
    if (p.isCancel(projectName)) {
      p.cancel("Setup cancelled.");
      process.exit(0);
    }

    const directory = defaultDir ?? `./${projectName}`;

    const defaultIdentifier = `com.${toSnakeCase(projectName)}.app`;
    const identifier = await p.text({
      message: "App identifier (reverse-domain)?",
      placeholder: defaultIdentifier,
      defaultValue: defaultIdentifier,
      validate: validateIdentifier,
    });
    if (p.isCancel(identifier)) {
      p.cancel("Setup cancelled.");
      process.exit(0);
    }

    const githubUser = await p.text({
      message: "GitHub username / org (optional)?",
      placeholder: "your-github-username",
      defaultValue: "your-github-username",
    });
    if (p.isCancel(githubUser)) {
      p.cancel("Setup cancelled.");
      process.exit(0);
    }

    const version = await p.text({
      message: "Initial version?",
      placeholder: DEFAULT_VERSION,
      defaultValue: DEFAULT_VERSION,
      validate: validateVersion,
    });
    if (p.isCancel(version)) {
      p.cancel("Setup cancelled.");
      process.exit(0);
    }

    const installDeps = await p.confirm({
      message: "Install dependencies?",
      initialValue: true,
    });
    if (p.isCancel(installDeps)) {
      p.cancel("Setup cancelled.");
      process.exit(0);
    }

    const opts: ScaffoldOptions = {
      projectName,
      projectNamePascal: toPascalCase(projectName),
      projectNameSnake: toSnakeCase(projectName),
      directory,
      githubUser,
      identifier,
      version,
      installDeps,
    };

    // Summary
    p.note(
      [
        `${pc.bold("Project")}       ${opts.projectName}`,
        `${pc.bold("Directory")}     ${opts.directory}`,
        `${pc.bold("GitHub user")}   ${opts.githubUser}`,
        `${pc.bold("Identifier")}    ${opts.identifier}`,
        `${pc.bold("Version")}       ${opts.version}`,
        `${pc.bold("Install deps")}  ${opts.installDeps ? "yes" : "no"}`,
      ].join("\n"),
      "Summary",
    );

    const confirmed = await p.confirm({
      message: "Proceed with these settings?",
      initialValue: true,
    });

    if (p.isCancel(confirmed)) {
      p.cancel("Setup cancelled.");
      process.exit(0);
    }

    if (confirmed) {
      return opts;
    }

    // If not confirmed, it loops back to the beginning.
    p.log.info("Let's try that again...");
  }
}
