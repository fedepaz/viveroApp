# 📑 GEMINI.md

This document outlines the specialized agents that assist in the development of the Personal Finance Tracker application. Each agent has a specific role and expertise.

**Rule:** Before making any changes to the codebase, you **must** first consult the relevant agent profile in the `docs/` directory. The agent profiles are the single source of truth for the project's architecture, patterns, and standards. Do not deviate from the guidelines documented in the agent profiles.

---

### Rule: Workflow for Reviewing Code Changes

When the user asks me to check and summarize changes in the codebase, I will follow this exact procedure:

1.  **Inspect Commits**: Use `github.list_commits` and `github.get_commit` to retrieve the details of the recent changes.

2.  **Summarize for User**: Present a clear summary of the code changes to the user.

3.  **Internal Alignment Check**: After summarizing, I will silently (without asking the user yet) compare the code changes against the agent documentation in the `docs/` directory to check for:

    - Deviations from established patterns.
    - New patterns that need to be documented.
    - Opportunities to update or refine the agent guidelines themselves.

4.  **Propose All Documentation Updates**: Based on the alignment check, I will formulate a single, comprehensive proposal for all necessary documentation changes. This proposal may include updates to:

    - The setup guides in `docs/guides/`.
    - The agent profiles in `docs/`.

5.  **Request User Confirmation**: I will present the complete documentation update proposal to the user and ask for a single confirmation before proceeding to write any files.

---

### Rule: Workflow for Conducting Research

When the user asks a question that requires research (e.g., "how to implement X in Hono," "what is the best library for Y"), I will follow this protocol:

1.  **Prioritize Specialized Documentation**: My first step will always be to seek structured, high-quality information using specialized tools. I will prioritize them in this order:

    - **Library Docs**: Use `get_library_docs` (after resolving the ID with `resolve_library_id`) to find official documentation for specific libraries or frameworks.
    - **Code Search**: Use `github.search_code` to find real-world implementation examples and patterns on GitHub.

2.  **Use General Web Search**: Only if the specialized tools do not provide a sufficient answer will I use the `google_web_search` tool to search the broader web.

3.  **Synthesize and Cite**: I will synthesize the information gathered from all sources into a concise and clear answer. I will cite the sources of the information (e.g., URLs from web search, library documentation pages) so you can verify the information if needed.

---

### Rule: Workflow for Committing and Pushing New Work

When the user asks me to **commit, push, or otherwise save new work**, I will execute the following master workflow, which combines our previously established rules:

1.  **Execute "Workflow for Reviewing Code Changes"**:

    - To see the unstaged changes, I must inspect the local files. I will use `git diff HEAD` to get a summary of all the modifications.
    - I will then follow the steps of the "Workflow for Reviewing Code Changes" on the output of that diff, which includes summarizing the changes and performing an internal alignment check against the agent documentation.

2.  **Execute "Workflow for Conducting Research"**:

    - Next, I will automatically perform the "Workflow for Conducting Research" on the patterns and technologies found in the code changes to ensure they align with industry best practices.

3.  **Generate and Internally Validate Commit Message**:

    - I will generate a draft commit message based on the changes.
    - I will then internally validate this message against the project's `commitlint` rules (e.g., by running `cat <file> | npx commitlint`).
    - If there are any errors, I will automatically correct them and re-validate until the message is fully compliant.

4.  **Propose a Comprehensive Plan**:

    - After completing the review, research, and commit message validation, I will present you with a single, comprehensive plan that includes:
      1.  A validated, compliant commit message.
      2.  A summary of the research findings.
      3.  A proposal for any necessary documentation updates (for both `docs/guides/` and the agent profiles).

5.  **Execute Commit and Push**:
    - Only after receiving your final approval on the comprehensive plan will I execute the following commit procedure:
      1.  **Save Commit Message**: Create a `.commits` directory (if it doesn't exist) and save the full, approved commit message to a new file within it with the following format: `<commit_message_title> - <date>.txt`.
      2.  **Stage All Changes**: Run `git add .` to stage all modified files, including the new documentation and the commit message file itself.
      3.  **Create Commit**: Run `git commit -F <path_to_commit_message_file>` to create the commit using the detailed message from the file.
      4.  **Push to Remote**: If you have requested to push, I will run `git push` to send the changes to the remote repository.

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
4. `docs/agents/agricultural-backend-agent.md`
   → Defines **backend implementation standards**, multi-tenant architecture, and agricultural enterprise workflows.
5. `docs/agents/frontend-agent-guide.md`  
   → Defines **frontend implementation standards**, component architecture, performance targets, and agricultural UX patterns.
6. `docs/agents/shared-package-agent.md`
   → Defines how to maintain **type-safe contracts** between frontend and backend.
7. `docs/agents/agricultural-ux-ui-agent.md`
   → Defines **design standards** for the Agricultural SaaS Platform.

---

## ⚖️ Rules of Engagement

- **Do not invent tech.** Only use frameworks, libraries, and tools explicitly defined in `tech_stack_guide.md`.
- **Default backend stack** = `NestJS + Prisma + MariaDB 10.9+`. It receives authentication state from the frontend (which uses Clerk) to manage authorization and permissions.
- **Default frontend stack** = `Next.js 14 App Router + Tailwind + shadcn/ui`.
- **Backend implementations** must follow `agricultural-backend-agent.md` (NestJS, Prisma, multi-tenant patterns, etc.).
- **Frontend implementations** must follow `frontend-agent-guide.md` (Next.js 14, Tailwind, shadcn/ui, TanStack, etc.)
- **Shared Contracts:** All data contracts (types, DTOs, schemas) **must** be synchronized via the `@plant-mgmt/shared` package, following the process in `shared-package-agent.md`, to ensure type safety between applications.
- **Product requirements** must follow `product-manager-agent.md` (multi-tenant, enterprise workflows).
- **Testing must follow TDD** as outlined in `tdd_cicd_guide.md` (Vitest, Jest, Playwright, 80%+ coverage).
- **CI/CD**: Must follow the 4-file structure defined in `docs/agents/cicd_agent.md` and is optimized with Turborepo. All GitHub Actions must be verified using the `resolve_library_id` tool before use.
- **Enterprise workflows** (multi-tenancy, supply chain, financial ops, compliance) must follow `product-manager-agent.md`.

---

## 🛠️ Development Standards

- **Monorepo with pnpm workspaces** (`apps/` and `packages/` layout).
- **Build System**: Uses **Turborepo** to manage monorepo tasks and optimize CI/CD pipelines.
- **Local Quality Gates**: Uses **Husky** with pre-commit hooks to automatically run linters and enforce branch protection rules before code is committed.
- **Commit Message Convention**: Follows the **Conventional Commits** specification, as detailed in `COMMIT_CONVENTIONS.md`. This is enforced automatically by `commitlint` via a Husky hook.
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
- **`agricultural-backend-agent`**: Implements the backend of the application using NestJS, Prisma, and other related technologies. See `docs/agents/agricultural-backend-agent.md` for more details.
- **`agricultural-frontend-specialist`**: Implements the frontend of the application using React, Next.js, and other related technologies. See `docs/agents/frontend-agent-guide.md` for more details.
- **`agricultural-product-manager`**: Defines the product vision, features, and requirements for the agricultural enterprise management system. See `docs/agents/product-manager-agent.md` for more details.
- **`qa_agent`**: Ensures enterprise-grade quality through comprehensive testing strategies adapted to multi-tenant plant management systems. See `docs/agents/qa_agent.md` for more details.
- **`shared-package-agent`**: Extracts, synchronizes, and maintains type-safe contracts between frontend and backend applications. See `docs/agents/shared-package-agent.md` for more details.
- **`solo-developer-roadmap`**: Outlines a realistic development timeline for a solo developer building the enterprise plant management system. See `docs/agents/solo_developer_roadmap.md` for more details.
- **`tdd-cicd-guide`**: Provides guidance on Test-Driven Development (TDD) and Continuous Integration/Continuous Deployment (CI/CD) practices. See `docs/agents/tdd_cicd_guide.md` for more details.
- **`tech-stack-guide`**: Defines the approved technology stack for the project. See `docs/agents/tech_stack_guide.md` for more details.

---

## ✅ Success Criteria

- Generated code runs with the defined stack.
- Tests exist **before** feature code (TDD).
- CI/CD pipelines include build, lint, test, coverage, deploy.
- Product features align with enterprise SaaS workflows.
- **Modern User Experience**: Interfaces are responsive, accessible, and provide a modern user experience, including the use of skeleton loading states to manage perceived performance.
- Documentation follows `product-manager-agent.md` structure.

---

🌱💻🚀 _This file is the AI agent’s constitution. Always follow it._
