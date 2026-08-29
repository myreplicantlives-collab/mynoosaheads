import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { VERIFIED } from "@/data/photos-msn2982";

/**
 * /things-to-do/fairy-pools — MSN-2987 V2 chunk 1 structural stub.
 *
 * KUBE progression: full-bleed photo hero → emotional headline → atmospheric
 * intro → visual choices → concise detail → practical info → clear action.
 *
 * Chunk-1 mandate (chairman 2026-08-29): create the route with complete
 * KUBE structure so it returns HTTP 200 on every entry point. Copy and
 * imagery to be replaced in chunk 2 after Albert's photo/factual audit.
 *
 * Classification note: The Fairy Pools are COASTAL ROCK POOLS on the
 * shoreline of Noosa National Park (saltwater, tidal), reached via
 * the coastal walk south of Noosa Head. They are not freshwater.
 */

export const metadata: Metadata = {
  title: "Fairy Pools · Noosa National Park",
  description:
    "The Fairy Pools — coastal rock pools on Noosa's shoreline, reached via the coastal walk in Noosa National Park.",
  alternates: { canonical: "/things-to-do/fairy-pools" },
  openGraph: {
    title: "Fairy Pools · Noosa National Park · MyNoosaHeads",
    description:
      "The Fairy Pools — coastal rock pools on Noosa's shoreline, reached via the coastal walk in Noosa National Park.",
    url: "/things-to-do/fairy-pools",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Fairy Pools · Noosa National Park · MyNoosaHeads",
    description:
      "The Fairy Pools — coastal rock pools on Noosa's shoreline, reached via the coastal walk in Noosa National Park.",
  },
};

export default function FairyPoolsPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${SITE.productionUrl}/things-to-do/fairy-pools#article`,
      url: `${SITE.productionUrl}/things-to-do/fairy-pools`,
      headline: "Fairy Pools — coastal rock pools",
      description:
        "The Fairy Pools — coastal rock pools on Noosa's shoreline, reached via the coastal walk in Noosa National Park.",
      inLanguage: SITE.locale,
      isPartOf: { "@id": `${SITE.productionUrl}#website` },
      publisher: { "@id": `${SITE.productionUrl}#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE.brand, item: SITE.productionUrl },
        { "@type": "ListItem", position: 2, name: "Things to do", item: `${SITE.productionUrl}/things-to-do` },
        { "@type": "ListItem", position: 3, name: "Fairy Pools", item: `${SITE.productionUrl}/things-to-do/fairy-pools` },
      ],
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* Hero — Fairy Pools (verified) */}
      <section
        aria-label="Fairy Pools, Noosa National Park"
        className="relative w-full overflow-hidden bg-ink-900 h-[80vh] min-h-[560px] max-h-[1000px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={VERIFIED.cards.fairyPool.path}
          alt={VERIFIED.cards.fairyPool.caption}
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
            <p className="eyebrow text-paper-300">Things to do · Noosa</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              The Fairy Pools.
            </h1>
            <p className="mt-4 lead text-paper-200 max-w-3xl text-pretty">
              Coastal rock pools on the shoreline of Noosa National Park.
            </p>
          </div>
        </div>
      </section>

      {/* Atmospheric intro */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="fp-intro-heading"
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Noosa National Park · Coastal</p>
          <h2
            id="fp-intro-heading"
            className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl"
          >
            Sandstone shelves at the foot of the headland.
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            The Fairy Pools sit on the coast a short walk south of the
            Noosa Headland Surf Club, where the granite gives way to
            sandstone shelves and tidal rock pools. They are saltwater
            and tidal, fed by the ocean through the rocks. The coastal
            walk passes them; the Noosa National Park headland section
            is the access route.
          </p>
        </div>
      </section>

      {/* Visual choices */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="fp-picks-heading"
      >
        <h2
          id="fp-picks-heading"
          className="font-display text-display-md md:text-display-lg text-ink-900 text-balance mb-10"
        >
          Three things to know.
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Tidal, saltwater",
              body: "Tidal saltwater pools on the sandstone platforms. Conditions change with the tide.",
            },
            {
              title: "Walk-in only",
              body: "Reached on foot via the coastal walk. No vehicle access; no facilities on site.",
            },
            {
              title: "Unpatrolled",
              body: "There is no lifeguard coverage. The walk to Main Beach and back is part of the visit.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-xl bg-paper-50 p-6 ring-1 ring-paper-200"
            >
              <h3 className="font-display text-display-sm text-ink-900 text-balance">
                {c.title}
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Concise detail */}
      <section
        className="bg-paper-100 border-y border-paper-200"
        aria-labelledby="fp-detail-heading"
      >
        <div className="container-page py-12 md:py-16 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">What to bring</p>
            <h2
              id="fp-detail-heading"
              className="mt-3 font-display text-display-md text-ink-900 text-balance"
            >
              Reef shoes help. Water is the rest.
            </h2>
            <ul className="mt-5 space-y-3 text-body-md text-ink-800">
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-eucalyptus-700 mt-1">•</span>
                <span>Reef shoes or old runners — the sandstone shelves and urchins are unforgiving on bare feet.</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-eucalyptus-700 mt-1">•</span>
                <span>Hat and sunscreen — there is no shade on the rocks at the Fairy Pools.</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-eucalyptus-700 mt-1">•</span>
                <span>Water bottle — there are no taps on the coastal walk; the closest water is at the Surf Club end.</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-eucalyptus-700 mt-1">•</span>
                <span>Bin bag — pack out what you bring in.</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Safety</p>
            <ul className="mt-5 space-y-3 text-body-md text-ink-800">
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-eucalyptus-700 mt-1">•</span>
                <span>Slippery when wet — the rocks are unforgiving in bare feet or thongs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-eucalyptus-700 mt-1">•</span>
                <span>Wave wash — incoming sets can sweep across the lower shelves. Watch the ocean for a few minutes before you step down.</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-eucalyptus-700 mt-1">•</span>
                <span>Swim only between the flags at Main Beach or Sunshine Beach. The Fairy Pools are not patrolled.</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-eucalyptus-700 mt-1">•</span>
                <span>Check the BOM coastal forecast and the QPWS alerts page before you go.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Practical info */}
      <section
        className="container-page py-12 md:py-16"
        aria-labelledby="fp-practical-heading"
      >
        <h2
          id="fp-practical-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          Authoritative sources.
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 text-body-md text-ink-800">
          <li>
            <a
              className="link text-ocean-700"
              href="https://parks.qld.gov.au/find-a-park/national-parks/noosa-national-park"
              rel="noopener noreferrer"
              target="_blank"
            >
              QPWS — Noosa National Park
            </a>
            <p className="mt-1 text-body-sm text-ink-600">Track closures, day-use areas, contact.</p>
          </li>
          <li>
            <a
              className="link text-ocean-700"
              href="https://parks.qld.gov.au/park-alerts"
              rel="noopener noreferrer"
              target="_blank"
            >
              QPWS park alerts (statewide)
            </a>
            <p className="mt-1 text-body-sm text-ink-600">Current closures and conditions.</p>
          </li>
          <li>
            <a
              className="link text-ocean-700"
              href="https://parks.qld.gov.au/parks/noosa/journeys/coastal-walk"
              rel="noopener noreferrer"
              target="_blank"
            >
              QPWS — Coastal Walk journey
            </a>
            <p className="mt-1 text-body-sm text-ink-600">The walk that reaches the pools.</p>
          </li>
          <li>
            <a
              className="link text-ocean-700"
              href="https://www.bom.gov.au/coastal-location/australia"
              rel="noopener noreferrer"
              target="_blank"
            >
              BOM coastal forecast (Southeast Coast)
            </a>
            <p className="mt-1 text-body-sm text-ink-600">Swell, wind, and tide windows.</p>
          </li>
        </ul>
      </section>

      {/* Clear action */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="fp-action-heading"
      >
        <div className="container-page py-12 md:py-16 text-center">
          <h2
            id="fp-action-heading"
            className="font-display text-display-md text-ink-900 text-balance"
          >
            Pair the pools with the park.
          </h2>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link
              href="/noosa-national-park"
              className="btn-primary btn-md"
              data-track="fp_action_np"
            >
              Noosa National Park
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/surf-and-weather"
              className="btn-outline btn-md"
              data-track="fp_action_surf"
            >
              Today&rsquo;s surf and weather
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}