# Local Development Quick Start

This guide helps you get the full stack running locally with Docker Compose.

## Prerequisites

- **Docker Desktop** must be installed and running
- **Node.js 18+** and npm (for frontend development)
- **Python 3.11+** (for backend development)

## 🚀 Quick Start (5 minutes)

### Step 1: Start Docker Desktop

**Windows:**
1. Open Docker Desktop from Start Menu
2. Wait for "Docker Desktop is running" notification
3. Verify with: `docker ps` (should not show errors)

**Verify Docker is running:**
```powershell
docker --version
docker ps
```

If you see errors like `open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified`, Docker Desktop is not running.

---

### Step 2: Start All Services

```powershell
# Navigate to project root
cd c:\Users\ADMIN\OneDrive\Desktop\NES\nexus-edge-systems

# Start all services (postgres, backend, frontend)
docker-compose up -d

# Check status
docker-compose ps
```

**Expected output:**
```
NAME                IMAGE                     STATUS
nes-backend         nexus-edge-systems-backend    Up
nes-frontend        nexus-edge-systems-frontend   Up
nes-postgres        postgres:15-alpine            Up (healthy)
```

---

### Step 3: Initialize Database

```powershell
# Wait for postgres to be healthy (check with docker-compose ps)
# Then run migrations
docker-compose exec backend alembic upgrade head

# Create tables (if migrations don't exist yet)
docker-compose exec backend python create_tables.py

# Seed sample data
docker-compose exec backend python seed_projects.py
```

---

### Step 4: Access the Application

Open your browser:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

---

## 📝 Common Commands

### View Logs

```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Restart Services

```powershell
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
docker-compose restart frontend
```

### Stop Services

```powershell
# Stop but keep data
docker-compose stop

# Stop and remove containers (data persists in volumes)
docker-compose down

# Stop and remove everything including volumes (⚠️ deletes data)
docker-compose down -v
```

### Rebuild After Code Changes

```powershell
# Rebuild and restart
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build backend
```

---

## 🔧 Development Workflow

### Option A: Full Docker (Recommended for testing)

Everything runs in containers:

```powershell
docker-compose up -d
# Edit code, containers auto-reload
```

**Pros:** 
- Matches production environment
- No local dependencies needed
- Consistent across team

**Cons:** 
- Slower hot-reload
- Need to rebuild for dependency changes

---

### Option B: Hybrid Development

Backend and Postgres in Docker, frontend runs locally:

```powershell
# Start only backend services
docker-compose up -d postgres backend

# In separate terminal, run frontend locally
cd frontend
npm run dev
```

**Pros:** 
- Faster frontend hot-reload
- Better debugging experience

**Cons:** 
- Need Node.js installed locally
- Environment variables must be set

---

### Option C: Full Local Development

Everything runs on host machine:

**Terminal 1 - Postgres:**
```powershell
docker-compose up -d postgres
```

**Terminal 2 - Backend:**
```powershell
cd backend
.\.venv\Scripts\activate  # Activate Python virtual environment
$env:DATABASE_URL="postgresql+asyncpg://nesuser:nespass@localhost:5432/nes_db"
uvicorn app.main:app --reload --port 8000
```

**Terminal 3 - Frontend:**
```powershell
cd frontend
$env:NEXT_PUBLIC_API_BASE="http://localhost:8000"
npm run dev
```

---

## 🐛 Troubleshooting

### Docker Desktop Not Running

**Error:**
```
open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified
```

**Solution:**
1. Start Docker Desktop application
2. Wait for it to fully start (green icon in system tray)
3. Run `docker ps` to verify

---

### Port Already in Use

**Error:**
```
Error: bind: address already in use
```

**Solution:**
```powershell
# Check what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :8000
netstat -ano | findstr :5432

# Kill the process or change docker-compose ports
docker-compose down
# Then edit docker-compose.yml ports if needed
```

---

### Frontend Can't Connect to Backend

**Symptoms:** Frontend shows errors, can't fetch data

**Solution:**

1. **Check backend is running:**
   ```powershell
   curl http://localhost:8000/health
   # Should return: {"status":"ok"}
   ```

2. **Check environment variables:**
   ```powershell
   # In docker-compose.yml, ensure:
   NEXT_PUBLIC_API_BASE: "http://localhost:8000"
   ```

3. **Check CORS settings** in `backend/app/main.py`

---

### Database Connection Issues

**Error:**
```
sqlalchemy.exc.OperationalError: could not connect to server
```

**Solution:**

1. **Check postgres is healthy:**
   ```powershell
   docker-compose ps postgres
   # Should show "Up (healthy)"
   ```

2. **Check connection string:**
   ```powershell
   # Inside backend container:
   docker-compose exec backend env | findstr DATABASE_URL
   ```

3. **Restart postgres:**
   ```powershell
   docker-compose restart postgres
   ```

---

### Frontend Build Fails

**Error when running `npm run build`:**

**Solution:**

1. **Make sure you're in frontend directory:**
   ```powershell
   cd frontend
   npm run build
   ```

2. **Clear cache and rebuild:**
   ```powershell
   rm -r .next
   npm run build
   ```

3. **Check TypeScript errors:**
   ```powershell
   npm run build 2>&1 | Select-String "error"
   ```

---

## 🧪 Running Tests Locally

### Backend Tests

```powershell
cd backend
.\.venv\Scripts\activate
pytest -v
```

### Frontend E2E Tests

```powershell
cd frontend

# Install Playwright browsers (first time only)
npx playwright install

# Run tests
npm run test:e2e

# Run with UI
npx playwright test --ui
```

---

## 📦 Environment Variables

Create `.env.local` in project root:

```bash
# Backend
DATABASE_URL=postgresql+asyncpg://nesuser:nespass@localhost:5432/nes_db
SECRET_KEY=local-dev-key-change-in-production

# Frontend
NEXT_PUBLIC_API_BASE=http://localhost:8000

# Optional
SENTRY_DSN=
REDIS_URL=redis://localhost:6379/0
```

---

## 🔄 Clean Slate Reset

If things get weird, start fresh:

```powershell
# Stop everything
docker-compose down -v

# Remove built images
docker-compose rm -f

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up -d

# Reinitialize database
docker-compose exec backend python create_tables.py
docker-compose exec backend python seed_projects.py
```

---

## ✅ Verification Checklist

After starting services, verify everything works:

- [ ] Docker Desktop is running (green icon)
- [ ] `docker-compose ps` shows all services "Up"
- [ ] http://localhost:8000/health returns `{"status":"ok"}`
- [ ] http://localhost:8000/docs shows API documentation
- [ ] http://localhost:3000 loads the dashboard
- [ ] Can navigate to http://localhost:3000/projects
- [ ] Can create a new project
- [ ] Projects appear in dashboard widget

---

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Local Development](https://nextjs.org/docs/getting-started)
- [FastAPI Development](https://fastapi.tiangolo.com/)
- [Testing Guide](./docs/TESTING.md)

---

**Need Help?** Check the [troubleshooting section](#-troubleshooting) or review logs with `docker-compose logs -f`
