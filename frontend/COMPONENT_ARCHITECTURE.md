# Component Architecture Guide

## Overview

The dashboard is built with a **modular, reusable component architecture**. Each component has a single responsibility and receives data through props.

## Component Hierarchy

```
DynamicDashboard (Main Container)
├── Header (Navigation & Title)
├── StatCard (Overview Metrics)
│   ├── 4x Services/Devices/Team/Projects counters
│   └── Variants: default, success, warning
├── Services Section
│   └── SectionCard (for each service)
├── Devices Section
│   └── SectionCard (for each device)
├── Team Section
│   └── Custom Card Component (team-specific)
├── Projects Section
│   └── Custom Card Component (project-specific)
└── Footer (API Info)
```

## Component Details

### 1. DynamicDashboard
**File:** `frontend/components/DynamicDashboard.tsx`  
**Type:** Client Component (`"use client"`)  
**Responsibility:** Main orchestrator that manages all API hooks and renders sections

#### What It Does:
- Imports and calls all data hooks (useServices, useDevices, useTeam, useProjects)
- Calculates aggregate statistics from live data
- Manages loading and error states
- Renders all dashboard sections with explanatory text
- Provides fallback UI when data is unavailable

#### Key Methods:
```typescript
// Calculate totals from API data
const totalServices = services.length
const totalDevices = devices.length
const totalTeam = team.length
const totalProjects = projects.length
const totalMetrics = totalServices + totalDevices + totalTeam + totalProjects
```

#### Props: None
This is the root component and doesn't accept props.

#### Example Usage:
```tsx
import DynamicDashboard from '@/components/DynamicDashboard'

export default function Page() {
  return <DynamicDashboard />
}
```

---

### 2. StatCard
**File:** `frontend/components/StatCard.tsx`  
**Type:** Presentational Component (No state)  
**Responsibility:** Display a single metric with explanation

#### What It Does:
- Shows a labeled metric value
- Displays descriptive text explaining what the metric represents
- Applies visual styling variants (default, success, warning)
- Includes optional icon

#### Props Interface:
```typescript
interface StatCardProps {
  label: string           // Metric name (e.g., "Services Offered")
  value: string | number  // The numeric/text value to display
  description: string     // Explanation of what this stat represents
  icon?: ReactNode        // Optional icon component
  variant?: 'default' | 'success' | 'warning'
}
```

#### Styling:
- **Default:** `bg-white/5` (semi-transparent white)
- **Success:** `bg-green-500/10` (semi-transparent green)
- **Warning:** `bg-yellow-500/10` (semi-transparent yellow)
- Hover effect: Background brightens
- Smooth transition on hover

#### Example Usage:
```tsx
<StatCard
  label="Services Offered"
  value={totalServices}
  description="IT solutions available in our catalog"
  icon={<Zap className="w-5 h-5" />}
  variant="success"
/>
```

#### Explanation:
The StatCard is reusable and not tied to any specific data. It simply displays what you pass to it. The DynamicDashboard calculates the values and passes them down.

---

### 3. SectionCard
**File:** `frontend/components/SectionCard.tsx`  
**Type:** Presentational Component (No state)  
**Responsibility:** Display a content item (service, device, etc.)

#### What It Does:
- Displays an item card with image, title, and description
- Shows optional badge for categorization
- Displays details as key-value pairs
- Shows skeleton loader while data is loading
- Handles missing images gracefully

#### Props Interface:
```typescript
interface SectionCardProps {
  title: string                              // Item name
  description: string                        // Item description
  image?: string                             // Image URL (optional)
  details?: Record<string, string | number>  // Extra info (key-value pairs)
  isLoading?: boolean                        // Show skeleton if true
  badge?: string                             // Category badge text
}
```

#### Features:

**Image Handling:**
```typescript
// Falls back to gradient if image fails to load
<Image
  src={image}
  alt={title}
  fill
  className="object-cover"
  onError={(e) => {
    e.currentTarget.style.display = 'none'
  }}
/>
```

**Details Display:**
```typescript
// Shows key-value pairs
{details && (
  Object.entries(details).map(([key, value]) => (
    <div key={key} className="flex justify-between">
      <span>{key}:</span>
      <span className="text-white/80 font-medium">{value}</span>
    </div>
  ))
)}
```

**Loading Skeleton:**
Shows animated placeholder while `isLoading={true}`

#### Example Usage:
```tsx
<SectionCard
  title={service.name}
  description={service.description}
  image={service.image}
  badge={service.category}
  details={{
    'Category': 'Hardware',
    'Status': 'Active'
  }}
/>
```

#### Styling:
- Card: `bg-white/5` with `border-white/10`
- Hover: `bg-white/10` with `border-white/20`
- Responsive: Works on all screen sizes
- Smooth transitions on hover

---

## Data Flow Hooks

### 4. useServices Hook
**File:** `frontend/lib/api/useServices.ts`  
**Type:** Custom React Hook  
**Responsibility:** Fetch and cache services data

#### What It Does:
- Calls `GET /api/v1/services` endpoint
- Caches response with SWR
- Revalidates every 30 seconds
- Returns data, loading, and error states

#### Return Value:
```typescript
{
  services: any[],      // Array of service objects
  isLoading: boolean,   // True while fetching
  isError: boolean      // True if request failed
}
```

#### SWR Configuration:
```typescript
useSWR(`${API_BASE}/api/v1/services`, fetcher, {
  refreshInterval: 30000,    // Revalidate every 30 seconds
  revalidateOnFocus: false   // Don't refetch on window focus
})
```

#### Example Usage:
```tsx
const { services, isLoading, isError } = useServices()

if (isLoading) return <div>Loading services...</div>
if (isError) return <div>Failed to load services</div>

return services.map(service => (
  <ServiceCard key={service.id} service={service} />
))
```

---

### 5. useDevices Hook
**File:** `frontend/lib/api/useDevices.ts`  
**Type:** Custom React Hook  
**Responsibility:** Fetch and cache devices data

#### What It Does:
- Calls `GET /api/v1/devices` endpoint
- Caches response with SWR
- Revalidates every 30 seconds
- Returns data, loading, and error states

#### Return Value:
```typescript
{
  devices: any[],       // Array of device objects
  isLoading: boolean,   // True while fetching
  isError: boolean      // True if request failed
}
```

---

### 6. useTeam Hook
**File:** `frontend/lib/api/useTeam.ts`  
**Type:** Custom React Hook  
**Responsibility:** Fetch and cache team data

#### What It Does:
- Calls `GET /api/v1/team` endpoint
- Caches response with SWR
- Revalidates every 60 seconds (less frequent than other endpoints)
- Returns data, loading, and error states

#### Return Value:
```typescript
{
  team: any[],          // Array of team member objects
  isLoading: boolean,   // True while fetching
  isError: boolean      // True if request failed
}
```

#### Special Feature:
Team data is fetched less frequently (60s vs 30s) since it changes less often.

---

### 7. useProjects Hook
**File:** `frontend/lib/api/useProjects.ts`  
**Type:** Custom React Hook  
**Responsibility:** Fetch and cache projects data

#### What It Does:
- Calls `GET /api/v1/projects` endpoint
- Caches response with SWR
- Revalidates every 30 seconds
- Returns data, loading, and error states

#### Return Value:
```typescript
{
  projects: any[],      // Array of project objects
  isLoading: boolean,   // True while fetching
  isError: boolean      // True if request failed
}
```

---

## Component Composition Pattern

The dashboard uses a **container/presentational** pattern:

```
Container (DynamicDashboard)
├── Manages state (API data)
├── Handles loading/errors
└── Passes data to presentational components

Presentational Components (StatCard, SectionCard)
├── Receive data as props
├── Handle display only
└── No direct API calls
```

## Reusability Examples

### Using StatCard Elsewhere
```tsx
import StatCard from '@/components/StatCard'

export function CustomMetrics() {
  return (
    <StatCard
      label="Active Users"
      value={1234}
      description="Users currently online"
      variant="success"
    />
  )
}
```

### Using SectionCard for Different Content
```tsx
import SectionCard from '@/components/SectionCard'

// For blog posts
<SectionCard
  title={post.title}
  description={post.excerpt}
  image={post.featuredImage}
  details={{ 'Author': post.author, 'Date': post.date }}
/>

// For products
<SectionCard
  title={product.name}
  description={product.description}
  image={product.image}
  badge={product.category}
  details={{ 'Price': `$${product.price}`, 'Stock': product.stock }}
/>
```

## Adding New Components

### Step 1: Create Component File
```typescript
// components/NewComponent.tsx
interface NewComponentProps {
  prop1: string
  prop2: number
}

export default function NewComponent({ prop1, prop2 }: NewComponentProps) {
  return <div>{prop1} - {prop2}</div>
}
```

### Step 2: Import in DynamicDashboard
```typescript
import NewComponent from './NewComponent'
```

### Step 3: Use in JSX
```tsx
<NewComponent prop1="value" prop2={42} />
```

## Testing Components

### Testing StatCard
```typescript
import { render, screen } from '@testing-library/react'
import StatCard from '@/components/StatCard'

test('renders stat card with label and value', () => {
  render(
    <StatCard
      label="Test Label"
      value={42}
      description="Test description"
    />
  )
  expect(screen.getByText('Test Label')).toBeInTheDocument()
  expect(screen.getByText(42)).toBeInTheDocument()
})
```

### Testing Data Hooks
```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { useServices } from '@/lib/api/useServices'

test('fetches services data', async () => {
  const { result } = renderHook(() => useServices())
  
  await waitFor(() => {
    expect(result.current.isLoading).toBe(false)
  })
  
  expect(result.current.services).toHaveLength(> 0)
})
```

## Performance Optimization

### Component-Level
- Use `React.memo` for presentational components that receive same props
- Prevent unnecessary re-renders with proper prop comparison

### Data-Level
- SWR handles caching and deduplication
- Adjust `refreshInterval` based on data change frequency
- Use `revalidateOnFocus: false` to avoid excessive refetches

### Rendering
- Grid layouts with `gap-6` for spacing efficiency
- Tailwind's responsive classes for mobile-first design
- Lazy loading images with Next.js Image component

---

**Last Updated:** 2026-02-28  
**Status:** ✅ Complete & Explainable
