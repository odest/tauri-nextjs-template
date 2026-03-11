# @tntstack/create

The official scaffolding CLI for [**TNT Stack**](https://tnt.odest.tech). The ultimate stack for building cross-platform apps. Write your code once and deploy to Web, Windows, macOS, Linux, and Android.

## Usage

```bash
npm create @tntstack
```

Or with other package managers:

```bash
pnpm create @tntstack
yarn create @tntstack
npx @tntstack/create
bunx @tntstack/create
```

### Non-interactive

```bash
npm create @tntstack -- --name my-app --github-user myuser --no-install
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
