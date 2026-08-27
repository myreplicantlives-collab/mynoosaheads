#!/usr/bin/env tsx
// scripts/broken-link-scan.ts — scan the live preview for broken internal links
// Usage: tsx scripts/broken-link-scan.ts <base-url>

import { writeFileSync } from "node:fs";

const base = process.argv[2] || "http://localhost:3011";
const routes = [
  "/",
  "/where-to-stay",
  "/eat-drink",
  "/surf-weather",
  "/national-park",
  "/hikes",
  "/things-to-do",
  "/itineraries",
  "/itineraries/one-day",
  "/itineraries/weekend",
  "/itineraries/four-days",
  "/itineraries/family",
  "/itineraries/fraser-island",
  "/webcams",
  "/fishing",
  "/boat-hire",
  "/fraser-kgari",
  "/places",
  "/places/main-beach",
  "/places/little-cove",
  "/places/sunshine-beach",
  "/places/peregian",
  "/places/noosaville",
  "/places/tewantin",
  "/places/national-park",
  "/places/hinterland",
  "/offers",
  "/visit",
  "/sources",
  "/about",
  "/contact",
  "/editorial-policy",
  "/corrections",
  "/image-credits",
  "/health.json",
];

const linkRegex = /href="(\/[^"#?]*)"/g;

async function check(url: string): Promise<{ status: number; url: string; ok: boolean }> {
  try {
    const r = await fetch(url, { redirect: "follow" });
    return { status: r.status, url, ok: r.status < 400 };
  } catch (e) {
    return { status: 0, url, ok: false };
  }
}

async function main() {
  console.log(`Scanning ${base} for broken routes…`);
  const results: { route: string; status: number; ok: boolean }[] = [];
  for (const r of routes) {
    const u = `${base}${r}`;
    const res = await check(u);
    results.push({ route: r, status: res.status, ok: res.ok });
    process.stdout.write(res.ok ? "." : "F");
  }
  console.log("");

  // Also extract links from home + key pages
  const samplePages = ["/", "/where-to-stay", "/eat-drink", "/surf-weather", "/national-park", "/itineraries", "/sources"];
  const broken: { from: string; to: string; status: number }[] = [];
  for (const p of samplePages) {
    try {
      const html = await (await fetch(`${base}${p}`)).text();
      const matches = [...html.matchAll(linkRegex)].map((m) => m[1]);
      const internal = [...new Set(matches)].filter((l) => l.startsWith("/"));
      for (const link of internal) {
        const res = await check(`${base}${link}`);
        if (!res.ok) broken.push({ from: p, to: link, status: res.status });
      }
    } catch {
      // ignore
    }
  }

  const okCount = results.filter((r) => r.ok).length;
  const total = results.length;
  const report = {
    base,
    timestamp: new Date().toISOString(),
    routeSummary: results,
    okCount,
    brokenCount: total - okCount,
    totalRoutes: total,
    brokenLinksFromSamples: broken,
  };
  writeFileSync("evidence/broken-link-scan.json", JSON.stringify(report, null, 2));
  console.log(`Routes: ${okCount}/${total} OK, ${total - okCount} broken`);
  console.log(`Broken internal links found in samples: ${broken.length}`);
  for (const b of broken) {
    console.log(`  ${b.from} → ${b.to} (${b.status})`);
  }
  if (total - okCount > 0 || broken.length > 0) process.exit(1);
}

main();
