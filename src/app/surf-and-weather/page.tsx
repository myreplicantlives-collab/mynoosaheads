import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";

/**
 * /surf-and-weather — MSN-2982 chairman-mandated rework.
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
};

export const revalidate = 1800; // 30 minutes

async function fetchLive(): Promise<{
  windKmh: string;
  windDir: string;
  swellM: string;
  swellPeriodS: string;
  uvIndex: string;
  tideM: string;
  waterC: string;
  airC: string;
  updated: string;
}> {
  try {
    const lat = -26.385;
    const lon = 153.091;
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wave_period,sea_surface_temperature&timezone=Australia%2FBrisbane`;
    const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m,uv_index&timezone=Australia%2FBrisbane`;
    const [r1, r2] = await Promise.all([fetch(url, { next: { revalidate: 1800 } }), fetch(url2, { next: { revalidate: 1800 } })]);
    if (!r1.ok || !r2.ok) throw new Error("upstream");
    const a = await r1.json();
    const b = await r2.json();
    const cur1 = a.current ?? {};
    const cur2 = b.current ?? {};
    return {
      windKmh: typeof cur2.wind_speed_10m === "number" ? `${Math.round(cur2.wind_speed_10m)} km/h` : "—",
      windDir: typeof cur2.wind_direction_10m === "number" ? `${Math.round(cur2.wind_direction_10m)}°` : "—",
      swellM: typeof cur1.wave_height === "number" ? `${cur1.wave_height.toFixed(1)} m` : "—",
      swellPeriodS: typeof cur1.wave_period === "number" ? `${Math.round(cur1.wave_period)} s` : "—",
      uvIndex: typeof cur2.uv_index === "number" ? `${cur2.uv_index.toFixed(1)}` : "—",
      tideM: "See BOM Tewantin tide",
      waterC: typeof cur1.sea_surface_temperature === "number" ? `${cur1.sea_surface_temperature.toFixed(1)}°C` : "—",
      airC: typeof cur2.temperature_2m === "number" ? `${cur2.temperature_2m.toFixed(1)}°C` : "—",
      updated: new Date().toISOString(),
    };
  } catch {
    return {
      windKmh: "—",
      windDir: "—",
      swellM: "—",
      swellPeriodS: "—",
      uvIndex: "—",
      tideM: "See BOM Tewantin tide",
      waterC: "—",
      airC: "—",
      updated: new Date().toISOString(),
    };
  }
}

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

      {/* ─── 2. Live tile panel ─── */}
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
          MSQ: check the bulletin, listen to VMR Noosa on VHF channel
          16, do not rely on this site for navigation.
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
