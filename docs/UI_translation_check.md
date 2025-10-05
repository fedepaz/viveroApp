# UI Translation Check for {feature} Feature

This document outlines the steps taken to identify and internationalize hardcoded strings within the `{feature}` feature of the frontend application.

## 0. Naming Convention Check (Automated First Step)

- **Objective**: Ensure `useTranslations` namespaces, `messages` folder names, and JSON root keys adhere to the `"{FeatureName}{ComponentName}"` convention for consistency and to prevent conflicts.
- **Action**:
  - For each component being checked:
    - Identify the component's file path and its canonical name (e.g., `ClientForm` for `client-form.tsx`).
    - Identify the feature name (e.g., `Clients` for components in `apps/frontend/src/features/clients/`).
    - Determine the *expected* namespace: `"{FeatureName}{ComponentName}"` (e.g., `ClientsClientForm`, `PlantsColumns`).
    - Read the component's `.tsx` file to find the `useTranslations` call(s).
    - **Check 1: `useTranslations` Namespace:** Compare the namespace used in `useTranslations("ActualNamespace")` with the *expected* namespace.
      - If they don't match, automatically update the `useTranslations` call in the `.tsx` file.
    - **Check 2: `messages` Folder Name:** Check the name of the `messages` subdirectory within the component's folder. Compare it with the *expected* namespace.
      - If they don't match, automatically rename the `messages` subdirectory.
    - **Check 3: JSON Root Key:** Read the `en.json` (or any locale file) within the `messages` folder and compare its root key with the *expected* namespace.
      - If they don't match, automatically update the root key in `en.json`, `es.json`, `it.json`.
- **Outcome**: All components will have their `useTranslations` namespaces, `messages` folder names, and JSON root keys aligned with the `"{FeatureName}{ComponentName}"` convention before further checks proceed.

## 1. Initial Analysis and File Structure Review

- **Objective**: Understand the project's coding and internationalization (i18n) conventions.
- **Action**: Reviewed `GEMINI.md` and `docs/agents/frontend-agent-guide.md` to understand the feature-sliced architecture and the component-scoped translation strategy.
- **Findings**: The project uses `next-intl` for i18n, with translation files (`en.json`, `es.json`, `it.json`) located in a `messages` subdirectory within each component's folder.

## 2. Identification of Hardcoded Strings

- **Objective**: Locate all user-facing strings that were not being translated.
- **Action**: Manually inspected the files in `apps/frontend/src/features/{feature}/components/` (or relevant component paths).
- **Findings**: Identified several hardcoded strings, including component titles, descriptions, labels, and other UI text.

## 3. Internationalization Implementation

- **Objective**: Replace the hardcoded strings with calls to the `useTranslations` hook.
- **Action**:
  - In each of the affected components, imported the `useTranslations` hook from `next-intl`.
  - Replaced each hardcoded string with a `t('key')` function call, where `key` is a unique identifier for that string.

## 4. Translation Key Creation and File Updates

- **Objective**: Add the new translation keys and their corresponding translations to the appropriate JSON files.
- **Action**: Updated the translation files for English (`en`), Spanish (`es`), and Italian (`it`) in `apps/frontend/src/features/{feature}/components/{Component}/messages/` (or relevant component paths).

## 5. Verification

- **Objective**: Ensure that the new translation keys were correctly loaded by the application.
- **Action**: Inspected `apps/frontend/src/i18n/request.ts`.
- **Findings**: Confirmed that the `request.ts` file already included the necessary `import` statements to load the translation files for the feature's components. If not, add the import statements.