import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArticleLd, BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/sources";

type Place = {
  slug: string;
  name: string;
  image: string;
  alt: string;
  blurb: string;
  intro: string;
  facts: { label: string; value: string }[];
  doList: string[];
  dontList: string[];
  sources: string[];
  jsonLd: "Place" | "TouristAttraction" | "Beach";
};

const PLACES: Place[] = [
  {
    slug: "main-beach",
    name: "Main Beach, Noosa Heads",
    image: "noosa_main_beach.jpg",
    alt: "Main Beach — a north-facing sheltered bay at the north end of Noosa Heads",
    blurb:
      "North-facing sheltered bay at the foot of Hastings Street. The car park fills by 8:30 on " +
      "summer weekends; arrive early or walk from Noosaville.",
    intro:
      "Main Beach is the photograph in every brochure. It is also the most useful beach in Noosa: " +
      "sheltered, year-round patrolled, walk-everywhere close. What the brochures skip is the " +
      "parking pressure, the lifeguard hours, and the easy alternative at Little Cove.",
    facts: [
      { label: "Orientation", value: "North-facing, sheltered" },
      { label: "Patrol", value: "Year-round (Noosa Heads SLSC)" },
      { label: "Best at", value: "Dawn, sunset, weekdays" },
      { label: "Walking distance", value: "Hastings Street 2 min, National Park 1 min" },
      { label: "Parking", value: "Small paid car park + Hastings Street metered (fills early)" },
    ],
    doList: [
      "Arrive before 8am on summer weekends.",
      "Walk from Noosaville via the ferry (30 min timetable).",
      "Swim between the red-and-yellow flags.",
      "Use the outdoor showers at the surf club to rinse off.",
    ],
    dontList: [
      "Don't expect to find a park after 9am on weekends in school holidays.",
      "Don't swim out past the flags — the patrolled area is set for a reason.",
      "Don't expect dinner on Hastings Street to be better than the breakfast — go to Noosaville.",
    ],
    sources: ["visit-noosa", "noosa-council"],
    jsonLd: "Beach",
  },
  {
    slug: "little-cove",
    name: "Little Cove",
    image: "noosa_little_cove.jpg",
    alt: "Little Cove — a small north-facing beach at the foot of the Noosa National Park headland",
    blurb:
      "Smaller than Main Beach, framed by the headland. Quieter. Walk from Hastings Street or " +
      "from Main Beach along the boardwalk.",
    intro:
      "Little Cove is what Main Beach would feel like with half the people. It is at the foot of " +
      "the headland, the entry point to the national park coastal walk, and a much quieter swim.",
    facts: [
      { label: "Orientation", value: "North-facing, sheltered" },
      { label: "Patrol", value: "Summer patrol; check flags" },
      { label: "Walking distance", value: "Hastings Street 5 min, Main Beach 5 min" },
      { label: "Parking", value: "No car park — Hastings Street or Main Beach" },
    ],
    doList: [
      "Walk the headland from Main Beach (10 min one-way) before swimming.",
      "Bring reef shoes — there are rocks at both ends.",
    ],
    dontList: [
      "Don't drive here — there is no car park.",
      "Don't swim out past the flags during summer patrol.",
    ],
    sources: ["visit-noosa"],
    jsonLd: "Beach",
  },
  {
    slug: "sunshine-beach",
    name: "Sunshine Beach",
    image: "noosa_sunshine_beach_town.jpg",
    alt: "Sunshine Beach — south-facing beach 4 km south of Noosa Heads",
    blurb:
      "South-facing, exposed, bigger swell. The village behind the dunes is the village most " +
      "people come to Noosa for and the brochures forget to mention.",
    intro:
      "Sunshine Beach is where locals go when Main Beach is full. It is a different character: " +
      "south swell, bigger surf, less strip, more village. The Sunshine Beach Surf Club at the " +
      "north end has good food and a sunset deck.",
    facts: [
      { label: "Orientation", value: "South-facing, exposed" },
      { label: "Patrol", value: "Year-round" },
      { label: "Best at", value: "Surf season (May–September), dawn" },
      { label: "Walking distance", value: "Sunshine Beach village 5 min" },
      { label: "Parking", value: "Village parking, easier than Hastings Street" },
    ],
    doList: [
      "Surf at the south end (more swell, less crowd).",
      "Walk south along the beach at low tide to Sunrise.",
      "Eat at the surf club bistro on the deck.",
    ],
    dontList: [
      "Don't expect protected swimming — the south swell is bigger.",
      "Don't park on the beach approach road — local tow-away zone.",
    ],
    sources: ["visit-noosa"],
    jsonLd: "Beach",
  },
  {
    slug: "noosaville",
    name: "Noosaville",
    image: "noosa_river_foreshore.jpg",
    alt: "Noosaville — the river-side town across the river from Noosa Heads",
    blurb:
      "The river, not the beach. Quieter streets, apartment-style accommodation, the ferry stops, " +
      "and the family parkland most locals actually use.",
    intro:
      "Noosaville is what Noosa would be if the brochures left out the famous strip. Gympie " +
      "Terrace runs along the river foreshore with a boardwalk, ferry stops, and the family park " +
      "that most visitors don't realise is there. The pelican feeding at 1:30pm is the genuine " +
      "article.",
    facts: [
      { label: "Where", value: "Across the river, west of Noosa Heads" },
      { label: "Ferry to Hastings Street", value: "Every 30 minutes" },
      { label: "Best for", value: "Families, self-caterers, longer stays" },
      { label: "Swimming", value: "Calm water, no surf; ideal for kids" },
    ],
    doList: [
      "Walk the river boardwalk (south from the ferry terminal).",
      "Catch the ferry to Hastings Street for the day.",
      "Take the kids to the playground on the foreshore.",
    ],
    dontList: [
      "Don't expect surf — this is the river.",
      "Don't feed the pelicans — fish and chips only on the boardwalk.",
    ],
    sources: ["translink", "noosa-ferry"],
    jsonLd: "Place",
  },
  {
    slug: "tewantin",
    name: "Tewantin",
    image: "noosa_tewantin.jpg",
    alt: "Tewantin — small town across the river from Noosa Heads and the ferry departure for Noosa North Shore",
    blurb:
      "The ferry departure point for the Noosa North Shore. Real pubs, the council chambers, the " +
      "Saturday market, and the climb up to Mount Tinbeerwah.",
    intro:
      "Tewantin is the original Noosa township — small, on the north bank of the river, and the " +
      "ferry departure for the Cooloola / Noosa North Shore. It is also the closest town to the " +
      "hinterland gateway routes.",
    facts: [
      { label: "Where", value: "North bank of the river, west of Noosa Junction" },
      { label: "Ferry to North Shore", value: "Noosa North Shore Ferries" },
      { label: "Best for", value: "Crossing to the North Shore, hinterland trips" },
    ],
    doList: [
      "Walk the Tewantin national park trail network.",
      "Climb Mt Tinbeerwah at sunrise (1.5 km return).",
      "Take the ferry to the North Shore for a beach day.",
    ],
    dontList: [
      "Don't expect Hastings Street — Tewantin is quieter.",
    ],
    sources: ["noosa-council", "noosa-ferry"],
    jsonLd: "Place",
  },
  {
    slug: "peregian",
    name: "Peregian Beach",
    image: "noosa_peregian_beach.jpg",
    alt: "Peregian Beach — quiet village 12 km south of Noosa Heads with a village square",
    blurb:
      "12 km south of Noosa Heads. A village square, sunset over the hills, a Sunday market, and " +
      "the Emu Mountain climb.",
    intro:
      "Peregian is the Noosa people drive to when they want a slower day. The village square is " +
      "the genuine article — a few cafés, a surf club, the Sunday market. The beach is south-facing " +
      "and exposed, like Sunshine.",
    facts: [
      { label: "Where", value: "12 km south of Noosa Heads" },
      { label: "Sunday market", value: "Peregian Beach Community Market, 7am–noon" },
      { label: "Best for", value: "Long-stays, dog-friendly trips, slow weekends" },
    ],
    doList: [
      "Climb Emu Mountain at sunrise (2.4 km return).",
      "Sunday market for breakfast.",
      "Walk south to the dunes — quieter than Noosa Heads.",
    ],
    dontList: [
      "Don't drive back to Noosa Heads for dinner — Peregian has its own.",
    ],
    sources: ["visit-noosa"],
    jsonLd: "Place",
  },
  {
    slug: "national-park",
    name: "Noosa National Park",
    image: "noosa_national_park_coastal_walk.jpg",
    alt: "Noosa National Park — headland and forest covering the eastern edge of Noosa Heads",
    blurb:
      "The 5.2 km coastal walk from Main Beach to Hell's Gates is the most walked trail in " +
      "Queensland. Koala territory, dolphin and whale viewing June–November.",
    intro:
      "Noosa National Park covers the headland to the east of Hastings Street. The coastal walk " +
      "from Main Beach to Hell's Gates is the most walked trail in Queensland — the brochures " +
      "are right about that. What they skip is that starting after 9am puts you in a queue, that " +
      "the headland is exposed to the sun, and that the walks south into Tanglewood are quieter.",
    facts: [
      { label: "Area", value: "About 4,000 hectares" },
      { label: "Coastal walk", value: "5.2 km one-way (10.4 km return)" },
      { label: "Time", value: "1.5–2.5 hours one way" },
      { label: "Wildlife", value: "Koalas, dolphins, humpback whales (June–Nov)" },
      { label: "Entry", value: "Main Beach, Park Rd, or end of Cooran Tce (Tanglewood)" },
    ],
    doList: [
      "Start before 8am in summer.",
      "Carry 1.5 L water per person.",
      "Look up into the eucalypts at Tea Tree Bay and Granite Bay for koalas.",
      "Check QPWS alerts before going.",
    ],
    dontList: [
      "Don't feed the wildlife.",
      "Don't take dogs — Noosa National Park is not dog-friendly.",
      "Don't dive off the headland rocks.",
    ],
    sources: ["qpws-noosa", "wikipedia-noosa-np"],
    jsonLd: "TouristAttraction",
  },
  {
    slug: "hinterland",
    name: "Noosa Hinterland — Pomona, Cooroy, Kin Kin",
    image: "noosa_pomona.jpg",
    alt: "Pomona — small Noosa hinterland town with Mt Pinbarren and the Noosa trail network nearby",
    blurb:
      "Twenty minutes west and the temperature drops, the stars show up, and the rush stops. " +
      "Mt Pinbarren, the Noosa trail network, and country pubs.",
    intro:
      "The Noosa hinterland is what makes Noosa more than a beach destination. Pomona has the " +
      "Mt Pinbarren walk and the Noosa trail network entry. Cooroy is the larger town on the " +
      "highway. Kin Kin is the smallest and quietest. The drive to Pomona at sunset is the most " +
      "Australian sunset you'll find within an hour of the coast.",
    facts: [
      { label: "Drive from Noosa Heads", value: "20–35 minutes" },
      { label: "Mt Pinbarren", value: "6 km return, moderate" },
      { label: "Best for", value: "Cool evenings, country pubs, hiking" },
    ],
    doList: [
      "Eat at the Pomona Hotel (Imperial Hotel) — generous meals, family-friendly.",
      "Walk Mt Pinbarren at dawn.",
      "Drive the hinterland route via Cooroy and Kin Kin at sunset.",
    ],
    dontList: [
      "Don't expect surf or sand — the hinterland is forest and farmland.",
    ],
    sources: ["visit-noosa", "qpws-noosa"],
    jsonLd: "Place",
  },
];

export async function generateStaticParams() {
  return PLACES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const place = PLACES.find((p) => p.slug === params.slug);
  if (!place) return {};
  return {
    title: `${place.name} — practical guide`,
    description: place.blurb,
    alternates: { canonical: `/places/${place.slug}` },
  };
}

export default function PlacePage({ params }: { params: { slug: string } }) {
  const place = PLACES.find((p) => p.slug === params.slug);
  if (!place) return notFound();

  const ldData = {
    "@context": "https://schema.org",
    "@type": place.jsonLd,
    name: place.name,
    description: place.blurb,
    url: `${SITE.productionUrl}/places/${place.slug}`,
    image: `${SITE.productionUrl}/images/noosa/${place.image.replace(".jpg", "_hero.jpg")}`,
    address: { "@type": "PostalAddress", addressRegion: "QLD", addressCountry: "AU" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldData) }}
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: SITE.productionUrl },
          { name: "Places", url: `${SITE.productionUrl}/places` },
          { name: place.name, url: `${SITE.productionUrl}/places/${place.slug}` },
        ]}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Places", href: "/places" }, { label: place.name }]} />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Place</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">{place.name}</h1>
        <p className="lead mt-3 max-w-3xl">{place.blurb}</p>
      </header>

      <Photo
        filename={place.image}
        alt={place.alt}
        variant="hero"
        className="container-page rounded-2xl overflow-hidden mb-12"
      />

      <section className="container-page grid gap-10 md:grid-cols-3 pb-12">
        <div className="md:col-span-2">
          <p className="text-lg text-parchment-800 leading-relaxed">{place.intro}</p>

          <h2 className="font-serif text-2xl mt-10">Do</h2>
          <ul className="mt-3 space-y-2">
            {place.doList.map((d, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-rainforest-500" aria-hidden />
                <span className="text-parchment-800">{d}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-serif text-2xl mt-8">Don't</h2>
          <ul className="mt-3 space-y-2">
            {place.dontList.map((d, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-coral-500" aria-hidden />
                <span className="text-parchment-800">{d}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs text-parchment-500">
            Sources:{" "}
            {place.sources.map((id, i) => {
              const s = sourceById(id);
              if (!s) return null;
              return (
                <span key={id}>
                  {i > 0 && ", "}
                  <a href={s.url} className="link" target="_blank" rel="noopener noreferrer">
                    {s.publisher}
                  </a>
                </span>
              );
            })}
          </p>
        </div>

        <aside className="md:col-span-1">
          <div className="card sticky top-24">
            <div className="card-body">
              <h2 className="font-serif text-xl">At a glance</h2>
              <dl className="mt-4 text-sm space-y-3">
                {place.facts.map((f, i) => (
                  <div key={i}>
                    <dt className="text-xs uppercase tracking-[0.12em] text-parchment-500">{f.label}</dt>
                    <dd className="mt-0.5 text-parchment-800">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border-t border-parchment-200 pt-5 space-y-2 text-sm">
                <Link href="/where-to-stay" className="block text-ocean-600 hover:underline">
                  Where to stay nearby →
                </Link>
                <Link href="/eat-drink" className="block text-ocean-600 hover:underline">
                  Where to eat nearby →
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}