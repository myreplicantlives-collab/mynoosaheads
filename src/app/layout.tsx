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
    "Plan your Noosa trip well. Honest, sourced, current information about Noosa Heads — beaches, hikes, food, where to stay, weather, and the national park. Written and fact-checked locally.",
  applicationName: SITE.brand,
  authors: [{ name: SITE.author.name }],
  generator: "Next.js",
  keywords: [
    "Noosa", "Noosa Heads", "Queensland", "Australia", "travel guide",
    "surf forecast Noosa", "Noosa National Park", "Hastings Street",
    "where to stay Noosa", "Fraser Island", "K'gari",
  ],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.brand,
    title: `${SITE.brand} — ${SITE.tagline}`,
    description:
      "Honest, sourced, current information about Noosa Heads. Plan your trip well.",
    images: ["/images/noosa/noosa_main_beach_hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} — ${SITE.tagline}`,
    description: "Plan your Noosa trip well.",
    images: ["/images/noosa/noosa_main_beach_hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs" />
        <link rel="alternate" type="text/plain" href="/ai.txt" title="AI policy" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}