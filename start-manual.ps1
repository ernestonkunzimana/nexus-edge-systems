# Manual Start Script (No Docker Required)
# Starts backend and frontend using SQLite for development

Write-Host "🚀 Nexus Edge Systems - Manual Start (No Docker)" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = Get-Location

# Check if in correct directory
if (-not (Test-Path "backend") -or -not (Test-Path "frontend")) {
    Write-Host "❌ Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Step 1: Setting up Backend..." -ForegroundColor Yellow
Write-Host ""

# Start backend in new window
$backendScript = @"
Set-Location '$projectRoot\backend'
Write-Host '🐍 Starting Backend Server...' -ForegroundColor Cyan
Write-Host ''

# Activate virtual environment
if (Test-Path '.venv\Scripts\Activate.ps1') {
    .\.venv\Scripts\Activate.ps1
} else {
    Write-Host '❌ Virtual environment not found. Creating one...' -ForegroundColor Yellow
    python -m venv .venv
    .\.venv\Scripts\Activate.ps1
    pip install -r requirements.txt
}

# Set environment variables
`$env:DATABASE_URL='sqlite+aiosqlite:///./dev.db'
`$env:ASYNC_DATABASE_URL='sqlite+aiosqlite:///./dev.db'

# Initialize database
Write-Host 'Creating tables...' -ForegroundColor Yellow
python create_tables.py

Write-Host 'Seeding sample data...' -ForegroundColor Yellow
python seed_projects.py

Write-Host ''
Write-Host '✅ Backend ready!' -ForegroundColor Green
Write-Host '🌐 API: http://localhost:8000' -ForegroundColor Cyan
Write-Host '📚 Docs: http://localhost:8000/docs' -ForegroundColor Cyan
Write-Host ''

# Start server
uvicorn app.main:app --reload --port 8000
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendScript

Write-Host "✅ Backend starting in new window..." -ForegroundColor Green
Write-Host "⏳ Waiting 5 seconds for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "📦 Step 2: Setting up Frontend..." -ForegroundColor Yellow
Write-Host ""

# Start frontend in new window
$frontendScript = @"
Set-Location '$projectRoot\frontend'
Write-Host '⚛️  Starting Frontend Server...' -ForegroundColor Cyan
Write-Host ''

# Set environment variables
`$env:NEXT_PUBLIC_API_BASE='http://localhost:8000'

# Install dependencies if needed
if (-not (Test-Path 'node_modules')) {
    Write-Host 'Installing dependencies...' -ForegroundColor Yellow
    npm install
}

Write-Host ''
Write-Host '✅ Frontend ready!' -ForegroundColor Green
Write-Host '🌐 App: http://localhost:3000' -ForegroundColor Cyan
Write-Host ''

# Start dev server
npm run dev
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendScript

Write-Host "✅ Frontend starting in new window..." -ForegroundColor Green
Write-Host ""
Write-Host "⏳ Waiting 10 seconds for frontend to compile..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host ""
Write-Host "✨ Both services should be running now!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Access your application:" -ForegroundColor Cyan
Write-Host "  Frontend:    http://localhost:3000" -ForegroundColor White
Write-Host "  Backend API: http://localhost:8000/docs" -ForegroundColor White
Write-Host "  Health:      http://localhost:8000/health" -ForegroundColor White
Write-Host ""
Write-Host "📝 Note: Each service is running in its own PowerShell window" -ForegroundColor Yellow
Write-Host "   Close those windows to stop the services" -ForegroundColor Yellow
Write-Host ""
Write-Host "🎉 Happy coding!" -ForegroundColor Green
Write-Host ""

# Ask if user wants to open browser
$openBrowser = Read-Host "Would you like to open the frontend in your browser? (y/n)"
if ($openBrowser -eq "y") {
    Start-Process "http://localhost:3000"
}

Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
