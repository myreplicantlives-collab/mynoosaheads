import type { Metadata } from "next";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { ImageTile } from "@/components/ImageTile";

/**
 * /things-to-do — MSN-2973 rebuild (Albert D3).
 *
 * Nine categories, image-led, click-out to detail pages. No
 * encyclopedic body, no "the long version" sections, no weak
 * filler heading. Three short anchor sections sit at the
 * bottom for the cards that link to in-page anchors (#eat-and-drink,
 * #hinterland, #bookable) — each ≤60 words.
 *
 * Attribution stripped from the rendered HTML per MSN-2973 directive.
 * The photographer credit appears only on the underlying image inside
 * ImageTile when `hideAttribution=false`. Here we pass
 * `hideAttribution` to remove it.
 */

export const metadata: Metadata = {
  title: "Things to do in Noosa",
  description:
    "Nine ways to spend your days in Noosa — coast, river, hinterland, markets, makers and the boutique strip.",
  alternates: { canonical: "/things-to-do" },
  openGraph: {
    title: "Things to do in Noosa · MyNoosaHeads",
    description:
      "Nine ways to spend your days in Noosa — coast, river, hinterland, markets, makers and the boutique strip.",
    url: "/things-to-do",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Things to do in Noosa · MyNoosaHeads",
    description: "Nine ways to spend your days in Noosa.",
  },
};

type CategoryCard = {
  key: string;
  title: string;
  body: string;
  href: string;
  /** Image source for the tile. */
  image: {
    url: string;
    caption: string;
    author: string;
    licence: string;
    commonsPage: string;
  };
  dataTrack: string;
};

// Image sources — reuse the verified Wikimedia Commons set in
// `src/data/photos.ts` (we hand-pick here for the 8-card grid so the
// URL won't break if photos.ts is reorganised in a future sprint).
const CATEGORIES: CategoryCard[] = [
  {
    key: "headlandWalk",
    title: "Walk the Noosa headland",
    body: "Granite, tallowwoods, koalas overhead.",
    href: "/noosa-national-park",
    image: {
      caption: "The Noosa headland coastal walk — granite boulders, tallowwood forest, the surf below.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Noosa_Heads_and_Weyba_Creek.JPG/1280px-Noosa_Heads_and_Weyba_Creek.JPG",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_and_Weyba_Creek.JPG",
    },
    dataTrack: "ttd_card_headland",
  },
  {
    key: "riverDay",
    title: "Spend a day on the river",
    body: "Calm water, river ferries, sunset on Gympie Terrace.",
    href: "/boats-and-watercraft",
    image: {
      caption: "The Noosa River at Noosaville — kayak and paddleboard water.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Noosa_River_bank_at_Noosaville%2C_Queensland%2C_2024.jpg/1280px-Noosa_River_bank_at_Noosaville%2C_Queensland%2C_2024.jpg",
      author: "Chris Olszewski",
      licence: "CC BY-SA 4.0",
      commonsPage:
        "https://commons.wikimedia.org/wiki/File:Noosa_River_bank_at_Noosaville,_Queensland,_2024.jpg",
    },
    dataTrack: "ttd_card_river",
  },
  {
    key: "learnToSurf",
    title: "Learn to surf",
    body: "First lessons at Main Beach; the points when the swell wraps in.",
    href: "/surf-and-weather",
    image: {
      caption: "Early-morning paddle-out at Noosa Main Beach — the calm-water option when the swell is up.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Noosa_Heads_beach_on_Christmas_Day_2015_04.jpeg/1280px-Noosa_Heads_beach_on_Christmas_Day_2015_04.jpeg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage:
        "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_04.jpeg",
    },
    dataTrack: "ttd_card_surf",
  },
  {
    key: "perfectBeach",
    title: "Find the perfect beach",
    body: "Eight patrolled beaches, headland to Peregian.",
    href: "/noosa-national-park",
    image: {
      caption: "Noosa Main Beach at midday — the patrolled swimming beach at the bottom of Hastings Street.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Noosa_Heads_beach_on_Christmas_Day_2015_03.jpeg/1280px-Noosa_Heads_beach_on_Christmas_Day_2015_03.jpeg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage:
        "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_03.jpeg",
    },
    dataTrack: "ttd_card_beach",
  },
  {
    key: "eatAndDrink",
    title: "Eat your way along Hastings Street",
    body: "Cafés, restaurants, the surf club for a long lunch.",
    href: "/things-to-do#eat-and-drink",
    image: {
      caption: "A Hastings Street café table — latte and the headland beyond.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Aromas_Latte_art%2C_Noosa_Heads%2C_Queensland.jpg/1280px-Aromas_Latte_art%2C_Noosa_Heads%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage:
        "https://commons.wikimedia.org/wiki/File:Aromas_Latte_art,_Noosa_Heads,_Queensland.jpg",
    },
    dataTrack: "ttd_card_eat",
  },
  {
    key: "withChildren",
    title: "Discover Noosa with children",
    body: "Patrolled swimming, ferry rides, slow river days.",
    href: "/noosa-national-park",
    image: {
      caption: "Children learning to surf in the shallows at First Bay.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Children_learning_surfing_at_Noosa_Heads_beach%2C_Queensland.jpg/1280px-Children_learning_surfing_at_Noosa_Heads_beach%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage:
        "https://commons.wikimedia.org/wiki/File:Children_learning_surfing_at_Noosa_Heads_beach,_Queensland.jpg",
    },
    dataTrack: "ttd_card_kids",
  },
  {
    key: "hinterland",
    title: "Escape into the hinterland",
    body: "Thirty minutes up the range, a different temperature.",
    href: "/things-to-do#hinterland",
    image: {
      caption: "A camper on the Coast — the road-trip mode into the Noosa Hinterland.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Camper_Wohnmobil_Australien_%2823979876582%29.jpg/1280px-Camper_Wohnmobil_Australien_%2823979876582%29.jpg",
      author: "Kgbo",
      licence: "CC BY 2.0",
      commonsPage:
        "https://commons.wikimedia.org/wiki/File:Camper_Wohnmobil_Australien_(23979876582).jpg",
    },
    dataTrack: "ttd_card_hinterland",
  },
  {
    key: "bookable",
    title: "Book a cruise, tour or wellness experience",
    body: "River cruises, Hinterland tours, day spas on Hastings.",
    href: "/things-to-do#bookable",
    image: {
      caption: "Stand-up paddleboarder in the bay — the hire-watercraft most visitors start with.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Man_with_stand_up_board_at_Noosa_Heads_beach%2C_Queensland.jpg/1280px-Man_with_stand_up_board_at_Noosa_Heads_beach%2C_Queensland.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage:
        "https://commons.wikimedia.org/wiki/File:Man_with_stand_up_board_at_Noosa_Heads_beach,_Queensland.jpg",
    },
    dataTrack: "ttd_card_bookable",
  },
  // MSN-2974 — ninth card. Shop Noosa — boutiques, markets, makers.
  // Per Tim's directive: NO new homepage tile, NO new primary nav item.
  // Page lives at /shopping, reached from this card. Image is the
  // existing verified Noosa Farmers Market photo (Wikimedia Commons).
  {
    key: "shopNoosa",
    title: "Shop Noosa",
    body: "Boutiques, markets and makers from Hastings Street to the hinterland villages.",
    href: "/shopping",
    image: {
      caption: "Noosa Farmers Market — Sunday morning at the Noosaville showgrounds.",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Noosa_farmers_market.jpg/1280px-Noosa_farmers_market.jpg",
      author: "Kgbo",
      licence: "CC BY-SA 4.0",
      commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_farmers_market.jpg",
    },
    dataTrack: "ttd_card_shopping",
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
        "Nine ways to spend your days in Noosa.",
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
          <p className="eyebrow">Eight days</p>
          <h1 className="mt-3 font-display text-display-xl md:text-display-xl text-ink-900 text-balance max-w-4xl">
            Things to do in Noosa.
          </h1>
          <p className="mt-5 lead max-w-3xl text-pretty">
            Nine categories across coast, river, hinterland and the
            boutique strip. Pick a card.
          </p>
        </div>
      </section>

      {/* ─── 2. Nine categories (3×3 desktop, 2×4 tablet, 1×9 mobile) ─── */}
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
              hideAttribution
            />
          ))}
        </div>
      </section>

      {/* ─── 3. Anchor sections (≤60 words each, per Albert D3) ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="ttd-anchors-heading"
      >
        <div className="container-page py-14 md:py-20">
          <h2
            id="ttd-anchors-heading"
            className="font-display text-display-md text-ink-900 text-balance"
          >
            Read on.
          </h2>

          <div className="mt-8 grid gap-10 lg:grid-cols-3">
            <article id="eat-and-drink">
              <h3 className="font-display text-headline-lg text-ink-900">
                Eat & drink
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                Hastings Street runs from the surf club to the headland —
                cafés for breakfast (walk-in), restaurants for dinner
                (book ahead in summer). Across the river, Gympie Terrace
                is the foreshore dinner strip. The Sunday Noosa
                Farmers Market is the regional food event.
              </p>
            </article>

            <article id="hinterland">
              <h3 className="font-display text-headline-lg text-ink-900">
                Hinterland
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                Pomona, Cooran, Kin Kin, Cooroy — twenty-five to thirty
                minutes up the range, cooler and quieter than the coast.
                Mount Cooroora at Pomona is the closest
                bushwalk-with-a-view (seasonal — check QPWS). Australia
                Zoo at Beerwah is roughly an hour.
              </p>
            </article>

            <article id="bookable">
              <h3 className="font-display text-headline-lg text-ink-900">
                Bookable experiences
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                Surf lessons at Main Beach and Sunshine Beach; kayak and
                paddleboard hire on the Noosa River; Hinterland tours to
                the Glass House Mountains and Australia Zoo; guided walks
                through the coastal track. Operators are linked from
                the directory; commercial relationships are disclosed
                before you click.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ─── 4. Footer line ─── */}
      <section className="bg-paper-50">
        <div className="container-page py-10 md:py-12 text-center">
          <p className="text-body-sm text-ink-600 max-w-2xl mx-auto">
            Every recommendation on this site links to a public source.
          </p>
        </div>
      </section>
    </div>
  );
}
