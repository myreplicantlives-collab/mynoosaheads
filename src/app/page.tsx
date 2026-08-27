import Link from "next/link";
import { fetchLiveBundle } from "@/lib/live-data";
import {
  Hero,
  HeroPhoto,
  LiveDataWidget,
  LiveDataGrid,
  Button,
  Card,
  CardBody,
  CardHeader,
  Icons,
} from "@/components/ui";
import { CATEGORIES, SITE } from "@/data/site";
import { HOMEPAGE_HERO } from "@/data/photos";

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

  return (
    <div className="bg-paper-50">
      {/* Sprint 1.5 (MSN-2958): full-bleed homepage hero photo.
       * Per Albert's visual_audit.md §1, the homepage hero is ~60vh
       * full-bleed with the headline overlaid in the lower-left.
       */}
      <HeroPhoto
        src={HOMEPAGE_HERO.url}
        alt={HOMEPAGE_HERO.caption}
        credit={`Photo: ${HOMEPAGE_HERO.author} / Wikimedia Commons · ${HOMEPAGE_HERO.licence}`}
        caption={HOMEPAGE_HERO.caption}
      />
      <Hero
        eyebrow={`${SITE.region} · independent editorial`}
        title="By the headland, by the bar."
        subtitle={
          <>
            MyNoosaHeads is a slow-guide field manual for Noosa Heads — surf
            and weather, the national park, accommodation, and the local
            rules that keep everyone on the right side of a south-east
            swell. Built slowly, sourced always, never fabricated.
          </>
        }
        flourish="Plan your Noosa trip well."
        actions={
          <>
            <Button
              href="/surf-and-weather"
              leadingIcon={<Icons.Wave size={16} />}
              size="lg"
            >
              Today’s surf &amp; weather
            </Button>
            <Button
              href="/noosa-national-park"
              variant="outline"
              size="lg"
              trailingIcon={<Icons.ChevronRight size={16} />}
            >
              National Park alerts
            </Button>
          </>
        }
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
                Drawn from the Bureau of Meteorology’s Capricornia–Hervey
                Bay marine district and Open-Meteo’s free marine API. Refresh
                every 30 minutes; if a tile falls out, it shows an{" "}
                {/* MSN-2959 / TSK-2959-POLISH-C (extended): bumped from
                 * text-ocean-700 (#2F8074, contrast 4.39:1 on
                 * bg-paper-100) to text-ocean-900 (#0E4A41, ~10:1).
                 * This span lives inside a section with bg-paper-100
                 * so the .eyebrow class fix didn't reach it. */}
                <span className="text-ocean-900">Unavailable</span> badge
                rather than guessing.
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
              title="Tide — Tewantin"
              value={live.tide.value}
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
            <LiveDataWidget
              kind="sun-moon"
              title="Sun &amp; moon"
              value={live.sunMoon.value}
              secondary={live.sunMoon.secondary}
              source={live.sunMoon.source}
              asOf={live.asOf}
              state={live.sunMoon.state}
              href="/surf-and-weather"
            />
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
          The shire is small enough to cover properly. We organise
          MyNoosaHeads around eight functional areas so you don’t have to
          wade through visitor-brochure categories that don’t reflect what
          people actually do here.
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
              <p className="eyebrow">How we make money</p>
              <h2
                id="disclosure-heading"
                className="mt-1 font-display text-display-md text-ink-900 text-balance"
              >
                Editorial first. Disclosure second.
              </h2>
              <p className="mt-3 lead max-w-2xl">
                MyNoosaHeads is independent. We don’t run a newsletter, we
                don’t collect email addresses, and we don’t operate a login.
                Where a page contains a monetised link — typically
                accommodation bookings — we mark it{" "}
                <span className="chip-ocean">Affiliate</span>{" "}
                before you click. The full statement, including which
                affiliate programmes we participate in, sits in the
                footer.
              </p>
            </div>
            <Card variant="surface" as="aside">
              <CardBody>
                <p className="eyebrow">What we don’t do</p>
                <ul className="mt-3 space-y-2 text-body-sm text-ink-800 list-disc pl-5">
                  <li>No newsletter, no email capture</li>
                  <li>No AI-generated photography</li>
                  <li>No fabricated reviews or stats</li>
                  <li>No pop-ups, no login walls</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
