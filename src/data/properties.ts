/**
 * Property data — MSN-2975 V2 build.
 *
 * Five anchor properties from Albert's D1 brief, given full
 * standalone atmospheric pages at /stay/[slug]. The remaining
 * five properties on /accommodation keep their curated-summary
 * treatment on the index page.
 *
 * Each entry owns:
 *   - slug (URL slug)
 *   - name
 *   - areaId (links to accommodation.ts AREAS)
 *   - headline (KUBE-style — location / era / distinction)
 *   - why (2-3 sentence atmospheric pitch)
 *   - bestFor (one tag)
 *   - rooms (room types)
 *   - amenities (3-5 bullets)
 *   - address (street, suburb)
 *   - location (atmospheric location copy)
 *   - bookingUrl (operator-specific search on a third-party engine)
 *   - engine (booking engine identifier)
 *   - rating (indicative; flagged for Tim — see D1 notes)
 *   - type ("Hotel" | "Resort" | "Apartment-hotel" | "Holiday apartments")
 *
 * Per D6 monetisation scaffolding: no Featured/Sponsored badges
 * render until VERIFIED_AFFILIATES contains a programme ID. The
 * bookingUrl is a property-name search on Booking.com; the search
 * results show the property first when the name matches exactly.
 */

import type { AreaId } from "./accommodation";

export type PropertyEngine = "booking" | "stayz" | "expedia" | "airbnb" | "direct";

export type PropertyPage = {
  slug: string;
  name: string;
  areaId: AreaId;
  headline: string;
  /** 2-3 sentence atmospheric "why this property". */
  why: string;
  /** One short "best for" tag, two-to-three words. */
  bestFor: string;
  /** Room types — bullets. */
  rooms: string[];
  /** Amenities — bullets. */
  amenities: string[];
  /** Street address, suburb, state, postcode. */
  address: string;
  /** Atmospheric location copy. */
  location: string;
  /** Booking engine search URL. */
  bookingUrl: string;
  engine: PropertyEngine;
  /** Indicative rating (e.g. "5-star · Booking.com ~8.6"). */
  rating: string;
  /** Property type. */
  type: string;
};

export const PROPERTIES: PropertyPage[] = [
  {
    slug: "sofitel-noosa-pacific-resort",
    name: "Sofitel Noosa Pacific Resort",
    areaId: "hastings",
    headline: "A Hastings Street icon since 1988.",
    why:
      "The only full-service hotel on Hastings Street with a true oceanfront pool deck — the lagoon wraps around the front of the building so you can step from a lounger straight onto Main Beach. The Sofitel sits at the southern end of the precinct, closest of any hotel to the headland coastal walk, which is why you'll see guests wandering up to the national park in the morning before breakfast opens downstairs.",
    bestFor: "Luxury · couples · milestone stays",
    rooms: [
      "Lagoon-side rooms with private balconies over the pool deck",
      "Junior suites on the upper floors with partial ocean views",
      "Sofitel MyBed — the chain's signature bedding, dressed in linen",
    ],
    amenities: [
      "Oceanfront heated lagoon pool and pool bar",
      "Noosa Beach House restaurant — Peter Kuruvita's seasonal kitchen",
      "24-hour room service, concierge, valet parking",
      "Day spa with a single treatment room overlooking Main Beach",
      "Direct beach access from the pool deck",
    ],
    address: "16 Hastings Street, Noosa Heads QLD 4567",
    location:
      "Southern end of Hastings Street. Twenty paces from the flags at Main Beach. Forty paces from the start of the Noosa Headland coastal walk. No need for a car once you're here — everything on Hastings is walkable.",
    bookingUrl:
      "https://www.booking.com/searchresults.html?ss=Sofitel+Noosa+Pacific+Resort+Queensland",
    engine: "booking",
    rating: "5-star · Booking.com ~8.6 (indicative)",
    type: "Hotel",
  },
  {
    slug: "racv-noosa-resort",
    name: "RACV Noosa Resort",
    areaId: "hastings",
    headline: "Hastings with a kids' wing and an adults-only wing.",
    why:
      "The only resort on the Sunshine Coast that genuinely works for three generations under one roof. RACV has the largest family-suite inventory on Hastings, a heated lagoon pool with a toddlers' end, and a separate East Lodge wing restricted to adults — handy for grandparents who want a quiet drink while the kids run wild. It backs onto Noosa Drive, which means you have a real car park (not Hastings Street's tight underground maze) and the resort runs a regular shuttle to the beach during summer.",
    bestFor: "Family · multi-gen · 5+ nights",
    rooms: [
      "One- and two-bedroom family suites with full kitchens",
      "Three-bedroom interconnecting suites for groups",
      "East Lodge studio rooms — adults only, no under-16s",
      "Accessible rooms on every floor",
    ],
    amenities: [
      "Two heated pools: the family lagoon and the East Lodge lap pool",
      "Kids' club during school holidays (booked sessions, extra fee)",
      "Day spa, gym, tennis court",
      "On-site restaurant and casual poolside café",
      "Free shuttle to Hastings Street and Main Beach",
    ],
    address: "94 Noosa Drive, Noosa Heads QLD 4567",
    location:
      "A two-minute drive back from Hastings Street, on the Noosa Drive side. Quieter than the Hastings strip, with real parking. The resort runs a shuttle bus to the beach precinct — typically every 30 minutes in peak season.",
    bookingUrl:
      "https://www.booking.com/searchresults.html?ss=RACV+Noosa+Resort",
    engine: "booking",
    rating: "5-star · Booking.com ~9.0 (indicative)",
    type: "Resort",
  },
  {
    slug: "south-pacific-resort-spa-noosa",
    name: "South Pacific Resort & Spa Noosa",
    areaId: "noosaville",
    headline: "Gympie Terrace's biggest lagoon, and a five-minute walk to the ferry.",
    why:
      "The quiet workhorse of Noosaville. Apartment-style rooms with full kitchens, a heated lagoon pool with a swim-up bar, and the kind of slow Noosa-river rhythm that suits a five-night stay. You're a five-minute walk to the Noosa Ferry wharf, which means you can do Hastings Street for dinner without touching the car park.",
    bestFor: "Family · long-stay · self-caterers",
    rooms: [
      "One-bedroom apartments with full kitchen and laundry",
      "Two-bedroom apartments — sleeps four comfortably",
      "Spa apartments at the pool end (slightly more, slightly noisier)",
    ],
    amenities: [
      "Heated lagoon pool with swim-up bar",
      "Spa, sauna, gym",
      "BBQ area in the garden",
      "Free Wi-Fi, free parking",
      "Bike hire on-site",
    ],
    address: "179 Weyba Road, Noosaville QLD 4566",
    location:
      "On Weyba Road, just back from Gympie Terrace. Walk to the Noosa Ferry Noosaville wharf in five minutes; the ferry runs to Hastings Street every 30 minutes during the day.",
    bookingUrl:
      "https://www.booking.com/searchresults.html?ss=South+Pacific+Resort+Spa+Noosa",
    engine: "booking",
    rating: "4-star · Booking.com ~8.5 (indicative)",
    type: "Apartment-hotel",
  },
  {
    slug: "sunshine-beach-resort",
    name: "Sunshine Beach Resort",
    areaId: "sunshine",
    headline: "Across the road from the patrolled sand.",
    why:
      "The closest beachfront option south of the headland, and one of the few where you walk from your apartment across one road and you're on the flagged sand. Sunshine Beach is patrolled year-round by Sunshine Beach Surf Life Saving Club (the southern entry to Noosa National Park is a ten-minute walk north). Duke Road has the village's cafés and a small bottle shop; Hastings Street is twelve minutes by car.",
    bestFor: "Beachfront · surfers · couples",
    rooms: [
      "Studios with kitchenettes (one or two nights welcome)",
      "One-bedroom apartments with full kitchen",
      "Two-bedroom rooftop apartments with sun terrace",
      "Dog-friendly units available (request at booking — verify with operator)",
    ],
    amenities: [
      "Heated pool in the central courtyard",
      "BBQ area",
      "Free parking — one car space per apartment",
      "Walk to surf club, cafés, village shops",
    ],
    address: "34 Duke Street, Sunshine Beach QLD 4567",
    location:
      "Opposite the patrolled section of Sunshine Beach, between the surf club and the village shops. Twelve minutes by car to Hastings Street. Ten minutes on foot to the southern entry of Noosa National Park. The Peregian village is ten minutes south.",
    bookingUrl:
      "https://www.booking.com/searchresults.html?ss=Sunshine+Beach+Resort+Noosa",
    engine: "booking",
    rating: "4-star · Booking.com ~8.3 (indicative)",
    type: "Holiday apartments",
  },
  {
    slug: "netanya-noosa",
    name: "Netanya Noosa",
    areaId: "hastings",
    headline: "Two-bedroom Hastings Street at a price that doesn't sting.",
    why:
      "The Hastings Street apartments where Main Beach meets the street — front-row position, family-sized rooms, and rates that don't carry the 5-star premium. Netanya has been trading on Hastings for decades; the rooms are simple, the kitchens work, the balconies face the beach. For families who want the Hastings address without the Hastings rates, this is the one.",
    bestFor: "Family · value · multi-night",
    rooms: [
      "Two-bedroom apartments with full kitchen, balcony",
      "Three-bedroom apartments for larger families",
      "Family-friendly layouts — no glass coffee tables",
    ],
    amenities: [
      "Heated outdoor pool",
      "Lift access to every floor",
      "On-site parking (rare on Hastings — confirm at booking)",
      "Walk to beach, restaurants, surf club",
    ],
    address: "75 Hastings Street, Noosa Heads QLD 4567",
    location:
      "Mid-Hastings, on the beach side of the street. Main Beach at the door, the surf club a minute south, the headland coastal walk a minute north. No need for a car.",
    bookingUrl: "https://www.booking.com/searchresults.html?ss=Netanya+Noosa",
    engine: "booking",
    rating: "4-star · Booking.com ~8.4 (indicative)",
    type: "Holiday apartments",
  },
];

export const PROPERTIES_BY_SLUG: Record<string, PropertyPage> = PROPERTIES.reduce(
  (acc, p) => {
    acc[p.slug] = p;
    return acc;
  },
  {} as Record<string, PropertyPage>,
);
