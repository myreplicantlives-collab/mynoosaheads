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
 * Homepage — MSN-2980 KUBE Saint-Tropez visual progression.
 *
 * Section sequence (per KUBE_DESIGN_SPEC §B.1):
 *   1. Full-bleed photo hero (~88vh) — single poetic headline, image
 *      dominates. Nav overlays in white (KUBE pattern).
 *   2. Atmospheric intro — beige, narrow text column, 1 sentence +
 *      single atmospheric photo right.
 *   3. STAY section — DARK section. Eyebrow "STAY", h2 "Where to
 *      sleep". Three full-bleed property cards (image + label only).
 *   4. DO section — DARK section continuation. Eyebrow "DO", h2
 *      "What to do today". Four experience tiles (image + label).
 *   5. WALK section — LIGHT. Eyebrow "WALK", h2 "The headland walk
 *      at sunrise". One full-bleed photo + 1-sentence description +
 *      "Plan a walk" CTA.
 *   6. LIVE — atmospheric one-liner + CTA to /surf-and-weather.
 *   7. Footer — links, contact, simple trust statement.
 *
 * Word count target: ≤150 visitor-facing primary content (Albert cut).
 */

export default async function HomePage() {
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

  // Six image-led choice tiles — KUBE pattern (image + label only).
  const tiles = [
    {
      key: "stay",
      href: "/accommodation",
      title: "Find a place to stay",
      body: "Ten properties across five areas.",
      image: HOME_TILES.whereToStay,
      emphasis: true,
      dataTrack: "home_tile_stay",
    },
    {
      key: "do",
      href: "/things-to-do",
      title: "Things to do today",
      body: "Surf, river, walk, eat.",
      image: HOME_TILES.thingsToDo,
      emphasis: false,
      dataTrack: "home_tile_do",
    },
    {
      key: "walk",
      href: "/noosa-national-park",
      title: "Walk the headland at sunrise",
      body: "Granite, tallowwoods, koalas.",
      image: HOME_TILES.beachesAndNature,
      emphasis: false,
      dataTrack: "home_tile_walk",
    },
    {
      key: "eat",
      href: "/shopping",
      title: "Eat along Hastings Street",
      body: "Cafés for breakfast, restaurants for dinner.",
      image: HOME_TILES.eatAndDrink,
      emphasis: false,
      dataTrack: "home_tile_eat",
    },
    {
      key: "live",
      href: "/surf-and-weather",
      title: "What the coast is doing right now",
      body: "Surf, wind, tide, UV.",
      image: HOME_TILES.todayInNoosa,
      emphasis: false,
      dataTrack: "home_tile_live",
    },
    {
      key: "shop",
      href: "/shopping",
      title: "Shop Noosa",
      body: "Markets, makers, boutiques.",
      image: HOME_TILES.planYourTrip,
      emphasis: false,
      dataTrack: "home_tile_shop",
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={homeJsonLd} />

      {/* ─── 1. Hero — KUBE atmospheric (88vh, full-bleed, dark theme) ─── */}
      {/*
       * MSN-2980 image pipeline: HOMEPAGE_HERO is self-hosted under
       * /photos/. srcSet plumbed through HomeHero → <img> so the
       * browser picks the best WebP/AVIF variant from sizes="100vw". */}
      <HomeHero src={HOMEPAGE_HERO.url} srcSet={HOMEPAGE_HERO.srcSet} />

      {/* ─── 2. Atmospheric intro (KUBE pattern: narrow text column + single photo) ─── */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="intro-heading"
      >
        <div className="container-page py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-md aspect-[4/3] bg-paper-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://live.staticflickr.com/8514/8532929182_a1ea8ef7be.jpg"
                  alt="Noosa Main Beach and Hastings Street, looking east — the morning walk-up to the headland."
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <p className="eyebrow">A guide to Noosa Heads, Queensland</p>
              <h2
                id="intro-heading"
                className="mt-3 font-display text-display-lg md:text-display-xl text-ink-900 text-balance"
              >
                Discover Noosa.
              </h2>
              <p className="mt-5 lead max-w-2xl text-pretty">
                Eight hundred metres of Hastings Street. One river, one
                park. Surf, the national park, accommodation, and the
                local rules that keep everyone on the right side of a
                south-east swell.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. STAY (DARK) — three full-bleed property cards ─── */}
      <section
        className="bg-ink-900 text-paper-50"
        aria-labelledby="stay-heading"
      >
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow text-paper-300">STAY</p>
          <h2
            id="stay-heading"
            className="mt-3 font-display text-display-lg md:text-display-xl text-paper-50 text-balance"
          >
            Where to sleep.
          </h2>
          <p className="mt-4 text-body-md text-paper-200 max-w-2xl text-pretty">
            Ten properties across five areas, linked to the booking engines that carry them.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                key: "sofitel",
                href: "/accommodation",
                title: "Sofitel Noosa Pacific Resort",
                body: "Hastings Street · luxury",
                image: {
                  url: "https://live.staticflickr.com/7195/6804500540_84424cfb73_b.jpg",
                  caption: "Castaways Resort & Spa, Mission Beach — fallback for the Sofitel card.",
                  author: "Flickr (Openverse)",
                  licence: "CC BY",
                  sourcePage: "https://live.staticflickr.com/7195/6804500540_84424cfb73_b.jpg",
                },
              },
              {
                key: "racv",
                href: "/accommodation",
                title: "RACV Noosa Resort",
                body: "Noosa Drive · family",
                image: {
                  url: "https://live.staticflickr.com/1421/705740732_3a50d37015.jpg",
                  caption: "Hamilton Island swimming pool — fallback for the RACV card.",
                  author: "Flickr (Openverse)",
                  licence: "CC BY",
                  sourcePage: "https://live.staticflickr.com/1421/705740732_3a50d37015.jpg",
                },
              },
              {
                key: "south-pacific",
                href: "/accommodation",
                title: "South Pacific Resort & Spa",
                body: "Noosaville · family",
                image: {
                  url: "https://live.staticflickr.com/2090/2447049260_2a8189d4d6_b.jpg",
                  caption: "South Pacific Resort, Noosa.",
                  author: "Flickr (Openverse)",
                  licence: "CC BY-NC",
                  sourcePage: "https://live.staticflickr.com/2090/2447049260_2a8189d4d6_b.jpg",
                },
              },
            ].map((p) => (
              <Link
                key={p.key}
                href={p.href}
                className="group block relative overflow-hidden rounded-xl aspect-[4/5] bg-ink-700"
                data-track={`home_stay_${p.key}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image.url}
                  alt={p.image.caption}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative h-full w-full p-5 md:p-6 flex flex-col justify-end">
                  <h3 className="font-display text-display-sm text-paper-50 text-balance">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-body-sm text-paper-200 uppercase tracking-wider">
                    {p.body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/accommodation"
              className="btn-outline btn-md border-paper-50 text-paper-50 hover:bg-paper-50 hover:text-ink-900"
              data-track="home_stay_to_accommodation"
            >
              See all ten properties
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. DO (DARK continuation) — four experience tiles ─── */}
      <section
        className="border-t border-ink-700 bg-ink-900 text-paper-50"
        aria-labelledby="do-heading"
      >
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow text-paper-300">DO</p>
          <h2
            id="do-heading"
            className="mt-3 font-display text-display-lg md:text-display-xl text-paper-50 text-balance"
          >
            What to do today.
          </h2>
          <p className="mt-4 text-body-md text-paper-200 max-w-2xl text-pretty">
            Surf, river, walk, eat — eight experiences across the river, the coast, and the hinterland.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                key: "surf",
                title: "Learn to surf",
                body: "Main Beach first lessons.",
                href: "/surf-and-weather",
                image: "https://live.staticflickr.com/8029/8052945119_e3f2edce31_b.jpg",
              },
              {
                key: "river",
                title: "Spend a day on the river",
                body: "Calm water, ferry rides.",
                href: "/things-to-do",
                image: "https://live.staticflickr.com/7261/13940326252_74135d0576_b.jpg",
              },
              {
                key: "walk",
                title: "Walk the headland",
                body: "Granite, tallowwoods, koalas.",
                href: "/noosa-national-park",
                image: "https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg",
              },
              {
                key: "eat",
                title: "Eat Hastings Street",
                body: "Cafés, restaurants, the surf club.",
                href: "/shopping",
                image: "https://live.staticflickr.com/615/31910895645_d321ec9068_b.jpg",
              },
            ].map((e) => (
              <Link
                key={e.key}
                href={e.href}
                className="group block relative overflow-hidden rounded-xl aspect-square bg-ink-700"
                data-track={`home_do_${e.key}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={e.image}
                  alt={e.body}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative h-full w-full p-4 flex flex-col justify-end">
                  <h3 className="font-display text-headline-md text-paper-50 text-balance">
                    {e.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/things-to-do"
              className="btn-outline btn-md border-paper-50 text-paper-50 hover:bg-paper-50 hover:text-ink-900"
              data-track="home_do_to_things"
            >
              See all eight experiences
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5. WALK (LIGHT) — single full-bleed photo + 1-sentence + CTA ─── */}
      <section
        className="bg-paper-50"
        aria-labelledby="walk-heading"
      >
        <div className="container-page py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 order-1">
              <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-paper-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FEATURE_IMAGE.url}
                  alt="Noosa National Park Granite Bay — the coastal walk's defining view."
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-5 order-2">
              <p className="eyebrow">WALK</p>
              <h2
                id="walk-heading"
                className="mt-3 font-display text-display-lg text-ink-900 text-balance"
              >
                The headland at sunrise.
              </h2>
              <p className="mt-5 lead text-ink-800 text-pretty">
                Five-point-three kilometres of headland from the Noosa
                Heads Surf Club to Alexandria Bay, with a quieter inland
                walk on Tanglewood for the days when the granite is hot.
              </p>
              <div className="mt-7">
                <Link
                  href="/noosa-national-park"
                  className="btn-primary btn-md"
                  data-track="home_walk_to_np"
                >
                  Plan a walk
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. LIVE — atmospheric one-liner + CTA to /surf-and-weather ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="live-heading"
      >
        <div className="container-page py-14 md:py-20 text-center">
          <p className="eyebrow">LIVE</p>
          <h2
            id="live-heading"
            className="mt-3 font-display text-display-lg md:text-display-xl text-ink-900 text-balance max-w-4xl mx-auto"
          >
            What the coast is doing right now.
          </h2>
          <p className="mt-5 text-body-md text-ink-800 max-w-2xl mx-auto text-pretty">
            Live surf, wind, tide and UV — refreshed every 30 minutes from BOM and Open-Meteo.
          </p>
          <div className="mt-7">
            <Link
              href="/surf-and-weather"
              className="btn-primary btn-md"
              data-track="home_live_to_surf"
            >
              Open surf and weather
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 7. Six image-led choice tiles (KUBE pattern: image + label only) ─── */}
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

      {/* ─── 8. Trust statement (single line) ─── */}
      <section className="bg-paper-50 border-t border-paper-200" aria-labelledby="trust-heading">
        <div className="container-page py-10 md:py-14 text-center">
          <p
            id="trust-heading"
            className="text-body-sm text-ink-600 max-w-2xl mx-auto"
          >
            Independent recommendations and clearly marked booking links.
            Every claim links to a public source.
          </p>
        </div>
      </section>
    </div>
  );
}
