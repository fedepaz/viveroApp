## Generalized Workflow for Checking a Page (`http://localhost:3000/{locale}/{page_path}`)

This workflow outlines the steps to identify and resolve `MISSING_MESSAGE` translation errors on any given page within the application.

1.  **Synchronize and Translate Missing Keys (if necessary):**
    *   **Action:** Read the content of the corresponding `en.json` file. For each key present in `en.json` but missing from the `{locale}.json` file, add that key and its **translated value** to the `{locale}.json` file. Ensure the structure matches the `useTranslations()` call (e.g., flat keys if `useTranslations()` is used without a namespace, or nested if a namespace is provided).
    *   **Purpose:** To proactively ensure all expected keys are present in the `{locale}.json` file with their translated values, preventing `MISSING_MESSAGE` errors.

2.  **Navigate to the Target Page:**
    *   **Action:** Use `navigate_page` to go to `http://localhost:3000/{locale}/{page_path}` with a 120-second timeout.
    *   **Purpose:** To load the page in the browser context and allow the application to render.

3.  **Wait for Page Content to Render:**
    *   **Action:** After successful navigation, use `wait_for` to wait for a key piece of text (e.g., the page title or a prominent heading) to appear on the page, with an additional timeout of 20 seconds.
    *   **Purpose:** To ensure the page has sufficiently rendered and become interactive before checking for errors. This helps mitigate issues with client-side rendering delays.

4.  **Check Console Messages for `MISSING_MESSAGE` Errors:**
    *   **Action:** Use `list_console_messages` to retrieve all messages logged to the browser's console.
    *   **Purpose:** To identify any `MISSING_MESSAGE` errors, which indicate missing translation keys.

5.  **Analyze `MISSING_MESSAGE` Errors (if any):**
    *   **Action:** If `MISSING_MESSAGE` errors are found, extract the missing key (e.g., `key_name`) and the component path from the error stack trace (e.g., `src/features/{feature_name}/components/{component_name}.tsx`). Also note the namespace being used (e.g., `useTranslations("Namespace")`).
    *   **Purpose:** To pinpoint the exact translation key and the component responsible for the lookup.

6.  **Locate Component-Specific Message File:**
    *   **Action:** Based on the component path and the namespace, construct the expected path for a component-specific `messages` directory (e.g., `src/features/{feature_name}/components/{ComponentFolder}/messages/`).
    *   **Action:** Use `list_directory` to check if this `messages` directory exists.
    *   **Purpose:** To adhere to the strategy of checking component-specific translation files first.

7.  **Identify Locale-Specific Translation File:**
    *   **Action:** If the `messages` directory exists, use `list_directory` to check for the locale-specific file (e.g., `{locale}.json`) within it.
    *   **Purpose:** To find the exact file where the missing translation key should reside.

8.  **Read and Verify Translation File Content:**
    *   **Action:** Use `read_file` to read the content of the identified `{locale}.json` file (e.g., `apps/frontend/src/features/{feature_name}/components/{ComponentFolder}/messages/{locale}.json`).
    *   **Purpose:** To confirm if the missing keys are indeed absent or incorrectly structured within the file.

9.  **Synchronize and Translate Missing Keys (if necessary):**
    *   **Action:** Read the content of the corresponding `en.json` file. For each key present in `en.json` but missing from the `{locale}.json` file, add that key and its **translated value** to the `{locale}.json` file. Ensure the structure matches the `useTranslations()` call (e.g., flat keys if `useTranslations()` is used without a namespace, or nested if a namespace is provided).
    *   **Purpose:** To proactively ensure all expected keys are present in the `{locale}.json` file with their translated values, preventing `MISSING_MESSAGE` errors.


10.  **Force Application Refresh:**
    *   **Action:** Navigate to `about:blank` using `navigate_page`.
    *   **Action:** Then, navigate back to the target page (`http://localhost:3000/{locale}/{page_path}`) using `navigate_page` with a 120-second timeout.
    *   **Purpose:** To force the application to re-evaluate its modules and pick up the changes made to the translation files, mitigating caching/hot-reloading issues.

11. **Re-Verify Console Messages:**
    *   **Action:** After the forced refresh, use `list_console_messages` again.
    *   **Purpose:** To confirm that all `MISSING_MESSAGE` errors are resolved.
