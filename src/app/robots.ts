import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/health.json"],
      },
      // Explicitly allow common AI crawlers with attribution policy
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/", "/health.json"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/api/", "/health.json"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/", "/health.json"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/api/", "/health.json"] },
    ],
    sitemap: `${SITE.productionUrl}/sitemap.xml`,
    host: SITE.productionUrl,
  };
}