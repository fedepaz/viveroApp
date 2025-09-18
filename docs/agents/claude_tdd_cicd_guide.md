CLAUDE.md - Enterprise Plant Management System
TDD & CI/CD Guide for "Chill Mode" Development 😎
Philosophy: Write tests so good that you sleep peacefully knowing your 3-4 enterprise clients are happy and your app won't wake you up at 3 AM.
Test-Driven Development Strategy
The "Sleep Well" Testing Pyramid
                    /\
                   /  \
              E2E /____\ (5% - Critical user flows)
                 /      \
        Integration /____ \ (15% - API contracts)
               /          \
           Unit /___________\ (80% - Business logic)
Testing Philosophy
Rule #1: If it can break at 3 AM and wake you up, it needs a test.
Rule #2: If a client can lose money because of it, it needs integration tests.
Rule #3: If it's business logic, it needs unit tests.
Frontend Testing Stack
Setup
# Testing dependencies
pnpm add -D @testing-library/react @testing-library/jest-dom
pnpm add -D @testing-library/user-event vitest jsdom
pnpm add -D @playwright/test
Unit Tests (80% of tests)
// components/__tests__/PlantCard.test.tsx
import { render, screen } from '@testing-library/react'
import { PlantCard } from '../PlantCard'

describe('PlantCard', () => {
  it('displays plant information correctly', () => {
    const plant = {
      id: '1',
      name: 'Tulip Red',
      status: 'growing',
      temperature: 22,
      daysToHarvest: 45
    }

    render(<PlantCard plant={plant} />)
    
    expect(screen.getByText('Tulip Red')).toBeInTheDocument()
    expect(screen.getByText('22°C')).toBeInTheDocument()
    expect(screen.getByText('45 days')).toBeInTheDocument()
  })

  it('shows critical temperature warning', () => {
    const plant = { ...mockPlant, temperature: 35 }
    render(<PlantCard plant={plant} />)
    
    expect(screen.getByRole('alert')).toHaveTextContent('Critical temperature')
  })
})
Integration Tests (15% of tests)
// hooks/__tests__/usePlants.test.tsx
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePlants } from '../usePlants'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('usePlants', () => {
  it('fetches plants data correctly', async () => {
    const { result } = renderHook(() => usePlants('tenant-1'), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toHaveLength(10)
    expect(result.current.data[0]).toHaveProperty('name')
  })
})
E2E Tests (5% of tests - Critical flows)
// e2e/plant-lifecycle.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Plant Lifecycle Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.fill('[data-testid=email]', 'admin@tulips-nl.com')
    await page.fill('[data-testid=password]', 'test123')
    await page.click('[data-testid=login-button]')
  })

  test('complete plant lifecycle: create → grow → harvest', async ({ page }) => {
    // Create plant
    await page.click('[data-testid=create-plant]')
    await page.fill('[data-testid=plant-name]', 'Test Tulip')
    await page.selectOption('[data-testid=plant-type]', 'tulip-red')
    await page.click('[data-testid=save-plant]')
    
    await expect(page.locator('[data-testid=plant-card]')).toContainText('Test Tulip')
    
    // Update growth data
    await page.click('[data-testid=update-plant]')
    await page.fill('[data-testid=temperature]', '22')
    await page.fill('[data-testid=humidity]', '65')
    await page.click('[data-testid=save-update]')
    
    // Verify dashboard updates
    await expect(page.locator('[data-testid=dashboard-temperature]')).toContainText('22°C')
  })

  test('handles critical temperature alerts', async ({ page }) => {
    await page.goto('/plants/critical-temp-plant')
    
    // Should show alert for high temperature
    await expect(page.locator('[role=alert]')).toBeVisible()
    await expect(page.locator('[role=alert]')).toContainText('Critical temperature')
  })
})
Backend Testing Stack
NestJS Test Setup
// test/setup.ts
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from '../src/prisma/prisma.service'

export const createTestModule = async (providers: any[] = []) => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    providers: [PrismaService, ...providers],
  }).compile()

  return moduleRef
}

// Global test database setup
beforeAll(async () => {
  // Run test migrations
  execSync('pnpx prisma migrate deploy', { 
    env: { ...process.env, DATABASE_URL: process.env.TEST_DATABASE_URL } 
  })
})

afterEach(async () => {
  // Clean test database
  await prisma.plant.deleteMany()
  await prisma.user.deleteMany()
})
Unit Tests - Services
// src/plants/plants.service.spec.ts
describe('PlantsService', () = > {
  let service: PlantsService
  let prisma: PrismaService

  beforeEach(async () = > {
    const module = await createTestModule([PlantsService])
    service = module.get <PlantsService >(PlantsService)
    prisma = module.get <PrismaService >(PrismaService)
  })

  describe('createPlant', () = > {
    it('creates a plant with correct data', async () = > {
      const plantData = {
        name: 'Test Tulip',
        type: 'tulip',
        tenantId: 'tenant-1'
      }

      const result = await service.createPlant(plantData)

       expect(result).toMatchObject({
        name: 'Test Tulip',
        type: 'tulip',
        status: 'planted'
      })

      // Verify database state
      const dbPlant = await  prisma.plant.findUnique({ where: { id: result.id } })
      expect(dbPlant.name).toBe('Test Tulip')
    })

    it('validates plant data correctly', async () = > {
      const invalidData = { name: '', type: 'invalid' }

      await expect(service.createPlant(invalidData)).rejects.toThrow('Invalid plant data')
    })
  })

  describe('get CriticalPlants', () = > {
    it('returns plants with critical conditions', async () = > {
      // Seed test data
      await prisma.plant.createMany({
        data: [
          { name: 'Normal Plant', temperature: 22, tenantId: 'tenant-1' },
          { name: 'Hot  Plant', temperature: 35, tenantId: 'tenant-1' },
          { name: 'Cold Plant', temperature: 5, tenantId: 'tenant-1' }
        ]
      })

      const criticalPlants = await servi ce.getCriticalPlants('tenant-1')

      expect(criticalPlants).toHaveLength(2)
      expect(criticalPlants.map(p = > p.name)).toEqual(['Hot Plant', 'Cold Plant'])
    })
  })
})
Integration Tests - Controllers
// src/plants/plants.controller.spec.ts
describe('PlantsController (Integration)', () = > {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () = > {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
    
    p risma = app.get(PrismaService)
  })

  describe('/plants (GET)', () = > {
    it('returns plants for authenticated user', async () = > {
      const jwt = await getValidJWT('tenant-1', 'admin')
      
      await request(app.getHttpServer())
        .get('/api/v1/tenant-1/plants')
        .set('Authorization', ` Bearer ${jwt}`)
        .expect(200)
        .expect((res) = > {
          expect(res.body).toHaveProperty('data')
          expect(Array.isArray(res.body.data)).toBe(true)
        })
    })

    it('rejects requests without proper tenant ac cess', async () = > {
      const jwt = await getValidJWT('tenant-2', 'admin')
      
      await request(app.getHttpServer())
        .get('/api/v1/tenant-1/plants')
        .set('Authorization', ` Bearer ${jwt}`)
        .expect(403)
    })
  })

  describe('/plants (POST)', () = > {
    it('creates plant with valid data', async () = > {
      const jwt = await getValidJWT('tenant-1', 'admin')
      const plantData = {
        name: 'Integration Test Plant',
        type: 'tulip',
        variety: 'red'
      } 

      await request(app.getHttpServer())
        .post('/api/v1/tenant-1/plants')
        .set('Authorization', `Bearer ${jwt}`)
        .send(plantData)
        .expect(201)
         .expect((res) = > {
          expect(res.body.name).toBe('Integration Test Plant')
          expect(res.body.id).toBeDefined()
        })
    })
  })
})
CI/CD Pipeline Configuration
GitHub Actions Workflow
# .github/workflows/ci-cd.yml
name: Enterprise Plant Management CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  R EGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # ========================
  # QUALITY GATES
  # ========================
  lint-and-format:
    runs-on: ubuntu-la test
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION  }}
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run linting
        run: pnpm run lint
      
      - name: Check format ting
        run: pnpm run format:check
      
      - name: Type checking
        run: pnpm run type-check

  # ========================
  # UNIT TESTS
  # ========================
   unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
           node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run unit tests
        run: pnpm run test:unit -- --coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  # =========== =============
  # INTEGRATION TESTS
  # ========================
  integration-tests:
    runs-on: ubuntu-latest
    services:
      mariadb:
        image: mariadb:10.9
        en v:
          MYSQL_ROOT_PASSWORD: testpass
          MYSQL_DATABASE: plant_test
        options:  >-
          --health-cmd= "mysqladmin ping "
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3
      
      redis:
        image: redis:7-alpine
        options:  >-
          --health-cmd  "redis-cli ping "
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
         uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
       
      - name: Run database migrations
        run: pnpm run db:migrate:test
        env:
          DATABASE_URL: mysql://root:testpass@localhost:3306/plant_test
      
      - n ame: Run integration tests
        run: pnpm run test:integration
        env:
          DATABASE_URL: mysql://root:testpass@localhost:3306/plant_test
          REDIS_URL: redis://l ocalhost:6379

  # ========================
  # E2E TESTS
  # ========================
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
       - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Install Playwright browsers
        run: pnpx playwright install
      
      - name: Build application
        run: pnpm run build 
      
      - name: Run E2E tests
        run: pnpm run test:e2e
      
      - name: Upload E2E test results
        uses: actions/upload-artifact@v3
        if: always()
         with:
          name: e2e-results
          path: test-results/

  # ========================
  # SECURITY SCANNING
  # ========================
  security-scan:
    runs-on: ubun tu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run security audit
        run: pnpm audit --audit-level high
      
      - name: Scan for secrets
         uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: main
          head: HEAD

  # ========================
  # BUILD  & DEPLOY
  # ========================
  build-and-push:
    needs: [lint-and-format, unit-tests, integration-tests, security-scan]
    runs-on: ubuntu-latest
    if: github.ref ==  'refs/heads/main'
    
    outputs:
      image-tag: ${{ steps.meta.outputs.tags }}
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
         uses: docker/setup-buildx-action@v3
      
      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }} 
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action @v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=sha,prefix=sha-
            type= raw,value=latest,enable={{is_default_branch}}
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
           platforms: linux/amd64,linux/arm64
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: ty pe=gha
          cache-to: type=gha,mode=max

  # ========================
  # DEPLOY TO STAGING
  # ========================
  deploy-staging:
    needs: [build-and-push, e2e-test s]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: staging
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to stag ing
        run: |
          echo  "Deploying to staging environment... "
          # Add your staging deployment logic here
          # Example: kubectl, helm, or cloud deployment
        env:
          KUBE_CONFIG: ${{ secrets.KUBE_CONFIG_STAGING }}
           IMAGE_TAG: ${{ needs.build-and-push.outputs.image-tag }}

  # ========================
  # RUN E2E ON STAGING
  # ========================
  staging-e2e:
    needs: deplo y-staging
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          nod e-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Install Playwright
        run: pnpx playwright install
      
      - name: Run E2E tests against staging
        run: pnpm run test:e2e:staging
        env:
          BASE_URL: https://staging.plant-mgmt.com

  # ====== ==================
  # DEPLOY TO PRODUCTION
  # ========================
  deploy-production:
    needs: [staging-e2e]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/ main'
    environment: production
    
    steps:
      - name: Deploy to production
        run: |
          echo  "Deploying to production environment... "
          # Add your production deployment logic
        env:
          KUBE_CONFIG: ${{ secrets.KUBE_CONFIG_PRODUCTION }}
          IMAGE_TAG: ${{ needs.build-and-push.outputs.i mage-tag }}
      
      - name: Run smoke tests
        run: |
          echo  "Running production smoke tests... "
          # Add smoke test logic

  # ========================
  # NOTIFY TEAM
  # ========================
  notify:
    needs: [deploy-production]
    runs-on: ubuntu-latest
     if: always()
    steps:
      - name: Notify deployment status
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#deploym ents'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
Package.json Scripts
{
   "scripts ": {
     "dev ":  "concurrently \ "pnpm dev:*\ " ",
     "dev:frontend ":  "next dev ",
     "dev:backend ":  "nest start --watch ",
    
     "build ":  "pnpm run build:frontend  & & pnpm run build:backend ",
     "build:frontend ":  "next build ",
     "build:backend ":  "nest build ",
    
     "test ":  "pnpm run test:unit  & & pnpm run test:integration  & & pnpm run test:e2e ",
     "test:unit ":  "vitest run --coverage ",
     "test:unit:watch ":  "vitest ",
     "test:integration ":  "jest --config jest.integration.config.js ",
     "test:e2e ":  "playwright test ",
     "test:e2e:staging ":  "playwright test --config playwright.staging.config.ts ",
    
     "lint ":  "next lint  & & eslint \ "src/**/*.{js,ts}\ " ",
     "format ":  "prettier --write . ",
     "format:check ":  "prettier --check . ",
     "type-check ":  "tsc --noEmit ",
    
     "db:migrate ":  "prisma migrate dev ",
     "db:migrate:test ":  "dotenv -e .env.test prisma migrate deploy ",
     "db:migrate:prod ":  "prisma migrate deploy ",
     "db:seed ":  "ts-node prisma/seed.ts ",
     "db:studio ":  "prisma studio ",
    
     "docker:build ":  "docker build -t plant-mgmt . ",
     "docker:run ":  "docker-compose up -d "
  }
}
Quality Gates & Metrics
Code Coverage Requirements
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      },
      exclude: [
        'dist/**',
        'node_modules/**',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/migrations/**'
      ]
    }
  }
})
Performance Budgets
// next.config.js
module.exports = {
  experimental: {
    bundleAnalyzer: {
      enabled: process.env.ANALYZE === 'true',
    }
  },
  // Performance budgets
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.default.minSize = 20000;
      config.optimization.splitChunks.cacheGroups.default.maxSize = 244000;
    }
    return config;
  }
}
Database Migration Safety
-- migrations/migration-template.sql
-- Migration: {{ migration_name }}
-- Date: {{ date }}
-- Author: {{ author }}

-- Safety checks
SET foreign_key_checks = 0;

-- Begin transaction
START TRANSACTION;

-- Your migration here
{{ migration_sql }}

-- Rollback plan (commented)
-- {{ rollback_sql }}

-- Commit
COMMIT;
SET foreign_key_checks = 1;
Monitoring & Alerting Integration
Health Check Endpoints
// src/health/health.controller.ts
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private redis: RedisHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.redis.isHealthy('redis'),
      () => this.customHealthCheck(),
    ]);
  }

  private async customHealthCheck(): Promise<HealthIndicatorResult> {
    const isHealthy = await this.checkCriticalSystemHealth();
    const result = this.getStatus('custom', isHealthy);
    
    if (!isHealthy) {
      throw new HealthCheckError('Custom health check failed', result);
    }
    
    return result;
  }
}
Deployment Verification
#!/bin/bash
# scripts/verify-deployment.sh

echo "🚀 Starting deployment verification..."

# Health check
echo "⚕️  Checking health endpoint..."
curl -f https://api.plant-mgmt.com/health || exit 1

# Database connectivity
echo "🗄️  Checking database..."
pnpm run db:health-check || exit 1

# Redis connectivity
echo "⚡ Checking Redis..."
redis-cli ping || exit 1

# Smoke tests
echo "🔥 Running smoke tests..."
pnpm run test:smoke || exit 1

echo "✅ Deployment verification completed successfully!"
The "Chill Mode" Checklist ✅
Before you deploy to production:
[ ] Unit test coverage > 80%
[ ] Integration tests cover all API endpoints
[ ] E2E tests cover critical user journeys
[ ] Security scan passes
[ ] Performance tests pass
[ ] Database migrations tested
[ ] Rollback plan documented
[ ] Monitoring alerts configured
[ ] Health checks implemented
[ ] Staging environment tested
After deployment:
[ ] Smoke tests pass
[ ] Monitoring dashboards showing green
[ ] Error rates < 0.1%
[ ] Response times < 200ms
[ ] All services healthy
For true "chill mode":
[ ] Automated rollback on failure
[ ] 24/7 monitoring alerts to phone
[ ] Backup verification automated
[ ] Client SLA monitoring
[ ] Revenue impact alerts
Remember: The goal is to build it once, test it thoroughly, and then just monitor the money coming in while your enterprise clients are happy. 💰😎
This setup gives you the confidence to sleep well knowing your system is bulletproof and your clients are getting enterprise-grade reliability.
