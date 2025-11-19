/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable dev indicators/devtools UI to avoid interfering with E2E selectors
  // Setting to false fully disables the dev tools overlay shown in dev server.
  devIndicators: false,

  // Explicit turbopack root to silence warnings when there are multiple lockfiles
  // Use the frontend folder as the root for the Next.js app.
  turbopack: {
    root: './',
  },

  // In CI we enable strict mode to catch issues earlier
  ...(process.env.CI && {
    reactStrictMode: true,
  }),
}

module.exports = nextConfig
