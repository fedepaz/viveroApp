## Generalized Workflow for Checking a Page (`http://localhost:3000/{locale}/{page_path}`)

This workflow outlines the steps to identify and resolve `MISSING_MESSAGE` translation errors on any given page within the application.

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

## 6. Navigate to the Target Page:**
    *   **Action:** Use `navigate_page` to go to `http://localhost:3000/{locale}/{page_path}` with a 120-second timeout.
    *   **Purpose:** To load the page in the browser context and allow the application to render.

## 7. Wait for Page Content to Render:**
    *   **Action:** After successful navigation, use `wait_for` to wait for a key piece of text (e.g., the page title or a prominent heading) to appear on the page, with an additional timeout of 20 seconds.
    *   **Purpose:** To ensure the page has sufficiently rendered and become interactive before checking for errors. This helps mitigate issues with client-side rendering delays.

## 8. Check Console Messages for `MISSING_MESSAGE` Errors:**
    *   **Action:** Use `list_console_messages` to retrieve all messages logged to the browser's console.
    *   **Purpose:** To identify any `MISSING_MESSAGE` errors, which indicate missing translation keys.

## 9. Analyze `MISSING_MESSAGE` Errors (if any):**
    *   **Action:** If `MISSING_MESSAGE` errors are found, extract the missing key (e.g., `key_name`) and the component path from the error stack trace (e.g., `src/features/{feature_name}/components/{component_name}.tsx`). Also note the namespace being used (e.g., `useTranslations("Namespace")`).
    *   **Purpose:** To pinpoint the exact translation key and the component responsible for the lookup.

## 10. Locate Component-Specific Message File:**
    *   **Action:** Based on the component path and the namespace, construct the expected path for a component-specific `messages` directory (e.g., `src/features/{feature_name}/components/{ComponentFolder}/messages/`).
    *   **Action:** Use `list_directory` to check if this `messages` directory exists.
    *   **Purpose:** To adhere to the strategy of checking component-specific translation files first.

## 11. Identify Locale-Specific Translation File:**
    *   **Action:** If the `messages` directory exists, use `list_directory` to check for the locale-specific file (e.g., `{locale}.json`) within it.
    *   **Purpose:** To find the exact file where the missing translation key should reside.

## 12. Read and Verify Translation File Content:**
    *   **Action:** Use `read_file` to read the content of the identified `{locale}.json` file (e.g., `apps/frontend/src/features/{feature_name}/components/{ComponentFolder}/messages/{locale}.json`).
    *   **Purpose:** To confirm if the missing keys are indeed absent or incorrectly structured within the file.

## 13. Synchronize and Translate Missing Keys (if necessary):**
    *   **Action:** Read the content of the corresponding `en.json` file. For each key present in `en.json` but missing from the `{locale}.json` file, add that key and its **translated value** to the `{locale}.json` file. Ensure the structure matches the `useTranslations()` call (e.g., flat keys if `useTranslations()` is used without a namespace, or nested if a namespace is provided).
    *   **Purpose:** To proactively ensure all expected keys are present in the `{locale}.json` file with their translated values, preventing `MISSING_MESSAGE` errors.


## 14. Force Application Refresh:**
    *   **Action:** Navigate to `about:blank` using `navigate_page`.
    *   **Action:** Then, navigate back to the target page (`http://localhost:3000/{locale}/{page_path}`) using `navigate_page` with a 120-second timeout.
    *   **Purpose:** To force the application to re-evaluate its modules and pick up the changes made to the translation files, mitigating caching/hot-reloading issues.

## 15. Re-Verify Console Messages:**
    *   **Action:** After the forced refresh, use `list_console_messages` again.
    *   **Purpose:** To confirm that all `MISSING_MESSAGE` errors are resolved.
