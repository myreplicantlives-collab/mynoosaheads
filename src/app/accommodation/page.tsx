import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import {
  ACCOMMODATION_DATA,
  ON_PAGE_DISCLOSURE_TEXT,
} from "@/data/accommodation";

/**
 * /accommodation — MSN-2973 curated rebuild.
 *
 * Per Albert's D2 brief:
 *   1. Hero with eyebrow + headline + subhead
 *   2. 5 area cards (Hastings, Noosa Sound, Noosaville, Sunshine,
 *      Peregian) — clickable, jump to area detail section
 *   3. 10 curated property picks (not a 37-listing database)
 *   4. 5 property category chips (Family, Luxury, Beachfront, Value,
 *      Long-stay) — anchor links
 *   5. "How we choose" — one short paragraph
 *   6. Engine area-search catch-all — Booking.com / Stayz / Airbnb
 *
 * Removed (per Tim's directive):
 *   - 3-question decision helper (over-engineered)
 *   - 3-day / 5-day / 7-day itinerary section (moves to /things-to-do
 *     under the "Plan your trip" feature)
 *   - Weather / live-data section (moves to /surf-and-weather)
 *   - Comparison matrix (5-card area selector replaces it)
 *
 * Attribution stripped from rendered HTML per MSN-2973 directive.
 * Full credit table at /photo-credits, linked from the footer.
 */

export const metadata: Metadata = {
  title: "Where to stay in Noosa · Accommodation guide",
  description:
    "Ten curated properties across five Noosa areas. Links to Booking.com, Stayz, Airbnb and Expedia.",
  alternates: { canonical: "/accommodation" },
  openGraph: {
    title: "Where to stay in Noosa · MyNoosaHeads",
    description:
      "Ten curated properties across five Noosa areas.",
    url: "/accommodation",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Where to stay in Noosa · MyNoosaHeads",
    description:
      "Ten curated properties across five Noosa areas.",
  },
};

export default async function AccommodationPage() {
  const { areas, curatedProperties, categories, disclosure } = ACCOMMODATION_DATA;

  const accommodationJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "@id": `${SITE.productionUrl}/accommodation#destination`,
      name: "Noosa Heads",
      description:
        "Ten curated properties across five Noosa areas — Hastings Street, Noosa Sound, Noosaville, Sunshine Beach and Peregian. Links to Booking.com, Stayz, Airbnb and Expedia.",
      url: `${SITE.productionUrl}/accommodation`,
      touristType: ["Family", "Couple", "Surfer", "Group", "Long-stay"],
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
          name: "Accommodation",
          item: `${SITE.productionUrl}/accommodation`,
        },
      ],
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={accommodationJsonLd} />

      {/* ─── 1. Hero band ─── */}
      <section
        className="border-b border-paper-200 bg-paper-50"
        aria-labelledby="accommodation-title"
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Where to stay · Noosa Shire</p>
          <h1
            id="accommodation-title"
            className="mt-3 font-display text-display-xl md:text-display-xl text-ink-900 text-balance max-w-4xl"
          >
            Where to stay in Noosa.
          </h1>
          <p className="mt-5 lead max-w-3xl text-pretty">
            Five areas across the shire — Hastings Street, Noosa Sound,
            Noosaville, Sunshine Beach, Peregian. Pick the area that
            fits the trip, then find the property.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#six-areas"
              className="btn-primary btn-md"
              data-track="accommodation_hero_to_areas"
            >
              See the areas
            </Link>
            <Link
              href="#curated-picks"
              className="btn-outline btn-md"
              data-track="accommodation_hero_to_picks"
            >
              See the curated picks
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. Area selector (5 cards) ─── */}
      <section
        id="six-areas"
        className="container-page py-14 md:py-20"
        aria-labelledby="areas-h"
      >
        <p className="eyebrow">Five areas across the shire</p>
        <h2
          id="areas-h"
          className="mt-1 font-display text-display-md text-ink-900 text-balance"
        >
          Pick the area first
        </h2>
        <p className="mt-3 lead max-w-3xl text-pretty">
          The shire runs from beachside suburbs in the east to small
          inland villages in the west. For accommodation, the five
          areas that matter most for visitors. Order is the order a
          visitor thinks about it — walkability first, then river,
          then surf, then quiet.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <a
              key={a.id}
              href={`#${a.anchor}` as `#${string}`}
              data-track={`accommodation_area_${a.id}`}
              className="group block overflow-hidden rounded-2xl border border-paper-200 bg-paper-50 transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-eucalyptus-700"
            >
              <div className="relative aspect-[4/3] w-full bg-eucalyptus-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.photo.url}
                  alt={a.photo.caption}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-paper-50">
                  <p className="font-display text-headline-lg text-paper-50 text-balance">
                    {a.name}
                  </p>
                  <p className="mt-1 text-caption text-paper-100 line-clamp-3">
                    {a.pitch}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-body-sm text-ink-700">
                  <span className="font-semibold text-ink-900">Best for:</span>{" "}
                  {a.bestFor}
                </p>
                <p className="mt-3 text-body-sm font-medium text-eucalyptus-700 group-hover:underline">
                  See the area →
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ─── 3. Curated property selection (10 picks) ─── */}
      <section
        id="curated-picks"
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="picks-h"
      >
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Ten curated picks</p>
          <h2
            id="picks-h"
            className="mt-1 font-display text-display-md text-ink-900 text-balance"
          >
            The properties visitors actually consider
          </h2>
          <p className="mt-3 lead max-w-3xl text-pretty">
            Not 37 listings — a curated ten. Each card carries a
            &quot;best for&quot; tag, the key benefits, an indicative
            rating, and a single link to check live availability on
            the operator&apos;s third-party booking engine.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {curatedProperties.map((p, idx) => (
              <article
                key={p.name}
                id={`pick-${idx + 1}`}
                className="card p-6 flex flex-col h-full"
                data-track={`accommodation_pick_${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="eyebrow">{p.bestFor}</p>
                    <h3 className="mt-1 font-display text-headline-lg text-ink-900 text-balance">
                      {p.name}
                    </h3>
                  </div>
                  <span className="pill-disclosure shrink-0 mt-1">
                    {p.rating.split(" · ")[0]}
                  </span>
                </div>
                <p className="mt-3 text-body-md text-ink-800 text-pretty">
                  {p.rationale}
                </p>
                <p className="mt-3 text-caption text-ink-700">
                  <span className="font-semibold text-ink-900">Area:</span>{" "}
                  {areas.find((a) => a.id === p.areaId)?.name ?? p.areaId} ·
                  {" "}
                  <span className="font-semibold text-ink-900">Rating:</span>{" "}
                  {p.rating}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 pt-4 mt-auto border-t border-paper-200">
                  <a
                    href={p.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-sm"
                    data-track={`accommodation_pick_cta_${idx + 1}`}
                  >
                    Check availability
                    <span aria-hidden="true"> →</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Property categories (5 anchor chips) ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="categories-h"
      >
        <p className="eyebrow">By property type</p>
        <h2
          id="categories-h"
          className="mt-1 font-display text-display-md text-ink-900 text-balance"
        >
          Five ways to pick a property
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <a
              key={cat.key}
              href={`#pick-${cat.picks[0]}` as `#pick-${string}`}
              className="card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500"
              data-track={`accommodation_category_${cat.key}`}
            >
              <h3 className="font-display text-headline-md text-ink-900">
                {cat.label}
              </h3>
              <p className="mt-2 text-body-sm text-ink-700">
                {cat.description}
              </p>
              <p className="mt-3 text-caption text-eucalyptus-700">
                See picks {cat.picks.join(", ")} →
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ─── 5. How we choose (one short paragraph) ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="how-h"
      >
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">How we choose</p>
          <h2
            id="how-h"
            className="mt-1 font-display text-display-md text-ink-900 text-balance"
          >
            Where this list comes from
          </h2>
          <p className="mt-4 max-w-3xl text-body-md text-ink-800 text-pretty">
            {disclosure}
          </p>
        </div>
      </section>

      {/* ─── 6. Engine area-search (catch-all for undecided visitors) ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="engine-search-h"
      >
        <p className="eyebrow">Browse by engine</p>
        <h2
          id="engine-search-h"
          className="mt-1 font-display text-display-md text-ink-900 text-balance"
        >
          Search every area at once
        </h2>
        <p className="mt-3 lead max-w-3xl text-pretty">
          For visitors who don&apos;t want a curated pick — area-search
          links straight into the booking engines.
        </p>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="border-b-2 border-paper-300">
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Area
                </th>
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Booking.com
                </th>
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Stayz
                </th>
                <th scope="col" className="py-3 font-display text-headline-md text-ink-900">
                  Airbnb
                </th>
              </tr>
            </thead>
            <tbody>
              {areas.map((a) => (
                <tr key={a.id} className="border-b border-paper-200 align-top">
                  <td className="py-3 pr-4 text-ink-900 font-medium">{a.name}</td>
                  <td className="py-3 pr-4">
                    <a
                      href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(a.name + " Noosa Hotels")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link text-ocean-700"
                      data-track={`engine_booking_${a.id}`}
                    >
                      Search →
                    </a>
                  </td>
                  <td className="py-3 pr-4">
                    <a
                      href={`https://www.stayz.com.au/holiday-rental-search?query=${encodeURIComponent(a.name + " holiday houses")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link text-ocean-700"
                      data-track={`engine_stayz_${a.id}`}
                    >
                      Search →
                    </a>
                  </td>
                  <td className="py-3">
                    {a.id === "peregian" ? (
                      <a
                        href="https://www.airbnb.com.au/s/Peregian-Beach-Queensland-Australia/homes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link text-ocean-700"
                        data-track={`engine_airbnb_${a.id}`}
                      >
                        Search →
                      </a>
                    ) : (
                      <span className="text-ink-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
