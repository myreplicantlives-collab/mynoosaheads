/**
 * Walk data — MSN-2985 V2 release correction pass.
 *
 * Three walks from Albert's D4 brief, given full standalone
 * atmospheric pages at /noosa-national-park/walks/[slug]. Plus the
 * NEW Palm Grove Walk added in MSN-2985 per chairman mandate.
 *
 * Each entry owns:
 *   - slug
 *   - name
 *   - headline
 *   - distance (QPWS-verified)
 *   - grade (QPWS-verified — Grade 1–5 Australian Walking Track
 *     Grading System; replaces V1/V2 "Class X" terminology)
 *   - duration (QPWS-verified)
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
 *   - imageStatus (KEEP / image-pending)
 *
 * MSN-2985 corrections applied (chairman mandate 2026-08-29):
 *   - Coastal Walk: 10.8 km return, Grade 4, 4 hours (was 5.3 km
 *     one-way, Class 2, 3.5 hours return)
 *   - Tanglewood: 8 km return, Grade 4, 2–3 hours (was 5.5 km
 *     one-way, Class 3, 1.5–2 hours one-way)
 *   - Alexandria Bay: 3.3 km one-way (north end) or 4.4 km one-way
 *     (south end) via the Coastal Walk, Grade 4 (was 5.3 km, Class 2)
 *   - Palm Grove Walk (NEW): 1.1 km return, Grade 3, 15–30 min,
 *     image pending per MSN-2985 mandate
 *
 * Source: Queensland Parks and Wildlife Service — Walking tracks
 * summary (Wayback snapshot 2025-12-07). Cross-referenced with
 * Wikipedia Noosa National Park article.
 *
 * @see /Volumes/OpenClawLive/state/control/evidence/MSN-2985/QPWS_FACTS.md
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
  /** MSN-2985 — image status for the page. */
  imageStatus: "verified" | "pending";
};

export const WALKS: WalkPage[] = [
  {
    slug: "coastal-walk",
    name: "Noosa Headland coastal walk",
    headline: "The most walked short trail in Queensland.",
    distance: "10.8 km return (Noosa Heads Surf Club to Sunshine Beach)",
    grade: "Grade 4 (formed but uneven; short steps and climbs; some sections narrow along the headlands)",
    duration: "Allow 4 hours return",
    startPoint: "Noosa Heads Surf Life Saving Club (end of Park Road, Noosa Heads)",
    endPoint: "Sunshine Beach (turn-around beach inside the national park; Alexandria Bay is the halfway point)",
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
      { label: "QPWS — Coastal Walk journey", href: "https://parks.qld.gov.au/parks/noosa/journeys/coastal-walk" },
      { label: "QPWS — Walking tracks summary", href: "https://parks.qld.gov.au/parks/noosa/journeys/walking-tracks-summary" },
      { label: "BOM coastal forecast (Southeast Coast)", href: "https://www.bom.gov.au/coastal-location/australia" },
    ],
    combine:
      "The coastal walk continues beyond Alexandria Bay to Sunshine Beach (about 5.5 km more one-way), exiting at Sunshine Beach Surf Life Saving Club. Doing the full 10.8 km return from the Surf Club to Sunshine and back is a half-day walk.",
    imageStatus: "verified",
  },
  {
    slug: "alexandria-bay",
    name: "Alexandria Bay",
    headline:
      "The halfway beach — surf, granite, and a long stretch of sand with no road access.",
    distance: "3.3 km one-way (to the northern end of Alexandria Bay, via the Coastal Walk from the Surf Club) — or 4.4 km one-way to the southern end",
    grade: "Grade 4 (sand and granite; reached via the Coastal Walk)",
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
      { label: "QPWS — Walking tracks summary", href: "https://parks.qld.gov.au/parks/noosa/journeys/walking-tracks-summary" },
    ],
    notes:
      "Clothing-optional stretch at the southern end of the bay is informal and not signposted. Visitors uncomfortable with that should stay at the northern end or keep walking. QPWS also lists a separate \"Alexandria Bay Walk\" at 4.2 km return — this page describes Alexandria Bay as the destination on the Coastal Walk, not as the separate graded walk.",
    imageStatus: "verified",
  },
  {
    slug: "tanglewood-track",
    name: "Tanglewood track",
    headline:
      "The quieter inland alternative — blackbutt forest, fewer people.",
    distance:
      "8 km return (or 7.1 km circuit via Hells Gates + Coastal Walk return)",
    grade: "Grade 4 (formed track; some uneven sections; climbs; can be muddy after rain)",
    duration: "Allow 2–3 hours return",
    startPoint: "Tanglewood day-use area, off Cooroy–Noosa Road (about 10 minutes' drive west of Noosaville)",
    endPoint: "Junction with the coastal walk, near Hells Gates (one-way) — or continue via Hell's Gates to the Coastal Walk and return (7.1 km circuit)",
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
      { label: "QPWS — Tanglewood Walk journey", href: "https://parks.qld.gov.au/parks/noosa/journeys/tanglewood-walk" },
      { label: "QPWS — Walking tracks summary", href: "https://parks.qld.gov.au/parks/noosa/journeys/walking-tracks-summary" },
    ],
    combine:
      "Combine with the coastal walk for a half-day inland-to-coast loop (Tanglewood one-way, coastal walk back to Noosa Heads — about 11 km total, allow 4 hours). Finish with lunch on Gympie Terrace.",
    imageStatus: "verified",
  },
  {
    slug: "palm-grove",
    name: "Palm Grove Walk",
    headline: "A short rainforest loop with bangalow palms and a stream crossing.",
    distance: "1.1 km return",
    grade: "Grade 3 (formed track; some short climbs; rainforest)",
    duration: "Allow 15–30 minutes",
    startPoint: "Palm Grove day-use area (within the Noosa National Park Headland Section)",
    endPoint: "Return to start (return walk)",
    surface: "Formed track; can be muddy after rain; stream crossing may require careful footing",
    elevation: "Flat to gently undulating through the rainforest",
    whatItsLike:
      "Palm Grove is the short walk the headland section hides behind the surf. The track enters a stand of bangalow palms — a closed-canopy rainforest pocket that's noticeably cooler than the coastal walk above. You'll cross a small stream, see rainforest figs and king ferns, and probably meet more lizards than people. It's a return walk from the same day-use area, and the whole loop fits inside half an hour.",
    whyPeopleWalkIt: [
      "The cool, shaded alternative to the exposed coastal walk — good for a hot morning with kids",
      "Bangalow palms and king ferns in a tight rainforest pocket",
      "Fifteen-minute commitment — easy to fold into a longer Noosa day",
      "Handy as a warm-up before the longer coastal walk, or a cool-down after",
    ],
    whatToBring: [
      "Closed-toe shoes — the stream crossing can be slippery",
      "Water bottle",
      "Insect repellent in the warmer months",
      "Bin bag — no bins in the park",
    ],
    difficulty: "Easy",
    facilities: [
      "Picnic tables at the day-use area",
      "No drinking water (bring your own)",
      "No toilets on the walk itself — closest facilities are at the Tanglewood day-use area, a few minutes' drive away",
    ],
    safety: [
      "Slippery after rain — the stream crossing and rainforest floor can be slick",
      "Standard QPWS rules: no dogs, no bins, no fires",
      "If you see a koala on the ground, leave it alone and report it to QPWS on 13 74 68",
      "Check QPWS alerts before you go — track washouts and fire-danger days can close the walk",
    ],
    howToGetThere: {
      start: "Palm Grove day-use area, off the same access road that serves the Tanglewood day-use area, off Cooroy–Noosa Road",
      parking: "Small carpark at the day-use area",
      transport: "About 10 minutes' drive from Noosaville; about 25 minutes from Noosa Heads",
    },
    whereToCheck: [
      { label: "QPWS — Palm Grove Walk journey", href: "https://parks.qld.gov.au/parks/noosa/journeys/palm-grove-walk" },
      { label: "QPWS — Walking tracks summary", href: "https://parks.qld.gov.au/parks/noosa/journeys/walking-tracks-summary" },
      { label: "QPWS park alerts", href: "https://parks.qld.gov.au/park-alerts" },
      { label: "QPWS — Noosa National Park", href: "https://parks.qld.gov.au/find-a-park/national-parks/noosa-national-park" },
    ],
    combine:
      "Pair with a short visit to the Tanglewood day-use area (about five minutes' drive) for the toilets, or with a longer morning on the coastal walk.",
    imageStatus: "pending",
  },
];

export const WALKS_BY_SLUG: Record<string, WalkPage> = WALKS.reduce(
  (acc, w) => {
    acc[w.slug] = w;
    return acc;
  },
  {} as Record<string, WalkPage>,
);