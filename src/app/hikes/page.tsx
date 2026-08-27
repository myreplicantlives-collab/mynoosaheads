import Link from "next/link";
import { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArticleLd, BreadcrumbLd, FaqLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/sources";

export const metadata: Metadata = {
  title: "Hikes & national park — Noosa coastal walk and beyond",
  description:
    "Hike guides for Noosa National Park: coastal walk to Hell's Gates, Tanglewood track, " +
    "Emu Mountain and the Pomona / Cooroy hinterland. Current QPWS alerts, safety notes, real " +
    "permit information.",
  alternates: { canonical: "/hikes" },
};

const HIKES = [
  {
    name: "Noosa National Park coastal walk",
    image: "noosa_national_park_coastal_walk.jpg",
    alt: "Noosa National Park coastal walk — 5.2 km from Main Beach to Hell's Gates",
    distance: "5.2 km one way (10.4 km return)",
    time: "1.5–2.5 hours one way",
    grade: "Easy. Wheelchair accessible first 1.6 km (concrete boardwalk).",
    start: "Main Beach car park, Noosa Heads",
    highlights: ["Dolphins and whales (June–November)", "Koalas in eucalypts", "Boat ramp at Alexandria Bay"],
    safety: [
      "Carry 1.5 L water per person",
      "Start before 8am or after 3pm in summer — heat and crowds both bite",
      "Wear a hat; the headland section is exposed",
      "Check QPWS alerts before walking — track closures happen",
    ],
    sources: ["qpws-noosa", "wikipedia-noosa-np"],
  },
  {
    name: "Tanglewood Track",
    image: "noosa_national_park_forest.jpg",
    alt: "Noosa National Park interior — eucalypt forest on the Tanglewood track",
    distance: "5.5 km loop",
    time: "1.5–2 hours",
    grade: "Moderate. Some hill climbing, but shaded.",
    start: "Park at the end of Cooran Terrace, Noosa Heads",
    highlights: ["Quiet — fewer people than the coastal walk", "Dense eucalypt forest"],
    safety: [
      "Bring water",
      "Check QPWS alerts before going",
      "Not recommended after heavy rain — tracks become slippery",
    ],
    sources: ["qpws-noosa"],
  },
  {
    name: "Emu Mountain (Mount Peregian)",
    image: "noosa_peregian_beach.jpg",
    alt: "Emu Mountain — coastal summit walk near Peregian Beach",
    distance: "2.4 km return",
    time: "45–60 min",
    grade: "Moderate. Steep sections.",
    start: "Car park at the end of Woodland Drive, Peregian Beach",
    highlights: ["Coastal views from the summit", "Shorter and quieter than the Noosa headland"],
    safety: ["Bring water", "Wear sun protection"],
    sources: ["qpws-noosa"],
  },
  {
    name: "Mt Pinbarren (hinterland)",
    image: "noosa_pomona.jpg",
    alt: "Mt Pinbarren — hinterland summit near Pomona in the Noosa hinterland",
    distance: "6 km return",
    time: "2–2.5 hours",
    grade: "Moderate. Steady climb.",
    start: "End of Sunrise Road, Pinbarren (south of Pomona)",
    highlights: ["Cooler than the coast", "Open forest, grass trees"],
    safety: ["Bring water", "Avoid after heavy rain"],
    sources: ["qpws-noosa"],
  },
  {
    name: "Noosa trail network (hinterland day walks)",
    image: "noosa_lake_weyba.jpg",
    alt: "Lake Weyba — one of the quiet spots in the Noosa hinterland trail network",
    distance: "Varies — 4 to 12 km routes",
    time: "1.5–4 hours",
    grade: "Easy to moderate",
    start: "Various — see Noosa Council trail map",
    highlights: ["Lake Weyba", "Cooloola area", "Bird-rich"],
    safety: ["Bring water", "Carry a paper map — phone reception is patchy"],
    sources: ["qpws-noosa", "noosa-council"],
  },
];

const FAQ = [
  {
    q: "Do I need a permit to walk the Noosa coastal walk?",
    a: "No permit is needed for the standard coastal walk starting at Main Beach. The Noosa North " +
      "Shore and K'gari (Fraser Island) require vehicle permits — see the QPWS sites.",
  },
  {
    q: "Are dogs allowed on the coastal walk?",
    a: "No. Noosa National Park is not dog-friendly. Dogs are allowed on leash on selected beaches " +
      "(Sunshine Beach south of Leisha Track, Peregian Beach, certain stretches of North Shore).",
  },
  {
    q: "When is the coastal walk too dangerous?",
    a: "After heavy rain the headland sections can be slippery. During king tides some access " +
      "points (Boat Ramp, Alexandria Bay) are cut. Always check QPWS alerts before walking.",
  },
  {
    q: "Will I see koalas on the coastal walk?",
    a: "Possibly. Koalas are resident in Noosa National Park but they're hard to spot — look up " +
      "into the eucalypts around the Tea Tree Bay and Granite Bay sections. Don't approach or feed them.",
  },
];

export default function HikesPage() {
  return (
    <>
      <ArticleLd
        url={`${SITE.productionUrl}/hikes`}
        headline="Hikes & national park"
        description="Hike guides for Noosa National Park and the hinterland. Current QPWS alerts, safety notes."
        datePublished="2026-08-24"
        imageUrl={`${SITE.productionUrl}/images/noosa/noosa_national_park_coastal_walk_hero.jpg`}
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: SITE.productionUrl },
          { name: "Hikes", url: `${SITE.productionUrl}/hikes` },
        ]}
      />
      <FaqLd
        qa={FAQ.map((f) => ({ q: f.q, a: f.a }))}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Hikes" }]} />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Hikes</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">Five walks worth planning around</h1>
        <p className="lead mt-3 max-w-3xl">
          The coastal walk gets the photos. The Tanglewood Track and the hinterland trails get the
          quiet. All of them are within twenty minutes of Noosa Heads. Here is what to expect, what
          to carry, and when to skip.
        </p>
        <div className="callout mt-6 max-w-3xl">
          <p className="font-semibold text-ocean-800">Before every walk</p>
          <p className="mt-1 text-sm">
            Check current QPWS alerts:{" "}
            <a href="https://parks.des.qld.gov.au/alerts/?p=NOOSA" className="link" target="_blank" rel="noopener noreferrer">
              parks.des.qld.gov.au/alerts/?p=NOOSA
            </a>
            . Carry 1.5 L water per person. Start before 8am in summer. Wear a hat. Don't feed wildlife.
          </p>
        </div>
      </header>

      <Photo
        filename="noosa_national_park_coastal_walk.jpg"
        alt="The Noosa National Park coastal walk — the most walked trail in Queensland"
        variant="hero"
        className="container-page rounded-2xl overflow-hidden mb-12"
      />

      <section className="container-page space-y-12">
        {HIKES.map((h) => (
          <article key={h.name} className="grid gap-8 md:grid-cols-2">
            <Photo filename={h.image} alt={h.alt} variant="card" />
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">{h.name}</h2>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <Field label="Distance" value={h.distance} />
                <Field label="Time" value={h.time} />
                <Field label="Grade" value={h.grade} wide />
                <Field label="Start" value={h.start} wide />
              </dl>
              <h3 className="mt-5 text-sm font-semibold text-parchment-900">Highlights</h3>
              <ul className="mt-2 text-sm text-parchment-700 space-y-1">
                {h.highlights.map((x, i) => (
                  <li key={i}>· {x}</li>
                ))}
              </ul>
              <div className="callout-warn mt-5">
                <p className="font-semibold">Safety</p>
                <ul className="mt-2 text-sm space-y-1">
                  {h.safety.map((x, i) => (
                    <li key={i}>· {x}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-xs text-parchment-500">
                Sources:{" "}
                {h.sources.map((id, i) => {
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
          </article>
        ))}
      </section>

      {/* FAQ */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">Frequently asked</h2>
        <div className="mt-6 space-y-4 max-w-3xl">
          {FAQ.map((f, i) => (
            <details key={i} className="card">
              <summary className="cursor-pointer p-5 font-medium text-parchment-900">{f.q}</summary>
              <div className="px-5 pb-5 text-sm text-parchment-700">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* NATIONAL PARK GUIDE LINK */}
      <section className="section bg-parchment-100">
        <div className="container-page">
          <h2 className="font-serif text-2xl md:text-3xl">Noosa National Park in depth</h2>
          <p className="lead mt-3 max-w-3xl">
            For the full guide — wildlife, history, full track notes and how to plan the coastal walk
            from car park to Hell's Gates without stepping on a wedding photographer — read the
            dedicated guide.
          </p>
          <Link href="/places/national-park" className="btn btn-primary mt-6">
            National Park guide →
          </Link>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <dt className="text-xs uppercase tracking-[0.12em] text-parchment-500">{label}</dt>
      <dd className="mt-1 text-parchment-800">{value}</dd>
    </div>
  );
}