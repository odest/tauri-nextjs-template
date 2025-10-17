#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                       ║${NC}"
echo -e "${BLUE}║     Tauri + Next.js Template Initialization           ║${NC}"
echo -e "${BLUE}║                                                       ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if this is a git repository
IS_GIT_REPO=false
SHOULD_UPDATE_INITIAL_COMMIT=false
SHOULD_COMMIT_CHANGES=false

if [ -d ".git" ]; then
    IS_GIT_REPO=true
    echo -e "${BLUE}Git repository detected!${NC}"
    echo ""
    
    # Check if there's only one commit (initial commit)
    COMMIT_COUNT=$(git rev-list --count HEAD 2>/dev/null)
    if [ "$COMMIT_COUNT" = "1" ]; then
        CURRENT_COMMIT_MESSAGE=$(git log -1 --pretty=%B | tr -d '\n')
        echo -e "${YELLOW}Current initial commit message:${NC}"
        echo -e "  '${CURRENT_COMMIT_MESSAGE}'"
        echo ""
        echo -e "${YELLOW}New commit message will be:${NC}"
        echo -e "  ${GREEN}'chore: initialize project using tauri-nextjs-template'${NC}"
        echo ""
        
        read -p "Update initial commit message? (Y/n): " -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$|^$ ]]; then
            SHOULD_UPDATE_INITIAL_COMMIT=true
        fi
    fi
    
    echo ""
fi

# Get project name
while true; do
    echo -e "${YELLOW}Enter your project name (lowercase, use hyphens):${NC}"
    read -p "> " PROJECT_NAME
    
    if [ -z "$PROJECT_NAME" ]; then
        echo -e "${RED}Project name cannot be empty!${NC}"
        continue
    fi
    
    # Validate project name (lowercase, numbers, hyphens)
    if [[ ! "$PROJECT_NAME" =~ ^[a-z0-9-]+$ ]]; then
        echo -e "${RED}Invalid project name! Use only lowercase letters, numbers, and hyphens.${NC}"
        continue
    fi
    
    break
done

# Get GitHub username
echo ""
echo -e "${YELLOW}Enter your GitHub username (default: skip):${NC}"
read -p "> " GITHUB_USERNAME

# Get version
echo ""
echo -e "${YELLOW}Enter initial version (default: 0.1.0):${NC}"
read -p "> " VERSION
VERSION=${VERSION:-0.1.0}

# Validate version format
if [[ ! "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo -e "${RED}Invalid version format! Using default: 0.1.0${NC}"
    VERSION="0.1.0"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Project Name: ${PROJECT_NAME}${NC}"
echo -e "${GREEN}Version: ${VERSION}${NC}"
if [ -n "$GITHUB_USERNAME" ]; then
    echo -e "${GREEN}GitHub Username: ${GITHUB_USERNAME}${NC}"
fi
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""

read -p "Continue? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Initialization cancelled.${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Starting initialization...${NC}"
echo ""

# Update initial commit if requested
if [ "$SHOULD_UPDATE_INITIAL_COMMIT" = true ]; then
    echo -e "${YELLOW}[Git] Updating initial commit message...${NC}"
    if git commit --amend -m "chore: initialize project using tauri-nextjs-template" 2>/dev/null; then
        echo -e "${GREEN}[OK] Initial commit message updated${NC}"
        
        # Ask to force push
        echo ""
        read -p "Force push to remote? (y/N): " -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${YELLOW}[Git] Force pushing to remote...${NC}"
            if git push --force 2>/dev/null; then
                echo -e "${GREEN}[OK] Successfully pushed to remote${NC}"
            else
                echo -e "${YELLOW}[WARN] Could not push to remote (this is ok if no remote is set)${NC}"
            fi
        fi
    else
        echo -e "${RED}[FAIL] Could not update commit message${NC}"
    fi
    echo ""
fi

# Delete CHANGELOG files
echo -e "${YELLOW}[Cleaning] Removing CHANGELOG files...${NC}"
rm -f "CHANGELOG.md" "apps/native/CHANGELOG.md" "packages/ui/CHANGELOG.md" 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}[OK] Deleted CHANGELOG files${NC}"
fi
echo ""

# Create snake_case and PascalCase versions
PROJECT_NAME_SNAKE=$(echo "$PROJECT_NAME" | tr '-' '_')

# Function to update file
update_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo -e "${YELLOW}[Updating] ${description}${NC}"
        
        # Use different sed syntax for macOS vs Linux
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            # Replace project names
            sed -i '' "s/tauri-nextjs-template/${PROJECT_NAME}/g" "$file"
            sed -i '' "s/tauri_nextjs_template/${PROJECT_NAME_SNAKE}/g" "$file"
            
            # Replace GitHub username if provided
            if [ -n "$GITHUB_USERNAME" ]; then
                sed -i '' "s/odest/${GITHUB_USERNAME}/g" "$file"
            fi
            
            # Replace version dynamically based on file type
            if [[ "$file" == *.json ]]; then
                # For JSON files, replace the version field
                sed -i '' -E "s/\"version\"[[:space:]]*:[[:space:]]*\"[^\"]*\"/\"version\": \"${VERSION}\"/g" "$file"
            elif [[ "$file" == *Cargo.toml ]]; then
                # For Cargo.toml, replace version in [package] section
                sed -i '' -E "s/^([[:space:]]*)version[[:space:]]*=[[:space:]]*\"[^\"]*\"/\1version = \"${VERSION}\"/g" "$file"
            elif [[ "$file" == *Cargo.lock ]]; then
                # For Cargo.lock, replace version after package name
                sed -i '' -E "s/(name = \"${PROJECT_NAME}\"[[:space:]]+version = )\"[^\"]*\"/\1\"${VERSION}\"/g" "$file"
            fi
        else
            # Linux
            # Replace project names
            sed -i "s/tauri-nextjs-template/${PROJECT_NAME}/g" "$file"
            sed -i "s/tauri_nextjs_template/${PROJECT_NAME_SNAKE}/g" "$file"
            
            # Replace GitHub username if provided
            if [ -n "$GITHUB_USERNAME" ]; then
                sed -i "s/odest/${GITHUB_USERNAME}/g" "$file"
            fi
            
            # Replace version dynamically based on file type
            if [[ "$file" == *.json ]]; then
                # For JSON files, replace the version field
                sed -i -E "s/\"version\"[[:space:]]*:[[:space:]]*\"[^\"]*\"/\"version\": \"${VERSION}\"/g" "$file"
            elif [[ "$file" == *Cargo.toml ]]; then
                # For Cargo.toml, replace version in [package] section
                sed -i -E "s/^([[:space:]]*)version[[:space:]]*=[[:space:]]*\"[^\"]*\"/\1version = \"${VERSION}\"/g" "$file"
            elif [[ "$file" == *Cargo.lock ]]; then
                # For Cargo.lock, replace version after package name
                sed -i -E "s/(name = \"${PROJECT_NAME}\"[[:space:]]+version = )\"[^\"]*\"/\1\"${VERSION}\"/g" "$file"
            fi
        fi
        
        echo -e "${GREEN}[OK] Updated: ${file}${NC}"
    else
        echo -e "${RED}[FAIL] File not found: ${file}${NC}"
    fi
}

# Update files
update_file "package.json" "Root package.json"
update_file "release-please-config.json" "Release Please config"
update_file ".release-please-manifest.json" "Release Please manifest"
update_file "CONTRIBUTING.md" "Contributing guide"
update_file "README.md" "README.md"
update_file ".github/FUNDING.yml" "GitHub Funding"
update_file "apps/native/package.json" "Native app package.json"
update_file "apps/web/package.json" "Web app package.json"
update_file "apps/native/src-tauri/Cargo.toml" "Tauri Cargo.toml"
update_file "apps/native/src-tauri/Cargo.lock" "Tauri Cargo.lock"
update_file "apps/native/src-tauri/tauri.conf.json" "Tauri configuration"
update_file "apps/native/src-tauri/src/main.rs" "Main Rust file"
update_file "apps/native/src-tauri/gen/android/app/build.gradle.kts" "Android build.gradle.kts"
update_file "apps/native/src-tauri/gen/android/app/src/main/AndroidManifest.xml" "AndroidManifest.xml"
update_file "apps/native/src-tauri/gen/android/app/src/main/java/com/tauri_nextjs_template/app/MainActivity.kt" "MainActivity.kt"
update_file "apps/native/src-tauri/gen/android/app/src/main/res/values/strings.xml" "Android strings.xml"
update_file "apps/native/src-tauri/gen/android/app/src/main/res/values/themes.xml" "Android themes.xml"
update_file "apps/native/src-tauri/gen/android/app/src/main/res/values-night/themes.xml" "Android themes-night.xml"
update_file "packages/eslint-config/package.json" "eslint-config package.json"
update_file "packages/i18n/package.json" "i18n package.json"
update_file "packages/typescript-config/package.json" "typescript-config package.json"
update_file "packages/ui/package.json" "UI package.json"
update_file "packages/ui/src/config/navigation.ts" "Navigation config"

# Update identifier in tauri.conf.json (needs special handling)
if [ -f "apps/native/src-tauri/tauri.conf.json" ]; then
    echo -e "${YELLOW}[Updating] Tauri identifier${NC}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/com\.tauri-nextjs-template\.app/com.${PROJECT_NAME}.app/g" "apps/native/src-tauri/tauri.conf.json"
    else
        sed -i "s/com\.tauri-nextjs-template\.app/com.${PROJECT_NAME}.app/g" "apps/native/src-tauri/tauri.conf.json"
    fi
    echo -e "${GREEN}[OK] Updated Tauri identifier${NC}"
fi

# Rename Android package directories
echo ""
echo -e "${YELLOW}[Renaming] Android package directories...${NC}"

OLD_JAVA_PATH1="apps/native/src-tauri/gen/android/buildSrc/src/main/java/com/tauri_nextjs_template"
NEW_JAVA_PATH1="apps/native/src-tauri/gen/android/buildSrc/src/main/java/com/${PROJECT_NAME_SNAKE}"

OLD_JAVA_PATH2="apps/native/src-tauri/gen/android/app/src/main/java/com/tauri_nextjs_template"
NEW_JAVA_PATH2="apps/native/src-tauri/gen/android/app/src/main/java/com/${PROJECT_NAME_SNAKE}"

if [ -d "$OLD_JAVA_PATH1" ]; then
    mv "$OLD_JAVA_PATH1" "$NEW_JAVA_PATH1" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}[OK] Renamed: buildSrc Java package directory${NC}"
    fi
fi

if [ -d "$OLD_JAVA_PATH2" ]; then
    mv "$OLD_JAVA_PATH2" "$NEW_JAVA_PATH2" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}[OK] Renamed: app Java package directory${NC}"
        
        # Update MainActivity.kt in new location
        update_file "${NEW_JAVA_PATH2}/app/MainActivity.kt" "MainActivity.kt (renamed location)"
    fi
fi

# Update .release-please-manifest.json with version for all packages
echo ""
echo -e "${YELLOW}[Updating] Setting all package versions in manifest...${NC}"
if [ -f ".release-please-manifest.json" ]; then
    # Use jq if available, otherwise use sed
    if command -v jq &> /dev/null; then
        jq --arg ver "$VERSION" 'with_entries(.value = $ver)' .release-please-manifest.json > .release-please-manifest.json.tmp
        mv .release-please-manifest.json.tmp .release-please-manifest.json
        echo -e "${GREEN}[OK] Updated all versions in manifest to ${VERSION}${NC}"
    else
        # Fallback to sed for simple version replacement
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' -E "s/: \"[0-9]+\.[0-9]+\.[0-9]+\"/: \"${VERSION}\"/g" .release-please-manifest.json
        else
            sed -i -E "s/: \"[0-9]+\.[0-9]+\.[0-9]+\"/: \"${VERSION}\"/g" .release-please-manifest.json
        fi
        echo -e "${GREEN}[OK] Updated all versions in manifest to ${VERSION}${NC}"
    fi
fi

# Create final commit if in git repository
if [ "$IS_GIT_REPO" = true ]; then
    echo ""
    echo -e "${BLUE}[Git] Creating final commit...${NC}"
    echo -e "Commit message will be: ${YELLOW}refactor: rename project to ${PROJECT_NAME} and update versions${NC}"
    echo ""
    read -p "Create and push this commit? (y/N): " -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}[Git] Staging changes...${NC}"
        if git add . 2>/dev/null; then
            echo -e "${GREEN}[OK] Changes staged${NC}"
            
            echo -e "${YELLOW}[Git] Creating commit...${NC}"
            if git commit -m "refactor: rename project to ${PROJECT_NAME} and update versions" 2>/dev/null; then
                echo -e "${GREEN}[OK] Commit created${NC}"
                
                echo -e "${YELLOW}[Git] Pushing to remote...${NC}"
                if git push 2>/dev/null; then
                    echo -e "${GREEN}[OK] Successfully pushed to remote${NC}"
                else
                    echo -e "${YELLOW}[WARN] Could not push to remote (this is ok if no remote is set)${NC}"
                fi
            else
                echo -e "${RED}[FAIL] Could not create commit${NC}"
            fi
        else
            echo -e "${RED}[FAIL] Could not stage changes${NC}"
        fi
    fi
fi

echo ""
echo -e "${GREEN}================================================================${NC}"
echo -e "${GREEN}                                                                ${NC}"
echo -e "${GREEN}     Initialization completed successfully!                     ${NC}"
echo -e "${GREEN}                                                                ${NC}"
echo -e "${GREEN}================================================================${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "  1. Install dependencies: ${YELLOW}pnpm install${NC}"
echo -e "  2. Start development:"
echo -e "     - Desktop app: ${YELLOW}pnpm tauri dev${NC}"
echo -e "     - Web app: ${YELLOW}pnpm --filter web dev${NC}"
echo ""
echo -e "${GREEN}Happy coding!${NC}"
echo ""
