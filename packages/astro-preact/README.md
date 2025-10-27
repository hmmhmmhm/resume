# @repo/astro-preact

Shared Preact/React integration wrapper for Astro projects in the monorepo.

## Features

- Provides a consistent Preact integration with React compatibility mode enabled
- Centralizes integration configuration across all apps

## Usage

In your Astro config:

```js
import { preactIntegration } from "@repo/astro-preact/integration";

export default defineConfig({
  integrations: [preactIntegration()],
});
```

## Note

Apps using this package still need to install the required dependencies:
- `@astrojs/preact`
- `preact`
- `react` & `react-dom`
- `@types/react` & `@types/react-dom`

This package provides a shared integration wrapper to ensure consistent configuration across the monorepo.
