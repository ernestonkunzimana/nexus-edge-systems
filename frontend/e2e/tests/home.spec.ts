import { test, expect } from '@playwright/test'

test('home page loads and shows dashboard header', async ({ page }) => {
  const url = process.env.DEPLOYMENT_URL ?? 'http://localhost:3000'
  await page.goto(url)
  await expect(page.locator('text=Nexus Dashboard')).toBeVisible({ timeout: 10000 })
})
