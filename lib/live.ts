/**
 * Live-data fetch — shared between /surf-and-weather and the homepage
 * compact strip (MSN-3044 build leg, Item 1 sub-item e).
 *
 * Source: Open-Meteo Marine (wave_height, wave_period, sea_surface_temperature)
 * and Open-Meteo Forecast (temperature_2m, wind_speed_10m, wind_direction_10m,
 * uv_index). The BOM Tewantin tide harmonic is authoritative for tide; the
 * tide tile defers to that.
 *
 * No fabricated numbers. If a feed fails, every value is the dash placeholder
 * and the upstream is the only thing named in the surfaced meta block.
 *
 * Caching: 30 minutes via Next.js fetch revalidate. This matches the brief's
 * "cache for 30 min" requirement and the surf-and-weather page's existing
 * behaviour.
 */

export type LiveSnapshot = {
  windKmh: string;
  windDir: string;
  swellM: string;
  swellPeriodS: string;
  uvIndex: string;
  tideM: string;
  waterC: string;
  airC: string;
  updated: string;
};

const NOOSA_LAT = -26.385;
const NOOSA_LON = 153.091;

export async function fetchLive(): Promise<LiveSnapshot> {
  try {
    const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${NOOSA_LAT}&longitude=${NOOSA_LON}&current=wave_height,wave_period,sea_surface_temperature&timezone=Australia%2FBrisbane`;
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${NOOSA_LAT}&longitude=${NOOSA_LON}&current=temperature_2m,wind_speed_10m,wind_direction_10m,uv_index&timezone=Australia%2FBrisbane`;
    const [r1, r2] = await Promise.all([
      fetch(marineUrl, { next: { revalidate: 1800 } }),
      fetch(forecastUrl, { next: { revalidate: 1800 } }),
    ]);
    if (!r1.ok || !r2.ok) throw new Error("upstream");
    const a = await r1.json();
    const b = await r2.json();
    const cur1 = a.current ?? {};
    const cur2 = b.current ?? {};
    return {
      windKmh:
        typeof cur2.wind_speed_10m === "number"
          ? `${Math.round(cur2.wind_speed_10m)} km/h`
          : "—",
      windDir:
        typeof cur2.wind_direction_10m === "number"
          ? `${Math.round(cur2.wind_direction_10m)}°`
          : "—",
      swellM:
        typeof cur1.wave_height === "number"
          ? `${cur1.wave_height.toFixed(1)} m`
          : "—",
      swellPeriodS:
        typeof cur1.wave_period === "number"
          ? `${Math.round(cur1.wave_period)} s`
          : "—",
      uvIndex:
        typeof cur2.uv_index === "number"
          ? `${cur2.uv_index.toFixed(1)}`
          : "—",
      tideM: "See BOM Tewantin tide",
      waterC:
        typeof cur1.sea_surface_temperature === "number"
          ? `${cur1.sea_surface_temperature.toFixed(1)}°C`
          : "—",
      airC:
        typeof cur2.temperature_2m === "number"
          ? `${cur2.temperature_2m.toFixed(1)}°C`
          : "—",
      updated: new Date().toISOString(),
    };
  } catch {
    // No fabricated values — the dash is the only honest answer.
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
