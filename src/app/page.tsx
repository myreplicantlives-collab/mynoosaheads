import Link from "next/link";
import { fetchLiveBundle } from "@/lib/live-data";
import { LiveDataWidget, LiveDataGrid, Card, CardBody, JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import {
  HOMEPAGE_HERO,
  HOME_TILES,
  FEATURE_IMAGE,
} from "@/data/photos";
import { HomeHero } from "@/components/HomeHero";
import { ImageTile } from "@/components/ImageTile";

/**
 * Homepage — MSN-2972 IA + visual rebuild.
 *
 * Structure (per Albert's D1 brief):
 *   1. Hero band (~78vh) — aspirational sunset + proposition + 2 CTAs
 *   2. Live data strip — keep the 4 widgets (surf, wind, tide, UV)
 *      tightened to ≤20 words of visitor copy
 *   3. Six image-led choice tiles — Where to stay (strongest), Things
 *      to do, Beaches & nature, Eat & drink, Plan your trip, Today in
 *      Noosa
 *   4. Inspirational feature band — "Three unforgettable days in Noosa"
 *      with image right + body left
 *   5. Trust statement — single line
 *   6. Disclosure band — kept generic (no encyclopedic body)
 *
 * Body copy budget: ≤300 words outside nav/footer per Albert D1.
 * MSN-2972 v2 tight — feature band converted from 3 prose paragraphs
 * to 3-day bullet list, disclosure band trimmed, bar-crossing advisory
 * shortened. Verified count now ~245 words. Within budget.
 *
 * The page is a React Server Component. Live data is fetched at
 * request time with a 6 s budget; if the upstream APIs fail, the tiles
 * render in their "unavailable" state.
 */
export default async function HomePage() {
  const live = await fetchLiveBundle();

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
      body: "Find the best area, hotel, resort or holiday home.",
      image: HOME_TILES.whereToStay,
      emphasis: true,
      dataTrack: "home_tile_stay",
    },
    {
      key: "thingsToDo",
      href: "/things-to-do",
      title: "Things to do",
      body: "Beaches, river adventures, walks and local favourites.",
      image: HOME_TILES.thingsToDo,
      dataTrack: "home_tile_things",
    },
    {
      key: "beachesAndNature",
      href: "/noosa-national-park",
      title: "Beaches & nature",
      body: "Discover Noosa's coastline, walks and wildlife.",
      image: HOME_TILES.beachesAndNature,
      dataTrack: "home_tile_beaches",
    },
    {
      key: "eatAndDrink",
      href: "/things-to-do#food-and-drink",
      title: "Eat & drink",
      body: "Restaurants, cafés, markets and sunset drinks.",
      image: HOME_TILES.eatAndDrink,
      dataTrack: "home_tile_eat",
    },
    {
      key: "planYourTrip",
      href: "/things-to-do#itineraries",
      title: "Plan your trip",
      body: "Itineraries, transport, maps and practical advice.",
      image: HOME_TILES.planYourTrip,
      dataTrack: "home_tile_plan",
    },
    {
      key: "todayInNoosa",
      href: "/surf-and-weather",
      title: "Today in Noosa",
      body: "Weather, surf, UV, park alerts and live conditions.",
      image: HOME_TILES.todayInNoosa,
      dataTrack: "home_tile_today",
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={homeJsonLd} />

      {/* ─── 1. Hero band ─── */}
      <HomeHero
        src={HOMEPAGE_HERO.url}
        caption={HOMEPAGE_HERO.caption}
        photographer={HOMEPAGE_HERO.author}
        licence={HOMEPAGE_HERO.licence}
        commonsPage={HOMEPAGE_HERO.commonsPage}
      />

      {/* ─── 2. Live data strip ───
       * Visitor copy kept ≤20 words (D1 §5). Implementation details
       * stay in code comments only. */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="live-data-heading"
      >
        <div className="container-page py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <div>
              <p className="eyebrow">Live conditions</p>
              <h2
                id="live-data-heading"
                className="mt-1 font-display text-display-md text-ink-900 text-balance"
              >
                Today on the coast
              </h2>
              <p className="mt-2 text-body-sm text-ink-700 max-w-2xl">
              Live surf, weather and UV — refreshed every 30 minutes.
            </p>
          </div>
          <p className="text-caption text-ink-600">
            Last refresh:{" "}
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
          <LiveDataGrid>
            <LiveDataWidget
              kind="surf"
              title="Surf — Noosa Heads"
              value={live.surf.value}
              secondary={live.surf.secondary}
              source={live.surf.source}
              asOf={live.asOf}
              state={live.surf.state}
              href="/surf-and-weather"
            />
            <LiveDataWidget
              kind="wind"
              title="Wind — coast"
              value={live.wind.value}
              secondary={live.wind.secondary}
              source={live.wind.source}
              asOf={live.asOf}
              state={live.wind.state}
              href="/surf-and-weather"
            />
            <LiveDataWidget
              kind="tide"
              title="Sea level (approx.)"
              value={`~${live.tide.value.replace(/^~/, "")}`}
              secondary={live.tide.secondary}
              source={live.tide.source}
              asOf={live.asOf}
              state={live.tide.state}
              href="/surf-and-weather"
            />
            <LiveDataWidget
              kind="uv"
              title="UV index"
              value={live.uv.value}
              secondary={live.uv.secondary}
              source={live.uv.source}
              asOf={live.asOf}
              state={live.uv.state}
              href="/surf-and-weather"
            />
          </LiveDataGrid>
          <p className="mt-4 text-caption text-ink-600">
            Bar crossings: defer to the{" "}
            <Link href="/surf-and-weather" className="link text-ocean-700">
              MSQ Noosa bar report
            </Link>
            . This site is a planning tool, not a navigational authority.
          </p>
        </div>
      </section>

      {/* ─── 3. Six image-led choice tiles ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="tiles-heading"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
          <div>
            <p className="eyebrow">Pick where to start</p>
            <h2
              id="tiles-heading"
              className="mt-1 font-display text-display-md text-ink-900 text-balance"
            >
              Six ways into Noosa
            </h2>
          </div>
        </div>
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
            />
          ))}
        </div>
      </section>

      {/* ─── 4. Inspirational feature band ─── */}
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
              <p className="mt-3 text-caption text-ink-600">
                Photo:{" "}
                <a
                  href={FEATURE_IMAGE.commonsPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-paper-300 underline-offset-2 hover:text-ocean-700"
                >
                  {FEATURE_IMAGE.author}
                </a>{" "}
                / Wikimedia Commons · {FEATURE_IMAGE.licence}
              </p>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <p className="eyebrow">A three-day plan</p>
              <h2
                id="feature-heading"
                className="mt-1 font-display text-display-md md:text-display-lg text-ink-900 text-balance"
              >
                Three unforgettable days in Noosa
              </h2>
              <ul className="mt-5 max-w-2xl text-body-md text-ink-800 space-y-3 text-pretty list-none">
                <li className="flex gap-3">
                  <span className="font-display text-eucalyptus-700 shrink-0 w-6">1</span>
                  <span><strong className="text-ink-900">Headland &amp; Hastings.</strong> Coastal walk from the surf club to Alexandria Bay, lunch on Hastings, swim Main Beach, ferry to Noosaville for sunset on Gympie Terrace.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-eucalyptus-700 shrink-0 w-6">2</span>
                  <span><strong className="text-ink-900">River &amp; Peregian.</strong> Kayak or paddleboard the Noosa River; slow lunch in Peregian; dinner in Hastings (book ahead in summer).</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-eucalyptus-700 shrink-0 w-6">3</span>
                  <span><strong className="text-ink-900">Sunrise &amp; market.</strong> Coastal walk again at dawn, ferry to Tewantin for the Saturday market, and the Hinterland villages before the drive home.</span>
                </li>
              </ul>
              <div className="mt-7">
                <Link
                  href="/things-to-do#itineraries"
                  className="btn-primary btn-md"
                  data-track="home_feature_to_itineraries"
                >
                  See the full 7-day itinerary
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. Trust statement ─── */}
      <section
        className="bg-paper-50"
        aria-labelledby="trust-heading"
      >
        <div className="container-page py-10 md:py-14 text-center">
          <p
            id="trust-heading"
            className="text-body-sm text-ink-600 max-w-2xl mx-auto"
          >
            Independent recommendations, current local information and
            clearly marked booking links.
          </p>
        </div>
      </section>

      {/* ─── 6. Disclosure band ───
       * Generic disclosure — no encyclopedic "How this site makes money"
       * body. Full statement lives in the footer (Albert D5 §3.1 / §7.2). */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="disclosure-heading"
      >
        <div className="container-page py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-body-sm text-ink-700 max-w-3xl">
              Some links are affiliate links — marked{" "}
              <span className="pill-disclosure">Affiliate</span>{" "}
              before you click. Full statement in the{" "}
              <Link
                href="#affiliate-disclosure"
                className="link text-ocean-700"
              >
                Legal column
              </Link>{" "}
              of the footer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
