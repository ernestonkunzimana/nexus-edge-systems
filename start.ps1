# Quick Start Script for Nexus Edge Systems
# This script helps you start both frontend and backend locally

Write-Host "🚀 Nexus Edge Systems - Quick Start" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker Desktop is running
Write-Host "📦 Checking Docker Desktop..." -ForegroundColor Yellow
try {
    $dockerCheck = docker ps 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Docker Desktop is not running!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please start Docker Desktop:" -ForegroundColor Yellow
        Write-Host "  1. Open Docker Desktop from Start Menu" -ForegroundColor White
        Write-Host "  2. Wait for it to fully start (green icon in system tray)" -ForegroundColor White
        Write-Host "  3. Run this script again" -ForegroundColor White
        Write-Host ""
        Write-Host "Alternatively, run backend and frontend manually (see below)" -ForegroundColor Cyan
        Write-Host ""
        
        # Offer manual startup option
        $manual = Read-Host "Would you like instructions for manual startup? (y/n)"
        if ($manual -eq "y") {
            Write-Host ""
            Write-Host "=== Manual Startup (Without Docker) ===" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "Terminal 1 - Backend:" -ForegroundColor Yellow
            Write-Host "  cd backend" -ForegroundColor White
            Write-Host "  .\.venv\Scripts\activate" -ForegroundColor White
            Write-Host '  $env:DATABASE_URL="sqlite+aiosqlite:///./test.db"' -ForegroundColor White
            Write-Host "  python create_tables.py" -ForegroundColor White
            Write-Host "  python seed_projects.py" -ForegroundColor White
            Write-Host "  uvicorn app.main:app --reload --port 8000" -ForegroundColor White
            Write-Host ""
            Write-Host "Terminal 2 - Frontend:" -ForegroundColor Yellow
            Write-Host "  cd frontend" -ForegroundColor White
            Write-Host '  $env:NEXT_PUBLIC_API_BASE="http://localhost:8000"' -ForegroundColor White
            Write-Host "  npm run dev" -ForegroundColor White
            Write-Host ""
            Write-Host "Then open: http://localhost:3000" -ForegroundColor Green
        }
        exit 1
    }
    Write-Host "✅ Docker Desktop is running!" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🐳 Starting services with docker-compose..." -ForegroundColor Yellow
docker-compose up -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to start services" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "⏳ Waiting for services to be healthy (30 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check if postgres is healthy
$attempts = 0
$maxAttempts = 6
while ($attempts -lt $maxAttempts) {
    $status = docker-compose ps postgres 2>&1
    if ($status -match "healthy") {
        Write-Host "✅ PostgreSQL is healthy!" -ForegroundColor Green
        break
    }
    $attempts++
    Write-Host "  Waiting for PostgreSQL... ($attempts/$maxAttempts)" -ForegroundColor Gray
    Start-Sleep -Seconds 5
}

if ($attempts -eq $maxAttempts) {
    Write-Host "⚠️  PostgreSQL may not be fully ready, but continuing..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📊 Initializing database..." -ForegroundColor Yellow
docker-compose exec -T backend python create_tables.py
docker-compose exec -T backend python seed_projects.py

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database initialized with sample data!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Database initialization may have issues, but services are running" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✨ All services are running!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Access your application:" -ForegroundColor Cyan
Write-Host "  Frontend:    http://localhost:3000" -ForegroundColor White
Write-Host "  Backend API: http://localhost:8000/docs" -ForegroundColor White
Write-Host "  Health:      http://localhost:8000/health" -ForegroundColor White
Write-Host ""
Write-Host "📋 Useful commands:" -ForegroundColor Cyan
Write-Host "  View logs:     docker-compose logs -f" -ForegroundColor White
Write-Host "  Stop services: docker-compose down" -ForegroundColor White
Write-Host "  Restart:       docker-compose restart" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Ready to develop! Happy coding!" -ForegroundColor Green
Write-Host ""

# Ask if user wants to open browser
$openBrowser = Read-Host "Would you like to open the frontend in your browser? (y/n)"
if ($openBrowser -eq "y") {
    Start-Process "http://localhost:3000"
}
