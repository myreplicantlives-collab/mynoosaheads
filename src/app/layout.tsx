import type { Metadata } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE, FOOTER_DISCLOSURE } from "@/data/site";

/**
 * Root layout — Sprint 1.3.
 *
 * Typography stack: Fraunces (display), Inter (body), Caveat (accent).
 * Each font is configured with display: "swap" so the page never FOITs.
 * All fonts are SIL OFL 1.1 and loaded via next/font (self-hosted at
 * build time).
 *
 * Locale is en-AU. Robots are index/follow on the production hostname —
 * Sprint 1.3 is content-complete enough to be indexed; we let the
 * Search Console verification sit under TSK-2957-04.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-accent",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.productionUrl),
  title: {
    default: `${SITE.brand} — ${SITE.tagline}`,
    template: `%s · ${SITE.brand}`,
  },
  description:
    "Noosa Heads — surf, weather, the national park, accommodation, fishing, boats, travel and webcams. Live data linked to BOM and Open-Meteo.",
  applicationName: SITE.brand,
  authors: [{ name: SITE.brand }],
  generator: "Next.js",
  keywords: [
    "Noosa",
    "Noosa Heads",
    "Queensland",
    "Sunshine Coast",
    "Australia",
    "surf report Noosa",
    "Noosa National Park",
    "Noosa travel guide",
  ],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.brand,
    title: `${SITE.brand} — ${SITE.tagline}`,
    description:
      "Noosa Heads — surf, weather, the national park, accommodation, fishing, boats, travel and webcams. Live data, primary sources.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} — ${SITE.tagline}`,
    description: "Noosa Heads — surf, weather, the national park, accommodation, fishing, boats, travel and webcams. Live data, primary sources.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

// MSN-2962 (Tim directive 2026-08-28 09:25 BST — "put it on cloudfare"):
// opt every route into the Node.js runtime so @opennextjs/cloudflare
// can deploy to Cloudflare Workers (Workers Node runtime).
//
// On the existing Vercel build, this is the default runtime already,
// so this is a no-op there. Node runtime remains required for any
// future server-side fs/path usage (e.g. a planned /posts/[slug]
// route will reuse lib/posts.ts at build time).
export const runtime = "nodejs";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // MSN-2959 r2 — pure white surface (was #FBF6E9 warm parchment).
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-AU"
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`}
    >
      <head>
        {/*
         * MSN-2964 — Plausible analytics (privacy-friendly, no cookies,
         * no personal data). Script tag injected conditionally — on
         * localhost or CI builds (no NEXT_PUBLIC_PLAUSIBLE_DOMAIN) the
         * tracking pixel is omitted entirely. Outbound-link and file
         * download tracking are enabled via data-track attributes and
         * Plausible's enhanced measurements. Custom events use the
         * `plausible(...)` global when NEXT_PUBLIC_PLAUSIBLE_DOMAIN
         * is set; otherwise the wrapper below is a no-op.
         */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.outbound-links.file-downloads.tagged-events.js"
          />
        ) : null}
        {/*
         * MSN-2964 — Outbound-click tracker. When Plausible is loaded,
         * elements with `data-track="<event-name>"` fire a custom
         * Plausible event. The `data-track` attribute is also rendered
         * server-side so the bare HTML carries the contract even when
         * JS is disabled. We deliberately do NOT auto-fire events on
         * every external link — only on links explicitly marked, so
         * analytics stay focused on conversion points.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if (typeof document === 'undefined') return;
                document.addEventListener('click', function(e){
                  var el = e.target && e.target.closest && e.target.closest('[data-track]');
                  if (!el) return;
                  var name = el.getAttribute('data-track');
                  if (!name) return;
                  if (typeof window.plausible === 'function') {
                    window.plausible(name, { props: { href: el.href || '', text: (el.textContent||'').trim().slice(0,80) } });
                  }
                }, true);
              })();
            `,
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        {/*
         * MSN-2959 / TSK-2959-FIX-3: explicitly wire FOOTER_DISCLOSURE
         * into <SiteFooter /> at the root-layout layer. This is the
         * single source of truth — any edit to `src/data/site.ts`
         * FOOTER_DISCLOSURE re-flows through here to the rendered
         * footer on every page. Prior to r2, hardcoded DEFAULT_COLUMNS
         * inside Footer.tsx won at runtime; this fix removes that bug.
         */}
        <SiteFooter
          columns={FOOTER_DISCLOSURE.columns.map((col) => ({
            heading: col.heading,
            links: [...col.links],
          }))}
          region={FOOTER_DISCLOSURE.region}
          copyrightYear={FOOTER_DISCLOSURE.copyrightYear}
          complianceBand={FOOTER_DISCLOSURE.complianceBand}
        />
      </body>
    </html>
  );
}
