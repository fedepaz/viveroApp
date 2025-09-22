# Research: Update Actions and Agent Definitions

## 1. Analysis of `GEMINI.md`

The current `GEMINI.md` file serves as a high-level constitution for AI agents. It defines the purpose, core reference documents, rules of engagement, development standards, and agent behavior. It does not, however, provide specific details about the roles of individual agents. The update will require adding a new section that outlines the responsibilities of each agent.

## 2. Agent Roles and Responsibilities

Based on the analysis of the `docs/agents/*.md` files, the following agent roles have been identified:

*   **`agricultural-ux-ui-designer`**: Designs the user experience and user interface for the agricultural enterprise management system.
*   **`cicd-pipeline-engineer`**: Creates and manages the CI/CD pipelines for automated testing, building, and deployment.
*   **`plant-management-devops-engineer`**: Handles the infrastructure and deployment of the multi-tenant SaaS platform.
*   **`agricultural-frontend-specialist`**: Implements the frontend of the application using React, Next.js, and other related technologies.
*   **`agricultural-product-manager`**: Defines the product vision, features, and requirements for the agricultural enterprise management system.
*   **`solo-developer-roadmap`**: Outlines a realistic development timeline for a solo developer building the enterprise plant management system.
*   **`tdd-cicd-guide`**: Provides guidance on Test-Driven Development (TDD) and Continuous Integration/Continuous Deployment (CI/CD) practices.
*   **`tech-stack-guide`**: Defines the approved technology stack for the project.

## 3. CI/CD Workflow Definitions

The `docs/agents/cicd_agent.md` file provides a comprehensive guide for setting up the CI/CD pipelines. It includes the following workflow definitions:

*   **`lint-test.yml`**: Lints and runs unit tests on every pull request and push to development branches.
*   **`build-artifacts.yml`**: Builds the frontend and backend applications and stores the artifacts.
*   **`deploy-production.yml`**: Deploys the application to the production environment on Vercel and Render.
*   **`e2e-tests.yml`**: Runs end-to-end tests on the staging environment.
*   **`post-deploy.yml`**: Performs post-deployment verification and monitoring setup.
*   **`scheduled-maintenance.yml`**: Runs scheduled tasks for security scanning and dependency updates.

## 4. Plan for Artifact Generation

1.  **`GEMINI.md` Update**: I will add a new section to `GEMINI.md` titled "Agent Roles" that will provide a brief description of each agent's responsibilities, with a link to the full agent guide in the `docs/agents` directory.
2.  **CI/CD Workflow Creation**: I will create the following new files in the `.github/workflows` directory, based on the definitions in `docs/agents/cicd_agent.md`:
    *   `lint-test.yml`
    *   `build-artifacts.yml`
    *   `deploy-production.yml`
    *   `e2e-tests.yml`
    *   `post-deploy.yml`
    *   `scheduled-maintenance.yml`
3.  **`data-model.md`**: No new data models are required for this feature.
4.  **`contracts/`**: No new API contracts are required for this feature.
5.  **`quickstart.md`**: I will create a `quickstart.md` file that explains how to use the new CI/CD workflows.
6.  **`tasks.md`**: I will create a `tasks.md` file that outlines the tasks required to implement the changes.
