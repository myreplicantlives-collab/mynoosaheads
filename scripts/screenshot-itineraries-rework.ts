#!/usr/bin/env tsx
// scripts/screenshot-itineraries-rework.ts — desktop + mobile screenshots
// for the four new itinerary deep-dive pages.
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

mkdirSync("evidence/screenshots-prod", { recursive: true });

const base = process.argv[2] || "http://localhost:3011";

const pages = [
  "/itineraries/one-day",
  "/itineraries/weekend",
  "/itineraries/four-days",
  "/itineraries/family",
];

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: chromePath,
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });
  try {
    for (const route of pages) {
      const label = route.replace(/^\//, "").replace(/\//g, "-");
      for (const [suffix, w, h] of [["desktop", 1280, 900], ["mobile", 390, 844]] as const) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h } });
        const page = await ctx.newPage();
        try {
          await page.goto(base + route, { waitUntil: "networkidle", timeout: 30000 });
          await page.waitForTimeout(800);
          await page.screenshot({ path: `evidence/screenshots-prod/${label}-${suffix}.png`, fullPage: false });
          process.stdout.write(`✓ ${label}-${suffix} `);
        } catch (e) {
          console.error(`✗ ${label}-${suffix}:`, e);
        } finally {
          await ctx.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
  console.log("\nDone");
}

main();