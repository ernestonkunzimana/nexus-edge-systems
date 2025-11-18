# Visual Regression Testing Setup

This document outlines options for adding visual regression testing to Nexus Edge Systems.

## Overview

Visual regression testing automatically catches UI changes by comparing screenshots. This is crucial for:
- Detecting unintended UI changes
- Ensuring consistent design across browsers
- Catching CSS regressions
- Validating responsive design changes

## Recommended Tools

### Option 1: Percy by BrowserStack (Recommended)

**Pros:**
- Easy integration with Playwright
- Excellent diff viewer
- Auto-approval workflows
- Free tier for open source

**Setup:**

1. **Sign up** at [percy.io](https://percy.io)

2. **Install Percy CLI:**
```powershell
cd frontend
npm install --save-dev @percy/cli @percy/playwright
```

3. **Add Percy token** to GitHub Secrets:
   - `PERCY_TOKEN` from percy.io dashboard

4. **Update Playwright tests:**
```typescript
import percySnapshot from '@percy/playwright';

test('homepage visual', async ({ page }) => {
  await page.goto('/');
  await percySnapshot(page, 'Homepage');
});
```

5. **Add to CI** (`.github/workflows/test-frontend.yml`):
```yaml
- name: Run Percy visual tests
  working-directory: frontend
  run: npx percy exec -- npx playwright test
  env:
    PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

**Pricing:**
- Free: 5,000 snapshots/month (Open Source)
- Paid: Starting at $299/month

---

### Option 2: Chromatic (Recommended for Storybook users)

**Pros:**
- Built by Storybook team
- Excellent component-level testing
- Great for design systems
- Free tier available

**Setup:**

1. **Install Chromatic:**
```powershell
cd frontend
npm install --save-dev chromatic
```

2. **Add token** to GitHub Secrets:
   - `CHROMATIC_PROJECT_TOKEN`

3. **Add to CI:**
```yaml
- name: Run Chromatic
  working-directory: frontend
  run: npx chromatic --project-token=${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

**Pricing:**
- Free: 5,000 snapshots/month
- Paid: Starting at $149/month

---

### Option 3: Playwright Built-in Visual Comparisons (Budget Option)

**Pros:**
- No external service required
- Free and open source
- Full control over screenshots

**Cons:**
- Manual review process
- No web UI for diffs
- Requires baseline management

**Setup:**

1. **Update tests to use visual comparisons:**
```typescript
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

2. **Generate baselines:**
```powershell
npx playwright test --update-snapshots
```

3. **Commit snapshots:**
```powershell
git add e2e/tests/**/*.png
git commit -m "chore: add visual regression baselines"
```

4. **CI runs automatically** - fails if screenshots differ

---

### Option 4: Argos (Open Source Alternative)

**Pros:**
- Self-hosted option available
- Open source
- Good GitHub integration

**Setup:**

1. **Install Argos:**
```powershell
cd frontend
npm install --save-dev @argos-ci/playwright
```

2. **Update playwright.config.ts:**
```typescript
import { argosScreenshot } from '@argos-ci/playwright';

export default {
  use: {
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Add Argos
        screenshot: 'on',
      },
    },
  ],
};
```

3. **Add to CI:**
```yaml
- name: Upload screenshots to Argos
  run: npx argos upload ./screenshots
  env:
    ARGOS_TOKEN: ${{ secrets.ARGOS_TOKEN }}
```

**Pricing:**
- Self-hosted: Free
- Cloud: $30/month per team

---

## Recommended Implementation Plan

### Phase 1: Basic Setup (Week 1)
1. Choose tool: **Percy** for production-ready solution
2. Add Percy to 5 critical pages:
   - Homepage (dashboard)
   - Projects list
   - Project detail
   - Project create
   - Project edit

### Phase 2: Expand Coverage (Week 2)
3. Add mobile viewport screenshots
4. Add dark mode variants (if applicable)
5. Add error state screenshots

### Phase 3: Integration (Week 3)
6. Add Percy to CI/CD pipeline
7. Set up auto-approval for minor changes
8. Document review process

---

## Sample Percy Implementation

### 1. Install Dependencies

```powershell
cd frontend
npm install --save-dev @percy/cli @percy/playwright
```

### 2. Create Visual Test File

Create `frontend/e2e/tests/visual.spec.ts`:

```typescript
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

const pages = [
  { path: '/', name: 'Dashboard' },
  { path: '/projects', name: 'Projects List' },
  { path: '/projects/create', name: 'Create Project' },
];

test.describe('Visual Regression', () => {
  for (const { path, name } of pages) {
    test(`${name} - Desktop`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await percySnapshot(page, `${name} - Desktop`);
    });

    test(`${name} - Mobile`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await percySnapshot(page, `${name} - Mobile`);
    });
  }
});
```

### 3. Update package.json

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:visual": "percy exec -- playwright test e2e/tests/visual.spec.ts"
  }
}
```

### 4. Run Visual Tests

```powershell
# First time - creates baselines
npm run test:visual

# Subsequent runs - compares against baseline
npm run test:visual
```

---

## Cost Comparison

| Tool | Free Tier | Paid Plans | Best For |
|------|-----------|------------|----------|
| **Percy** | 5K snapshots/mo | $299/mo+ | Production apps |
| **Chromatic** | 5K snapshots/mo | $149/mo+ | Storybook users |
| **Playwright Native** | Unlimited | Free | Budget projects |
| **Argos** | Self-hosted | $30/mo | Open source fans |

---

## Decision Matrix

Choose **Percy** if:
- ✅ You need production-grade visual testing
- ✅ Budget allows $299/month
- ✅ Want best-in-class diff viewer
- ✅ Need good GitHub integration

Choose **Chromatic** if:
- ✅ Using Storybook
- ✅ Component-level testing priority
- ✅ Budget is $149/month

Choose **Playwright Native** if:
- ✅ Budget is $0
- ✅ Small project with few pages
- ✅ Manual review process acceptable

Choose **Argos** if:
- ✅ Want open source solution
- ✅ Can self-host or budget is $30/month
- ✅ Need flexibility

---

## Implementation Checklist

- [ ] Choose visual regression tool
- [ ] Add to package.json dependencies
- [ ] Create baseline screenshots
- [ ] Add visual tests to CI/CD
- [ ] Document review process
- [ ] Train team on workflow
- [ ] Set up notifications
- [ ] Configure auto-approval rules

---

## Next Steps

1. **Review options** with team
2. **Start free trial** of Percy or Chromatic
3. **Add visual tests** to 5 key pages
4. **Monitor** for false positives
5. **Scale** to full coverage

For immediate implementation, follow the **Percy** setup in the Sample Implementation section above.

---

**Last Updated**: November 18, 2025
