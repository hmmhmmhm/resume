# @repo/astro-tailwind

Shared Tailwind CSS configuration and dependencies for Astro projects in the monorepo.

## Usage

### In your app's `package.json`

```json
{
  "dependencies": {
    "@repo/astro-tailwind": "workspace:*"
  }
}
```

### In your app's `tailwind.config.js`

```js
export { default } from "@repo/astro-tailwind/tailwind-config";
```

Or extend the base configuration:

```js
import baseConfig from "@repo/astro-tailwind/tailwind-config";

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  // Add your custom configuration here
};
```

## Included Dependencies

- `@astrojs/tailwind`
- `@tailwindcss/postcss`
- `@tailwindcss/vite`
- `tailwindcss`
- `postcss`
- `tailwindcss-safe-area`
