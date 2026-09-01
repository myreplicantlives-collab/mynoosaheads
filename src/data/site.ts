/**
 * Site constants — single source of truth for nav, footers, disclosure,
 * and category content seeds. Sprint 1.3 content migration.
 *
 * Architecture: this file owns the static content. The category pages
 * (`src/app/<route>/page.tsx`) import NAV, FOOTER_DISCLOSURE, and
 * CATEGORIES below so a single edit re-flows the whole site. Live data
 * is fetched server-side at build/request time via lib/live-data.ts and
 * never baked into this file.
 *
 * AU English throughout. No fabricated metrics. Every category points at
 * an authoritative external source where applicable.
 */

export const SITE = {
  brand: "My Noosa Heads",
  brandShort: "mynoosaheads",
  tagline: "Discover Noosa.",
  domain: "mynoosaheads.com",
  // MSN-2964: live URL is the Cloudflare Workers deployment. The Vercel
  // URL is no longer authoritative (it returns 404 to external reviewers
  // and is being retired). Override via NEXT_PUBLIC_SITE_URL env var on
  // any future environment that needs a different canonical host.
  productionUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://mynoosaheads.twainent.workers.dev",
  stagingUrl: "https://mynoosaheads.twainent.workers.dev",
  email: "hello@mynoosaheads.com",
  locale: "en-AU",
  region: "Queensland, Australia",
  established: 2026,
  /**
   * MSN-3044 — Item 9 dev-site protection.
   * isProduction is false unless NEXT_PUBLIC_SITE_URL resolves to the
   * real production hostname (mynoosaheads.com). Any Workers / Pages
   * preview URL (.workers.dev, .pages.dev) is treated as non-production
   * so the layout emits noindex + the X-Robots-Tag HTTP header + the
   * robots.txt and sitemap behave accordingly.
   *
   * Override at deploy time by setting NEXT_PUBLIC_SITE_URL to the
   * production hostname. The audit's findings 9.1-9.7 only apply to
   * the non-production build path.
   */
  isProduction:
    (() => {
      const url = process.env.NEXT_PUBLIC_SITE_URL ?? "";
      return (
        url.endsWith("mynoosaheads.com") &&
        !url.includes("workers.dev") &&
        !url.includes("pages.dev")
      );
    })(),
  /**
   * MSN-3044 — Item 9 followup (Victor flag): the production-domain
   * email is exposed in JSON-LD on the homepage and on /contact,
   * /privacy, /terms mailto: links. We keep it in the rendered HTML
   * because the contact page legitimately needs it, but we document
   * its status here: see MSN-3044/evidence/hello_mynoosaheads_dns.md
   * for the DNS+MX check (no MX records, GoDaddy parking lander).
   * The email is currently NOT a live inbox — chairman approval
   * required to set up Google Workspace / Microsoft 365.
   */
  contactEmailStatus: "no-mx-records",
  /** AU Editor/Owner persona — used in editorial bylines. */
  editor: {
    name: "The MyNoosaHeads editors",
    role: "Coastal editorial team",
    location: "Noosa Heads, Queensland",
  },
} as const;

export const SPRINT = {
  id: "Sprint 1.3",
  title: "Content + base pages",
  parentMission: "MSN-2957 — mynoosaheads.com Sprint 1 (Foundation)",
} as const;

/**
 * Primary navigation — MSN-2972 IA rewrite.
 * Order is visitor-first (per Albert's D4 brief): Stay first (commercial
 * anchor), then Things to do, Beaches & nature, Eat & drink, Plan your
 * trip, Today in Noosa. The old category routes (fishing, boats, travel,
 * webcams) survive as direct URLs and as the "More" footer section.
 * No newsletter link, no login, no social. Per chairman directive 2026-08-27.
 */
export const NAV = [
  { label: "Stay", href: "/accommodation", description: "Where to stay — four areas, three curated properties." },
  { label: "Areas", href: "/areas", description: "Hastings Street, Noosaville, Sunshine, Peregian." },
  { label: "Things to do", href: "/things-to-do", description: "Ten ways to spend your days." },
  { label: "Beaches & nature", href: "/beaches-and-nature", description: "Beaches, national park, nature precincts." },
  { label: "Eat & drink", href: "/eat-and-drink", description: "Six anchor venues across three precincts." },
  { label: "Live", href: "/live", description: "Live conditions — surf, weather, tide, UV." },
] as const;

/**
 * Eight functional-area landing pages — used by the homepage entry grid
 * and by the dynamic /[category] route stub. Each entry owns its hero,
 * short pitch, icon, and source list.
 */
export const CATEGORIES = [
  {
    slug: "surf-and-weather",
    href: "/surf-and-weather",
    navLabel: "Surf & weather",
    icon: "Wave" as const,
    pitch: "Today's swell, wind, tide, and UV — from BOM Southeast Coast and Open-Meteo Marine.",
    longDescription:
      "Live conditions for Noosa Heads: BOM Southeast Coast marine district and Open-Meteo's free marine API. Tiles refresh themselves every 30 minutes without a human pushing them.",
    primarySources: [
      { label: "BOM Southeast Coast", href: "https://www.bom.gov.au/coastal-location/australia" },
      { label: "MSQ — Noosa bar report", href: "https://www.msq.qld.gov.au/" },
      { label: "Open-Meteo Marine Weather API", href: "https://open-meteo.com/en/docs/marine-weather-api" },
      { label: "BOM Tewantin tide", href: "https://www.bom.gov.au/australia/tides/#!/qld-tewantin" },
    ],
  },
  {
    slug: "noosa-national-park",
    href: "/noosa-national-park",
    navLabel: "Noosa National Park",
    icon: "ParkGate" as const,
    pitch: "Coastal walk, Tanglewood track, wildlife sightings — QPWS alerts on top.",
    longDescription:
      "Noosa National Park covers 2,883 hectares (28.83 km²) between Noosa Heads and Peregian Beach. The park is managed by the Queensland Parks and Wildlife Service. We link directly to QPWS alerts and conditions pages so you can check before you drive.",
    primarySources: [
      { label: "QPWS — Noosa National Park", href: "https://parks.qld.gov.au/find-a-park/national-parks/noosa-national-park" },
      { label: "QPWS park alerts", href: "https://parks.qld.gov.au/park-alerts" },
    ],
  },
  {
    slug: "accommodation",
    href: "/accommodation",
    navLabel: "Accommodation",
    icon: "Compass" as const,
    pitch: "Hotels, apartments, holiday houses across the shire.",
    longDescription:
      "We don't take inventory. Each booking option links out to a third-party booking engine. Where MyNoosaHeads participates in an affiliate programme and the link is monetised, it is marked Affiliate before you click, per the Competition and Consumer Act 2010 (Cth) Schedule 2. The full disclosure is in the footer.",
    primarySources: [
      { label: "Visit Noosa — Where to stay", href: "https://www.visitnoosa.com.au/" },
      { label: "Noosa Shire Council — Visitor info", href: "https://www.noosa.qld.gov.au/Community-services/Visitor-information" },
    ],
  },
  {
    slug: "things-to-do",
    href: "/things-to-do",
    navLabel: "Things to do",
    icon: "Eucalyptus" as const,
    pitch: "Day-by-day ideas across the shire — coast, river, hinterland.",
    longDescription:
      "Categories cover the four functional corners of the shire — Hastings Street, the Noosa River, the hinterland villages (Pomona, Cooran, Kin Kin), and the surf beaches — each with its own weather and tide cues.",
    primarySources: [
      { label: "Visit Noosa", href: "https://www.visitnoosa.com.au/" },
      { label: "Noosa Council — About Noosa", href: "https://www.noosa.qld.gov.au/Community/About-Noosa" },
    ],
  },
  {
    slug: "fishing-reports",
    href: "/fishing-reports",
    navLabel: "Fishing reports",
    icon: "Fish" as const,
    pitch: "Weekly insight, tide tables, solunar times.",
    longDescription:
      "Recreational fishing in Queensland is governed by a possession-limit and size-limit framework. We publish the current Noosa-region rules, point at the QLD Government's recreational fishing page, and link the BOM tide for Tewantin. Live fish-catch data is not free and is deferred to Sprint 2.",
    primarySources: [
      { label: "QLD recreational fishing rules", href: "https://www.qld.gov.au/recreation/activities/boating-fishing/rec-fishing" },
      { label: "BOM Tewantin tide", href: "https://www.bom.gov.au/australia/tides/#!/qld-tewantin" },
    ],
  },
  {
    slug: "boats-and-watercraft",
    href: "/boats-and-watercraft",
    navLabel: "Boats & watercraft",
    icon: "Boat" as const,
    pitch: "Hire options, Noosa River bar, public ramps.",
    longDescription:
      "Crossing the Noosa River bar is a forecast-driven decision. We link Marine Safety Queensland's bar-crossing bulletin, Noosa Council's ramp map, and the hire operators that operate from the Noosaville and Tewantin precincts. Hire prices are operator-set; check the live page before booking.",
    primarySources: [
      { label: "MSQ bar crossings", href: "https://www.msq.qld.gov.au/Safety/Bar-crossings-and-coastal-conditions" },
      { label: "Noosa Council — Parks and Facilities", href: "https://www.noosa.qld.gov.au/Services-and-Facilities/Parks-and-Facilities" },
    ],
  },
  {
    slug: "travel-and-transport",
    href: "/travel-and-transport",
    navLabel: "Travel & transport",
    icon: "Compass" as const,
    pitch: "Bruce Highway conditions, Sunshine Coast Airport, ferry.",
    longDescription:
      "Driving to Noosa means the Bruce Highway (M1) and the Eumundi–Noosa road network. Live road closures come from qldtraffic.qld.gov.au; Sunshine Coast Airport arrivals are pulled from the airport's official feed. The Noosa Ferry connects Noosa Heads to Noosaville along the river.",
    primarySources: [
      { label: "QLD Traffic", href: "https://qldtraffic.qld.gov.au/" },
      { label: "Sunshine Coast Airport", href: "https://www.sunshinecoastairport.com.au/" },
      { label: "Noosa Ferry", href: "https://www.noosaferry.com/" },
    ],
  },
  {
    slug: "webcams",
    href: "/webcams",
    navLabel: "Webcams",
    icon: "Camera" as const,
    pitch: "Council + SLSQ cams. We don't scrape; we link.",
    longDescription:
      "The Sunshine Coast Council maintains a small set of public coastal webcams; Surf Life Saving Queensland publishes patrol flags and webcam stills. Where a feed is embeddable with attribution, we embed. Where the operator requires a link-out, we link.",
    primarySources: [
      { label: "Surf Life Saving QLD webcams", href: "https://www.lifesaving.com.au/" },
      { label: "Beachsafe.org.au", href: "https://beachsafe.org.au/" },
    ],
  },
] as const;

/**
 * Footer disclosure — five columns per Albert's design brief. Every
 * monetised link carries an ACCC pill per Competition and Consumer Act
 * 2010 Schedule 2. Every legal link carries the relevant statute pill.
 *
 * Per Tim's directive (2026-08-27) there is no newsletter field anywhere
 * on the site.
 */
export const FOOTER_DISCLOSURE = {
  columns: [
    {
      heading: "Sitemap",
      links: [
        { label: "Where to stay", href: "/accommodation" },
        { label: "Things to do", href: "/things-to-do" },
        { label: "National Park", href: "/noosa-national-park" },
        { label: "Surf & weather", href: "/surf-and-weather" },
      ],
    },
    {
      heading: "Editorial",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Photo credits", href: "/photo-credits" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "/privacy", disclosure: "Privacy Act 1988 (Cth)" },
        { label: "Affiliate disclosure", href: "/disclosure", disclosure: "ACCC Sch 2" },
        { label: "Spam Act statement", href: "/privacy#spam-act-2003", disclosure: "Spam Act 2003" },
      ],
    },
  ],
  /**
   * MSN-2973 — restrained one-sentence compliance note.
   *
   * Per Tim's directive, the footer must NOT carry methodology,
   * source lists, or long disclaimers. The full 97-word statement
   * lived here in MSN-2959 (replacing the deleted /how-we-make-money
   * route). For MSN-2973 the band is reduced to a single
   * clear sentence that satisfies ACCC Schedule 2 ("clear and
   * prominent" disclosure of affiliate relationships) without
   * crowding the footer.
   *
   * Carries the in-page anchor id="affiliate-disclosure" so the
   * Footer's "Affiliate disclosure" link scrolls here. The full
   * statement remains available at /terms and in the Legal
   * column above (Privacy Act 1988, ACCC Sch 2, Spam Act 2003).
   */
  complianceBand:
    "Some links earn us a small commission.",
  region: "AU · en-AU · Queensland, Australia",
  copyrightYear: 2026,
} as const;

/**
 * Affiliate programme disclosure — the canonical disclosure pill text
 * shown on any monetised link per ACCC Schedule 2 (Australian Consumer
 * Law). See the footer for the full statement.
 *
 * MSN-2959 / TSK-2959-FIX-3: pill text renamed from "Sponsored · ACCC
 * Sch 2" to "Affiliate" per Albert's spec §4.5. The noun "Affiliate"
 * is the more accurate legal term (paid sponsorship ≠ affiliate
 * commission). The programme name and the statute are surfaced via
 * the link element's `title` attribute on the AffiliateBadge.
 */
export const ACCC_DISCLOSURE = {
  pill: "Affiliate",
  body:
    "Some links on this page are affiliate links. If you book or purchase through them, MyNoosaHeads may earn a small commission at no extra cost to you. Affiliate relationships do not influence the editorial content. See the footer for the full statement, per the Competition and Consumer Act 2010 (Cth) Schedule 2.",
} as const;

/**
 * MSN-2964 (rework, directive B) — empty until affiliate programme
 * participation is verified. The `<AffiliateBadge>` component and any
 * UI claiming a specific monetised relationship should gate rendering
 * on this list. Per ACCC Schedule 2 (Australian Consumer Law) and the
 * mission spec: "Do not claim participation in an affiliate programme
 * unless participation is verified."
 *
 * MSN-3057 (Workstream 1): this constant is the consumer-facing gate
 * read by AffiliateBadge. The canonical source-of-truth list of enabled
 * + verified programmes lives in src/lib/affiliates.ts
 * (`VERIFIED_PROGRAMME_IDS`). Both must agree — when onboarding a new
 * programme, flip both flags in lockstep.
 */
export const VERIFIED_AFFILIATES: string[] = [];

/**
 * MSN-3044 — Item 4 fix. The header / mobile-menu Search buttons
 * now wire to <SearchDialog /> which filters across this list. Every
 * entry is a real, public route. Adding a new page = adding an entry
 * here. The dialog auto-closes on selection so the visitor lands on
 * the page they chose.
 *
 * Order is the order rendered in the search dialog default state
 * (no query yet). Keep the most-visited pages near the top.
 */
export const SEARCHABLE_PAGES = [
  { label: "Surf & weather", href: "/surf-and-weather", category: "Live", pitch: "BOM + Open-Meteo tiles, refreshed every 30 minutes." },
  { label: "Noosa National Park", href: "/noosa-national-park", category: "Walk", pitch: "Coastal walk, Tanglewood track, QPWS alerts." },
  { label: "Things to do", href: "/things-to-do", category: "Do", pitch: "Ten ways to spend your day in Noosa." },
  { label: "Where to stay", href: "/accommodation", category: "Stay", pitch: "Three properties across four areas." },
  { label: "Eat & drink", href: "/eat-and-drink", category: "Eat", pitch: "Three venues across four precincts." },
  { label: "Boats & watercraft", href: "/boats-and-watercraft", category: "Do", pitch: "MSQ bar crossings + Noosa Council ramps." },
  { label: "Fishing reports", href: "/fishing-reports", category: "Do", pitch: "QLD recreational fishing rules + BOM tide." },
  { label: "Travel & transport", href: "/travel-and-transport", category: "Plan", pitch: "Drive, fly, ferry, bus to Noosa." },
  { label: "Webcams", href: "/webcams", category: "Live", pitch: "Beach + headland + river cameras." },
  { label: "First-day itinerary", href: "/things-to-do/first-day-itinerary", category: "Plan", pitch: "Sunrise headland, midday Main Beach, sunset river." },
  { label: "Fairy Pools", href: "/things-to-do/fairy-pools", category: "Walk", pitch: "Coastal rock pools on the Noosa shoreline." },
  { label: "Noosa with children", href: "/things-to-do/noosa-with-children", category: "Do", pitch: "Patrolled swimming, ferry rides, slow river days." },
  { label: "Shopping", href: "/shopping", category: "Plan", pitch: "Markets, makers, boutiques." },
  { label: "About", href: "/about", category: "Editorial", pitch: "Brand statement, editorial scope, contact." },
  { label: "Contact", href: "/contact", category: "Editorial", pitch: "Get in touch with the editorial team." },
  { label: "Privacy", href: "/privacy", category: "Legal", pitch: "Privacy policy." },
  { label: "Terms", href: "/terms", category: "Legal", pitch: "Terms of use + affiliate disclosure." },
  { label: "Disclosure", href: "/disclosure", category: "Legal", pitch: "Affiliate disclosure + ACCC Schedule 2 statement." },
  { label: "Photo credits", href: "/photo-credits", category: "Editorial", pitch: "Attribution for every image on the site." },
] as const;
