import type { Metadata } from "next";
import { redirect } from "next/navigation";

/**
 * /affiliate-disclosure — alias for /disclosure.
 *
 * MSN-3057 M3 Workstream 4: the canonical disclosure lives at
 * /disclosure. This route is an alias so external links that use the
 * more verbose /affiliate-disclosure URL (a common ACCC pattern) still
 * resolve. Implemented as a server-side 308 redirect so search engines
 * consolidate the signals on /disclosure.
 *
 * 308 chosen over 301 because the redirect is permanent and the method
 * must not change (it’s a GET both sides).
 */

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  alternates: { canonical: "/disclosure" },
  robots: { index: false, follow: false },
};

export default function AffiliateDisclosureAlias() {
  redirect("/disclosure");
}
