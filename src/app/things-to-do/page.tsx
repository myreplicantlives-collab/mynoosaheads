import type { Metadata } from "next";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { ImageTile } from "@/components/ImageTile";
import { CATEGORY_CARD_PHOTOS } from "@/data/photos-msn2982";

/**
 * /things-to-do — MSN-2982 chairman-mandated full rework.
 *
 * KUBE progression: hero → atmospheric intro → image-led grid → brief
 * themes → footer. Word budget: chairman did not specify a hard limit
 * here, but KUBE restraint applies (no new sections, no Wikipedia).
 *
 * Photography: every card uses the MSN-2982 verified photo set.
 * No Flickr hotlinks, no generic Unsplash placeholders.
 */

export const metadata: Metadata = {
  title: "Things to do in Noosa",
  description:
    "Coast, river, hinterland and the boutique strip. The verified set of things to do in Noosa.",
  alternates: { canonical: "/things-to-do" },
};

type CategoryCard = {
  key: string;
  title: string;
  /** Sub-15-word KUBE-style label-only body for the card (chairman mandate #9: <18 words). */
  body: string;
  href: string;
  image: {
    path: string;
    caption: string;
  };
  dataTrack: string;
};

const CATEGORIES: CategoryCard[] = [
  {
    key: "headlandWalk",
    title: "Walk the Noosa headland",
    body: "Granite, tallowwoods, koalas overhead.",
    href: "/noosa-national-park",
    image: {
      path: CATEGORY_CARD_PHOTOS.walksAndNature.path,
      caption: CATEGORY_CARD_PHOTOS.walksAndNature.caption,
    },
    dataTrack: "ttd_card_headland",
  },
  {
    key: "riverDay",
    title: "Spend a day on the river",
    body: "Calm water, ferry rides, sunset on Gympie Terrace.",
    href: "/things-to-do/spend-a-day-on-the-river",
    image: {
      path: CATEGORY_CARD_PHOTOS.riverAdventures.path,
      caption: CATEGORY_CARD_PHOTOS.riverAdventures.caption,
    },
    dataTrack: "ttd_card_river",
  },
  {
    key: "learnToSurf",
    title: "Learn to surf",
    body: "First lesson at Main Beach, the points when the swell wraps.",
    href: "/things-to-do/learn-to-surf",
    image: {
      path: CATEGORY_CARD_PHOTOS.surfingAndWaterSports.path,
      caption: CATEGORY_CARD_PHOTOS.surfingAndWaterSports.caption,
    },
    dataTrack: "ttd_card_surf",
  },
  {
    key: "perfectBeach",
    title: "Find the perfect beach",
    body: "Eight patrolled beaches, headland to Peregian.",
    href: "/noosa-national-park",
    image: {
      path: CATEGORY_CARD_PHOTOS.bestBeaches.path,
      caption: CATEGORY_CARD_PHOTOS.bestBeaches.caption,
    },
    dataTrack: "ttd_card_beach",
  },
  {
    key: "eatAndDrink",
    title: "Eat along Hastings Street",
    body: "Cafés for breakfast, restaurants for dinner.",
    href: "/eat-and-drink",
    image: {
      path: CATEGORY_CARD_PHOTOS.foodAndDrink.path,
      caption: CATEGORY_CARD_PHOTOS.foodAndDrink.caption,
    },
    dataTrack: "ttd_card_eat",
  },
  {
    key: "withChildren",
    title: "Discover Noosa with children",
    body: "Patrolled swimming, ferry rides, slow river days.",
    href: "/things-to-do/noosa-with-children",
    image: {
      path: CATEGORY_CARD_PHOTOS.familyActivities.path,
      caption: CATEGORY_CARD_PHOTOS.familyActivities.caption,
    },
    dataTrack: "ttd_card_kids",
  },
  {
    key: "hinterland",
    title: "Escape into the hinterland",
    body: "Thirty minutes up the range, a different temperature.",
    href: "/things-to-do/hinterland-day-trip",
    image: {
      path: CATEGORY_CARD_PHOTOS.dayTrips.path,
      caption: CATEGORY_CARD_PHOTOS.dayTrips.caption,
    },
    dataTrack: "ttd_card_hinterland",
  },
  {
    key: "wellness",
    title: "Swim the Fairy Pools",
    body: "Coastal rock pools on the Noosa shoreline.",
    href: "/things-to-do/fairy-pools",
    image: {
      path: CATEGORY_CARD_PHOTOS.wellnessAndRelaxation.path,
      caption: CATEGORY_CARD_PHOTOS.wellnessAndRelaxation.caption,
    },
    dataTrack: "ttd_card_wellness",
  },
  {
    key: "markets",
    title: "Wander the farmers market",
    body: "Sunday morning on the Noosaville showgrounds.",
    href: "/shopping",
    image: {
      path: CATEGORY_CARD_PHOTOS.marketsAndShopping.path,
      caption: CATEGORY_CARD_PHOTOS.marketsAndShopping.caption,
    },
    dataTrack: "ttd_card_markets",
  },
  {
    key: "itineraries",
    title: "Plan your first day",
    body: "Headland walk at sunrise, river at sunset.",
    href: "/things-to-do/first-day-itinerary",
    image: {
      path: CATEGORY_CARD_PHOTOS.itineraries.path,
      caption: CATEGORY_CARD_PHOTOS.itineraries.caption,
    },
    dataTrack: "ttd_card_itineraries",
  },
];

export default function ThingsToDoPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "@id": `${SITE.productionUrl}/things-to-do#destination`,
      name: "Things to do in Noosa",
      description:
        "The verified set of things to do in Noosa — coast, river, hinterland.",
      url: `${SITE.productionUrl}/things-to-do`,
      touristType: ["Family", "Couple", "Solo", "Group"],
      address: {
        "@type": "PostalAddress",
        addressRegion: "Queensland",
        addressCountry: "AU",
        addressLocality: "Noosa Heads",
      },
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* ─── 1. Hero — Noosa River at Noosaville (verified) ─── */}
      <section
        aria-label="Things to do in Noosa"
        className="relative w-full overflow-hidden bg-ink-900 h-[80vh] min-h-[560px] max-h-[1000px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/heroes/noosa-river-1920w.jpg"
          alt="The Noosa River at Noosaville — kayak and paddleboard water."
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-900/15 via-transparent to-ink-900/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent"
          aria-hidden="true"
        />
        <div className="relative h-full w-full">
          <div className="container-page h-full flex flex-col justify-end pb-16 md:pb-24">
            <p className="eyebrow text-paper-300">DO</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              Things to do in Noosa.
            </h1>
            <p className="mt-4 lead text-paper-200 max-w-3xl text-pretty">
              River, surf, walk, hinterland — verified by the photo.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. Atmospheric intro ─── */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="ttd-intro-heading"
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Ten ways to spend your day</p>
          <h2
            id="ttd-intro-heading"
            className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl"
          >
            Each card opens a deep page with the practical detail.
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            Pick what fits the morning. The headland at sunrise, the river
            when the sea breeze picks up, the surf at low tide.
          </p>
        </div>
      </section>

      {/* ─── 3. Image-led card grid (verified photos only) ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="ttd-grid-heading"
      >
        <h2 id="ttd-grid-heading" className="sr-only">
          Things to do — image grid
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
              hideAttribution
            />
          ))}
        </div>
      </section>

      {/* ─── 4. Trust / footer ─── */}
      <section className="bg-paper-50 border-t border-paper-200" aria-labelledby="ttd-trust">
        <div className="container-page py-10 md:py-14 text-center">
          <p id="ttd-trust" className="text-body-sm text-ink-600 max-w-2xl mx-auto">
            Live conditions and Queensland Parks alerts linked from each deep page.
          </p>
        </div>
      </section>
    </div>
  );
}
