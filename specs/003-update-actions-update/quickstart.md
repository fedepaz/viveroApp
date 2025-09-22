# Quickstart: CI/CD Workflows

This document provides a guide to using the new CI/CD workflows for the Agricultural SaaS Platform.

## 1. Linting and Unit Testing

-   **Workflow File**: `.github/workflows/lint-test.yml`
-   **Trigger**: A new pull request or a push to a development branch (`frontendDev` or `backendDev`).
-   **Action**: This workflow automatically lints the code and runs unit tests for the frontend and backend applications.

## 2. Building Artifacts

-   **Workflow File**: `.github/workflows/build-artifacts.yml`
-   **Trigger**: A new pull request to the `frontendDev` branch.
-   **Action**: This workflow builds the Next.js frontend and NestJS backend applications and stores the build artifacts.

## 3. Production Deployment

-   **Workflow File**: `.github/workflows/deploy-production.yml`
-   **Trigger**: A push to the `main` branch.
-   **Action**: This workflow deploys the frontend to Vercel and the backend to Render.

## 4. End-to-End Testing

-   **Workflow File**: `.github/workflows/e2e-tests.yml`
-   **Trigger**: A successful deployment to the staging environment.
-   **Action**: This workflow runs end-to-end tests using Playwright.

## 5. Post-Deployment Verification

-   **Workflow File**: `.github/workflows/post-deploy.yml`
-   **Trigger**: A successful deployment to the production environment.
-   **Action**: This workflow performs smoke tests and sets up monitoring alerts.

## 6. Scheduled Maintenance

-   **Workflow File**: `.github/workflows/scheduled-maintenance.yml`
-   **Trigger**: A scheduled cron job.
-   **Action**: This workflow performs daily security scans and weekly dependency updates.
