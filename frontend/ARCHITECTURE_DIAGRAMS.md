# Architecture Diagrams & Visual Explanations

## System Architecture Overview

```
┌────────────────────────────────────────────────────────────────┐
│                     NEXUS EDGE SYSTEMS                         │
│                   Dynamic Dashboard System                      │
└────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐      ┌─────────────────────────┐
│    FRONTEND (Next.js 16)      │      │   BACKEND (Python/Node) │
│                              │      │                         │
│ ┌────────────────────────┐   │      │ ┌─────────────────────┐ │
│ │  DynamicDashboard     │   │      │ │   API Endpoints     │ │
│ │  (Main Component)     │   │      │ │                     │ │
│ └──────────┬─────────────┘   │      │ │ ✓ /api/v1/services  │ │
│            │                 │      │ │ ✓ /api/v1/devices   │ │
│ ┌──────────┴──────┬──────────┤──────┤─ │ ✓ /api/v1/team      │ │
│ │      │          │          │      │ │ ✓ /api/v1/projects  │ │
│ ▼      ▼          ▼          ▼      │ └─────────────────────┘ │
│useS   useD      useT        useP    │                         │
│ervi   evic      eam         rojec   │ ┌─────────────────────┐ │
│ces    es        s           ts      │ │   Database (MongoDB)│ │
│                                │      │                     │ │
│         ┌──────────────────────┘      │ • Services          │ │
│         │                             │ • Devices           │ │
│ ┌───────▼────────────────────┐       │ • Team              │ │
│ │    SWR (Caching Layer)     │       │ • Projects          │ │
│ │                            │       │ • Inquiries         │ │
│ │ • Cache Management         │       │                     │ │
│ │ • Revalidation (30-60s)    │       └─────────────────────┘ │
│ │ • Error Handling           │                         │
│ └────────┬───────────────────┘       └─────────────────────┘
│          │
│ ┌────────▼──────────────────────────┐
│ │    Component Rendering Layer      │
│ │                                  │
│ │ ┌──────────┐  ┌──────────────┐  │
│ │ │StatCard  │  │SectionCard   │  │
│ │ │(Metrics) │  │(Content)     │  │
│ │ └──────────┘  └──────────────┘  │
│ └───────────────────────────────────┘
│          │
│ ┌────────▼──────────────────────────┐
│ │    Dashboard Sections             │
│ │                                  │
│ │ 1. Overview Stats               │
│ │ 2. Services Catalog             │
│ │ 3. Devices We Maintain          │
│ │ 4. Our Team                     │
│ │ 5. Portfolio Showcase           │
│ │                                  │
│ └───────────────────────────────────┘
│          │
└──────────┼──────────────────────────────┘
           │
     ┌─────▼────────┐
     │  Browser DOM │
     │  User Screen │
     └──────────────┘
```

## Component Tree

```
App Layout
└── Page Component
    └── DynamicDashboard
        ├── Header Section
        │   ├── Title
        │   └── Subtitle
        ├── Overview Stats Section
        │   ├── StatCard (Services)
        │   ├── StatCard (Devices)
        │   ├── StatCard (Team)
        │   └── StatCard (Projects)
        ├── Services Section
        │   ├── Section Title & Description
        │   └── Grid of SectionCards
        │       ├── SectionCard (Service 1)
        │       ├── SectionCard (Service 2)
        │       └── SectionCard (Service N)
        ├── Devices Section
        │   ├── Section Title & Description
        │   └── Grid of SectionCards
        │       ├── SectionCard (Device 1)
        │       ├── SectionCard (Device 2)
        │       └── SectionCard (Device N)
        ├── Team Section
        │   ├── Section Title & Description
        │   └── Grid of Team Cards
        │       ├── Team Card (Member 1)
        │       ├── Team Card (Member 2)
        │       └── Team Card (Member N)
        ├── Projects Section
        │   ├── Section Title & Description
        │   └── Grid of Project Cards
        │       ├── Project Card (Project 1)
        │       ├── Project Card (Project 2)
        │       └── Project Card (Project N)
        └── Footer Section
            └── API Configuration Info
```

## Data Flow Sequence

```
USER OPENS DASHBOARD
        │
        ▼
   Page Mounts
        │
        ▼
   DynamicDashboard Component Initializes
        │
        ├─────────────────────────────────────────┐
        │                                         │
        ▼                                         ▼
   useServices Hook                         useDevices Hook
   Called                                   Called
        │                                         │
        ▼                                         ▼
   Check SWR Cache                         Check SWR Cache
        │                                         │
    ┌───┴─────────────────────────────────────────┴───┐
    │                                                 │
    ▼ (If not cached)                                ▼ (If cached)
   Fetch from Backend                           Return Cached Data
   GET /api/v1/services                         (Instant, No Delay)
        │
        ▼
   Network Request Sent to Backend
   (http://localhost:8000/api/v1/services)
        │
        ▼
   Backend Processes Request
   • Query MongoDB for services
   • Return JSON response
        │
        ▼
   Response Received in Browser
   [{ id, name, description, image, ... }]
        │
        ▼
   SWR Caches Response
   Next 30 seconds: Use cache
   After 30 seconds: Revalidate
        │
        ▼
   Component Re-renders with Data
        │
        ▼
   Services Grid Displays with SectionCards
   (Users see the data)
        │
        ▼
   User Interactions
   • Hover over cards
   • Scroll to see more
   • Click on team WhatsApp links
        │
        ▼
   30 Seconds Pass
        │
        ▼
   SWR Revalidates in Background
   (User sees no change unless data changed)
        │
        ▼
   Data Re-fetched
   Cache Updated
   Components Re-render if data changed
```

## API Request/Response Cycle

```
FRONTEND REQUEST
┌──────────────────────────────────────────────────┐
│ GET http://localhost:8000/api/v1/services       │
│                                                  │
│ Headers:                                         │
│ • Accept: application/json                       │
│ • User-Agent: Browser                            │
│ • (SWR auto-handles headers)                     │
└──────────────────────────────────────────────────┘
                    │
                    │ (Network)
                    │
                    ▼
┌──────────────────────────────────────────────────┐
│           BACKEND PROCESSING                     │
│                                                  │
│ 1. Receive request at /api/v1/services          │
│ 2. Authenticate (if needed)                      │
│ 3. Query MongoDB for all services                │
│ 4. Serialize to JSON                             │
│ 5. Set response headers (CORS if needed)         │
└──────────────────────────────────────────────────┘
                    │
                    │
                    ▼
BACKEND RESPONSE
┌──────────────────────────────────────────────────┐
│ HTTP 200 OK                                      │
│                                                  │
│ {                                                │
│   "data": [                                      │
│     {                                            │
│       "id": "svc_001",                           │
│       "name": "CBS Software",                    │
│       "description": "Core Banking Solution",    │
│       "image": "https://..../cbs.jpg",           │
│       "category": "Software"                     │
│     },                                           │
│     {                                            │
│       "id": "svc_002",                           │
│       "name": "IoT Solutions",                   │
│       "description": "Connected Devices",        │
│       "image": "https://..../iot.jpg",           │
│       "category": "Hardware"                     │
│     }                                            │
│   ]                                              │
│ }                                                │
└──────────────────────────────────────────────────┘
                    │
                    │ (Network)
                    │
                    ▼
FRONTEND PROCESSING
┌──────────────────────────────────────────────────┐
│ 1. Receive JSON response                         │
│ 2. Parse JSON in JavaScript                      │
│ 3. SWR caches response                           │
│ 4. Update component state                        │
│ 5. React re-renders UI                           │
│ 6. Services appear in grid                       │
└──────────────────────────────────────────────────┘
                    │
                    ▼
USER SEES DATA IN BROWSER
```

## State Management Flow

```
┌────────────────────────────────────────────────────────┐
│         Data State in DynamicDashboard                 │
└────────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
   const {         const {         const {
   services,      devices,         team,
   isLoading,     isLoading,       isLoading,
   isError        isError          isError
   }              }                }
        │               │               │
        └───────────────┼───────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │  Conditional Rendering│
            └───────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
    isLoading?     isError?        services
    Show           Show Error       Available?
    Skeleton       Message          Show Data
        │               │               │
        └───────────────┴───────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │  Component Rendering  │
            │   with Data or        │
            │   Fallback UI         │
            └───────────────────────┘
```

## API Endpoint Mapping

```
Dashboard Sections → API Endpoints → Database Collections

┌─────────────────────────────────────────────────────────┐
│ Overview Stats Section                                  │
│ • Calculate: totalServices = services.length            │
│ • Calculate: totalDevices = devices.length              │
│ • Calculate: totalTeam = team.length                    │
│ • Calculate: totalProjects = projects.length            │
│ • Display in 4 StatCards                                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Services Section                                         │
│ ├─ Hook: useServices()                                   │
│ ├─ Endpoint: GET /api/v1/services                        │
│ ├─ Database: MongoDB collection "services"              │
│ ├─ Data Fields: id, name, description, image, category │
│ └─ UI: Grid of SectionCards                             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Devices Section                                          │
│ ├─ Hook: useDevices()                                    │
│ ├─ Endpoint: GET /api/v1/devices                         │
│ ├─ Database: MongoDB collection "devices"               │
│ ├─ Data Fields: id, name, description, image, type     │
│ └─ UI: Grid of SectionCards                             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Team Section                                             │
│ ├─ Hook: useTeam()                                       │
│ ├─ Endpoint: GET /api/v1/team                            │
│ ├─ Database: MongoDB collection "team"                  │
│ ├─ Data Fields: id, name, position, expertise, whatsapp│
│ └─ UI: Grid of Team Cards with WhatsApp buttons        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Projects Section                                         │
│ ├─ Hook: useProjects()                                   │
│ ├─ Endpoint: GET /api/v1/projects                        │
│ ├─ Database: MongoDB collection "projects"              │
│ ├─ Data Fields: id, name, description, completion      │
│ └─ UI: Grid of Project Cards with Progress Bars        │
└─────────────────────────────────────────────────────────┘
```

## Rendering Pipeline

```
┌──────────────────────────────────────────────────────────┐
│          REACT RENDERING PIPELINE                        │
└──────────────────────────────────────────────────────────┘

Step 1: Component Mounts
    DynamicDashboard() called
    ↓
Step 2: Hooks Execute (in order)
    • useServices()
    • useDevices()
    • useTeam()
    • useProjects()
    ↓
Step 3: Initial Render (with loading states)
    • StatCards show "Loading..." (if data not cached)
    • Skeleton loaders appear
    ↓
Step 4: API Responses Arrive
    • SWR updates cache
    • Component state updates
    ↓
Step 5: Component Re-renders
    • StatCards show actual numbers
    • Skeleton loaders replaced with data
    • SectionCards populated with items
    ↓
Step 6: Browser Renders DOM
    • Styles applied via Tailwind
    • Images loaded by Next.js Image component
    • User sees completed dashboard
    ↓
Step 7: Revalidation Cycle
    Every 30-60 seconds:
    • SWR checks for fresh data
    • API called in background
    • Update cache if changed
    • Re-render if data changed
    ↓
Step 8: User Interactions
    • Hover effects trigger
    • WhatsApp links clickable
    • Scroll works normally
```

## Caching Strategy Visualization

```
TIME →

0s    DashboardAdvanced Mounts
      ├─ Fetch all endpoints
      ├─ Cache filled
      └─ Display data
      
10s   User scrolls, still using cache
      ├─ No new API calls
      └─ Instant performance
      
30s   SWR revalidation trigger
      ├─ Background fetch starts
      ├─ User sees no change
      └─ Cache updating...
      
30.5s Background fetch completes
      ├─ Compare new vs old data
      ├─ If changed: update cache
      ├─ If changed: re-render (transparent to user)
      └─ If same: do nothing
      
40s   Still using revalidated cache
      ├─ No new API calls
      └─ Fresh data available
      
60s   SWR revalidation trigger again
      └─ Repeat cycle...

═════════════════════════════════════════════════════

Why This Works Well:

✓ First load: Fetches data (slight delay acceptable)
✓ Subsequent loads: Uses cache (instant)
✓ Background updates: Data stays fresh
✓ User experience: Smooth and responsive
✓ Server load: Reduced API calls (caching)
```

## Error Recovery Flow

```
                    API Call Made
                          │
                ┌─────────┴─────────┐
                │                   │
                ▼                   ▼
            Success              Failure
                │                   │
                ▼                   ▼
        Return Data          Error Occurred
                │             (Network/Server)
                │                   │
                ▼                   ▼
        Cache Data          Check Cache
                │                   │
                │            ┌──────┴──────┐
                │            │             │
                │            ▼             ▼
                │      Has Cached    No Cached
                │      Data?         Data
                │         │             │
                │         ▼             ▼
                │      Use Cached   Show Error
                │      Data +       Message
                │      Error        "API Down"
                │      Notice       "Try Again"
                │         │             │
                └─────────┴─────────────┘
                          │
                          ▼
                   Component Renders
                    (User Informed)
```

---

**These diagrams explain:**
1. **System Architecture** - How frontend and backend connect
2. **Component Tree** - How React components nest
3. **Data Flow** - How data moves through the system
4. **API Cycle** - How requests/responses work
5. **Rendering Pipeline** - How React renders to DOM
6. **Caching Strategy** - How SWR keeps data fresh
7. **Error Recovery** - How failures are handled

**Reference these when:**
- Adding new features
- Debugging issues
- Explaining to others
- Optimizing performance

