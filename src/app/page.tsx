import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import {
  HOMEPAGE_HERO,
  HOME_TILES,
  FEATURE_IMAGE,
} from "@/data/photos-msn2982";
import { HomeHero } from "@/components/HomeHero";
import { ImageTile } from "@/components/ImageTile";
import { fetchLive } from "@/lib/live";
import {
  organizationJsonLd,
  webSiteJsonLd,
  breadcrumbJsonLd,
} from "@/lib/schema";

/**
 * MSN-2982 homepage — chairman-mandated full rework.
 *
 * Hard word budget: 150 words visitor-facing copy.
 * No new sections beyond the existing KUBE progression.
 *
 * Photography: NO named-property cards in the STAY section.
 * The chairman specifically flagged Mission Beach (Sofitel) and
 * Hamilton Island (RACV) as wrong-location substitutes. Per the
 * mandate, those cards are removed. The STAY section is now a single
 * editorial hook + CTA to /accommodation (where the 10-property
 * curated list lives).
 *
 * The /stay/[slug] deep pages still exist (with text-only treatment
 * for Sofitel and RACV — no photo claims they can't back up), but the
 * homepage does not promote them visually.
 */

export const metadata: Metadata = {
  title: "MyNoosaHeads · Discover Noosa Heads, Queensland",
  description:
    "An independent guide to Noosa Heads, Queensland. Eight hundred metres of Hastings Street. One river, one park. Surf, accommodation, and the local rules.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  // MSN-3044 — Item 1 (sub-item e): compact live strip on the homepage.
  // Reads from the same Open-Meteo / BOM Tewantin endpoints as the
  // surf-and-weather page via @/lib/live. If a feed fails the values
  // fall back to the dash placeholder; we never fabricate.
  const live = await fetchLive();
  const homeLive = {
    ...live,
    // Compact timestamp for the strip — "12:34 BST" style.
    updatedDisplay: new Date(live.updated).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/London",
      timeZoneName: "short",
    }),
  };

  // MSN-3044 — Item 9.6: in non-production builds, emit a placeholder
  // email so the Organization JSON-LD doesn't leak the production
  // contact email to crawlers indexing the preview URL set. The audit
  // (MSN-3043) flagged this as a structured-data leakage on the dev
  // MSN-3057 M4 — homepage JSON-LD now uses the central schema helper.
  // Adds `sameAs` (Albert §4.2) and `potentialAction: SearchAction` so
  // Google can surface a site-search sitelink. Email redaction for
  // non-production builds is preserved (M3).
  const homeJsonLd = [
    organizationJsonLd(),
    webSiteJsonLd(),
    breadcrumbJsonLd([{ name: SITE.brand, path: "/" }]),
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={homeJsonLd} />

      {/* ─── 1. Hero — Noosa Main Beach, looking east (verified) ─── */}
      {/* MSN-2987 chunk 3: pass the responsive srcSet (avifSrcSet) so the
       *  browser can pick 640w on phones / 1920w on desktops. */}
      <HomeHero
        src={HOMEPAGE_HERO.path}
        srcSet={HOMEPAGE_HERO.avifSrcSet}
      />

      {/* ─── 2. Atmospheric intro (verified Noosa photograph) ─── */}
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
                  src={FEATURE_IMAGE.path}
                  alt={FEATURE_IMAGE.caption}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <p className="eyebrow">Discover Noosa Heads</p>
              <h2
                id="intro-heading"
                className="mt-3 font-display text-display-lg md:text-display-xl text-ink-900 text-balance"
              >
                Eight hundred metres of Hastings Street. One river, one park.
              </h2>
              <p className="mt-5 lead max-w-2xl text-pretty">
                An independent guide to Noosa Heads. The headland at sunrise, the river at sunset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. STAY — single editorial hook + CTA (no named-property cards) ─── */}
      <section
        className="bg-ink-900 text-paper-50"
        aria-labelledby="stay-heading"
      >
        <div className="container-page py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow text-paper-300">STAY</p>
              <h2
                id="stay-heading"
                className="mt-3 font-display text-display-lg md:text-display-xl text-paper-50 text-balance"
              >
                Where to sleep.
              </h2>
              <p className="mt-4 text-body-md text-paper-200 max-w-2xl text-pretty">
                Three properties across four areas — Hastings Street,
                Noosaville, Sunshine Beach, and Peregian. Each card links
                to the operator&apos;s booking page.
              </p>
              <div className="mt-7">
                <Link
                  href="/accommodation"
                  className="btn-outline btn-lg border-paper-50 text-paper-50 hover:bg-paper-50 hover:text-ink-900"
                  data-track="home_stay_to_accomm"
                >
                  Find a place to stay
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-ink-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={HOME_TILES.whereToStay.path}
                  alt={HOME_TILES.whereToStay.caption}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. WALK — Granite Bay verified photo + brief copy + CTA ─── */}
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
                  src={HOME_TILES.beachesAndNature.path}
                  alt={HOME_TILES.beachesAndNature.caption}
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
                5.3 km of headland from the Surf Club to Alexandria Bay.
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

      {/* ─── 5. LIVE — compact live strip + CTA to /surf-and-weather ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="live-heading"
      >
        <div className="container-page py-10 md:py-14">
          <p className="eyebrow text-center">LIVE</p>
          <h2
            id="live-heading"
            className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl mx-auto text-center"
          >
            What the coast is doing right now.
          </h2>
          {/*
            MSN-3044 Item 1 (sub-item e) — compact live strip showing real
            values + last-updated + source. Reads from the same Open-Meteo
            feed as /surf-and-weather (via @/lib/live). If a feed fails, the
            value is the dash placeholder; we never fabricate.
          */}
          <p
            className="mt-5 mx-auto max-w-3xl rounded-xl bg-paper-50 ring-1 ring-paper-200 px-4 py-3 text-center text-body-sm text-ink-800"
            aria-label="Live coast conditions strip"
            data-track="home_live_strip"
          >
            <span className="font-medium text-ink-900">Surf {homeLive.swellM}</span>
            <span className="mx-2 text-ink-400" aria-hidden="true">·</span>
            <span className="font-medium text-ink-900">Wind {homeLive.windKmh}</span>
            <span className="mx-2 text-ink-400" aria-hidden="true">·</span>
            <span className="font-medium text-ink-900">Tide {homeLive.tideM}</span>
            <span className="mx-2 text-ink-400" aria-hidden="true">·</span>
            <span className="font-medium text-ink-900">UV {homeLive.uvIndex}</span>
            <span className="mx-2 text-ink-400" aria-hidden="true">·</span>
            <span className="font-medium text-ink-900">Now {homeLive.updatedDisplay}</span>
            <span className="block mt-1 text-caption text-ink-500">
              Source: BOM Tewantin tide + Open-Meteo Marine + Open-Meteo Forecast
            </span>
          </p>
          <div className="mt-7 text-center">
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

      {/* ─── 6. Six image-led choice tiles ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="tiles-heading"
      >
        <h2 id="tiles-heading" className="sr-only">
          Choose your Noosa
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              key: "do",
              href: "/things-to-do",
              title: "Things to do",
              body: "River, surf, walk, hinterland.",
              image: HOME_TILES.thingsToDo,
              emphasis: false,
              dataTrack: "home_tile_do",
            },
            {
              key: "eat",
              href: "/eat-and-drink",
              title: "Eat & drink",
              body: "Three venues, four precincts.",
              image: HOME_TILES.eatAndDrink,
              emphasis: false,
              dataTrack: "home_tile_eat",
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
            {
              key: "live",
              href: "/surf-and-weather",
              title: "Today in Noosa",
              body: "Surf, wind, tide, UV.",
              image: HOME_TILES.todayInNoosa,
              emphasis: false,
              dataTrack: "home_tile_live",
            },
            {
              key: "stay",
              href: "/accommodation",
              title: "Where to stay",
              body: "Three properties, four areas.",
              image: HOME_TILES.whereToStay,
              emphasis: false,
              dataTrack: "home_tile_stay",
            },
            {
              key: "walk",
              href: "/noosa-national-park",
              title: "Walk the headland",
              body: "Granite Bay at sunrise.",
              image: HOME_TILES.beachesAndNature,
              emphasis: false,
              dataTrack: "home_tile_walk",
            },
          ].map((t) => (
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

    </div>
  );
}
