# Nexus Edge Systems - Enterprise Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green.svg)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

Enterprise platform for Nexus Edge Systems - Building Africa's Digital Future at the intersection of AI, IoT, Blockchain, and Space Technology

## 🏗️ **Architecture Overview**

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Web App    │  │  Mobile PWA  │  │  Admin Panel │      │
│  │  (Next.js)   │  │ (React Native│  │   (Next.js)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    API GATEWAY                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  FastAPI Gateway + Load Balancer + Rate Limiting     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  MICROSERVICES LAYER                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Projects │  │  AI/ML   │  │   IoT    │  │   Auth   │   │
│  │ Service  │  │ Service  │  │ Service  │  │ Service  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │PostgreSQL│  │  Redis   │  │  S3/Minio│  │TimescaleDB│  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 **Design Principles**

### **1. Explainable AI (XAI) First**
- Every metric has transparent calculation methodology
- Real-time data provenance tracking
- Interactive explanations for all dashboards
- AI model interpretability built-in

### **2. Enterprise-Grade Security**
- Zero Trust Architecture
- End-to-end encryption (TLS 1.3)
- JWT-based authentication
- RBAC (Role-Based Access Control)
- OWASP Top 10 compliance
- Regular security audits

### **3. Cloud-Native & Scalable**
- Horizontal scaling ready
- Containerized (Docker + Kubernetes)
- Multi-region deployment capable
- Auto-scaling based on load
- 99.9% uptime SLA target

### **4. Observable & Monitorable**
- Distributed tracing (OpenTelemetry)
- Metrics (Prometheus + Grafana)
- Centralized logging (ELK Stack)
- Real-time alerting
- Performance monitoring

## 📁 **Project Structure**

```
nexus-edge-systems/
│
├── frontend/                          # Next.js 14 Application
│   ├── app/                          # App Router (Next.js 14)
│   │   ├── (dashboard)/              # Dashboard routes
│   │   │   ├── metrics/              # Explainable metrics
│   │   │   ├── projects/             # Dynamic project views
│   │   │   └── analytics/            # Real-time analytics
│   │   ├── (public)/                 # Public pages
│   │   │   ├── page.tsx              # Landing page
│   │   │   └── about/                # Company info
│   │   └── api/                      # API routes
│   │
│   ├── components/                   # Reusable components
│   │   ├── ui/                       # Base UI components
│   │   ├── dashboard/                # Dashboard-specific
│   │   ├── explainable/              # XAI components
│   │   └── charts/                   # Data visualizations
│   │
│   ├── lib/                          # Utilities & helpers
│   │   ├── api/                      # API clients
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── utils/                    # Utility functions
│   │   └── types/                    # TypeScript types
│   │
│   ├── public/                       # Static assets
│   └── styles/                       # Global styles
│
├── backend/                          # Python FastAPI Backend
│   ├── app/
│   │   ├── api/                      # API endpoints
│   │   │   ├── v1/                   # API version 1
│   │   │   │   ├── projects.py       # Projects CRUD
│   │   │   │   ├── metrics.py        # Metrics calculation
│   │   │   │   ├── analytics.py      # Analytics engine
│   │   │   │   └── ml.py             # ML model serving
│   │   │   └── deps.py               # Dependencies
│   │   │
│   │   ├── core/                     # Core functionality
│   │   │   ├── config.py             # Configuration
│   │   │   ├── security.py           # Auth & security
│   │   │   └── database.py           # DB connection
│   │   │
│   │   ├── models/                   # Data models (SQLAlchemy)
│   │   ├── schemas/                  # Pydantic schemas
│   │   ├── services/                 # Business logic
│   │   │   ├── project_service.py
│   │   │   ├── ml_service.py         # ML inference
│   │   │   └── analytics_service.py
│   │   │
│   │   └── ml/                       # ML models & pipelines
│   │       ├── models/               # Trained models
│   │       ├── preprocessing/        # Data preprocessing
│   │       └── inference/            # Model inference
│   │
│   ├── tests/                        # Backend tests
│   ├── alembic/                      # DB migrations
│   └── requirements.txt              # Python dependencies
│
├── infrastructure/                   # DevOps & Infrastructure
│   ├── docker/
│   │   ├── Dockerfile.frontend
│   │   ├── Dockerfile.backend
│   │   └── docker-compose.yml
│   │
│   ├── kubernetes/                   # K8s manifests
│   │   ├── deployments/
│   │   ├── services/
│   │   └── ingress/
│   │
│   ├── terraform/                    # Infrastructure as Code
│   │   ├── aws/
│   │   └── gcp/
│   │
│   └── scripts/                      # Deployment scripts
│
├── docs/                             # Documentation
│   ├── architecture/                 # Architecture docs
│   ├── api/                          # API documentation
│   └── guides/                       # User guides
│
├── .github/
│   ├── workflows/                    # CI/CD pipelines
│   │   ├── frontend-ci.yml
│   │   ├── backend-ci.yml
│   │   └── deploy.yml
│   └── ISSUE_TEMPLATE/
│
├── .husky/                           # Git hooks
├── .vscode/                          # VSCode settings
├── README.md
└── package.json
```

## 🚀 **Technology Stack**

### **Frontend**
```typescript
{
  "framework": "Next.js 16 (App Router)",
  "language": "TypeScript 5.9",
  "styling": "Tailwind CSS 3.4",
  "stateManagement": "Zustand + React Query",
  "charts": "Recharts + D3.js",
  "animations": "Framer Motion",
  "forms": "React Hook Form + Zod",
  "testing": "Jest + React Testing Library",
  "e2e": "Playwright"
}
```

### **Backend**
```python
{
  "framework": "FastAPI 0.104",
  "language": "Python 3.11+",
  "database": "PostgreSQL 15 + TimescaleDB",
  "cache": "Redis 7.0",
  "orm": "SQLAlchemy 2.0",
  "migration": "Alembic",
  "ml": "PyTorch 2.0 + Scikit-learn",
  "async": "asyncio + aiohttp",
  "testing": "pytest + pytest-asyncio"
}
```

### **DevOps & Infrastructure**
```yaml
Containerization: Docker + Docker Compose
Orchestration: Kubernetes (K8s)
CI/CD: GitHub Actions
Monitoring: Prometheus + Grafana + Sentry
Logging: ELK Stack (Elasticsearch, Logstash, Kibana)
Tracing: Jaeger + OpenTelemetry
Cloud: AWS / GCP / Azure (Multi-cloud ready)
CDN: CloudFlare
```

## 📊 **Key Features**

### **1. Explainable Dashboards**
- **Transparent Metrics**: Every number explained with data sources
- **Interactive Tooltips**: Click to understand methodology
- **Progress Tracking**: Real-time project completion status
- **Impact Visualization**: Dynamic charts showing projected outcomes
- **AI Explanations**: ML-powered insights with reasoning

### **2. Dynamic Project Management**
- **Real-time Updates**: WebSocket-based live data
- **Milestone Tracking**: Visual timeline with achievements
- **Resource Allocation**: Interactive Gantt charts
- **Risk Assessment**: AI-powered risk prediction
- **Collaboration Tools**: Team communication integrated

### **3. AI/ML Integration**
- **Predictive Analytics**: Project success probability
- **Anomaly Detection**: Automatic issue identification
- **Natural Language Interface**: Ask questions about data
- **Recommendation Engine**: Smart insights and suggestions
- **Model Explainability**: SHAP/LIME for model interpretability

### **4. IoT Data Integration**
- **Real-time Sensor Data**: Live device monitoring
- **Edge Computing**: Local data processing
- **Time-Series Analysis**: Historical trend visualization
- **Alert System**: Intelligent threshold monitoring
- **Device Management**: Remote configuration

## 🔒 **Security Architecture**

```
┌─────────────────────────────────────────────────┐
│ WAF (Web Application Firewall)                  │

## Local Quickstart (recommended)

For an opinionated, repeatable local developer experience we added a quickstart file with one-click bootstrap and test orchestration. From the repository root on Windows PowerShell run:

```powershell
.\scripts\setup-dev.ps1       # create venv, install backend deps, install frontend deps and Playwright
.\scripts\start-postgres.ps1  # optional: start local Postgres via docker-compose
.\scripts\run-all-tests.ps1 -StartDb   # start DB (if requested), run backend tests and Playwright E2E
```

See `README_QUICKSTART.md` for a shorter quickstart and troubleshooting tips.
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ DDoS Protection + Rate Limiting                 │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ API Gateway (Authentication & Authorization)    │
│ - JWT Token Validation                          │
│ - OAuth 2.0 / OIDC                             │
│ - RBAC Enforcement                              │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ Application Layer                                │
│ - Input Validation & Sanitization               │
│ - SQL Injection Prevention                       │
│ - XSS Protection                                 │
│ - CSRF Tokens                                    │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ Data Layer                                       │
│ - Encryption at Rest (AES-256)                  │
│ - Encryption in Transit (TLS 1.3)              │
│ - Database Access Control                        │
│ - Audit Logging                                  │
└─────────────────────────────────────────────────┘
```

## 🎨 **Design System**

### **Color Palette**
```scss
// Primary Colors
$primary-cyan: #06b6d4;
$primary-blue: #3b82f6;
$primary-purple: #8b5cf6;

// Semantic Colors
$success: #10b981;
$warning: #f59e0b;
$error: #ef4444;
$info: #3b82f6;

// Neutrals
$gray-900: #111827;
$gray-800: #1f2937;
$gray-700: #374151;
```

### **Typography**
```scss
// Font Stack
$font-primary: 'Inter', system-ui, -apple-system, sans-serif;
$font-mono: 'JetBrains Mono', 'Fira Code', monospace;

// Scale (Type Scale: 1.250 - Major Third)
$text-xs: 0.75rem;    // 12px
$text-sm: 0.875rem;   // 14px
$text-base: 1rem;     // 16px
$text-lg: 1.25rem;    // 20px
$text-xl: 1.563rem;   // 25px
$text-2xl: 1.953rem;  // 31px
$text-3xl: 2.441rem;  // 39px
$text-4xl: 3.052rem;  // 49px
```

## 📈 **Performance Targets**

```yaml
Metrics:
  First Contentful Paint (FCP): < 1.5s
  Largest Contentful Paint (LCP): < 2.5s
  Time to Interactive (TTI): < 3.5s
  Cumulative Layout Shift (CLS): < 0.1
  First Input Delay (FID): < 100ms
  
Lighthouse Scores:
  Performance: > 95
  Accessibility: 100
  Best Practices: 100
  SEO: 100
  
Backend:
  API Response Time (p95): < 200ms
  API Response Time (p99): < 500ms
  Database Query Time: < 50ms
  Throughput: > 10,000 req/sec
```

## 🧪 **Testing Strategy**

```
┌─────────────────────────────────────┐
│         Unit Tests (70%)             │
│ - Component testing                  │
│ - Function testing                   │
│ - Service testing                    │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│      Integration Tests (20%)         │
│ - API integration                    │
│ - Database integration               │
│ - External service mocking           │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│         E2E Tests (10%)              │
│ - User flow testing                  │
│ - Cross-browser testing              │
│ - Performance testing                │
└─────────────────────────────────────┘
```

## 🚀 **Quick Start**

### **Prerequisites**
```bash
Node.js >= 18.0.0
Python >= 3.11
Docker >= 24.0
PostgreSQL >= 15.0 (if running without Docker)
Redis >= 7.0 (optional)
```

### **Installation (Local Development)**

```bash
# Clone repository
git clone https://github.com/nexusedgesystems/platform.git
cd platform

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Initialize database (local SQLite for dev)
python create_tables.py

# (Optional) Seed sample data
python seed_projects.py

# Run development servers
npm run dev          # Frontend (http://localhost:3000)
# In another terminal:
uvicorn app.main:app --reload  # Backend (http://localhost:8000)
```

### **Installation (Docker Compose - Recommended)**

```bash
# Clone repository
git clone https://github.com/nexusedgesystems/platform.git
cd platform

# Build and start all services
docker-compose up -d

# Wait for services to be healthy
docker-compose ps

# Initialize database
docker-compose exec backend python create_tables.py

# Seed sample projects
docker-compose exec backend python seed_projects.py

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### **Environment Variables**

Create `.env` file in the repository root:

```bash
# Database (for docker-compose)
DATABASE_URL=postgresql+asyncpg://nesuser:nespass@postgres:5432/nes_db

# Backend
SENTRY_DSN=              # Optional: Sentry error tracking
APP_NAME="Nexus Edge Systems API"

# Frontend
NEXT_PUBLIC_API_BASE=http://localhost:8000

# Optional: GHCR & Vercel deployment
GHCR_PAT=               # GitHub Container Registry token
VERCEL_TOKEN=           # Vercel deployment token
```

## 📚 **Documentation**

- [Architecture Guide](./docs/architecture/README.md)
- [API Documentation](./docs/api/README.md)
- [Development Guide](./docs/guides/development.md)
- [Deployment Guide](./docs/guides/deployment.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 👥 **Team**

**Founder & Chief Innovation Officer**  
NKUNZIMANA Ernest  
MSc in IoT - Wireless Intelligent Sensor Networking  
University of Rwanda, ACEIoT

## 📄 **License**

Proprietary - © 2024 Nexus Edge Systems LTD. All rights reserved.

## 🌍 **Alignment**

This platform supports:
- 🇷🇼 Rwanda Vision 2050
- 🌍 African Union Agenda 2063
- 🌐 United Nations Sustainable Development Goals (SDGs)

---


**Built with ❤️ in Kigali, Rwanda 🇷🇼**

## CI & Deployment Notes

- Backend: a GitHub Actions workflow (`.github/workflows/deploy-backend.yml`) builds a Docker image and pushes it to GitHub Container Registry (GHCR). By default the workflow uses `${{ secrets.GITHUB_TOKEN }}`, but if your organization restricts package write permissions you should create a Personal Access Token (PAT) with `packages:write` and `repo` scopes and store it as `GHCR_PAT` in repository secrets.

- Frontend: Vercel is the recommended host (keeps preview deployments for PRs). If you want Actions to trigger Vercel deployments, add `VERCEL_TOKEN` to repository secrets and I can add an Action step that deploys via the Vercel CLI.

- Playwright: E2E runs produce an HTML report in `frontend/playwright-report` and upload it as a CI artifact. To inspect a failing run in Actions, download the `playwright-report` artifact and open `index.html`.

- Sentry: set `SENTRY_DSN` in the deployment environment to enable Sentry reporting for the backend. See `.env.example` for an example variable list.

If you'd like, I can:

- Enable automatic Vercel deploy from Actions (requires `VERCEL_TOKEN`), or
- Wire the backend deploy to a Kubernetes cluster (requires kubeconfig secret), or
- Add integration tests that run in Actions against a Postgres service container (already added as a best-effort in `backend-tests.yml`).

## Developer setup: Husky and lint-staged (one-time per machine)

To get pre-commit lint checks working locally (husky + lint-staged), run these steps once on your development machine after cloning:

Windows (PowerShell):
```powershell
cd frontend
npm ci
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

macOS / Linux:
```bash
cd frontend
npm ci
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

I added a root-level `.husky/pre-commit` which runs `lint-staged` inside the `frontend` folder so commits will trigger lint checks even if the per-folder husky install step is not completed, but running the commands above will set up per-folder hooks as well.
