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
  tagline: "By the headland, by the bar.",
  domain: "mynoosaheads.com",
  productionUrl: "https://noosa-site-v2.vercel.app",
  stagingUrl: "https://noosa-site-v2.vercel.app",
  email: "hello@mynoosaheads.com",
  locale: "en-AU",
  region: "Queensland, Australia",
  established: 2026,
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
 * Primary navigation — order is editorial. Surf & weather first (the
 * highest-frequency page a local opens each morning), then National Park
 * (alerts + tracks), then the consumer categories. No newsletter link,
 * no login, no social. Per chairman directive 2026-08-27.
 */
export const NAV = [
  { label: "Surf & weather", href: "/surf-and-weather", description: "Live BOM + Open-Meteo tiles, tide, UV." },
  { label: "National Park", href: "/noosa-national-park", description: "Tracks, wildlife, QPWS alerts." },
  { label: "Accommodation", href: "/accommodation", description: "Booking, Stayz, Airbnb, Expedia." },
  { label: "Things to do", href: "/things-to-do", description: "Day-by-day ideas across the shire." },
  { label: "Fishing", href: "/fishing-reports", description: "Weekly report, tides, solunar." },
  { label: "Boats", href: "/boats-and-watercraft", description: "Hire, ramps, river bar crossings." },
  { label: "Travel", href: "/travel-and-transport", description: "Bruce Highway, airport, ferry." },
  { label: "Webcams", href: "/webcams", description: "Council cams + SLSQ flags." },
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
    pitch: "Today's swell, wind, tide, and UV — from BOM Capricornia–Hervey Bay and Open-Meteo Marine.",
    longDescription:
      "The Noosa bar opens on an outgoing tide with a south-east wind under 15 km/h. We pull the marine forecast from the Bureau of Meteorology's Capricornia–Hervey Bay district and Open-Meteo's free marine API, so the tiles on this page update themselves every 30 minutes without a human pushing them.",
    primarySources: [
      { label: "BOM Capricornia–Hervey Bay", href: "https://www.bom.gov.au/qld/forecasts/coastal.shtml" },
      { label: "Open-Meteo Marine API", href: "https://open-meteo.com/en/docs/marine-api" },
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
      "Noosa National Park covers about 4,000 hectares between Noosa Heads and Peregian Beach. The park is managed by the Queensland Parks and Wildlife Service. We link directly to QPWS alerts and conditions pages so you can check before you drive.",
    primarySources: [
      { label: "QPWS — Noosa National Park", href: "https://www.qld.gov.au/Recreation/Activities/Nature/NationalParks/NoosaNationalPark" },
      { label: "QPWS park alerts", href: "https://www.qld.gov.au/environment/parks/alerts" },
    ],
  },
  {
    slug: "accommodation",
    href: "/accommodation",
    navLabel: "Accommodation",
    icon: "Compass" as const,
    pitch: "Hotels, apartments, holiday houses. Booking, Stayz, Airbnb, Expedia.",
    longDescription:
      "We don't take inventory. Each booking option links out to Booking.com, Stayz, Expedia, or Airbnb with our affiliate tag. Per ACCC Schedule 2, every monetised link is labelled before you click, and the full disclosure lives at /how-we-make-money.",
    primarySources: [
      { label: "Booking.com affiliate disclosure", href: "https://www.booking.com/affiliate-program/v2/index.html" },
      { label: "Stayz affiliate program", href: "https://www.stayz.com.au/" },
      { label: "Airbnb associates program", href: "https://www.airbnb.com.au/associates" },
      { label: "Expedia Partner Solutions", href: "https://www.expediapartnercentral.com/" },
    ],
  },
  {
    slug: "things-to-do",
    href: "/things-to-do",
    navLabel: "Things to do",
    icon: "Eucalyptus" as const,
    pitch: "Day-by-day ideas across the shire — coast, river, hinterland.",
    longDescription:
      "Categories are organised around the things locals actually do, not what the visitor brochure leads with. Hastings Street, the Noosa River, the hinterland villages (Pomona, Cooran, Kin Kin), and the surf beaches — each with its own weather and tide cues.",
    primarySources: [
      { label: "Tourism Noosa (industry body)", href: "https://www.visitnoosa.com.au/" },
      { label: "Noosa Council — things to do", href: "https://www.noosa.qld.gov.au/Community/Things-to-do" },
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
      { label: "Noosa Council — boat ramps", href: "https://www.noosa.qld.gov.au/Community/Boating/Boat-ramps" },
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
        { label: "Surf & weather", href: "/surf-and-weather" },
        { label: "National Park", href: "/noosa-national-park" },
        { label: "Accommodation", href: "/accommodation" },
        { label: "Things to do", href: "/things-to-do" },
        { label: "Fishing", href: "/fishing-reports" },
        { label: "Boats", href: "/boats-and-watercraft" },
        { label: "Travel", href: "/travel-and-transport" },
        { label: "Webcams", href: "/webcams" },
      ],
    },
    {
      heading: "Live sources",
      links: [
        { label: "BOM Capricornia–Hervey Bay", href: "https://www.bom.gov.au/qld/forecasts/coastal.shtml", external: true },
        { label: "Open-Meteo", href: "https://open-meteo.com/", external: true },
        { label: "QLD Traffic", href: "https://qldtraffic.qld.gov.au/", external: true },
        { label: "Surf Life Saving QLD", href: "https://www.lifesaving.com.au/", external: true },
        { label: "Beachsafe.org.au", href: "https://beachsafe.org.au/", external: true },
      ],
    },
    {
      heading: "Editorial",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "How we make money", href: "/how-we-make-money" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "/privacy", disclosure: "Privacy Act 1988 (Cth)" },
        { label: "Terms", href: "/terms", disclosure: "ACCC" },
        { label: "Affiliate disclosure", href: "/how-we-make-money", disclosure: "ACCC Sch 2" },
        { label: "Spam Act statement", href: "/privacy#spam-act-2003", disclosure: "Spam Act 2003" },
      ],
    },
    {
      heading: "Local partners",
      links: [
        { label: "Noosa Council", href: "https://www.noosa.qld.gov.au/", external: true },
        { label: "Tourism Noosa", href: "https://www.visitnoosa.com.au/", external: true },
        { label: "Sunshine Coast Council", href: "https://www.sunshinecoast.qld.gov.au/", external: true },
        { label: "QPWS", href: "https://www.qld.gov.au/environment/parks", external: true },
      ],
    },
  ],
  /**
   * Compliance disclosure band that sits at the foot of every page.
   * Plain English — no newsletter, no lead-gen, no analytics tracking
   * beyond what the host provides.
   */
  complianceBand:
    "MyNoosaHeads is an independent Australian publication. We do not run a newsletter, collect email addresses, or operate a login. We earn affiliate commission on some accommodation and booking links (see /how-we-make-money). All editorial content is written by humans; all data tiles are sourced from BOM and Open-Meteo.",
  region: "AU · en-AU · Queensland, Australia",
  copyrightYear: 2026,
} as const;

/**
 * Affiliate programme disclosure — the canonical disclosure pill text
 * shown on any monetised link per ACCC Schedule 2 (Australian Consumer
 * Law). See /how-we-make-money for the full statement.
 */
export const ACCC_DISCLOSURE = {
  pill: "Sponsored · ACCC Sch 2",
  body:
    "Some links on this page are affiliate links. If you book or purchase through them, MyNoosaHeads may earn a small commission at no extra cost to you. Affiliate relationships do not influence the editorial content. See the full statement on the /how-we-make-money page, per the Competition and Consumer Act 2010 (Cth) Schedule 2.",
} as const;
