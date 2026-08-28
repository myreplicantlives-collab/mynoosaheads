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
 * Homepage — MSN-2973 cinematic + KUBE atmospheric.
 *
 * Structure (per Albert's D1 brief + KUBE Saint-Tropez cues):
 *   1. Hero band (~88vh) — single poetic headline + 2 CTAs, image
 *      dominates the overlay
 *   2. Six image-led choice tiles — no section heading (KUBE-style:
 *      let the tiles speak). "Where to stay" is the primary, with
 *      a stronger ring/badge per KUBE pattern.
 *   3. Inspirational feature band — single image + atmospheric
 *      3-bullet itinerary. "Three unforgettable days" header.
 *   4. Trust statement — single line.
 *
 * Attribution stripped from rendered HTML. Full credit at /photo-credits.
 *
 * Word count target: ≤250 visitor-facing primary content.
 */
export default async function HomePage() {
  // MSN-2964 — homepage schema.org JSON-LD.
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

  // Six tiles — KUBE atmospheric hooks. "Where to stay" is the
  // primary commercial anchor (emphasis: true).
  const tiles = [
    {
      key: "whereToStay",
      href: "/accommodation",
      title: "Where to stay",
      body: "Hastings Street at dawn.",
      image: HOME_TILES.whereToStay,
      emphasis: true,
      dataTrack: "home_tile_stay",
    },
    {
      key: "thingsToDo",
      href: "/things-to-do",
      title: "Things to do",
      body: "Where the river runs slow.",
      image: HOME_TILES.thingsToDo,
      dataTrack: "home_tile_things",
    },
    {
      key: "beachesAndNature",
      href: "/noosa-national-park",
      title: "Beaches & nature",
      body: "The headland walk at first light.",
      image: HOME_TILES.beachesAndNature,
      dataTrack: "home_tile_beaches",
    },
    {
      key: "eatAndDrink",
      href: "/things-to-do#eat-and-drink",
      title: "Eat & drink",
      body: "Long lunches on Hastings.",
      image: HOME_TILES.eatAndDrink,
      dataTrack: "home_tile_eat",
    },
    {
      key: "planYourTrip",
      href: "/things-to-do#itineraries",
      title: "Plan your trip",
      body: "Three unforgettable days.",
      image: HOME_TILES.planYourTrip,
      dataTrack: "home_tile_plan",
    },
    {
      key: "todayInNoosa",
      href: "/surf-and-weather",
      title: "Today in Noosa",
      body: "What the coast is doing right now.",
      image: HOME_TILES.todayInNoosa,
      dataTrack: "home_tile_today",
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={homeJsonLd} />

      {/* ─── 1. Hero band (cinematic, atmospheric, ~88vh) ───
       *
       * MSN-2975 perf chunk 2: HOMEPAGE_HERO is now self-hosted under
       * /photos/. srcSet is plumbed through HomeHero → next/image so
       * the browser picks the best WebP variant from `sizes="100vw"`. */}
      <HomeHero src={HOMEPAGE_HERO.url} srcSet={HOMEPAGE_HERO.srcSet} />

      {/* ─── 2. Six image-led choice tiles — no heading (KUBE) ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="tiles-heading"
      >
        <h2 id="tiles-heading" className="sr-only">
          Choose your Noosa
        </h2>
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

      {/* ─── 3. Inspirational feature band — atmospheric, image + bullets ─── */}
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
                  alt="Sunrise over Laguna Bay from the Noosa headland coastal walk."
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
                Three unforgettable days.
              </h2>
              <ol className="mt-7 max-w-2xl space-y-5 list-none">
                <li className="flex gap-4">
                  <span className="font-display text-eucalyptus-700 shrink-0 text-display-sm leading-none mt-1">
                    1
                  </span>
                  <p className="text-body-md text-ink-800 text-pretty">
                    <strong className="text-ink-900">The headland.</strong>{" "}
                    Walk from the surf club to Alexandria Bay at sunrise —
                    granite, tallowwoods, koalas overhead. Lunch on Hastings
                    Street, a swim at Main Beach, the ferry to Noosaville for
                    sunset on Gympie Terrace.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="font-display text-eucalyptus-700 shrink-0 text-display-sm leading-none mt-1">
                    2
                  </span>
                  <p className="text-body-md text-ink-800 text-pretty">
                    <strong className="text-ink-900">The river.</strong>{" "}
                    Kayak or paddleboard the Noosa River, then south to
                    Peregian for a slow lunch. Dinner back on Hastings —
                    book ahead in summer.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="font-display text-eucalyptus-700 shrink-0 text-display-sm leading-none mt-1">
                    3
                  </span>
                  <p className="text-body-md text-ink-800 text-pretty">
                    <strong className="text-ink-900">The hinterland.</strong>{" "}
                    Sunrise on the coastal walk, the Saturday market at
                    Tewantin, then Pomona, Cooran, Kin Kin — thirty minutes
                    up the range, a different temperature.
                  </p>
                </li>
              </ol>
              <div className="mt-8">
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

      {/* ─── 4. Trust statement (single line) ─── */}
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
