// src/app/sitemap.ts
// Auto-generated sitemap for mynoosaheads.com. Next.js 14 App Router
// serves this at /sitemap.xml. See:
//   https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
//
// Sprint 1.4 (TSK-2957-04) — operational baseline. Lists every public
// route that should be indexed. Edit this list when new pages ship.

import type { MetadataRoute } from "next";

// MSN-2964: SITE_URL now respects NEXT_PUBLIC_SITE_URL so we don't ship
// stale references to the Vercel hostname. Default is the Cloudflare
// Workers deployment that has been live since MSN-2962.
//
// MSN-2962 v2 (re-dispatched 2026-08-28 16:25 BST — re-attempt for
// mynoosaheads.pages.dev): the Cloudflare Pages deploy is the new
// canonical host. Default updated to pages.dev so the sitemap and
// robots.txt point at the Pages URL by default. Override with
// NEXT_PUBLIC_SITE_URL on any future environment.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://mynoosaheads.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];
}
