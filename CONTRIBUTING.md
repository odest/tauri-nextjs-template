# Contributing to Tauri Next.js Template

First off, thank you for considering contributing to this project!

## Development Process

We use GitHub flow, so all code changes happen through pull requests.

1. Fork the repo and create your branch from `master`.
2. Make your changes and add tests if applicable.
3. Ensure the test suite passes.
4. Ensure your code lints.
5. Issue that pull request!

## Development Setup

This project uses:

- **pnpm** for package management
- **Turbo** for monorepo build orchestration
- **Tauri** for desktop app development
- **Next.js** for web frontend

### Prerequisites

- Node.js 20+
- pnpm 10+
- Rust (for Tauri development)

### Setup

```bash
# Clone the repository
git clone https://github.com/odest/tauri-nextjs-template.git
cd tauri-nextjs-template

# Install dependencies
pnpm install

# Start development
pnpm dev
```

### Available Commands

- `pnpm dev` - Start development servers for all apps
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Run ESLint on all packages
- `pnpm check-types` - Run TypeScript type checking
- `pnpm clean` - Clean all build outputs
- `pnpm tauri` - Run Tauri CLI commands

### Project Structure

```
├── apps/
│   ├── native/              # Tauri + Next.js desktop app
│   └── web/                 # Next.js web app
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── eslint-config/       # Shared ESLint configuration
│   └── typescript-config/   # Shared TypeScript configuration
└── .github/                 # GitHub workflows and templates
```

## Pull Request Process

1. Update the README.md with details of changes to the interface (if applicable).
2. Update version numbers in package.json files following [SemVer](http://semver.org/).
3. The PR will be merged once you have the sign-off of at least one maintainer.

## Coding Standards

- Use TypeScript for all new code
- Follow the existing code style (we use Prettier and ESLint)
- Write meaningful commit messages
- Keep PRs focused and atomic

## Reporting Bugs

We use GitHub issues to track public bugs. Report a bug by opening a new issue with our bug report template.

## Feature Requests

We welcome feature requests! Please open an issue with our feature request template.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
