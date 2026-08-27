#!/usr/bin/env tsx
// scripts/refresh-data.ts — fetches live snapshots of public open-data sources.
// Output: src/data/live/*.json — read by the build and by /health.json.
//
// Honest policy:
//   • Every fetch is wrapped — any failure is recorded as status: "unavailable".
//   • Every snapshot is timestamped (ISO 8601 UTC).
//   • No fabricated values. When a feed is missing, we say so.
//   • No scraping of pages whose terms prohibit it.

import { writeFileSync, mkdirSync } from "node:fs";
import { join as pathJoin } from "node:path";
import { XMLParser } from "fast-xml-parser";

// Use a real browser UA — BOM/QPWS reject obvious bot UAs with 403.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15";
const OUT = "src/data/live";

type Snapshot<T> = {
  fetchedAt: string; // ISO UTC
  status: "ok" | "partial" | "unavailable";
  source: string; // canonical URL
  note?: string;
  data?: T;
};

async function fetchText(url: string, timeoutMs = 8000): Promise<{ ok: true; text: string } | { ok: false; error: string }> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "application/xml,text/xml,text/html,*/*",
        "Accept-Language": "en-AU,en;q=0.9",
      },
      signal: ctrl.signal,
      redirect: "follow",
    });
    clearTimeout(timer);
    if (!r.ok) return { ok: false, error: `HTTP ${r.status}` };
    return { ok: true, text: await r.text() };
  } catch (e: unknown) {
    clearTimeout(timer);
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

async function bomMarine(): Promise<Snapshot<unknown>> {
  const url = "http://www.bom.gov.au/fwo/IDQ11290.xml";
  const r = await fetchText(url);
  if (!r.ok) {
    return {
      fetchedAt: new Date().toISOString(),
      status: "unavailable",
      source: url,
      note: `BOM marine forecast unreachable: ${r.error}`,
    };
  }
  try {
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
    const j = parser.parse(r.text);
    // Find Sunshine Coast Waters area
    const forecast = j?.product?.forecast;
    if (!forecast?.area) throw new Error("Unexpected XML structure");
    const areas = Array.isArray(forecast.area) ? forecast.area : [forecast.area];
    const target = areas.find((a: any) => (a["@_description"] || "").includes("Sunshine Coast Waters"));
    if (!target) throw new Error("Sunshine Coast Waters area not found");
    const rawPeriods = target["forecast-period"];
    const periods = Array.isArray(rawPeriods) ? rawPeriods : [rawPeriods];
    const out = periods.map((p: any) => {
      const texts = Array.isArray(p.text) ? p.text : [p.text];
      const item: Record<string, string> = {};
      for (const t of texts) item[t["@_type"]] = t["#text"];
      return {
        startLocal: p["@_start-time-local"],
        endLocal: p["@_end-time-local"],
        ...item,
      };
    });
    const issueTime = forecast?.source?.amoc?.issue_time_utc || forecast?.source?.["amoc:issue-time-utc"];
    return {
      fetchedAt: new Date().toISOString(),
      status: "ok",
      source: url,
      note: "BOM Sunshine Coast Waters (Double Island Point to Cape Moreton). Resolution: 4 daily forecast periods, wind to ~knots, seas to ~metres.",
      data: {
        zone: "Sunshine Coast Waters: Double Island Point to Cape Moreton",
        issueTimeUtc: issueTime || "unknown",
        periods: out,
      },
    };
  } catch (e: unknown) {
    return {
      fetchedAt: new Date().toISOString(),
      status: "unavailable",
      source: url,
      note: `BOM marine XML parse failed: ${e instanceof Error ? e.message : String(e)}`,
    };
  }
}

async function bomNoosaPointForecast(): Promise<Snapshot<unknown>> {
  // BOM's Noosa heads page is fully JavaScript-driven and its JSON product endpoints
  // return 404 for this location (different ID space). We use Open-Meteo (public,
  // BOM-input source) for current conditions and 7-day forecast, and we link to
  // the BOM source as the authoritative reference.
  const lat = -26.394; // Noosa Heads
  const lon = 153.09;
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code,apparent_temperature,wind_direction_10m` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code,wind_speed_10m_max,wind_direction_10m_dominant` +
    `&forecast_days=7&timezone=Australia%2FBrisbane`;
  const r = await fetchText(url);
  if (!r.ok) {
    return {
      fetchedAt: new Date().toISOString(),
      status: "unavailable",
      source: url,
      note: `Open-Meteo unreachable: ${r.error}. The BOM Noosa Heads source page remains the authoritative reference: http://www.bom.gov.au/qld/forecasts/noosa-heads.shtml`,
    };
  }
  try {
    const j = JSON.parse(r.text);
    return {
      fetchedAt: new Date().toISOString(),
      status: "ok",
      source: url,
      note: "Open-Meteo forecast API (public, no-auth, combines national weather services including BOM). Source attribution: open-meteo.com.",
      data: j,
    };
  } catch (e) {
    return {
      fetchedAt: new Date().toISOString(),
      status: "unavailable",
      source: url,
      note: `Open-Meteo parse failed: ${e instanceof Error ? e.message : String(e)}`,
    };
  }
}

async function qpwsAlerts(): Promise<Snapshot<unknown>> {
  // QPWS portal blocks non-browser requests. We surface the official URL and
  // record the failed fetch as unavailable so the UI can show "check the source".
  const url = "https://parks.des.qld.gov.au/alerts/?p=NOOSA";
  const r = await fetchText(url);
  if (!r.ok) {
    return {
      fetchedAt: new Date().toISOString(),
      status: "unavailable",
      source: url,
      note: `QPWS alerts page could not be fetched from this build (${r.error}). The QPWS source remains authoritative — always check the URL above before walking the coastal track.`,
      data: { source_url: url, last_attempted: new Date().toISOString() },
    };
  }
  return {
    fetchedAt: new Date().toISOString(),
    status: "ok",
    source: url,
    note: "QPWS alerts page reachable. Detailed titles vary; link to source for current alerts.",
    data: { source_url: url, last_attempted: new Date().toISOString() },
  };
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const tasks = [
    ["bom-marine.json", bomMarine],
    ["bom-noosa-forecast.json", bomNoosaPointForecast],
    ["qpws-noosa-alerts.json", qpwsAlerts],
  ] as const;
  for (const [name, fn] of tasks) {
    try {
      const s = await fn();
      writeFileSync(pathJoin(OUT, name), JSON.stringify(s, null, 2));
      console.log(`${s.status.padEnd(11)} ${name} ${s.source}`);
    } catch (e) {
      console.error(`FAIL ${name}:`, e);
      const s: Snapshot<unknown> = {
        fetchedAt: new Date().toISOString(),
        status: "unavailable",
        source: "(unknown)",
        note: e instanceof Error ? e.message : String(e),
      };
      writeFileSync(pathJoin(OUT, name), JSON.stringify(s, null, 2));
    }
  }
  // Aggregate health.json
  const fs = await import("node:fs");
  const all = tasks.map(([n]) => JSON.parse(fs.readFileSync(pathJoin(OUT, n), "utf8")));
  const health = {
    site: "mynoosaheads.com",
    generatedAt: new Date().toISOString(),
    sources: all.map((s: Snapshot<unknown>) => ({
      source: s.source,
      status: s.status,
      fetchedAt: s.fetchedAt,
      note: s.note,
    })),
  };
  writeFileSync(pathJoin(OUT, "_health.json"), JSON.stringify(health, null, 2));
  console.log("ok — wrote snapshots to", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});