import type { APIRoute } from "astro";
import { sitemapGenerator } from "@/lib/sitemap.config";

export const GET: APIRoute = ({ request }) => {
  const siteUrl = sitemapGenerator.getSiteURL(request);

  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400", // 24 hour cache
    },
  });
};
