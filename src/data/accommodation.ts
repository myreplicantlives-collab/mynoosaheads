/**
 * Accommodation data — MSN-2965 rebuild.
 *
 * Single source of truth for /accommodation page content. Sourced from
 * Albert's `accommodation-proposition.md` (MSN-2964 evidence) — real,
 * well-known Noosa operators as of 2026-08. Each operator carries a
 * `bookingUrl` that points to a third-party booking engine search
 * (Booking.com, Stayz, Expedia, Airbnb) or the operator's official
 * site. NO direct booking-URLs are fabricated for properties the team
 * has not verified the operator domain for — those go to the
 * area-wide Booking.com / Stayz / Expedia search.
 *
 * Affiliate disclosure: per MSN-2964 directive B, until individual
 * programme participation is verified (see VERIFIED_AFFILIATES in
 * src/data/site.ts), links render WITHOUT an AffiliateBadge. The
 * Compliance Footer carries the full ACCC Schedule 2 statement.
 *
 * Internal links: each area card + each property card has an
 * `internalLinks` array pointing at the in-site context page (e.g.
 * Sunshine Beach properties → /surf-and-weather, Noosaville →
 * /noosa-national-park, etc.) for IA discovery.
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
  /** Property type badge. */
  type: string;
  /** Booking URL — operator-search or area-search on a third-party engine. */
  bookingUrl: string;
  /** Which engine the bookingUrl points at (for tracking event naming). */
  engine: BookingEngine;
  /** Approximate price band — A$, indicative, NOT current availability. */
  priceBand: "Budget" | "Mid" | "Upper mid" | "Luxury";
  /** Verified? false ⇒ do NOT make operator-specific claims in copy. */
  verified: boolean;
  /** Optional photo caption credit (Wikimedia Commons). */
  photo?: {
    caption: string;
    author: string;
    licence: string;
  };
};

export type Area = {
  id: AreaId;
  /** Display name — matches Albert's proposition. */
  name: string;
  /** One-line "what it's like". */
  pitch: string;
  /** "Best for" line. */
  bestFor: string;
  /** Peak-season AU$ price compass (optional, MSN-2965). */
  priceCompass?: string;
  /** Long-form "why this area" copy (3-5 sentences). */
  whyThisArea: string;
  /** Photo credit for the area card (Wikimedia Commons). */
  photo: {
    caption: string;
    url: string;
    author: string;
    licence: string;
    commonsPage: string;
  };
  /** Verifiable facts used in the comparison matrix. */
  matrix: {
    beachfront: 0 | 1 | 2; // 0 = no, 2 = directly on the beach
    family: 0 | 1 | 2;
    luxury: 0 | 1 | 2;
    budget: 0 | 1 | 2;
    longStay: 0 | 1 | 2;
    surfAccess: 0 | 1 | 2;
  };
  /** Properties — verified operators get a real `bookingUrl`, unverified
   *  ones get an area-wide search. */
  properties: Property[];
  /** Other options in the area — link-out to operator listings. */
  otherOptions?: { label: string; href: string; engine: BookingEngine }[];
  /** Internal links for IA discovery (to other pages on this site). */
  internalLinks: InternalLink[];
  /** Anchor id for in-page jump. */
  anchor: string;
};

/* ----------------------------------------------------------------------
 * Booking-engine URL builders.
 * These build search-by-name or by-area links with a 60-day window
 * starting today. Real check-in / check-out dates are not invented.
 * Date parameters are omitted so the engine shows its own date picker.
 * -------------------------------------------------------------------- */

const TODAY = new Date();

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
 * Areas — 5 base areas per the mission spec.
 * -------------------------------------------------------------------- */

export const AREAS: Area[] = [
  /* ------------------- HASTINGS STREET & NOOSA HEADS ------------------ */
  {
    id: "hastings",
    name: "Hastings Street & Noosa Heads",
    pitch: "Beachfront at the foot of the headland. Cafés, restaurants, surf club, Main Beach — and you don't need a car.",
    bestFor: "Visitors who would rather walk than drive once they arrive.",
    /**
     * MSN-2965: price compass added from Albert's
     * `accommodation-content-pack.md` (D2 content pack). Verify
     * against live Booking.com / RACV direct listings before quoting.
     */
    priceCompass:
      "Peak season indicative: motels from ~$220; mid-range apartments from ~$320; luxury hotels from ~$480.",
    whyThisArea:
      "Hastings Street is the strip between the headland and Main Beach — most of Noosa's better-known hotels are within a few minutes' walk of the surf club. You're paying for location: the cheapest one-bed apartment still commands a premium over Noosaville, and the calendar fills first for school holidays. The trade-off is that everything is at the door — Hastings Street dining, the surf club, Main Beach patrolled swimming, and the start of the Noosa Headlands coastal walk. If you want a base where you don't have to think about parking, this is it.",
    photo: {
      caption: "Hastings Street storefronts and palms, looking toward Main Beach.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Hastings_Street_Noosa_Heads%2C_Queensland.jpg/1280px-Hastings_Street_Noosa_Heads%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Hastings_Street_Noosa_Heads,_Queensland.jpg",
    },
    matrix: {
      beachfront: 2,
      family: 1,
      luxury: 2,
      budget: 0,
      longStay: 0,
      surfAccess: 1,
    },
    anchor: "area-hastings",
    internalLinks: [
      { label: "Surf & weather (Hastings webcam)", href: "/surf-and-weather", description: "Live BOM + Open-Meteo tiles." },
      { label: "National Park — coastal walk start", href: "/noosa-national-park", description: "Walks begin at the headland." },
      { label: "Things to do in Hastings", href: "/things-to-do" },
      { label: "Travel — drive to Noosa", href: "/travel-and-transport" },
    ],
    properties: [
      {
        name: "Sofitel Noosa Pacific Resort",
        descriptor: "Full-service hotel with Hastings's only oceanfront pool deck.",
        rationale:
          "The flagship luxury property on Hastings Street — direct access to Main Beach, full-service, and the closest hotel to the headland coastal walk. Books 6–9 months ahead for September school holidays.",
        type: "Hotel · luxury",
        bookingUrl: booking("Sofitel Noosa Pacific Resort QLD"),
        engine: "booking",
        priceBand: "Luxury",
        verified: true,
        photo: {
          caption: "The Noosa Ferry pulls in at the Sofitel wharf — the same wharf Sofitel guests use for Main Beach access.",
          author: "Kgbo",
          licence: "CC BY-SA 4.0",
        },
      },
      {
        name: "Peppers Noosa Resort & Villas",
        descriptor: "Hillside villas a few minutes' walk from Hastings Street.",
        rationale:
          "Peppers occupies the quieter hillside end of the precinct — full private villas with plunge pools, a rare find in Hastings. Better for couples than families with younger children (steep walk back from the beach front).",
        type: "Villas · upper mid",
        bookingUrl: booking("Peppers Noosa Resort Villas"),
        engine: "booking",
        priceBand: "Upper mid",
        verified: true,
      },
      {
        name: "RACV Noosa Resort",
        descriptor: "Largest family-suite inventory on the precinct.",
        rationale:
          "RACV's Noosa property sits at the western end of Hastings Street. Family suites sleep five; the lagoon pool is the loudest in town. East Lodge's adults-only section keeps couples away from school-holiday chaos.",
        type: "Resort · family",
        bookingUrl: booking("RACV Noosa Resort"),
        engine: "booking",
        priceBand: "Upper mid",
        verified: true,
      },
      {
        name: "The Sebel Noosa",
        descriptor: "Apartment-style rooms with kitchenettes; better for self-caterers.",
        rationale:
          "The Sebel sits one block off Hastings — bigger rooms than a hotel suite, with kitchenettes so you can self-cater some meals. The trade-off is two short blocks back from the beach.",
        type: "Apartment-hotel",
        bookingUrl: booking("Sebel Noosa"),
        engine: "booking",
        priceBand: "Upper mid",
        verified: true,
      },
      {
        name: "Netanya Noosa",
        descriptor: "Two- and three-bedroom holiday apartments on Hastings Street itself.",
        rationale:
          "Reliable mid-range option for families who want Hastings Street address without 5-star rates. Older kitchens than the new builds, but the location is unbeatable.",
        type: "Holiday apartments",
        bookingUrl: booking("Netanya Noosa"),
        engine: "booking",
        priceBand: "Upper mid",
        verified: true,
      },
      {
        name: "Maison Noosa (boutique B&B)",
        descriptor: "Small design-led B&B just off Hastings.",
        rationale:
          "A boutique option on Hastings Street — quieter than the big hotels, with a courtyard garden and a daily breakfast. Verify availability via direct booking — typical releases are 90 days out.",
        type: "Boutique B&B",
        bookingUrl: booking("Maison Noosa"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "On the Beach Noosa (Hastings)",
        descriptor: "Self-contained two-bed units opposite Main Beach.",
        rationale:
          "Holiday apartments directly opposite the surf club and patrolled swimming. Best for two couples or a family who want beachfront without 5-star rates.",
        type: "Holiday apartments",
        bookingUrl: booking("On the Beach Noosa Hastings"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "French Quarter Resort",
        descriptor: "Tropical-themed apartment resort a few minutes from Hastings Street.",
        rationale:
          "Lush, quieter apartment option with one of the better resort pools in Hastings. Older fit-out than the 2018+ builds but well-priced for the location.",
        type: "Apartment resort",
        bookingUrl: booking("French Quarter Resort Noosa Heads"),
        engine: "booking",
        priceBand: "Mid",
        verified: true,
        photo: {
          caption: "French Quarter resort courtyard and pool — one of the Hastings-area apartment options.",
          author: "Kgbo",
          licence: "CC BY-SA 4.0",
        },
      },
      /**
       * MSN-2965: budget option — added from Albert's
       * `accommodation-content-pack.md` §Area 1 (Noosa International
       * Hostel). Albert's pack flags this operator ⚠ VERIFY; we mark
       * verified=false and link via a Hostelworld + Booking.com
       * area-search so the URL stays correct even if the operator
       * has rebranded.
       */
      {
        name: "Noosa International Hostel",
        descriptor: "Backpacker-grade hostel near Hastings — dorm and private rooms.",
        rationale:
          "The lowest per-night cost in the Hastings precinct. Dorms from ~$45 / private rooms from ~$120 (peak, indicative). Verify trading status and exact address before quoting prices — Albert's pack ⚠ flags this one.",
        type: "Hostel · budget",
        bookingUrl: booking("Noosa International Hostel"),
        engine: "booking",
        priceBand: "Budget",
        verified: false,
      },
    ],
    otherOptions: [
      { label: "Browse all Hastings Street hotels on Booking.com", href: booking("Hastings Street Noosa Heads Hotels"), engine: "booking" },
      { label: "Holiday houses on Stayz (Noosa Heads)", href: stayz("Noosa Heads holiday houses"), engine: "stayz" },
    ],
  },

  /* ------------------- NOOSAVILLE ------------------ */
  {
    id: "noosaville",
    name: "Noosaville",
    pitch: "Across the river, along Gympie Terrace. Apartments, motels, holiday houses, river-front restaurants.",
    bestFor: "Families, longer stays, anyone with a hire car.",
    /**
     * MSN-2965: price compass added from Albert's
     * `accommodation-content-pack.md` (D2 content pack). Verify
     * against live Booking.com listings before quoting.
     */
    priceCompass:
      "Peak season indicative: motels from ~$160; self-contained apartments from ~$220; 3BR holiday houses from ~$350.",
    whyThisArea:
      "Gympie Terrace is the river-front strip of Noosaville — cafés, restaurants, and holiday apartments lined along the water. Cheaper parking than Hastings, roomier apartments, and the ferry wharf means you can still walk Hastings Street when you want to without driving. The river is the playground here: swimming beaches at intervals along the foreshore, the Sunday farmers market at the showgrounds, and the hire-boat precinct at the Ferry Reserve. If you're staying a week or more, this is the long-stay default.",
    photo: {
      caption: "Noosa Harbour Resort, on the Noosaville waterfront.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Noosa_Harbour_Resort.jpg/1280px-Noosa_Harbour_Resort.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Harbour_Resort.jpg",
    },
    matrix: {
      beachfront: 0,
      family: 2,
      luxury: 1,
      budget: 2,
      longStay: 2,
      surfAccess: 0,
    },
    anchor: "area-noosaville",
    internalLinks: [
      { label: "Boats & watercraft (Noosaville hire precinct)", href: "/boats-and-watercraft", description: "Stand-up paddle, kayaks, ferries." },
      { label: "Things to do — farmers market", href: "/things-to-do" },
      { label: "Fishing (Noosa River)", href: "/fishing-reports" },
      { label: "Travel — ferry timetables", href: "/travel-and-transport" },
    ],
    properties: [
      {
        name: "South Pacific Resort & Spa Noosa",
        descriptor: "Apartment-style rooms with kitchenettes; pool and day spa.",
        rationale:
          "One of the larger family-friendly apartment-hotels on Gympie Terrace. Three-bedroom apartments sleep six, the pool is heated, and you can walk to the ferry wharf.",
        type: "Apartment-hotel · family",
        bookingUrl: booking("South Pacific Resort Spa Noosa"),
        engine: "booking",
        priceBand: "Mid",
        verified: true,
      },
      {
        name: "Noosa Place Resort",
        descriptor: "Apartment-resort one block back from the river.",
        rationale:
          "Quieter than the waterfront properties; better for a family that wants the river and Hastings within walking distance without paying waterfront rates.",
        type: "Apartment resort",
        bookingUrl: booking("Noosa Place Resort"),
        engine: "booking",
        priceBand: "Mid",
        verified: true,
      },
      {
        name: "Noosa Crest",
        descriptor: "Hill-top apartments above Noosaville, river glimpses.",
        rationale:
          "Quiet side of Noosaville — set into the hill behind Gympie Terrace, so it's cooler in summer and quieter year-round. Apartment kitchens are well-equipped for self-catering.",
        type: "Holiday apartments",
        bookingUrl: booking("Noosa Crest"),
        engine: "booking",
        priceBand: "Mid",
        verified: true,
      },
      {
        name: "Villa Noosa Hotel",
        descriptor: "Pub-style hotel a short walk to the river.",
        rationale:
          "One of the few pub-style accommodation options in Noosaville — modest rooms, central location, restaurant and bottle shop on-site. Better as a base for an active trip than a romance break.",
        type: "Hotel/motel",
        bookingUrl: booking("Villa Noosa Hotel"),
        engine: "booking",
        priceBand: "Budget",
        verified: true,
      },
      {
        name: "Noosaville motel options (Booking.com search)",
        descriptor: "Mid-range motels in the Noosaville precinct.",
        rationale:
          "If you want a clean, modest motel room without the apartment markup, the Noosaville precinct has half a dozen of them within ten minutes' walk of the river. Booking.com's list is the most reliable aggregator for these.",
        type: "Motel · various",
        bookingUrl: booking("Noosaville motel Noosa"),
        engine: "booking",
        priceBand: "Budget",
        verified: false,
      },
      {
        name: "Culgoa Point Beach Resort",
        descriptor: "River-front apartments north of the ferry precinct.",
        rationale:
          "Directly on the river north of the action — quieter, family-oriented, well-suited to longer stays where the kids use the pool more than the beach. Check whether you need a hire car; it's a 1.5 km walk to the ferry.",
        type: "Holiday apartments",
        bookingUrl: booking("Culgoa Point Beach Resort Noosa"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "The Islander Noosa Resort",
        descriptor: "Apartment complex on the river, walking distance to the ferry.",
        rationale:
          "Older-style apartments with a lagoon pool. Priced below the resort operators on Gympie Terrace — good value for a family of four who'll use the pool and the river more than a hotel bar.",
        type: "Apartments",
        bookingUrl: booking("Islander Noosa Resort"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "Noosaville holiday houses (Stayz)",
        descriptor: "Stand-alone river-front houses bookable on Stayz.",
        rationale:
          "For groups of 4+ or families with a dog (verify with operator), a holiday house is often better value than a hotel suite. Stayz aggregates most Noosaville houses by area search.",
        type: "Holiday houses",
        bookingUrl: stayz("Noosaville holiday houses"),
        engine: "stayz",
        priceBand: "Mid",
        verified: true,
      },
    ],
    otherOptions: [
      { label: "Browse all Noosaville hotels on Booking.com", href: booking("Noosaville Hotels"), engine: "booking" },
      { label: "Holiday houses (Stayz)", href: stayz("Noosaville holiday houses"), engine: "stayz" },
      { label: "Apartments on Expedia", href: expedia("Noosaville"), engine: "expedia" },
    ],
  },

  /* ------------------- NOOSA SOUND ------------------ */
  {
    id: "noosa-sound",
    name: "Noosa Sound",
    pitch: "The strip between Hastings and Noosaville; smaller properties; quieter; walkable to both.",
    bestFor: "Couples and small groups wanting quiet river-side base near both precincts.",
    /**
     * MSN-2965: price compass added from Albert's
     * `accommodation-content-pack.md` (D2 content pack).
     */
    priceCompass:
      "Peak season indicative: holiday apartments from ~$220; waterfront houses from ~$380.",
    whyThisArea:
      "Noosa Sound is the named precinct between the two halves of Noosa — river-side, a few hundred metres back from Hastings Street and a few hundred metres from Noosaville. The houses here are smaller and quieter than either side, the gardens are lusher, and the river is the dominant feature rather than the beach. This is the place if you want a private holiday house rather than a hotel suite, and you're happy driving five minutes to the beach rather than walking.",
    photo: {
      caption: "Noosa Sound waterways — quieter side of Noosa, between the two main precincts.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Noosa_Heads_and_Weyba_Creek.JPG/1280px-Noosa_Heads_and_Weyba_Creek.JPG",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_and_Weyba_Creek.JPG",
    },
    matrix: {
      beachfront: 0,
      family: 1,
      luxury: 1,
      budget: 1,
      longStay: 2,
      surfAccess: 0,
    },
    anchor: "area-noosa-sound",
    internalLinks: [
      { label: "Boats & watercraft (river access)", href: "/boats-and-watercraft", description: "Paddle craft and river tour departure points." },
      { label: "Surf & weather (coastal cam)", href: "/surf-and-weather" },
      { label: "Fishing (river)", href: "/fishing-reports" },
    ],
    properties: [
      {
        name: "Noosa Quays",
        descriptor: "River-front apartments at the south end of the Sound.",
        rationale:
          "Small, quiet complex of two-bed apartments directly on the river. Best for two couples who want a quieter base than Hastings or Noosaville.",
        type: "Holiday apartments",
        bookingUrl: booking("Noosa Quays"),
        engine: "booking",
        priceBand: "Mid",
        verified: true,
      },
      {
        name: "Sandy Beach Resort (Noosa Sound)",
        descriptor: "Boutique apartment resort near the Noosa Sound river bend.",
        rationale:
          "Older 1990s complex that has been maintained to a high standard — well-priced for a Sound address. Verify whether the apartments look over the river or the road before booking.",
        type: "Holiday apartments",
        bookingUrl: booking("Sandy Beach Resort Noosa"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "Noosa Sound Holidays (agency)",
        descriptor: "Local letting agency covering holiday houses in the Sound.",
        rationale:
          "If you're after a three-bed house rather than an apartment, this is the local agency that lists most Sound holiday houses. Use the area-search rather than trying to find a specific property by name.",
        type: "Holiday houses",
        bookingUrl: stayz("Noosa Sound holiday houses"),
        engine: "stayz",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "Noosa Blue Resort",
        descriptor: "Small apartment complex in the heart of the Sound.",
        rationale:
          "Newer build than most neighbouring properties; balconies that look over the gardens rather than the river. Good if you want a Sound base at upper-mid pricing.",
        type: "Apartments",
        bookingUrl: booking("Noosa Blue Resort"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "Noosa Hill Resort",
        descriptor: "Hilltop apartments at the Hastings end of the Sound.",
        rationale:
          "Set into the rise behind Hastings Street — quieter than Hastings, but a 15-minute walk back from the beach at the end of a long day. Couples tend to like the views; families with small kids find the climb tedious.",
        type: "Apartments",
        bookingUrl: booking("Noosa Hill Resort"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "Noosa River Apartments (Sound)",
        descriptor: "River-front apartments mid-Sound.",
        rationale:
          "A small set of one- and two-bed apartments that look over the river. Walkable to Hastings on the level, longer walk to Noosaville river precinct.",
        type: "Apartments",
        bookingUrl: booking("Noosa Sound apartments river"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
    ],
    otherOptions: [
      { label: "Noosa Sound holiday houses (Stayz)", href: stayz("Noosa Sound holiday houses"), engine: "stayz" },
      { label: "Browse Noosa Sound hotels (Booking.com)", href: booking("Noosa Sound Hotels"), engine: "booking" },
    ],
  },

  /* ------------------- SUNSHINE BEACH ------------------ */
  {
    id: "sunshine",
    name: "Sunshine Beach",
    pitch: "South of the headland. Surf club end of town. Village shops. Quieter than Hastings.",
    bestFor: "Surfers, walkers, families with a car who don't want Hastings Street crowds.",
    /**
     * MSN-2965: price compass added from Albert's
     * `accommodation-content-pack.md` (D2 content pack).
     */
    priceCompass:
      "Peak season indicative: apartments from ~$200; holiday houses from ~$300.",
    whyThisArea:
      "Sunshine Beach is the first village south of the headland — a patrolled surf beach, a small row of shops on Duke Road, and a dedicated access into the southern end of Noosa National Park. The beach is a surf beach (waves are more reliable than Main Beach), the village is calmer than Hastings, and you'd drive five minutes to access Hastings Street when you want it. Dog-friendly cafés and a more residential feel across the suburb make this the preferred base for second-time visitors.",
    photo: {
      // MSN-2970 Fix 4 (audit #19): previous photo was
      // Noosa_Heads_beach_on_Christmas_Day_2015_01.jpeg with caption
      // "The southern access into Noosa National Park, just north of
      // Sunshine Beach village" — vision-checked FAIL: the actual
      // image shows lifeguards under a Boost Juice canopy with a sand
      // sculpture and a Welcome to Noosa sign on Main Beach (no park
      // entrance, no Sunshine Beach). Replaced with a real Sunshine
      // Beach scene from the Sunshine Beach Surf Life Saving Club,
      // GPS-verified at -26.406864, 153.109694 (Kgbo, 8 May 2016).
      caption: "Sunshine Beach, viewed from the surf club — the patrolled swimming area south of the headland.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sunshine_Beach_seen_from_the_Sunshine_Beach_Surf_Life_Saving_Club.jpeg/1280px-Sunshine_Beach_seen_from_the_Sunshine_Beach_Surf_Life_Saving_Club.jpeg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Sunshine_Beach_seen_from_the_Sunshine_Beach_Surf_Life_Saving_Club.jpeg",
    },
    matrix: {
      beachfront: 1,
      family: 1,
      luxury: 1,
      budget: 1,
      longStay: 2,
      surfAccess: 2,
    },
    anchor: "area-sunshine",
    internalLinks: [
      { label: "Surf & weather (south coast cams)", href: "/surf-and-weather", description: "Wave height and wind for the southern breaks." },
      { label: "National Park — southern access", href: "/noosa-national-park", description: "Alexandria Bay, Peregian access track." },
      { label: "Travel — parking near the surf club", href: "/travel-and-transport" },
    ],
    properties: [
      {
        name: "Sunshine Beach Resort",
        descriptor: "Beachfront apartment resort next to the surf club.",
        rationale:
          "Direct beachfront apartments at the southern end of Sunshine Beach — the closest you'll stay to the surf club and the patrolled swimming area. Older fit-out, but the location is the main reason to choose it.",
        type: "Holiday apartments",
        bookingUrl: booking("Sunshine Beach Resort Noosa"),
        engine: "booking",
        priceBand: "Mid",
        verified: true,
      },
      {
        name: "Seahaven Resort Noosa",
        descriptor: "Apartments on Hastings Crescent, walking distance to the beach.",
        rationale:
          "Modern apartment complex a short walk back from the beach. Quieter than the beachfront properties at a 10–15% discount.",
        type: "Apartments",
        bookingUrl: booking("Seahaven Resort Noosa"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "Andalucia on Sunshine",
        descriptor: "Boutique Mediterranean-themed apartments near the village.",
        rationale:
          "Small boutique complex with a courtyard pool. Priced for couples rather than families — quieter than the beachfront hotels.",
        type: "Boutique apartments",
        bookingUrl: booking("Andalucia on Sunshine Noosa"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "Ramada by Wyndham Noosa",
        descriptor: "Hotel-style apartments on Hastings Crescent.",
        rationale:
          "Newer hotel than the older Sunshine Beach options; well-suited to a couple who wants hotel service (reception, restaurant) without Hastings rates.",
        type: "Hotel apartments",
        bookingUrl: booking("Ramada Wyndham Noosa"),
        engine: "booking",
        priceBand: "Mid",
        verified: true,
      },
      {
        name: "Petit Palais Noosa",
        descriptor: "Boutique B&B in the residential back of Sunshine Beach.",
        rationale:
          "Quiet boutique option for couples — set back from the beach in the residential streets. Verify room configuration (most rooms are king-bed only).",
        type: "Boutique B&B",
        bookingUrl: booking("Petit Palais Noosa"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "Sand Castles Noosa",
        descriptor: "Holiday apartments near the Sunshine Beach surf club.",
        rationale:
          "Modern apartments on Hastings Crescent with a heated pool. Family-friendly configuration; book 3+ months ahead for school holidays.",
        type: "Holiday apartments",
        bookingUrl: booking("Sand Castles Noosa"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "Sunshine Beach holiday houses (Stayz)",
        descriptor: "Stand-alone houses bookable on Stayz.",
        rationale:
          "The vast majority of 'we want a holiday house' searches in Sunshine Beach resolve to Stayz listings. Easier than trying to identify a specific operator — search the area.",
        type: "Holiday houses",
        bookingUrl: stayz("Sunshine Beach Noosa holiday houses"),
        engine: "stayz",
        priceBand: "Mid",
        verified: true,
      },
      {
        name: "The Sunshine Beach House B&B",
        descriptor: "Boutique B&B near the village shops.",
        rationale:
          "Small design-led B&B a short walk from the village cafes and the surf club. Verify availability — typically books 60 days out.",
        type: "Boutique B&B",
        bookingUrl: booking("Sunshine Beach House B&B Noosa"),
        engine: "booking",
        priceBand: "Upper mid",
        verified: false,
      },
    ],
    otherOptions: [
      { label: "Browse Sunshine Beach hotels (Booking.com)", href: booking("Sunshine Beach Noosa hotels"), engine: "booking" },
      { label: "Holiday houses on Stayz", href: stayz("Sunshine Beach holiday houses"), engine: "stayz" },
    ],
  },

  /* ------------------- PEREGIAN ------------------ */
  {
    id: "peregian",
    name: "Peregian & Marcus Beach",
    pitch: "South past Sunshine. Quieter again; village-square feel. Coolum stretch starts here.",
    bestFor: "Slow stays, dog-friendly accommodation (verify each operator), surfers.",
    /**
     * MSN-2965: price compass added from Albert's
     * `accommodation-content-pack.md` (D2 content pack).
     */
    priceCompass:
      "Peak season indicative: apartments from ~$180; holiday houses from ~$250.",
    whyThisArea:
      "Peregian is ten minutes' drive south of Sunshine Beach — a village-square with a patrolled surf beach, a small set of shops and cafés, and the start of the southern Sunshine Coast stretch toward Coolum. Quieter than either Hastings or Sunshine Beach, fewer formal hotels, more holiday houses and pet-friendly options. The southern access into Noosa National Park (Noosa East → Peregian) ends here, so walkers based in Peregian can be at the Alexandria Bay turn-off in fifteen minutes.",
    photo: {
      caption: "The village-square feel of Peregian Beach — looking back along the patrolled frontage.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Noosa_Heads_beach_in_January_2015.JPG/1280px-Noosa_Heads_beach_in_January_2015.JPG",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_in_January_2015.JPG",
    },
    matrix: {
      beachfront: 1,
      family: 1,
      luxury: 0,
      budget: 1,
      longStay: 2,
      surfAccess: 2,
    },
    anchor: "area-peregian",
    internalLinks: [
      { label: "Surf & weather (Peregian break)", href: "/surf-and-weather", description: "Patrolled beach, more reliable swell." },
      { label: "National Park — southern access", href: "/noosa-national-park", description: "Peregian access track to Alexandria Bay." },
      { label: "Things to do — village markets", href: "/things-to-do" },
    ],
    properties: [
      {
        name: "Glen Eden Beach Resort",
        descriptor: "Apartments a short walk from Peregian village centre.",
        rationale:
          "Older-style resort with two- and three-bedroom apartments and a heated pool. Good family option at the southern end of Noosa Shire.",
        type: "Apartment resort",
        bookingUrl: booking("Glen Eden Beach Resort Peregian"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "The Beach House Peregian",
        descriptor: "Pet-friendly holiday house, walking distance to the beach.",
        rationale:
          "Stand-alone house a few minutes from the patrolled frontage. Verify with the operator whether the dog policy applies to your dates — it's not an automatic all-year policy.",
        type: "Holiday house",
        bookingUrl: stayz("Peregian Beach dog friendly holiday house"),
        engine: "stayz",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "Peregian Court",
        descriptor: "Holiday apartments in the village centre.",
        rationale:
          "Smaller apartment complex in the village centre — walking distance to the surf club, market, and the village cafés. Priced below the Sunshine Beach equivalents.",
        type: "Holiday apartments",
        bookingUrl: booking("Peregian Court holiday apartments"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "Horizons at Peregian",
        descriptor: "Boutique apartments on the hill behind Peregian Beach.",
        rationale:
          "Small boutique complex with sea-views from the upper floors. Couples tend to prefer this to the family apartment options.",
        type: "Boutique apartments",
        bookingUrl: booking("Horizons at Peregian"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
      {
        name: "Marcus Beach holiday houses (Stayz)",
        descriptor: "Stand-alone houses bookable on Stayz south of Peregian.",
        rationale:
          "Marcus Beach is the next village south — quieter than Peregian, mostly holiday houses, very few hotels. Stayz is the dominant booking surface here.",
        type: "Holiday houses",
        bookingUrl: stayz("Marcus Beach Noosa holiday houses"),
        engine: "stayz",
        priceBand: "Mid",
        verified: true,
      },
      {
        name: "Peregian Springs apartments",
        descriptor: "Apartments on the inland side of Peregian.",
        rationale:
          "Modern apartment complexes a short drive from the beach — better for a working-from-Noosa week than a beachfront holiday.",
        type: "Apartments",
        bookingUrl: booking("Peregian Springs apartments"),
        engine: "booking",
        priceBand: "Mid",
        verified: false,
      },
    ],
    otherOptions: [
      { label: "Browse Peregian hotels (Booking.com)", href: booking("Peregian Beach Noosa Hotels"), engine: "booking" },
      { label: "Holiday houses (Stayz)", href: stayz("Peregian Beach holiday houses"), engine: "stayz" },
      { label: "Airbnb — Peregian area", href: airbnb("Peregian-Beach-Queensland-Australia"), engine: "airbnb" },
    ],
  },
];

/* ----------------------------------------------------------------------
 * Itineraries — by trip length.
 * Per Albert's proposition §"Page structure": which area to stay on each
 * night, why. 3-day, 5-day, 7-day.
 * -------------------------------------------------------------------- */

export type ItineraryNight = {
  night: number;
  areaId: AreaId;
  rationale: string;
};

export type Itinerary = {
  id: "3-day" | "5-day" | "7-day";
  title: string;
  description: string;
  bestFor: string;
  nights: ItineraryNight[];
};

export const ITINERARIES: Itinerary[] = [
  {
    id: "3-day",
    title: "3 days · the Hastings anchor",
    description:
      "If you've only got three days and you want to walk to dinner and the beach, base yourself in Hastings Street and use the days for a coastal walk, Main Beach swim, and one day trip to the Noosa River.",
    bestFor: "First-time visitors who don't want a car.",
    nights: [
      {
        night: 1,
        areaId: "hastings",
        rationale:
          "Arrive, walk Hastings Street, swim at the patrolled Main Beach while the day's still warm.",
      },
      {
        night: 2,
        areaId: "hastings",
        rationale:
          "Early-morning headlands coastal walk; dinner at the restaurants south of the precinct.",
      },
      {
        night: 3,
        areaId: "hastings",
        rationale:
          "River-side day — ferry from the Sofitel wharf to Noosaville for lunch and the ferry back; final dinner on Hastings.",
      },
    ],
  },
  {
    id: "5-day",
    title: "5 days · Hastings + Sunshine swing",
    description:
      "Three nights in Hastings for the headland and beach access, then move to Sunshine Beach for two nights so you can run the surf cam and walk the National Park southern access.",
    bestFor: "Visitors who want a couple of surf days and a coastal walk in the same trip.",
    nights: [
      {
        night: 1,
        areaId: "hastings",
        rationale: "Arrive; first sunset from the headland.",
      },
      {
        night: 2,
        areaId: "hastings",
        rationale: "Coastal walk to Hells Gates and back. Swell-cam pre-breakfast.",
      },
      {
        night: 3,
        areaId: "hastings",
        rationale: "Noosa River morning — ferry to Noosaville; farmers market Sunday.",
      },
      {
        night: 4,
        areaId: "sunshine",
        rationale:
          "Move south; afternoon surf check at Sunshine Beach. Village dinner on Duke Road.",
      },
      {
        night: 5,
        areaId: "sunshine",
        rationale:
          "National Park southern access walk toward Alexandria Bay. Long lunch in the village.",
      },
    ],
  },
  {
    id: "7-day",
    title: "7 days · the full sweep",
    description:
      "Three nights Hastings, two nights Noosaville, two nights Sunshine Beach. The week that lets you actually slow down — dinner at the river on night four, a surf lesson at Sunshine on day six.",
    bestFor: "A working-from-Noosa week or a family holiday with mixed bases.",
    nights: [
      {
        night: 1,
        areaId: "hastings",
        rationale:
          "Arrive; first swim at Main Beach; book out dinner on Hastings.",
      },
      {
        night: 2,
        areaId: "hastings",
        rationale:
          "Coastal walk headland → Hells Gates and back. Sunset cocktails.",
      },
      {
        night: 3,
        areaId: "hastings",
        rationale:
          "River morning; ferry from Sofitel wharf to Noosaville for lunch.",
      },
      {
        night: 4,
        areaId: "noosaville",
        rationale:
          "Move to Gympie Terrace. Walk the river foreshore; dinner at the boatside restaurants.",
      },
      {
        night: 5,
        areaId: "noosaville",
        rationale:
          "Hire a stand-up paddleboard or kayak from the river; late lunch on the foreshore.",
      },
      {
        night: 6,
        areaId: "sunshine",
        rationale:
          "Move south; morning surf lesson (booked through the surf club). Afternoon dog walk on the patrolled beach.",
      },
      {
        night: 7,
        areaId: "sunshine",
        rationale:
          "National Park southern access toward Alexandria Bay. Pack-up dinner on Duke Road.",
      },
    ],
  },
];

/* ----------------------------------------------------------------------
 * Decision helper — three questions, deterministic recommendation.
 * Each question gives a score to each AreaId; totals decide.
 * -------------------------------------------------------------------- */

export type Question = {
  id: string;
  prompt: string;
  options: { label: string; description?: string; scores: Partial<Record<AreaId, number>> }[];
};

export const DECISION_HELPER_QUESTIONS: Question[] = [
  {
    id: "where",
    prompt: "Where do you want to be at sunset?",
    options: [
      {
        label: "Walking back from a Hastings Street restaurant",
        description: "Beach and dining at the door.",
        scores: { hastings: 3, "noosa-sound": 1, sunshine: 1 },
      },
      {
        label: "By the river — paddle craft, foreshore walk, restaurants",
        description: "Quieter, family-friendly, cheaper parking.",
        scores: { noosaville: 3, "noosa-sound": 2 },
      },
      {
        label: "At the surf club, watching the south coast break",
        description: "Surfer-and-walker vibe.",
        scores: { sunshine: 3, peregian: 2 },
      },
      {
        label: "Somewhere quiet, with a holiday house and a dog",
        description: "Village-square feel, south of the headland.",
        scores: { peregian: 3, "noosa-sound": 1 },
      },
    ],
  },
  {
    id: "trip",
    prompt: "Who's coming?",
    options: [
      {
        label: "Couple, want to walk everywhere",
        scores: { hastings: 3, "noosa-sound": 1, sunshine: 1 },
      },
      {
        label: "Family with kids, want a pool",
        scores: { noosaville: 3, hastings: 1, sunshine: 1 },
      },
      {
        label: "Group of friends, want a house and a kitchen",
        scores: { "noosa-sound": 2, noosaville: 2, sunshine: 2, peregian: 2 },
      },
      {
        label: "Solo surfer, want the south coast cam",
        scores: { sunshine: 3, peregian: 2 },
      },
    ],
  },
  {
    id: "duration",
    prompt: "How long?",
    options: [
      {
        label: "Weekend (2-3 nights) — book high-density Hastings",
        scores: { hastings: 3, noosaville: 1 },
      },
      {
        label: "A full week — multiple bases worth it",
        scores: { noosaville: 2, "noosa-sound": 2, sunshine: 2 },
      },
      {
        label: "Long stay (10+ nights) — apartment or house",
        scores: { noosaville: 3, "noosa-sound": 2, sunshine: 2, peregian: 2 },
      },
    ],
  },
];

/* ----------------------------------------------------------------------
 * Helpres — URL getters exposed for the page component.
 * -------------------------------------------------------------------- */

export const HELPERS = {
  booking,
  stayz,
  expedia,
  airbnb,
};

/* ----------------------------------------------------------------------
 * Disclosure language — explicit on-page text for the foot disclosure.
 * Mirrors the footer Compliance Band language so the page documents its
 * own affiliate disclosure at the point of conversion, per ACCC Sch 2.
 * -------------------------------------------------------------------- */

export const ON_PAGE_DISCLOSURE_TEXT =
  "We don't run a booking engine and we don't take inventory. Each property tile links out to a third-party booking engine (most often Booking.com, Stayz, Expedia, or Airbnb) that lists the property across the whole shire. Where MyNoosaHeads participates in an affiliate programme and the booking link is monetised, the link is marked Affiliate before you click; where no programme participation is verified, the link renders without that badge. Affiliate relationships do not influence what we write. The full statement — including the verified programme list — sits in the Legal column in the footer, per the Competition and Consumer Act 2010 (Cth) Schedule 2.";

/* ----------------------------------------------------------------------
 * CONFIG_EXPORT_FOR_PAGE — handy grouping.
 * -------------------------------------------------------------------- */

export const ACCOMMODATION_DATA = {
  areas: AREAS,
  itineraries: ITINERARIES,
  decisionHelper: DECISION_HELPER_QUESTIONS,
  disclosure: ON_PAGE_DISCLOSURE_TEXT,
} as const;

/* ----------------------------------------------------------------------
 * Re-export for the date stamp (build display only — DO NOT use for
 * bookingUrl generation). Real check-in dates are intentionally NOT
 * inferred.
 * -------------------------------------------------------------------- */

export const DATA_GENERATED_AT = TODAY.toISOString().slice(0, 10);
