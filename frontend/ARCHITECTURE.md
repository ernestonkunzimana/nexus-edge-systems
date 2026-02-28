# Frontend Architecture

Complete visual guide to the Nexus Edge Systems frontend architecture.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    NEXUS EDGE SYSTEMS FRONTEND                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   BROWSER / CLIENT                       │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Navigation (Header) + Pages + Footer             │  │  │
│  │  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐ ┌──────┐  │  │  │
│  │  │  │Home  │  │Serv. │  │Dev.  │  │Team  │ │Portf.│  │  │  │
│  │  │  └──────┘  └──────┘  └──────┘  └──────┘ └──────┘  │  │  │
│  │  │                      +                            │  │  │
│  │  │                  Contact Page                     │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                           ↓                              │  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │             React Components                       │  │  │
│  │  │  ┌─────────────────────────────────────────────┐   │  │  │
│  │  │  │ Layout: Navigation, Footer, HeroSection    │   │  │  │
│  │  │  │ Grids: ServicesGrid, DevicesGrid, etc.    │   │  │  │
│  │  │  │ Cards: StatCard, SectionCard              │   │  │  │
│  │  │  │ Forms: ContactForm                         │   │  │  │
│  │  │  └─────────────────────────────────────────────┘   │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                           ↓                              │  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │          Data Fetching Layer (SWR)               │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐              │  │  │
│  │  │  │ useServices  │  │ useDevices   │              │  │  │
│  │  │  └──────────────┘  └──────────────┘              │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐              │  │  │
│  │  │  │ useTeam      │  │ useProjects  │              │  │  │
│  │  │  └──────────────┘  └──────────────┘              │  │  │
│  │  │  • Caching       • Deduplication                 │  │  │
│  │  │  • Revalidation  • Error Handling                │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                           ↓                              │  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │          HTTP Requests (Fetch API)               │  │  │
│  │  │  GET /api/v1/services                            │  │  │
│  │  │  GET /api/v1/devices                             │  │  │
│  │  │  GET /api/v1/team                                │  │  │
│  │  │  GET /api/v1/projects                            │  │  │
│  │  │  POST /api/v1/contact                            │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND API SERVER                           │
│  (Node.js + Express)                                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Routes:                                                │   │
│  │  - GET  /api/v1/services → Database                    │   │
│  │  - GET  /api/v1/devices → Database                     │   │
│  │  - GET  /api/v1/team → Database                        │   │
│  │  - GET  /api/v1/projects → Database                    │   │
│  │  - POST /api/v1/contact → Email + Database             │   │
│  │                                                         │   │
│  │  Database: MongoDB / PostgreSQL                        │   │
│  │  Storage: S3 / Cloudinary (images)                     │   │
│  │  Email: Nodemailer                                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
RootLayout
├── Navigation
├── main (page content)
│   ├── Home Page
│   │   ├── HeroSection
│   │   └── DynamicDashboard
│   │       ├── StatCard (4x)
│   │       ├── SectionCard (Services)
│   │       ├── SectionCard (Devices)
│   │       ├── SectionCard (Team)
│   │       └── SectionCard (Projects)
│   │
│   ├── Services Page
│   │   ├── PageHeader
│   │   └── ServicesGrid
│   │       └── ServiceCard (multiple)
│   │
│   ├── Devices Page
│   │   ├── PageHeader
│   │   └── DevicesGrid
│   │       └── DeviceCard (multiple)
│   │
│   ├── Team Page
│   │   ├── PageHeader
│   │   └── TeamGrid
│   │       └── TeamMemberCard (multiple)
│   │
│   ├── Portfolio Page
│   │   ├── PageHeader
│   │   ├── PortfolioGrid
│   │   │   └── ProjectCard (multiple)
│   │   └── ProjectModal
│   │
│   └── Contact Page
│       ├── PageHeader
│       └── ContactForm
│
└── Footer
    ├── CompanyInfo
    ├── QuickLinks
    ├── Services
    └── ContactInfo
```

## Data Flow

```
USER INTERACTION
       ↓
   COMPONENT
       ↓
   CUSTOM HOOK (useServices, useDevices, etc.)
       ↓
   SWR (Smart caching & revalidation)
       ↓
   HTTP REQUEST
       ↓
   BACKEND API
       ↓
   DATABASE
       ↓
   API RESPONSE
       ↓
   SWR CACHE (stores result)
       ↓
   COMPONENT RE-RENDERS
       ↓
   UI UPDATES
```

## State Management

```
┌──────────────────────────────────────────┐
│       Component Local State              │
├──────────────────────────────────────────┤
│                                          │
│  Form State:                             │
│  - formData: { name, email, message }   │
│  - isSubmitting: boolean                │
│  - submitStatus: success|error|null     │
│                                          │
│  UI State:                               │
│  - mobileMenuOpen: boolean               │
│  - selectedProject: object|null          │
│  - isScrolled: boolean                   │
│                                          │
│  Data State: (via SWR)                   │
│  - services: array                       │
│  - devices: array                        │
│  - team: array                           │
│  - projects: array                       │
│                                          │
└──────────────────────────────────────────┘

No Redux / Context / Global State needed
(SWR + React hooks sufficient for this app)
```

## Styling Architecture

```
┌─────────────────────────────────┐
│      Styling System             │
├─────────────────────────────────┤
│                                 │
│  tailwind.config.ts             │
│  ├── Colors (design tokens)    │
│  ├── Animations (keyframes)    │
│  ├── Spacing (scale)           │
│  └── Extensions (plugins)      │
│                                 │
│  ↓                              │
│                                 │
│  globals.css                    │
│  ├── Tailwind directives       │
│  ├── Custom styles             │
│  ├── CSS variables             │
│  └── Animations                │
│                                 │
│  ↓                              │
│                                 │
│  Components                     │
│  └── Tailwind utility classes  │
│                                 │
└─────────────────────────────────┘
```

## Routing Structure

```
/
├── /services
├── /devices
├── /team
├── /portfolio
└── /contact

Each route:
- Has its own page.tsx
- Uses PageHeader component
- Fetches data via custom hooks
- Renders dynamic grids
```

## API Integration Pattern

```
┌────────────────────────────────────────────┐
│  Custom Hook (e.g., useServices)           │
├────────────────────────────────────────────┤
│                                            │
│  1. Define fetcher function                │
│     fetch(url) → response.json()           │
│                                            │
│  2. Call useSWR hook                       │
│     useSWR(url, fetcher, options)         │
│                                            │
│  3. Return organized object                │
│     {                                      │
│       services: data ?? [],                │
│       isLoading: boolean,                  │
│       isError: boolean,                    │
│       mutate: function                     │
│     }                                      │
│                                            │
│  4. Component uses hook                    │
│     const { services } = useServices()    │
│                                            │
│  5. Component renders with data            │
│     {services.map(s => <Card {...s} />)} │
│                                            │
└────────────────────────────────────────────┘
```

## File Organization

```
frontend/
│
├── app/ (Pages)
│   ├── layout.tsx (Root layout)
│   ├── globals.css (Global styles)
│   ├── page.tsx (Home)
│   └── [section]/page.tsx (Other pages)
│
├── components/ (React Components)
│   ├── Layout Components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── HeroSection.tsx
│   │
│   ├── Shared Components
│   │   ├── StatCard.tsx
│   │   └── SectionCard.tsx
│   │
│   ├── Dashboard
│   │   └── DynamicDashboard.tsx
│   │
│   └── pages/ (Page-specific components)
│       ├── PageHeader.tsx
│       ├── ServicesGrid.tsx
│       ├── DevicesGrid.tsx
│       ├── TeamGrid.tsx
│       ├── PortfolioGrid.tsx
│       └── ContactForm.tsx
│
├── lib/ (Utilities)
│   └── api/ (Data fetching hooks)
│       ├── useServices.ts
│       ├── useDevices.ts
│       ├── useTeam.ts
│       └── useProjects.ts
│
├── public/ (Static assets)
│   └── images/
│
├── Config Files
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── Documentation
    ├── README.md
    ├── DEVELOPMENT.md
    ├── QUICKSTART.md
    ├── .env.example
    └── ARCHITECTURE.md (this file)
```

## Technology Stack Layers

```
┌─────────────────────────────────────────┐
│         Deployment Layer                │
│         (Vercel / Docker / Node)        │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│         Next.js Runtime                 │
│         (Server & Client)               │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│      Application Layer                  │
│    Pages, Components, Hooks             │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│      Data Fetching Layer                │
│      SWR, Fetch API                     │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│      Styling Layer                      │
│      Tailwind CSS, CSS-in-JS            │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│      Browser / DOM                      │
│      React Rendering                    │
└─────────────────────────────────────────┘
```

## Performance Optimization

```
┌──────────────────────────────────────────┐
│      Performance Optimizations           │
├──────────────────────────────────────────┤
│                                          │
│  Image Optimization                      │
│  └─ Next.js Image component             │
│     - Lazy loading                       │
│     - Format conversion                  │
│     - Responsive sizing                  │
│                                          │
│  Code Splitting                          │
│  └─ Automatic per route                 │
│     - Dynamic imports                    │
│     - Component lazy loading             │
│                                          │
│  Caching Strategy                        │
│  └─ SWR Smart caching                   │
│     - Browser cache                      │
│     - API response cache                 │
│     - Deduplication                      │
│                                          │
│  CSS Optimization                        │
│  └─ Tailwind CSS purging                │
│     - Removes unused styles              │
│     - CSS minification                   │
│                                          │
│  Animation Performance                   │
│  └─ CSS animations (not JS)             │
│     - GPU acceleration                   │
│     - Smooth 60fps                       │
│                                          │
└──────────────────────────────────────────┘
```

## Error Handling Flow

```
Error Occurs
    ↓
Try/Catch Block
    ↓
Check Error Type
    ├─ Network Error → Show "Connection Failed"
    ├─ API Error → Show "Server Error"
    ├─ Validation Error → Show "Invalid Input"
    └─ Unknown Error → Show "Something Went Wrong"
    ↓
Log to Console (Development)
    ↓
Show User-Friendly Message
    ↓
Offer Solutions (Retry, Contact Support)
```

## Development Workflow

```
┌─────────────────────────────────┐
│  Make Code Changes              │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│  Hot Reload (HMR)               │
│  Page updates automatically     │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│  Test in Browser                │
│  Check console for errors       │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│  If API Issues:                 │
│  - Verify backend running       │
│  - Check network tab            │
│  - Review API response          │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│  Commit Changes                 │
│  Push to GitHub                 │
│  Deploy to Vercel               │
└─────────────────────────────────┘
```

## Environment Configuration

```
┌────────────────────────────────┐
│   .env.local (Local Dev)       │
├────────────────────────────────┤
│ NEXT_PUBLIC_API_BASE=localhost │
└────────────────────────────────┘
              ↓
┌────────────────────────────────┐
│   .env.production (Build Time) │
├────────────────────────────────┤
│ NEXT_PUBLIC_API_BASE=api.prod  │
└────────────────────────────────┘
              ↓
┌────────────────────────────────┐
│   Vercel Dashboard             │
│   (Environment Variables)      │
└────────────────────────────────┘
```

## Deployment Pipeline

```
┌──────────────┐
│ Local Dev    │
└──────┬───────┘
       │
       ↓
┌──────────────────────┐
│ Push to GitHub       │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ GitHub Webhook       │
│ Triggers Vercel      │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ Vercel Build         │
│ - npm install        │
│ - npm run build      │
│ - Run tests          │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ Vercel Deploy        │
│ - Start server       │
│ - Route to domain    │
│ - CDN caching        │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ Production Live      │
│ https://domain.com   │
└──────────────────────┘
```

## Key Architectural Principles

1. **Separation of Concerns**
   - Pages contain routing logic
   - Components contain UI logic
   - Hooks contain data fetching logic
   - Styles use utility classes

2. **Reusability**
   - Components used in multiple places
   - Hooks shared across components
   - Styling patterns consistent

3. **Performance**
   - Images optimized
   - Code split by route
   - Data cached intelligently
   - Animations CSS-based

4. **Maintainability**
   - Clear file organization
   - Consistent naming conventions
   - Comprehensive comments
   - Type-safe with TypeScript

5. **Scalability**
   - Easy to add new pages
   - Easy to add new components
   - Easy to add new API hooks
   - Modular architecture

---

This architecture provides a solid foundation for a modern, performant, and maintainable web application.
