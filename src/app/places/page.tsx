import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";

export const metadata = {
  title: "Places in Noosa — beaches, headlands, villages",
  description:
    "The Noosa places guide: beaches, headlands, villages, and the National Park. Real photos, sourced.",
};

export const dynamic = "force-static";

const places = [
  {
    slug: "main-beach",
    name: "Main Beach",
    area: "Hastings Street",
    img: "noosa_main_beach.jpg",
    blurb: "Patrolled year-round, gentle surf, lifeguard towers visible from the headland. The most-photographed beach in Noosa.",
    facts: [["Patrol", "Year-round (QPS lifeguards)"], ["Surf", "Usually small — good for beginners"], ["Walking", "Coastal walk starts at the headland"]],
  },
  {
    slug: "little-cove",
    name: "Little Cove",
    area: "Hastings Street",
    img: "noosa_little_cove.jpg",
    blurb: "Small protected cove at the start of the coastal walk. Beautiful clear water, usually less crowded than Main Beach.",
    facts: [["Patrol", "Limited (no formal flag at peak)"], ["Surf", "Calm"], ["Walking", "1 minute from the coastal walk entrance"]],
  },
  {
    slug: "sunshine-beach",
    name: "Sunshine Beach",
    area: "Sunshine Beach",
    img: "noosa_sunshine_beach_town.jpg",
    blurb: "South of Noosa Heads proper. Surf-front village with patrolled beach, cafés, and quick access to the southern coastal walk.",
    facts: [["Patrol", "Year-round"], ["Surf", "Bigger than Main Beach — picks up more swell"], ["Walking", "Southern end of the coastal walk"]],
  },
  {
    slug: "peregian",
    name: "Peregian Beach",
    area: "Peregian Beach",
    img: "noosa_peregian_beach.jpg",
    blurb: "10 minutes north of Noosa Heads. Patrolled beach, surf club, village feel. Sunday markets at the surf club.",
    facts: [["Patrol", "Year-round (Peregian SLSC)"], ["Surf", "Variable — picks up southerly swell"], ["Walking", "Noosa section of the Sunshine Coast walk"]],
  },
  {
    slug: "noosaville",
    name: "Noosaville",
    area: "Noosaville",
    img: "noosa_river_foreshore.jpg",
    blurb: "River-side town. Hire a boat for the afternoon, eat at the river-front restaurants, swim at the lagoon.",
    facts: [["Patrol", "Noosa River life guard at main beach"], ["Surf", "None — river swimming only"], ["Walking", "Forster Park to Noosa Sound, ~3 km"]],
  },
  {
    slug: "tewantin",
    name: "Tewantin",
    area: "Tewantin",
    img: "noosa_tewantin.jpg",
    blurb: "Original Noosa town. Ferry departure point to the north shore. Heritage main street, smaller and quieter than Noosaville.",
    facts: [["Patrol", "Ferry wharf area"], ["Surf", "None"], ["Walking", "Ferry to North Shore — see webcams page"]],
  },
  {
    slug: "national-park",
    name: "Hell's Gates",
    area: "Noosa National Park",
    img: "noosa_hells_gates.jpg",
    blurb: "Northern headland of Noosa National Park. Rock-hopping at the end of the track, beautiful views back to the coast.",
    facts: [["Patrol", "None"], ["Surf", "View only"], ["Walking", "3 km return from the northern car park"]],
  },
];

export default function PlacesPage() {
  const baseUrl = SITE.productionUrl;
  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Places", url: `${baseUrl}/places` },
        ]}
      />
      <main className="bg-parchment-50">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Places" }]} />
          <header className="pb-8 pt-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">Places</p>
            <h1 className="mt-2 font-serif text-4xl text-parchment-900 sm:text-5xl">Beaches, headlands, villages</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-parchment-700">
              The places guide covers the seven Noosa places every visitor should know — beaches,
              river, national park and the inland towns. Photos, lifeguard notes, and what each is good for.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {places.map((p) => (
              <article key={p.slug} id={p.slug} className="card overflow-hidden p-0">
                <Photo filename={p.img} alt={`${p.name}, ${p.area}`} variant="card" caption="" />
                <div className="p-5">
                  <h2 className="font-serif text-2xl text-parchment-900">{p.name}</h2>
                  <p className="mt-1 text-xs uppercase tracking-wider text-parchment-500">{p.area}</p>
                  <p className="mt-3 text-sm leading-relaxed text-parchment-700">{p.blurb}</p>
                  <dl className="mt-4 grid gap-2 text-xs text-parchment-700">
                    {p.facts.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-3 gap-2">
                        <dt className="font-semibold text-parchment-500">{k}</dt>
                        <dd className="col-span-2">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-12 rounded-2xl bg-parchment-100 p-6">
            <h2 className="font-serif text-2xl text-parchment-900">Lifeguard & safety notes</h2>
            <p className="mt-3 text-sm leading-relaxed text-parchment-700">
              Lifeguard services across Noosa's beaches are run by Queensland's
              <a href="https://www.qld.gov.au/" target="_blank" rel="noopener noreferrer" className="link"> Life Saving Service</a>.
              Always swim between the red and yellow flags at patrolled beaches. The stretch of water
              between Main Beach and Little Cove (known informally as "the boiling pot") has strong
              rips — only for experienced surfers, and never alone.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
