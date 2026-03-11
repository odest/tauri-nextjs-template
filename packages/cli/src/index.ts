#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";
import * as p from "@clack/prompts";
import { runPrompts } from "./prompts.js";
import { scaffold } from "./scaffold.js";
import {
  toPascalCase,
  toSnakeCase,
  validateProjectName,
  validateVersion,
} from "./utils/validate.js";
import { DEFAULT_VERSION, SEARCH_TERMS } from "./consts.js";

const banner = `
  ████████╗███╗   ██╗████████╗███████╗████████╗ █████╗  ██████╗██╗  ██╗
  ╚══██╔══╝████╗  ██║╚══██╔══╝██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
     ██║   ██╔██╗ ██║   ██║   ███████╗   ██║   ███████║██║     █████╔╝ 
     ██║   ██║╚██╗██║   ██║   ╚════██║   ██║   ██╔══██║██║     ██╔═██╗ 
     ██║   ██║ ╚████║   ██║   ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
     ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
`;

const program = new Command()
  .name("tntstack")
  .description("Scaffold a new TNTStack project")
  .version("0.1.2")
  .option("-n, --name <name>", "Project name")
  .option("-d, --directory <dir>", "Output directory")
  .option("-g, --github-user <user>", "GitHub username / org")
  .option("-i, --identifier <id>", "App identifier (reverse-domain)")
  .option("-v, --app-version <ver>", "Initial version")
  .option("--no-install", "Skip dependency installation")
  .action(async (flags) => {
    console.clear();
    console.log(pc.cyan(banner));
    p.intro(pc.bold(pc.green("TNTStack Scaffold Tool")));

    if (flags.name) {
      // Non-interactive mode
      const nameErr = validateProjectName(flags.name);
      if (nameErr) {
        p.cancel(nameErr);
        process.exit(1);
      }
      if (flags.appVersion) {
        const verErr = validateVersion(flags.appVersion);
        if (verErr) {
          p.cancel(verErr);
          process.exit(1);
        }
      }

      await scaffold({
        projectName: flags.name,
        projectNamePascal: toPascalCase(flags.name),
        projectNameSnake: toSnakeCase(flags.name),
        directory: flags.directory ?? `./${flags.name}`,
        githubUser: flags.githubUser ?? "your-github-username",
        identifier: flags.identifier ?? `com.${flags.name}.app`,
        version: flags.appVersion ?? DEFAULT_VERSION,
        installDeps: flags.install ?? true,
      });
    } else {
      // Interactive mode
      const opts = await runPrompts(flags.directory);
      await scaffold(opts);
    }
  });

program.parse();
