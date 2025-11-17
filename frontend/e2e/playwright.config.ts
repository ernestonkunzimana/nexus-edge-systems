import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'frontend/playwright-report' }]
  ]
})
