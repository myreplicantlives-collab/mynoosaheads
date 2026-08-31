/**
 * Middleware — site-wide header injection.
 *
 * MSN-3044 — Item 9.2 fix: the audit (MSN-3043) found that no page
 * emitted an X-Robots-Tag HTTP header. Meta-robots are a hint that
 * well-behaved crawlers respect, but X-Robots-Tag is the canonical
 * mechanism for site-wide policy and is honoured by every major
 * crawler including those that ignore meta tags.
 *
 * In non-production builds (Host header is not mynoosaheads.com /
 * www.mynoosaheads.com), we set:
 *   - X-Robots-Tag: noindex, nofollow, noarchive, nosnippet
 *   - Cache-Control: private, no-store
 *
 * In production we emit a benign X-Content-Type-Options /
 * Referrer-Policy so crawlers get consistent signals.
 *
 * Note: this middleware runs on the Edge runtime; OpenNext deploys it
 * to Cloudflare Workers automatically.
 */

import { NextRequest, NextResponse } from "next/server";

function isProductionHost(req: NextRequest): boolean {
  const host = req.headers.get("host") ?? "";
  return (
    host === "mynoosaheads.com" ||
    host === "www.mynoosaheads.com"
  );
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const isProd = isProductionHost(req);

  if (!isProd) {
    // Item 9.2 — X-Robots-Tag header on every preview response.
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
    res.headers.set("X-MynoosaHeads-Build", "preview-noindex");
    // Don't let any CDN cache a noindex page.
    res.headers.set("Cache-Control", "private, no-store, max-age=0");
  } else {
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  }

  return res;
}

// Run on every path except static assets and Next's internal routes.
export const config = {
  matcher: [
    "/((?!_next/|api/|favicon|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.webp|.*\\.avif|.*\\.ico).*)",
  ],
};
