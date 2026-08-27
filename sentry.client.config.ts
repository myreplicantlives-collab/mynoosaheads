// sentry.client.config.ts
// Sentry client (browser) configuration. Loaded automatically by
// @sentry/nextjs when SENTRY_DSN env var is set. See:
//   https://docs.sentry.io/platforms/javascript/guides/nextjs/
//
// Sprint 1.4 (TSK-2957-04). Free tier: 5k errors/month, 30-day retention.
//
// To enable: set SENTRY_DSN in Vercel env (Project Settings → Environment
// Variables). Without a DSN, the SDK is a no-op (see Sentry docs §Init).

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    // 0.1 = 10% — most events captured, but trims noise on free tier.
    tracesSampleRate: 0.1,
    // Only errors in production — debug logging stays off-site.
    enabled: process.env.NODE_ENV === "production",
    // Strip PII before send. We don't capture IPs or user data.
    sendDefaultPii: false,
    // Tag every event so we can filter by site in the Sentry UI.
    initialScope: {
      tags: {
        site: "mynoosaheads",
        sprint: "1.4",
      },
    },
  });
}
