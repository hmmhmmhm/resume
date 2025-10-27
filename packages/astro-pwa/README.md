# @repo/astro-pwa

Shared PWA utilities and integrations for Astro projects in the monorepo.

## Features

- **Service Worker Generation**: Astro integration that generates service workers with i18n support
- **Vite Plugin**: Exclude specific files from the public directory in build output
- **Service Worker Template**: Customizable service worker template with offline support

## Usage

### Astro Integration

```typescript
import { generateServiceWorker } from "@repo/astro-pwa/integration";

export default defineConfig({
  integrations: [generateServiceWorker()],
});
```

The integration uses the built-in service worker template by default. You can customize paths if needed:

```typescript
generateServiceWorker({
  i18nConfigPath: "src/i18n/languages.ts", // default
  templatePath: "custom/path/sw.template.js", // optional, uses package template by default
  outputPath: "public/sw.js", // default
})
```

### Vite Plugin

```typescript
import { excludePublicFiles } from "@repo/astro-pwa/vite-plugin";

export default defineConfig({
  vite: {
    plugins: [excludePublicFiles(["sw.template.js"])],
  },
});
```

## Dependencies

- `@vite-pwa/astro`: PWA support for Astro
- `workbox-window`: Workbox window module for service worker registration
