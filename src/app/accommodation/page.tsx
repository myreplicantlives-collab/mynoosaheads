import type { Metadata } from "next";
import Link from "next/link";
import {
  Button,
  Icons,
  JsonLd,
} from "@/components/ui";
import { fetchLiveBundle } from "@/lib/live-data";
import { CATEGORY_PHOTOS } from "@/data/photos";
import { SITE } from "@/data/site";
import {
  ACCOMMODATION_DATA,
  ON_PAGE_DISCLOSURE_TEXT,
  DATA_GENERATED_AT,
} from "@/data/accommodation";
import { AreaSelector } from "@/components/accommodation/AreaSelector";
import { AreaComparison } from "@/components/accommodation/AreaComparison";
import { AreaDetail } from "@/components/accommodation/AreaDetail";
import { PropertyGrid } from "@/components/accommodation/PropertyGrid";
import { Itineraries } from "@/components/accommodation/Itineraries";
import { DecisionHelper } from "@/components/accommodation/DecisionHelper";

/**
 * /accommodation — MSN-2965 rebuild.
 *
 * Page structure (visitor-first):
 *   1. Hero band (small) — "Where to stay in Noosa" + 1-line promise
 *   2. Area selector — 5 clickable cards
 *   3. Comparison matrix — fit per profile (beachfront, family, ...)
 *   4. Why each area (per-area detail blocks with photo + copy)
 *   5. Property grid — filterable by area + booking engine
 *   6. Decision helper — 3-question quiz → recommended area
 *   7. Itineraries — 3-day, 5-day, 7-day
 *   8. Disclosure — ACCC Schedule 2 statement
 *   9. Footer (rendered by SiteFooter in root layout)
 *
 * Server-rendered page; client islands (AreaComparison is server,
 * PropertyGrid / Itineraries / DecisionHelper are client for state).
 */

export const metadata: Metadata = {
  title: "Where to stay in Noosa · Accommodation guide",
  description:
    "Links to Booking.com, Stayz, Airbnb and Expedia. Five areas, six-to-eight verified properties each.",
  alternates: { canonical: "/accommodation" },
  openGraph: {
    title: "Where to stay in Noosa · MyNoosaHeads",
    description:
      "Links to Booking.com, Stayz, Airbnb and Expedia. Five areas, six-to-eight verified properties each.",
    url: "/accommodation",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Where to stay in Noosa · MyNoosaHeads",
    description:
      "Where to stay in Noosa: five areas, six-to-eight verified properties each.",
  },
};

export default async function AccommodationPage() {
  const live = await fetchLiveBundle();

  const { areas, itineraries, decisionHelper, disclosure } = ACCOMMODATION_DATA;

  // Same TouristDestination + BreadcrumbList JSON-LD as MSN-2964. We
  // do NOT own a real LodgingBusiness (we are a publisher, not a
  // hotel). TouristDestination + description is the safest declaration
  // for an editorial accommodation guide.
  const accommodationJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "@id": `${SITE.productionUrl}/accommodation#destination`,
      name: "Noosa Heads",
      description:
        "Noosa Heads is a coastal destination on the Sunshine Coast, Queensland. Accommodation ranges from Hastings Street hotels to Noosaville apartments and North Shore houseboats.",
      url: `${SITE.productionUrl}/accommodation`,
      touristType: ["Family", "Surfer", "Couple", "Group"],
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

      {/* ─── 1. Hero band (small) ─── */}
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
            Five areas, six to eight verified properties each. Pick the
            area that fits the trip, then pick the property. Every
            property tile has a short reason for being listed and links
            to the third-party booking engine (Booking.com, Stayz,
            Expedia, or Airbnb) where you can check live availability.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              href="#area-selector"
              variant="primary"
              size="md"
              trailingIcon={
                <span className="rotate-90 inline-block" aria-hidden="true">
                  <Icons.ChevronRight size={14} />
                </span>
              }
              data-track="accommodation_hero_to_selector"
            >
              See the areas
            </Button>
            <Button
              href="#decision-helper"
              variant="outline"
              size="md"
              data-track="accommodation_hero_to_helper"
            >
              Still not sure? Take the quiz
            </Button>
          </div>
        </div>
      </section>

      {/* ─── 2. Area selector (5 cards) ─── */}
      <section
        id="area-selector"
        className="container-page py-14 md:py-20"
        aria-labelledby="area-selector-h"
      >
        <p className="eyebrow">Five areas, click to expand</p>
        <h2
          id="area-selector-h"
          className="mt-1 font-display text-display-md text-ink-900 text-balance"
        >
          Five areas to choose from
        </h2>
        <p className="mt-3 lead max-w-3xl">
          The shire runs from beachside suburbs in the east to small
          inland villages in the west. For accommodation, the five areas
          that matter most for visitors are Hastings Street, Noosaville,
          Noosa Sound, Sunshine Beach, and Peregian. Pick one to see
          its profile, internal links, and the booking-engine options.
        </p>
        <div className="mt-10">
          <AreaSelector areas={areas} />
        </div>
      </section>

      {/* ─── 3. Comparison matrix ─── */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="matrix-h"
      >
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Side-by-side fit</p>
          <h2
            id="matrix-h"
            className="mt-1 font-display text-display-md text-ink-900 text-balance"
          >
            Fit per trip profile
          </h2>
          <p className="mt-3 lead max-w-3xl">
            A single fit score per trip profile. Two stars means a
            strong fit; one star is a partial fit; an em-dash is not
            the call. Click any area name to jump to its detail.
          </p>
          <div className="mt-8">
            <AreaComparison areas={areas} />
          </div>
        </div>
      </section>

      {/* ─── 4. Why each area (per-area detail blocks) ─── */}
      <div>
        {areas.map((a, i) => (
          <div
            key={a.id}
            className={i % 2 === 1 ? "bg-paper-100" : ""}
            id={a.anchor}
          >
            <AreaDetail area={a} index={i} />
          </div>
        ))}
      </div>

      {/* ─── 5. Property grid (filterable by area + engine) ─── */}
      <section
        id="property-grid"
        className="border-t border-paper-200 bg-paper-50"
        aria-labelledby="property-grid-h"
      >
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">All properties across all areas</p>
          <h2
            id="property-grid-h"
            className="mt-1 font-display text-display-md text-ink-900 text-balance"
          >
            All properties ({areas.reduce((n, a) => n + a.properties.length, 0)}{" "}
            properties)
          </h2>
          <p className="mt-3 lead max-w-3xl">
            Filter by area, by booking engine, or look at the whole
            list. Each property carries a short reason for being listed;
            the booking link goes to the engine where the property is
            listed.
          </p>
          <div className="mt-10" id="property-grid-mount">
            <PropertyGrid areas={areas} />
          </div>
          <p className="mt-8 text-caption text-ink-600">
            Property data last reviewed {DATA_GENERATED_AT} ·{" "}
            {disclosure.length < 1000
              ? `Disclosure: ${disclosure.slice(0, 240)}…`
              : null}
          </p>
        </div>
      </section>

      {/* ─── 5b. Property categories — visitor mental models (MSN-2972 / D3 §2)
       *  Five anchor sections: Family / Luxury / Beachfront / Budget /
       *  Long-stay. Each anchors to a filter on the property grid above. */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="categories-h"
      >
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">By property type</p>
          <h2
            id="categories-h"
            className="mt-1 font-display text-display-md text-ink-900 text-balance"
          >
            Five ways to pick a property
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="#family"
              className="card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500"
              data-track="accommodation_category_family"
            >
              <h3 className="font-display text-headline-md text-ink-900">Family</h3>
              <p className="mt-2 text-body-sm text-ink-700">
                Apartments and resorts with pools, kitchens and room for everyone.
              </p>
            </a>
            <a
              href="#luxury"
              className="card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500"
              data-track="accommodation_category_luxury"
            >
              <h3 className="font-display text-headline-md text-ink-900">Luxury</h3>
              <p className="mt-2 text-body-sm text-ink-700">
                Hastings Street and waterfront — full-service resorts and designer villas.
              </p>
            </a>
            <a
              href="#beachfront"
              className="card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500"
              data-track="accommodation_category_beachfront"
            >
              <h3 className="font-display text-headline-md text-ink-900">Beachfront</h3>
              <p className="mt-2 text-body-sm text-ink-700">
                On the sand or across the road — Main Beach, Sunshine Beach and Peregian.
              </p>
            </a>
            <a
              href="#budget"
              className="card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500"
              data-track="accommodation_category_budget"
            >
              <h3 className="font-display text-headline-md text-ink-900">Budget</h3>
              <p className="mt-2 text-body-sm text-ink-700">
                Motels on Gympie Terrace, holiday houses in Peregian, hostels near the headland.
              </p>
            </a>
            <a
              href="#long-stay"
              className="card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500"
              data-track="accommodation_category_long_stay"
            >
              <h3 className="font-display text-headline-md text-ink-900">Long-stay</h3>
              <p className="mt-2 text-body-sm text-ink-700">
                Self-contained apartments and houses with kitchens — week-long rates available.
              </p>
            </a>
            <div className="card p-6 bg-paper-200/40 border-dashed">
              <h3 className="font-display text-headline-md text-ink-900">Where everything is</h3>
              <p className="mt-2 text-body-sm text-ink-700">
                Hastings Street at the north, Noosa Sound and Noosaville along
                the river, Sunshine Beach to the south, Peregian and Marcus
                Beach further south still. Tap a marker for the area guide.
              </p>
              <p className="mt-3 text-caption text-ink-600">
                Map placeholder — interactive map lands in a follow-up release.
              </p>
            </div>
          </div>

          {/* ─── 5c. How we choose (D3 §3) ─── */}
          <div className="mt-14 pt-10 border-t border-paper-200">
            <p className="eyebrow">How we choose</p>
            <h3 className="mt-1 font-display text-headline-lg text-ink-900 text-balance">
              Where this list comes from
            </h3>
            <p className="mt-4 max-w-3xl text-body-md text-ink-800 text-pretty">
              We list properties that are currently trading, in the areas where
              visitors actually stay. We link to the booking engines that
              carry them — Booking.com, Stayz, Airbnb and Expedia — rather
              than taking inventory ourselves. Some links earn us a
              commission; all are marked Affiliate before you click. The full
              statement is in the footer.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 6. Decision helper ─── */}
      <section
        id="decision-helper"
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="decision-h"
      >
        <div className="container-page py-14 md:py-20">
          <DecisionHelper areas={areas} questions={decisionHelper} />
        </div>
      </section>

      {/* ─── 7. Itineraries ─── */}
      <section
        className="border-t border-paper-200 bg-paper-50"
        aria-labelledby="itineraries-h"
      >
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">How long are you here?</p>
          <h2
            id="itineraries-h"
            className="mt-1 font-display text-display-md text-ink-900 text-balance"
          >
            Suggested itineraries
          </h2>
          <p className="mt-3 lead max-w-3xl">
            Pick a length. The plan tells you where to stay on each
            night and why.
          </p>
          <div className="mt-10">
            <Itineraries itineraries={itineraries} areas={areas} />
          </div>
        </div>
      </section>

      {/* ─── 8. Disclosure ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="accc-disclosure-heading"
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Disclosure (ACCC Sch 2)</p>
          <h2
            id="accc-disclosure-heading"
            className="mt-1 font-display text-display-sm text-ink-900 text-balance max-w-3xl"
          >
            Affiliate links earn us a small commission — at no cost to you.
          </h2>
          <p className="mt-4 max-w-4xl text-body text-ink-800 text-pretty">
            {disclosure}
          </p>
          <p className="mt-6 text-caption text-ink-600 max-w-4xl">
            See the{" "}
            <Link href="#affiliate-disclosure" className="link text-ocean-700">
              Legal column in the footer
            </Link>{" "}
            for the full statement, including the verified affiliate
            programme list, per the Competition and Consumer Act 2010 (Cth)
            Schedule 2.
          </p>
        </div>
      </section>

      {/* ─── 9. Live data strip (kept for the MSN-2965 brief's
       * accommodation-page weather tile; P0 safety fix from the same
       * mission has strengthened the tide label to "Sea level (approx.)"
       * and disallowed it as a navigational source). */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="weather-h"
      >
        <div className="container-page py-12">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="eyebrow">Today’s conditions</p>
              <h2 id="weather-h" className="mt-1 font-display text-display-sm text-ink-900">
                Useful if you’re checking in late
              </h2>
            </div>
            <p className="text-caption text-ink-600">
              as of{" "}
              <time dateTime={live.asOf}>
                {new Date(live.asOf).toLocaleString("en-AU", {
                  timeZone: "Australia/Brisbane",
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "short",
                })}
              </time>{" "}
              AEST
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-surface p-5">
              <p className="eyebrow">Surf</p>
              <p className="font-display text-display-sm text-ink-900 mt-1">
                {live.surf.value}
              </p>
              <p className="mt-1 text-caption text-ink-700">{live.surf.secondary}</p>
            </div>
            <div className="card-surface p-5">
              <p className="eyebrow">Wind</p>
              <p className="font-display text-display-sm text-ink-900 mt-1">
                {live.wind.value}
              </p>
              <p className="mt-1 text-caption text-ink-700">{live.wind.secondary}</p>
            </div>
            <div className="card-surface p-5">
              <p className="eyebrow">Sea level (approx.)</p>
              <p className="font-display text-display-sm text-ink-900 mt-1">
                {live.tide.value}
              </p>
              <p className="mt-1 text-caption text-ink-700">{live.tide.secondary}</p>
            </div>
            <div className="card-surface p-5">
              <p className="eyebrow">UV</p>
              <p className="font-display text-display-sm text-ink-900 mt-1">
                {live.uv.value}
              </p>
              <p className="mt-1 text-caption text-ink-700">{live.uv.secondary}</p>
            </div>
          </div>
          <p className="mt-4 text-caption text-ink-600">
            Tiles from BOM Southeast Coast + Open-Meteo. {live.sourceNote}{" "}
            <span className="font-medium text-ink-700">
              For bar crossings always defer to the MSQ Noosa bar report
              and the Noosa Coast Guard broadcast (VHF 16 / 67) — this
              site is a planning tool, not a navigational authority.
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
