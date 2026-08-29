import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { VERIFIED } from "@/data/photos-msn2982";

/**
 * /things-to-do/noosa-with-children — MSN-2987 V2 chunk 1 structural stub.
 *
 * KUBE progression: full-bleed photo hero → emotional headline → atmospheric
 * intro → visual choices → concise detail → practical info → clear action.
 *
 * Chunk-1 mandate (chairman 2026-08-29): create the route with complete
 * KUBE structure so it returns HTTP 200 on every entry point. Copy and
 * imagery to be replaced in chunk 2 after Albert's photo/factual audit.
 */

export const metadata: Metadata = {
  title: "Noosa with children",
  description:
    "Discover Noosa with children — patrolled swimming, ferry rides, short rainforest walks, and slow river days.",
  alternates: { canonical: "/things-to-do/noosa-with-children" },
  openGraph: {
    title: "Noosa with children · MyNoosaHeads",
    description:
      "Discover Noosa with children — patrolled swimming, ferry rides, short rainforest walks, and slow river days.",
    url: "/things-to-do/noosa-with-children",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Noosa with children · MyNoosaHeads",
    description:
      "Discover Noosa with children — patrolled swimming, ferry rides, short rainforest walks, and slow river days.",
  },
};

export default function NoosaWithChildrenPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${SITE.productionUrl}/things-to-do/noosa-with-children#article`,
      url: `${SITE.productionUrl}/things-to-do/noosa-with-children`,
      headline: "Noosa with children",
      description:
        "Discover Noosa with children — patrolled swimming, ferry rides, short rainforest walks, and slow river days.",
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
        { "@type": "ListItem", position: 3, name: "Noosa with children", item: `${SITE.productionUrl}/things-to-do/noosa-with-children` },
      ],
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* Hero — Sunshine Beach (verified) */}
      <section
        aria-label="Noosa with children"
        className="relative w-full overflow-hidden bg-ink-900 h-[80vh] min-h-[560px] max-h-[1000px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={VERIFIED.cards.sunshineBeach.path}
          alt={VERIFIED.cards.sunshineBeach.caption}
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
              Noosa with children.
            </h1>
            <p className="mt-4 lead text-paper-200 max-w-3xl text-pretty">
              Patrolled swimming, ferry rides, short rainforest walks.
            </p>
          </div>
        </div>
      </section>

      {/* Atmospheric intro */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="nwc-intro-heading"
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">A family day in Noosa</p>
          <h2
            id="nwc-intro-heading"
            className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl"
          >
            Slow mornings on the river, afternoons in the flags.
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            Noosa is built for short legs. The patrolled beach is one end of
            Hastings Street, the river ferry runs every thirty minutes, and
            Palm Grove is a fifteen-minute rainforest loop that fits inside a
            morning.
          </p>
        </div>
      </section>

      {/* Visual choices */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="nwc-picks-heading"
      >
        <h2
          id="nwc-picks-heading"
          className="font-display text-display-md md:text-display-lg text-ink-900 text-balance mb-10"
        >
          Three things that work.
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/noosa-national-park/walks/palm-grove",
              title: "Palm Grove Walk",
              body: "1.1 km return. Closed canopy, king ferns, stream crossing.",
              image: VERIFIED.cards.noosaRainforest.path,
              caption: VERIFIED.cards.noosaRainforest.caption,
            },
            {
              href: "/surf-and-weather",
              title: "Swim between the flags",
              body: "Main Beach and Sunshine are patrolled daily.",
              image: VERIFIED.cards.sunshineBeach.path,
              caption: VERIFIED.cards.sunshineBeach.caption,
            },
            {
              href: "/things-to-do/spend-a-day-on-the-river",
              title: "Catch the ferry",
              body: "Noosa Ferry runs the river, every thirty minutes.",
              image: VERIFIED.cards.morningRiver.path,
              caption: VERIFIED.cards.morningRiver.caption,
            },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative block overflow-hidden rounded-xl aspect-[4/5] bg-ink-700"
              data-track={`nwc_card_${c.href.split("/").pop()}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={c.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent"
                aria-hidden="true"
              />
              <div className="relative h-full w-full p-5 md:p-6 flex flex-col justify-end">
                <h3 className="font-display text-display-sm text-paper-50 text-balance">
                  {c.title}
                </h3>
                <p className="mt-1 text-body-sm text-paper-200 text-pretty">
                  {c.body}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Practical info */}
      <section
        className="bg-paper-100 border-y border-paper-200"
        aria-labelledby="nwc-practical-heading"
      >
        <div className="container-page py-12 md:py-16">
          <h2
            id="nwc-practical-heading"
            className="font-display text-display-md text-ink-900 text-balance"
          >
            A few things worth knowing.
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 text-body-md text-ink-800">
            <li>
              <strong className="text-ink-900">Patrol:</strong> Main Beach and Sunshine Beach are patrolled daily during patrol season. Confirm the current patrol status on Beachsafe before you set up for the day.
            </li>
            <li>
              <strong className="text-ink-900">Stingers:</strong> Marine stingers are possible in the warmer months. The SLSQ stinger report for the Sunshine Coast is the current source.
            </li>
            <li>
              <strong className="text-ink-900">Sun:</strong> The river and the beach both reflect UV. Cover up between mid-morning and mid-afternoon.
            </li>
            <li>
              <strong className="text-ink-900">The river:</strong> The Noosa River foreshore at Gympie Terrace is shallow and grassy — calmer water than the surf beach.
            </li>
          </ul>
        </div>
      </section>

      {/* Clear action */}
      <section
        className="border-t border-paper-200 bg-paper-50"
        aria-labelledby="nwc-action-heading"
      >
        <div className="container-page py-12 md:py-16 text-center">
          <h2
            id="nwc-action-heading"
            className="font-display text-display-md text-ink-900 text-balance"
          >
            Plan the day.
          </h2>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link
              href="/things-to-do/first-day-itinerary"
              className="btn-primary btn-md"
              data-track="nwc_action_itinerary"
            >
              First-day itinerary
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/surf-and-weather"
              className="btn-outline btn-md"
              data-track="nwc_action_surf"
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