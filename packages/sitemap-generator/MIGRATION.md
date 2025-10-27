# Migration Guide

This document explains how to migrate from the old `/apps/wiki/src/lib/sitemap.ts` to the new `@repo/sitemap-generator` package.

## Changes

### Before (Old Implementation)
```typescript
// In /apps/wiki/src/lib/sitemap.ts
import { getAllPages, generateSitemapXML, getSiteURL } from "@/lib/sitemap";

const siteUrl = getSiteURL(request);
const pages = await getAllPages(siteUrl);
const xml = generateSitemapXML(pages);
```

Languages and routes were hardcoded in the sitemap module.

### After (New Implementation)

1. **Create a configuration file** (e.g., `/apps/wiki/src/lib/sitemap.config.ts`):

```typescript
import { createSitemapGenerator } from "@repo/sitemap-generator";

export const sitemapGenerator = createSitemapGenerator({
  languages: ["en", "ko"],
  defaultLanguage: "en",
  routes: [
    { path: "", changefreq: "daily", priority: 1.0 },
    { path: "/privacy", changefreq: "yearly", priority: 0.3 },
  ],
  getDynamicPages: async (siteUrl, languages) => {
    // Fetch dynamic pages from database/CMS
    return [];
  },
});
```

2. **Use the generator in your routes**:

```typescript
import { sitemapGenerator } from "@/lib/sitemap.config";
import { MAX_URLS_PER_SITEMAP } from "@repo/sitemap-generator";

const siteUrl = sitemapGenerator.getSiteURL(request);
const pages = await sitemapGenerator.getAllPages(siteUrl);
const xml = sitemapGenerator.generateSitemapXML(pages);
```

## Benefits

- **Configurable**: Languages and routes are now managed in your project configuration
- **Reusable**: Can be used across multiple projects in the monorepo
- **Type-safe**: Full TypeScript support with exported types
- **Flexible**: Easy to add dynamic pages from databases or CMS

## Type Imports

If you need to import types:

```typescript
import type { SitemapURL, RouteConfig } from "@repo/sitemap-generator";
```
