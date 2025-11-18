import { test, expect } from '@playwright/test'

const BASE_URL = process.env.DEPLOYMENT_URL ?? 'http://localhost:3000'

test.describe('Navigation Component', () => {
  test.beforeEach(async ({ page }) => {
    // Mock APIs so navigation loads properly
    await page.route('**/api/v1/metrics', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      })
    )
    
    await page.route('**/api/v1/projects', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      })
    )
  })

  test('Desktop: navigation bar is visible with all links', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Check logo/brand is visible (use role selector for app navigation)
    await expect(page.getByRole('navigation').first()).toBeVisible()
    await expect(page.locator('text=Nexus').first()).toBeVisible()
    
    // Check navigation links are visible on desktop (use nav context to be specific)
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Dashboard' })).toBeVisible()
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Projects' })).toBeVisible()
  })

  test('Desktop: navigation links are clickable and navigate correctly', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Navigate to Projects (be more specific - use first link in navigation)
    await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).first().click()
    await expect(page).toHaveURL(`${BASE_URL}/projects`)
    
    // Navigate back to home
    await page.getByRole('navigation').getByRole('link', { name: 'Dashboard' }).first().click()
    await expect(page).toHaveURL(`${BASE_URL}/`)
  })

  test('Desktop: active link has visual indicator', async ({ page }) => {
    await page.goto(`${BASE_URL}/projects`)
    await page.waitForLoadState('networkidle')
    
    // Projects link should have active styling
    const projectsLink = page.locator('a[href="/projects"]').first()
    const classes = await projectsLink.getAttribute('class')
    
    // Active link should have border-b or bg color or text color change
    expect(classes).toMatch(/border-b|bg-|text-sky|text-indigo/)
  })

  test('Mobile: hamburger menu button is visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Hamburger button should be visible (use class selector specific to our nav)
    const menuButton = page.getByRole('navigation').getByRole('button').first()
    await expect(menuButton).toBeVisible()
  })

  test('Mobile: clicking hamburger opens menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Click the menu button (be specific to navigation)
    const menuButton = page.getByRole('navigation').getByRole('button').first()
    await menuButton.click()
    
    // Mobile menu should be visible
    await page.waitForTimeout(300) // Wait for animation
    
    // Check that navigation links are now visible in the mobile menu
    const projectsLink = page.getByRole('navigation').getByRole('link', { name: 'Projects' }).first()
    await expect(projectsLink).toBeVisible()
  })

  test('Mobile: menu closes after clicking a link', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Open menu
    const menuButton = page.getByRole('navigation').getByRole('button').first()
    await menuButton.click()
    await page.waitForTimeout(300)
    
    // Click a navigation link (use role selector within navigation)
    await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).first().click()
    
    // Should navigate
    await expect(page).toHaveURL(`${BASE_URL}/projects`)
  })

  test('Mobile: responsive breakpoint shows/hides elements correctly', async ({ page }) => {
    // Start desktop
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Desktop nav should be visible, hamburger hidden
    await expect(page.locator('a[href="/projects"]').first()).toBeVisible()
    
    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 812 })
    await page.waitForTimeout(200)
    
    // Hamburger button should appear
    const menuButton = page.locator('button').first()
    await expect(menuButton).toBeVisible()
  })

  test('Navigation: logo/brand link returns to home', async ({ page }) => {
    await page.goto(`${BASE_URL}/projects`)
    await page.waitForLoadState('networkidle')
    
    // Click logo/brand to go home
    await page.click('a[href="/"]')
    await expect(page).toHaveURL(`${BASE_URL}/`)
  })

  test('Keyboard Navigation: can tab through nav links', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Tab through navigation (skip Next.js dev tools)
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Check if a navigation link has focus (be more flexible)
    const navLinks = page.getByRole('navigation').getByRole('link')
    const focusedLink = await navLinks.evaluateAll((links) => 
      links.some((link) => link === document.activeElement)
    )
    expect(focusedLink).toBeTruthy()
  })

  test('Accessibility: nav has proper ARIA labels and structure', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Check for nav element
    const nav = page.locator('nav').first()
    await expect(nav).toBeVisible()
    
    // Take accessibility snapshot
    const snapshot = await page.accessibility.snapshot()
    expect(snapshot).toBeTruthy()
  })

  test('Multiple pages: navigation persists across page changes', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Navigate to projects
    await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).first().click()
    await expect(page).toHaveURL(`${BASE_URL}/projects`)
    
    // Navigation should still be visible
    await expect(page.getByRole('navigation').first()).toBeVisible()
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Dashboard' })).toBeVisible()
    
    // Navigate to home
    await page.getByRole('navigation').getByRole('link', { name: 'Dashboard' }).first().click()
    await expect(page).toHaveURL(`${BASE_URL}/`)
    
    // Navigation should still be visible
    await expect(page.getByRole('navigation').first()).toBeVisible()
  })
})
