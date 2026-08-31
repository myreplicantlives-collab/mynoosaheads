// src/app/api/sentry-example-error/route.ts
// Sentry test endpoint — throws a server-side error on GET.
//
// Used by TSK-2957-04 to verify Sentry is wired correctly. Trigger:
//   curl https://mynoosaheads.twainent.workers.dev/api/sentry-example-error
//
// Returns 500 (intentional). Captured by Sentry if SENTRY_DSN is set.
// MSN-2964: disallowed in robots.txt so crawlers don't index this
// intentional-500 endpoint.

export const dynamic = "force-dynamic";
export const runtime = "edge";

export function GET() {
  throw new Error(
    "Sentry test error (TSK-2957-04) — if you see this in Sentry, the wiring works."
  );
}
