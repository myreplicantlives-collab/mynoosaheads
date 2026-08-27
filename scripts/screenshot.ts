#!/usr/bin/env tsx
// scripts/screenshot.ts — desktop + mobile screenshots of key pages
import { chromium } from "playwright-core";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const base = process.argv[2] || "http://localhost:3011";
const outDir = "evidence/screenshots";
mkdirSync(outDir, { recursive: true });

// Use system Chrome path
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const pages = [
  "/",
  "/where-to-stay",
  "/eat-drink",
  "/surf-weather",
  "/national-park",
  "/places",
  "/hikes",
  "/things-to-do",
  "/itineraries",
  "/webcams",
  "/fishing",
  "/boat-hire",
  "/fraser-kgari",
  "/sources",
];

async function shoot(browser: any, route: string, label: string, viewport: { width: number; height: number }, deviceType: string) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  try {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(800); // small settle for hero image
    const filename = `${outDir}/${label}-${deviceType}.png`;
    await page.screenshot({ path: filename, fullPage: false });
    console.log(`✓ ${filename}`);
  } catch (e) {
    console.error(`✗ ${route} (${deviceType}): ${e instanceof Error ? e.message : String(e)}`);
  } finally {
    await ctx.close();
  }
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: chromePath,
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });
  try {
    for (const route of pages) {
      const label = (route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-"));
      await shoot(browser, route, label, { width: 1280, height: 900 }, "desktop");
      await shoot(browser, route, label, { width: 390, height: 844 }, "mobile");
    }
  } finally {
    await browser.close();
  }
  console.log(`\nScreenshots written to ${outDir}/`);
}

main();
