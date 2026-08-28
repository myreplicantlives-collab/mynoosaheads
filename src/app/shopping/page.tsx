import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import {
  SHOPPING_CATEGORIES,
  SHOPPING_DISCLOSURE,
  TOTAL_PLACES,
  countBadges,
  type Place,
} from "@/data/shopping";

/**
 * /shopping — MSN-2974.
 *
 * Eight categories × five featured places each. Albert's D1 content
 * (`shopping-page-content.md`), KUBE benchmark — stylist local,
 * visitor-facing. Structure mirrors /accommodation (category cards →
 * featured places → disclosure), minus the booking-engine table.
 *
 * - Hero: eyebrow + H1 + 1-line hook
 * - 8 category cards (anchor grid)
 * - Per category: image + name + hook + 5 place cards
 * - "How we choose" — one short paragraph
 * - Footer line consistent with /things-to-do
 *
 * Monetisation scaffolding (MSN-2964 / MSN-2974 directive 4):
 *   - every outbound retailer link carries `data-track="shopping_<category>_<name>"`
 *   - "Featured" / "Sponsored" badges render conditionally on
 *     `place.badge` being non-null
 *   - until verified IDs land, every `place.badge` is null and no
 *     badges render — see SHOPPING_CATEGORIES data
 *
 * Attribution stripped from rendered HTML per MSN-2973 directive
 * (consistent with the rest of the main journey). The full
 * attribution table is at /photo-credits and linked from the footer.
 *
 * Per Tim's directive: NO new homepage tile, NO new primary nav item.
 * This page is reached via the "Shop Noosa" card on /things-to-do.
 */

export const metadata: Metadata = {
  title: "Shop Noosa · Boutiques, markets and makers",
  description:
    "Eight ways to spend a day with a tote bag in Noosa — from Hastings Street boutiques to the hinterland village markets.",
  alternates: { canonical: "/shopping" },
  openGraph: {
    title: "Shop Noosa · MyNoosaHeads",
    description:
      "Eight ways to spend a day with a tote bag in Noosa — from Hastings Street boutiques to the hinterland village markets.",
    url: "/shopping",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Shop Noosa · MyNoosaHeads",
    description:
      "Eight ways to spend a day with a tote bag in Noosa.",
  },
};

export default async function ShoppingPage() {
  const { featured, sponsored } = countBadges();

  const shoppingJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "@id": `${SITE.productionUrl}/shopping#destination`,
      name: "Noosa Heads",
      description:
        "Eight ways to spend a day with a tote bag in Noosa — from Hastings Street boutiques to the hinterland village markets.",
      url: `${SITE.productionUrl}/shopping`,
      touristType: ["Family", "Couple", "Solo", "Group"],
      address: {
        "@type": "PostalAddress",
        addressRegion: "Queensland",
        addressCountry: "AU",
        addressLocality: "Noosa Heads",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -26.385,
        longitude: 153.091,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: SITE.brand,
          item: SITE.productionUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Things to do",
          item: `${SITE.productionUrl}/things-to-do`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Shop Noosa",
          item: `${SITE.productionUrl}/shopping`,
        },
      ],
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={shoppingJsonLd} />

      {/* ─── 1. Hero band ─── */}
      <section
        className="border-b border-paper-200 bg-paper-50"
        aria-labelledby="shopping-title"
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Shop &amp; markets · Noosa Shire</p>
          <h1
            id="shopping-title"
            className="mt-3 font-display text-display-xl md:text-display-xl text-ink-900 text-balance max-w-4xl"
          >
            Shop Noosa.
          </h1>
          <p className="mt-5 lead max-w-3xl text-pretty">
            Eight ways to spend a day with a tote bag — from Hastings
            Street boutiques to the hinterland markets.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#categories"
              className="btn-primary btn-md"
              data-track="shopping_hero_to_categories"
            >
              See the eight categories
            </Link>
            <Link
              href="/things-to-do"
              className="btn-outline btn-md"
              data-track="shopping_hero_back_to_ttd"
            >
              Back to things to do
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. Category index — 8 cards ─── */}
      <section
        id="categories"
        className="border-b border-paper-200 bg-paper-100"
        aria-labelledby="cats-h"
      >
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Eight ways to spend a day</p>
          <h2
            id="cats-h"
            className="mt-1 font-display text-display-md text-ink-900 text-balance"
          >
            Where to start
          </h2>
          <p className="mt-3 lead max-w-3xl text-pretty">
            Pick a category. Each one jumps to its featured places below.
          </p>
          <ul
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="Eight shopping categories"
          >
            {SHOPPING_CATEGORIES.map((c, idx) => (
              <li key={c.id}>
                <a
                  href={`#${c.anchor}` as `#${string}`}
                  data-track={`shopping_category_${c.id}`}
                  className="group block overflow-hidden rounded-2xl border border-paper-200 bg-paper-50 transition-transform hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-eucalyptus-700"
                >
                  <div className="relative aspect-[4/3] w-full bg-eucalyptus-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image.url}
                      alt={c.image.caption}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/20 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-paper-50">
                      <p className="font-display text-headline-md text-paper-50 text-balance">
                        {String(idx + 1).padStart(2, "0")} · {c.name}
                      </p>
                      <p className="mt-1 text-caption text-paper-100 line-clamp-3">
                        {c.hook.split(".")[0]}.
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── 3. Per-category sections with featured places ─── */}
      {SHOPPING_CATEGORIES.map((c, idx) => (
        <section
          key={c.id}
          id={c.anchor}
          className={[
            "scroll-mt-24",
            idx === 0 ? "border-b border-paper-200" : "",
            idx === SHOPPING_CATEGORIES.length - 1 ? "" : "border-b border-paper-200",
            idx % 2 === 0 ? "bg-paper-50" : "bg-paper-100",
          ].join(" ")}
          aria-labelledby={`${c.anchor}-h`}
        >
          <div className="container-page py-14 md:py-20">
            <p className="eyebrow">{c.eyebrow}</p>
            <h2
              id={`${c.anchor}-h`}
              className="mt-1 font-display text-display-md text-ink-900 text-balance"
            >
              {String(idx + 1).padStart(2, "0")} · {c.name}.
            </h2>
            <p className="mt-3 lead max-w-3xl text-pretty">{c.hook}</p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {c.places.map((p) => (
                <PlaceCard
                  key={`${c.id}-${p.slug}`}
                  categoryId={c.id}
                  place={p}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ─── 4. How we choose ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="how-h"
      >
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">How the picks get made</p>
          <h2
            id="how-h"
            className="mt-1 font-display text-display-md text-ink-900 text-balance"
          >
            What&apos;s in the list and what isn&apos;t.
          </h2>
          <p className="mt-4 max-w-3xl text-body-md text-ink-800 text-pretty">
            {SHOPPING_DISCLOSURE}
          </p>
          <p className="mt-6 text-caption text-ink-600">
            {TOTAL_PLACES} featured places across 8 categories ·
            {" "}
            {featured === 0 && sponsored === 0
              ? "no Featured or Sponsored placements on this page"
              : `${featured} Featured · ${sponsored} Sponsored`}
            .
          </p>
        </div>
      </section>

      {/* ─── 5. Footer line (consistent with /things-to-do) ─── */}
      <section className="bg-paper-50">
        <div className="container-page py-10 md:py-12 text-center">
          <p className="text-body-sm text-ink-600 max-w-2xl mx-auto">
            Every recommendation on this site links to a public source.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ----------------------------------------------------------------------
 * PlaceCard — internal sub-component.
 * Renders a single featured place with conditional Featured / Sponsored
 * badge and the canonical `data-track` analytics wiring (MSN-2964
 * directive B).
 * -------------------------------------------------------------------- */

function PlaceCard({
  categoryId,
  place,
}: {
  categoryId: string;
  place: Place;
}) {
  const trackKey = `shopping_${categoryId}_${place.slug}`;

  return (
    <article
      className="group overflow-hidden rounded-2xl bg-paper-50 shadow-sm ring-1 ring-paper-200 transition-all hover:-translate-y-0.5 hover:shadow-lg"
      data-track={`${trackKey}_card`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-eucalyptus-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={place.image.url}
          alt={place.image.caption}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-transparent to-transparent"
          aria-hidden="true"
        />
        {/* Conditional monetisation badges — MSN-2964 directive B / MSN-2974 §4.
         * Render ONLY when place.badge is non-null. With every entry
         * currently null, no badges render until a verified ID lands. */}
        {place.badge === "Featured" ? (
          <span
            className="badge-featured absolute top-3 left-3 inline-flex items-center rounded-pill bg-eucalyptus-700 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-50 shadow-sm"
            aria-label="Featured placement"
            title="Verified partner placement"
          >
            Featured
          </span>
        ) : null}
        {place.badge === "Sponsored" ? (
          <span
            className="badge-sponsored absolute top-3 left-3 inline-flex items-center rounded-pill bg-ocean-700 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-50 shadow-sm"
            aria-label="Sponsored placement"
            title="Paid placement"
          >
            Sponsored
          </span>
        ) : null}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-paper-50">
          <p className="font-display text-headline-md text-paper-50 text-balance">
            {place.name}
          </p>
          <p className="mt-1 text-caption text-paper-100">
            {place.area} · {place.type}
          </p>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <p className="text-body-sm text-ink-800 text-pretty">
          {place.whyWorthVisiting}
        </p>
        <p className="mt-3 text-caption italic text-ink-600 text-pretty">
          <span className="font-semibold not-italic text-ink-700">
            Best for:
          </span>{" "}
          {place.bestFor}
        </p>
        <p className="mt-2 text-caption text-ink-600 text-pretty">
          <span className="font-semibold text-ink-700">Where:</span>{" "}
          {place.where}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href={place.linkToMore}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-sm"
            data-track={trackKey}
          >
            {place.linkLabel ?? "Find out more"}
            <span aria-hidden="true"> →</span>
          </a>
          {/* Per MSN-2964 directive B — no AffiliateBadge until a
           * programme's participation is verified. The component is
           * imported and available (AffiliateBadge); the gate is
           * simply "don't claim participation". When a verified
           * programme ID lands for a place, render:
           *   <AffiliateBadge programme="..." />
           * next to the CTA. */}
        </div>
      </div>
    </article>
  );
}