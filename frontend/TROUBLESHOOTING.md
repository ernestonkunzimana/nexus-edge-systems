# Frontend Troubleshooting Guide

## Common Issues and Solutions

### 1. "Error fetching projects: TypeError: Failed to fetch"

**What this means:** The frontend is unable to reach the backend API server. This is typically a CORS issue or the API server isn't running.

**Solutions:**

#### Step 1: Verify the API Server is Running
```bash
# Check if backend is running on port 8000
curl http://localhost:8000/api/v1/projects

# You should get a JSON response, not a connection error
```

#### Step 2: Check the API Base URL
The frontend looks for `NEXT_PUBLIC_API_BASE` environment variable:

```bash
# In your .env.local file, add:
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

#### Step 3: Start the Backend
```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

#### Step 4: Restart the Frontend Dev Server
```bash
# Stop the running server (Ctrl+C)
npm run dev
# Visit http://localhost:3000
```

---

### 2. Unable to Load Services / Devices / Team / Portfolio

**What this means:** One of the API endpoints is returning an error or timeout.

**Check which endpoint is failing:**

1. Open browser Developer Tools (F12)
2. Go to Network tab
3. Look for failed requests to:
   - `http://localhost:8000/api/v1/services`
   - `http://localhost:8000/api/v1/devices`
   - `http://localhost:8000/api/v1/team`
   - `http://localhost:8000/api/v1/projects`

4. Click on the failed request and check:
   - **Status Code**: Should be 200
   - **Response**: Should be valid JSON array

**Solutions:**

- Ensure all required database tables exist in the backend
- Check backend logs for errors
- Verify the database connection string in backend `.env`
- Run database migrations if needed

---

### 3. "API Connection Issue" Banner Appears

**What this means:** The frontend detected one or more API endpoints are not responding correctly.

**Steps to fix:**

1. Check backend is running: `curl http://localhost:8000/api/v1/services`
2. Look at backend console for error messages
3. Verify database tables exist
4. Check environment variables are correct

---

### 4. Images Not Loading

**What this means:** The image URLs returned from the API don't exist or are broken.

**Solutions:**

1. Ensure image URLs in API responses are valid
2. Check if images are hosted on a CDN or local server
3. Verify image file paths are correct
4. Check browser console for 404 errors on image requests

---

### 5. Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
npm run dev -- -p 3001
```

---

## Quick Checklist

- [ ] Backend is running on `http://localhost:8000`
- [ ] `.env.local` has `NEXT_PUBLIC_API_BASE=http://localhost:8000`
- [ ] Database has seed data
- [ ] All API endpoints respond with valid JSON
- [ ] No CORS errors in browser console
- [ ] Image URLs are valid
- [ ] Frontend is running on port 3000

---

## Debugging Commands

### Check API Connectivity

```bash
# Test services endpoint
curl http://localhost:8000/api/v1/services

# Test devices endpoint
curl http://localhost:8000/api/v1/devices

# Test team endpoint
curl http://localhost:8000/api/v1/team

# Test projects endpoint
curl http://localhost:8000/api/v1/projects
```

### Check Frontend Config

```bash
# View .env.local
cat .env.local

# Verify it has correct API_BASE
grep NEXT_PUBLIC_API_BASE .env.local
```

### Clear Cache and Rebuild

```bash
# Remove build and node_modules
rm -rf .next node_modules

# Reinstall dependencies
npm install

# Restart dev server
npm run dev
```

---

## Still Having Issues?

1. Check the browser console for error messages
2. Check the backend logs for API errors
3. Verify the database connection
4. Ensure all dependencies are installed
5. Try clearing browser cache and localStorage
6. Restart both frontend and backend servers

