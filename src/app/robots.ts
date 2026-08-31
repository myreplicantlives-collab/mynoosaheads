// src/app/robots.ts
// Robots.txt for mynoosaheads.com.
//
// Production (NEXT_PUBLIC_SITE_URL ends with mynoosaheads.com and is not a
// preview host): allows full indexing, declares the production sitemap.
// Non-production (Workers / Pages preview URLs): returns "Disallow: /" so
// search engines never index the dev build. This is the Item 9 dev-site
// protection fix (MSN-3044) — the audit found that the dev deployment
// was inviting indexing via robots.txt "Allow: /".

import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

// In dev/preview we deliberately return a closed robots.txt. The audit
// (MSN-3043) found 11/11 pages emitting meta-robots index,follow with
// no X-Robots-Tag HTTP header and a robots.txt that actively invited
// indexing — so search engines were indexing the preview. We close that
// door at robots.txt so any crawler that ignores meta-robots still sees
// "Disallow: /".
const isProd = SITE.isProduction;
const SITE_URL = SITE.productionUrl;

// Cloudflare Pages / @cloudflare/next-on-pages requires every non-static
// route to opt into the Edge runtime.
export const runtime = "edge";

export default function robots(): MetadataRoute.Robots {
  if (!isProd) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      // No host / sitemap in dev — keeps the preview out of every crawl
      // surface area.
    };
  }
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
