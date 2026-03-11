<div align="center">
  <picture>
    <source srcset=".github/assets/light.svg" media="(prefers-color-scheme: dark)">
    <source srcset=".github/assets/dark.svg" media="(prefers-color-scheme: light)">
    <img src=".github/assets/dark.svg" alt="TNTStack" width="800">
  </picture>

  <br />

**One codebase. Every platform.**\
 Web, Windows, macOS, Linux, and Android — powered by Tauri, Next.js, and Rust.

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-green.svg)](https://opensource.org/licenses/GPL-3.0)
[![Version](https://img.shields.io/github/v/release/odest/tntstack?label=Version&color=orange)](https://github.com/odest/tntstack/releases/latest)
[![npm](https://img.shields.io/npm/v/@tntstack/create?label=CLI&color=CB3837)](https://www.npmjs.com/package/@tntstack/create)
[![Docs](https://img.shields.io/badge/Docs-tnt.odest.tech-blue)](https://tnt.odest.tech/docs)

</div>

---

## Quick Start

```bash
npm create @tntstack
```

or with other package managers:

```bash
pnpm create @tntstack
bunx @tntstack/create
```

The CLI walks you through project setup — naming, identifiers, versioning — then scaffolds a fully configured monorepo ready for development.

```bash
cd my-app
pnpm dev
```

> For prerequisites, Android signing, deployment, and more — see the **[Documentation](https://tnt.odest.tech/docs)**.

## What's Inside

```
apps/
  native/          Tauri + Next.js — desktop & Android
  web/             Next.js — web app & docs site
packages/
  ui/              Shared shadcn/ui components, 45+ themes
  i18n/            10-language i18n (next-intl)
  eslint-config/   Shared lint rules
  typescript-config/ Shared TS configs
```

## Highlights

- **Cross-platform** — Single codebase deploys to web, desktop (Windows/macOS/Linux), and Android via Tauri 2
- **Shared UI** — shadcn/ui + Radix primitives in a shared package, 45+ built-in themes with light/dark variants
- **i18n** — 10 languages out of the box with type-safe translations
- **Turborepo** — Dependency-aware build caching across the monorepo
- **CI/CD** — GitHub Actions with Release Please, automated builds for every platform
- **Type-safe** — Strict TypeScript end-to-end

## Core Commands

```bash
pnpm dev              # Start all apps
pnpm tauri dev        # Desktop app
pnpm build            # Build everything
pnpm shadcn add       # Add UI components
pnpm lint             # Lint all packages
pnpm clean            # Clean build outputs
```

## Documentation

Full guides, architecture details, and references are available at:

**[tnt.odest.tech/docs](https://tnt.odest.tech/docs)**

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[GPL-3.0](LICENSE)
