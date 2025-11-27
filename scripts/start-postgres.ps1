<#
Start Postgres via docker-compose and wait until it's ready to accept connections.

Usage:
  ./scripts/start-postgres.ps1

Requires Docker Desktop to be installed and running.
#>

Set-StrictMode -Version Latest

function Check-Command($name) {
    return (Get-Command $name -ErrorAction SilentlyContinue) -ne $null
}

if (-not (Check-Command docker)) {
    Write-Host "docker not found. Install Docker Desktop and ensure it's running." -ForegroundColor Red
    exit 1
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$repoRoot = Resolve-Path (Join-Path $scriptDir "..")
Push-Location $repoRoot
try {
    Write-Host "Starting Postgres container via docker-compose..."
    $composeFile = Join-Path $repoRoot "docker-compose.yml"
    if (Test-Path $composeFile) {
        # Prefer docker-compose if available, otherwise use `docker compose`
        if (Get-Command docker-compose -ErrorAction SilentlyContinue) {
            docker-compose -f "$composeFile" up -d postgres
        } else {
            docker compose -f "$composeFile" up -d postgres
        }
    } else {
        Write-Host "docker-compose.yml not found at $composeFile" -ForegroundColor Red
        exit 1
    }

    # wait for port 5432
    $maxWait = 60
    $waited = 0
    while ($waited -lt $maxWait) {
        try {
            $sock = New-Object System.Net.Sockets.TcpClient
            $async = $sock.BeginConnect('127.0.0.1', 5432, $null, $null)
            $ok = $async.AsyncWaitHandle.WaitOne(1000)
            if ($ok -and $sock.Connected) {
                $sock.EndConnect($async)
                $sock.Close()
                Write-Host "Postgres is accepting connections on 127.0.0.1:5432"
                exit 0
            }
        } catch {
            # ignore and retry
        }
        Start-Sleep -Seconds 1
        $waited += 1
        Write-Host "Waiting for Postgres... ($waited/$maxWait)"
    }
    Write-Host "Timed out waiting for Postgres to become ready." -ForegroundColor Red
    docker-compose ps
    exit 2
} finally {
    Pop-Location
}
