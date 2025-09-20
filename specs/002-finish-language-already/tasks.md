# Tasks: Finish Language Refactor

**Input**: Design documents from `/specs/002-finish-language-already/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
   → quickstart.md: Extract test scenarios → integration test tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Research: tasks to resolve unknowns and best practices
   → Tests: contract tests, integration tests
   → Core: models, services, API endpoints, frontend components refactor
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
- **Web app**: `apps/backend/src/`, `apps/frontend/src/`

## Phase 3.1: Setup
- [x] T001 Review and confirm `next-intl` and `i18n` module setup in `apps/frontend`.
- [x] T002 Review and confirm `messages` JSON files structure and content in `apps/frontend/messages`.

## Phase 3.2: Research (Resolve Unknowns & Best Practices)
- [x] T003 Research and define specific performance goals for the language refactor.
- [x] T004 Research and define the expected scale and scope of the language refactor.
- [x] T005 Research best practices for using `next-intl` in a Next.js 14 App Router environment.
- [x] T006 Research best practices for implementing localization in a NestJS backend.
- [x] T007 Research Prisma and MariaDB localization strategies.

## Phase 3.3: Data Model & Contracts First (TDD) ⚠️ MUST COMPLETE BEFORE 3.4
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T008 [P] Implement `Locale` entity in `packages/shared/src/schemas/locale.ts` (Zod schema) and Prisma schema.
- [x] T009 [P] Implement `Message` entity in `packages/shared/src/schemas/message.ts` (Zod schema) and Prisma schema.
- [x] T010 [P] Implement `UserPreference` entity in `packages/shared/src/schemas/user-preference.ts` (Zod schema) and Prisma schema.
- [x] T011 [P] Write contract test for `GET /messages/{locale}` endpoint (200 OK for valid locale).
- [x] T012 [P] Write contract test for `GET /messages/{locale}` endpoint (404 Not Found for invalid locale).
- [x] T013 [P] Write E2E test for frontend language switching scenario (from quickstart.md).
- [x] T014 [P] Write E2E test for backend localized API responses scenario (from quickstart.md).
- [x] T015 [P] Write unit/integration test to verify no hardcoded strings in a sample frontend component (from quickstart.md).

## Phase 3.4: Core Implementation (ONLY after tests are failing)
- [x] T016 Create backend API endpoint `/messages/{locale}` in `apps/backend/src/app.controller.ts` to serve localized messages.
- [x] T017 Implement service logic for fetching localized messages from the database based on `Locale` and `Message` entities.
- [x] T018 Review and update `apps/frontend/src/app/[locale]/layout.tsx` to correctly handle locale parameters.
- [x] T019 Review and update `apps/frontend/src/app/[locale]/page.tsx` to correctly handle locale parameters and display translated content.
- [x] T020 Refactor `apps/frontend/src/components/agricultural/bottom-navigation.tsx` to use `next-intl` for all user-facing text.
- [x] T021 Refactor `apps/frontend/src/components/agricultural/critical-alerts.tsx` to use `next-intl` for all user-facing text.
- [x] T022 Refactor `apps/frontend/src/components/agricultural/dashboard-header.tsx` to use `next-intl` for all user-facing text.
- [x] T023 Refactor `apps/frontend/src/components/agricultural/dashboard-metrics.tsx` to use `next-intl` for all user-facing text.
- [x] T024 Refactor `apps/frontend/src/components/agricultural/desktop-sidebar.tsx` to use `next-intl` for all user-facing text.
- [x] T025 Refactor `apps/frontend/src/components/agricultural/environmental-metric.tsx` to use `next-intl` for all user-facing text.
- [x] T026 Refactor `apps/frontend/src/components/agricultural/environmental-overview.tsx` to use `next-intl` for all user-facing text.
- [x] T027 Refactor `apps/frontend/src/components/agricultural/language-switcher.tsx` to ensure correct locale updates and re-renders.
- [x] T028 Refactor `apps/frontend/src/components/agricultural/mobile-navigation.tsx` to use `next-intl` for all user-facing text.
- [x] T029 Refactor `apps/frontend/src/components/agricultural/plant-card.tsx` to use `next-intl` for all user-facing text.
- [x] T030 Refactor `apps/frontend/src/components/agricultural/plant-grid.tsx` to use `next-intl` for all user-facing text.
- [x] T031 Refactor `apps/frontend/src/components/agricultural/plant-status-indicator.tsx` to use `next-intl` for all user-facing text.
- [x] T032 Refactor `apps/frontend/src/components/agricultural/plant-status-overview.tsx` to use `next-intl` for all user-facing text.
- [x] T033 Refactor `apps/frontend/src/components/agricultural/quick-actions.tsx` to use `next-intl` for all user-facing text.
- [x] T034 Ensure dynamic content fetched from the backend is localized in frontend components.

## Phase 3.5: Polish
- [x] T035 Update `apps/frontend/src/i18n/routing.ts` and `apps/frontend/src/i18n/navigation.ts` for localized routes.
- [x] T036 Ensure backend validation and error messages are localized.
- [x] T037 Document the chosen Prisma and MariaDB localization strategy.
- [x] T038 Update `GEMINI.md` with any new technologies or patterns introduced.

## Dependencies
- T001, T002 must be completed before any other tasks.
- T003-T007 (Research) should ideally be completed before T008-T034 (Implementation), but can run in parallel with some setup.
- T008-T010 (Data Model) must be completed before T016-T017 (API Implementation).
- T011-T015 (Tests) must be completed and failing before T016-T034 (Core Implementation).
- T016-T017 (API Implementation) must be completed before T034 (Frontend dynamic content localization).
- T018-T034 (Frontend Refactor) can be done in parallel where files are independent.
- T035-T038 (Polish) should be done after core implementation.

## Parallel Example
```
# Launch T008-T010 (Data Model) and T011-T015 (Tests) together:
Task: "Implement `Locale` entity in `packages/shared/src/schemas/locale.ts` (Zod schema) and Prisma schema."
Task: "Implement `Message` entity in `packages/shared/src/schemas/message.ts` (Zod schema) and Prisma schema."
Task: "Implement `UserPreference` entity in `packages/shared/src/schemas/user-preference.ts` (Zod schema) and Prisma schema."
Task: "Write contract test for `GET /messages/{locale}` endpoint (200 OK for valid locale)."
Task: "Write contract test for `GET /messages/{locale}` endpoint (404 Not Found for invalid locale)."
Task: "Write E2E test for frontend language switching scenario."
Task: "Write E2E test for backend localized API responses scenario."
Task: "Write unit/integration test to verify no hardcoded strings in a sample frontend component."

# Launch T020-T033 (Frontend Component Refactor) in parallel after T018 and T019:
Task: "Refactor `apps/frontend/src/components/agricultural/bottom-navigation.tsx` to use `next-intl` for all user-facing text."
Task: "Refactor `apps/frontend/src/components/agricultural/critical-alerts.tsx` to use `next-intl` for all user-facing text."
... (and so on for all frontend components)
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
   
2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks
   
3. **From User Stories** (Acceptance Criteria/Quickstart Scenarios):
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Research → Tests → Models → Services → Endpoints → Frontend Refactor → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task
