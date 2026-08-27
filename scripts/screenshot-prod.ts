// scripts/screenshot-prod.ts — production screenshots
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

mkdirSync("evidence/screenshots-prod", { recursive: true });

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });
  const pages = [
    "/", "/where-to-stay", "/eat-drink", "/surf-weather", "/national-park",
    "/places", "/hikes", "/things-to-do", "/itineraries", "/webcams",
    "/fishing", "/boat-hire", "/fraser-kgari", "/sources",
  ];
  try {
    for (const route of pages) {
      const label = (route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-"));
      for (const [suffix, w, h] of [["desktop", 1280, 900], ["mobile", 390, 844]] as const) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h } });
        const page = await ctx.newPage();
        try {
          await page.goto("https://noosa-site-v2.vercel.app" + route, { waitUntil: "networkidle", timeout: 30000 });
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
