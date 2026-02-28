# Dynamic Dashboard Guide

## Overview

The Nexus Edge Systems dashboard is a **fully dynamic, data-driven interface** that fetches all content from backend APIs. Nothing is hardcoded—all services, devices, team members, and projects are loaded in real-time from the server.

## How It Works

### Architecture

```
Frontend (Next.js)
├── DynamicDashboard Component
│   ├── useServices Hook (fetches /api/v1/services)
│   ├── useDevices Hook (fetches /api/v1/devices)
│   ├── useTeam Hook (fetches /api/v1/team)
│   └── useProjects Hook (fetches /api/v1/projects)
└── SWR (for caching and real-time updates)

Backend API
├── /api/v1/services → Service catalog
├── /api/v1/devices → Device inventory
├── /api/v1/team → Team members
└── /api/v1/projects → Portfolio projects
```

### Data Flow

1. **Page Loads** → DynamicDashboard mounts
2. **Hooks Trigger** → Each hook calls its corresponding API endpoint
3. **SWR Caching** → Data is cached and revalidated at intervals:
   - Services/Devices/Projects: 30 seconds
   - Team: 60 seconds
4. **Components Render** → Data renders in respective sections
5. **Loading States** → Skeleton loaders shown while fetching

## Components

### `DynamicDashboard` (Main Container)
**Location:** `frontend/components/DynamicDashboard.tsx`

The main dashboard component that:
- Orchestrates all API hooks
- Calculates real-time stats (total services, devices, team members, projects)
- Displays 5 main sections with explanatory text for each
- Shows error states when APIs are unavailable
- Provides API base URL in footer for debugging

**Key Features:**
- ✅ Fully explainable sections with descriptions
- ✅ Live stat cards that update from API data
- ✅ Error handling with helpful messages
- ✅ Loading skeletons for better UX
- ✅ Responsive grid layout

### `StatCard` (Metric Display)
**Location:** `frontend/components/StatCard.tsx`

Displays a single metric with:
- Label and value
- Descriptive explanation of what the stat represents
- Optional icon
- Visual variants (default, success, warning)

### `SectionCard` (Content Card)
**Location:** `frontend/components/SectionCard.tsx`

Reusable card for displaying items (services, devices, etc.):
- Title and description
- Image support with fallback
- Badge for categorization
- Details key-value pairs
- Loading skeleton state

## Data Fetching Hooks

All hooks use **SWR** (stale-while-revalidate) for efficient caching:

### `useServices()`
**File:** `frontend/lib/api/useServices.ts`

Fetches services from `/api/v1/services`

```typescript
const { services, isLoading, isError } = useServices()
```

**Expected Data Format:**
```json
[
  {
    "id": "string",
    "name": "Service Name",
    "description": "Service description",
    "image": "https://image-url.jpg",
    "category": "Category name"
  }
]
```

### `useDevices()`
**File:** `frontend/lib/api/useDevices.ts`

Fetches devices from `/api/v1/devices`

```typescript
const { devices, isLoading, isError } = useDevices()
```

**Expected Data Format:**
```json
[
  {
    "id": "string",
    "name": "Device Name",
    "description": "Device description",
    "image": "https://image-url.jpg",
    "type": "Device type",
    "brand": "Brand name",
    "issuesFixed": "Common issues"
  }
]
```

### `useTeam()`
**File:** `frontend/lib/api/useTeam.ts`

Fetches team members from `/api/v1/team`

```typescript
const { team, isLoading, isError } = useTeam()
```

**Expected Data Format:**
```json
[
  {
    "id": "string",
    "name": "Member Name",
    "position": "Job title",
    "expertise": "Skills/expertise",
    "whatsapp": "+1234567890"
  }
]
```

### `useProjects()`
**File:** `frontend/lib/api/useProjects.ts`

Fetches projects from `/api/v1/projects`

```typescript
const { projects, isLoading, isError } = useProjects()
```

**Expected Data Format:**
```json
[
  {
    "id": "string",
    "name": "Project Name",
    "description": "Project description",
    "completion": 75
  }
]
```

## Dashboard Sections Explained

### 1. **Overview Stats**
Shows 4 key metrics:
- **Services Offered** - Count from `/api/v1/services`
- **Devices Maintained** - Count from `/api/v1/devices`
- **Team Members** - Count from `/api/v1/team`
- **Portfolio Projects** - Count from `/api/v1/projects`

*Explanation:* These stats are calculated dynamically from live API data. They update whenever the API data changes.

### 2. **Services Catalog**
Displays all available IT services:
- Each service card shows: name, description, image, category
- Grid layout (responsive: 1 col mobile, 2 cols tablet, 3 cols desktop)
- Hover effects for interactivity

*Explanation:* Services represent the IT solutions Nexus Edge offers. All data comes from the backend—add/remove services without touching frontend code.

### 3. **Devices We Maintain**
Lists all supported equipment:
- Displays: name, description, image, brand, type
- Includes common issues fixed
- Grid layout matching services

*Explanation:* Shows the complete equipment inventory. Helps clients identify if we support their devices. Each device can have an associated image.

### 4. **Our Team**
Displays team members with:
- Name, position, expertise areas
- WhatsApp contact button (dynamically generated)
- Click-to-chat functionality

*Explanation:* Builds trust by showing available expertise. WhatsApp links are generated automatically from phone numbers stored in the database.

### 5. **Portfolio Showcase**
Shows completed projects with:
- Project name and description
- Progress bar (0-100%)
- Visual representation of completion status

*Explanation:* Demonstrates past work and capabilities. Progress bars show project status at a glance.

## Configuration

### Environment Variables

**Required in `.env.local`:**

```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

- Set this to your backend API URL
- Used by all hooks for API calls
- Must be accessible from the browser

### SWR Configuration

Hooks are configured for optimal performance:

```typescript
// Services, Devices, Projects: Revalidate every 30 seconds
refreshInterval: 30000,

// Team: Revalidate every 60 seconds (less frequent)
refreshInterval: 60000,

// Don't refetch on window focus
revalidateOnFocus: false
```

Adjust intervals in the hook files if needed.

## Error Handling

The dashboard gracefully handles API failures:

1. **API Down** → Shows error card with helpful message
2. **Empty Data** → Displays "No items found" message
3. **Network Issues** → Loading state persists until resolved
4. **Missing Images** → Falls back to gradient background

Error messages suggest checking API URL in the footer.

## Customization

### Adding a New Section

1. **Create a hook** in `frontend/lib/api/`:
   ```typescript
   export function useNewData() {
     const { data, error, isLoading } = useSWR(`${API_BASE}/api/v1/new-endpoint`, fetcher)
     return { newData: data ?? [], isLoading, isError: !!error }
   }
   ```

2. **Import in DynamicDashboard:**
   ```typescript
   import { useNewData } from '../lib/api/useNewData'
   ```

3. **Add section to dashboard:**
   ```jsx
   const { newData, isLoading } = useNewData()
   
   <section className="mb-12">
     {/* Your section JSX */}
   </section>
   ```

### Styling Changes

All styling uses Tailwind CSS. To customize:
- Colors: Change gradient classes (e.g., `bg-gradient-to-r from-cyan-600 to-blue-600`)
- Spacing: Adjust gap and padding values
- Responsive: Use `md:` and `lg:` prefixes for breakpoints

## Debugging

### Check API Connectivity

Open browser DevTools → Network tab → Filter by "api/v1"

Should see:
- ✅ `/api/v1/services` - 200 OK
- ✅ `/api/v1/devices` - 200 OK
- ✅ `/api/v1/team` - 200 OK
- ✅ `/api/v1/projects` - 200 OK

### Common Issues

| Issue | Solution |
|-------|----------|
| Blank sections | Check API base URL in footer |
| "No items found" | Verify backend has data in database |
| Images not loading | Check image URLs in API response are valid |
| Slow loading | Check API response time in DevTools |

### View API Responses

Browser console:
```javascript
// Inspect SWR cache
console.log(useSWR.cache)

// Check specific API call
fetch('http://localhost:8000/api/v1/services')
  .then(r => r.json())
  .then(console.log)
```

## Performance

- **Caching:** SWR prevents redundant API calls
- **Lazy Loading:** Images are lazy-loaded by Next.js
- **Responsive:** Grid layouts adjust to screen size
- **Loading States:** Skeletons prevent layout shift

## Future Enhancements

Potential improvements:
- [ ] Search/filter functionality
- [ ] Pagination for large datasets
- [ ] Click-to-expand modal views
- [ ] Real-time WebSocket updates
- [ ] Admin panel for content management
- [ ] Export functionality (PDF, CSV)
- [ ] Analytics tracking

## Support

For backend API issues, check:
- Backend logs for errors
- API endpoint implementations
- Database connectivity
- CORS configuration (if frontend/backend on different domains)

---

**Dashboard Created:** 2026-02-28  
**Framework:** Next.js 16  
**Styling:** Tailwind CSS  
**Data Fetching:** SWR  
**Status:** ✅ Fully Dynamic and Explainable
