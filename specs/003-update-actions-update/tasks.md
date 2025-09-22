# Tasks: Update Actions and Agent Definitions

This document outlines the tasks required to update the `GEMINI.md` file and create the new CI/CD workflows.

## Phase 1: Update `GEMINI.md`

1.  **[P]** Add a new section to `GEMINI.md` titled "Agent Roles".
2.  **[P]** For each agent, add a brief description of its role and a link to its full guide in the `docs/agents` directory.

## Phase 2: Create CI/CD Workflows

1.  **[P]** Create the `.github/workflows/lint-test.yml` file.
2.  **[P]** Create the `.github/workflows/build-artifacts.yml` file.
3.  **[P]** Create the `.github/workflows/deploy-production.yml` file.
4.  **[P]** Create the `.github/workflows/e2e-tests.yml` file.
5.  **[P]** Create the `.github/workflows/post-deploy.yml` file.
6.  **[P]** Create the `.github/workflows/scheduled-maintenance.yml` file.

## Phase 3: Documentation

1.  **[P]** Update the `README.md` file to include a reference to the new CI/CD workflows.
