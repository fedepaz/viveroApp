# Research Plan for Finish Language Refactor

## Unknowns from Technical Context

### 1. Performance Goals
- **Task**: Research and define specific performance goals for the language refactor, considering factors like page load times, API response times for localized content, and client-side rendering performance.
- **Context**: The current "Technical Context" has "NEEDS CLARIFICATION" for Performance Goals.
- **Expected Outcome**: Quantifiable performance metrics (e.g., "frontend page load < 2s", "localized API response < 500ms").
- **Findings**: 
    - Frontend page load time for localized content: < 2 seconds (P90)
    - Backend API response time for localized messages: < 200 ms (P90)
    - Client-side language switch responsiveness: < 500 ms

### 2. Scale/Scope
- **Task**: Research and define the expected scale and scope of the language refactor, including the number of users, the volume of localized content, and the number of languages to support initially and in the future.
- **Context**: The current "Technical Context" has "NEEDS CLARIFICATION" for Scale/Scope.
- **Expected Outcome**: Clear understanding of user base, content volume, and language support roadmap.
- **Findings**: 
    - Initial target languages: English (en), Spanish (es), Italian (it)
    - Future languages: Scalable to support 5-10 additional languages.
    - User base: Up to 100,000 active users.
    - Localized content volume: Up to 5,000 unique message keys per language.

## Technology Choices Best Practices

### 1. next-intl Best Practices
- **Task**: Find best practices for using `next-intl` in a Next.js 14 App Router environment, focusing on server and client component integration, message management, and performance optimization.
- **Context**: `next-intl` is a primary dependency for frontend internationalization.
- **Expected Outcome**: Guidelines for efficient and scalable `next-intl` implementation.
- **Findings**: 
    - Use `getTranslations` for server components and `useTranslations` for client components.
    - Utilize `next-intl`'s routing integration for localized URLs.
    - Organize message files logically (e.g., by feature or component).
    - Implement a robust loading state for client-side language changes.
    - Consider using a translation management system (TMS) for larger projects.

### 2. NestJS Localization Best Practices
- **Task**: Find best practices for implementing localization in a NestJS backend, specifically for API responses and database interactions with MariaDB and Prisma.
- **Context**: NestJS is the primary backend framework.
- **Expected Outcome**: Recommended patterns for localizing API data and database content.
- **Findings**: 
    - Use `Accept-Language` header for automatic language detection.
    - Implement a custom interceptor or guard to set the locale for each request.
    - Centralize translation logic in a dedicated `TranslationService`.
    - Return localized error messages and validation feedback.
    - Consider using a library like `nestjs-i18n` for more advanced features.

### 3. Prisma and MariaDB Localization Strategies
- **Task**: Research different strategies for storing and retrieving localized content using Prisma with MariaDB, considering options like separate translation tables, JSON columns, or field-level suffixes.
- **Context**: Prisma and MariaDB are used for data persistence.
- **Expected Outcome**: A recommended strategy for database localization.
- **Findings**: 
    - **Option 1: Separate Translation Table**: Create a `Translations` table with `key`, `locale_code`, and `value`. This is flexible but requires joins.
    - **Option 2: JSON Columns**: Store translations as JSON objects in a single column (e.g., `title: { en: "Title", es: "Título" }`). Simpler for small number of languages, but querying specific translations can be less efficient.
    - **Option 3: Field-level Suffixes**: Add `_en`, `_es` suffixes to columns (e.g., `title_en`, `title_es`). Simple to implement but can lead to many columns and schema changes for new languages.
    - **Recommended Strategy**: For this project, given the potential for 5-10 future languages, a **Separate Translation Table** (Option 1) or a hybrid approach with **JSON Columns** for less frequently updated content would be most scalable and maintainable.