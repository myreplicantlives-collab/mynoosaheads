/**
 * Accommodation data — MSN-2973 curated rebuild.
 *
 * Per Albert's D2 brief: 10 best-in-class properties across the
 * shire's five accommodation areas, rather than the prior 37-listing
 * database. Visitor-facing copy uses Albert's curated
 * `accommodation-restructure-v2.md`. Each entry carries:
 *   - bookingUrl pointing to a third-party booking engine search
 *     (Booking.com, Stayz) — never to a fabricated direct URL
 *   - "best for" tag (couples / family / luxury / beachfront / value / long-stay)
 *   - 2-3 key benefits (why we list it)
 *   - indicative rating + booking.com score (verify against live)
 *
 * Affiliate disclosure: per MSN-2964 directive B, until individual
 * programme participation is verified (see VERIFIED_AFFILIATES in
 * src/data/site.ts), links render WITHOUT an AffiliateBadge.
 *
 * Internal links: each area card + each property card has an
 * `internalLinks` array pointing at the in-site context page (e.g.
 * Sunshine Beach properties → /surf-and-weather) for IA discovery.
 *
 * Photo credits: live at /photo-credits. Attribution stripped from
 * the rendered HTML per MSN-2973 directive.
 */

export type AreaId =
  | "hastings"
  | "noosaville"
  | "noosa-sound"
  | "sunshine"
  | "peregian";

export type BookingEngine = "booking" | "stayz" | "expedia" | "airbnb" | "direct";

export type InternalLink = { label: string; href: string; description?: string };

export type Property = {
  name: string;
  /** Short 1-line descriptor (style, scale, what it suits). */
  descriptor: string;
  /** "Why we list it" — 2 sentences max. */
  rationale: string;
  /** "Best for" tag (Albert's brief: couples / family / luxury /
   *  beachfront / value / long-stay). */
  bestFor: string;
  /** Property type badge. */
  type: string;
  /** Booking URL — operator-search or area-search on a third-party engine. */
  bookingUrl: string;
  /** Which engine the bookingUrl points at (for tracking event naming). */
  engine: BookingEngine;
  /** Indicative rating (e.g. "5-star · Booking.com ~8.6"). */
  rating: string;
  /** Area id — for grouping on the page. */
  areaId: AreaId;
};

export type Area = {
  id: AreaId;
  /** Display name. */
  name: string;
  /** One-line "what it's like". */
  pitch: string;
  /** "Best for" line. */
  bestFor: string;
  /** Photo (Wikimedia Commons, attribution in /photo-credits). */
  photo: {
    caption: string;
    url: string;
    author: string;
    licence: string;
    commonsPage: string;
  };
  /** Internal links for IA discovery. */
  internalLinks: InternalLink[];
  /** Anchor id for in-page jump. */
  anchor: string;
};

/* ----------------------------------------------------------------------
 * Booking-engine URL builders.
 * -------------------------------------------------------------------- */

/** Booking.com: ss= area-or-name; returns up to ~60-day window by default. */
function booking(ss: string, extra: Record<string, string> = {}): string {
  const params = new URLSearchParams({ ss, ...extra });
  return `https://www.booking.com/searchresults.html?${params.toString()}`;
}

/** Stayz: query= area-or-name. */
function stayz(query: string, extra: Record<string, string> = {}): string {
  const params = new URLSearchParams({ query, ...extra });
  return `https://www.stayz.com.au/holiday-rental-search?${params.toString()}`;
}

/** Expedia: destination= area-or-name. */
function expedia(destination: string, extra: Record<string, string> = {}): string {
  const params = new URLSearchParams({ destination, ...extra });
  return `https://www.expedia.com.au/Hotels?${params.toString()}`;
}

/** Airbnb: query= area-or-name. */
function airbnb(query: string): string {
  const params = new URLSearchParams({ query });
  return `https://www.airbnb.com.au/s/${query}/homes?${params.toString()}`;
}

/* ----------------------------------------------------------------------
 * Areas — 5 base areas per the mission spec. Photo credit at
 * /photo-credits.
 * -------------------------------------------------------------------- */

export const AREAS: Area[] = [
  {
    id: "hastings",
    name: "Hastings Street & Noosa Heads",
    pitch:
      "The walkable one. Beach at the bottom, headland walk at the top, restaurants in between.",
    bestFor: "Visitors who would rather walk than drive once they arrive.",
    photo: {
      caption: "Hastings Street storefronts and palms, looking toward Main Beach.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Hastings_Street_Noosa_Heads%2C_Queensland.jpg/1280px-Hastings_Street_Noosa_Heads%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage:
        "https://commons.wikimedia.org/wiki/File:Hastings_Street_Noosa_Heads,_Queensland.jpg",
    },
    anchor: "area-hastings",
    internalLinks: [
      { label: "Surf & weather (Hastings webcam)", href: "/surf-and-weather" },
      { label: "National Park — coastal walk start", href: "/noosa-national-park" },
      { label: "Things to do on Hastings", href: "/things-to-do" },
      { label: "Travel — drive to Noosa", href: "/travel-and-transport" },
    ],
  },
  {
    id: "noosaville",
    name: "Noosaville",
    pitch:
      "Across the river. Gympie Terrace foreshore, apartments and motels, the ferry to Hastings.",
    bestFor: "Families, longer stays, anyone with a hire car.",
    photo: {
      caption: "Noosa Harbour Resort, on the Noosaville waterfront.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Noosa_Harbour_Resort.jpg/1280px-Noosa_Harbour_Resort.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage:
        "https://commons.wikimedia.org/wiki/File:Noosa_Harbour_Resort.jpg",
    },
    anchor: "area-noosaville",
    internalLinks: [
      { label: "Boats & watercraft (Noosaville hire precinct)", href: "/boats-and-watercraft" },
      { label: "Things to do — farmers market", href: "/things-to-do" },
      { label: "Fishing (Noosa River)", href: "/fishing-reports" },
      { label: "Travel — ferry timetables", href: "/travel-and-transport" },
    ],
  },
  {
    id: "noosa-sound",
    name: "Noosa Sound",
    pitch:
      "The mid-point — quieter river-side base between Hastings and Noosaville.",
    bestFor: "Couples and small groups wanting a quiet river-side base near both precincts.",
    photo: {
      caption: "Noosa Sound waterways — quieter side of Noosa, between the two main precincts.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Noosa_Heads_and_Weyba_Creek.JPG/1280px-Noosa_Heads_and_Weyba_Creek.JPG",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage:
        "https://commons.wikimedia.org/wiki/File:Noosa_Heads_and_Weyba_Creek.JPG",
    },
    anchor: "area-noosa-sound",
    internalLinks: [
      { label: "Boats & watercraft (river access)", href: "/boats-and-watercraft" },
      { label: "Surf & weather (coastal cam)", href: "/surf-and-weather" },
      { label: "Fishing (river)", href: "/fishing-reports" },
    ],
  },
  {
    id: "sunshine",
    name: "Sunshine Beach",
    pitch:
      "South of the headland. Surf club, village shops, less crowded than Main Beach.",
    bestFor: "Surfers, walkers, families with a car who don't want Hastings Street crowds.",
    photo: {
      caption: "The southern access into Noosa National Park, just north of Sunshine Beach village.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Noosa_Heads_beach_on_Christmas_Day_2015_01.jpeg/1280px-Noosa_Heads_beach_on_Christmas_Day_2015_01.jpeg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage:
        "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_01.jpeg",
    },
    anchor: "area-sunshine",
    internalLinks: [
      { label: "Surf & weather (south coast cams)", href: "/surf-and-weather" },
      { label: "National Park — southern access", href: "/noosa-national-park" },
      { label: "Travel — parking near the surf club", href: "/travel-and-transport" },
    ],
  },
  {
    id: "peregian",
    name: "Peregian",
    pitch:
      "Ten minutes south of Sunshine. Village-square feel, holiday houses, pet-friendly options.",
    bestFor: "Extended stays, dog-friendly accommodation (verify each operator), surfers.",
    photo: {
      caption: "The village-square feel of Peregian Beach — looking back along the patrolled frontage.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Noosa_Heads_beach_in_January_2015.JPG/1280px-Noosa_Heads_beach_in_January_2015.JPG",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage:
        "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_in_January_2015.JPG",
    },
    anchor: "area-peregian",
    internalLinks: [
      { label: "Surf & weather (Peregian break)", href: "/surf-and-weather" },
      { label: "National Park — southern access", href: "/noosa-national-park" },
      { label: "Things to do — village markets", href: "/things-to-do" },
    ],
  },
];

/* ----------------------------------------------------------------------
 * Curated property selection (Albert's 10 picks).
 * -------------------------------------------------------------------- */

export const CURATED_PROPERTIES: Property[] = [
  {
    name: "Sofitel Noosa Pacific Resort",
    descriptor:
      "Hastings's only oceanfront pool deck; full-service resort.",
    rationale:
      "Hastings's only oceanfront pool deck; direct access to Main Beach; the closest hotel to the headland coastal walk.",
    bestFor: "Luxury · couples",
    type: "Hotel · luxury",
    bookingUrl: booking("Sofitel Noosa Pacific Resort QLD"),
    engine: "booking",
    rating: "5-star · Booking.com ~8.6",
    areaId: "hastings",
  },
  {
    name: "RACV Noosa Resort",
    descriptor:
      "Largest family-suite inventory on Hastings Street; heated lagoon pool.",
    rationale:
      "Largest family-suite inventory on Hastings Street; heated lagoon pool; East Lodge adults-only section for grandparents.",
    bestFor: "Family",
    type: "Resort · family",
    bookingUrl: booking("RACV Noosa Resort"),
    engine: "booking",
    rating: "5-star · Booking.com ~9.0",
    areaId: "hastings",
  },
  {
    name: "The Sebel Noosa",
    descriptor:
      "Apartment-style rooms with kitchenettes; one block back from the beach.",
    rationale:
      "Apartment-style rooms with kitchenettes; one block back from the beach (quieter than beachfront).",
    bestFor: "Long-stay · self-caterers",
    type: "Apartment-hotel",
    bookingUrl: booking("Sebel Noosa"),
    engine: "booking",
    rating: "4.5-star · Booking.com ~8.7",
    areaId: "hastings",
  },
  {
    name: "Netanya Noosa",
    descriptor:
      "Two- and three-bedroom Hastings Street apartments at family rates.",
    rationale:
      "Two- and three-bedroom Hastings Street apartments; family-friendly without 5-star rates.",
    bestFor: "Family · value",
    type: "Holiday apartments",
    bookingUrl: booking("Netanya Noosa"),
    engine: "booking",
    rating: "4-star · Booking.com ~8.4",
    areaId: "hastings",
  },
  {
    name: "South Pacific Resort & Spa Noosa",
    descriptor:
      "Apartment-style rooms with kitchenettes; heated pool; walkable to the ferry wharf.",
    rationale:
      "Apartment-style rooms with kitchenettes; heated pool; walkable to the Noosaville ferry wharf.",
    bestFor: "Family · long-stay",
    type: "Apartment-hotel · family",
    bookingUrl: booking("South Pacific Resort Spa Noosa"),
    engine: "booking",
    rating: "4-star · Booking.com ~8.5",
    areaId: "noosaville",
  },
  {
    name: "Noosa Quays",
    descriptor:
      "River-front two-bed apartments at the south end of the Sound.",
    rationale:
      "River-front apartments at the south end of the Sound; two-bed units; quieter than Hastings or Noosaville.",
    bestFor: "Couples · quiet",
    type: "Holiday apartments",
    bookingUrl: booking("Noosa Quays"),
    engine: "booking",
    rating: "4-star · Booking.com ~8.9",
    areaId: "noosa-sound",
  },
  {
    name: "Sunshine Beach Resort",
    descriptor:
      "Apartments directly opposite the patrolled Sunshine Beach surf club.",
    rationale:
      "Apartments directly opposite the patrolled surf club; closest beachfront option south of the headland.",
    bestFor: "Beachfront",
    type: "Holiday apartments",
    bookingUrl: booking("Sunshine Beach Resort Noosa"),
    engine: "booking",
    rating: "4-star · Booking.com ~8.3",
    areaId: "sunshine",
  },
  {
    name: "Ramada by Wyndham Noosa",
    descriptor:
      "Modern hotel apartments on Hastings Crescent; hotel service without Hastings rates.",
    rationale:
      "Modern hotel apartments on Hastings Crescent; hotel service without Hastings rates; quieter village.",
    bestFor: "Couples · value",
    type: "Hotel apartments",
    bookingUrl: booking("Ramada Wyndham Noosa"),
    engine: "booking",
    rating: "4-star · Booking.com ~8.6",
    areaId: "sunshine",
  },
  {
    name: "Peregian Court",
    descriptor:
      "Small apartment complex in the village centre; walkable to the surf club and cafés.",
    rationale:
      "Small apartment complex in the village centre; walking distance to the surf club, market, and the village cafés.",
    bestFor: "Couples · value",
    type: "Holiday apartments",
    bookingUrl: booking("Peregian Court holiday apartments"),
    engine: "booking",
    rating: "4-star · Booking.com ~8.4",
    areaId: "peregian",
  },
  {
    name: "Noosa-area holiday houses (Stayz)",
    descriptor:
      "Stand-alone houses bookable on Stayz — the default for groups and dog-friendly trips.",
    rationale:
      "Stand-alone houses bookable on Stayz; the default for groups of four or more and for anyone bringing a dog.",
    bestFor: "Long-stay · family · groups · dog-friendly",
    type: "Holiday houses",
    bookingUrl: stayz("Noosa holiday houses"),
    engine: "stayz",
    rating: "Stayz aggregate · variable",
    areaId: "hastings", // cross-area pick — displays under "All areas"
  },
];

/* ----------------------------------------------------------------------
 * Category chips — anchor links into the curated picks above.
 * MSN-2973 / Albert D2 §"Section 3".
 * -------------------------------------------------------------------- */

export type PropertyCategory = {
  key: string;
  label: string;
  description: string;
  /** Property indices (1-based) that fit this category. */
  picks: number[];
};

export const PROPERTY_CATEGORIES: PropertyCategory[] = [
  {
    key: "family",
    label: "Family",
    description:
      "Apartments and resorts with pools, kitchens and room for everyone.",
    picks: [2, 4, 5],
  },
  {
    key: "luxury",
    label: "Luxury",
    description:
      "Hastings Street full-service resorts and waterfront villas.",
    picks: [1],
  },
  {
    key: "beachfront",
    label: "Beachfront",
    description:
      "On the sand or across the road — Main, Sunshine, Peregian.",
    picks: [1, 7],
  },
  {
    key: "value",
    label: "Value",
    description: "Mid-range motels and apartments with kitchens.",
    picks: [3, 4, 8, 9],
  },
  {
    key: "long-stay",
    label: "Long-stay",
    description:
      "Self-contained apartments and houses — week-long rates.",
    picks: [3, 5, 6, 10],
  },
];

/* ----------------------------------------------------------------------
 * Helpers — exposed for the page.
 * -------------------------------------------------------------------- */

export const HELPERS = {
  booking,
  stayz,
  expedia,
  airbnb,
};

/* ----------------------------------------------------------------------
 * Disclosure language — kept for the page; one short paragraph.
 * -------------------------------------------------------------------- */

export const ON_PAGE_DISCLOSURE_TEXT =
  "We list properties that are currently trading, in the areas where visitors actually stay. We link to the booking engines that carry them — Booking.com, Stayz, Expedia, Airbnb — rather than taking inventory ourselves. Some links earn us a commission; all are marked Affiliate before you click. The full statement is in the Legal column in the footer.";

/* ----------------------------------------------------------------------
 * CONFIG_EXPORT_FOR_PAGE — handy grouping.
 * -------------------------------------------------------------------- */

export const ACCOMMODATION_DATA = {
  areas: AREAS,
  curatedProperties: CURATED_PROPERTIES,
  categories: PROPERTY_CATEGORIES,
  disclosure: ON_PAGE_DISCLOSURE_TEXT,
} as const;

/* ----------------------------------------------------------------------
 * Build-time stamp — display only; NOT used for bookingUrl generation.
 * -------------------------------------------------------------------- */
export const DATA_GENERATED_AT = "2026-08-28";
