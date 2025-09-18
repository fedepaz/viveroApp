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
   → Defines **test-driven development workflow** and **CI/CD requirements**.  
3. `docs/agents/product-manager-agent.md`  
   → Defines **product vision, enterprise workflows, and SaaS requirements**.  
4. `docs/agents/frontend-agent-guide.md`  
   → Defines **frontend implementation standards**, component architecture, performance targets, and agricultural UX patterns.  

---

## ⚖️ Rules of Engagement
- **Do not invent tech.** Only use frameworks, libraries, and tools explicitly defined in `tech_stack_guide.md`.  
- **Default backend stack** = `NestJS + Prisma + MariaDB 10.9+`, with Redis, BullMQ, S3, and Clerk/Keycloak for auth.  
- **Default frontend stack** = `Next.js 14 App Router + Tailwind + shadcn/ui + MUI theme`.  
- **Frontend implementations** must follow `frontend-agent-guide.md` (Next.js 14, Tailwind, shadcn/ui, TanStack, etc.)  
- **Product requirements** must follow `product-manager-agent.md` (multi-tenant, enterprise workflows).  
- **Testing must follow TDD** as outlined in `tdd_cicd_guide.md` (Vitest, Jest, Playwright, 80%+ coverage).  
- **CI/CD** must always be part of code suggestions (GitHub Actions, pipelines with build/test/deploy).  
- **Enterprise workflows** (multi-tenancy, supply chain, financial ops, compliance) must follow `product-manager-agent.md`.  

---

## 🛠️ Development Standards
- **Monorepo with pnpm workspaces** (`apps/` and `packages/` layout).  
- **Shared contracts** (Zod schemas, DTOs, API definitions) live in `packages/shared`.  
- **Infrastructure as Code** (Terraform + Helm) in `packages/infra`.  
- **Documentation** must use the format specified in `product-manager-agent.md` (Executive Summary, Feature Specs, etc.).  

---

## 📌 Agent Behavior
- Always **cite which doc** a decision comes from (example: “Per `tech_stack_guide.md`, backend must use NestJS”).  
- If docs **conflict**, follow this priority:  
  1. `tech_stack_guide.md` for technical stack  
  2. `tdd_cicd_guide.md` for testing & pipelines  
  3. `product-manager-agent.md` for product/enterprise logic  
- If **uncertain**, **ask for clarification** instead of assuming defaults.  

---

## ✅ Success Criteria
- Generated code runs with the defined stack.  
- Tests exist **before** feature code (TDD).  
- CI/CD pipelines include build, lint, test, coverage, deploy.  
- Product features align with enterprise SaaS workflows.  
- Documentation follows `product-manager-agent.md` structure.  

---

🌱💻🚀 *This file is the AI agent’s constitution. Always follow it.*  
