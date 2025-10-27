/**
 * Sitemap URL entry
 */
export interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  alternates?: Array<{ lang: string; href: string }>;
}

/**
 * Route configuration for static pages
 */
export interface RouteConfig {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

/**
 * Sitemap generator configuration
 */
export interface SitemapGeneratorConfig {
  /**
   * List of supported language codes (e.g., ['en', 'ko'])
   */
  languages: string[];

  /**
   * Default language for x-default alternate links
   */
  defaultLanguage: string;

  /**
   * Static routes to include in the sitemap
   */
  routes: RouteConfig[];

  /**
   * Optional function to fetch dynamic pages
   * @param siteUrl - The base URL of the site
   * @param languages - The list of supported languages
   * @returns Promise resolving to an array of sitemap URLs
   */
  getDynamicPages?: (siteUrl: string, languages: string[]) => Promise<SitemapURL[]>;
}

/**
 * Sitemap generator instance
 */
export interface SitemapGenerator {
  /**
   * Get all pages (static + dynamic)
   */
  getAllPages(siteUrl: string): Promise<SitemapURL[]>;

  /**
   * Generate sitemap XML from URLs
   */
  generateSitemapXML(urls: SitemapURL[]): string;

  /**
   * Generate sitemap index XML
   */
  generateSitemapIndexXML(siteUrl: string, sitemapCount: number): string;

  /**
   * Extract site URL from request
   */
  getSiteURL(request: Request): string;
}
