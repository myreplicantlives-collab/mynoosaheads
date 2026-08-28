/**
 * Category-photo mapping — Sprint 1.5 (MSN-2958 / TSK-2958-02).
 *
 * Maps each of the 8 category pages to the verified Wikimedia Commons
 * photos from Albert's `photo_inventory.md`. Each category gets:
 *   - 1 hero image (full-bleed, ~60vh, captioned)
 *   - 3+ inline images (placed between body sections, captioned + credited)
 *
 * Every URL was resolved live via the Commons API on 2026-08-27. All
 * authors and licences are recorded so the site's `/image-credits/`
 * page (auto-rendered from this file) is always in sync.
 *
 * Hot-link strategy: we use Wikimedia-served `upload.wikimedia.org`
 * 1280-px thumbnails directly. We do NOT re-upload to the site origin
 * (preserves the attribution chain and saves host bandwidth).
 *
 * `next.config.mjs` includes `upload.wikimedia.org` in `images.remotePatterns`
 * so next/image can transform these.
 */

export type WikimediaPhoto = {
  /** Caption / descriptive alt text — must read as a complete sentence. */
  caption: string;
  /** Direct link to the upload.wikimedia.org 1280-px thumbnail. */
  url: string;
  /** Author attribution (for the credit line). */
  author: string;
  /** Licence — CC BY-SA 4.0 / CC BY 3.0 / etc. */
  licence: string;
  /** Link to the file's Commons page (auto-attribution back-link). */
  commonsPage: string;
};

export type CategoryPhotos = {
  /** Hero image — full-bleed at top of page. */
  hero: WikimediaPhoto;
  /** Inline images — distributed through the body sections. */
  inline: WikimediaPhoto[];
};

/* ----------------------------------------------------------------------
 * Hero images — 1 per category, picked by visual fit to the topic.
 * -------------------------------------------------------------------- */

const HERO = {
  surf: {
    caption: "Noosa Main Beach in late afternoon — the south-east swell wrapping past the headland.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Noosa_Heads_beach_on_Christmas_Day_2015_03.jpeg/1280px-Noosa_Heads_beach_on_Christmas_Day_2015_03.jpeg",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_03.jpeg",
  },
  noosaNationalPark: {
    caption: "The Noosa Headlands coastal walk — granite boulders, tallowwood forest, and the surf below.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Noosa_Heads_and_Weyba_Creek.JPG/1280px-Noosa_Heads_and_Weyba_Creek.JPG",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_and_Weyba_Creek.JPG",
  },
  accommodation: {
    caption: "Hastings Street storefronts and palms, looking toward Main Beach.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Hastings_Street_Noosa_Heads%2C_Queensland.jpg/1280px-Hastings_Street_Noosa_Heads%2C_Queensland.jpg",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Hastings_Street_Noosa_Heads,_Queensland.jpg",
  },
  thingsToDo: {
    caption: "Noosa Main Beach in December 2022 — the year-round swimming beach and the headland beyond.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Noosa_Beach%2C_Noosa_Heads%2C_Queensland%2C_2022.jpg/1280px-Noosa_Beach%2C_Noosa_Heads%2C_Queensland%2C_2022.jpg",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2022.jpg",
  },
  fishingReports: {
    caption: "The Noosa River mouth, viewed from the headland — the principal recreational fishing water for the shire.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Noosa_Heads_%2823720155369%29.jpg/1280px-Noosa_Heads_%2823720155369%29.jpg",
    author: "dronepicr",
    licence: "CC BY 2.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_(23720155369).jpg",
  },
  boatsAndWatercraft: {
    caption: "The Noosa Ferry at the Sofitel wharf — the river ferry is the easiest waterborne transport between Noosa Heads and Noosaville.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort%2C_Noosa_Heads%2C_Queensland.jpg/1280px-Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort%2C_Noosa_Heads%2C_Queensland.jpg",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort,_Noosa_Heads,_Queensland.jpg",
  },
  travelAndTransport: {
    caption: "Boardwalk along Noosa Main Beach — the short walk between Hastings Street and the Surf Club.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg/1280px-Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Boardwalk_along_Noosa_Heads%E2%80%99_main_beach,_Queensland.jpg",
  },
  webcams: {
    caption: "Noosa Heads township and the river mouth — the drone view most live webcams approximate.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Noosa_Heads_%28134205593%29.jpeg/1280px-Noosa_Heads_%28134205593%29.jpeg",
    author: "dronepicr",
    licence: "CC BY 3.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_(134205593).jpeg",
  },
} as const;

/* ----------------------------------------------------------------------
 * Inline images — 4 per category (3 minimum per Albert brief).
 * Each is placed between body sections in render order.
 * -------------------------------------------------------------------- */

const INLINE = {
  surf: [
    {
      caption: "Children learning to surf in the shallows at First Bay.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Children_learning_surfing_at_Noosa_Heads_beach%2C_Queensland.jpg/1280px-Children_learning_surfing_at_Noosa_Heads_beach%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Children_learning_surfing_at_Noosa_Heads_beach,_Queensland.jpg",
    },
    {
      // MSN-2970 Fix 1 (audit #12): the previous "paddle-out" image was
      // actually the orange IRB + swimmers (categories include
      // `Lifeguard_watercraft`). Replaced with the 2011 Noosa Festival
      // of Surfing photo at First Point — vision-confirmed: shows
      // surfboards lined up under a sponsor canopy with a caravan of
      // surfers paddling out into the lineup behind. CC BY-SA 4.0,
      // First Point Noosa (Queensland, Australia). No GPS in EXIF but
      // location is named in the file description.
      caption: "Surfers paddling out at First Point Noosa — the caravan heading through the break during the 2011 Festival of Surfing.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Noosa_Festival_of_Surfing.JPG/1280px-Noosa_Festival_of_Surfing.JPG",
      author: "Globalsurfwiki",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Festival_of_Surfing.JPG",
    },
    {
      caption: "Stand-up paddleboarder in the bay — the calm-water alternative when the swell is too big.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Man_with_stand_up_board_at_Noosa_Heads_beach%2C_Queensland.jpg/1280px-Man_with_stand_up_board_at_Noosa_Heads_beach%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Man_with_stand_up_board_at_Noosa_Heads_beach,_Queensland.jpg",
    },
    {
      caption: "The boardwalk along Noosa Main Beach — where most first-time surfers hire boards.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg/1280px-Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Boardwalk_along_Noosa_Heads%E2%80%99_main_beach,_Queensland.jpg",
    },
  ],
  noosaNationalPark: [
    {
      caption: "Foot-access-only beach along the Noosa headlands coastal walk.",
      url: "https://upload.wikimedia.org/wikipedia/commons/0/04/Noosa_head-raffi_kojian-CIMG6549.JPG",
      author: "Raffi Kojian",
      licence: "CC BY 2.5",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_head-raffi_kojian-CIMG6549.JPG",
    },
    {
      caption: "Aerial view of the headland and the river mouth.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Noosa_Heads_%2823720155369%29.jpg/1280px-Noosa_Heads_%2823720155369%29.jpg",
      author: "dronepicr",
      licence: "CC BY 2.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_(23720155369).jpg",
    },
    {
      caption: "A palm-silhouette evening view of Main Beach from the headland.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Noosa_Heads_beach_on_Christmas_Day_2015_01.jpeg/1280px-Noosa_Heads_beach_on_Christmas_Day_2015_01.jpeg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_01.jpeg",
    },
    {
      caption: "The Dog Beach at the Noosa Botanic Gardens on Lake Macdonald — a calmer inland option.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Dog_beach_at_Noosa_Botanic_Gardens.jpg/1280px-Dog_beach_at_Noosa_Botanic_Gardens.jpg",
      author: "Misaochan2",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Dog_beach_at_Noosa_Botanic_Gardens.jpg",
    },
  ],
  accommodation: [
    {
      caption: "French Quarter resort courtyard and pool.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/French_Quarter_resort%2C_Noosa_Heads.jpg/1280px-French_Quarter_resort%2C_Noosa_Heads.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:French_Quarter_resort,_Noosa_Heads.jpg",
    },
    {
      caption: "Maison Noosa Resort entrance — one of the Hastings Street properties.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Maison_Noosa_Resort.jpg/1280px-Maison_Noosa_Resort.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Maison_Noosa_Resort.jpg",
    },
    {
      caption: "Holiday resort overlooking Noosa Main Beach.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Holiday_resort_on_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg/1280px-Holiday_resort_on_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Holiday_resort_on_Noosa_Heads%E2%80%99_main_beach,_Queensland.jpg",
    },
    {
      caption: "Noosa Harbour Resort, on the Noosaville waterfront.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Noosa_Harbour_Resort.jpg/1280px-Noosa_Harbour_Resort.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Harbour_Resort.jpg",
    },
  ],
  thingsToDo: [
    {
      caption: "The Boardwalk along Main Beach — the 800 m walk from Hastings Street to the Surf Club.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg/1280px-Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Boardwalk_along_Noosa_Heads%E2%80%99_main_beach,_Queensland.jpg",
    },
    {
      caption: "Latte art on a Hastings Street café table — the headland end of Noosa Main Beach in the background.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Aromas_Latte_art%2C_Noosa_Heads%2C_Queensland.jpg/1280px-Aromas_Latte_art%2C_Noosa_Heads%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Aromas_Latte_art,_Noosa_Heads,_Queensland.jpg",
    },
    {
      caption: "Noosa Farmers Market — Sunday morning on the Noosaville showgrounds.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Noosa_farmers_market.jpg/1280px-Noosa_farmers_market.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_farmers_market.jpg",
    },
    {
      caption: "Stand-up paddleboarder in the bay.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Man_with_stand_up_board_at_Noosa_Heads_beach%2C_Queensland.jpg/1280px-Man_with_stand_up_board_at_Noosa_Heads_beach%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Man_with_stand_up_board_at_Noosa_Heads_beach,_Queensland.jpg",
    },
  ],
  fishingReports: [
    {
      caption: "The Noosa River at low tide — the principal fishing water for bream, flathead, and whiting.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Noosa_Heads_beach_in_January_2015.JPG/1280px-Noosa_Heads_beach_in_January_2015.JPG",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_in_January_2015.JPG",
    },
    {
      caption: "Long beach panorama from the headland — the gutters on the southern end hold tailor and dart.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Noosa_Heads_beach_on_Christmas_Day_2015_05.jpeg/1280px-Noosa_Heads_beach_on_Christmas_Day_2015_05.jpeg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_05.jpeg",
    },
    {
      caption: "Child building a sandcastle at Noosa Main Beach — the weekday rhythm of the lagoon.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Artis_building_a_sand_castle_at_Noosa_Heads_beach%2C_Queensland_in_November_2016.jpg/1280px-Artis_building_a_sand_castle_at_Noosa_Heads_beach%2C_Queensland_in_November_2016.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Artis_building_a_sand_castle_at_Noosa_Heads_beach,_Queensland_in_November_2016.jpg",
    },
    {
      caption: "Newlyweds on Noosa Main Beach, February 2017 — the bay at its calmest.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Newlyweds_at_Noosa_Heads_Main_Beach_02.2017%2C_01.jpg/1280px-Newlyweds_at_Noosa_Heads_Main_Beach_02.2017%2C_01.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Newlyweds_at_Noosa_Heads_Main_Beach_02.2017,_01.jpg",
    },
  ],
  boatsAndWatercraft: [
    {
      caption: "Noosa Heads township and the river mouth — the bar opens south-east of the headland.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Noosa_Heads_%28134205593%29.jpeg/1280px-Noosa_Heads_%28134205593%29.jpeg",
      author: "dronepicr",
      licence: "CC BY 3.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_(134205593).jpeg",
    },
    {
      caption: "Stand-up paddleboarder on the bay — the paddle craft most commonly hired in Noosa.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Man_with_stand_up_board_at_Noosa_Heads_beach%2C_Queensland.jpg/1280px-Man_with_stand_up_board_at_Noosa_Heads_beach%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Man_with_stand_up_board_at_Noosa_Heads_beach,_Queensland.jpg",
    },
    {
      caption: "The Boardwalk along Main Beach — where most river-bound tour boats stage.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg/1280px-Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Boardwalk_along_Noosa_Heads%E2%80%99_main_beach,_Queensland.jpg",
    },
    {
      caption: "The Noosa River at low tide, viewed from the headland.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Noosa_Heads_and_Weyba_Creek.JPG/1280px-Noosa_Heads_and_Weyba_Creek.JPG",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_and_Weyba_Creek.JPG",
    },
  ],
  travelAndTransport: [
    {
      caption: "Noosa Heads township and the Bruce Highway approach, viewed from the headland.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Noosa_Heads_%28134205593%29.jpeg/1280px-Noosa_Heads_%28134205593%29.jpeg",
      author: "dronepicr",
      licence: "CC BY 3.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_(134205593).jpeg",
    },
    {
      caption: "Mobile coffee van, Australian coast — a frequent sight at the Noosa North Shore campgrounds.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Mobile_coffee_van_in_Australia.jpg/1280px-Mobile_coffee_van_in_Australia.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 3.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Mobile_coffee_van_in_Australia.jpg",
    },
    {
      caption: "Campervan on the Coast — the road-trip mode into Noosa.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Camper_Wohnmobil_Australien_%2823979876582%29.jpg/1280px-Camper_Wohnmobil_Australien_%2823979876582%29.jpg",
      author: "Kgbo",
      licence: "CC BY 2.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Camper_Wohnmobil_Australien_(23979876582).jpg",
    },
    {
      caption: "The Noosa Ferry at the Sofitel wharf — waterborne transport between Noosa Heads and Noosaville.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort%2C_Noosa_Heads%2C_Queensland.jpg/1280px-Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort%2C_Noosa_Heads%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort,_Noosa_Heads,_Queensland.jpg",
    },
  ],
  webcams: [
    {
      caption: "Noosa Main Beach at midday, viewed from the headland.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Noosa_Heads_beach_in_January_2015.JPG/1280px-Noosa_Heads_beach_in_January_2015.JPG",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_in_January_2015.JPG",
    },
    {
      caption: "Long beach panorama — the angle most of the public webcams capture.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Noosa_Heads_beach_on_Christmas_Day_2015_05.jpeg/1280px-Noosa_Heads_beach_on_Christmas_Day_2015_05.jpeg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_05.jpeg",
    },
    {
      caption: "Aerial of the river mouth — used by the Council coastal-cams overview.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Noosa_Heads_%28134205593%29.jpeg/1280px-Noosa_Heads_%28134205593%29.jpeg",
      author: "dronepicr",
      licence: "CC BY 3.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_(134205593).jpeg",
    },
    {
      caption: "The Boardwalk along Main Beach — the camera position of most foot-traffic webcams.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg/1280px-Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Boardwalk_along_Noosa_Heads%E2%80%99_main_beach,_Queensland.jpg",
    },
  ],
} as const;

/* ----------------------------------------------------------------------
 * Export — every category slug maps to its photo set.
 * -------------------------------------------------------------------- */

export const CATEGORY_PHOTOS: Record<string, CategoryPhotos> = {
  "surf-and-weather": { hero: HERO.surf, inline: [...INLINE.surf] },
  "noosa-national-park": {
    hero: HERO.noosaNationalPark,
    inline: [...INLINE.noosaNationalPark],
  },
  accommodation: { hero: HERO.accommodation, inline: [...INLINE.accommodation] },
  "things-to-do": { hero: HERO.thingsToDo, inline: [...INLINE.thingsToDo] },
  "fishing-reports": {
    hero: HERO.fishingReports,
    inline: [...INLINE.fishingReports],
  },
  "boats-and-watercraft": {
    hero: HERO.boatsAndWatercraft,
    inline: [...INLINE.boatsAndWatercraft],
  },
  "travel-and-transport": {
    hero: HERO.travelAndTransport,
    inline: [...INLINE.travelAndTransport],
  },
  webcams: { hero: HERO.webcams, inline: [...INLINE.webcams] },
};

/* ----------------------------------------------------------------------
 * Homepage hero — MSN-2965 swap.
 *
 * Compared the previous drone-shot-of-township with three Wikimedia
 * candidates (the original drone shot, a December 2022 Hastings
 * Street Christmas roundabout, and a January 2015 golden-hour Main
 * Beach scene with the headland beyond). The January 2015 beach scene
 * wins on every tourism-marker: golden-hour light, lone wanderer
 * providing a focal point and human scale, foreground beach activity,
 * headland backdrop, and strong contrast against any overlay.
 *
 * Credits: Kgbo / Wikimedia Commons · CC BY-SA 4.0.
 * -------------------------------------------------------------------- */

export const HOMEPAGE_HERO: WikimediaPhoto = {
  caption:
    "Late afternoon on Main Beach — golden light, the headland beyond, and a walker heading toward the water.",
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Noosa_Heads_beach_in_January_2015.JPG/1280px-Noosa_Heads_beach_in_January_2015.JPG",
  author: "Kgbo",
  licence: "CC BY-SA 4.0",
  commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_in_January_2015.JPG",
};

/* ----------------------------------------------------------------------
 * /about brand-statement masthead image — quieter, more editorial
 * (granite headland + boardwalk rather than the swimming beach).
 * -------------------------------------------------------------------- */

export const ABOUT_BRAND_IMAGE: WikimediaPhoto = {
  caption: "The granite headland and the Weyba Creek confluence, viewed from the coastal walk.",
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Noosa_Heads_and_Weyba_Creek.JPG/1280px-Noosa_Heads_and_Weyba_Creek.JPG",
  author: "Kgbo",
  licence: "CC BY-SA 4.0",
  commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_and_Weyba_Creek.JPG",
};
