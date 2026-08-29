import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { VERIFIED } from "@/data/photos-msn2982";

/**
 * /noosa-national-park — MSN-2985 V2 release correction pass.
 *
 * Per chairman mandate 2026-08-29:
 *   - All walk cards use QPWS-verified distance, grade, duration
 *     (Coastal: 10.8 km / Grade 4 / 4 h; Tanglewood: 8 km return /
 *     Grade 4 / 2–3 h; Palm Grove: 1.1 km / Grade 3 / 15–30 min)
 *   - The 4 walk cards include the NEW Palm Grove Walk (added
 *     2026-08-29; image pending per chairman instruction)
 *   - H2 cut: "Check before you go." → "The alerts page is the
 *     only source that's current on the morning." (echoes the
 *     existing body copy)
 *
 * KUBE progression: hero → emotional headline → visual choices →
 * concise detail → essential practical info → clear action.
 *
 * Copy budget: 300 words.
 *
 * Chairman mandate #11: distances, track grades, and safety from the
 * official Queensland Parks & Wildlife Service source. Each claim
 * carries a QPWS link inline.
 *
 * @see /Volumes/OpenClawLive/state/control/evidence/MSN-2985/QPWS_FACTS.md
 */

export const metadata: Metadata = {
  title: "Noosa National Park",
  description:
    "Noosa National Park — coastal walk, Tanglewood track, Fairy Pools. QPWS alerts and visitor info for the park.",
  alternates: { canonical: "/noosa-national-park" },
};

export default function NationalParkPage() {
  return (
    <div className="bg-paper-50">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            "@id": `${SITE.productionUrl}/noosa-national-park#park`,
            name: "Noosa National Park",
            description:
              "Noosa National Park, between Noosa Heads and Peregian Beach. Managed by Queensland Parks and Wildlife Service.",
            url: `${SITE.productionUrl}/noosa-national-park`,
            address: {
              "@type": "PostalAddress",
              addressRegion: "Queensland",
              addressCountry: "AU",
              addressLocality: "Noosa Heads",
            },
          },
        ]}
      />

      {/* ─── 1. Hero — Granite Bay (verified Noosa NP) ─── */}
      <section
        aria-label="Noosa National Park — Granite Bay"
        className="relative w-full overflow-hidden bg-ink-900 h-[80vh] min-h-[560px] max-h-[1000px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={VERIFIED.heroes.noosaNationalPark.path}
          alt={VERIFIED.heroes.noosaNationalPark.caption}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-900/15 via-transparent to-ink-900/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent"
          aria-hidden="true"
        />
        <div className="relative h-full w-full">
          <div className="container-page h-full flex flex-col justify-end pb-16 md:pb-24">
            <p className="eyebrow text-paper-300">QPWS · CHECK ALERTS BEFORE YOU GO</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              Noosa National Park.
            </h1>
            <p className="mt-4 lead text-paper-200 max-w-3xl text-pretty">
              The coastal walk, Tanglewood, Palm Grove. Koalas in the tallowwoods.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. Atmospheric intro ─── */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="np-intro-heading"
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Managed by Queensland Parks & Wildlife Service</p>
          <h2
            id="np-intro-heading"
            className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl"
          >
            Granite Bay at sunrise, koalas in the tallowwoods.
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            The headland section runs ten-point-eight kilometres return
            from Noosa Main Beach to Sunshine Beach. Koalas sleep in the
            tallowwoods. Walk softly.
          </p>
        </div>
      </section>

      {/* ─── 3. Three visual choices (image-led) ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="np-walks-heading"
      >
        <h2 id="np-walks-heading" className="font-display text-display-md md:text-display-lg text-ink-900 text-balance mb-10">
          Four walks.
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              slug: "coastal-walk",
              title: "The coastal walk",
              body: "10.8 km return, Grade 4, allow 4 hours.",
              image: "/img/heroes/granite-bay-1920w.jpg",
              caption: "Granite Bay, Noosa National Park.",
            },
            {
              slug: "tanglewood-track",
              title: "Tanglewood track",
              body: "8 km return, Grade 4, allow 2–3 hours.",
              image: "/img/cards/noosa-rainforest.jpg",
              caption: "Inland rainforest track, Noosa National Park.",
            },
            {
              slug: "alexandria-bay",
              title: "Alexandria Bay",
              body: "3.3 km one-way, Grade 4, halfway on the coastal walk.",
              image: "/img/cards/alexandria-bay.jpg",
              caption: "Alexandria Bay, Noosa National Park.",
            },
            {
              slug: "palm-grove",
              title: "Palm Grove Walk",
              body: "1.1 km return, Grade 3, allow 15–30 minutes.",
              image: null,
              caption: "Image pending — verified Noosa photograph required.",
              imagePending: true,
            },
          ].map((w) => (
            <Link
              key={w.slug}
              href={`/noosa-national-park/walks/${w.slug}`}
              className="group relative block overflow-hidden rounded-xl aspect-[4/5] bg-ink-700"
              data-track={`np_walk_${w.slug}`}
            >
              {w.imagePending ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <div className="absolute inset-0 flex items-center justify-center bg-ink-800">
                    <div className="text-center px-6">
                      <p className="eyebrow text-paper-400">Noosa National Park</p>
                      <p className="mt-3 font-display text-display-sm text-paper-200 text-balance">
                        {w.title}
                      </p>
                      <p className="mt-2 text-body-sm text-paper-300 text-pretty">
                        Image pending<br />
                        <span className="text-caption uppercase tracking-wider text-paper-400">Verified Noosa photograph required</span>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={w.image!}
                    alt={w.caption}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </>
              )}
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent"
                aria-hidden="true"
              />
              <div className="relative h-full w-full p-5 md:p-6 flex flex-col justify-end">
                <h3 className="font-display text-display-sm text-paper-50 text-balance">
                  {w.title}
                </h3>
                <p className="mt-1 text-body-sm text-paper-200 text-pretty">
                  {w.body}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-caption text-ink-600 text-pretty">
          Distance, grade, and time per Queensland Parks and Wildlife Service —{" "}
          <a
            href="https://parks.qld.gov.au/parks/noosa/journeys/walking-tracks-summary"
            className="link text-ocean-700"
            rel="noopener noreferrer"
            target="_blank"
          >
            Walking tracks summary
          </a>
          .
        </p>
      </section>

      {/* ─── 4. Concise detail ─── */}
      <section
        className="bg-paper-100 border-y border-paper-200"
        aria-labelledby="np-detail-heading"
      >
        <div className="container-page py-12 md:py-16 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">What you&apos;ll see</p>
            <h2 id="np-detail-heading" className="mt-3 font-display text-display-md text-ink-900 text-balance">
              Koalas, glossy black-cockatoos, whales in season.
            </h2>
            <p className="mt-5 text-body-md text-ink-800 text-pretty max-w-prose">
              Koalas are resident in the tallowwoods between Noosa Head and
              Dolphin Point. If you see one on the ground, leave it alone
              and report it to QPWS — a koala on the ground is usually in
              trouble. Whales pass June to November.
            </p>
          </div>
          <div>
            <p className="eyebrow">QPWS rules</p>
            <ul className="mt-3 space-y-3 text-body-md text-ink-800">
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-eucalyptus-700 mt-1">•</span>
                <span>No dogs anywhere in the park, on-lead or off.</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-eucalyptus-700 mt-1">•</span>
                <span>No bins — pack out what you bring in.</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-eucalyptus-700 mt-1">•</span>
                <span>No fires or camping.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 5. Essential practical info (QPWS citations inline) ─── */}
      <section
        className="container-page py-12 md:py-16"
        aria-labelledby="np-practical-heading"
      >
        <h2 id="np-practical-heading" className="font-display text-display-md text-ink-900 text-balance">
          The alerts page is the only source that&apos;s current on the morning.
        </h2>
        <p className="mt-4 text-body-md text-ink-800 max-w-prose text-pretty">
          QPWS closes tracks from time to time: high fire danger, the odd
          washout, wildlife management. The alerts page is the only source
          that&apos;s current on the morning.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 text-body-md text-ink-800">
          <li>
            <a
              href="https://parks.qld.gov.au/find-a-park/national-parks/noosa-national-park"
              className="link text-ocean-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              QPWS — Noosa National Park
            </a>
            <p className="text-body-sm text-ink-600 mt-1">Track closures, day-use areas, contact.</p>
          </li>
          <li>
            <a
              href="https://parks.qld.gov.au/park-alerts"
              className="link text-ocean-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              QPWS park alerts (statewide)
            </a>
            <p className="text-body-sm text-ink-600 mt-1">Current closures and conditions.</p>
          </li>
          <li>
            <a
              href="https://parks.qld.gov.au/koala"
              className="link text-ocean-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              QPWS — koala conservation
            </a>
            <p className="text-body-sm text-ink-600 mt-1">What to do if you see a koala on the ground.</p>
          </li>
          <li>
            <a
              href="https://parks.qld.gov.au/find-a-park/national-parks/noosa-national-park/day-use-areas"
              className="link text-ocean-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              QPWS day-use areas — Noosa section
            </a>
            <p className="text-body-sm text-ink-600 mt-1">Parking, toilets, accessible facilities.</p>
          </li>
        </ul>
      </section>

      {/* ─── 6. Clear action ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="np-action-heading"
      >
        <div className="container-page py-12 md:py-16 text-center">
          <h2 id="np-action-heading" className="font-display text-display-md text-ink-900 text-balance">
            Plan the morning.
          </h2>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link
              href="/surf-and-weather"
              className="btn-primary btn-md"
              data-track="np_action_surf"
            >
              Live surf &amp; weather
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/things-to-do"
              className="btn-outline btn-md"
              data-track="np_action_things"
            >
              More things to do
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
