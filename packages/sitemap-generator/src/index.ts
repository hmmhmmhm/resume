import type {
  SitemapURL,
  SitemapGeneratorConfig,
  SitemapGenerator,
} from "./types";

export * from "./types";

/**
 * Maximum URLs per sitemap (as per sitemap protocol)
 */
export const MAX_URLS_PER_SITEMAP = 50000;

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Create a sitemap generator instance with the provided configuration
 */
export function createSitemapGenerator(
  config: SitemapGeneratorConfig
): SitemapGenerator {
  const { languages, defaultLanguage, routes, getDynamicPages } = config;

  /**
   * Generate static page list based on configuration
   */
  function getStaticPages(siteUrl: string): SitemapURL[] {
    const pages: SitemapURL[] = [];

    for (const route of routes) {
      for (const lang of languages) {
        const loc = `${siteUrl}/${lang}${route.path}`;
        const alternates = languages.map((altLang) => ({
          lang: altLang,
          href: `${siteUrl}/${altLang}${route.path}`,
        }));

        // Add x-default to default language
        alternates.push({
          lang: "x-default",
          href: `${siteUrl}/${defaultLanguage}${route.path}`,
        });

        pages.push({
          loc,
          lastmod: new Date().toISOString(),
          changefreq: route.changefreq,
          priority: route.priority,
          alternates,
        });
      }
    }

    return pages;
  }

  /**
   * Get list of all page URLs
   */
  async function getAllPages(siteUrl: string): Promise<SitemapURL[]> {
    const staticPages = getStaticPages(siteUrl);
    const dynamicPages = getDynamicPages
      ? await getDynamicPages(siteUrl, languages)
      : [];

    // Remove duplicates and sort
    const allPages = [...staticPages, ...dynamicPages];
    const uniquePages = Array.from(
      new Map(allPages.map((page) => [page.loc, page])).values()
    );

    // Sort by lastmod in descending order (newest pages first)
    return uniquePages.sort((a, b) => {
      if (!a.lastmod) return 1;
      if (!b.lastmod) return -1;
      return new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime();
    });
  }

  /**
   * Generate Sitemap XML
   */
  function generateSitemapXML(urls: SitemapURL[]): string {
    const urlElements = urls
      .map((url) => {
        let element = `
  <url>
    <loc>${escapeXml(url.loc)}</loc>`;

        if (url.lastmod) {
          element += `\n    <lastmod>${url.lastmod}</lastmod>`;
        }

        if (url.changefreq) {
          element += `\n    <changefreq>${url.changefreq}</changefreq>`;
        }

        if (url.priority !== undefined) {
          element += `\n    <priority>${url.priority}</priority>`;
        }

        // Add xhtml:link alternate tags
        if (url.alternates && url.alternates.length > 0) {
          for (const alt of url.alternates) {
            element += `\n    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${escapeXml(alt.href)}" />`;
          }
        }

        element += `
  </url>`;
        return element;
      })
      .join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${urlElements}
</urlset>`;
  }

  /**
   * Generate Sitemap Index XML
   */
  function generateSitemapIndexXML(
    siteUrl: string,
    sitemapCount: number
  ): string {
    const sitemapElements = Array.from({ length: sitemapCount }, (_, i) => {
      const index = i + 1;
      return `
  <sitemap>
    <loc>${siteUrl}/sitemap-${index}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
    }).join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapElements}
</sitemapindex>`;
  }

  /**
   * Extract site URL from request
   */
  function getSiteURL(request: Request): string {
    const url = new URL(request.url);
    return `${url.protocol}//${url.host}`;
  }

  return {
    getAllPages,
    generateSitemapXML,
    generateSitemapIndexXML,
    getSiteURL,
  };
}
