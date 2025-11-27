<#
Setup script for developer environment on Windows (PowerShell).

Usage:
  Open PowerShell (may need Administrator for system installs). Then:
    ./scripts/setup-dev.ps1

What it does (idempotent):
- checks for core tools: git, python, pip, node, npm, docker
- creates Python venv at `backend/.venv` and installs backend requirements
- runs `npm ci` in `frontend` to install node deps
- installs Playwright browsers (if `npx` available)
- prints instructions for installing Docker Desktop / Node / Python if missing

This script avoids system package installs and focuses on project-local bootstrapping.
#>

Set-StrictMode -Version Latest

function Check-Command($name) {
    $which = Get-Command $name -ErrorAction SilentlyContinue
    return $which -ne $null
}

Write-Host "Starting developer bootstrap..."

# 1) Check basic tools
$tools = @{
    git = (Check-Command git)
    python = (Check-Command python)
    pip = (Check-Command pip)
    node = (Check-Command node)
    npm = (Check-Command npm)
    docker = (Check-Command docker)
}

Write-Host "Tool check results:"
foreach ($k in $tools.Keys) {
    if ($tools[$k]) { $status = 'OK' } else { $status = 'MISSING' }
    Write-Host " - $k : $status"
}

if (-not $tools.python) {
    Write-Host "Python not found. Please install Python 3.11+ from https://www.python.org/downloads/windows/" -ForegroundColor Yellow
}
if (-not $tools.node -or -not $tools.npm) {
    Write-Host "Node/npm not found. Install Node.js (LTS) from https://nodejs.org/" -ForegroundColor Yellow
}
if (-not $tools.docker) {
    Write-Host "Docker not found. Install Docker Desktop for Windows and ensure the engine is running: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
}

# 2) Backend venv + install requirements
$backendPath = Join-Path "$(Resolve-Path ..).Path" "backend"
if (-not (Test-Path $backendPath)) {
    # adjust relative path if script run from repo root
    $backendPath = Join-Path (Resolve-Path .).Path "backend"
}

Write-Host "Bootstrapping backend in: $backendPath"

Push-Location $backendPath
try {
    $venvPath = Join-Path $backendPath ".venv"
    if (-not (Test-Path $venvPath)) {
        Write-Host "Creating Python venv at $venvPath"
        python -m venv .venv
    } else {
        Write-Host "Python venv already exists at $venvPath"
    }

    $py = Join-Path $venvPath "Scripts\python.exe"
    $pipExe = Join-Path $venvPath "Scripts\pip.exe"

    if (-not (Test-Path $py)) {
        Write-Host "Virtualenv python not found; ensure Python is on PATH or create venv manually." -ForegroundColor Red
    } else {
        Write-Host "Installing backend Python requirements (this may take a bit)..."
        & $py -m pip install --upgrade pip
        if (Test-Path requirements.txt) {
            & $py -m pip install -r requirements.txt
        } else {
            Write-Host "No requirements.txt found in backend. Skipping pip install." -ForegroundColor Yellow
        }
    }
} finally {
    Pop-Location
}

# 3) Frontend: npm install
$frontendPath = Join-Path (Resolve-Path ..).Path "frontend"
if (-not (Test-Path $frontendPath)) {
    $frontendPath = Join-Path (Resolve-Path .).Path "frontend"
}

if (Test-Path $frontendPath) {
    Write-Host "Installing frontend dependencies in: $frontendPath"
    Push-Location $frontendPath
    try {
        if (Check-Command npm) {
            try {
                # disable Husky hooks during CI/local scripted installs
                $env:HUSKY = "0"
                if (Test-Path package-lock.json) {
                    npm ci
                } else {
                    npm install
                }
            } catch {
                Write-Host "npm install failed (continuing): $_" -ForegroundColor Yellow
            } finally {
                Remove-Item Env:\HUSKY -ErrorAction SilentlyContinue
            }
        } else {
            Write-Host "npm not installed; skipping frontend install." -ForegroundColor Yellow
        }

        # Install Playwright browsers if npx available
        if (Check-Command npx) {
            Write-Host "Installing Playwright browsers (this will download browser binaries)..."
            npx playwright install --with-deps
        } else {
            Write-Host "npx not found; skipping Playwright browser install." -ForegroundColor Yellow
        }
    } finally {
        Pop-Location
    }
} else {
    Write-Host "No frontend directory found at expected path: $frontendPath" -ForegroundColor Yellow
}

Write-Host "Bootstrap complete. Next steps:"
Write-Host " - Start Docker Desktop and run: docker-compose up -d postgres" -ForegroundColor Cyan
Write-Host " - Set DATABASE_URL environment variable for backend tests if you plan to run integration tests." -ForegroundColor Cyan
Write-Host " - To run backend tests (skip Postgres test):" -ForegroundColor Cyan
Write-Host "     cd backend; .\.venv\Scripts\Activate.ps1; pytest -k \"not test_postgres_connection_and_simple_query\" -v" -ForegroundColor Gray
Write-Host " - To run full backend tests (with Postgres):" -ForegroundColor Cyan
Write-Host "     docker-compose up -d postgres; $env:DATABASE_URL='postgresql+asyncpg://testuser:testpass@localhost:5432/test_db'; pytest -v" -ForegroundColor Gray

Exit 0
