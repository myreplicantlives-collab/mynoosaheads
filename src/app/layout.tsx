import type { Metadata } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/data/site";

/**
 * Sprint 1.2 — Typography stack loaded via next/font (Google Fonts, SIL OFL 1.1).
 *
 *   - Fraunces  → display headings (editorial serif, 500/600 italic optical sizing)
 *   - Inter     → body + UI sans (workhorse, 400–700)
 *   - Caveat    → accent handwritten flourishes (byline, dates, sparingly)
 *
 * Each font is configured with:
 *   - display: "swap" → no FOIT, fallback shows immediately
 *   - subsets: ["latin"] → keeps payload small
 *   - variable: "--font-{name}" → exposed as CSS var so Tailwind tokens in
 *     tailwind.config.ts can bind `font-display`/`font-body`/`font-accent`
 *     to them.
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
    template: `%s — ${SITE.brand}`,
  },
  description:
    "Plan your Noosa trip well. Honest, sourced, current information about Noosa Heads — coming soon.",
  applicationName: SITE.brand,
  authors: [{ name: SITE.brand }],
  generator: "Next.js",
  keywords: ["Noosa", "Noosa Heads", "Queensland", "Australia", "travel guide"],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.brand,
    title: `${SITE.brand} — ${SITE.tagline}`,
    description: "Plan your Noosa trip well. Coming soon.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} — ${SITE.tagline}`,
    description: "Plan your Noosa trip well. Coming soon.",
  },
  robots: {
    index: false, // Sprint 1.1 is a foundation scaffold — don't index yet
    follow: false,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBF6E9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-AU"
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
