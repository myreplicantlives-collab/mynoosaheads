import type { Metadata } from "next";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { CATEGORY_CARD_PHOTOS } from "@/data/photos";
import { ImageTile } from "@/components/ImageTile";

export const metadata: Metadata = {
  title: "Things to do in Noosa",
  description:
    "Twelve ways to spend your days in Noosa — best beaches, river adventures, walks, markets and a 3-day, 5-day, 7-day itinerary.",
  alternates: { canonical: "/things-to-do" },
  openGraph: {
    title: "Things to do in Noosa · MyNoosaHeads",
    description:
      "Twelve ways to spend your days in Noosa — best beaches, river adventures, walks, markets and a 3-day, 5-day, 7-day itinerary.",
    url: "/things-to-do",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Things to do in Noosa · MyNoosaHeads",
    description:
      "Twelve ways to spend your days in Noosa — best beaches, river adventures, walks, markets and a 3-day, 5-day, 7-day itinerary.",
  },
};

/**
 * /things-to-do — MSN-2972 IA rebuild (visitor-led, Albert D2).
 *
 * Structure (per D2 §"Page Structure"):
 *   1. Hero — eyebrow, headline, ≤30-word subhead
 *   2. Category grid — 12 image-led cards, 3×4 desktop, 2×6 tablet, 1×12
 *      mobile
 *   3. Anchor sections (food-and-drink, surfing, families, wellness,
 *      markets, day-trips, rainy-day, bookable, itineraries) —
 *      single-paragraph editorial bodies that the tile-level anchor
 *      links drop the visitor into. Visitor can act on the card and
 *      scroll for more context in the same page.
 *   4. Footer line — "Every recommendation on this site links to a
 *      public source."
 *
 * Body copy: each card has exactly 1 sentence. Each anchor section
 * has 1–2 short paragraphs. No encyclopedic body, no methodology,
 * no unverified business names.
 */

type CategoryCard = {
  key: string;
  title: string;
  body: string;
  href: string;
  image: (typeof CATEGORY_CARD_PHOTOS)[keyof typeof CATEGORY_CARD_PHOTOS];
  dataTrack: string;
};

const CATEGORIES: CategoryCard[] = [
  {
    key: "bestBeaches",
    title: "Best beaches",
    body: "Eight patrolled beaches along the coast — Main Beach, Sunshine Beach, Peregian and the smaller coves between.",
    href: "/noosa-national-park",
    image: CATEGORY_CARD_PHOTOS.bestBeaches,
    dataTrack: "ttd_card_best_beaches",
  },
  {
    key: "walksAndNature",
    title: "Walks and nature",
    body: "The coastal walk from Noosa Heads to Alexandria Bay is the headline; the hinterland tracks are the secret.",
    href: "/noosa-national-park",
    image: CATEGORY_CARD_PHOTOS.walksAndNature,
    dataTrack: "ttd_card_walks",
  },
  {
    key: "riverAdventures",
    title: "River adventures",
    body: "Kayak, paddleboard or boat the Noosa River — the calm water and the bar mouth at Hells Gates.",
    href: "/boats-and-watercraft",
    image: CATEGORY_CARD_PHOTOS.riverAdventures,
    dataTrack: "ttd_card_river",
  },
  {
    key: "foodAndDrink",
    title: "Food and drink",
    body: "Hastings Street restaurants, Noosaville riverfront cafés, Saturday markets and sunset bars.",
    href: "/things-to-do#food-and-drink",
    image: CATEGORY_CARD_PHOTOS.foodAndDrink,
    dataTrack: "ttd_card_food",
  },
  {
    key: "surfingAndWaterSports",
    title: "Surfing and water sports",
    body: "Main Beach for beginners; Sunshine Beach and the points for experienced surfers; learn to surf with local operators.",
    href: "/things-to-do#surfing",
    image: CATEGORY_CARD_PHOTOS.surfingAndWaterSports,
    dataTrack: "ttd_card_surfing",
  },
  {
    key: "familyActivities",
    title: "Family activities",
    body: "Patrolled swimming, the ferry, river cruising, ice cream at the surf club and the aquarium at Mooloolaba.",
    href: "/things-to-do#families",
    image: CATEGORY_CARD_PHOTOS.familyActivities,
    dataTrack: "ttd_card_families",
  },
  {
    key: "wellnessAndRelaxation",
    title: "Wellness and relaxation",
    body: "Day spas on Hastings Street, the Eumundi markets for slow wandering, the hinterland for quiet.",
    href: "/things-to-do#wellness",
    image: CATEGORY_CARD_PHOTOS.wellnessAndRelaxation,
    dataTrack: "ttd_card_wellness",
  },
  {
    key: "marketsAndShopping",
    title: "Markets and shopping",
    body: "Eumundi Wednesday and Saturday, Noosa Farmers Market Sunday, Hastings Street boutiques.",
    href: "/things-to-do#markets",
    image: CATEGORY_CARD_PHOTOS.marketsAndShopping,
    dataTrack: "ttd_card_markets",
  },
  {
    key: "dayTrips",
    title: "Day trips",
    body: "The Hinterland — Pomona, Cooran, Kin Kin — is thirty minutes up the range and a different temperature. Australia Zoo and the Glass House Mountains are within an hour.",
    href: "/things-to-do#day-trips",
    image: CATEGORY_CARD_PHOTOS.dayTrips,
    dataTrack: "ttd_card_day_trips",
  },
  {
    key: "rainyDay",
    title: "Rainy-day activities",
    body: "Galleries on Hastings Street, the Noosa Regional Gallery, the surf club bistro, a long lunch at a riverfront restaurant.",
    href: "/things-to-do#rainy-day",
    image: CATEGORY_CARD_PHOTOS.rainyDay,
    dataTrack: "ttd_card_rainy",
  },
  {
    key: "bookableExperiences",
    title: "Bookable experiences",
    body: "Surf lessons, river cruises, Hinterland tours and national park guided walks — bookable with local operators.",
    href: "/things-to-do#bookable",
    image: CATEGORY_CARD_PHOTOS.bookableExperiences,
    dataTrack: "ttd_card_bookable",
  },
  {
    key: "itineraries",
    title: "Suggested itineraries",
    body: "Three-day, five-day and seven-day plans — first-time visitor, family, active, relaxed.",
    href: "/things-to-do#itineraries",
    image: CATEGORY_CARD_PHOTOS.itineraries,
    dataTrack: "ttd_card_itineraries",
  },
];

export default function ThingsToDoPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "@id": `${SITE.productionUrl}/things-to-do#destination`,
      name: "Noosa Heads",
      description:
        "Twelve ways to spend your days in Noosa — beaches, river, hinterland and a three-day, five-day or seven-day itinerary.",
      url: `${SITE.productionUrl}/things-to-do`,
      touristType: ["Family", "Couple", "Solo", "Group", "Active"],
      address: {
        "@type": "PostalAddress",
        addressRegion: "Queensland",
        addressCountry: "AU",
        addressLocality: "Noosa Heads",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: SITE.brand,
          item: SITE.productionUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Things to do",
          item: `${SITE.productionUrl}/things-to-do`,
        },
      ],
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* ─── 1. Hero ─── */}
      <section className="border-b border-paper-200 bg-paper-50">
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Twelve ways to spend your days</p>
          <h1 className="mt-3 font-display text-display-xl md:text-display-xl text-ink-900 text-balance max-w-4xl">
            Things to do in Noosa
          </h1>
          <p className="mt-5 lead max-w-3xl text-pretty">
            Twelve ways to spend your days — from the headline coastal walk
            to a quiet Saturday market.
          </p>
        </div>
      </section>

      {/* ─── 2. Category grid ─── */}
      <section
        className="container-page py-12 md:py-16"
        aria-labelledby="ttd-grid-heading"
      >
        <h2 id="ttd-grid-heading" className="sr-only">
          Categories
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <ImageTile
              key={c.key}
              href={c.href}
              title={c.title}
              body={c.body}
              image={c.image}
              dataTrack={c.dataTrack}
            />
          ))}
        </div>
      </section>

      {/* ─── 3. Anchor sections ───
       * Visitor can scroll into the same page for additional context on
       * the categories that anchor here (food-and-drink, surfing, etc.).
       * Each section is a single short paragraph — no encyclopedic
       * body, no methodology, no unverified business names. */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="ttd-context-heading"
      >
        <div className="container-page py-14 md:py-20">
          <h2
            id="ttd-context-heading"
            className="font-display text-display-md text-ink-900 text-balance"
          >
            A little more context
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <article id="food-and-drink">
              <h3 className="font-display text-headline-lg text-ink-900">
                Food and drink — the long version
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                Hastings Street runs from the surf club up to the headland
                and is the densest café-and-restaurant strip in Noosa. Most
                cafés are walk-in for breakfast and lunch; dinner
                reservations are recommended in peak season. Across the
                river, Noosaville&apos;s Gympie Terrace is a long row of
                foreshore restaurants — the practical choice for a longer
                stay, with self-contained apartments and kitchens for the
                nights you eat in. The Saturday Noosa Farmers Market and
                the Wednesday/Saturday Eumundi markets are the regional
                food events.
              </p>
            </article>

            <article id="surfing">
              <h3 className="font-display text-headline-lg text-ink-900">
                Surfing — the long version
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                Main Beach is the patrolled beginner beach at the bottom of
                Hastings Street — longboard-friendly on smaller days. The
                points south of the headland (First Bay, Granite Bay, Little
                Cove) are the experienced shortboard breaks; the points
                light up when the south-east swell wraps in under 1.5 m.
                Sunshine Beach is the next patrolled beach south, two
                minutes&apos; drive from Hastings Street. Surf schools
                operate out of Main Beach and Sunshine Beach year-round.
              </p>
            </article>

            <article id="families">
              <h3 className="font-display text-headline-lg text-ink-900">
                Families — the long version
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                Patrolled swimming, the free ferry between Hastings Street
                and Noosaville, and the river foreshore make Noosa workable
                with kids of any age. The Aquarium at Mooloolaba is a
                40-minute drive south; Australia Zoo at Beerwah is roughly
                an hour. The Noosa North Shore surf beach is closed to
                swimming — but the river is calm and safe for paddling. The
                surf clubs run Nippers programs in summer for under-14s.
              </p>
            </article>

            <article id="wellness">
              <h3 className="font-display text-headline-lg text-ink-900">
                Wellness — the long version
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                Hastings Street has the day-spa cluster — full-service
                spas inside the larger resorts, plus independent boutiques.
                The hinterland is the quieter wellness option: a Pomona
                main-street coffee, a Cooran pub lunch, a slow walk at the
                Noosa Botanic Gardens on Lake Macdonald (40 minutes&apos;
                drive). Eumundi is Wednesday and Saturday — the
                regional wandering-and-people-watching market.
              </p>
            </article>

            <article id="markets">
              <h3 className="font-display text-headline-lg text-ink-900">
                Markets — the long version
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                Three markets anchor the Noosa region. The Noosa Farmers
                Market runs on Sunday mornings at the Noosaville
                showgrounds. The Eumundi Markets run on Wednesday and
                Saturday — the largest artisan market on the Sunshine
                Coast. Hastings Street carries the boutique-and-homewares
                shopping year-round. Tewantin has a smaller Saturday market
                along the foreshore.
              </p>
            </article>

            <article id="day-trips">
              <h3 className="font-display text-headline-lg text-ink-900">
                Day trips — the long version
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                The Noosa Hinterland is the closest day-trip: Pomona,
                Cooran and Kin Kin are 25–30 minutes up the range and
                noticeably cooler than the coast. Mount Cooroora at Pomona
                is the closest bushwalk-with-a-view (seasonal — check QPWS
                before you go). Australia Zoo at Beerwah is roughly an
                hour. The Glass House Mountains are 50 minutes south — a
                different landscape and a different climate.
              </p>
            </article>

            <article id="rainy-day">
              <h3 className="font-display text-headline-lg text-ink-900">
                Rainy days — the long version
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                Noosa&apos;s rainy days are usually short. The Noosa
                Regional Gallery is on Riverside Road, Noosaville —
                free entry. The surf club bistros (Hastings Street and
                Sunshine Beach) are walk-in for a long lunch. Hastings
                Street cafés and bookshops are the rest of the day. The
                Noosa Ferry still runs in rain, and the river is at its
                most atmospheric under overcast.
              </p>
            </article>

            <article id="bookable">
              <h3 className="font-display text-headline-lg text-ink-900">
                Bookable experiences — the long version
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                Surf lessons (Main Beach and Sunshine Beach), kayak hire on
                the Noosa River, Hinterland tours to the Glass House
                Mountains and Australia Zoo, and guided walks through the
                Noosa National Park coastal track. Operators are listed
                with the standard affiliate disclosure where a commercial
                relationship exists; where no commercial relationship is
                verified, the link goes without the badge.
              </p>
            </article>
          </div>

          <article id="itineraries" className="mt-14 pt-10 border-t border-paper-200">
            <h3 className="font-display text-display-sm text-ink-900 text-balance">
              Suggested itineraries
            </h3>
            <p className="mt-3 text-body-md text-ink-800 max-w-3xl text-pretty">
              Three-day plan for first-time visitors (Hastings Street base),
              five-day family plan (Noosaville base), seven-day active plan
              (Sunshine Beach base) and a five-day relaxed plan (Peregian
              base). The full copy of each plan lives on the{" "}
              <a href="/accommodation" className="link text-ocean-700">
                accommodation page
              </a>{" "}
              alongside the area selector — pick the area that fits the
              plan, then pick the property.
            </p>
          </article>
        </div>
      </section>

      {/* ─── 4. Footer line ─── */}
      <section className="bg-paper-50">
        <div className="container-page py-10 md:py-12 text-center">
          <p className="text-body-sm text-ink-600 max-w-2xl mx-auto">
            Every recommendation on this site links to a public source. See
            the footer for the full statement.
          </p>
        </div>
      </section>
    </div>
  );
}
