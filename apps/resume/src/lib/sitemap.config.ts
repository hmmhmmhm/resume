import { createSitemapGenerator } from "@repo/sitemap-generator";
import type { SitemapURL } from "@repo/sitemap-generator";

/**
 * Fetch dynamic pages (example: future database integration)
 *
 * @example
 * // Example using Cloudflare D1
 * async function getDynamicPages(siteUrl: string, languages: string[]): Promise<SitemapURL[]> {
 *   const db = getDatabase(); // Get your database instance
 *   const result = await db.prepare(
 *     'SELECT slug, updated_at FROM pages WHERE published = 1'
 *   ).all();
 *
 *   return result.results.flatMap(row =>
 *     languages.map(lang => ({
 *       loc: `${siteUrl}/${lang}/${row.slug}`,
 *       lastmod: row.updated_at,
 *       changefreq: 'weekly' as const,
 *       priority: 0.8,
 *     }))
 *   );
 * }
 */
async function getDynamicPages(siteUrl: string, languages: string[]): Promise<SitemapURL[]> {
  // TODO: Fetch dynamic pages from database or CMS in the future
  return [];
}

/**
 * Sitemap generator instance configured for this wiki
 */
export const sitemapGenerator = createSitemapGenerator({
  languages: ["en", "ko"],
  defaultLanguage: "en",
  routes: [
    { path: "", changefreq: "daily", priority: 1.0 },
    { path: "/short-url", changefreq: "monthly", priority: 0.7 },
    { path: "/logo", changefreq: "yearly", priority: 0.5 },
    { path: "/privacy", changefreq: "yearly", priority: 0.3 },
    { path: "/terms", changefreq: "yearly", priority: 0.3 },
    { path: "/sitemap", changefreq: "weekly", priority: 0.3 },
  ],
  getDynamicPages,
});
