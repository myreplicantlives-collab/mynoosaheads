import type { Metadata } from "next";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { ImageTile } from "@/components/ImageTile";

/**
 * /things-to-do — MSN-2980 KUBE rebuild.
 *
 * KUBE pattern (Albert D3 + KUBE Saint-Tropez study):
 *   1. Hero — full-bleed photo (the Noosa River at Noosaville),
 *      eyebrow "DO", h1 "Things to do in Noosa", single sentence deck.
 *      Nav overlays in white on hero.
 *   2. Filter chips — "All / On the water / On the land / Learn something"
 *      (KUBE pattern). URL updates with ?filter=.
 *   3. Image-led experience grid (KUBE pattern: image + label only —
 *      body copy lives on the deep pages).
 *   4. Three themes — 3 short paragraphs (one per theme).
 *   5. Footer + sticky CTA.
 *
 * Word count target: ≤300 visitor-facing primary content (Albert cut: 271).
 */

export const metadata: Metadata = {
  title: "Things to do in Noosa",
  description:
    "Coast, river, hinterland and the boutique strip. Nine ways to spend your days in Noosa.",
  alternates: { canonical: "/things-to-do" },
  openGraph: {
    title: "Things to do in Noosa · MyNoosaHeads",
    description:
      "Coast, river, hinterland and the boutique strip. Nine ways to spend your days in Noosa.",
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
  /** Sub-15-word KUBE-style label-only body for the card. */
  body: string;
  href: string;
  image: {
    url: string;
    caption: string;
    author: string;
    licence: string;
    sourcePage: string;
  };
  dataTrack: string;
  filter: "on-the-water" | "on-the-land" | "learn-something";
};

// KUBE atmospheric hooks — image + label only. Per MSN-2980 chairman
// mandate: NO Wikimedia Commons URLs. Every photo is Flickr (Openverse)
// or Unsplash CDN.
const CATEGORIES: CategoryCard[] = [
  {
    key: "headlandWalk",
    title: "Walk the Noosa headland",
    body: "Granite, tallowwoods, koalas overhead.",
    href: "/noosa-national-park",
    filter: "on-the-land",
    image: {
      caption: "The Noosa headland coastal walk — granite boulders, tallowwood forest, the surf below.",
      url: "https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg",
      author: "Flickr (Openverse) — 'Noosa National Park Granite Bay'",
      licence: "CC BY",
      sourcePage: "https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg",
    },
    dataTrack: "ttd_card_headland",
  },
  {
    key: "riverDay",
    title: "Spend a day on the river",
    body: "Calm water, ferry rides, sunset on Gympie Terrace.",
    href: "/boats-and-watercraft",
    filter: "on-the-water",
    image: {
      caption: "The Noosa River at Noosaville — kayak and paddleboard water.",
      url: "https://live.staticflickr.com/8330/8146977124_491b4d5696.jpg",
      author: "Flickr (Openverse) — 'Shiny afternoon'",
      licence: "CC BY-NC-SA",
      sourcePage: "https://live.staticflickr.com/8330/8146977124_491b4d5696.jpg",
    },
    dataTrack: "ttd_card_river",
  },
  {
    key: "learnToSurf",
    title: "Learn to surf",
    body: "First lessons at Main Beach, the points when the swell wraps.",
    href: "/surf-and-weather",
    filter: "learn-something",
    image: {
      caption: "Surfer riding a Noosa wave at sunrise.",
      url: "https://live.staticflickr.com/8029/8052945119_e3f2edce31_b.jpg",
      author: "Flickr (Openverse) — 'I roar for my supper'",
      licence: "CC BY-NC",
      sourcePage: "https://live.staticflickr.com/8029/8052945119_e3f2edce31_b.jpg",
    },
    dataTrack: "ttd_card_surf",
  },
  {
    key: "perfectBeach",
    title: "Find the perfect beach",
    body: "Eight patrolled beaches, headland to Peregian.",
    href: "/noosa-national-park",
    filter: "on-the-land",
    image: {
      caption: "Noosa Main Beach at midday — the patrolled swimming beach at the bottom of Hastings Street.",
      url: "https://live.staticflickr.com/3664/3487547682_52b62b9b03_b.jpg",
      author: "Flickr (Openverse) — 'Noosa Main Beach Silhouette'",
      licence: "CC BY",
      sourcePage: "https://live.staticflickr.com/3664/3487547682_52b62b9b03_b.jpg",
    },
    dataTrack: "ttd_card_beach",
  },
  {
    key: "eatAndDrink",
    title: "Eat along Hastings Street",
    body: "Cafés for breakfast, restaurants for dinner.",
    href: "/shopping",
    filter: "learn-something",
    image: {
      caption: "People watching at Aroma, Hastings Street, Noosa.",
      url: "https://live.staticflickr.com/615/31910895645_d321ec9068_b.jpg",
      author: "Flickr (Openverse)",
      licence: "CC BY-NC",
      sourcePage: "https://live.staticflickr.com/615/31910895645_d321ec9068_b.jpg",
    },
    dataTrack: "ttd_card_eat",
  },
  {
    key: "withChildren",
    title: "Discover Noosa with children",
    body: "Patrolled swimming, ferry rides, slow river days.",
    href: "/noosa-national-park",
    filter: "on-the-land",
    image: {
      caption: "Generic outdoor activity — used for the family-activity card.",
      url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&q=80",
      author: "Unsplash CDN",
      licence: "CC0 (Unsplash)",
      sourcePage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
    },
    dataTrack: "ttd_card_kids",
  },
  {
    key: "hinterland",
    title: "Escape into the hinterland",
    body: "Thirty minutes up the range, a different temperature.",
    href: "/things-to-do#hinterland",
    filter: "on-the-land",
    image: {
      caption: "A quiet coastal road — the road-trip mode into the Noosa Hinterland.",
      url: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1600&q=80",
      author: "Unsplash CDN",
      licence: "CC0 (Unsplash)",
      sourcePage: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a",
    },
    dataTrack: "ttd_card_hinterland",
  },
  {
    key: "bookable",
    title: "Book a cruise, tour or wellness experience",
    body: "River cruises, Hinterland tours, day spas on Hastings.",
    href: "/things-to-do#bookable",
    filter: "on-the-water",
    image: {
      caption: "Stand-up paddleboard — the hire-watercraft most visitors start with.",
      url: "https://live.staticflickr.com/7101/13941478461_d01edfaa11_b.jpg",
      author: "Flickr (Openverse)",
      licence: "CC BY",
      sourcePage: "https://live.staticflickr.com/7101/13941478461_d01edfaa11_b.jpg",
    },
    dataTrack: "ttd_card_bookable",
  },
  {
    key: "shopNoosa",
    title: "Shop Noosa",
    body: "Boutiques, markets and makers from Hastings to the hinterland.",
    href: "/shopping",
    filter: "learn-something",
    image: {
      caption: "Noosa Farmers Market — Sunday morning on the Noosaville showgrounds.",
      url: "https://live.staticflickr.com/2301/2367573625_8f0fd5692b_b.jpg",
      author: "Flickr (Openverse) — 'Noosa Farmers Market'",
      licence: "CC BY-NC-SA",
      sourcePage: "https://live.staticflickr.com/2301/2367573625_8f0fd5692b_b.jpg",
    },
    dataTrack: "ttd_card_shopping",
  },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "on-the-water", label: "On the water" },
  { key: "on-the-land", label: "On the land" },
  { key: "learn-something", label: "Learn something" },
];

export default function ThingsToDoPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "@id": `${SITE.productionUrl}/things-to-do#destination`,
      name: "Noosa Heads",
      description: "Nine ways to spend your days in Noosa.",
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
        { "@type": "ListItem", position: 1, name: SITE.brand, item: SITE.productionUrl },
        { "@type": "ListItem", position: 2, name: "Things to do", item: `${SITE.productionUrl}/things-to-do` },
      ],
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* ─── 1. Hero — KUBE atmospheric ─── */}
      <section className="border-b border-paper-200 bg-paper-50">
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">DO</p>
          <h1 className="mt-3 font-display text-display-xl md:text-display-xl text-ink-900 text-balance max-w-4xl">
            Things to do in Noosa.
          </h1>
          <p className="mt-5 lead max-w-3xl text-pretty">
            Nine ways to spend your days across coast, river and hinterland.
          </p>
        </div>
      </section>

      {/* ─── 2. Filter chips (KUBE pattern) ─── */}
      <section
        className="border-b border-paper-200 bg-paper-100"
        aria-label="Filter categories"
      >
        <div className="container-page py-6 md:py-8">
          <div className="flex flex-wrap gap-2" role="tablist">
            {FILTERS.map((f, i) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={i === 0}
                className={`px-4 py-2 text-body-sm uppercase tracking-wider border ${
                  i === 0
                    ? "bg-ink-900 text-paper-50 border-ink-900"
                    : "bg-paper-50 text-ink-700 border-paper-300 hover:border-ink-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Nine image-led category tiles (KUBE pattern: image + label only) ─── */}
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

      {/* ─── 4. Three themes — short paragraphs ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="ttd-anchors-heading"
      >
        <div className="container-page py-14 md:py-20">
          <h2
            id="ttd-anchors-heading"
            className="font-display text-display-md text-ink-900 text-balance"
          >
            Three ways to spend it.
          </h2>

          <div className="mt-8 grid gap-10 lg:grid-cols-3">
            <article id="on-the-water">
              <h3 className="font-display text-headline-lg text-ink-900">
                On the water
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                The Noosa River is the calm-water side — ferries between
                Hastings Street and Noosaville, kayak and paddleboard hire
                from the foreshore. Out at the headland, the points
                break when the south-east swell wraps; learn to surf at
                Main Beach first, then move to First Bay and the points.
              </p>
            </article>

            <article id="on-the-land">
              <h3 className="font-display text-headline-lg text-ink-900">
                On the land
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                The Noosa headland coastal walk is the headline — granite
                boulders, tallowwood forest, the surf below. Eight
                patrolled beaches run from Main to Peregian. Inland,
                Pomona, Cooran and Kin Kin are thirty minutes up the
                range, cooler and quieter than the coast.
              </p>
            </article>

            <article id="learn-something">
              <h3 className="font-display text-headline-lg text-ink-900">
                Learn something
              </h3>
              <p className="mt-3 text-body-md text-ink-800 text-pretty">
                Surf lessons at Main Beach and Sunshine Beach, kayak
                and paddleboard hire on the Noosa River, Hinterland
                tours to the Glass House Mountains and Australia Zoo,
                guided walks through the coastal track. Operators are
                linked from the directory.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ─── 5. Footer line ─── */}
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
