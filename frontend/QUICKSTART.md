# Quick Start Guide

Get the Nexus Edge Systems frontend running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- Backend API running (typically on `http://localhost:8000`)

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env.local` file:

```bash
echo "NEXT_PUBLIC_API_BASE=http://localhost:8000" > .env.local
```

Or manually create the file:

```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

### 3. Start Development Server

```bash
npm run dev
```

The application should now be available at **http://localhost:3000**

## What You Should See

When you visit http://localhost:3000:

1. **Navigation Bar** - Sticky header with logo and menu
2. **Hero Section** - Animated landing section with CTA buttons
3. **Dashboard Overview** - Statistics cards showing data counts
4. **Services Section** - Grid of IT services (fetched from API)
5. **Devices Section** - Gallery of maintained devices
6. **Team Section** - Team member profiles
7. **Portfolio Section** - Project showcases
8. **Footer** - Contact info and links

## Verify Backend Connection

If you see empty sections or errors:

1. Check backend is running: `curl http://localhost:8000/health`
2. Verify API endpoints are accessible:
   ```bash
   curl http://localhost:8000/api/v1/services
   curl http://localhost:8000/api/v1/devices
   curl http://localhost:8000/api/v1/team
   curl http://localhost:8000/api/v1/projects
   ```
3. Check browser console (F12) for errors
4. Check `.env.local` has correct API_BASE

## Project Structure

```
frontend/
├── app/              # Pages and routing
├── components/       # React components
├── lib/             # Utilities and hooks
├── public/          # Static assets
├── .env.local       # Environment config (create this)
├── next.config.mjs  # Next.js config
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Available Routes

| Route | Purpose |
|-------|---------|
| `/` | Home with hero + dashboard |
| `/services` | All services catalog |
| `/devices` | Device gallery |
| `/team` | Team members |
| `/portfolio` | Portfolio projects |
| `/contact` | Contact form |

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
```

## Common Issues & Solutions

### "Cannot find module '@/' error"
- Ensure `tsconfig.json` has the path alias configured
- Run `npm install` again
- Restart dev server

### "API connection failed"
- Verify backend is running on port 8000
- Check `.env.local` file exists and has correct URL
- Confirm API endpoints are responding
- Check CORS headers on backend

### "Images not loading"
- Verify image URLs in API responses
- Check backend is serving images correctly
- Clear Next.js cache: `rm -rf .next`
- Restart dev server

### "Tailwind styles not applying"
- Clear Next.js cache: `rm -rf .next`
- Restart dev server
- Verify `tailwind.config.ts` includes all file paths
- Check class names are spelled correctly

### Page shows "Loading..." forever
- Check browser console for API errors
- Verify backend API is responding
- Check network tab in DevTools
- Try hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)

## Next Steps

1. **Review the codebase:**
   - Check `components/` for React components
   - Review `lib/api/` for data fetching patterns
   - Look at page examples in `app/`

2. **Read documentation:**
   - `README.md` - Project overview
   - `DEVELOPMENT.md` - Development guide
   - `COMPONENT_ARCHITECTURE.md` - Component patterns (if exists)

3. **Start developing:**
   - Make changes to components
   - Changes hot-reload automatically
   - Test with backend running
   - Check console for errors

4. **Test different pages:**
   - Click navigation links
   - View different pages
   - Test responsive design (resize window)
   - Submit contact form
   - Check WhatsApp links

## Environment Variables Reference

```env
# Required
NEXT_PUBLIC_API_BASE=http://localhost:8000

# Optional (add if needed)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=development
```

## Useful Links

- [Frontend README](./README.md) - Complete documentation
- [Development Guide](./DEVELOPMENT.md) - Detailed dev guide
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## Get Help

If something isn't working:

1. Check the browser console (F12)
2. Check the terminal for error messages
3. Verify backend is running and accessible
4. Try restarting the dev server
5. Check documentation files
6. Ask the team

---

You're all set! Happy coding! 🚀

For more detailed information, see [README.md](./README.md)
