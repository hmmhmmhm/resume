# @repo/astro-i18n

Shared i18n utilities for Astro projects in the monorepo.

## Usage

### 1. Install the package in your project

```json
{
  "dependencies": {
    "@repo/astro-i18n": "workspace:*"
  }
}
```

### 2. Create language configuration

Create an `i18n` folder in your project with:
- Language JSON files (e.g., `en.json`, `ko.json`)
- A `languages.ts` file to specify supported languages

Example `languages.ts`:

```typescript
export const supportedLanguages = ["en", "ko"] as const;
export const defaultLanguage = "en";
```

### 3. Use in your Astro components

```astro
---
import { initI18n } from "@repo/astro-i18n/astro";

const { language, t } = initI18n(Astro);
---

<h1>{t("common.title")}</h1>
```

## Exports

- `@repo/astro-i18n/config` - Core i18n configuration and instance creation
- `@repo/astro-i18n/utils` - Utility functions (language detection, etc.)
- `@repo/astro-i18n/helpers` - Helper functions for extracting translations
- `@repo/astro-i18n/astro` - Astro-specific initialization function
