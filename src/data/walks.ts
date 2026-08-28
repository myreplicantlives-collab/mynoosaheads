/**
 * Walk data — MSN-2975 V2 build.
 *
 * Three walks from Albert's D4 brief, given full standalone
 * atmospheric pages at /noosa-national-park/walks/[slug].
 *
 * Each entry owns:
 *   - slug
 *   - name
 *   - headline
 *   - distance (one-way, ACCURATE)
 *   - grade (Class 2 / Class 3 — ACCURATE)
 *   - duration
 *   - startPoint
 *   - endPoint
 *   - surface
 *   - elevation
 *   - whatItsLike (2-3 sentences — atmospheric)
 *   - whyPeopleWalkIt (3-4 bullets)
 *   - whatToBring (4-6 bullets)
 *   - difficulty (Moderate / Easy)
 *   - facilities (bullets — yes / no)
 *   - safety (concise; defer to QPWS)
 *   - howToGetThere (start, parking, transport)
 *   - whereToCheck (sidebar)
 *   - combine (suggested combination)
 *
 * Critical corrections applied:
 *   - Tanglewood distance: V1 said 3 km; V2 (per D4) uses 5.5 km
 *     one-way as the best conservative figure. Flagged for Tim to
 *     verify against QPWS signage before launch.
 *   - Alexandria Bay clothing-optional: V2 includes the
 *     informal / not-signposted language from D4.
 */

export type WalkPage = {
  slug: string;
  name: string;
  headline: string;
  distance: string;
  grade: string;
  duration: string;
  startPoint: string;
  endPoint: string;
  surface: string;
  elevation: string;
  whatItsLike: string;
  whyPeopleWalkIt: string[];
  whatToBring: string[];
  difficulty: "Easy" | "Moderate" | "Hard";
  facilities: string[];
  safety: string[];
  howToGetThere: { start: string; parking: string; transport?: string };
  whereToCheck: { label: string; href: string }[];
  combine?: string;
  /** Alexandria Bay specific — notes the clothing-optional stretch. */
  notes?: string;
};

export const WALKS: WalkPage[] = [
  {
    slug: "coastal-walk",
    name: "Noosa Headland coastal walk",
    headline: "The most walked short trail in Queensland.",
    distance: "~5.3 km one-way (Noosa Heads Surf Club to Alexandria Bay)",
    grade: "Class 2 (formed but uneven; short steps and climbs; some sections narrow along the headlands)",
    duration: "Allow 2 hours one-way at a relaxed pace; allow 3.5 hours return",
    startPoint: "Noosa Heads Surf Life Saving Club (end of Park Road, Noosa Heads)",
    endPoint: "Alexandria Bay (the turn-around beach inside the national park)",
    surface: "Concrete and formed gravel path; some sealed sections; rocky outcrops at the headlands",
    elevation: "Mostly flat with short climbs at the headlands; Noosa Hill (147 m) is the high point nearby but not on the coastal walk itself",
    whatItsLike:
      "The coastal walk runs along the eastern edge of Noosa Headland — granite boulders, tallowwood forest, surf below. You walk on a formed track that climbs up and over each headland before dropping back to the next beach. The granite sections are exposed to the sun; the tallowwood sections are shaded and the most likely place to spot a koala.",
    whyPeopleWalkIt: [
      "The only national-park coastal walk on the Sunshine Coast that's reached by walking from a beachside town",
      "Reliable koala sightings — the tallowwoods between Noosa Head and Dolphin Point hold one of the better-studied koala populations on the coast",
      "Whale watching in season (northbound June–August, southbound September–November) from the headland lookouts",
      "Sunrise is the magic hour; by 9 am in summer the carpark is full and the exposed granite is hot",
    ],
    whatToBring: [
      "Water (1 L per person minimum; no taps on the walk)",
      "Hat and sunscreen (the granite sections are exposed)",
      "Sturdy shoes — thongs will get you through but aren't ideal on the steps",
      "Bin bag — there are no bins in the park; whatever you carry in, you carry out",
      "Phone with the BOM coastal forecast open if you're combining with a swim at Alexandria Bay",
    ],
    difficulty: "Moderate",
    facilities: [
      "Toilets at the Surf Club end only",
      "Drinking water at the Surf Club end only",
      "No bins anywhere on the walk — pack out",
      "Benches at two of the headland lookouts",
    ],
    safety: [
      "Surf at Alexandria Bay: unpatrolled, strong rips. Swim only between the flags at Main Beach or at patrolled Sunshine Beach.",
      "Wildlife: if you see a koala on the ground, leave it alone and report it to QPWS (13 74 68) — a koala on the ground is usually in trouble.",
      "Weather: the granite gets hot in summer and slippery after rain. Avoid the walk during a southerly change.",
      "QPWS alerts: check before you go — track washouts, fire danger days, wildlife management work. Always defer to the current QPWS bulletin.",
    ],
    howToGetThere: {
      start: "Noosa Heads Surf Life Saving Club, end of Park Road",
      parking: "Noosa Heads Main Beach carpark on Hastings Street (paid in summer); Noosa Drive overflow",
      transport: "Walk from anywhere on Hastings Street; the Noosa Heads Surf Club is the south end of the precinct",
    },
    whereToCheck: [
      { label: "QPWS — Noosa National Park", href: "https://parks.qld.gov.au/find-a-park/national-parks/noosa-national-park" },
      { label: "QPWS park alerts", href: "https://parks.qld.gov.au/park-alerts" },
      { label: "BOM coastal forecast (Southeast Coast)", href: "https://www.bom.gov.au/coastal-location/australia" },
      { label: "Beachsafe — Noosa Main Beach", href: "https://beachsafe.org.au/" },
    ],
    combine:
      "The coastal walk continues beyond Alexandria Bay to Sunshine Beach (about 5.5 km more one-way), exiting at Sunshine Beach Surf Life Saving Club. Doing the full 10.8 km return from the Surf Club to Sunshine and back is a half-day walk.",
  },
  {
    slug: "alexandria-bay",
    name: "Alexandria Bay",
    headline:
      "The halfway beach — surf, granite, and a long stretch of sand with no road access.",
    distance: "~5.3 km from the Noosa Heads Surf Club (reached via the coastal walk only)",
    grade: "Class 2 (sand and granite; no formed track beyond the coastal walk itself)",
    duration: "Allow 1.5–2 hours one-way at a relaxed pace from the Surf Club",
    startPoint: "End of the coastal walk inside Noosa National Park",
    endPoint: "Alexandria Bay",
    surface: "Sand; granite shelves at either end",
    elevation: "Sea level",
    whatItsLike:
      "Alexandria Bay sits inside Noosa National Park between Noosa Head (north) and Devils Kitchen (south). It's a long, north-facing beach — about 800 m of soft sand backed by low vegetation. The headlands at either end have the same granite boulders as the rest of the coastal walk. It's quieter than Main Beach and the patrolled sections of Sunshine, which is precisely why some people go there.",
    whyPeopleWalkIt: [
      "No cars, no buildings — the bay is inside the national park; there's nothing commercial here",
      "Quieter than Main Beach — even in peak summer you'll find a stretch of sand",
      "Clothing-optional area at the southern end (informal; not signposted). If you're not comfortable with that, stay at the northern end of the bay or keep walking.",
    ],
    whatToBring: [
      "Water — there are no taps at Alexandria Bay",
      "Hat and sunscreen — no shade on the main stretch of sand",
      "Bin bag — no bins in the park",
      "Footwear for the rocky shelves if you're exploring the reef pockets",
    ],
    difficulty: "Moderate",
    facilities: ["None. No toilets, no water, no bins. Facilities are 5.3 km back at the Noosa Heads Surf Club."],
    safety: [
      "No patrol — there is no SLSQ coverage at Alexandria Bay",
      "Rips — most common at the southern headland (Devils Kitchen); check conditions before entering",
      "Stingers (marine stingers) — possible in the warm months (typically November to May); check the SLSQ stinger report for the Sunshine Coast",
      "Sun — the sand has no natural shade; cover up between 10 am and 3 pm",
      "If you see a koala on the ground — leave it alone and report to QPWS on 13 74 68",
    ],
    howToGetThere: {
      start: "Walk-in only, via the coastal walk from Noosa Heads Surf Club",
      parking: "Park at the Noosa Heads Main Beach carpark on Hastings Street (paid in summer); walk in from there",
    },
    whereToCheck: [
      { label: "BOM coastal forecast (Southeast Coast)", href: "https://www.bom.gov.au/coastal-location/australia" },
      { label: "QPWS alerts", href: "https://parks.qld.gov.au/park-alerts" },
      { label: "SLSQ stinger report", href: "https://www.lifesaving.com.au/" },
    ],
    notes:
      "Clothing-optional stretch at the southern end of the bay is informal and not signposted. Visitors uncomfortable with that should stay at the northern end or keep walking.",
  },
  {
    slug: "tanglewood-track",
    name: "Tanglewood track",
    headline:
      "The quieter inland alternative — blackbutt forest, fewer people.",
    distance:
      "Approximately 5.5 km one-way (Tanglewood day-use area to the junction with the coastal walk near Hells Gates)",
    grade: "Class 3 (formed track, some uneven sections, longer climbs than the coastal walk)",
    duration: "Allow 1.5–2 hours one-way at a relaxed pace",
    startPoint: "Tanglewood day-use area, off Cooroy–Noosa Road (about 10 minutes' drive west of Noosaville)",
    endPoint: "Junction with the coastal walk, near Hells Gates",
    surface: "Formed gravel and dirt; can be muddy after rain",
    elevation: "Gradual climb through blackbutt and tallowwood forest",
    whatItsLike:
      "Tanglewood runs west-to-east through the forested ridge that connects the Noosa hinterland to the coastal headlands. Where the coastal walk is granite and tallowwood with the ocean as your companion, Tanglewood is blackbutt and rainforest — cooler, shadier, and almost always empty. The track opens onto the coastal walk near Hells Gates, so you can combine the two for a half-day loop or a longer day walk.",
    whyPeopleWalkIt: [
      "Wildlife: glossy black-cockatoos feed on casuarina seeds in this area — uncommon on the coast. They're about the size of a sulphur-crested cockatoo; males have a distinctive red tail panel.",
      "Cooler and quieter than the coastal walk — good for a summer morning when the granite is hot",
      "Combines well with the coastal walk as a half-day loop",
    ],
    whatToBring: [
      "Water (1 L per person)",
      "Insect repellent — the leeches are real in the wetter sections",
      "Long trousers recommended in the wetter months",
      "Bin bag — no bins in the park",
      "Phone with the QPWS alerts page bookmarked",
    ],
    difficulty: "Moderate",
    facilities: [
      "Toilets and picnic tables at the Tanglewood day-use area",
      "No bins",
      "No drinking water (bring your own)",
    ],
    safety: [
      "Leeches in the wetter sections, especially after rain",
      "Wildlife: same rules as the coastal walk — koala on the ground, call QPWS on 13 74 68",
      "Mobile reception can be patchy on the inland sections",
      "Weather: track can be muddy after rain; check QPWS alerts before you go",
    ],
    howToGetThere: {
      start: "Tanglewood day-use area, off Cooroy–Noosa Road (Cooroy side, west of Noosaville)",
      parking: "Small carpark at the day-use area",
      transport: "About 10 minutes from Noosaville, about 25 minutes from Noosa Heads by car",
    },
    whereToCheck: [
      { label: "QPWS — Noosa National Park Day-use areas", href: "https://parks.qld.gov.au/find-a-park/national-parks/noosa-national-park/day-use-areas" },
      { label: "QPWS park alerts", href: "https://parks.qld.gov.au/park-alerts" },
    ],
    combine:
      "Combine with the coastal walk for a half-day inland-to-coast loop (Tanglewood one-way, coastal walk back to Noosa Heads — about 11 km total, allow 4 hours). Finish with lunch on Gympie Terrace.",
  },
];

export const WALKS_BY_SLUG: Record<string, WalkPage> = WALKS.reduce(
  (acc, w) => {
    acc[w.slug] = w;
    return acc;
  },
  {} as Record<string, WalkPage>,
);
