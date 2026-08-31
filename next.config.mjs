// next.config.mjs
// Next.js config — wraps with @sentry/nextjs when SENTRY_DSN is set.
//
// MSN-2962 (Tim directive 2026-08-28 09:25 BST — "put it on cloudfare"):
// also supports building for Cloudflare Pages via @cloudflare/next-on-pages.
// When CF_PAGES=1 (set automatically by Cloudflare Pages CI and by the
// `pages:build` npm script), we (a) disable next/image's optimizer
// (Cloudflare Edge runtime doesn't ship the Node-based image optimizer),
// (b) opt into the nodejs_compat compatibility flag, and (c) use the
// Edge runtime for any server-side rendering. The Vercel build path
// (npm run build) is unchanged — it still uses Node runtime + the
// built-in image optimizer.

import { withSentryConfig } from "@sentry/nextjs";

// Cloudflare Pages sets CF_PAGES=1 in its build environment. We also
// set it from our npm `pages:build` script so local builds match.
const isCloudflare =
  process.env.CF_PAGES === "1" ||
  process.env.CF_PAGES === "true" ||
  process.env.CLOUDFLARE === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Sprint 1.5 (MSN-2958 / TSK-2958-02): photo wire-up via next/image.
    // Wikimedia Commons is the source of truth for category-page imagery
    // (per Albert's `photo_inventory.md`). Allow `upload.wikimedia.org`
    // thumbnails at known widths.
    //
    // We do NOT set `unoptimized: true` anymore — next/image's optimizer
    // is now in play, so the remotePatterns allowlist is required for
    // every external host we pull from.
    //
    // MSN-2962: on Cloudflare Pages, the Node-based image optimizer is
    // unavailable (Edge runtime only). We fall back to `unoptimized: true`
    // so next/image still renders the correct <img> tag with width/height
    // attributes, just without runtime resizing. The Wikimedia thumbnails
    // are already served at the right size by Commons, so this is safe.
    //
    // MSN-2980: Wikimedia is forbidden (chairman mandate). Allow Flickr
    // (staticflickr.com) for inline / card photos and Unsplash CDN
    // (images.unsplash.com) for placeholder photos.
    unoptimized: isCloudflare,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "live.staticflickr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: false,
  poweredByHeader: false,
  // MSN-2987 — chairman test-script slugs (shorter aliases) redirect
  // to the canonical slug.
  // MSN-3044 — five historical 404 slugs (Item 3) now 301 to the
  // closest real page. /plan-your-trip → /things-to-do (planning hub);
  // /bar-crossing, /boating-and-bar-crossing, /noosa-river-bar,
  // /safety-on-the-water → /boats-and-watercraft (bar + safety).
  async redirects() {
    return [
      { source: "/things-to-do/eat-along-hastings", destination: "/things-to-do/eat-your-way-along-hastings-street", permanent: true },
      { source: "/things-to-do/book-a-cruise", destination: "/things-to-do/book-a-cruise-tour-or-wellness-experience", permanent: true },
      { source: "/bar-crossing", destination: "/boats-and-watercraft", permanent: true },
      { source: "/boating-and-bar-crossing", destination: "/boats-and-watercraft", permanent: true },
      { source: "/noosa-river-bar", destination: "/boats-and-watercraft", permanent: true },
      { source: "/safety-on-the-water", destination: "/boats-and-watercraft", permanent: true },
      { source: "/plan-your-trip", destination: "/things-to-do", permanent: true },
    ];
  },
};

// Sentry build-time config is only applied when SENTRY_DSN is set; this
// keeps dev builds fast and avoids prompt-blocking Sentry CLI auth in
// local dev. See: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const sentryBuildOptions = {
  // Suppresses the Sentry CLI upload during build. Source maps still get
  // generated locally (for debugging), but we don't push them to Sentry
  // on every preview deploy — production-only push is controlled via
  // SENTRY_AUTH_TOKEN env var on Vercel.
  dryRun: !process.env.SENTRY_AUTH_TOKEN,
  // Hide Sentry's internal build logs by default.
  silent: !process.env.SENTRY_DEBUG,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
};

const exported = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(nextConfig, sentryBuildOptions)
  : nextConfig;

export default exported;
