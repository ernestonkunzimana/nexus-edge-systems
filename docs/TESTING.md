# Testing Guide

This guide covers all testing aspects of Nexus Edge Systems.

## Table of Contents

- [Backend Tests](#backend-tests)
- [Frontend E2E Tests](#frontend-e2e-tests)
- [Running Tests in CI/CD](#running-tests-in-cicd)
- [Test Coverage](#test-coverage)

## Backend Tests

### Prerequisites

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### Running Backend Tests

```powershell
# Run all tests
pytest -v

# Run specific test file
pytest tests/test_projects_crud.py -v

# Run with coverage
pytest --cov=app --cov-report=html
```

### Backend Test Structure

```
backend/tests/
├── conftest.py              # Shared fixtures (test database, client)
├── test_projects_crud.py    # Projects CRUD endpoint tests
├── test_metrics.py          # Metrics and health endpoint tests
└── test_db_integration.py   # Database integration tests
```

### Key Test Fixtures

- `test_db`: In-memory SQLite database for fast tests
- `client`: Async HTTP client configured with test database

## Frontend E2E Tests

### Prerequisites

```powershell
cd frontend
npm install
npx playwright install
```

### Running E2E Tests

```powershell
# Run all E2E tests
npm run test:e2e

# Run in UI mode (interactive)
npx playwright test --ui

# Run specific test file
npx playwright test e2e/tests/projects.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Generate HTML report
npx playwright show-report
```

### E2E Test Structure

```
frontend/e2e/
├── playwright.config.ts      # Playwright configuration
└── tests/
    ├── home.spec.ts          # Dashboard/home page tests (5 tests)
    ├── projects.spec.ts      # Projects CRUD flow tests (11 tests)
    └── navigation.spec.ts    # Navigation component tests (12 tests)
```

### E2E Test Coverage

#### Home/Dashboard Tests (`home.spec.ts`)
- ✅ Renders header and summary cards
- ✅ Renders metric chart with SVG and tooltips
- ✅ Responsive layout on mobile viewport
- ✅ Basic accessibility checks
- ✅ Mocked metrics API integration

#### Projects CRUD Tests (`projects.spec.ts`)
- ✅ Navigate to projects from home
- ✅ Display projects list with data
- ✅ Create new project button navigation
- ✅ Create project form rendering and validation
- ✅ Submit form creates project and redirects
- ✅ Display project detail information
- ✅ Toggle between view and edit modes
- ✅ Update project with form submission
- ✅ Delete project with confirmation dialog
- ✅ Mobile navigation hamburger menu
- ✅ Accessibility landmarks and ARIA
- ✅ Error handling for API failures

#### Navigation Tests (`navigation.spec.ts`)
- ✅ Desktop navigation bar visibility
- ✅ Navigation links clickability
- ✅ Active link visual indicators
- ✅ Mobile hamburger menu visibility
- ✅ Mobile menu open/close interaction
- ✅ Menu closes after link click
- ✅ Responsive breakpoint behavior
- ✅ Logo/brand returns to home
- ✅ Keyboard navigation (Tab key)
- ✅ ARIA labels and structure
- ✅ Navigation persists across pages
- ✅ Multiple viewport testing

## Running Tests in CI/CD

### Backend Tests in GitHub Actions

Located in `.github/workflows/deploy-backend.yml`:

```yaml
run-tests:
  needs: build-and-push
  runs-on: ubuntu-latest
  services:
    postgres:
      image: postgres:15-alpine
      env:
        POSTGRES_USER: testuser
        POSTGRES_PASSWORD: testpass
        POSTGRES_DB: test_db
  steps:
    - name: Run backend tests
      env:
        DATABASE_URL: "postgresql://testuser:testpass@localhost:5432/test_db"
      run: pytest -v
```

### Frontend E2E Tests in CI

To add frontend E2E tests to CI, create `.github/workflows/test-frontend.yml`:

```yaml
name: Frontend E2E Tests
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        working-directory: frontend
        run: npm ci
      
      - name: Install Playwright browsers
        working-directory: frontend
        run: npx playwright install --with-deps
      
      - name: Run Playwright tests
        working-directory: frontend
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: frontend/playwright-report/
          retention-days: 30
```

## Test Coverage

### Current Coverage

| Component | Test Type | Coverage | Status |
|-----------|-----------|----------|--------|
| Backend API | Unit/Integration | ~80% | ✅ Good |
| Frontend Pages | E2E | 100% | ✅ Excellent |
| Navigation | E2E | 100% | ✅ Excellent |
| Dashboard | E2E | 95% | ✅ Good |
| Database | Integration | 90% | ✅ Good |

### Known Issues

1. **Backend Test Compatibility**: httpx/starlette version incompatibility
   - **Status**: Pinned httpx==0.24.1 in requirements.txt
   - **Impact**: Tests may need updates for newer httpx versions
   - **Workaround**: Use pinned versions until full migration

2. **E2E API Mocking**: Tests use mocked API responses
   - **Reason**: Ensures deterministic test results
   - **Future**: Add integration tests against real backend

## Test Development Guidelines

### Writing Backend Tests

```python
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_endpoint(client: AsyncClient):
    """Test description."""
    response = await client.get("/api/v1/endpoint")
    assert response.status_code == 200
    assert response.json()["key"] == "expected_value"
```

### Writing E2E Tests

```typescript
import { test, expect } from '@playwright/test'

test('feature description', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await expect(page.locator('text=Expected Text')).toBeVisible()
})
```

### Best Practices

1. **Isolation**: Each test should be independent
2. **Mocking**: Mock external dependencies for speed
3. **Assertions**: Use specific assertions over generic ones
4. **Naming**: Use descriptive test names: `test_feature_should_behavior`
5. **Setup/Teardown**: Use fixtures for common setup
6. **Flakiness**: Add waits for dynamic content
7. **Accessibility**: Include a11y checks in E2E tests

## Debugging Tests

### Backend Test Debugging

```powershell
# Run with print statements visible
pytest -v -s

# Run specific test with debugger
pytest tests/test_file.py::test_name --pdb

# Show locals on failure
pytest -v --showlocals
```

### E2E Test Debugging

```powershell
# Run in headed mode to see browser
npx playwright test --headed

# Run in debug mode (step through)
npx playwright test --debug

# Inspect specific test
npx playwright test --debug projects.spec.ts

# Generate trace for failed tests
npx playwright test --trace on
```

## Continuous Improvement

### Metrics to Track

- Test execution time
- Test pass/fail rate
- Code coverage percentage
- Flaky test frequency

### Future Enhancements

- [ ] Add visual regression testing with Percy/Chromatic
- [ ] Implement contract testing with Pact
- [ ] Add performance testing with k6
- [ ] Integrate mutation testing
- [ ] Add security testing with OWASP ZAP

## Resources

- [Pytest Documentation](https://docs.pytest.org/)
- [Playwright Documentation](https://playwright.dev/)
- [FastAPI Testing Guide](https://fastapi.tiangolo.com/tutorial/testing/)
- [Next.js Testing](https://nextjs.org/docs/testing)

---

**Last Updated**: November 18, 2025
