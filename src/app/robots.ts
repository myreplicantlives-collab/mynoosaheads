// src/app/robots.ts
// Robots.txt for mynoosaheads.com. Allows indexing on production;
// disallows /api/, /styleguide, /_next/. Sitemap declared for crawlers.

import type { MetadataRoute } from "next";

// MSN-2964: respect NEXT_PUBLIC_SITE_URL so canonical URLs and the
// declared sitemap host stay in sync with the deployed hostname.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://mynoosaheads.twainent.workers.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep crawlers out of internal scaffolding + the Sentry test
        // endpoint (returns 500 by design; not useful to index).
        disallow: ["/api/", "/styleguide", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
