import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";

/**
 * /areas — MSN-2980 V2 build.
 *
 * Index of the four Noosa precincts the visitor actually picks
 * between when they choose where to stay. Each card jumps to the
 * area deep page at /areas/[area].
 *
 * KUBE pattern: image-led choice tiles (image + label only) — body
 * lives on the deep pages.
 */

export const metadata: Metadata = {
  title: "Noosa areas · Hastings, Noosaville, Sunshine, Peregian",
  description:
    "Four precincts, four different rhythms. Hastings Street for walkable fine-dining; Noosaville for the river; Sunshine for the surf club; Peregian for the village square.",
  alternates: { canonical: "/areas" },
  openGraph: {
    title: "Noosa areas · MyNoosaHeads",
    description: "Four precincts, four different rhythms.",
    url: "/areas",
    type: "article",
  },
};

const AREAS = [
  {
    id: "hastings",
    name: "Hastings Street",
    tagline: "The walkable one.",
    href: "/areas/hastings",
    image: "https://live.staticflickr.com/8514/8532929182_a1ea8ef7be.jpg",
    imageAlt: "Hastings Street storefronts and palms, looking toward Main Beach.",
    accent: "Walk to the beach, the headland, and every restaurant.",
  },
  {
    id: "noosaville",
    name: "Noosaville",
    tagline: "Across the river.",
    href: "/areas/noosaville",
    image: "https://live.staticflickr.com/3696/12046547304_e4e4449777_b.jpg",
    imageAlt: "Noosa River at Noosaville — paddleboard water and the ferry wharf.",
    accent: "Apartments, river-edge, the Sunday farmers market.",
  },
  {
    id: "sunshine",
    name: "Sunshine Beach",
    tagline: "South of the headland.",
    href: "/areas/sunshine",
    image: "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg",
    imageAlt: "Sunshine Beach, looking north toward the headland.",
    accent: "Surf club balcony, village pace, the patrolled sand.",
  },
  {
    id: "peregian",
    name: "Peregian Beach",
    tagline: "Ten minutes south.",
    href: "/areas/peregian",
    image: "https://live.staticflickr.com/8240/8531818425_4f7d65d9e6.jpg",
    imageAlt: "Peregian Beach village, looking back along the patrolled frontage.",
    accent: "Village square, beer garden, holiday-house pace.",
  },
];

export default function AreasPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${SITE.productionUrl}/areas#list`,
      name: "Noosa areas",
      itemListElement: AREAS.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.name,
        url: `${SITE.productionUrl}${a.href}`,
      })),
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* Hero — atmospheric, full-bleed */}
      <section
        aria-label="Noosa areas — overview"
        className="relative w-full overflow-hidden bg-ink-900 h-[60vh] min-h-[420px] max-h-[720px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg"
          alt="Noosa National Park Granite Bay — the coastal walk's defining view, taken from the headland linking all four precincts."
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
          <div className="container-page h-full flex flex-col justify-end pb-12 md:pb-20">
            <p className="eyebrow text-paper-300">Noosa Shire · Areas</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              Four precincts. Pick the rhythm.
            </h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="border-y border-paper-200 bg-paper-100">
        <div className="container-page py-10 md:py-14">
          <p className="lead max-w-2xl text-pretty">
            Noosa Shire runs from beachside suburbs in the east to the
            hinterland in the west. Most visitors pick between four
            precincts — Hastings Street, Noosaville, Sunshine Beach and
            Peregian Beach — each with a different rhythm, a different
            beach, a different kind of morning.
          </p>
        </div>
      </section>

      {/* Area cards — image + label only */}
      <section className="container-page py-14 md:py-20" aria-labelledby="areas-h">
        <h2 id="areas-h" className="sr-only">Noosa areas</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {AREAS.map((a) => (
            <Link
              key={a.id}
              href={a.href}
              className="group block relative overflow-hidden rounded-xl aspect-[4/3] bg-ink-700"
              data-track={`areas_card_${a.id}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.image}
                alt={a.imageAlt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent"
                aria-hidden="true"
              />
              <div className="relative h-full w-full p-5 md:p-6 flex flex-col justify-end">
                <p className="text-body-sm uppercase tracking-wider text-paper-300">
                  {a.tagline}
                </p>
                <h3 className="mt-1 font-display text-display-md text-paper-50 text-balance">
                  {a.name}
                </h3>
                <p className="mt-1 text-body-sm text-paper-200 text-pretty">
                  {a.accent}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
