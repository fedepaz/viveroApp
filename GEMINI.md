# 📑 GEMINI.md

## 🎯 Purpose

This file defines how AI agents must operate when generating, reviewing, or refactoring code and documentation for the **Agricultural SaaS Platform**.

It ensures consistency across:

- **Tech stack decisions**
- **Development practices (TDD & CI/CD)**
- **Product logic & enterprise requirements**

---

## 📂 Core Reference Documents

Agents must **always read and apply** the following project guides before responding:

1. `docs/agents/tech_stack_guide.md`  
   → Defines **approved technology stack** for frontend, backend, infra, and testing.
2. `docs/agents/tdd_cicd_guide.md`  
   `docs/agents/cicd_agent.md`
   → Defines **test-driven development workflow** and **CI/CD requirements**.
3. `docs/agents/product-manager-agent.md`  
   → Defines **product vision, enterprise workflows, and SaaS requirements**.
4. `docs/agents/frontend-agent-guide.md`  
   → Defines **frontend implementation standards**, component architecture, performance targets, and agricultural UX patterns.
5. `docs/agents/agricultural-ux-ui-agent.md`
   → Defines **design standards** for the Agricultural SaaS Platform.

---

## ⚖️ Rules of Engagement

- **Do not invent tech.** Only use frameworks, libraries, and tools explicitly defined in `tech_stack_guide.md`.
- **Default backend stack** = `NestJS + Prisma + MariaDB 10.9+`, with Redis, BullMQ, S3, and Clerk/Keycloak for auth. (Note: Prisma setup, including `schema.prisma` and `PrismaService`, is part of this stack's implementation.)
- **Default frontend stack** = `Next.js 14 App Router + Tailwind + shadcn/ui`.
- **Frontend implementations** must follow `frontend-agent-guide.md` (Next.js 14, Tailwind, shadcn/ui, TanStack, etc.)
- **Product requirements** must follow `product-manager-agent.md` (multi-tenant, enterprise workflows).
- **Testing must follow TDD** as outlined in `tdd_cicd_guide.md` (Vitest, Jest, Playwright, 80%+ coverage).
- **CI/CD**: Must follow the 4-file structure defined in `docs/agents/cicd_agent.md` and is optimized with Turborepo. All GitHub Actions must be verified using the `resolve_library_id` tool before use.
- **Enterprise workflows** (multi-tenancy, supply chain, financial ops, compliance) must follow `product-manager-agent.md`.

---

## 🛠️ Development Standards

- **Monorepo with pnpm workspaces** (`apps/` and `packages/` layout).
- **Shared contracts** (Zod schemas, DTOs, API definitions) live in `packages/shared`.
- **Infrastructure as Code** (Terraform + Helm) in `packages/infra`.
- **Documentation** must use the format specified in `product-manager-agent.md` (Executive Summary, Feature Specs, etc.).

---

## 🌊 Git Workflow

- **Branching Strategy**: All new features should be developed in a feature branch (e.g., `feat/new-feature`).
- **Pull Requests**: Pull requests should be made to the `frontendDev` or `backendDev` branches.
- **No Direct Pushes to `main`**: Direct pushes to the `main` branch are not allowed.
- **Merging to `main`**: Merges to the `main` branch should only be done through the GitHub UI after a pull request has been reviewed and approved.

---

## 📌 Agent Behavior

- Always **cite which doc** a decision comes from (example: “Per `tech_stack_guide.md`, backend must use NestJS”).
- If docs **conflict**, follow this priority:
  1. `tech_stack_guide.md` for technical stack
  2. `tdd_cicd_guide.md` for testing & pipelines
  3. `product-manager-agent.md` for product/enterprise logic
- If **uncertain**, **ask for clarification** instead of assuming defaults.

---

## 🤖 Agent Roles

This section outlines the roles and responsibilities of the AI agents involved in this project.

- **`agricultural-ux-ui-designer`**: Designs the user experience and user interface for the agricultural enterprise management system. See `docs/agents/agricultural-ux-ui-agent.md` for more details.
- **`cicd-pipeline-engineer`**: Creates and manages the CI/CD pipelines for automated testing, building, and deployment. See `docs/agents/cicd_agent.md` for more details.
- **`plant-management-devops-engineer`**: Handles the infrastructure and deployment of the multi-tenant SaaS platform. See `docs/agents/devops_agent.md` for more details.
- **`agricultural-frontend-specialist`**: Implements the frontend of the application using React, Next.js, and other related technologies. See `docs/agents/frontend-agent-guide.md` for more details.
- **`agricultural-product-manager`**: Defines the product vision, features, and requirements for the agricultural enterprise management system. See `docs/agents/product-manager-agent.md` for more details.
- **`solo-developer-roadmap`**: Outlines a realistic development timeline for a solo developer building the enterprise plant management system. See `docs/agents/solo_developer_roadmap.md` for more details.
- **`tdd-cicd-guide`**: Provides guidance on Test-Driven Development (TDD) and Continuous Integration/Continuous Deployment (CI/CD) practices. See `docs/agents/tdd_cicd_guide.md` for more details.
- **`tech-stack-guide`**: Defines the approved technology stack for the project. See `docs/agents/tech_stack_guide.md` for more details.

---

## ✅ Success Criteria

- Generated code runs with the defined stack.
- Tests exist **before** feature code (TDD).
- CI/CD pipelines include build, lint, test, coverage, deploy.
- Product features align with enterprise SaaS workflows.
- Documentation follows `product-manager-agent.md` structure.

---

🌱💻🚀 _This file is the AI agent’s constitution. Always follow it._
