# Tasks: Update Actions and Agent Definitions

**Input**: Design documents from `/specs/003-update-actions-update/`
**Prerequisites**: plan.md (required), research.md, quickstart.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup
- [x] T001 [P] Create `.github/workflows/lint-test.yml`
- [x] T002 [P] Create `.github/workflows/build-artifacts.yml`
- [x] T003 [P] Create `.github/workflows/deploy-production.yml`
- [x] T004 [P] Create `.github/workflows/e2e-tests.yml`
- [x] T005 [P] Create `.github/workflows/post-deploy.yml`
- [x] T006 [P] Create `.github/workflows/scheduled-maintenance.yml`

## Phase 3.2: Core Implementation
- [x] T007 Update `GEMINI.md` to include a new section for "Agent Roles" with a brief description of each agent's responsibilities and a link to the full agent guide in the `docs/agents` directory.

## Phase 3.3: Polish
- [x] T008 [P] Update `README.md` to include a reference to the new CI/CD workflows.

## Dependencies
- No dependencies between setup tasks.
- T007 and T008 can be done in parallel.

## Parallel Example
```
# Launch T001-T006 together:
Task: "Create .github/workflows/lint-test.yml"
Task: "Create .github/workflows/build-artifacts.yml"
Task: "Create .github/workflows/deploy-production.yml"
Task: "Create .github/workflows/e2e-tests.yml"
Task: "Create .github/workflows/post-deploy.yml"
Task: "Create .github/workflows/scheduled-maintenance.yml"
```