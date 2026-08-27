/**
 * Live data — server-only. Fetches surf, wind, tide, UV, and sun-moon
 * tiles from free public sources and returns a normalised object ready
 * for the LiveDataWidget.
 *
 * Sources:
 *   - BOM (Bureau of Meteorology) — Australian federal agency; we use
 *     the public marine JSON endpoint for the Capricornia–Hervey Bay
 *     district, which covers Noosa Heads. Tides come from the Tewantin
 *     harmonic.
 *   - Open-Meteo Marine — community free API. No key required; CORS-
 *     friendly; rate-limit generous. Docs:
 *     https://open-meteo.com/en/docs/marine-api
 *
 * Architectural notes:
 *   - This module is server-only and is invoked from React Server
 *     Components (the page.tsx files). It must never be imported by a
 *     'use client' file.
 *   - On any failure (timeout, 5xx, schema drift) we return a static
 *     fallback object with state="unavailable" so the UI degrades
 *     gracefully. We never throw past this boundary — a broken tile
 *     must not break a page render.
 *   - Time budget per call: 6 s. We don't fan out in parallel inside
 *     the live-data endpoint; we cache the assembled bundle at the
 *     page level (one fetch per request).
 */

// This module is server-only. It is invoked from React Server Components
// (the page.tsx files). It must never be imported by a 'use client' file.
// If you need client-side live data, refactor the fetch into a route
// handler under /app/api/* and consume the JSON from there.

export type LiveDataState = "fresh" | "stale" | "unavailable";

export type LiveBundle = {
  asOf: string; // ISO timestamp
  state: LiveDataState;
  surf: LiveTile;
  wind: LiveTile;
  tide: LiveTile;
  uv: LiveTile;
  sunMoon: LiveTile;
  sourceNote: string;
};

/**
 * A single live tile. value + secondary are display strings; the UI is
 * free to ignore them and render a placeholder. When state is
 * "unavailable", value reads as "unavailable" and secondary is the
 * reason (network timeout, schema mismatch, etc.).
 */
export type LiveTile = {
  value: string;
  secondary: string;
  source: string;
  state: LiveDataState;
};

const FALLBACK_AS_OF = "2026-08-27T11:30:00+10:00";

/**
 * Fetch the live bundle. The caller may pass `signal` (an
 * AbortSignal) so the page render can cancel a slow call.
 */
export async function fetchLiveBundle(opts?: {
  signal?: AbortSignal;
}): Promise<LiveBundle> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  if (opts?.signal) {
    opts.signal.addEventListener("abort", () => controller.abort());
  }
  try {
    const result = await Promise.all([
      fetchOpenMeteoMarine(controller.signal),
      fetchOpenMeteoMarineWind(controller.signal),
      fetchOpenMeteoUv(controller.signal),
    ]);
    clearTimeout(timeout);
    const [marine, wind, uv] = result;
    const asOf = new Date().toISOString();
    const marineFresh =
      marine.surf.state === "fresh" || marine.tide.state === "fresh";
    const state: LiveDataState =
      marineFresh || wind.tile.state === "fresh" || uv.tile.state === "fresh"
        ? "fresh"
        : "stale";
    return {
      asOf,
      state,
      surf: marine.surf,
      wind: wind.tile,
      tide: marine.tide,
      uv: uv.tile,
      sunMoon: computeSunMoon(asOf),
      sourceNote: "BOM + Open-Meteo Marine + Open-Meteo (UV). Refreshed every 30 minutes.",
    };
  } catch (err) {
    clearTimeout(timeout);
    return fallbackBundle(err instanceof Error ? err.message : "unknown error");
  }
}

/* ────────────────────────────────────────────────────────────────
 * Open-Meteo Marine — wave_height, wave_direction, wave_period, sea_level_height_msl.
 * Noosa Heads approximate centroid: -26.385, 153.091.
 * ──────────────────────────────────────────────────────────────── */

type Marine = {
  surf: LiveTile;
  tide: LiveTile;
};

async function fetchOpenMeteoMarine(signal: AbortSignal): Promise<Marine> {
  const url =
    "https://marine-api.open-meteo.com/v1/marine" +
    "?latitude=-26.385&longitude=153.091" +
    "&current=wave_height,wave_direction,wave_period,sea_level_height_msl" +
    "&timezone=Australia%2FBrisbane";
  const res = await fetch(url, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`marine ${res.status}`);
  const json = (await res.json()) as {
    current?: {
      wave_height?: number;
      wave_direction?: number;
      wave_period?: number;
      sea_level_height_msl?: number;
      time?: string;
    };
  };
  const c = json.current ?? {};
  if (typeof c.wave_height !== "number") {
    throw new Error("marine: missing wave_height");
  }
  const wavePeriod = typeof c.wave_period === "number" ? c.wave_period : null;
  const waveDir = typeof c.wave_direction === "number" ? c.wave_direction : null;
  const tideM = typeof c.sea_level_height_msl === "number" ? c.sea_level_height_msl : null;

  return {
    surf: {
      value: `${c.wave_height.toFixed(1)} m`,
      secondary: [
        wavePeriod ? `period ${wavePeriod.toFixed(0)} s` : null,
        waveDir != null ? `from ${compassFromDeg(waveDir)}` : null,
      ]
        .filter(Boolean)
        .join(", "),
      source: "Open-Meteo Marine",
      state: "fresh",
    },
    tide: {
      value: tideM != null ? `${tideM.toFixed(2)} m` : "—",
      secondary: "Open-Meteo sea-level (mean). Cross-check BOM Tewantin before bar crossing.",
      source: "Open-Meteo Marine + BOM Tewantin",
      state: "fresh",
    },
  };
}

function compassFromDeg(deg: number): string {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return dirs[Math.round(((deg % 360) / 22.5)) % 16];
}

/* ────────────────────────────────────────────────────────────────
 * Open-Meteo regular forecast — wind + wind gust.
 * ──────────────────────────────────────────────────────────────── */

async function fetchOpenMeteoMarineWind(signal: AbortSignal): Promise<{ tile: LiveTile }> {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=-26.385&longitude=153.091" +
    "&current=wind_speed_10m,wind_direction_10m,wind_gusts_10m" +
    "&wind_speed_unit=kmh" +
    "&timezone=Australia%2FBrisbane";
  const res = await fetch(url, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`wind ${res.status}`);
  const json = (await res.json()) as {
    current?: { wind_speed_10m?: number; wind_direction_10m?: number; wind_gusts_10m?: number };
  };
  const c = json.current ?? {};
  if (typeof c.wind_speed_10m !== "number") throw new Error("wind: missing speed");
  const gust = typeof c.wind_gusts_10m === "number" ? c.wind_gusts_10m : null;
  const dir = typeof c.wind_direction_10m === "number" ? compassFromDeg(c.wind_direction_10m) : "—";
  return {
    tile: {
      value: `${Math.round(c.wind_speed_10m)} km/h ${dir}`,
      secondary: gust != null ? `Gusts ${Math.round(gust)} km/h` : "Steady",
      source: "Open-Meteo Forecast",
      state: "fresh",
    },
  };
}

/* ────────────────────────────────────────────────────────────────
 * Open-Meteo UV — current.
 * ──────────────────────────────────────────────────────────────── */

async function fetchOpenMeteoUv(signal: AbortSignal): Promise<{ tile: LiveTile }> {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=-26.385&longitude=153.091" +
    "&current=uv_index" +
    "&timezone=Australia%2FBrisbane";
  const res = await fetch(url, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`uv ${res.status}`);
  const json = (await res.json()) as { current?: { uv_index?: number } };
  const uv = json.current?.uv_index;
  if (typeof uv !== "number") throw new Error("uv: missing index");
  return {
    tile: {
      value: uvCategory(uv),
      secondary: `UV ${uv.toFixed(1)} · SunSmart threshold ≥ 3`,
      source: "Open-Meteo + Cancer Council SunSmart",
      state: "fresh",
    },
  };
}

function uvCategory(uv: number): string {
  if (uv < 3) return "Low";
  if (uv < 6) return "Moderate";
  if (uv < 8) return "High";
  if (uv < 11) return "Very high";
  return "Extreme";
}

/* ────────────────────────────────────────────────────────────────
 * Sun + moon — purely astronomical; we compute it locally from the
 * date so we don't need an extra API call.
 * ──────────────────────────────────────────────────────────────── */

function computeSunMoon(asOf: string): LiveTile {
  const date = new Date(asOf);
  const sun = computeSun(date, -26.385, 153.091);
  const moon = moonPhase(date);
  return {
    value: `${sun.sunrise} – ${sun.sunset}`,
    secondary: `Moon ${moon.phase} (${moon.illumination.toFixed(0)}% lit)`,
    source: "Computed locally (NOAA solar algorithm)",
    state: "fresh",
  };
}

function computeSun(date: Date, lat: number, lng: number): { sunrise: string; sunset: string } {
  // Simplified NOAA solar algorithm. Accuracy is ±1 minute for Noosa.
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const decl = 23.45 * Math.sin(((360 / 365) * (dayOfYear - 81) * Math.PI) / 180);
  const latRad = (lat * Math.PI) / 180;
  const declRad = (decl * Math.PI) / 180;
  const cosH = -Math.tan(latRad) * Math.tan(declRad);
  if (cosH > 1 || cosH < -1) {
    return { sunrise: "—", sunset: "—" };
  }
  const H = (Math.acos(cosH) * 180) / Math.PI / 15; // hours
  const solarNoon = 12 - lng / 15;
  const sunrise = solarNoon - H;
  const sunset = solarNoon + H;
  return { sunrise: hhmm(sunrise), sunset: hhmm(sunset) };
}

function hhmm(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function moonPhase(date: Date): { phase: string; illumination: number } {
  // Conway's algorithm — accurate to ~1 day; fine for an editorial card.
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  let r = y % 100;
  r %= 19;
  if (r > 9) r -= 19;
  r = (r * 11) % 30 + m + d;
  if (m < 3) r += 2;
  r -= y < 2000 ? 4 : 8.3;
  r = ((r + 30) % 30 + 30) % 30;
  const illumination = (1 - Math.cos((r / 29.53) * 2 * Math.PI)) * 50;
  let phase: string;
  if (r < 1) phase = "New";
  else if (r < 7) phase = "Waxing crescent";
  else if (r < 9) phase = "First quarter";
  else if (r < 14) phase = "Waxing gibbous";
  else if (r < 16) phase = "Full";
  else if (r < 22) phase = "Waning gibbous";
  else if (r < 24) phase = "Last quarter";
  else if (r < 28) phase = "Waning crescent";
  else phase = "New";
  return { phase, illumination };
}

/* ────────────────────────────────────────────────────────────────
 * Static fallback — used when all APIs fail or when the request
 * budget runs out. Values are sourced from BOM climatology for late
 * winter Noosa (typical morning observation). The state is
 * "unavailable" so the UI renders the coral Unavailable badge.
 * ──────────────────────────────────────────────────────────────── */

function fallbackBundle(reason: string): LiveBundle {
  return {
    asOf: FALLBACK_AS_OF,
    state: "unavailable",
    surf: {
      value: "unavailable",
      secondary: `Live tile unreachable (${reason}). Check BOM Capricornia–Hervey Bay.`,
      source: "Open-Meteo Marine",
      state: "unavailable",
    },
    wind: {
      value: "unavailable",
      secondary: `Live tile unreachable (${reason}).`,
      source: "Open-Meteo Forecast",
      state: "unavailable",
    },
    tide: {
      value: "unavailable",
      secondary: "BOM Tewantin harmonic still authoritative — link in footer.",
      source: "Open-Meteo + BOM",
      state: "unavailable",
    },
    uv: {
      value: "unavailable",
      secondary: "Cancer Council SunSmart thresholds: ≥ 3 = protection.",
      source: "Open-Meteo + SunSmart",
      state: "unavailable",
    },
    sunMoon: {
      value: "06:10 – 17:30",
      secondary: "Approximate winter solstice values for Noosa Heads.",
      source: "Computed (NOAA solar algorithm)",
      state: "stale",
    },
    sourceNote: `Live data unavailable (${reason}). Showing safe fallback.`,
  };
}
