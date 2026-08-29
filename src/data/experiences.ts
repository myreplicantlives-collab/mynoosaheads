/**
 * Experience data — MSN-2975 V2 build.
 *
 * Four anchor experiences from Albert's D2 brief, given full
 * standalone atmospheric pages at /things-to-do/[slug].
 *
 * Each entry owns:
 *   - slug (URL slug)
 *   - headline (atmospheric one-liner)
 *   - hook (1 sentence atmospheric deck)
 *   - whatItLooksLike (2-3 sentences — the visitor's actual morning)
 *   - bestFor (one tag, two-to-three words)
 *   - whatToBring (3-5 bullets)
 *   - howLong (specific duration)
 *   - difficulty ("Easy" | "Moderate" | "Hard")
 *   - options (operator links — gated by VERIFIED_AFFILIATES per D6)
 *   - safety (bullets — defer to MSQ / SLSQ / QPWS)
 *   - whereToCheck (sidebar sources)
 *   - related (internal links)
 */

export type ExperienceOption = {
  label: string;
  href: string;
  /** Optional caption describing the operator. */
  caption?: string;
};

export type ExperiencePage = {
  slug: string;
  title: string;
  headline: string;
  hook: string;
  /** 2-3 sentences — what the visitor sees, hears, does. */
  whatItLooksLike: string;
  bestFor: string;
  whatToBring: string[];
  howLong: string;
  /** Difficulty — for full walk-outdoor experiences. Free-form for
   * culinary / bookable pages ("Easy" or "None — just walk"). */
  difficulty: string;
  options: ExperienceOption[];
  safety: string[];
  whereToCheck: { label: string; href: string }[];
};

export const EXPERIENCES: ExperiencePage[] = [
  {
    slug: "spend-a-day-on-the-river",
    title: "Spend a day on the Noosa River",
    headline: "Calm water, ferry rides, sunset on Gympie Terrace.",
    hook:
      "The Noosa River runs from the river-mouth bar at Noosa Heads up to Lake Weyba — calm, mostly shallow, and easy to spend a day on.",
    whatItLooksLike:
      "The river is about 25 km of calm water. You can kayak the upper sections, hire a pontoon for the day from Noosaville, take the ferry the length of the river from Tewantin to Hastings Street, or just sit on the grass at the Gympie Terrace foreshore with a coffee. Most visitors do a combination — morning on the water, lunch on the terrace, sunset on the river.",
    bestFor: "Family · couples · first-time visitors",
    whatToBring: [
      "Reef-safe sunscreen — the river water reflects UV straight back up",
      "Hat and a long-sleeve shirt — calm but the sun is still the sun",
      "Water bottle — most hire operators have water on the dock, not on the boat",
      "Sandals or water shoes for the boat ramps",
      "Phone in a waterproof pouch if you're bringing your own kayak or SUP",
    ],
    howLong: "Half a day. Most people launch in the morning, lunch on Gympie Terrace, and are back by mid-afternoon.",
    difficulty: "Easy",
    options: [
      {
        label: "Noosa Ferry & Cruise Co",
        href: "https://www.noosaferry.com/",
        caption: "Scheduled ferry service along the full river length (Tewantin → Noosaville → Noosa Heads). Day passes available.",
      },
      {
        label: "Noosa Ocean Kayak Tours",
        href: "https://www.noosakayaktours.com.au/",
        caption: "Guided kayak tours through the upper river and Lake Weyba.",
      },
    ],
    safety: [
      "Wear a lifejacket. Queensland Transport and Main Roads requires lifejackets on powered vessels and recommends them for paddle craft.",
      "Bar crossings — if you're heading out through the river mouth to the ocean, check the MSQ bar report first. Never cross on a southerly over 20 knots or with swell over 1.5 m without an experienced skipper.",
      "Sun — UV on the river is intense. Cover up between 10 am and 3 pm, slip on a shirt.",
    ],
    whereToCheck: [
      { label: "MSQ bar report", href: "https://www.msq.qld.gov.au/" },
      { label: "BOM Tewantin tide", href: "https://www.bom.gov.au/australia/tides/#!/qld-tewantin" },
      { label: "BOM coastal forecast (Southeast Coast)", href: "https://www.bom.gov.au/coastal-location/australia" },
    ],
  },
  {
    slug: "learn-to-surf",
    title: "Learn to surf at Noosa",
    headline: "First lesson at Main Beach; the points when the swell wraps in.",
    hook:
      "Beginner-friendly beach breaks at Main Beach, world-class points at First Bay and National Park when the south-east swell is running.",
    whatItLooksLike:
      "Noosa has the full range — beginner-friendly beach breaks at Main Beach and the south end of Sunshine, and world-class points at First Bay, National Park (Lifeguard Beach), and Granite Bay when the south-east swell is running. Most visitors start with a two-hour group lesson at Main Beach. That's the right place: patrolled, sandy bottom, no rocks, and a gentle wave when the swell is small.",
    bestFor: "First-time surfers · couples · families with kids 7+",
    whatToBring: [
      "Swimwear, towel, reef-safe sunscreen",
      "Water bottle — surf schools provide boards and rash vests",
      "Hat for between sets (you won't wear it in the water)",
      "Zinc stick for your face — the morning sun on the beach is brutal",
    ],
    howLong: "Two-hour group lesson is the standard. Half-day courses available for visitors who want to build on it.",
    difficulty: "Easy (Main Beach) — Moderate to hard at the points",
    options: [
      {
        label: "Noosa Main Beach surf schools",
        href: "https://noosabeachsurfschool.com/",
        caption: "Learn to surf at Noosa Main Beach with a Noosa-based surf school — daily two-hour group lessons from the beach in front of the Surf Life Saving Club.",
      },
    ],
    safety: [
      "Always surf between the flags when you're learning. Main Beach is patrolled daily during patrol season — confirm the current patrol status on Beachsafe.",
      "The points are not for beginners. First Bay and National Park have rocks, rips, and a steep learning curve.",
      "Don't surf alone. If you're heading out at dawn, go with someone who knows the break.",
      "Wear a legrope. Every time. No exceptions.",
      "Sun protection — a 2-hour lesson in the morning sun will burn anyone; zinc on the face and reef-safe sunscreen on the body.",
    ],
    whereToCheck: [
      { label: "BOM coastal forecast (Southeast Coast)", href: "https://www.bom.gov.au/coastal-location/australia" },
      { label: "SLSQ patrol status", href: "https://www.lifesaving.com.au/" },
      { label: "Noosa Beach Surf School", href: "https://noosabeachsurfschool.com/" },
    ],
  },
  {
    slug: "eat-your-way-along-hastings-street",
    title: "Eat your way along Hastings Street",
    headline: "Cafés, restaurants, and a long lunch on the surf club deck.",
    hook:
      "Hastings Street is the 800-metre strip between Main Beach and the headland. It's where Noosa eats.",
    whatItLooksLike:
      "Morning starts with a flat-white and the paper at one of the cafés at the beach end; lunch is either a counter meal at the surf club (great for kids, easy walk-up) or a long lunch at one of the better-known restaurants in the middle of the strip; dinner is where you book ahead — the small restaurants fill up fast in summer. Across the river on Gympie Terrace, the pace is slower, the dining rooms are bigger, and the foreshore is the view.",
    bestFor: "Anyone who eats · couples · families · foodies",
    whatToBring: [
      "A reservation (for dinner)",
      "A sense of what you want — the strip is concentrated, you can decide on the day",
      "Cash for the surf club (cards accepted but faster with cash)",
    ],
    howLong: "Three meals, three different rhythms. Allow a long breakfast, a lunch slot, and a dinner booking.",
    difficulty: "None. Just walk.",
    options: [
      {
        label: "Season Restaurant",
        href: "https://seasonrestaurant.com.au/",
        caption: "For a representative fine-dining Hastings Street booking — or pick the restaurant that suits from the /eat-and-drink venue list.",
      },
    ],
    safety: [
      "Book ahead for dinner in summer and school holidays. The smaller restaurants fill up 1–2 weeks ahead in peak season.",
      "Walk in for breakfast and lunch at most places.",
      "BYO is uncommon — most Hastings restaurants are licensed. Some accept BYO wine with a corkage fee; ask when you book.",
      "Sunday: many restaurants close or run a reduced service. Check before you walk over.",
    ],
    whereToCheck: [
      { label: "Season Restaurant", href: "https://seasonrestaurant.com.au/" },
      { label: "Aroma Noosa", href: "https://aromanoosa.com.au/" },
    ],
  },
  {
    slug: "book-a-cruise-tour-or-wellness-experience",
    title: "Book a cruise, tour or wellness experience",
    headline: "River cruises, hinterland tours, day spas on Hastings.",
    hook:
      "Noosa has the full bookable stack — river cruises, hinterland tours, guided walks, day spas.",
    whatItLooksLike:
      "River cruises leave from the Noosa Marina and the Noosaville wharf — sunset cruises are the most popular, and the duration is usually 1.5–2.5 hours with a drink in hand. Hinterland tours run to the Glass House Mountains, Australia Zoo at Beerwah, and the inland villages (Pomona, Cooran, Kin Kin). Guided walks through the coastal track run with local naturalists on weekend mornings. Day spas on Hastings are walk-in bookable for most treatments, although the better ones are booked out a week or more ahead in summer.",
    bestFor: "Couples · families · visitors wanting a different evening",
    whatToBring: [
      "Camera for the sunset cruises (the river light at sunset is the point)",
      "Light jacket for the evening cruises (the river cools fast after sundown)",
      "Walking shoes for the hinterland tours",
      "Swimwear for the spa (some have plunge pools)",
    ],
    howLong:
      "River cruise: 1.5–2.5 hours. Hinterland tour: half day. Guided coastal walk: 2–3 hours. Day spa: 1.5–3 hours.",
    difficulty: "Easy across the board",
    options: [
      {
        label: "Noosa Ferry & Cruise Co",
        href: "https://www.noosaferry.com/",
        caption: "Scheduled river cruises plus themed sunset cruises.",
      },
      {
        label: "Noosa Trail Network",
        href: "https://www.noosatrails.com.au/",
        caption: "Self-guided hinterland trail network — maps, distances, and difficulty grades for the Noosa Trail Network.",
      },
      {
        label: "MSQ — recreational boating",
        href: "https://www.msq.qld.gov.au/",
        caption: "For self-skippered hire boats.",
      },
    ],
    safety: [
      "River cruises: lifejackets provided; the boats are surveyed by MSQ.",
      "Hinterland tours: pick-up and drop-off at your accommodation; the operator carries first aid and water.",
      "Day spas: standard health-and-safety protocols; tell the therapist about any conditions at booking.",
    ],
    whereToCheck: [
      { label: "Noosa Ferry & Cruise Co", href: "https://www.noosaferry.com/" },
      { label: "MSQ — recreational boating", href: "https://www.msq.qld.gov.au/" },
    ],
  },
  {
    slug: "everglades-day-trip",
    title: "Everglades day trip",
    headline: "Still water, paperbark, two hours up the river.",
    hook:
      "The Noosa Everglades are 25 km of still, tea-coloured water upriver from Noosaville, in the Cooloola section of the Great Sandy National Park.",
    whatItLooksLike:
      "The Everglades are not the river you paddle from Hastings — they're the upper catchment, accessible only by guided kayak tour or by self-skipper hire boat. The water is tea-coloured from the tea-tree tannins, the paperbarks arch over the channel, and you'll see a fraction of the visitors you see on the lower river. Most tours depart from the Noosaville wharf and run four to six hours, including the transfer.",
    bestFor: "Nature-lovers · kayakers · a different morning from the beach",
    whatToBring: [
      "Reef-safe sunscreen (the tannin water reflects UV)",
      "Hat and long-sleeve shirt",
      "Water bottle — most operators carry water on the boat",
      "Phone in a waterproof pouch",
      "Binoculars if you have them (the bird life is the point)",
    ],
    howLong: "Half-day (4–6 hours including transfer from Noosaville). Full-day kayak tours available.",
    difficulty: "Easy (motorised cruise) — Easy to moderate (guided kayak)",
    options: [
      {
        label: "Noosa Ocean Kayak Tours",
        href: "https://www.noosakayaktours.com.au/",
        caption: "Half-day guided kayak tours up the Everglades.",
      },
      {
        label: "Noosa Ocean Kayak Tours",
        href: "https://www.noosakayaktours.com.au/",
        caption: "Half-day guided kayak tours up the Noosa Everglades — tannin-coloured water, paperbark forest, wildlife.",
      },
    ],
    safety: [
      "Wear a lifejacket. Standard on guided tours; the hire operators enforce this for self-skippered boats.",
      "Carry water. The tannin-coloured water is drinkable in an emergency but not great-tasting; the boat operators carry fresh water.",
      "Sun protection — half a day on tannin water is a lot of UV.",
    ],
    whereToCheck: [
      { label: "QPWS — Cooloola Recreation Area", href: "https://parks.qld.gov.au/find-a-park/national-parks/cooloola-recreation-area" },
      { label: "Noosa Ocean Kayak Tours", href: "https://www.noosakayaktours.com.au/" },
    ],
  },
  {
    slug: "hinterland-day-trip",
    title: "Hinterland day trip",
    headline: "Pomona, Cooran, Kin Kin — thirty minutes up the range.",
    hook:
      "The Noosa Hinterland is a thirty-minute drive west into the Blackall Range — Pomona, Cooran, Kin Kin, and Cooroy are the four villages; each has a Saturday market, a country pub, and a different temperature.",
    whatItLooksLike:
      "Drive twenty-five minutes up the range from Noosaville and the temperature drops three to five degrees. Pomona has Mt Cooroora at its back (the ring-bark walk up the peak is two hours return); Cooran is the smallest village, with a single pub and a community garden; Kin Kin is the furthest and quietest, with the Noosa Trail Network radiating out from the village. Each village has a country pub doing counter meals, and the Pomona Saturday market is the regional makers' market before Eumundi.",
    bestFor: "A different morning · foodies wanting to escape the coast · walkers",
    whatToBring: [
      "Walking shoes (Pomona ring-bark is steep in places)",
      "Water bottle — the hinterland cafes run on tank water",
      "Hat (the sun is sharper up the range)",
      "Spending money for the Saturday market",
      "A hire car or guided tour",
    ],
    howLong: "Half-day to full-day. Allow 4 hours for a Pomona morning; a full day for the trail network.",
    difficulty: "Easy (driving tour) — Moderate (Pomona peak walk)",
    options: [
      {
        label: "Noosa Trail Network",
        href: "https://www.noosatrails.com.au/",
        caption: "Hinterland trail network with maps, distances, and village-by-village route notes.",
      },
    ],
    safety: [
      "Drive carefully — the range roads are winding and have wildlife at dawn and dusk.",
      "Pomona peak walk — start early. By 10 am in summer the exposed rock sections are hot.",
      "Carry water on the trail network — the hinterland is hotter and drier than the coast.",
    ],
    whereToCheck: [
      { label: "Noosa Trail Network map", href: "https://www.noosatrails.com.au/" },
      { label: "Noosa Trail Network", href: "https://www.noosatrails.com.au/" },
    ],
  },
  {
    slug: "fishing-charter",
    title: "Book a fishing charter",
    headline: "River, estuary, inshore — pick the boat.",
    hook:
      "Noosa has the full fishing stack — calm-water river and estuary, beach and surf, and offshore reef and game fish within an hour's run from the Noosa bar.",
    whatItLooksLike:
      "Half-day estuary charters leave from the Noosa Marina and target flathead, bream, and the occasional threadfin salmon in the lower river and Weyba Creek. Full-day offshore charters leave before dawn and target spotted mackerel, mahi-mahi, and the occasional tuna. Beach fishing at sunrise — early mornings at the river mouth and along Sunshine Beach — is free, no licence required in Queensland for recreational fishing from the beach (verify with QFMA).",
    bestFor: "Anglers · families · anyone who wants to catch dinner",
    whatToBring: [
      "Hat and long-sleeve shirt (UV on the water is intense)",
      "Reef-safe sunscreen and zinc for the face",
      "Soft-soled shoes (no black-soled boots on most charter boats)",
      "Camera for the catch (the deckhand will photograph the big ones)",
      "Sea-sickness pills if you're prone — half an hour before you board",
    ],
    howLong: "Half-day estuary: 4 hours. Full-day offshore: 8 hours. Beach fishing: 2–4 hours.",
    difficulty: "Easy (estuary and beach) — Moderate (offshore; susceptible to weather and swell)",
    options: [
      {
        label: "Noosa Fishing & Adventure Charters",
        href: "https://www.noosafishingcharters.com.au/",
        caption: "Half-day estuary and full-day offshore charters from Noosa Marina.",
      },
      {
        label: "QFMA — recreational fishing rules",
        href: "https://www.qfma.qld.gov.au/",
        caption: "Queensland recreational fishing rules and bag limits.",
      },
    ],
    safety: [
      "Lifejackets — supplied and required on charter boats.",
      "Offshore weather — the charter operators check BOM before departure; if the swell is over the limit, the trip is rescheduled.",
      "Sun protection — 8 hours on offshore water is brutal. Cover up between 10 am and 3 pm.",
      "Bar crossings — if your charter heads out through the Noosa bar, the skipper will check the MSQ bar report. The bar is closed when conditions exceed MSQ limits.",
    ],
    whereToCheck: [
      { label: "BOM coastal forecast (Southeast Coast)", href: "https://www.bom.gov.au/coastal-location/australia" },
      { label: "MSQ bar report", href: "https://www.msq.qld.gov.au/" },
      { label: "QFMA bag and size limits", href: "https://www.qfma.qld.gov.au/" },
    ],
  },
];

export const EXPERIENCES_BY_SLUG: Record<string, ExperiencePage> =
  EXPERIENCES.reduce(
    (acc, e) => {
      acc[e.slug] = e;
      return acc;
    },
    {} as Record<string, ExperiencePage>,
  );
