import type { APIRoute } from "astro";
import { MAX_URLS_PER_SITEMAP } from "@repo/sitemap-generator";
import { sitemapGenerator } from "@/lib/sitemap.config";

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const index = parseInt(params.index || "1", 10);

    if (isNaN(index) || index < 1) {
      return new Response("Invalid sitemap index", { status: 400 });
    }

    const siteUrl = sitemapGenerator.getSiteURL(request);
    const allPages = await sitemapGenerator.getAllPages(siteUrl);
    const sitemapCount = Math.ceil(allPages.length / MAX_URLS_PER_SITEMAP);

    if (index > sitemapCount) {
      return new Response("Sitemap not found", { status: 404 });
    }

    // Extract pages for the specified index only
    const startIdx = (index - 1) * MAX_URLS_PER_SITEMAP;
    const endIdx = startIdx + MAX_URLS_PER_SITEMAP;
    const pageChunk = allPages.slice(startIdx, endIdx);

    const xml = sitemapGenerator.generateSitemapXML(pageChunk);

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
