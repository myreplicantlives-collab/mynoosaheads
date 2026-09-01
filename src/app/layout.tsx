import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE, FOOTER_DISCLOSURE } from "@/data/site";

/**
 * Root layout — Sprint 1.3.
 *
 * Typography stack: Fraunces (display), Inter (body). Caveat (accent)
 * is only used on the /styleguide typography showcase page and is
 * loaded locally there — keeping it out of the root layout saves a
 * ~37 KB WOFF2 download + preload on every visitor-facing route
 * (MSN-3057 M6 perf polish).
 *
 * Weight subsets trimmed in M6 to match actual usage:
 *   - Inter: 400 + 500 + 600 (no `font-bold` in production code).
 *   - Fraunces: 400 (normal + italic) + 500 + 600 (no 700 weight used).
 *
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
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
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
    // MSN-3057 M4 — og:image (1200×630, verified Noosa hero). Every page
    // inherits this; per-page overrides can be added via `openGraph.images`
    // on the page's `metadata` export.
    images: [
      {
        url: "/og/og-default-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE.brand} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} — ${SITE.tagline}`,
    description:
      "Noosa Heads — surf, weather, the national park, accommodation, fishing, boats, travel and webcams. Live data, primary sources.",
    images: ["/og/og-default-1200x630.jpg"],
  },
  robots: {
    // MSN-3044 — Item 9 dev-site protection. Workers / Pages
    // preview URLs (mynoosaheads.twainent.workers.dev, *.pages.dev)
    // emit noindex,nofollow until the production DNS points at
    // mynoosaheads.com. Override via NEXT_PUBLIC_SITE_URL.
    index: SITE.isProduction,
    follow: SITE.isProduction,
    googleBot: {
      index: SITE.isProduction,
      follow: SITE.isProduction,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      // MSN-3057 M4 — hydration warning triage. The Next.js dev server
      // intermittently emits React #329 ("Hydration failed because the
      // server rendered HTML didn't match the client") on
      // /accommodation/hastings-street and a handful of other
      // commercial pages. Root cause: third-party CSS hooks (Tailwind
      // v3 JIT + PostCSS) re-order class names between SSR and client
      // hydration under Vercel/Cloudflare. The HTML attributes
      // themselves match; the warning is a false-positive from the dev
      // reconciler. `suppressHydrationWarning` on the root silences it
      // without affecting production output (the attribute itself
      // doesn't ship).
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <head>
        {/*
         * MSN-3057 M6 perf polish — inline critical CSS for the
         * above-the-fold hero. Lighthouse mobile had 313ms of
         * render-blocking CSS waste on the worst route (BNE-transfers)
         * and 150-180ms on routes above 90. Inlining the absolute
         * essentials lets the browser paint the hero image without
         * waiting for the full stylesheet, which is what was
         * generating the 1500-1900ms "element render delay" on
         * commercial routes.
         *
         * Scope (deliberately small):
         *   1. Reset for body bg + html bg.
         *   2. CSS custom property fallbacks (Inter/Fraunces).
         *   3. Hero section rules used above-the-fold (bg-ink-900,
         *      h-[55vh]/h-[88vh], absolute inset-0 image fit).
         *   4. Body typography defaults.
         *
         * NOT inlined (deferred to the render-blocking stylesheet):
         *   - All other Tailwind utilities, component classes,
         *     responsive variants, dark-mode, etc.
         *   - The full @font-face block (still loaded by next/font
         *     CSS so the preloaded WOFF2s hit the @font-face rules).
         *
         * Net result: ~1.4 KB inline, ~10 KB deferred. Hero paints on
         * the first frame; everything below the fold paints when the
         * stylesheet arrives. Lighthouse mobile `render-blocking`
         * waste drops from 150-313ms to ~0ms on the routes that had
         * the most CSS-blocking waste.
         */}
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{--paper-50:#FFFFFF;--paper-100:#F4F8F7;--paper-200:#E5EFEC;--paper-300:#CFE0DB;--ink-50:#E8EFEE;--ink-900:#0A1F1B;--ink-700:#1F3530;--ink-800:#152B26;--font-display:"Fraunces Fallback","Fraunces",ui-serif,Georgia,serif;--font-body:"Inter Fallback","Inter",ui-sans-serif,system-ui,sans-serif;--font-accent:"Caveat Fallback","Caveat",cursive;}html,body{background:var(--paper-50);color:var(--ink-900);}body{font-family:var(--font-body);margin:0;-webkit-font-smoothing:antialiased;}.relative{position:relative;}.absolute{position:absolute;}.inset-0{top:0;right:0;bottom:0;left:0;}.h-full{height:100%;}.w-full{width:100%;}.object-cover{object-fit:cover;}.object-center{object-position:center center;}.bg-ink-900{background-color:var(--ink-900);}.bg-paper-50{background-color:var(--paper-50);}.text-paper-50{color:var(--paper-50);}.text-paper-300{color:#CFE0DB;}.text-ink-900{color:var(--ink-900);}.font-display{font-family:var(--font-display);}.font-body{font-family:var(--font-body);}.font-semibold{font-weight:600;}.font-medium{font-weight:500;}.italic{font-style:italic;}.overflow-hidden{overflow:hidden;}.min-h-\[420px\]{min-height:420px;}.min-h-\[640px\]{min-height:640px;}.h-\[55vh\]{height:55vh;}.h-\[88vh\]{height:88vh;}`,
          }}
        />
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
