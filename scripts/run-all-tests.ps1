<#
Run all local tests: optional dev bootstrap, start Postgres (if Docker), run backend tests, run frontend Playwright.

Usage:
  ./scripts/run-all-tests.ps1 [-Bootstrap] [-StartDb]

Options:
  -Bootstrap : run `setup-dev.ps1` before tests (installs Python venv, pip deps, npm deps)
  -StartDb   : attempt to start Postgres via `start-postgres.ps1` (requires Docker Desktop)

Notes:
  - If Docker isn't available, Postgres integration test will be skipped.
  - This script is idempotent and intended for local dev machines.
#>

param(
    [switch]$Bootstrap,
    [switch]$StartDb
)

Set-StrictMode -Version Latest

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Push-Location $scriptDir\..\
try {
    if ($Bootstrap) {
        Write-Host "Running dev bootstrap..."
        & "$scriptDir\setup-dev.ps1"
    }

    if ($StartDb) {
        Write-Host "Starting Postgres via docker-compose (this requires Docker Desktop)..."
        & "$scriptDir\start-postgres.ps1"
        # Set DATABASE_URL to match docker-compose postgres service so integration tests use it
        $env:DATABASE_URL = "postgresql://nesuser:nespass@127.0.0.1:5432/nes_db"
    } else {
        Write-Host "Skipping Postgres start (use -StartDb to enable)."
    }

    # Run backend tests. If Postgres is available run full suite, otherwise skip Postgres integration test.
    Push-Location backend
    try {
        $dockerAvailable = (Get-Command docker -ErrorAction SilentlyContinue) -ne $null
        if ($dockerAvailable) {
            Write-Host "Docker available - running full backend test suite..."
            pytest -v
        } else {
            Write-Host "Docker not available - skipping Postgres integration test. Running backend tests (skipping Postgres test)..."
            pytest -k "not test_postgres_connection_and_simple_query" -v
        }
    } finally {
        Pop-Location
    }

    # Run frontend Playwright tests if Playwright is installed
    if (Test-Path "frontend") {
        Push-Location frontend
        try {
            if (Get-Command npx -ErrorAction SilentlyContinue) {
                Write-Host "Running Playwright E2E suite..."
                npx playwright test
            } else {
                Write-Host "npx not found - skipping Playwright tests." -ForegroundColor Yellow
            }
        } finally {
            Pop-Location
        }
    }

} finally {
    Pop-Location
}

Exit 0
