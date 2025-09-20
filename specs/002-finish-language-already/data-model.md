# Data Model: Finish Language Refactor

## 1. Locale

Represents the active language and region settings for the application.

-   **Name**: `Locale`
-   **Description**: Defines the language and optional region for internationalization.
-   **Fields**:
    -   `code`: `string` (e.g., "en", "es", "it") - Primary key, unique identifier for the locale.
    -   `name`: `string` (e.g., "English", "Español", "Italiano") - Display name of the locale.
    -   `is_active`: `boolean` - Indicates if the locale is currently enabled in the application.
-   **Relationships**:
    -   One-to-many with `Message` (a locale can have many messages).
    -   One-to-many with `UserPreference` (a locale can be preferred by many users).

## 2. Message

Represents a translatable string in the application.

-   **Name**: `Message`
-   **Description**: Stores key-value pairs for translated content.
-   **Fields**:
    -   `id`: `string` (e.g., "common.greeting", "dashboard.title") - Primary key, unique identifier for the message key.
    -   `locale_code`: `string` - Foreign key referencing `Locale.code`.
    -   `value`: `string` - The translated string for the given key and locale.
-   **Relationships**:
    -   Many-to-one with `Locale`.

## 3. UserPreference

Represents a user's personalized settings, including their preferred locale.

-   **Name**: `UserPreference`
-   **Description**: Stores user-specific settings.
-   **Fields**:
    -   `user_id`: `string` - Primary key, foreign key referencing a User entity (assuming a User entity exists elsewhere).
    -   `preferred_locale_code`: `string` - Foreign key referencing `Locale.code`.
-   **Relationships**:
    -   Many-to-one with `Locale`.
    -   One-to-one with `User` (assuming a User entity exists elsewhere).
