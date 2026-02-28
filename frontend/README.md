# Nexus Edge Systems - Frontend

A complete, production-ready frontend application for Nexus Edge Systems LTD, featuring dynamic content from backend APIs, modern design patterns, and excellent UX.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR (Stale While Revalidate)
- **Icons**: Lucide React
- **Images**: Next.js Image component with optimization
- **Type Safety**: TypeScript

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout with Navigation & Footer
│   ├── globals.css             # Global styles and animations
│   ├── page.tsx                # Home page with Hero + Dashboard
│   ├── services/page.tsx       # Services listing page
│   ├── devices/page.tsx        # Devices catalog page
│   ├── team/page.tsx           # Team members page
│   ├── portfolio/page.tsx      # Portfolio/Projects page
│   └── contact/page.tsx        # Contact form page
├── components/
│   ├── Navigation.tsx          # Sticky header navigation
│   ├── Footer.tsx              # Footer with links & info
│   ├── HeroSection.tsx         # Landing hero section
│   ├── DynamicDashboard.tsx    # Main dashboard with all sections
│   ├── StatCard.tsx            # Reusable stat metric card
│   ├── SectionCard.tsx         # Reusable content card
│   └── pages/
│       ├── PageHeader.tsx      # Page header component
│       ├── ServicesGrid.tsx    # Services grid display
│       ├── DevicesGrid.tsx     # Devices grid display
│       ├── TeamGrid.tsx        # Team members grid
│       ├── PortfolioGrid.tsx   # Portfolio with modal
│       └── ContactForm.tsx     # Contact form with validation
├── lib/
│   └── api/
│       ├── useServices.ts      # Hook: fetch services
│       ├── useDevices.ts       # Hook: fetch devices
│       ├── useTeam.ts          # Hook: fetch team members
│       └── useProjects.ts      # Hook: fetch projects
├── tailwind.config.ts          # Tailwind configuration
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## Pages Overview

### Home (`/`)
- Hero section with animated background
- Overview statistics
- Service catalog preview
- Device gallery preview
- Team showcase
- Portfolio highlights

### Services (`/services`)
- Full catalog of IT services
- Dynamic cards with images
- Service features and descriptions
- Learn more buttons

### Devices (`/devices`)
- Grid gallery of maintained devices
- Specifications and common issues
- HP computers, printers, CCTV, UPS, etc.
- Status badges

### Team (`/team`)
- Team member profiles with images
- Position and expertise
- Contact methods (email, WhatsApp, LinkedIn)
- Skills and specializations

### Portfolio (`/portfolio`)
- Project showcase with images
- Modal with detailed project info
- Client, budget, timeline, progress
- Deliverables and technologies
- Filter by category

### Contact (`/contact`)
- Contact information section
- Email form with validation
- Business hours
- Multiple contact methods
- Direct links to WhatsApp, email, phone

## Component Documentation

### Navigation
- Sticky header that changes style on scroll
- Mobile-responsive with hamburger menu
- Active link highlighting
- Quick access to all pages

### HeroSection
- Animated gradient backgrounds
- Call-to-action buttons
- Business statistics
- Feature highlights

### DynamicDashboard
- Comprehensive overview of all content
- Real-time statistics from API
- Fully explained sections
- Loading states and error handling

### Page Grids
All grid components follow the same pattern:
- Fetch data from API via hooks
- Loading skeletons during fetch
- Responsive grid layout
- Hover animations and interactions
- Detailed information cards

### ContactForm
- Form validation
- Error handling
- Success/error messages
- Multiple contact methods
- WhatsApp integration links

## API Integration

The frontend communicates with the backend API for all dynamic content:

```
API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

Endpoints:
- GET /api/v1/services    → List of IT services
- GET /api/v1/devices     → List of devices maintained
- GET /api/v1/team        → List of team members
- GET /api/v1/projects    → List of portfolio projects
- POST /api/v1/contact    → Submit contact inquiry
```

### Environment Variables

```env
# Required
NEXT_PUBLIC_API_BASE=http://localhost:8000

# Optional
NEXT_PUBLIC_SITE_URL=https://nexusedgesystems.com
```

## Data Fetching Strategy

The application uses SWR (Stale While Revalidate) for efficient data fetching:

```typescript
// Example: useServices hook
const { services, isLoading, isError, mutate } = useServices()

// Returns:
// - services: array of service objects
// - isLoading: boolean (true while fetching)
// - isError: boolean (true if fetch failed)
// - mutate: function to manually revalidate
```

### Features:
- Automatic caching and deduplication
- Revalidation on reconnect
- No refetch on window focus
- 60-second deduplication interval
- Graceful error handling

## Styling & Design System

### Colors
- Primary: Blue (#3b82f6)
- Accent: Cyan (#06b6d4)
- Backgrounds: Slate tones (#0f172a - #475569)
- Text: White & slate variants

### Typography
- System font stack for performance
- Responsive text sizes
- 1.4-1.6 line height for body text
- Semantic HTML structure

### Animations
- Fade in on load
- Slide up on scroll
- Hover scale effects
- Smooth transitions
- Pulse glow accents

### Layout
- Responsive flexbox layouts
- Mobile-first approach
- Max-width container: 80rem (7xl)
- Consistent padding/spacing

## Performance Optimizations

1. **Image Optimization**: Next.js Image component with lazy loading
2. **Code Splitting**: Automatic route-based code splitting
3. **Caching**: SWR intelligent caching strategy
4. **CSS**: Tailwind CSS purging unused styles
5. **Animations**: CSS animations over JavaScript
6. **SEO**: Proper meta tags and structured data

## Installation & Setup

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Create .env.local
echo "NEXT_PUBLIC_API_BASE=http://localhost:8000" > .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit http://localhost:3000 in your browser.

## Development Guidelines

### Creating New Pages
1. Create folder in `app/pages/page.tsx`
2. Use `PageHeader` component for consistency
3. Create corresponding component in `components/pages/`
4. Add route to Navigation.tsx
5. Fetch data via custom hooks from `lib/api/`

### Creating New Components
1. Always use `'use client'` for interactive components
2. Export named functions for clarity
3. Include TypeScript interfaces for props
4. Use Tailwind classes (no inline styles)
5. Add comments for complex logic

### Styling
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Use CSS custom properties for colors
- Prefer gap for spacing over margin
- Use semantic color tokens

### Data Fetching
- Use SWR hooks from `lib/api/`
- Handle loading and error states
- Show skeleton loaders during fetch
- Implement error boundaries if needed

## Common Tasks

### Add a New Service Card
```typescript
// Services are fetched from API and automatically rendered
// Just ensure API returns the right schema:
{
  id: string,
  name: string,
  description: string,
  image: string,
  category: string,
  features: string[]
}
```

### Add a New Team Member
```typescript
// Add to backend API, frontend will automatically fetch and display:
{
  id: string,
  name: string,
  position: string,
  image: string,
  expertise: string[],
  email: string,
  whatsapp: string,
  linkedin: string
}
```

### Add a New Contact Method
Edit `components/pages/ContactForm.tsx` and update the `contactMethods` array.

## Troubleshooting

### API Not Connected
- Check `NEXT_PUBLIC_API_BASE` in `.env.local`
- Ensure backend is running on correct port
- Check browser console for CORS errors
- Verify API endpoints are responding

### Images Not Loading
- Check image URLs in API responses
- Verify CORS headers on image server
- Check Next.js image optimization settings
- Use Image component with proper `sizes` prop

### Styles Not Applied
- Clear Tailwind cache: `rm -rf .next`
- Restart dev server
- Check for typos in class names
- Verify tailwind.config.ts is correct

### Forms Not Submitting
- Check API endpoint is correct
- Verify form data matches API schema
- Check browser console for errors
- Ensure CORS is configured on backend

## Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Vercel automatically deploys
# Set environment variables in Vercel dashboard:
# - NEXT_PUBLIC_API_BASE=https://api.yourdomain.com
```

### Other Platforms
```bash
# Build
npm run build

# Start
npm start
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics

Target performance benchmarks:
- Core Web Vitals: All green
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## Security

- No sensitive data in frontend code
- API calls over HTTPS
- CSRF protection on forms
- XSS prevention via Next.js defaults
- Content Security Policy headers

## Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Blog/News section
- [ ] Advanced search functionality
- [ ] User accounts & authentication
- [ ] Analytics dashboard
- [ ] Email newsletter signup
- [ ] Live chat integration

## Support & Contributing

For issues or questions:
1. Check existing documentation
2. Review component code comments
3. Check browser console for errors
4. Contact development team

## License

Proprietary - Nexus Edge Systems LTD

---

**Last Updated**: February 2026
**Maintained By**: Nexus Edge Systems Development Team
