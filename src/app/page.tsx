import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import {
  HOMEPAGE_HERO,
  HOME_TILES,
  FEATURE_IMAGE,
} from "@/data/photos";
import { HomeHero } from "@/components/HomeHero";
import { ImageTile } from "@/components/ImageTile";

/**
 * Homepage — MSN-2973 cinematic + IA build.
 *
 * Structure (per Albert's D1 brief, ≤250-word primary content budget):
 *   1. Hero band (~88vh) — aspirational sunset + Albert's headline +
 *      subhead + 2 CTAs
 *   2. Six image-led choice tiles — "Make Noosa yours" heading
 *   3. Inspirational feature band — Albert's "Three unforgettable days"
 *      (111 words) + single CTA
 *   4. Trust statement — single line, centred
 *
 * Attribution: stripped from this page per MSN-2973 directive. All
 * photo credits live at /photo-credits, linked from the footer only.
 *
 * Live data: lives at /surf-and-weather; the homepage "Today in Noosa"
 * tile links there but no live tiles render on this page.
 *
 * Body copy budget: ≤250 words visitor-facing primary content (eyebrows,
 * titles, CTAs not counted). Albert's D1 audit: 221 words.
 */
export default async function HomePage() {
  // MSN-2964 — homepage schema.org JSON-LD (Organization, WebSite,
  // BreadcrumbList). Uses SITE.productionUrl so search engines see the
  // canonical https://mynoosaheads.twainent.workers.dev/ host.
  const homeJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE.productionUrl}#organization`,
      name: SITE.brand,
      url: SITE.productionUrl,
      logo: `${SITE.productionUrl}/brand/logo-2.svg`,
      description:
        "An independent guide to Noosa Heads, Queensland. Live surf and weather from BOM and Open-Meteo.",
      email: SITE.email,
      foundingDate: String(SITE.established),
      areaServed: {
        "@type": "Place",
        name: "Noosa Heads, Queensland, Australia",
      },
      sameAs: [
        "https://www.noosa.qld.gov.au/",
        "https://www.visitnoosa.com.au/",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE.productionUrl}#website`,
      url: SITE.productionUrl,
      name: SITE.brand,
      inLanguage: SITE.locale,
      publisher: { "@id": `${SITE.productionUrl}#organization` },
      potentialAction: {
        "@type": "ReadAction",
        target: SITE.productionUrl,
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
      ],
    },
  ];

  // Six tile definitions — first is strongest (Where to stay).
  // Body copy per tile is the 1-sentence description from D1.
  const tiles = [
    {
      key: "whereToStay",
      href: "/accommodation",
      title: "Where to stay",
      body: "Five areas, the right one for the trip you have in mind.",
      image: HOME_TILES.whereToStay,
      emphasis: false,
      dataTrack: "home_tile_stay",
    },
    {
      key: "thingsToDo",
      href: "/things-to-do",
      title: "Things to do",
      body: "A coastal walk, a quiet river, a Hinterland village.",
      image: HOME_TILES.thingsToDo,
      dataTrack: "home_tile_things",
    },
    {
      key: "beachesAndNature",
      href: "/noosa-national-park",
      title: "Beaches & nature",
      body: "Patrolled swimming, headland tracks, koalas in the tallowwoods.",
      image: HOME_TILES.beachesAndNature,
      dataTrack: "home_tile_beaches",
    },
    {
      key: "eatAndDrink",
      href: "/things-to-do#eat-and-drink",
      title: "Eat & drink",
      body: "Hastings Street, Gympie Terrace, Saturday markets.",
      image: HOME_TILES.eatAndDrink,
      dataTrack: "home_tile_eat",
    },
    {
      key: "planYourTrip",
      href: "/things-to-do#itineraries",
      title: "Plan your trip",
      body: "Itineraries, the ferry, getting here.",
      image: HOME_TILES.planYourTrip,
      dataTrack: "home_tile_plan",
    },
    {
      key: "todayInNoosa",
      href: "/surf-and-weather",
      title: "Today in Noosa",
      body: "Surf, wind, tide, UV — refreshed every 30 minutes.",
      image: HOME_TILES.todayInNoosa,
      dataTrack: "home_tile_today",
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={homeJsonLd} />

      {/* ─── 1. Hero band (cinematic, ~88vh) ─── */}
      <HomeHero
        src={HOMEPAGE_HERO.url}
        caption={HOMEPAGE_HERO.caption}
      />

      {/* ─── 2. Six image-led choice tiles — Albert's heading ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="tiles-heading"
      >
        <h2
          id="tiles-heading"
          className="mb-3 font-display text-display-lg md:text-display-lg text-ink-900 text-balance"
        >
          Make Noosa yours
        </h2>
        <p className="mb-8 lead max-w-2xl text-ink-700 text-pretty">
          Six paths into the same place.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((t) => (
            <ImageTile
              key={t.key}
              href={t.href}
              title={t.title}
              body={t.body}
              image={t.image}
              emphasis={t.emphasis}
              dataTrack={t.dataTrack}
              hideAttribution
            />
          ))}
        </div>
      </section>

      {/* ─── 3. Inspirational feature band — Albert's 111-word 3-day plan ─── */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="feature-heading"
      >
        <div className="container-page py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-md aspect-[4/3] bg-paper-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FEATURE_IMAGE.url}
                  alt={FEATURE_IMAGE.caption}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <h2
                id="feature-heading"
                className="font-display text-display-md md:text-display-lg text-ink-900 text-balance"
              >
                Three unforgettable days in Noosa
              </h2>
              <div className="mt-5 max-w-2xl text-body-md text-ink-800 space-y-3 text-pretty">
                <p>
                  <strong className="text-ink-900">Day one —</strong> walk
                  the headland from the surf club to Alexandria Bay, granite
                  and tallowwoods, koalas overhead. Lunch on Hastings
                  Street, a swim at Main Beach, the ferry to Noosaville for
                  sunset on Gympie Terrace.
                </p>
                <p>
                  <strong className="text-ink-900">Day two —</strong> kayak
                  or paddleboard the Noosa River, then south to Peregian
                  for a slow lunch and a quieter stretch of sand. Dinner
                  back on Hastings Street — book ahead in summer.
                </p>
                <p>
                  <strong className="text-ink-900">Day three —</strong>{" "}
                  sunrise on the coastal walk, breakfast at a beachside
                  café, the Saturday market at Tewantin. The Hinterland —
                  Pomona, Cooran, Kin Kin — is thirty minutes up the range
                  and a different temperature.
                </p>
              </div>
              <div className="mt-7">
                <Link
                  href="/things-to-do#itineraries"
                  className="btn-primary btn-md"
                  data-track="home_feature_to_itineraries"
                >
                  See the 7-day itinerary
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Trust statement (Albert's 13-word line) ─── */}
      <section className="bg-paper-50" aria-labelledby="trust-heading">
        <div className="container-page py-10 md:py-14 text-center">
          <p
            id="trust-heading"
            className="text-body-sm text-ink-600 max-w-2xl mx-auto"
          >
            Independent recommendations and clearly marked booking links.
          </p>
        </div>
      </section>
    </div>
  );
}
