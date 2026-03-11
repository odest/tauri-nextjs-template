# @tntstack/create-app

The official scaffolding CLI for [**TNT Stack**](https://tnt.odest.tech). The solid stack for building cross-platform apps. Write your code once and build for Web, Desktop, and Mobile.

## Usage

```bash
npm create @tntstack/app@latest
```

Or with other package managers:

```bash
pnpm create @tntstack/app@latest
yarn create @tntstack/app
npx @tntstack/create-app
bunx @tntstack/create-app
```

### Non-interactive

```bash
npm create @tntstack/app@latest -- --name my-app --github-user myuser --no-install
```

### Options

| Flag                       | Description                      |
| -------------------------- | -------------------------------- |
| `-n, --name <name>`        | Project name                     |
| `-d, --directory <dir>`    | Output directory                 |
| `-g, --github-user <user>` | GitHub username / org (optional) |
| `-i, --identifier <id>`    | App identifier (reverse-domain)  |
| `-v, --app-version <ver>`  | Initial version                  |
| `--no-install`             | Skip dependency installation     |

## What it does

1. Downloads the TNTStack core files from GitHub
2. Replaces all project identifiers with your values
3. Sets up Android package structure
4. Initialises a fresh git repository
5. Installs dependencies

## Links

- [Documentation](https://tnt.odest.tech/docs)
- [GitHub](https://github.com/odest/tntstack)
- [Issues](https://github.com/odest/tntstack/issues)
