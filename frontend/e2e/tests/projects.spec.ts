import { test, expect } from '@playwright/test'

const BASE_URL = process.env.DEPLOYMENT_URL ?? 'http://localhost:3000'

test.describe('Projects CRUD Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the projects API for deterministic tests
    await page.route('**/api/v1/projects', (route) => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            { id: 1, name: 'Test Project 1', description: 'Description 1', completion: 25 },
            { id: 2, name: 'Test Project 2', description: 'Description 2', completion: 75 },
          ]),
        })
      } else if (route.request().method() === 'POST') {
        const postData = route.request().postDataJSON()
        route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 3,
            ...postData,
          }),
        })
      } else {
        route.continue()
      }
    })

    // Mock individual project endpoints
    await page.route('**/api/v1/projects/*', (route) => {
      const url = route.request().url()
      const id = url.split('/').pop()
      
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: parseInt(id || '1'),
            name: `Project ${id}`,
            description: `Description for project ${id}`,
            completion: 50,
          }),
        })
      } else if (route.request().method() === 'PUT') {
        const putData = route.request().postDataJSON()
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: parseInt(id || '1'),
            ...putData,
          }),
        })
      } else if (route.request().method() === 'DELETE') {
        route.fulfill({
          status: 204,
        })
      } else {
        route.continue()
      }
    })
  })

  test('Navigation: can navigate to projects from home', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Click on Projects link in navigation
    await page.click('a[href="/projects"]')
    await expect(page).toHaveURL(`${BASE_URL}/projects`)
    await expect(page.locator('h1:has-text("Projects")')).toBeVisible()
  })

  test('Projects List: displays projects with correct data', async ({ page }) => {
    await page.goto(`${BASE_URL}/projects`)
    await page.waitForLoadState('networkidle')
    
    // Wait for projects to load
    await page.waitForResponse((r) => r.url().includes('/api/v1/projects') && r.status() === 200)
    
    // Check that project cards are displayed
    await expect(page.locator('text=Test Project 1')).toBeVisible()
    await expect(page.locator('text=Test Project 2')).toBeVisible()
    await expect(page.locator('text=Description 1')).toBeVisible()
    
    // Check progress bars exist
    const progressBars = page.locator('[role="progressbar"], .progress-bar, [style*="width: 25%"]')
    expect(await progressBars.count()).toBeGreaterThan(0)
  })

  test('Projects List: Create New Project button navigates to create page', async ({ page }) => {
    await page.goto(`${BASE_URL}/projects`)
    await page.waitForLoadState('networkidle')
    
    // Click Create New Project button
    await page.click('text=Create New Project')
    await expect(page).toHaveURL(`${BASE_URL}/projects/create`)
  })

  test('Create Project: form renders and accepts input', async ({ page }) => {
    await page.goto(`${BASE_URL}/projects/create`)
    await page.waitForLoadState('networkidle')
    
    // Check form elements exist
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('textarea[name="description"]')).toBeVisible()
    await expect(page.locator('input[type="range"]')).toBeVisible()
    
    // Fill in the form
    await page.fill('input[name="name"]', 'New Test Project')
    await page.fill('textarea[name="description"]', 'This is a test description')
    await page.fill('input[type="range"]', '60')
    
    // Check that completion value updates
    await expect(page.locator('text=/60%?/')).toBeVisible()
  })

  test('Create Project: submitting form creates project and redirects', async ({ page }) => {
    await page.goto(`${BASE_URL}/projects/create`)
    await page.waitForLoadState('networkidle')
    
    // Fill in the form
    await page.fill('input[name="name"]', 'New Test Project')
    await page.fill('textarea[name="description"]', 'Test description')
    
    // Submit the form
    await page.click('button[type="submit"]')
    
    // Wait for POST request
    await page.waitForResponse((r) => 
      r.url().includes('/api/v1/projects') && 
      r.request().method() === 'POST' &&
      r.status() === 201
    )
    
    // Should redirect to projects list
    await expect(page).toHaveURL(`${BASE_URL}/projects`)
  })

  test('Project Detail: displays project information', async ({ page }) => {
    await page.goto(`${BASE_URL}/projects/1`)
    await page.waitForLoadState('networkidle')
    
    // Wait for project data to load
    await page.waitForResponse((r) => r.url().includes('/api/v1/projects/1') && r.status() === 200)
    
    // Check project details are displayed
    await expect(page.locator('text=Project 1')).toBeVisible()
    await expect(page.locator('text=Description for project 1')).toBeVisible()
  })

  test('Project Detail: can toggle between view and edit modes', async ({ page }) => {
    await page.goto(`${BASE_URL}/projects/1`)
    await page.waitForLoadState('networkidle')
    await page.waitForResponse((r) => r.url().includes('/api/v1/projects/1'))
    
    // Should start in view mode
    await expect(page.locator('button:has-text("Edit")')).toBeVisible()
    
    // Click edit button
    await page.click('button:has-text("Edit")')
    
    // Should now show form
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('button:has-text("Cancel")')).toBeVisible()
    
    // Cancel should return to view mode
    await page.click('button:has-text("Cancel")')
    await expect(page.locator('button:has-text("Edit")')).toBeVisible()
  })

  test('Project Detail: can update project', async ({ page }) => {
    await page.goto(`${BASE_URL}/projects/1`)
    await page.waitForLoadState('networkidle')
    await page.waitForResponse((r) => r.url().includes('/api/v1/projects/1'))
    
    // Enter edit mode
    await page.click('button:has-text("Edit")')
    
    // Update fields
    await page.fill('input[name="name"]', 'Updated Project Name')
    await page.fill('textarea[name="description"]', 'Updated description')
    
    // Submit
    await page.click('button[type="submit"]')
    
    // Wait for PUT request
    await page.waitForResponse((r) => 
      r.url().includes('/api/v1/projects/1') && 
      r.request().method() === 'PUT' &&
      r.status() === 200
    )
    
    // Should return to view mode
    await expect(page.locator('button:has-text("Edit")')).toBeVisible()
  })

  test('Project Detail: can delete project with confirmation', async ({ page }) => {
    await page.goto(`${BASE_URL}/projects/1`)
    await page.waitForLoadState('networkidle')
    await page.waitForResponse((r) => r.url().includes('/api/v1/projects/1'))
    
    // Setup dialog handler
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm')
      await dialog.accept()
    })
    
    // Click delete button
    await page.click('button:has-text("Delete")')
    
    // Wait for DELETE request
    await page.waitForResponse((r) => 
      r.url().includes('/api/v1/projects/1') && 
      r.request().method() === 'DELETE' &&
      r.status() === 204
    )
    
    // Should redirect to projects list
    await expect(page).toHaveURL(`${BASE_URL}/projects`)
  })

  test('Mobile Navigation: hamburger menu works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Mobile menu should be hidden initially
    const mobileMenu = page.locator('[class*="mobile-menu"]').first()
    
    // Click hamburger button
    await page.click('button[aria-label*="menu"], button:has-text("Menu")')
    
    // Menu should be visible
    await expect(page.locator('a[href="/projects"]').first()).toBeVisible()
    
    // Click projects link
    await page.click('a[href="/projects"]')
    await expect(page).toHaveURL(`${BASE_URL}/projects`)
  })

  test('Accessibility: projects page has proper landmarks', async ({ page }) => {
    await page.goto(`${BASE_URL}/projects`)
    await page.waitForLoadState('networkidle')
    
    // Check for main landmark
    await expect(page.locator('main, [role="main"]')).toBeVisible()
    
    // Take accessibility snapshot
    const snapshot = await page.accessibility.snapshot()
    expect(snapshot).toBeTruthy()
    expect(snapshot?.name).toBeTruthy()
  })

  test('Error Handling: shows error when API fails', async ({ page }) => {
    // Override route to simulate API failure
    await page.route('**/api/v1/projects', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ detail: 'Internal Server Error' }),
      })
    })
    
    await page.goto(`${BASE_URL}/projects`)
    await page.waitForLoadState('networkidle')
    
    // Should show error message
    await expect(page.locator('text=/error|failed|unable/i')).toBeVisible({ timeout: 5000 })
  })
})
