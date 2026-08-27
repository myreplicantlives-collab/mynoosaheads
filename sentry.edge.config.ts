// sentry.edge.config.ts
// Sentry edge runtime configuration. Used by middleware.ts and any
// route running on Vercel's edge runtime.

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 0.1,
    enabled: process.env.NODE_ENV === "production",
    sendDefaultPii: false,
    initialScope: {
      tags: {
        site: "mynoosaheads",
        sprint: "1.4",
      },
    },
  });
}
