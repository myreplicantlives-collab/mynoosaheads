import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";

/**
 * /live-conditions — MSN-2987 chairman-mandated category page.
 *
 * Sally default: BUILD (referenced in nav).
 *
 * Alternate name for /surf-and-weather — distinct content for visitors
 * searching for the live BOM and Open-Meteo data, the BOM coastal
 * forecast, BOM Tewantin tide tables, and SLSQ patrol status. The
 * surf-and-weather page remains the primary entry; this page is a
 * distinct content surface that emphasises BOM and Open-Meteo data,
 * patrol status, and the bar crossing rules.
 *
 * KUBE pattern applied: hero → atmospheric intro → live-data summary
 * cards → cross-sell.
 */

export const metadata: Metadata = {
  title: "Live conditions · BOM, Open-Meteo, SLSQ",
  description:
    "Live BOM and Open-Meteo data for Noosa Heads. Surf height, wind, tide, UV. Patrol status from SLSQ.",
  alternates: { canonical: "/live-conditions" },
  openGraph: {
    title: "Live conditions · MyNoosaHeads",
    description: "Live BOM and Open-Meteo data for Noosa Heads.",
    url: "/live-conditions",
    type: "article",
  },
};

const DATA_SOURCES = [
  {
    id: "bom",
    name: "BOM coastal forecast",
    tagline: "Southeast Coast — official Australian source.",
    href: "https://www.bom.gov.au/coastal-location/australia",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&q=80",
    imageAlt: "Sky and sea at golden hour — commercial-OK Unsplash atmospheric substitute.",
    accent: "Wind, swell, tide. The only source that\u2019s current on the morning.",
  },
  {
    id: "open-meteo",
    name: "Open-Meteo",
    tagline: "Open-source weather model — global coverage.",
    href: "https://open-meteo.com/",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80",
    imageAlt: "Coastal mountain atmosphere — commercial-OK Unsplash atmospheric.",
    accent: "Hourly UV, temperature, precipitation. Free public API.",
  },
  {
    id: "slsq",
    name: "SLSQ patrol status",
    tagline: "Sunshine Coast — daily patrol reports.",
    href: "https://www.lifesaving.com.au/",
    image: "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg?w=1600&q=85",
    imageAlt: "Sunshine Beach, looking north toward the headland.",
    accent: "Main Beach and Sunshine Beach flags. Stinger report November\u2013May.",
  },
  {
    id: "msq",
    name: "MSQ bar crossings",
    tagline: "Noosa bar status — official Queensland source.",
    href: "https://www.msq.qld.gov.au/Safety/Bar-crossings-and-coastal-conditions",
    image: "https://live.staticflickr.com/65535/9572462197_6879fe750b_b.jpg?w=1600",
    imageAlt: "Noosa River at Noosaville — commercial-OK CC0 atmospheric.",
    accent: "Bar status from Maritime Safety Queensland. Closed when conditions exceed limits.",
  },
];

export default function LiveConditionsPage() {
  const jsonLd = [
    {
      "@context": "https.schema.org",
      "@type": "ItemList",
      "@id": `${SITE.productionUrl}/live-conditions#list`,
      name: "Live conditions data sources for Noosa",
      itemListElement: DATA_SOURCES.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        url: c.href,
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
            <p className="eyebrow text-paper-300">LIVE CONDITIONS</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              BOM, Open-Meteo, SLSQ, MSQ — the live-data feeds.
            </h1>
            <p className="mt-4 lead text-paper-200 max-w-3xl text-pretty">
              Noosa&apos;s live conditions draw on four official feeds. The primary entry is /surf-and-weather; this page
              is the same data with the BOM, Open-Meteo, SLSQ and MSQ surfaces called out by name.
            </p>
          </div>
        </div>
      </section>

      {/* Atmospheric intro */}
      <section className="border-y border-paper-200 bg-paper-100">
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">The data feeds</p>
          <h2 className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl">
            Four feeds. One coastal forecast.
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            We don&apos;t generate weather data — we read it from the four official sources below. Each card opens the
            source in a new tab; the BOM Southeast Coast forecast is the only source that&apos;s current on the morning.
          </p>
        </div>
      </section>

      {/* Source cards */}
      <section className="container-page py-14 md:py-20" aria-labelledby="lc-h">
        <h2 id="lc-h" className="sr-only">Live conditions data sources</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {DATA_SOURCES.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              rel="noopener noreferrer"
              target="_blank"
              className="group block relative overflow-hidden rounded-xl aspect-[4/3] bg-ink-700"
              data-track={`livecond_card_${c.id}`}
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
                <h3 className="mt-1 font-display text-display-md text-paper-50 text-balance">
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
          Pair the data feeds with the day.
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            { href: "/surf-and-weather", title: "Surf and weather", body: "Same data on the primary page." },
            { href: "/live", title: "Live overview", body: "The three live-data pages." },
            { href: "/webcams", title: "Webcams", body: "Main Beach, Noosa Woods, Sunshine." },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group block rounded-lg bg-paper-50 p-5 ring-1 ring-paper-200 hover:ring-ocean-300 transition"
              data-track={`livecond_xsell_${c.href.split("/").pop()}`}
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