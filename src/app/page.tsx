import Link from "next/link";
import { fetchLiveBundle } from "@/lib/live-data";
import {
  LiveDataWidget,
  LiveDataGrid,
  Card,
  CardBody,
  CardHeader,
  Icons,
  JsonLd,
} from "@/components/ui";
import { CATEGORIES, SITE } from "@/data/site";
import { HOMEPAGE_HERO } from "@/data/photos";
import { HomeHero } from "@/components/HomeHero";

/**
 * Homepage — Sprint 1.3 real copy.
 *
 * Layout per Albert's brief:
 *   1. Hero (headline, flourish, actions, live strip)
 *   2. Live-data grid (5 tiles: surf, wind, tide, UV, sun-moon)
 *   3. Eight functional-area entry cards
 *   4. "How we make money" disclosure card (ACCC)
 *   5. Footer compliance band (rendered by global Footer)
 *
 * The page is a React Server Component. Live data is fetched at request
 * time with a 6 s budget; if the upstream APIs fail, the tiles render
 * in their "unavailable" state.
 */
export default async function HomePage() {
  const live = await fetchLiveBundle();

  // MSN-2964 — homepage schema.org JSON-LD. We declare:
  //   - Organization (publisher / site identity)
  //   - WebSite (with SearchAction potential target — kept minimal,
  //     no search engine exposed on the public site)
  // Both use SITE.productionUrl so search engines see the canonical
  // https://mynoosaheads.twainent.workers.dev/ host.
  const homeJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE.productionUrl}#organization`,
      name: SITE.brand,
      url: SITE.productionUrl,
      logo: `${SITE.productionUrl}/brand/logo-2.svg`,
      description:
        "An independent, sourced guide to Noosa Heads, Queensland. Live surf and weather from BOM and Open-Meteo.",
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

  return (
    <div className="bg-paper-50">
      <JsonLd data={homeJsonLd} />
      {/* MSN-2965 — homepage hero swap + stronger overlay treatment.
       * The hero is now a single full-bleed photo with the H1, sub,
       * flourish, and CTAs overlaid. The photo file is the most
       * aspirational Noosa candidate from the Wikimedia Commons set
       * (golden-hour Main Beach with a lone wanderer + headland).
       * See `src/data/photos.ts HOMEPAGE_HERO` and
       * `src/components/HomeHero.tsx`. */}
      <HomeHero
        src={HOMEPAGE_HERO.url}
        caption={HOMEPAGE_HERO.caption}
        photographer={HOMEPAGE_HERO.author}
        licence={HOMEPAGE_HERO.licence}
        commonsPage={HOMEPAGE_HERO.commonsPage}
      />

      {/* ─── Live data strip ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="live-data-heading"
      >
        <div className="container-page py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <div>
              <p className="eyebrow">Live conditions</p>
              <h2
                id="live-data-heading"
                className="mt-1 font-display text-display-md text-ink-900 text-balance"
              >
                What the coast is doing right now
              </h2>
              <p className="mt-2 text-body-sm text-ink-700 max-w-2xl">
                Drawn from the Bureau of Meteorology’s{" "}
                <strong>Southeast Coast</strong> marine district and
                Open-Meteo’s free marine API. Tiles refresh every 30
                minutes; if an upstream falls out it shows an{" "}
                {/* MSN-2959 / TSK-2959-POLISH-C (extended): bumped from
                 * text-ocean-700 (#2F8074, contrast 4.39:1 on
                 * bg-paper-100) to text-ocean-900 (#0E4A41, ~10:1).
                 * This span lives inside a section with bg-paper-100
                 * so the .eyebrow class fix didn't reach it. */}
                <span className="text-ocean-900">Unavailable</span> badge
                rather than guessing. For bar crossings always defer to the
                MSQ Noosa bar report and the Noosa Coast Guard broadcast —
                this site is a planning tool, not a navigational authority.
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
            {/* MSN-2964 (safety): sun-moon widget removed from the
             * homepage live strip — its times drift up to a minute and
             * the page already links to /surf-and-weather where the
             * detail lives. */}
            <LiveDataWidget
              kind="alerts"
              title="Park &amp; road alerts"
              value="See QPWS"
              secondary="Track closures, wildlife, and Bruce Highway conditions."
              source="QPWS · QLD Traffic"
              state="fresh"
              href="/noosa-national-park"
            />
          </LiveDataGrid>
          <p className="mt-4 text-caption text-ink-600">{live.sourceNote}</p>
        </div>
      </section>

      {/* ─── Eight functional-area entry cards ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="areas-heading"
      >
        <p className="eyebrow">Eight areas, one guide</p>
        <h2
          id="areas-heading"
          className="mt-1 font-display text-display-md text-ink-900 text-balance"
        >
          Pick where you want to start
        </h2>
        <p className="mt-3 lead max-w-3xl">
          Noosa Shire runs from the beachside suburbs in the east to the
          hinterland villages in the west. Pick the area that matches your
          trip — surf, river, national park, fishing, boats, travel, or
          webcams — and the live conditions, alerts, and operator links are
          one tap away.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const Icon = Icons[cat.icon];
            return (
              <Card key={cat.slug} as="article">
                <CardHeader eyebrow={cat.navLabel} title="" />
                <CardBody>
                  <div className="flex items-start gap-3">
                    <span
                      className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-eucalyptus-50 text-eucalyptus-700"
                      aria-hidden="true"
                    >
                      <Icon size={20} />
                    </span>
                    <p className="text-body-sm text-ink-800 text-pretty">
                      {cat.pitch}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={cat.href}
                      className="link text-ocean-700 text-body-sm font-medium"
                    >
                      Open {cat.navLabel} →
                    </Link>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ─── Disclosure band ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="disclosure-heading"
      >
        <div className="container-page py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-3 items-start">
            <div className="md:col-span-2">
              <p className="eyebrow">How this site makes money</p>
              <h2
                id="disclosure-heading"
                className="mt-1 font-display text-display-md text-ink-900 text-balance"
              >
                How this site makes money.
              </h2>
              <p className="mt-3 lead max-w-2xl">
                MyNoosaHeads is independent and free to read. There is no
                paywall, no newsletter, and no email signup. Some links on
                this page are affiliate links — if you book or purchase
                through them, we may earn a small commission at no extra
                cost to you; affiliate relationships do not influence what
                we write. See the Legal column in the footer for the full
                statement, per the Competition and Consumer Act 2010 (Cth)
                Schedule 2.
              </p>
            </div>
            <Card variant="surface" as="aside">
              <CardBody>
                <p className="text-body-sm text-ink-800 leading-relaxed">
                  Live data refreshes every 30 minutes from BOM and Open-Meteo.
                  Every editorial claim links to a public source.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
