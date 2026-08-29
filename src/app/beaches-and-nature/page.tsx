import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";

/**
 * /beaches-and-nature — MSN-2987 chairman-mandated category page.
 *
 * Sally default: BUILD (chairman: "every visitor-facing page must feel
 * part of the same premium site; nav references it").
 *
 * Aggregate page for beaches, Noosa National Park, and the surrounding
 * nature precincts. Routes visitors into the canonical deep pages
 * (national park walks, areas, things to do, surf & weather).
 *
 * KUBE pattern applied: hero → atmospheric intro → category cards →
 * cross-sell.
 */

export const metadata: Metadata = {
  title: "Beaches and nature · MyNoosaHeads",
  description:
    "Noosa Main Beach, Sunshine, Peregian, Alexandria Bay and the national park headland — the beaches and nature that define Noosa Heads.",
  alternates: { canonical: "/beaches-and-nature" },
  openGraph: {
    title: "Beaches and nature · MyNoosaHeads",
    description: "Noosa Main Beach, Sunshine, Peregian, Alexandria Bay and the national park headland.",
    url: "/beaches-and-nature",
    type: "article",
  },
};

const CATEGORIES = [
  {
    id: "main-beach",
    name: "Noosa Main Beach",
    tagline: "The patrolled one — flags, surf club, the headland at the south end.",
    href: "/noosa-national-park",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    imageAlt: "Wide sand beach at golden hour — commercial-OK Unsplash atmospheric substitute.",
    accent: "Patrolled year-round; the headland coastal walk starts at the south end of the beach.",
  },
  {
    id: "national-park",
    name: "Noosa National Park",
    tagline: "Granite headland, tallowwoods, koalas, the coastal walk.",
    href: "/noosa-national-park",
    image: "https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg",
    imageAlt: "Granite Bay, Noosa National Park — the coastal walk's defining view.",
    accent: "QPWS-managed. No dogs. Four graded walks — Coastal, Tanglewood, Palm Grove, Alexandria Bay.",
  },
  {
    id: "sunshine",
    name: "Sunshine Beach",
    tagline: "South of the headland — surf club balcony, village pace.",
    href: "/areas/sunshine",
    image: "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg?w=1600&q=85",
    imageAlt: "Sunshine Beach, looking north toward the headland.",
    accent: "Patrolled by Sunshine Beach SLSC. The southern entry to Noosa National Park is a ten-minute walk north.",
  },
  {
    id: "peregian",
    name: "Peregian Beach",
    tagline: "Ten minutes south of Sunshine — village square, holiday houses.",
    href: "/areas/peregian",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    imageAlt: "Peregian Beach atmosphere — wide-sand-beach commercial-OK Unsplash.",
    accent: "Patrolled frontage; village-square cafés and the Peregian Beach Hotel on the square.",
  },
];

export default function BeachesAndNaturePage() {
  const jsonLd = [
    {
      "@context": "https.schema.org",
      "@type": "ItemList",
      "@id": `${SITE.productionUrl}/beaches-and-nature#list`,
      name: "Beaches and nature in Noosa",
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
        aria-label="Beaches and nature in Noosa"
        className="relative w-full overflow-hidden bg-ink-900 h-[80vh] min-h-[560px] max-h-[1000px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&q=80"
          alt="Wide sand beach at golden hour — commercial-OK Unsplash atmospheric substitute."
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
            <p className="eyebrow text-paper-300">BEACHES &amp; NATURE</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              Beaches and the headland.
            </h1>
            <p className="mt-4 lead text-paper-200 max-w-3xl text-pretty">
              The beaches, the national park, and the nature precincts that define Noosa Heads.
            </p>
          </div>
        </div>
      </section>

      {/* Atmospheric intro */}
      <section className="border-y border-paper-200 bg-paper-100">
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">The headline</p>
          <h2 className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl">
            One headland. Four beaches. A national park between them.
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            Noosa&apos;s beaches read like a single long coastline interrupted by the headland of Noosa National Park.
            Walk the coastal walk and the four beaches — Main, Alexandria Bay, Sunshine, Peregian — are all visible.
            Each has its own rhythm; each is named below with what makes it different.
          </p>
        </div>
      </section>

      {/* Category cards */}
      <section className="container-page py-14 md:py-20" aria-labelledby="bn-h">
        <h2 id="bn-h" className="sr-only">Beaches and nature categories</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="group block relative overflow-hidden rounded-xl aspect-[4/3] bg-ink-700"
              data-track={`bn_card_${c.id}`}
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
          Pair the beach with the day.
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            { href: "/surf-and-weather", title: "Today in Noosa", body: "Live surf, weather, UV." },
            { href: "/things-to-do/fairy-pools", title: "The Fairy Pools", body: "Coastal rock pools — not freshwater." },
            { href: "/things-to-do/noosa-with-children", title: "Noosa with children", body: "Patrolled sand, surf school, river." },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group block rounded-lg bg-paper-50 p-5 ring-1 ring-paper-200 hover:ring-ocean-300 transition"
              data-track={`bn_xsell_${c.href.split("/").pop()}`}
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