# My Noosa Heads

> Plan your Noosa trip well.

A tourism-positive, sourced guide to Noosa Heads (Queensland, Australia).

[![Live](https://img.shields.io/badge/Live-noosa--site--v2.vercel.app-success?style=flat-square)](https://noosa-site-v2.vercel.app/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/myreplicantlives-5263s-projects/noosa-site-v2)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Sprint](https://img.shields.io/badge/Sprint-1.4%20%2F%205-blue?style=flat-square)](./RUNBOOK.md)
[![ESLint](https://img.shields.io/badge/ESLint-0%20warnings%20%2F%200%20errors-brightgreen?style=flat-square)](./RUNBOOK.md)
[![Cron](https://img.shields.io/badge/Cron-5%20jobs%20live-brightgreen?style=flat-square)](./RUNBOOK.md)

**Status:** Sprint 1.4 of 5 — operational baseline shipped (CI/CD + Sentry + cron + ESLint clean). Next: Victor QA gate (TSK-2957-05).

This is the new foundation. The previous v2 build is retained in the
post-MSN-2881 rollback snapshot for reference; this repository is the
canonical build going forward.

## What is here (Sprint 1.4)

- Next.js 14 (App Router) + TypeScript strict + Tailwind CSS 3
- **14 public routes** live: `/`, 8 categories, 5 editorial/legal pages
- **Live data** — Open-Meteo Marine + Forecast + NOAA solar + Conway moon
- **Design system** — Fraunces / Inter / Caveat, 7 colour ramps × 11 shades
- **Accessibility** — skip link, focus rings, ARIA landmarks, axe-core 0 violations
- **ESLint** — 0 warnings / 0 errors
- **Sitemap** — `/sitemap.xml` auto-generated from `src/app/sitemap.ts`
- **Robots** — `/robots.txt` allows /, disallows `/api/`, `/styleguide`, `/_next/`
- **Sentry** — `@sentry/nextjs` 8.55 wired (client/server/edge); activation gated on `SENTRY_DSN` env var
- **Sentry test endpoint** — `/api/sentry-example-error` throws a verifiable error
- **5 OpenClaw cron jobs** — health-check / broken-link / sitemap / affiliate-link / content-backup (see [RUNBOOK](./RUNBOOK.md))
- **Vercel auto-deploy** — `main` → production; PRs get preview URLs
- **Operational runbook** — see [RUNBOOK.md](./RUNBOOK.md)

## What is NOT here yet

- Sentry org/DSN — **needs Tim's Sentry account** (see [RUNBOOK §3](./RUNBOOK.md#3-view-sentry-errors))
- Better Stack uptime monitor — **needs Tim's Better Stack account** (see [RUNBOOK §4](./RUNBOOK.md#4-view-better-stack-uptime))
- Lighthouse CI — deferred (Vercel Speed Insights covers the basics for free)
- Per-PR preview deploys already work via Vercel Git integration (no extra wiring needed)
- Custom domain DNS flip from GoDaddy to Vercel — **blocked on Tim providing GoDaddy creds**

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14.2.15 (App Router) |
| Language | TypeScript 5.6.2 (strict mode) |
| Styling | Tailwind CSS 3.4.13 + `@tailwindcss/typography` |
| MDX | `next-mdx-remote` 5.0.0 (server components) + `gray-matter` + `reading-time` |
| Hosting | Vercel Hobby (free tier) — upgrade to Pro A$30/mo only when traffic warrants |
| GitHub | (to be linked — see "Deploy" section below) |
| Custom domain | `mynoosaheads.com` (currently parked at GoDaddy) |

## Folder structure

```
mynoosaheads/
├── app/                    # Next.js App Router (NOTE: this project uses src/app/)
├── content/                # MDX content files
│   └── posts/
│       └── hello-noosa.mdx # sample post (Sprint 1.1 demo)
├── lib/                    # cross-cutting utilities
│   └── posts.ts            # MDX loader (gray-matter + reading-time)
├── public/                 # static assets (favicon, robots.txt)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── hello-noosa/
│   │   │   └── page.tsx    # MDX route
│   │   ├── globals.css     # Tailwind base + 7-token palette
│   │   ├── layout.tsx      # root layout
│   │   ├── not-found.tsx   # 404
│   │   └── page.tsx        # "Hello, Noosa" landing
│   ├── components/         # React components
│   │   ├── mdxComponents.tsx
│   │   ├── SiteFooter.tsx
│   │   └── SiteHeader.tsx
│   └── data/
│       └── site.ts         # SITE + SPRINT constants
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts      # 7-token palette + typography plugin
├── tsconfig.json           # strict mode + path aliases
└── README.md
```

## Local dev

```bash
npm install
npm run dev              # http://localhost:3010
```

The dev server runs on **port 3010** by default (per the Sprint 1.1 brief;
the previous v2 used 3011).

## Production build

```bash
npm run build
npm run start            # serves the production build on port 3010
```

## Deploy

### Vercel (current production)

- Project: `noosa-site-v2` (id `prj_2muUnurKCimGdolqUvS2mDjZmQPY`)
- Workspace: `myreplicantlives-5263`
- Production URL: **https://noosa-site-v2.vercel.app** (200 OK)
- Custom domain: `mynoosaheads.com` (parked at GoDaddy — DNS flip is TSK-2957-03)

```bash
vercel link --project noosa-site-v2     # one-time
vercel deploy --prod --yes              # deploy the current branch
```

### GitHub auto-deploy (live as of Sprint 1.4)

- Repo: `https://github.com/myreplicantlives-collab/mynoosaheads`
- Production branch: `main` — every merge auto-deploys (~30–60s).
- PR previews: every PR gets a unique preview URL via Vercel.
- Verified: Sprint 1.4 PR #1 → squash-merged → production deployment `b47b6ac` (TSK-2957-04).

To trigger a manual production deploy:

```bash
vercel deploy --prod --yes
```

To roll back to a prior known-good build: see [RUNBOOK §2](./RUNBOOK.md#2-roll-back-a-deploy).

## Design tokens

The coastal palette is defined in `src/app/globals.css` as CSS custom
properties and exposed via Tailwind utilities (`bg-ocean`, `text-text`,
`bg-surface`, etc.). The brief asks for 7 tokens; all are present:

| # | Token | Hex | Role |
|---|---|---|---|
| 1 | `--color-bg` | `#FBF7F0` | Page background (warm parchment) |
| 2 | `--color-surface` | `#F5EFE3` | Card / panel surface |
| 3 | `--color-text` | `#251F17` | Primary text |
| 4 | `--color-text-muted` | `#54483A` | Secondary text |
| 5 | `--color-ocean` | `#1D5A6F` | Primary brand (ocean blue) |
| 6 | `--color-rainforest` | `#3A5240` | Secondary brand (rainforest) |
| 7 | `--color-coral` | `#D26A4C` | Accent (sunset coral) |

TSK-2957-02 will extend these into full scales (50–900).

## Operational baseline

See [RUNBOOK.md](./RUNBOOK.md) for:

- Health check, rollback, Sentry, Better Stack, cron logs
- Manual triggers for each cron job
- Escalation matrix (Sally vs Tim)
- Cron schedule reference

**Cron jobs (live):**

| Cron | Schedule | Purpose |
|---|---|---|
| health_check | every 15 min | HEAD on production URL |
| broken_link_check | daily 09:30 BST | linkinator crawl of all 14 routes |
| sitemap_regen | Mon 03:00 BST | verify /sitemap.xml + IndexNow submit |
| affiliate_check | 1st of month 04:00 BST | Booking/Stayz/Expedia/Airbnb validity |
| db_backup | daily 02:00 BST | tarball + git-commit content/ tree |

All alerts route to Tim via Telegram (chat ID 7620112671).

## Build plan reference

MSN-2956 build plan (DOCX):
https://docs.google.com/document/d/1uhgrrsZjayHMPiJGB7_NHsq3N__SV-lD/edit

## Honest boundaries

- Sprint 1.1 ships **no real content** — that lands in Sprint 1.3.
- The production URL is intentionally minimal: a "Hello, Noosa" landing.
- The previous v2 build is preserved in the post-rollback snapshot for
  reference; the new v3 (this build) replaces it.
- The custom domain DNS is still parked at GoDaddy. The Vercel build is
  production-ready at `https://noosa-site-v2.vercel.app`; the
  `mynoosaheads.com` flip is gated on Tim providing GoDaddy DNS
  credentials (Sally routes the question).# Sprint 1.4 — operational baseline shipped 2026-08-27
# Sprint 1.3 — content migration shipped 2026-08-27
# Sprint 1.1 — auto-deploy verified 2026-08-27T11:06:39Z
