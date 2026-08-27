# mynoosaheads.com v2

> Plan your Noosa trip well.

A tourism-positive, photo-led, sourced guide to Noosa Heads (Queensland, Australia). Built fresh in August 2026 under chairman direction, replacing the prior "Honest Guide" anti-tourism build.

## What's here

- **Homepage** — hero, utility grid, tone, where-to-stay callout, monetisation note
- **Where to stay** — area comparison table + cards (Hastings Street, Noosaville, Sunshine Beach, Peregian, Hinterland), occasion table, FAQ. Visit-Noosa-benchmark clean filters + contextual affiliate CTAs
- **Eat & drink** — 20 reviewed restaurants across 5 areas, all with verified official websites
- **Surf & weather** — live BOM forecast via Open-Meteo + BOM marine forecast, source-health panel, honest accuracy notes
- **National Park** — full coastal walk, headlands, walks table, dolphin/whale seasons, current QPWS alerts
- **Hikes** — 6 walks with distances/times and QPWS links
- **Things to do** — sports, tours, boat hire, fishing, offers
- **Itineraries** — 6 trip plans (1-day, weekend, 4-day, family, surfer, foodie)
- **Webcams** — links to public Coastwatch/council cams (no fake embeds)
- **Fishing** — species table, BOM tide links, QLD rules
- **Boat hire** — 4 verified operators with Viator affiliate links
- **K'gari (Fraser Island)** — operators, permits, safety, weather
- **Offers** — 3 real partner offers (Booking.com, GetYourGuide, Viator)
- **Sources** — full citation ledger (35+ sources)
- **About / Contact / Editorial policy / Corrections / Image credits**

## Stack

- Next.js 14.2.15 (App Router, TypeScript)
- Tailwind CSS 3.4.13 (parchment + ocean + rainforest + coral palette)
- Static export-friendly (`output: 'export'` would work — currently SSR via Vercel)
- Image registry: 15 CC BY/SA Wikimedia Commons photos
- Live data: BOM marine (XML), Open-Meteo (JSON), refresh on `npm run data:refresh`

## Run locally

```bash
npm install
npm run dev              # http://localhost:3011
npm run build            # static export
npm run data:refresh     # refresh live snapshots
npm run link:scan        # broken-link scan
npm run lighthouse       # lighthouse on prod (after deploy)
```

## Deploy

```bash
npm run deploy:prod
```

Targets the existing Vercel project `noosa-site-v2` in the `myreplicantlives-5263` workspace.

## Custom domain

`mynoosaheads.com` is **parked at GoDaddy** (A records `76.223.67.189` / `13.248.213.45`, NS `domaincontrol.com`). The build is production-ready on the Vercel project; the DNS flip requires GoDaddy credentials that are not in this build scope.

Live URL: **https://noosa-site-v2.vercel.app**

## Honest boundaries

- No sample data, no fake webcams, no invented affiliate IDs, no fabricated surf numbers
- All imagery CC BY or CC BY-SA with full attribution
- Affiliate links are environment-driven (`NEXT_PUBLIC_BOOKING_AID` etc.); unset = official-fallback destination + "Partner · not yet monetised" badge
- Provider outages show explicit unavailable/error state with last refresh time
- BOM marine forecasts cover a large zone — we don't claim metre-level surf accuracy

See `/sources`, `/editorial-policy` and `/corrections` for the standards in full.
