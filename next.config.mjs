// next.config.mjs
// Next.js config — wraps with @sentry/nextjs when SENTRY_DSN is set.

import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Sprint 1.1 has no imagery yet; TSK-2957-03 will revisit
  },
  trailingSlash: false,
  poweredByHeader: false,
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
