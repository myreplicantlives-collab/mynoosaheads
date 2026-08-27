// src/app/robots.ts
// Robots.txt for mynoosaheads.com. Allows indexing on production;
// disallows /api/, /styleguide, /_next/. Sitemap declared for crawlers.

import type { MetadataRoute } from "next";

const SITE_URL = "https://noosa-site-v2.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/styleguide", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
