// sentry.server.config.ts
// Sentry server (Node.js) configuration. Loaded automatically by
// @sentry/nextjs when SENTRY_DSN env var is set.
//
// Captures: API route errors, getServerSideProps throws, server-side
// React rendering exceptions, data-fetch failures.

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
