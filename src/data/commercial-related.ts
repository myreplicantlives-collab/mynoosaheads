/**
 * Related recommendations — shared across commercial-cluster pages.
 *
 * Each commercial page renders a small set of related guides at the
 * bottom. The lists are pre-curated so the editorial team controls
 * cross-linking and the cards stay coherent.
 */

import type { RelatedRecommendation } from "@/components/commercial";

/** Accommodation cluster shared related-list. */
export const ACCOMM_HUB_RELATED: RelatedRecommendation[] = [
  {
    label: "Hastings Street accommodation",
    href: "/accommodation/hastings-street",
    pitch: "Walk to Main Beach. The walkable one.",
    category: "STAY",
  },
  {
    label: "Noosaville accommodation",
    href: "/accommodation/noosaville",
    pitch: "Gympie Terrace and the river. The ferry one.",
    category: "STAY",
  },
  {
    label: "Sunshine Beach accommodation",
    href: "/accommodation/sunshine-beach",
    pitch: "Patrolled surf south of the headland.",
    category: "STAY",
  },
  {
    label: "Peregian Beach accommodation",
    href: "/accommodation/peregian-beach",
    pitch: "Village-square, holiday houses, dogs welcome.",
    category: "STAY",
  },
];

export const ACCOMM_AREA_RELATED: RelatedRecommendation[] = [
  ...ACCOMM_HUB_RELATED,
  {
    label: "Where to stay in Noosa without a car",
    href: "/accommodation/without-a-car",
    pitch: "Walkable + ferry-served options.",
    category: "STAY",
  },
  {
    label: "Hastings versus Noosaville",
    href: "/accommodation/hastings-vs-noosaville",
    pitch: "Side-by-side area decision aid.",
    category: "STAY",
  },
];

export const ACCOMM_FAMILY_RELATED: RelatedRecommendation[] = [
  ...ACCOMM_AREA_RELATED,
  {
    label: "Noosa accommodation with pools",
    href: "/accommodation/with-pools",
    pitch: "Heated + lagoon + lap pools.",
    category: "STAY",
  },
  {
    label: "Noosa apartments",
    href: "/accommodation/apartments",
    pitch: "Self-catering apartments across the four precincts.",
    category: "STAY",
  },
];

/** Activity cluster shared related-list. */
export const ACTIVITY_HUB_RELATED: RelatedRecommendation[] = [
  {
    label: "Noosa surf lessons",
    href: "/things-to-do/surf-lessons",
    pitch: "Four operators at Main Beach.",
    category: "DO",
  },
  {
    label: "Noosa River cruises",
    href: "/things-to-do/river-cruises",
    pitch: "Public ferry, lunch cruise, sunset charters.",
    category: "DO",
  },
  {
    label: "Noosa Everglades tours",
    href: "/things-to-do/everglades-tours",
    pitch: "Upper-river cruise + kayak tours.",
    category: "DO",
  },
  {
    label: "Kayak and paddleboard hire",
    href: "/things-to-do/kayak-and-paddleboard-hire",
    pitch: "Walk-up hire on the Noosaville foreshore.",
    category: "DO",
  },
];

export const ACTIVITY_DEEP_RELATED: RelatedRecommendation[] = [
  ...ACTIVITY_HUB_RELATED,
  {
    label: "Surf & weather in Noosa",
    href: "/surf-and-weather",
    pitch: "Live BOM + Open-Meteo tiles.",
    category: "LIVE",
  },
  {
    label: "Brisbane Airport to Noosa",
    href: "/travel-and-transport/brisbane-airport-to-noosa",
    pitch: "Coach + private transfer options.",
    category: "PLAN",
  },
];
