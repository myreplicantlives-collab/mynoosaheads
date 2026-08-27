# My Noosa Heads

> Plan your Noosa trip well.

A tourism-positive, sourced guide to Noosa Heads (Queensland, Australia).

**Status:** Sprint 1.2 of 5 — design system + brand/logo mocks shipped; content + CI/CD coming in subsequent sub-tasks.

This is the new foundation. The previous v2 build is retained in the
post-MSN-2881 rollback snapshot for reference; this repository is the
canonical build going forward.

## What is here (Sprint 1.2)

- Next.js 14 (App Router) + TypeScript strict + Tailwind CSS 3
- MDX support via `next-mdx-remote` (server-rendered)
- **Design system** — `src/components/ui/`:
  - Typography: Fraunces (display) + Inter (body) + Caveat (accent) via `next/font`, 14-step fluid scale
  - Colour ramps: 7 palettes × 11 shades (50–950) — Paper / Ink / Eucalyptus / Ocean / Rainforest / Coral / Sand
  - Components: Button (6 variants × 4 sizes), Card, Hero, NavBar, Footer, LiveDataWidget, Form, Logo, Icon (21)
- `/styleguide` — live design system reference (Albert-facing logo review)
- 3 logo mocks at `public/brand/logo-{1,2,3}.svg` (Albert picks the final)
- Homepage, `/hello-noosa` sample MDX, `/styleguide`, 404 page
- Accessibility: skip link, focus rings, ARIA landmarks, axe-core 0 violations
- Path aliases: `@/components/*`, `@/lib/*`, `@/content/*`, `@/data/*`

## What is NOT here yet

- Design system (typography scale, component library, accessibility primitives) — **TSK-2957-02 ✓**
- Real content (where to stay, eat & drink, surf & weather, hikes, things to do, itineraries) — **TSK-2957-03**
- Custom domain DNS flip from GoDaddy to Vercel — **TSK-2957-03**
- Per-PR preview deploys, Lighthouse CI, broken-link scans — **TSK-2957-04**
- Live data refreshers (BOM marine, Open-Meteo, QPWS alerts) — **TSK-2957-03**

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

### GitHub auto-deploy (planned for TSK-2957-04)

1. Push this repo to GitHub.
2. In Vercel, set the production branch to `main`.
3. Future pushes to `main` auto-deploy.

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
  credentials (Sally routes the question).# Sprint 1.1 — auto-deploy verified 2026-08-27T11:06:39Z
