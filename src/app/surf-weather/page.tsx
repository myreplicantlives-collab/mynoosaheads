import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/sources";
import bomForecast from "@/data/live/bom-noosa-forecast.json";
import bomMarine from "@/data/live/bom-marine.json";
import health from "@/data/live/_health.json";

export const dynamic = "force-static";

export const metadata = {
  title: "Surf & weather forecast — Noosa Heads",
  description:
    "BOM weather and marine forecast for Noosa Heads. Honest about what the data can and can't tell you.",
};

const weatherCodeLabels: Record<number, string> = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Heavy rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
};

function direction(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const idx = Math.round(((deg % 360) / 45)) % 8;
  return dirs[idx];
}

export default function SurfWeatherPage() {
  const baseUrl = SITE.productionUrl;
  const bomSrc = sourceById("bom-noosa-forecast");
  const marineSrc = sourceById("bom-marine");

  const fc = (bomForecast as any).data;
  const marine = (bomMarine as any).data;

  // Build daily rows
  const daily: { date: string; max: number; min: number; rain: number; wind: number; windDir: string; code: number }[] = [];
  if (fc?.daily?.time) {
    for (let i = 0; i < fc.daily.time.length; i++) {
      daily.push({
        date: fc.daily.time[i],
        max: fc.daily.temperature_2m_max[i],
        min: fc.daily.temperature_2m_min[i],
        rain: fc.daily.precipitation_probability_max[i],
        wind: fc.daily.wind_speed_10m_max[i],
        windDir: direction(fc.daily.wind_direction_10m_dominant[i]),
        code: fc.daily.weather_code[i],
      });
    }
  }

  const current = fc?.current;
  const fetchedAt = (bomForecast as any).fetchedAt;

  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Surf & weather", url: `${baseUrl}/surf-weather` },
        ]}
      />
      <main className="bg-parchment-50">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Surf & weather" }]} />
          <header className="pb-8 pt-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">Surf &amp; weather</p>
            <h1 className="mt-2 font-serif text-4xl text-parchment-900 sm:text-5xl">BOM forecast for Noosa Heads</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-parchment-700">
              Live Bureau of Meteorology data for Noosa Heads, plus the marine forecast for the Sunshine Coast
              waters. We don't make metre-level surf claims. We use the source's own resolution and we tell you
              when the source is down.
            </p>
            <p className="mt-2 text-xs text-parchment-500">
              Source: {bomSrc?.title} · Fetched {new Date(fetchedAt).toLocaleString("en-AU", { timeZone: "Australia/Brisbane" })} AEST · Refreshed by <code>npm run data:refresh</code>
            </p>
          </header>

          {/* Current conditions */}
          {current && (
            <section className="rounded-2xl bg-white p-6 border border-parchment-200">
              <h2 className="font-serif text-2xl text-parchment-900">Currently at Noosa Heads</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-4">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-parchment-500">Air temperature</dt>
                  <dd className="mt-1 font-serif text-3xl text-parchment-900">{current.temperature_2m}°C</dd>
                  <p className="text-xs text-parchment-500">Feels like {current.apparent_temperature}°C</p>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-parchment-500">Wind</dt>
                  <dd className="mt-1 font-serif text-3xl text-parchment-900">{current.wind_speed_10m} km/h</dd>
                  <p className="text-xs text-parchment-500">{direction(current.wind_direction_10m)} ({current.wind_direction_10m}°)</p>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-parchment-500">Humidity</dt>
                  <dd className="mt-1 font-serif text-3xl text-parchment-900">{current.relative_humidity_2m}%</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-parchment-500">Conditions</dt>
                  <dd className="mt-1 font-serif text-3xl text-parchment-900">{weatherCodeLabels[current.weather_code] || "Unknown"}</dd>
                  <p className="text-xs text-parchment-500">WMO code {current.weather_code}</p>
                </div>
              </dl>
            </section>
          )}

          {/* 7-day */}
          {daily.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif text-3xl text-parchment-900">7-day outlook</h2>
              <div className="mt-4 overflow-x-auto rounded-2xl bg-white border border-parchment-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-parchment-100 text-parchment-700">
                    <tr>
                      <th className="px-3 py-3 font-medium">Date</th>
                      <th className="px-3 py-3 font-medium">Conditions</th>
                      <th className="px-3 py-3 font-medium">Min</th>
                      <th className="px-3 py-3 font-medium">Max</th>
                      <th className="px-3 py-3 font-medium">Rain</th>
                      <th className="px-3 py-3 font-medium">Wind</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daily.map((d, i) => (
                      <tr key={d.date} className={i % 2 === 0 ? "bg-white" : "bg-parchment-50/40"}>
                        <td className="px-3 py-2 font-medium text-parchment-900">
                          {new Date(d.date + "T00:00:00").toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" })}
                        </td>
                        <td className="px-3 py-2 text-parchment-700">{weatherCodeLabels[d.code] || `Code ${d.code}`}</td>
                        <td className="px-3 py-2 text-parchment-700">{d.min}°C</td>
                        <td className="px-3 py-2 text-parchment-700">{d.max}°C</td>
                        <td className="px-3 py-2 text-parchment-700">{d.rain}%</td>
                        <td className="px-3 py-2 text-parchment-700">{d.wind} km/h {d.windDir}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-parchment-500">
                Daily values are max/min, probability of precipitation, and dominant wind. Source resolution
                is daily — we don't claim hour-by-hour accuracy from this data.
              </p>
            </section>
          )}

          {/* Marine forecast */}
          {marine?.periods && (
            <section className="mt-10">
              <h2 className="font-serif text-3xl text-parchment-900">Marine forecast — Sunshine Coast waters</h2>
              <p className="mt-1 text-sm text-parchment-500">
                Source: {marineSrc?.title}. Resolution: 4 daily forecast periods. Wind in knots. Seas in metres.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {marine.periods.map((p: any, i: number) => (
                  <article key={i} className="card">
                    <h3 className="font-serif text-lg text-parchment-900">
                      {new Date(p.startLocal).toLocaleString("en-AU", { weekday: "short", hour: "2-digit", minute: "2-digit" })}
                      {" – "}
                      {new Date(p.endLocal).toLocaleString("en-AU", { weekday: "short", hour: "2-digit", minute: "2-digit" })}
                    </h3>
                    <dl className="mt-3 space-y-2 text-sm text-parchment-700">
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-parchment-500">Wind</dt>
                        <dd>{p.forecast_winds}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-parchment-500">Seas</dt>
                        <dd>{p.forecast_seas}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-parchment-500">Swell</dt>
                        <dd>{p.forecast_swell1}{p.forecast_swell2 ? `, ${p.forecast_swell2}` : ""}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-parchment-500">Weather</dt>
                        <dd>{p.forecast_weather}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
              <p className="mt-3 text-xs text-parchment-500">
                <strong>Honesty note:</strong> BOM marine forecasts cover a large zone — "Sunshine Coast
                waters: Double Island Point to Cape Moreton" — and report wind/seas/swell at the source's own
                resolution. They are not point forecasts for Noosa Main Beach. We don't claim metre-level surf
                accuracy from this data.
              </p>
            </section>
          )}

          {/* Source health */}
          <section className="mt-10 rounded-2xl bg-parchment-100 p-6">
            <h2 className="font-serif text-2xl text-parchment-900">Source health</h2>
            <p className="mt-1 text-xs text-parchment-500">
              Each forecast source has a status. If a source is unavailable, we say so — we don't make up numbers.
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {(health as any).sources.map((s: any, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-1 inline-block h-2 w-2 rounded-full ${s.status === "ok" ? "bg-rainforest-500" : "bg-coral-500"}`} />
                  <span className="font-mono text-xs text-parchment-700 break-all">{s.source}</span>
                  <span className={`pill text-xs ${s.status === "ok" ? "bg-rainforest-500 text-white" : "bg-coral-500 text-white"}`}>
                    {s.status}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-parchment-500">
              Generated: {new Date((health as any).generatedAt).toLocaleString("en-AU", { timeZone: "Australia/Brisbane" })} AEST
            </p>
          </section>

          {/* Where to verify */}
          <section className="mt-10 rounded-2xl bg-white p-6 border border-parchment-200">
            <h2 className="font-serif text-2xl text-parchment-900">Where to verify</h2>
            <ul className="mt-3 space-y-2 text-sm text-parchment-700">
              <li>· <a href="http://www.bom.gov.au/qld/forecasts/noosa-heads.shtml" target="_blank" rel="noopener noreferrer" className="link">BOM — Noosa Heads forecast</a> (official)</li>
              <li>· <a href="http://www.bom.gov.au/marine/qld/forecast-pointdanger.shtml" target="_blank" rel="noopener noreferrer" className="link">BOM — Marine forecast Point Danger to Double Island Point</a></li>
              <li>· <a href="http://www.bom.gov.au/australia/tides/#!/qld-noosa-heads" target="_blank" rel="noopener noreferrer" className="link">BOM — Noosa Heads tide predictions</a></li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
