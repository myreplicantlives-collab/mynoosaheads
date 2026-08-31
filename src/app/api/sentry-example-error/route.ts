// src/app/api/sentry-example-error/route.ts
// Sentry test endpoint — throws a server-side error on GET.
//
// Used by TSK-2957-04 to verify Sentry is wired correctly. Trigger:
//   curl https://mynoosaheads.twainent.workers.dev/api/sentry-example-error
//
// Returns 500 (intentional). Captured by Sentry if SENTRY_DSN is set.
// MSN-2964: disallowed in robots.txt so crawlers don't index this
// intentional-500 endpoint.
//
// MSN-3044 build leg fix: the commit added `export const runtime =
// "edge"` to opt into Pages compatibility. OpenNext requires edge-runtime
// functions to live in a separate file — co-locating the runtime edge
// export inside a regular route breaks the OpenNext Workers build with:
//   "app/api/sentry-example-error/route cannot use the edge runtime.
//    OpenNext requires edge runtime function to be defined in a separate
//    function."
// The route does not actually need edge runtime — it throws and never
// touches platform-specific APIs. Removing the runtime export restores
// the default nodejs runtime, which OpenNext bundles into the default
// server function cleanly. See evidence/per_item/09_dev_site_protection/
// build_break_fix.md for the full diagnosis.

export const dynamic = "force-dynamic";

export function GET() {
  throw new Error(
    "Sentry test error (TSK-2957-04) — if you see this in Sentry, the wiring works."
  );
}
