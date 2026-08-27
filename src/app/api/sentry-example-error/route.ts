// src/app/api/sentry-example-error/route.ts
// Sentry test endpoint — throws a server-side error on GET.
//
// Used by TSK-2957-04 to verify Sentry is wired correctly. Trigger:
//   curl https://noosa-site-v2.vercel.app/api/sentry-example-error
//
// Returns 500 (intentional). Captured by Sentry if SENTRY_DSN is set.

export const dynamic = "force-dynamic";

export function GET() {
  throw new Error(
    "Sentry test error (TSK-2957-04) — if you see this in Sentry, the wiring works."
  );
}
