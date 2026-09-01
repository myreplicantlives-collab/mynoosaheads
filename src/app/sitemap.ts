// src/app/sitemap.ts
// Auto-generated sitemap for mynoosaheads.com.
//
// Production (NEXT_PUBLIC_SITE_URL ends with mynoosaheads.com): emits
// the public route list. Non-production: returns an empty sitemap so
// crawlers can't pick up the preview URL set.
//
// The 2026-08-31 audit (MSN-3043) found /photo-credits, /shopping and
// /styleguide missing from the sitemap. /styleguide is now excluded
// (still noindex per layout robots); /photo-credits and /shopping are
// included as real public routes.

import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

const SITE_URL = SITE.productionUrl;
const isProd = SITE.isProduction;

// Cloudflare Pages / @cloudflare/next-on-pages requires every non-static
// route to opt into the Edge runtime. The deployment target is OpenNext
// Cloudflare Workers (wrangler deploy), which BUNDLES edge-runtime code
// into a separate file — co-locating the runtime export here breaks the
// build with: "app/sitemap.xml/route cannot use the edge runtime."
// The default nodejs runtime is fine for this route: it returns a
// serialisable array, no platform-specific APIs touched.
// Removed in the MSN-3044 build leg — see
// evidence/per_item/09_dev_site_protection/build_break_fix.md.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProd) {
    // Empty sitemap in dev — keeps search engines off the preview URL set.
    return [];
  }
  const now = new Date();
  const lastModified = now.toISOString();

  return [
    // Homepage — daily update
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "daily", priority: 1.0 },
    // Category pages — weekly update
    { url: `${SITE_URL}/surf-and-weather`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/noosa-national-park`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/accommodation`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/things-to-do`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/fishing-reports`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/boats-and-watercraft`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/travel-and-transport`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/webcams`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    // Editorial / legal — yearly
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    // MSN-3057 / Workstream 1 — affiliate disclosure page is visitor-facing
    // and should be indexed in production.
    { url: `${SITE_URL}/disclosure`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    // MSN-3043 audit fix 8.3 — /photo-credits and /shopping were reachable
    // 200 OK pages but missing from the sitemap. Now listed.
    { url: `${SITE_URL}/photo-credits`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/shopping`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    // MSN-3057 / Workstream 2 — accommodation commercial cluster (13 pages).
    { url: `${SITE_URL}/accommodation/best-places-to-stay-in-noosa`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/accommodation/hastings-street`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/accommodation/noosaville`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/accommodation/sunshine-beach`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/accommodation/peregian-beach`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/accommodation/luxury`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/families`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/apartments`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/near-the-beach`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/with-pools`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/pet-friendly`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/without-a-car`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/hastings-vs-noosaville`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    // MSN-3057 / Workstream 2 — activity commercial cluster (9 pages).
    { url: `${SITE_URL}/things-to-do/surf-lessons`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/things-to-do/everglades-tours`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/things-to-do/river-cruises`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/things-to-do/kayak-and-paddleboard-hire`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/things-to-do/families`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/things-to-do/hinterland-day-trips`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/travel-and-transport/brisbane-airport-to-noosa`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/travel-and-transport/sunshine-coast-airport-to-noosa`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/travel-and-transport/car-hire`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    // NOTE: /reporting is intentionally NOT listed. It is the internal
    // reporting view (MSN-3057 / Workstream 1) and ships with a
    // robots: { index: false, follow: false } metadata block — it must
    // never be discoverable through the sitemap. To verify, filter the
    // production sitemap.xml for "reporting" — should return zero hits.
  ];
}
