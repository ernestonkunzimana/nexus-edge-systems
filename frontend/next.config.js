/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable dev indicators during E2E tests to avoid interfering with selectors
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  // Disable overlay in test environment
  ...(process.env.CI && {
    reactStrictMode: true,
  }),
}

module.exports = nextConfig
