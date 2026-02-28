# Frontend Development Guide

Complete guide for developers working on the Nexus Edge Systems frontend.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Git
- Basic knowledge of React and Next.js

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd frontend

# Install dependencies
npm install
# or yarn install / pnpm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` - you should see the home page with navigation and hero section.

## Development Workflow

### 1. Creating a New Page

Pages in Next.js App Router are created by adding `page.tsx` files in the `app/` directory.

**Example: New "Services" page**

```typescript
// app/services/page.tsx
import ServicesGrid from '@/components/pages/ServicesGrid'
import PageHeader from '@/components/pages/PageHeader'

export const metadata = {
  title: 'Our Services | Nexus Edge Systems',
  description: 'Explore our IT solutions...',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Our Services"
        subtitle="IT Solutions"
        description="Comprehensive services..."
      />
      <ServicesGrid />
    </div>
  )
}
```

**Step-by-Step:**
1. Create folder: `app/[page-name]/`
2. Add `page.tsx` with React component
3. Import components from `components/pages/`
4. Add metadata for SEO
5. Add route to Navigation.tsx: `{ href: '/[page-name]', label: 'Page Name', icon: IconComponent }`

### 2. Creating a New Component

Components should be placed in `/components` or `/components/pages` depending on scope.

**Best Practices:**
- Use TypeScript interfaces for props
- Mark client components with `'use client'`
- Keep components focused and small
- Add JSDoc comments for complex logic
- Use Tailwind classes for styling

**Example: New Service Card Component**

```typescript
// components/ServiceCard.tsx
'use client'

import Image from 'next/image'
import { ReactNode } from 'react'

interface ServiceCardProps {
  title: string
  description: string
  image: string
  icon: ReactNode
  href?: string
}

export default function ServiceCard({
  title,
  description,
  image,
  icon,
  href,
}: ServiceCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30 hover:border-blue-500/50 transition-all">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm mb-4">{description}</p>
        {href && (
          <a href={href} className="text-blue-400 hover:text-blue-300 font-semibold">
            Learn More →
          </a>
        )}
      </div>
    </div>
  )
}
```

### 3. Fetching Data with SWR Hooks

All data fetching uses custom SWR hooks in `lib/api/`.

**Example: Using the useServices hook**

```typescript
'use client'

import { useServices } from '@/lib/api/useServices'

export default function ServicesList() {
  const { services, isLoading, isError } = useServices()

  if (isLoading) {
    return <div>Loading services...</div>
  }

  if (isError) {
    return <div>Error loading services. Please try again.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div key={service.id}>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  )
}
```

**Creating a New Data Hook**

```typescript
// lib/api/useCustomData.ts
'use client'

import useSWR from 'swr'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

const fetcher = (url: string) => 
  fetch(url).then((r) => r.json()).catch(() => null)

export function useCustomData() {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_BASE}/api/v1/custom-endpoint`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
    }
  )

  return {
    data: data ?? [],
    isLoading,
    isError: !!error,
    mutate, // For manual revalidation
  }
}

export default useCustomData
```

### 4. Styling with Tailwind CSS

All styles use Tailwind CSS utility classes. No CSS files except globals.css.

**Key Classes & Patterns:**

```typescript
// Layout
<div className="max-w-7xl mx-auto px-4">          {/* Container */}
<div className="grid grid-cols-1 md:grid-cols-2"> {/* Responsive Grid */}
<div className="flex items-center justify-between"> {/* Flexbox */}

// Colors (use design tokens)
className="text-white bg-slate-800/30 border-slate-700" {/* Design tokens */}
className="bg-blue-500 hover:bg-blue-600"          {/* State variants */}

// Spacing
className="p-6 mb-4 gap-2"                         {/* Padding, margin, gap */}

// Effects
className="rounded-lg shadow-lg hover:shadow-xl"   {/* Rounded, shadows */}
className="transition-all duration-300"             {/* Transitions */}
className="hover:scale-105 group-hover:text-blue-400" {/* Hover effects */}

// Responsive
className="text-sm md:text-base lg:text-lg"       {/* Text sizes */}
className="hidden md:block"                         {/* Show/hide */}
className="w-full md:w-1/2"                         {/* Width */}
```

### 5. Working with Forms

Always use controlled inputs and proper validation:

```typescript
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Handle success
        setFormData({ name: '', email: '', message: '' })
      }
    } catch (error) {
      console.error('Form error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}
```

## File Organization

### Components Folder Structure
```
components/
├── Navigation.tsx           # Top navigation
├── Footer.tsx              # Footer
├── HeroSection.tsx         # Landing hero
├── DynamicDashboard.tsx    # Main dashboard
├── StatCard.tsx            # Stat display
├── SectionCard.tsx         # Content card
└── pages/
    ├── PageHeader.tsx      # Page header template
    ├── ServicesGrid.tsx    # Services page
    ├── DevicesGrid.tsx     # Devices page
    ├── TeamGrid.tsx        # Team page
    ├── PortfolioGrid.tsx   # Portfolio page
    └── ContactForm.tsx     # Contact page
```

### API Hooks Structure
```
lib/api/
├── useServices.ts     # GET /api/v1/services
├── useDevices.ts      # GET /api/v1/devices
├── useTeam.ts         # GET /api/v1/team
└── useProjects.ts     # GET /api/v1/projects
```

## Common Patterns

### Loading Skeleton
```typescript
{isLoading && (
  <div className="grid gap-4">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="h-32 bg-slate-700 rounded-lg animate-pulse" />
    ))}
  </div>
)}
```

### Error Boundary
```typescript
{isError && (
  <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
    Failed to load data. Please refresh the page.
  </div>
)}
```

### Image with Fallback
```typescript
<Image
  src={item.image}
  alt={item.name}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
  onError={(e) => {
    e.currentTarget.src = '/placeholder.png'
  }}
/>
```

### Modal Component
```typescript
{selectedItem && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
    onClick={() => setSelectedItem(null)}
  >
    <div
      className="bg-slate-800 rounded-xl max-w-2xl w-full"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal content */}
    </div>
  </div>
)}
```

## Environment Variables

Create `.env.local` in the frontend root:

```env
# API Configuration
NEXT_PUBLIC_API_BASE=http://localhost:8000

# Optional
NEXT_PUBLIC_SITE_URL=https://nexusedgesystems.com
NEXT_PUBLIC_GTAG_ID=G_XXXXXXXXXX
```

⚠️ **Important**: Only variables prefixed with `NEXT_PUBLIC_` are accessible in the browser.

## Debugging

### Browser DevTools
```javascript
// Check API endpoint
console.log(process.env.NEXT_PUBLIC_API_BASE)

// Inspect component state
// Use React DevTools browser extension

// Check network requests
// DevTools → Network tab → filter by /api/v1/
```

### VS Code Debugging
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "skipFiles": ["<node_internals>/**"],
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

### Common Issues

**Images not loading:**
- Check image URL in API response
- Verify CORS on image server
- Check Next.js image optimization

**API not connecting:**
- Verify `NEXT_PUBLIC_API_BASE` in `.env.local`
- Check backend is running
- Inspect browser network tab for errors
- Check for CORS issues

**Styles not working:**
- Restart dev server after `.env` changes
- Clear `.next` folder: `rm -rf .next`
- Verify Tailwind classes are spelled correctly
- Check tailwind.config.ts includes correct paths

**Component not rendering:**
- Verify client component has `'use client'` if using hooks
- Check component is exported correctly
- Verify import paths use `@/` alias
- Check for TypeScript errors

## Performance Tips

1. **Image Optimization**
   - Use Next.js Image component
   - Provide appropriate `sizes` prop
   - Use modern formats (WebP)

2. **Code Splitting**
   - Use dynamic imports for large components
   - Next.js automatically splits routes

3. **Caching**
   - SWR handles data caching
   - Use `mutate()` for manual revalidation
   - Browser caches images and CSS

4. **Bundle Size**
   - Use tree-shaking compatible libraries
   - Avoid importing entire libraries
   - Monitor bundle with `npm run analyze`

## Testing

### Manual Testing Checklist
- [ ] Pages load without errors
- [ ] Navigation works on mobile
- [ ] API calls succeed with backend running
- [ ] Images load properly
- [ ] Forms submit correctly
- [ ] Error states display correctly
- [ ] Loading states appear briefly
- [ ] Responsive design on mobile/tablet/desktop

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Deployment

### Vercel (Recommended)
```bash
# Push changes to GitHub
git add .
git commit -m "Feature: Add new service page"
git push origin main

# Vercel automatically deploys
# Go to https://vercel.com/dashboard to manage deployments
```

### Other Platforms
```bash
# Build static site
npm run build

# Start server
npm start

# Or use Docker
docker build -t nexus-edge-frontend .
docker run -p 3000:3000 nexus-edge-frontend
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/add-blog

# Make changes and commit
git add .
git commit -m "Add blog section with dynamic posts"

# Push branch
git push origin feature/add-blog

# Create pull request on GitHub
# Request review
# Merge after approval

# Delete branch
git branch -d feature/add-blog
git push origin --delete feature/add-blog
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)
- [SWR](https://swr.vercel.app)
- [Lucide Icons](https://lucide.dev)

## Support

For questions or issues:
1. Check existing documentation
2. Review similar components for patterns
3. Check browser console for errors
4. Ask team members
5. Create GitHub issue with details

---

**Happy coding!** 🚀
