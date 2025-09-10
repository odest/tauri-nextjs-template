# Tauri + Next.js Monorepo Template

This is a modern monorepo template that combines Tauri for cross-platform desktop and mobile applications with Next.js for web development, all managed with pnpm workspaces and Turbo.

## 🚀 Features

- **🖥️ Cross-platform Desktop App** - Built with Tauri and Next.js
- **🌐 Web Application** - Pure Next.js web app
- **📦 Shared UI Components** - shadcn/ui components shared across apps
- **🔧 Monorepo Setup** - pnpm workspaces + Turborepo for optimal developer experience
- **⚡ Fast Development** - Turbo + Next.js Turbopack for lightning-fast builds
- **🎨 Modern UI** - Tailwind CSS + shadcn/ui components
- **📱 Responsive Design** - Works on all screen sizes
- **🔒 Type Safety** - Full TypeScript support
- **🚀 CI/CD Ready** - GitHub Actions with automated releases

## 📋 Prerequisites

- Node.js 20+
- pnpm 10+
- Rust (for Tauri desktop app)

## 🛠️ Quick Start

```bash
# Clone the repository
git clone https://github.com/odest/tauri-nextjs-template.git
cd tauri-nextjs-template

# Install dependencies
pnpm install

# Start development (starts both web and desktop apps)
pnpm dev

# Or start individual apps
pnpm --filter web dev      # Web app only
pnpm --filter native dev   # Desktop app only
```

## 📁 Project Structure

```
├── apps/
│   ├── native/             # Tauri + Next.js application
│   │   ├── src/            # Next.js frontend source
│   │   ├── src-tauri/      # Tauri backend source
│   │   └── package.json
│   └── web/                # Next.js web application
│       ├── app/            # Next.js app directory
│       └── package.json
├── packages/
│   ├── ui/                 # Shared shadcn/ui components
│   ├── eslint-config/      # Shared ESLint configuration
│   └── typescript-config/  # Shared TypeScript configuration
├── .github/                # GitHub Actions workflows
└── package.json            # Root package.json
```

## 🎯 Available Commands

```bash
# Development
pnpm dev                          # Start all apps in development mode
pnpm build                        # Build all apps and packages
pnpm lint                         # Run ESLint on all packages
pnpm check-types                  # Run TypeScript type checking
pnpm clean                        # Clean all build outputs

# Tauri specific
pnpm tauri                        # Run Tauri CLI commands
pnpm --filter native tauri dev    # Start Tauri app in development

# UI Components
pnpm shadcn                       # Add shadcn/ui components to the UI package
```

## 🧩 Adding shadcn/ui Components

To add new shadcn/ui components to your project:

```bash
# Add to the shared UI package
pnpm shadcn add button

# The component will be available in all apps as:
import { Button } from "@workspace/ui/components/button"
```

## 🔄 Release Process

This project uses [release-please](https://github.com/googleapis/release-please) for automated releases:

1. Make changes and commit using [Conventional Commits](https://www.conventionalcommits.org/)
2. Push to the `master` branch
3. release-please will create a release PR
4. Merge the release PR to create a new release
5. GitHub Actions will automatically build and publish desktop and mobile app binaries

### Commit Convention

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions or changes
- `chore:` - Maintenance tasks

## 🔧 Configuration

### Tauri Configuration

Edit `apps/native/src-tauri/tauri.conf.json` to customize:

- App name and identifier
- Window settings
- Security policies
- Build options

### Next.js Configuration

Both apps use Next.js 15 with:

- App Router
- Turbopack (in development)
- TypeScript
- Tailwind CSS

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Create an [issue](https://github.com/your-username/tauri-nextjs-template/issues) for bug reports or feature requests
