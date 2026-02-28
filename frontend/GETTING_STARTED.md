# Getting Started with the Dynamic Dashboard

## Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ installed
- Backend API running on `http://localhost:8000`
- Git (optional, for version control)

### 1. Install Dependencies
```bash
cd frontend
npm install
# or
pnpm install
```

### 2. Set Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What You'll See

The dashboard has 5 main sections:

1. **Overview Stats** - Real-time counters from API
2. **Services Catalog** - IT solutions offered
3. **Devices We Maintain** - Equipment inventory
4. **Our Team** - Staff members with WhatsApp links
5. **Portfolio Showcase** - Completed projects

## Understanding the Code

### File Structure
```
frontend/
├── app/
│   ├── page.tsx              # Home page (renders DynamicDashboard)
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── DynamicDashboard.tsx  # Main dashboard component
│   ├── StatCard.tsx          # Metric cards
│   └── SectionCard.tsx       # Content cards
├── lib/
│   └── api/
│       ├── useServices.ts    # Fetch services
│       ├── useDevices.ts     # Fetch devices
│       ├── useTeam.ts        # Fetch team
│       └── useProjects.ts    # Fetch projects
├── DASHBOARD_GUIDE.md        # Comprehensive guide
├── COMPONENT_ARCHITECTURE.md # Component details
└── GETTING_STARTED.md        # This file
```

### Key Files Explained

#### `DynamicDashboard.tsx` (The Brain)
- Imports all data hooks
- Orchestrates what gets displayed
- Shows loading and error states
- Calculates statistics

**Start here** to understand the dashboard flow.

#### `useServices.ts` and Friends (Data Fetching)
- Each hook fetches one type of data
- Uses SWR for smart caching
- Revalidates at intervals
- Returns `{ data, isLoading, isError }`

**Check these** to understand API integration.

#### `StatCard.tsx` and `SectionCard.tsx` (UI Components)
- Reusable, data-agnostic components
- Accept props, render UI
- No API calls directly
- Easy to test and reuse elsewhere

**Study these** to understand component patterns.

## How Data Flows

### Visual Flow
```
┌─────────────────────────────────┐
│    DynamicDashboard Component   │
└──────────┬──────────────────────┘
           │
    ┌──────┼──────┬──────┬──────┐
    │      │      │      │      │
    ▼      ▼      ▼      ▼      ▼
useServices  useDevices  useTeam  useProjects
    │      │      │      │
    └──────┼──────┼──────┘
           ▼
    ┌─────────────────┐
    │  SWR (Caching)  │
    └────────┬────────┘
             ▼
    ┌──────────────────────┐
    │  Backend API Server  │
    │ - /api/v1/services   │
    │ - /api/v1/devices    │
    │ - /api/v1/team       │
    │ - /api/v1/projects   │
    └──────────────────────┘
```

### Step-by-Step Example

1. **Component Mounts**
   ```tsx
   export default function DynamicDashboard() {
     const { services, isLoading } = useServices()  // Hook called
     // ...
   }
   ```

2. **Hook Executes**
   ```typescript
   // Inside useServices.ts
   const { data } = useSWR(`http://localhost:8000/api/v1/services`, fetcher)
   // Makes HTTP GET request to backend
   ```

3. **Backend Responds**
   ```json
   [
     { "id": 1, "name": "Service A", "description": "...", "image": "..." },
     { "id": 2, "name": "Service B", "description": "...", "image": "..." }
   ]
   ```

4. **Data Cached by SWR**
   - SWR stores response
   - Won't refetch for 30 seconds
   - Background revalidation in 30s

5. **Component Renders**
   ```tsx
   {services.map(service => (
     <SectionCard key={service.id} {...service} />
   ))}
   ```

## Common Tasks

### ✅ Add a New Service
The service will automatically appear without code changes!

1. Add to database on backend
2. Backend returns it in `/api/v1/services` response
3. Dashboard fetches and displays it

### ✅ Change Refresh Rate
Edit `useServices.ts` (or other hooks):
```typescript
const { data } = useSWR(`${API_BASE}/api/v1/services`, fetcher, {
  refreshInterval: 60000  // Change from 30000 to 60000
})
```

### ✅ Add a New Field to Services
1. Backend API returns new field in response
2. Update `SectionCard` props if needed
3. Data displays automatically!

Example:
```json
{
  "id": 1,
  "name": "Service Name",
  "description": "...",
  "image": "...",
  "price": "$99"  // New field!
}
```

Then in DynamicDashboard:
```tsx
<SectionCard
  title={service.name}
  description={service.description}
  image={service.image}
  details={{
    'Category': service.category,
    'Price': service.price  // Now shown!
  }}
/>
```

### ✅ Handle Missing Data
Check `DASHBOARD_GUIDE.md` → "Error Handling" section.

Components automatically show error messages if API is down.

## Debugging Checklist

- [ ] Backend running? Check `http://localhost:8000/api/v1/services`
- [ ] Environment variable set? Check `.env.local` has `NEXT_PUBLIC_API_BASE`
- [ ] Data in database? Backend should return non-empty arrays
- [ ] Images loading? Check URLs are valid and accessible
- [ ] Network requests? Open DevTools → Network tab → Check API calls

## Testing Your Changes

### Manual Testing
```bash
# Start dev server
npm run dev

# Open browser
http://localhost:3000

# Try these:
1. Refresh page - should see cached data instantly
2. Wait 30+ seconds - should see "refreshing" behavior
3. Close and reopen browser - should still see cached data
4. Stop backend server - should show error message
5. Restart backend - should auto-recover
```

### Automated Testing (Optional)
```bash
npm run test
# No tests configured yet
# See COMPONENT_ARCHITECTURE.md for examples
```

## Production Deployment

### Environment Variables
In production, set:
```
NEXT_PUBLIC_API_BASE=https://your-api-domain.com
```

### Build
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
# Install Vercel CLI (if not already)
npm i -g vercel

# Deploy
vercel
```

Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_BASE` → Your production API URL

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "No services found" message | Check backend is running and has data |
| Blank dashboard | Check browser console for errors |
| Images not showing | Verify image URLs in API response |
| Slow loading | Check API response time in DevTools |
| Data not updating | Try refreshing page or waiting for SWR revalidation |

## Learning Resources

1. **Next.js:** https://nextjs.org/docs
2. **SWR:** https://swr.vercel.app/
3. **Tailwind CSS:** https://tailwindcss.com/
4. **React:** https://react.dev/

## Next Steps

1. ✅ Run the dashboard (`npm run dev`)
2. ✅ Read `DASHBOARD_GUIDE.md` for full overview
3. ✅ Study `COMPONENT_ARCHITECTURE.md` for details
4. ✅ Try modifying components and see changes
5. ✅ Add new data fields from backend
6. ✅ Deploy to production

## Need Help?

Check these files in order:
1. `GETTING_STARTED.md` (this file) - Quick answers
2. `DASHBOARD_GUIDE.md` - How the dashboard works
3. `COMPONENT_ARCHITECTURE.md` - Component details
4. Code comments - Inline documentation

---

**Happy coding! 🚀**

Questions? Check the documentation files or examine the code directly—it's all heavily commented.
