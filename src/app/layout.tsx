import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/data/site";

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
  themeColor: "#FBF7F0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}