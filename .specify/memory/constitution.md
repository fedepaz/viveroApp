# Agricultural SaaS Platform Constitution

## Core Principles

### I. Defined Tech Stack

- **Frontend**: Next.js 14 App Router + Tailwind + shadcn/ui + MUI theme
- **Backend**: NestJS + Prisma + MariaDB 10.9+
- **Authentication**: Clerk/Keycloak
- **Infrastructure**: Terraform + Helm, S3 for storage
- **Async Tasks**: Redis, BullMQ

### II. Test-Driven Development (TDD)

- TDD is mandatory. Tests must be written before feature code.
- The Red-Green-Refactor cycle is strictly enforced.
- Minimum 80% test coverage is required.
- **Testing Tools**: Vitest, Jest, Playwright.

### III. Monorepo Architecture

- The project uses a pnpm monorepo with `apps/` and `packages/` layout.
- Shared contracts (Zod schemas, DTOs, API definitions) are located in `packages/shared`.
- Infrastructure as Code is located in `packages/infra`.

### IV. CI/CD

- All code suggestions must include CI/CD pipelines (GitHub Actions).
- Pipelines must include build, lint, test, coverage, and deploy stages.

### V. Enterprise Workflows

- All features must adhere to the enterprise workflows defined in `product-manager-agent.md`.
- This includes multi-tenancy, supply chain, financial ops, and compliance.

## Agent Behavior

- Agents must always cite the source document for their decisions (e.g., "Per `tech_stack_guide.md`, the backend must use NestJS").
- In case of conflicting documentation, the priority is:
  1. `tech_stack_guide.md`
  2. `tdd_cicd_guide.md`
  3. `product-manager-agent.md`
- If uncertain, agents must ask for clarification.

## Governance

- This constitution supersedes all other practices.
- All PRs and reviews must verify compliance with this constitution.
- Any complexity must be justified.

**Version**: 1.0.0 | **Ratified**: 2025-09-19 | **Last Amended**: 2025-09-19
