# create-catalyzer

Scaffolding CLI for [Catalyzer](https://github.com/odest/catalyzer). Creates a new cross-platform monorepo project (Web + Desktop + Mobile) from the Catalyzer.

## Usage

```bash
npm create catalyzer@latest
```

<details>
<summary>Other package managers</summary>

```bash
pnpm create catalyzer@latest
yarn create catalyzer@latest
npx create-catalyzer@latest
bunx create-catalyzer@latest
```

</details>

<br>

The CLI walks you through project name, GitHub username, app identifier, and version interactively. You can also skip the prompts:

```bash
npm create catalyzer@latest --name <your-project-name> --github-user <your-github-username> --no-install
```

### Options

| Flag                       | Description                         | Default                |
| -------------------------- | ----------------------------------- | ---------------------- |
| `-n, --name <name>`        | Project name                        | _(prompted)_           |
| `-d, --directory <dir>`    | Output directory                    | `./<name>`             |
| `-i, --identifier <id>`    | App identifier (reverse-domain)     | `com.<name>.app`       |
| `-g, --github-user <user>` | GitHub username or org              | `your-github-username` |
| `-v, --app-version <ver>`  | Initial version                     | `0.1.0`                |
| `--no-install`             | Skip dependency installation (pnpm) |                        |
| `--no-git`                 | Skip git initialization             |                        |
| `-b, --branch <branch>`    | Template branch to clone            | `master`               |

## What It Does

1. Downloads the Catalyzer template from GitHub
2. Replaces branded content with clean starter files (shadow templates)
3. Replaces all project identifiers and names with your values
4. Restructures mobile directories (Android and iOS) and updates versions across all config files
5. Cleans up scaffold-only files and repo references
6. Initializes git and optionally installs dependencies

## What's Next?

Once the project is scaffolded, navigate to your new directory and start the development servers:

```bash
cd <your-project-name>

# Run this only if you skipped dependency installation during scaffolding
pnpm install
```

### Start Developing

```bash
pnpm dev
```

### Configuration

Before deploying or sharing your project, update the site metadata (URLs, headline, and description) in:
`packages/core/src/config/site.ts`

## Links

- [Documentation](https://catalyzer.dev/docs)
- [GitHub](https://github.com/odest/catalyzer)
- [Issues](https://github.com/odest/catalyzer/issues)

## License

[MIT](https://github.com/odest/catalyzer/blob/master/LICENSE)
