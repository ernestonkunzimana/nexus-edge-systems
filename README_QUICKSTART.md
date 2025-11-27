# Quickstart (Local development)

Prereqs:
- Docker Desktop (to run Postgres for integration tests)
- Node.js 18+ and npm
- Python 3.11

1) Bootstrap developer environment

PowerShell (from repo root):

```powershell
.\scripts\setup-dev.ps1
```

This creates `backend/.venv`, installs Python deps, installs frontend packages and Playwright browsers.

2) Start Postgres (optional, required for integration tests):

```powershell
.\scripts\start-postgres.ps1
```

3) Run full test suite (starts DB if requested, runs backend tests and Playwright E2E):

```powershell
.\scripts\run-all-tests.ps1 -StartDb
```

4) Environment variables

Copy `.env.example` to `.env` (or set env vars) before running the app locally.
