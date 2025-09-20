# Feature Specification: Finish Language Refactor

## 1. Executive Summary

This document outlines the refactoring effort to fully integrate and apply the already implemented language feature across the entire application. The goal is to ensure consistent language support, improve maintainability, and enhance the user experience by providing a seamless multilingual interface.

## 2. Feature Description

The core language switching functionality has been implemented. However, the application requires a comprehensive refactor to ensure that all components, pages, and dynamic content correctly utilize the language feature. This involves updating existing code to fetch and display translated content, and ensuring that new features are built with internationalization (i18n) in mind from the outset. The refactor will focus on applying the language feature consistently throughout the frontend and backend, addressing any areas where language support is currently incomplete or inconsistently applied.

## 3. Business Value

- **Enhanced User Experience:** Provides a fully localized experience for users, increasing satisfaction and accessibility.
- **Market Expansion:** Facilitates easier entry into new linguistic markets by having a robust and scalable language infrastructure.
- **Improved Maintainability:** Centralizes language management, reducing technical debt and simplifying future language additions or updates.
- **Consistency:** Ensures a uniform language experience across all application touchpoints.

## 4. Technical Design

### 4.1. Frontend (Next.js 14 App Router + Tailwind + shadcn/ui + MUI theme)

- **Internationalization Library:** Leverage `next-intl` for client and server components.
- **Message Files:** Ensure all UI strings are extracted into `messages/[locale].json` files.
- **Component Updates:**
    - Review all existing components (`apps/frontend/src/components/`) to identify hardcoded strings and replace them with `useTranslations` or `getTranslations` from `next-intl`.
    - Update `layout.tsx` and `page.tsx` files to correctly handle locale parameters and provide translated content.
    - Ensure dynamic content fetched from the backend is also localized.
- **Routing:** Verify `i18n/routing.ts` and `i18n/navigation.ts` are correctly configured for localized routes.
- **Language Switcher:** Ensure the existing language switcher (`language-switcher.tsx`) correctly updates the locale and triggers re-renders.

### 4.2. Backend (NestJS + Prisma + MariaDB 10.9+)

- **API Endpoints:**
    - Identify API endpoints that return user-facing strings or data that needs localization.
    - Implement mechanisms to return localized data based on the `Accept-Language` header or a locale parameter.
- **Database Schema:**
    - Assess if any database schema changes are required to store multilingual content (e.g., adding `_en`, `_es` suffixes to fields or using a separate translation table).
- **Service Layer:**
    - Update services to retrieve and provide localized data to the frontend.
- **Validation/Error Messages:** Ensure backend validation and error messages are also localized.

## 5. Acceptance Criteria

- [ ] All user-facing text in the frontend is translated based on the selected locale.
- [ ] The language switcher functions correctly, updating the UI language without full page reloads where possible.
- [ ] Backend API responses that contain user-facing text are localized according to the request's locale.
- [ ] No hardcoded strings remain in the frontend components.
- [ ] New features developed after this refactor adhere to the established i18n patterns.
- [ ] Unit and E2E tests cover language switching and localized content display.

## 6. Open Questions / Dependencies

- **Translation Management System:** Is there an existing or preferred TMS for managing translation files? (e.g., Lokalise, Crowdin)
- **Scope of Localization:** Which specific languages are in scope for this refactor?
- **Backend Localization Strategy:** Confirm the preferred approach for localizing backend data (e.g., field-level translations, separate translation tables).
- **Performance Impact:** Assess potential performance implications of fetching and rendering localized content.

## 7. Future Considerations

- **User-specific Language Preferences:** Storing and retrieving user's preferred language settings.
- **Right-to-Left (RTL) Language Support:** If applicable, consider design and implementation for RTL languages.
- **Content Management System (CMS) Integration:** How will localized content be managed if a CMS is introduced?
