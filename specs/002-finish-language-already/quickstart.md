# Quickstart Guide: Finish Language Refactor

This guide outlines key scenarios to quickly verify the functionality of the language refactor.

## 1. Frontend Language Switching

**Scenario**: Verify that the frontend correctly switches language and displays translated content.

**Steps**:
1.  Navigate to the application's homepage.
2.  Locate and interact with the language switcher component (e.g., a dropdown or buttons for "English", "Español", "Italiano").
3.  Select a different language (e.g., "Español").
4.  **Expected Result**: All visible user-facing text on the page (e.g., navigation labels, button texts, dashboard titles) should immediately update to the selected language without a full page reload.
5.  Repeat for other supported languages.

## 2. Backend Localized API Responses

**Scenario**: Verify that backend API endpoints return localized data based on the requested locale.

**Steps**:
1.  Using a tool like Postman or `curl`, make a GET request to the `/messages/{locale}` endpoint (e.g., `GET /api/messages/es`).
2.  **Expected Result**: The response status code should be 200 OK. The response body should be a JSON object containing key-value pairs of messages translated into Spanish.
3.  Repeat the request with a different locale (e.g., `GET /api/messages/en`).
4.  **Expected Result**: The response should contain messages translated into English.
5.  Make a GET request to an unsupported locale (e.g., `GET /api/messages/xx`).
6.  **Expected Result**: The response status code should be 404 Not Found.

## 3. No Hardcoded Strings in Frontend

**Scenario**: Verify that frontend components do not contain hardcoded strings.

**Steps**:
1.  Inspect the source code of various frontend components (e.g., `apps/frontend/src/components/agricultural/plant-card.tsx`).
2.  **Expected Result**: All user-facing strings should be retrieved using `useTranslations` or `getTranslations` hooks/functions, referencing keys from message files, rather than being directly embedded in the JSX.

## 4. New Feature Adherence to i18n Patterns

**Scenario**: Verify that any newly developed features correctly implement i18n patterns.

**Steps**:
1.  (This step requires a new feature to be developed after the refactor).
2.  Develop a small new feature (e.g., a new button with a label).
3.  **Expected Result**: The new feature's UI text should be localized using the `next-intl` framework, and its corresponding message keys should be present in the `messages/[locale].json` files.
