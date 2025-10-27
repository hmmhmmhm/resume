# @repo/sitemap-generator

A flexible sitemap generator package for generating XML sitemaps with multi-language support.

## Features

- Generate sitemap XML with configurable routes
- Support for multi-language alternate links
- Sitemap index generation for large sites (>50,000 URLs)
- Configurable static and dynamic page sources
- Type-safe API

## Usage

```typescript
import { createSitemapGenerator } from '@repo/sitemap-generator';

const generator = createSitemapGenerator({
  languages: ['en', 'ko'],
  defaultLanguage: 'en',
  routes: [
    { path: '', changefreq: 'daily', priority: 1.0 },
    { path: '/about', changefreq: 'monthly', priority: 0.8 },
  ],
  getDynamicPages: async (siteUrl, languages) => {
    // Fetch dynamic pages from database/CMS
    return [];
  },
});

// In your API route
const siteUrl = 'https://example.com';
const pages = await generator.getAllPages(siteUrl);
const xml = generator.generateSitemapXML(pages);
```

## API

### `createSitemapGenerator(config)`

Creates a sitemap generator instance with the provided configuration.

#### Configuration Options

- `languages`: Array of supported language codes
- `defaultLanguage`: Default language for x-default alternate links
- `routes`: Array of static route configurations
- `getDynamicPages`: Optional async function to fetch dynamic pages

### Types

See `types.ts` for full type definitions.
