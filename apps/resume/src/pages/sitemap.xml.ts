import type { APIRoute } from "astro";
import { MAX_URLS_PER_SITEMAP } from "@repo/sitemap-generator";
import { sitemapGenerator } from "@/lib/sitemap.config";

export const GET: APIRoute = async ({ request }) => {
  try {
    const siteUrl = sitemapGenerator.getSiteURL(request);
    const allPages = await sitemapGenerator.getAllPages(siteUrl);

    // Split into sitemap index if URL count exceeds limit
    if (allPages.length > MAX_URLS_PER_SITEMAP) {
      const sitemapCount = Math.ceil(allPages.length / MAX_URLS_PER_SITEMAP);
      const xml = sitemapGenerator.generateSitemapIndexXML(siteUrl, sitemapCount);

      return new Response(xml, {
        status: 200,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600", // 1 hour cache
        },
      });
    }

    // Generate single sitemap
    const xml = sitemapGenerator.generateSitemapXML(allPages);

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600", // 1 hour cache
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
