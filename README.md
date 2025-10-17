<div align="center">
  <picture>
    <source srcset=".github/assets/light.svg" media="(prefers-color-scheme: dark)">
    <source srcset=".github/assets/dark.svg" media="(prefers-color-scheme: light)">
    <img src=".github/assets/dark.svg" alt="Tauri + Next.js Template" width="800">
  </picture>
</div>

<div align="center">
  
  # Tauri + Next.js Monorepo Template

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-green.svg)](https://opensource.org/licenses/GPL-3.0)
[![Version](https://img.shields.io/github/v/release/odest/tauri-nextjs-template?label=Version&color=orange.svg)](https://github.com/odest/tauri-nextjs-template/releases/latest)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Desktop%20%7C%20Mobile-blue.svg)](https://github.com/odest/tauri-nextjs-template)
[![Made with](https://img.shields.io/badge/Made%20with-Tauri%20%7C%20Next.js%20%7C%20Rust-red.svg)](https://tauri.app)

**This is a modern monorepo template that combines Tauri for cross-platform desktop and mobile applications with Next.js for web development, all managed with pnpm workspaces and Turbo.**

</div>

## Table of Contents

- [🚀 Features](#-features)
- [📋 Prerequisites](#-prerequisites)
- [🛠️ Quick Start](#️-quick-start)
  - [Step 1: Create Your Repository](#step-1-create-your-repository)
  - [Step 2: Clone and Initialize Your Project](#step-2-clone-and-initialize-your-project)
  - [Step 3: Configure Android Signing (REQUIRED for Android Builds)](#step-3-configure-android-signing-required-for-android-builds)
  - [Step 4: Start Building!](#step-4-start-building-)
- [📁 Project Structure](#-project-structure)
- [🎯 Available Commands](#-available-commands)
- [🧩 Adding shadcn/ui Components](#-adding-shadcnui-components)
- [🌍 Internationalization (i18n)](#-internationalization-i18n)
- [🔄 Release Process](#-release-process)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🚀 Features

- **🖥️ Cross-platform Desktop App** - Built with Tauri and Next.js
- **🌐 Web Application** - Pure Next.js web app
- **📦 Shared UI Components** - shadcn/ui components shared across apps
- **🔧 Monorepo Setup** - pnpm workspaces + Turborepo for optimal developer experience
- **⚙️ Automated Setup** - One-command project initialization
- **⚡ Fast Development** - Turbo + Next.js Turbopack for lightning-fast builds
- **🎨 Modern UI** - Tailwind CSS + shadcn/ui components
- **📱 Responsive Design** - Works on all screen sizes
- **🔒 Type Safety** - Full TypeScript support
- **🌍 Internationalization** - Multi-language support with next-intl (10 languages included)
- **🚀 CI/CD Ready** - GitHub Actions with automated releases

## 📋 Prerequisites

> [!NOTE]
> For detailed information you can refer to Tauri's official documents: [Prerequisites](https://tauri.app/start/prerequisites/)

Before you begin, ensure you have the following installed:

- **Node.js** (v22 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - [Install Guide](https://pnpm.io/installation)
- **Rust** (latest stable) - [Install Guide](https://www.rust-lang.org/tools/install)

**Optional for Mobile Development:**

- **Xcode** (for iOS development) - [Download](https://developer.apple.com/xcode/)
- **Android Studio** (for Android development) - [Download](https://developer.android.com/studio)

## 🛠️ Quick Start

### Step 1: Create Your Repository

First, create your own repository from this template:

1. **Use this template**: Click the "Use this template" button on GitHub, or fork the repository to create your own copy.

2. **Configure GitHub Actions permissions**: After creating your repository, go to:
   - `Settings` → `Actions` → `General` → `Workflow permissions`
   - Enable **"Read and write permissions"**
   - Enable **"Allow GitHub Actions to create and approve pull requests"**

> [!WARNING]
> If these options are grayed out, your organization or enterprise may have restricted these permissions. Check with your organization/enterprise settings first.

This configuration is required for `release-please` to automatically create release pull requests.

### Step 2: Clone and Initialize Your Project

#### Windows (PowerShell)

```powershell
# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Run the initialization script
.\init-project.ps1

# Install dependencies
pnpm install

# Start development
pnpm dev
```

#### Linux / macOS (Bash)

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Make the script executable and run it
chmod +x init-project.sh
./init-project.sh

# Install dependencies
pnpm install

# Start development
pnpm dev
```

The initialization script will:

- ✅ Ask for your project name (lowercase, hyphens allowed)
- ✅ Ask for initial version (default: 0.1.0)
- ✅ Optionally update GitHub username references
- ✅ Update all configuration files automatically
- ✅ Optionally rewrite initial commit and create refactor commit

> [!IMPORTANT]
> **After running the initialization script and pushing the refactor commit**, release-please will automatically create a Pull Request titled something like `chore: release master`. **DO NOT MERGE THIS PR YET!** You must first complete Step 3 (Android signing configuration) or disable the Android build workflow, otherwise the GitHub Actions that build Android will fail.

### Step 3: Configure Android Signing (REQUIRED for Android Builds)

> [!WARNING]
> **This step is REQUIRED if you want to build Android apps.** The GitHub Actions workflow includes Android builds by default. If you skip this step, the workflow will fail when you merge the release-please PR.
>
> **You have two options:**
>
> 1. **Complete the Android signing setup** (recommended if you plan to build Android apps)
> 2. **Disable the Android build** in `.github/workflows/release.yml` by commenting out or removing the Android build jobs

If you plan to build Android apps, you need to set up the code signing. The codebase is already prepared for this signing; you just need to perform the following steps:

#### 3.1. Generate a Keystore File

> [!NOTE]
> For detailed information please checkout the official [Tauri Android signing documentation](https://tauri.app/distribute/sign/android/) to create your keystore. This is a summary.

**Linux/macOS:**

```bash
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

**Windows (PowerShell):**

```powershell
keytool -genkey -v -keystore $env:USERPROFILE\upload-keystore.jks -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

**Windows (CMD):**

```cmd
keytool -genkey -v -keystore "%USERPROFILE%\upload-keystore.jks" -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

#### 3.2. Create Keystore Properties File

Create a file named `apps/native/src-tauri/gen/android/keystore.properties` with your keystore information:

```properties
storePassword=<your store password defined when keytool was executed>
keyPassword=<your key password defined when keytool was executed>
keyAlias=<your key alias defined when keytool was executed>
storeFile=<location of the key store file, such as /Users/<user name>/upload-keystore.jks or C:\\Users\\<user name>\\upload-keystore.jks>
```

> [!WARNING]
> Keep the `keystore.properties` file confidential. To prevent sensitive information from being stored, the file has been added to the `.gitignore` file.

#### 3.3. Convert Keystore to Base64

Convert your keystore file to Base64 format:

**Linux/macOS:**

```bash
base64 -i ~/upload-keystore.jks -o keystore.base64.txt
```

**Windows (PowerShell):**

```powershell
certutil -encode upload-keystore.jks keystore.base64.txt
```

> [!WARNING]
> The `certutil` command adds `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` headers to the output, which should be removed.

#### 3.4. Add GitHub Secrets

Add the following secrets to your GitHub repository:

1. Go to: `Settings` → `Secrets and variables` → `Actions` → `Repository secrets`
2. Click "New repository secret" and add these 5 secrets:

| Secret Name      | Description                                 | Example Value                      |
| ---------------- | ------------------------------------------- | ---------------------------------- |
| `BASE64_JKS`     | Base64-encoded keystore file content        | (content from keystore.base64.txt) |
| `KEY_ALIAS`      | Key alias set during keystore creation      | `upload`                           |
| `KEY_PASSWORD`   | Key password set during keystore creation   | `your-key-password`                |
| `STORE_FILE`     | Keystore file name                          | `~/home/odest/upload-keystore.jks` |
| `STORE_PASSWORD` | Store password set during keystore creation | `your-store-password`              |

> [!WARNING]
> Never commit your keystore file or passwords to your repository. Always use GitHub Secrets for sensitive information.

#### 3.5. Merge the Release PR

After completing the Android signing setup (or disabling the Android build), you can now safely merge the release-please Pull Request:

1. Go to your repository on GitHub
2. Navigate to the **Pull Requests** tab
3. Find the PR titled `chore: release master` created by release-please
4. Review the changes in the PR
5. Click **Merge pull request**

Once merged, GitHub Actions will automatically:

- Build your desktop app (Windows, macOS, Linux)
- Build your Android app (if signing is configured)
- Create a new GitHub release with all binaries attached

> [!TIP]
> If you don't plan to build Android apps immediately, you can disable the Android build in `.github/workflows/release.yml` and complete the signing setup later when needed.

### Step 4: Start Building! 🚀

You're all set! Now you can start developing your app:

```bash
# Desktop app development
pnpm tauri dev

# Web app development
pnpm --filter web dev

# Build for production
pnpm build
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
│   ├── i18n/               # Internationalization package
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
pnpm tauri dev                    # Start Tauri app in development

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

## 🌍 Internationalization (i18n)

This template includes built-in support for 10 languages:

- 🇬🇧 English
- 🇹🇷 Turkish
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇩🇪 German
- 🇵🇹 Portuguese
- 🇮🇹 Italian
- 🇷🇺 Russian
- 🇯🇵 Japanese
- 🇨🇳 Chinese (Simplified)

**Note:** Current translations were generated using AI and may need review for accuracy.

### Usage

```typescript
// Import translations
import { useTranslations } from "@workspace/i18n";

// Use in components
function MyComponent() {
  const t = useTranslations("HomePage");
  return <h1>{t("title")}</h1>;
}
```

### Adding New Languages

1. Create a new JSON file in `packages/i18n/src/messages/[locale].json`
2. Add the locale configuration in `packages/i18n/src/routing.ts`
3. Import and export the messages in `packages/i18n/src/index.ts`

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

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
