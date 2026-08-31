import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { fetchLive } from "@/lib/live";

/**
 * /surf-and-weather — MSN-2982 chairman-mandated rework + MSN-3044
 * Item 1 (live tiles) + Item 2 (MSQ bar-crossing safety reconcile).
 *
 * Word budget: 250 words + live information panels.
 *
 * Photography: storm light over Noosa Main Beach (verified).
 *
 * Live tile data is fetched server-side and re-rendered every 30
 * minutes via the same Open-Meteo / BOM endpoints the existing
 * /api/live/* routes serve. We do not fabricate numbers; if a feed
 * is unavailable the tile renders "Unavailable" and links out to
 * the upstream BOM forecast.
 */

export const metadata: Metadata = {
  title: "Surf & weather in Noosa",
  description:
    "Live surf, wind, tide, and UV for Noosa Heads. BOM Southeast Coast + Open-Meteo. Bar crossings defer to MSQ.",
  alternates: { canonical: "/surf-and-weather" },
  robots: { index: false, follow: false },
};

export const revalidate = 1800; // 30 minutes

// fetchLive is imported from @/lib/live (MSN-3044 build leg: shared between
// the surf-and-weather page tile grid and the homepage compact strip).

export default async function SurfAndWeatherPage() {
  const live = await fetchLive();

  return (
    <div className="bg-paper-50">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE.productionUrl}/surf-and-weather`,
            name: "Surf & weather in Noosa",
            description:
              "Live surf, wind, tide, and UV for Noosa Heads, refreshed every 30 minutes from BOM and Open-Meteo.",
            url: `${SITE.productionUrl}/surf-and-weather`,
          },
        ]}
      />

      {/* ─── 1. Hero — Noosa Main Beach, storm light (verified) ─── */}
      <section
        aria-label="Surf and weather in Noosa"
        className="relative w-full overflow-hidden bg-ink-900 h-[80vh] min-h-[560px] max-h-[1000px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/heroes/main-beach-storm-1920w.jpg"
          alt="Storm light over Noosa Main Beach — south-east swell window."
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
            <p className="eyebrow text-paper-300">LIVE · BOM + OPEN-METEO</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              What the coast is doing right now.
            </h1>
            <p className="mt-4 lead text-paper-200 max-w-3xl text-pretty">
              Surf, wind, tide and UV — refreshed every 30 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. Live tile panel + verify-before-you-go box ─── */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="surf-tiles-heading"
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Live · updated {new Date(live.updated).toLocaleString("en-AU", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short", timeZone: "Australia/Brisbane", timeZoneName: "short" })} AEST/AEDT</p>
          <h2 id="surf-tiles-heading" className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance">
            The numbers.
          </h2>
          <p className="mt-3 text-body-sm text-ink-600 max-w-3xl text-pretty">
            Refreshed automatically every 30 minutes from BOM and Open-Meteo. The badge on each tile names its source; tile data is not edited by hand.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Wind", value: live.windKmh, sub: live.windDir, src: "Open-Meteo" },
              { label: "Swell", value: live.swellM, sub: live.swellPeriodS, src: "Open-Meteo Marine" },
              { label: "UV", value: live.uvIndex, sub: "SunSmart thresholds", src: "Open-Meteo" },
              { label: "Tide", value: live.tideM, sub: "Authoritative tide at Tewantin", src: "BOM" },
              { label: "Sea temp", value: live.waterC, sub: "Laguna Bay", src: "Open-Meteo Marine" },
              { label: "Air temp", value: live.airC, sub: "Noosa Heads", src: "Open-Meteo" },
              { label: "Bar", value: "Check before crossing", sub: "MSQ + VMR Noosa", src: "MSQ" },
              { label: "Patrol", value: "See Beachsafe", sub: "Main Beach + Sunshine", src: "Beachsafe" },
            ].map((t) => (
              <div key={t.label} className="rounded-xl bg-paper-50 p-5 ring-1 ring-paper-200">
                <p className="eyebrow text-ink-600">{t.label}</p>
                <p className="mt-1 font-display text-headline-md text-ink-900">{t.value}</p>
                <p className="mt-1 text-body-sm text-ink-700">{t.sub}</p>
                <p className="mt-3 text-caption text-ink-500 uppercase tracking-wider">{t.src}</p>
              </div>
            ))}
          </div>
          {/* MSN-3044 — Item 2 fix: explicit "verify before you go"
           *  box sits directly under the live tile panel so the
           *  safety-critical information is visible without scrolling
           *  into the detail copy. Tide-direction language reconciled
           *  to match /boats-and-watercraft (incoming tide is the
           *  safer window per MSQ's general guidance; outgoing tide
           *  against an incoming swell is the dangerous combination). */}
          <aside className="mt-10 rounded-2xl bg-ink-900 text-paper-50 p-6 md:p-8 ring-1 ring-ink-900">
            <p className="eyebrow text-amber-200">Bar crossings — verify before you go</p>
            <h3 className="mt-2 font-display text-display-sm text-paper-50 text-balance">
              MSQ + VMR Noosa + Noosa Coast Guard.
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-body-sm text-paper-200">
              <li>
                <strong className="text-paper-50">MSQ Noosa bar bulletin</strong> — the live, MSQ-issued bar condition. Authoritative.
              </li>
              <li>
                <strong className="text-paper-50">Noosa Coast Guard</strong> — VHF channel 16 (distress / calling) and channel 67 (Noosa Coast Guard working / repeat channel).
              </li>
              <li>
                <strong className="text-paper-50">VMR Noosa</strong> — VHF channel 16; live crossing advice from the volunteer marine rescue unit.
              </li>
              <li>
                <strong className="text-paper-50">BOM Tewantin tide</strong> — authoritative tide harmonic for any planned crossing.
              </li>
            </ul>
            <p className="mt-5 text-caption text-paper-300">
              <em>General guidance: cross on an incoming tide when conditions allow (MSQ).</em>{" "}
              Last verified against MSQ / VMR / Noosa Coast Guard sources: 2026-08-31.
            </p>
          </aside>
        </div>
      </section>

      {/* ─── 3. Concise detail (250 word target) ─── */}
      <section
        className="container-page py-12 md:py-16"
        aria-labelledby="surf-detail-heading"
      >
        <h2 id="surf-detail-heading" className="font-display text-display-md text-ink-900 text-balance">
          What to read.
        </h2>
        <p className="mt-4 text-body-md text-ink-800 max-w-prose text-pretty">
          Noosa&apos;s points like a south-east groundswell with a
          period over nine seconds and a wind from the same direction.
          When the wind turns north-west, the points go off. Begin at
          Main Beach — patrolled, sandy, gentle. Bar crossings defer to
          MSQ: cross on an incoming tide when conditions allow, check
          the bulletin, listen to VMR Noosa on VHF channel 16, do not
          rely on this site for navigation.
        </p>
      </section>

      {/* ─── 4. Essential practical info ─── */}
      <section
        className="bg-paper-100 border-y border-paper-200"
        aria-labelledby="surf-practical-heading"
      >
        <div className="container-page py-12 md:py-16">
          <h2 id="surf-practical-heading" className="font-display text-display-md text-ink-900 text-balance">
            Authoritative sources.
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 text-body-md text-ink-800">
            <li>
              <a className="link text-ocean-700" href="https://www.bom.gov.au/coastal-location/australia" rel="noopener noreferrer" target="_blank">
                BOM — Southeast Coast coastal forecast
              </a>
            </li>
            <li>
              <a className="link text-ocean-700" href="https://www.msq.qld.gov.au/Safety/Bar-crossings-and-coastal-conditions" rel="noopener noreferrer" target="_blank">
                MSQ — bar crossings bulletin
              </a>
            </li>
            <li>
              <a className="link text-ocean-700" href="https://www.bom.gov.au/australia/tides/#!/qld-tewantin" rel="noopener noreferrer" target="_blank">
                BOM — Tewantin tide
              </a>
            </li>
            <li>
              <a className="link text-ocean-700" href="https://open-meteo.com/en/docs/marine-weather-api" rel="noopener noreferrer" target="_blank">
                Open-Meteo Marine Weather API
              </a>
            </li>
            <li>
              <a className="link text-ocean-700" href="https://www.sunsmart.com.au/" rel="noopener noreferrer" target="_blank">
                Cancer Council SunSmart (UV)
              </a>
            </li>
            <li>
              <a className="link text-ocean-700" href="https://beachsafe.org.au/" rel="noopener noreferrer" target="_blank">
                Beachsafe — patrol flags
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* ─── 5. Clear action ─── */}
      <section className="container-page py-12 md:py-16 text-center">
        <h2 className="font-display text-display-md text-ink-900 text-balance">
          Plan the morning.
        </h2>
        <div className="mt-7 flex flex-wrap gap-3 justify-center">
          <Link
            href="/noosa-national-park"
            className="btn-primary btn-md"
            data-track="surf_action_np"
          >
            Noosa National Park
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/things-to-do/learn-to-surf"
            className="btn-outline btn-md"
            data-track="surf_action_learn"
          >
            Learn to surf
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
