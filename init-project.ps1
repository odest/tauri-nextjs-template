# PowerShell initialization script for Tauri + Next.js Template

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Clear-Host

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "     Tauri + Next.js Template Initialization" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Check if this is a git repository
$isGitRepo = Test-Path ".git"
$shouldUpdateInitialCommit = $false
$shouldCommitChanges = $false

if ($isGitRepo) {
    Write-Host "Git repository detected!" -ForegroundColor Cyan
    Write-Host ""
    
    # Check if there's only one commit (initial commit)
    try {
        $commitCount = (git rev-list --count HEAD 2>$null)
        if ($commitCount -eq "1") {
            $currentCommitMessage = (git log -1 --pretty=%B).Trim()
            Write-Host "Current initial commit message:" -ForegroundColor Yellow
            Write-Host "  '$currentCommitMessage'" -ForegroundColor White
            Write-Host ""
            Write-Host "New commit message will be:" -ForegroundColor Yellow
            Write-Host "  'chore: initialize project using tauri-nextjs-template'" -ForegroundColor Green
            Write-Host ""
            
            $response = Read-Host "Update initial commit message? (Y/n)"
            if ($response -match '^[Yy]$|^$') {
                $shouldUpdateInitialCommit = $true
            }
        }
    }
    catch {
        Write-Host "Could not check commit history. Skipping initial commit update." -ForegroundColor Yellow
    }
    
    Write-Host ""
}

# Get project name
do {
    Write-Host "Enter your project name (lowercase, use hyphens):" -ForegroundColor Yellow
    $PROJECT_NAME = Read-Host "> "
    
    if ([string]::IsNullOrWhiteSpace($PROJECT_NAME)) {
        Write-Host "Project name cannot be empty!" -ForegroundColor Red
        continue
    }
    
    # Validate project name (lowercase, numbers, hyphens)
    if ($PROJECT_NAME -notmatch '^[a-z0-9-]+$') {
        Write-Host "Invalid project name! Use only lowercase letters, numbers, and hyphens." -ForegroundColor Red
        continue
    }
    
    break
} while ($true)

# Get GitHub username
Write-Host ""
Write-Host "Enter your GitHub username (default: skip):" -ForegroundColor Yellow
$GITHUB_USERNAME = Read-Host "> "
if ([string]::IsNullOrWhiteSpace($GITHUB_USERNAME)) {
    $GITHUB_USERNAME = ""
}

# Get version
Write-Host ""
Write-Host "Enter initial version (default: 0.1.0):" -ForegroundColor Yellow
$VERSION = Read-Host "> "
if ([string]::IsNullOrWhiteSpace($VERSION)) {
    $VERSION = "0.1.0"
}

# Validate version format
if ($VERSION -notmatch '^\d+\.\d+\.\d+$') {
    Write-Host "Invalid version format! Using default: 0.1.0" -ForegroundColor Red
    $VERSION = "0.1.0"
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "Project Name: $PROJECT_NAME" -ForegroundColor Green
Write-Host "Version: $VERSION" -ForegroundColor Green
if ($GITHUB_USERNAME) {
    Write-Host "GitHub Username: $GITHUB_USERNAME" -ForegroundColor Green
}
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

$confirmation = Read-Host "Continue? (y/n)"
if ($confirmation -notmatch '^[Yy]$') {
    Write-Host "Initialization cancelled." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Starting initialization..." -ForegroundColor Cyan
Write-Host ""

# Update initial commit if requested
if ($shouldUpdateInitialCommit) {
    Write-Host "[Git] Updating initial commit message..." -ForegroundColor Yellow
    try {
        git commit --amend -m "chore: initialize project using tauri-nextjs-template" 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] Initial commit message updated" -ForegroundColor Green
            
            # Ask to force push
            Write-Host ""
            $pushResponse = Read-Host "Force push to remote? (y/N)"
            if ($pushResponse -match '^[Yy]$') {
                Write-Host "[Git] Force pushing to remote..." -ForegroundColor Yellow
                git push --force 2>$null
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "[OK] Successfully pushed to remote" -ForegroundColor Green
                }
                else {
                    Write-Host "[WARN] Could not push to remote (this is ok if no remote is set)" -ForegroundColor Yellow
                }
            }
        }
        else {
            Write-Host "[FAIL] Could not update commit message" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "[FAIL] Error updating commit: $_" -ForegroundColor Red
    }
    Write-Host ""
}

# Delete CHANGELOG files
Write-Host "[Cleaning] Removing CHANGELOG files..." -ForegroundColor Yellow
$changelogFiles = @(
    "CHANGELOG.md",
    "apps\native\CHANGELOG.md",
    "packages\ui\CHANGELOG.md"
)

foreach ($changelog in $changelogFiles) {
    $fullPath = Join-Path $PWD $changelog
    if (Test-Path $fullPath) {
        Remove-Item $fullPath -Force
        Write-Host "[OK] Deleted: $changelog" -ForegroundColor Green
    }
}

Write-Host ""

# Create snake_case version
$PROJECT_NAME_SNAKE = $PROJECT_NAME -replace '-', '_'

# Function to update file
function Update-ProjectFile {
    param(
        [string]$FilePath,
        [string]$Description,
        [string]$ProjectName,
        [string]$ProjectNameSnake,
        [string]$Version,
        [string]$GitHubUsername
    )
    
    if (Test-Path $FilePath) {
        Write-Host "[Updating] $Description" -ForegroundColor Yellow
        
        try {
            $content = Get-Content -Path $FilePath -Raw -Encoding UTF8
            
            # Replace project names
            $content = $content -replace 'tauri-nextjs-template', $ProjectName
            $content = $content -replace 'tauri_nextjs_template', $ProjectNameSnake
            
            # Replace GitHub username if provided
            if ($GitHubUsername) {
                $content = $content -replace 'odest', $GitHubUsername
            }
            
            # Replace version in package.json files
            if ($FilePath -match '\.json$') {
                # For JSON files, replace the version field specifically
                $content = $content -replace '("version"\s*:\s*)"[^"]*"', "`$1`"$Version`""
            }
            # Replace version in Cargo.toml
            elseif ($FilePath -match 'Cargo\.toml$') {
                # Replace version in [package] section (multiline mode)
                $content = $content -replace '(?m)(^\s*version\s*=\s*)"[^"]*"', "`$1`"$Version`""
            }
            # Replace version in Cargo.lock for project package
            elseif ($FilePath -match 'Cargo\.lock$') {
                # Replace version after name = "project-name" in Cargo.lock
                $content = $content -replace "(?ms)(name = `"$ProjectName`"\s+version = )`"[^`"]*`"", "`${1}`"$Version`""
            }
            
            # Save file with UTF8 encoding (no BOM)
            $Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
            [System.IO.File]::WriteAllText($FilePath, $content, $Utf8NoBomEncoding)
            
            Write-Host "[OK] Updated: $FilePath" -ForegroundColor Green
        }
        catch {
            Write-Host "[FAIL] Error updating $FilePath : $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "[FAIL] File not found: $FilePath" -ForegroundColor Red
    }
}

# Get current directory
$currentDir = Get-Location

# Update files
Update-ProjectFile -FilePath "$currentDir\package.json" -Description "Root package.json" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\release-please-config.json" -Description "Release Please config" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\.release-please-manifest.json" -Description "Release Please manifest" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\CONTRIBUTING.md" -Description "Contributing guide" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\README.md" -Description "README.md" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\.github\FUNDING.yml" -Description "GitHub Funding" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\apps\native\package.json" -Description "Native app package.json" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\apps\web\package.json" -Description "Web app package.json" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\apps\native\src-tauri\Cargo.toml" -Description "Tauri Cargo.toml" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\apps\native\src-tauri\Cargo.lock" -Description "Tauri Cargo.lock" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\apps\native\src-tauri\tauri.conf.json" -Description "Tauri configuration" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\apps\native\src-tauri\src\main.rs" -Description "Main Rust file" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\apps\native\src-tauri\gen\android\app\build.gradle.kts" -Description "Android build.gradle.kts" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\apps\native\src-tauri\gen\android\app\src\main\AndroidManifest.xml" -Description "AndroidManifest.xml" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\apps\native\src-tauri\gen\android\app\src\main\java\com\tauri_nextjs_template\app\MainActivity.kt" -Description "MainActivity.kt" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\apps\native\src-tauri\gen\android\app\src\main\res\values\strings.xml" -Description "Android strings.xml" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\apps\native\src-tauri\gen\android\app\src\main\res\values\themes.xml" -Description "Android themes.xml" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\apps\native\src-tauri\gen\android\app\src\main\res\values-night\themes.xml" -Description "Android themes-night.xml" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\packages\eslint-config\package.json" -Description "eslint-config package.json" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\packages\i18n\package.json" -Description "i18n package.json" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\packages\typescript-config\package.json" -Description "typescript-config package.json" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\packages\ui\package.json" -Description "UI package.json" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
Update-ProjectFile -FilePath "$currentDir\packages\ui\src\config\navigation.ts" -Description "Navigation config" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME

# Update identifier in tauri.conf.json (needs special handling)
$tauriConfigPath = "$currentDir\apps\native\src-tauri\tauri.conf.json"
if (Test-Path $tauriConfigPath) {
    Write-Host "[Updating] Tauri identifier" -ForegroundColor Yellow
    try {
        $content = Get-Content -Path $tauriConfigPath -Raw -Encoding UTF8
        $content = $content -replace 'com\.tauri-nextjs-template\.app', "com.$PROJECT_NAME.app"
        $Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
        [System.IO.File]::WriteAllText($tauriConfigPath, $content, $Utf8NoBomEncoding)
        Write-Host "[OK] Updated Tauri identifier" -ForegroundColor Green
    }
    catch {
        Write-Host "[FAIL] Error updating Tauri identifier: $_" -ForegroundColor Red
    }
}

# Rename Android package directories
Write-Host ""
Write-Host "[Renaming] Android package directories..." -ForegroundColor Yellow

$oldJavaPath1 = "$currentDir\apps\native\src-tauri\gen\android\buildSrc\src\main\java\com\tauri_nextjs_template"
$newJavaPath1 = "$currentDir\apps\native\src-tauri\gen\android\buildSrc\src\main\java\com\$PROJECT_NAME_SNAKE"

$oldJavaPath2 = "$currentDir\apps\native\src-tauri\gen\android\app\src\main\java\com\tauri_nextjs_template"
$newJavaPath2 = "$currentDir\apps\native\src-tauri\gen\android\app\src\main\java\com\$PROJECT_NAME_SNAKE"

if (Test-Path $oldJavaPath1) {
    try {
        Move-Item -Path $oldJavaPath1 -Destination $newJavaPath1 -Force
        Write-Host "[OK] Renamed: buildSrc Java package directory" -ForegroundColor Green
    }
    catch {
        Write-Host "[FAIL] Error renaming buildSrc directory: $_" -ForegroundColor Red
    }
}

if (Test-Path $oldJavaPath2) {
    try {
        Move-Item -Path $oldJavaPath2 -Destination $newJavaPath2 -Force
        Write-Host "[OK] Renamed: app Java package directory" -ForegroundColor Green
    }
    catch {
        Write-Host "[FAIL] Error renaming app directory: $_" -ForegroundColor Red
    }
}

# Update MainActivity.kt path after renaming
$newMainActivityPath = "$newJavaPath2\app\MainActivity.kt"
if (Test-Path $newMainActivityPath) {
    Update-ProjectFile -FilePath $newMainActivityPath -Description "MainActivity.kt (renamed location)" -ProjectName $PROJECT_NAME -ProjectNameSnake $PROJECT_NAME_SNAKE -Version $VERSION -GitHubUsername $GITHUB_USERNAME
}

# Update .release-please-manifest.json with version for all packages
Write-Host ""
Write-Host "[Updating] Setting all package versions in manifest..." -ForegroundColor Yellow
$manifestPath = "$currentDir\.release-please-manifest.json"
if (Test-Path $manifestPath) {
    try {
        $manifest = Get-Content -Path $manifestPath -Raw | ConvertFrom-Json
        $manifest.PSObject.Properties | ForEach-Object {
            $_.Value = $VERSION
        }
        $manifestJson = $manifest | ConvertTo-Json -Depth 10
        $Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
        [System.IO.File]::WriteAllText($manifestPath, $manifestJson, $Utf8NoBomEncoding)
        Write-Host "[OK] Updated all versions in manifest to $VERSION" -ForegroundColor Green
    }
    catch {
        Write-Host "[FAIL] Error updating manifest: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Green
Write-Host "     Initialization completed successfully!" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host ""

# Ask to commit changes
if ($isGitRepo) {
    Write-Host "[Git] Creating final commit..." -ForegroundColor Cyan
    Write-Host "Commit message will be: 'refactor: rename project to $PROJECT_NAME and update versions'" -ForegroundColor Yellow
    Write-Host ""
    
    $commitResponse = Read-Host "Create and push this commit? (y/N)"
    if ($commitResponse -match '^[Yy]$') {
        Write-Host ""
        Write-Host "[Git] Staging changes..." -ForegroundColor Yellow
        git add . 2>$null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] Changes staged" -ForegroundColor Green
            
            Write-Host "[Git] Committing changes..." -ForegroundColor Yellow
            git commit -m "refactor: rename project to $PROJECT_NAME and update versions" 2>$null
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[OK] Commit created" -ForegroundColor Green
                
                Write-Host "[Git] Pushing to remote..." -ForegroundColor Yellow
                git push 2>$null
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "[OK] Successfully pushed to remote" -ForegroundColor Green
                }
                else {
                    Write-Host "[WARN] Could not push to remote (this is ok if no remote is set)" -ForegroundColor Yellow
                }
            }
            else {
                Write-Host "[FAIL] Could not create commit" -ForegroundColor Red
            }
        }
        else {
            Write-Host "[FAIL] Could not stage changes" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Green
Write-Host "                                                                " -ForegroundColor Green
Write-Host "     Initialization completed successfully!                     " -ForegroundColor Green
Write-Host "                                                                " -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Install dependencies: " -NoNewline -ForegroundColor White
Write-Host "pnpm install" -ForegroundColor Yellow
Write-Host "  2. Start development:" -ForegroundColor White
Write-Host "     - Desktop app: " -NoNewline -ForegroundColor White
Write-Host "pnpm tauri dev" -ForegroundColor Yellow
Write-Host "     - Web app: " -NoNewline -ForegroundColor White
Write-Host "pnpm --filter web dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "Happy coding!" -ForegroundColor Green
Write-Host ""
