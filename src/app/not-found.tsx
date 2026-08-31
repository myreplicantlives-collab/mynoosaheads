import Link from "next/link";
import { Button } from "@/components/ui";

/**
 * /not-found — 404 catch-all.
 *
 * MSN-3044 — Item 9.7 fix: the previous version inherited the homepage
 * canonical, which made search engines consolidate the 404 URL onto the
 * homepage. The audit (MSN-3043) flagged 5 bare-slug 404 paths
 * (/bar-crossing, /boating-and-bar-crossing, /noosa-river-bar,
 * /plan-your-trip, /safety-on-the-water) all serving 404 with the
 * homepage canonical.
 *
 * Two changes:
 *   1. Five historical 404 slugs now 301-redirect via next.config.mjs
 *      (Item 3 fix) so they should never reach this catch-all.
 *   2. The catch-all still emits meta-robots: noindex,nofollow (so any
 *      remaining 404 stays out of the index) but no longer carries a
 *      homepage canonical — search engines treat the 404 URL as itself.
 */

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="bg-paper-50">
      <div className="container-narrow py-20 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 font-display text-display-lg text-ink-900 text-balance">
          Page not found
        </h1>
        <p className="mt-4 lead text-pretty">
          This page doesn’t exist. Try the <Link href="/">home page</Link>, or
          check back soon — we’re adding new pages weekly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/styleguide" variant="outline">
            Style guide
          </Button>
        </div>
      </div>
    </div>
  );
}
