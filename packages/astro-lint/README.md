# @repo/astro-lint

Shared ESLint and Prettier configuration for Astro projects in the monorepo.

## Usage

### ESLint

In your `eslint.config.js`:

```js
export { default } from "@repo/astro-lint/eslint-config";
```

### Prettier

In your `package.json`:

```json
{
  "prettier": "@repo/astro-lint/prettier-config"
}
```

Or create a `.prettierrc` file:

```json
"@repo/astro-lint/prettier-config"
```
