import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";

/**
 * /live — MSN-2987 chairman-mandated category page.
 *
 * Sally default: BUILD (chairman: "every visitor-facing page must feel
 * part of the same premium site; nav references it").
 *
 * Live conditions overview — surf, weather, tide, UV. Routes visitors
 * into the canonical live-data pages (surf-and-weather, fishing-reports,
 * webcams).
 *
 * KUBE pattern applied: hero → atmospheric intro → category cards →
 * cross-sell.
 */

export const metadata: Metadata = {
  title: "Live · What Noosa is doing right now",
  description:
    "Live surf, weather, tide and UV for Noosa Heads. Refreshed every 30 minutes from BOM and Open-Meteo.",
  alternates: { canonical: "/live" },
  openGraph: {
    title: "Live · MyNoosaHeads",
    description: "Live surf, weather, tide and UV for Noosa Heads.",
    url: "/live",
    type: "article",
  },
};

const CATEGORIES = [
  {
    id: "surf-and-weather",
    name: "Surf and weather",
    tagline: "Live surf height, wind, tide, UV.",
    href: "/surf-and-weather",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&q=80",
    imageAlt: "Sky and sea — commercial-OK Unsplash atmospheric substitute.",
    accent: "Refreshed every 30 minutes from BOM and Open-Meteo. Noosa Main Beach webcams live.",
  },
  {
    id: "fishing-reports",
    name: "Fishing reports",
    tagline: "River, estuary, offshore — what's biting.",
    href: "/fishing-reports",
    image: "https://live.staticflickr.com/65535/9572462197_6879fe750b_b.jpg?w=1600",
    imageAlt: "Noosa River at Noosaville — commercial-OK CC0 atmospheric.",
    accent: "Estuary and offshore reports from local operators. Bar crossing status from MSQ.",
  },
  {
    id: "webcams",
    name: "Webcams",
    tagline: "Main Beach, Noosa Woods, Sunshine — live.",
    href: "/webcams",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    imageAlt: "Coastal headland atmosphere — commercial-OK Unsplash.",
    accent: "Beach and headland webcams from Sunshine Coast Council and local operators.",
  },
];

export default function LivePage() {
  const jsonLd = [
    {
      "@context": "https.schema.org",
      "@type": "ItemList",
      "@id": `${SITE.productionUrl}/live#list`,
      name: "Live conditions in Noosa",
      itemListElement: CATEGORIES.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        url: `${SITE.productionUrl}${c.href}`,
      })),
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section
        aria-label="Live conditions in Noosa"
        className="relative w-full overflow-hidden bg-ink-900 h-[80vh] min-h-[560px] max-h-[1000px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=2400&q=80"
          alt="Sky and sea at golden hour — commercial-OK Unsplash atmospheric substitute."
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-900/15 via-transparent to-ink-900/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent"
          aria-hidden="true"
        />
        <div className="relative h-full w-full">
          <div className="container-page h-full flex flex-col justify-end pb-16 md:pb-24">
            <p className="eyebrow text-paper-300">LIVE</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              What the coast is doing right now.
            </h1>
            <p className="mt-4 lead text-paper-200 max-w-3xl text-pretty">
              Live surf, weather, tide, UV and webcams — refreshed from BOM and Open-Meteo.
            </p>
          </div>
        </div>
      </section>

      {/* Atmospheric intro */}
      <section className="border-y border-paper-200 bg-paper-100">
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">The headline</p>
          <h2 className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl">
            Surf, weather, tide, UV — three live-data pages, one URL.
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            Noosa&apos;s weather changes by the hour; the BOM coastal forecast is the only source that&apos;s current on the
            morning. Below: three live-data pages, each refreshed every 30 minutes.
          </p>
        </div>
      </section>

      {/* Category cards */}
      <section className="container-page py-14 md:py-20" aria-labelledby="live-h">
        <h2 id="live-h" className="sr-only">Live condition categories</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="group block relative overflow-hidden rounded-xl aspect-[4/3] bg-ink-700"
              data-track={`live_card_${c.id}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={c.imageAlt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent"
                aria-hidden="true"
              />
              <div className="relative h-full w-full p-5 md:p-6 flex flex-col justify-end">
                <p className="text-body-sm uppercase tracking-wider text-paper-300">
                  {c.tagline}
                </p>
                <h3 className="mt-1 font-display text-display-sm text-paper-50 text-balance">
                  {c.name}
                </h3>
                <p className="mt-1 text-body-sm text-paper-200 text-pretty">
                  {c.accent}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Cross-sell row */}
      <section className="container-page py-14 md:py-20">
        <h2 className="font-display text-display-sm md:text-display-md text-ink-900 text-balance">
          Pair the live data with the day.
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            { href: "/things-to-do/learn-to-surf", title: "Learn to surf", body: "Main Beach between the flags." },
            { href: "/noosa-national-park", title: "The coastal walk", body: "Granite, tallowwoods, koalas." },
            { href: "/travel-and-transport", title: "Travel and transport", body: "Park, ferry, drive-in." },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group block rounded-lg bg-paper-50 p-5 ring-1 ring-paper-200 hover:ring-ocean-300 transition"
              data-track={`live_xsell_${c.href.split("/").pop()}`}
            >
              <p className="eyebrow">Pair with</p>
              <h3 className="mt-2 font-display text-headline-md text-ink-900 text-balance">
                {c.title}
              </h3>
              <p className="mt-1 text-body-sm text-ink-700 text-pretty">{c.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}