import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbLd, FaqLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";

export const metadata = {
  title: "Noosa National Park — walks, lookouts, dolphins and whales",
  description:
    "The coastal walk, headland lookouts, dolphin and humpback seasons. Current QPWS alerts and access information.",
};

export const dynamic = "force-static";

const faqs = [
  {
    q: "Can you drive into Noosa National Park?",
    a: "No — the park is pedestrian and bicycle access only. The main entrance is at the end of Hastings Street. There is also a quieter entrance at Granite Bay (limited parking) and at Sunshine Beach.",
  },
  {
    q: "Is the coastal walk one-way?",
    a: "You can do it either way. Most people start at the Hastings Street entrance and walk south to Sunshine Beach. It's about 5.4 km one way, allow 2.5–3 hours. The return is a short bus or taxi.",
  },
  {
    q: "When is the best time to see whales?",
    a: "Humpback whales migrate north along the east Australian coast from June to August, and return south with calves from September to November. The headland lookouts (Boiling Pot, Dolphin Point) are the best spots.",
  },
  {
    q: "Are there dolphins in Noosa?",
    a: "Yes — bottlenose dolphins are resident in Laguna Bay and are commonly seen from the coastal walk. They're wild animals; never feed or chase them.",
  },
  {
    q: "Is Noosa National Park safe at night?",
    a: "QPWS advises against walking the coastal track at night due to uneven surfaces and the risk of snake or dingo encounters. Stick to daylight hours and tell someone your plan.",
  },
];

const walks = [
  { name: "Coastal Walk (full)", distance: "5.4 km one way", time: "2.5–3 h", difficulty: "Easy–moderate", notes: "Hastings Street to Sunshine Beach. The Noosa walk. Watch the headland edges with kids." },
  { name: "Coastal Walk (short)", distance: "1.0 km return", time: "30 min", difficulty: "Easy", notes: "Hastings Street entrance to Boiling Pot lookout. Good first-timers walk." },
  { name: "Palm Grove Circuit", distance: "2.7 km loop", time: "45 min", difficulty: "Easy", notes: "Rainforest circuit. Shaded, popular with families. Enter from the park's Palm Grove Road entrance." },
  { name: "Tanglewood Track", distance: "1.5 km one way", time: "30 min", difficulty: "Easy", notes: "Rainforest walk from the day-use area to the coastal walk. Combine with Palm Grove." },
  { name: "Hell's Gates", distance: "3.0 km return", time: "1.5 h", difficulty: "Moderate", notes: "Northern headland walk. Rock-hopping near the end. Check tide before going." },
  { name: "Alexandria Bay", distance: "4.6 km one way", time: "2 h", difficulty: "Moderate", notes: "Continuation past Sunshine Beach. Clothing-optional beach at the end. Check current alerts." },
];

export default function NationalParkPage() {
  const baseUrl = SITE.productionUrl;
  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Noosa National Park", url: `${baseUrl}/national-park` },
        ]}
      />
      <FaqLd qa={faqs} />
      <main className="bg-parchment-50">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Noosa National Park" }]} />

          <header className="pb-8 pt-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">Noosa National Park</p>
            <h1 className="mt-2 font-serif text-4xl text-parchment-900 sm:text-5xl">Walks, lookouts, wildlife</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-parchment-700">
              Noosa National Park is the reason most people come to Noosa Heads. The coastal walk from
              Hastings Street to Sunshine Beach is one of Australia's best short walks — headlands, turquoise
              water, dolphins and (in season) humpback whales.
            </p>
            <p className="mt-3 rounded-xl border border-coral-400 bg-coral-400/10 p-3 text-sm text-parchment-800">
              <strong>Always check current alerts</strong> before walking the coastal track:{" "}
              <a href="https://parks.des.qld.gov.au/alerts/?p=NOOSA" target="_blank" rel="noopener noreferrer" className="link">
                QPWS Noosa alerts
              </a>.
              {" "}Track closures happen after rain, king tides, and for wildlife management.
            </p>
          </header>

          {/* Hero photo */}
          <section className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <Photo
                  filename="noosa_national_park_coastal_walk.jpg"
                  alt="The Noosa National Park coastal walk with granite headlands and turquoise water"
                  variant="hero"
                  priority
                  caption=""
                />
              </div>
              <p className="mt-2 text-xs text-parchment-500">
                Coastal walk, Noosa National Park — Wikimedia Commons, CC BY-SA 4.0
              </p>
            </div>
            <div className="md:col-span-5">
              <h2 className="font-serif text-3xl text-parchment-900">The coastal walk</h2>
              <p className="mt-3 leading-relaxed text-parchment-700">
                Five kilometres of headland walking between Hastings Street and Sunshine Beach.
                Lookouts at Boiling Pot and Dolphin Point regularly see bottlenose dolphins; in
                winter, humpback whales pass close to shore.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-parchment-700">
                <li>· Start anywhere — it's a one-way track either direction</li>
                <li>· Best early morning or late afternoon for wildlife</li>
                <li>· Take water, hat, sunscreen — there's no shop on the track</li>
                <li>· No swimming at the beach between Boiling Pot and Dolphin Point</li>
              </ul>
            </div>
          </section>

          {/* Walks table */}
          <section className="mt-12">
            <h2 className="font-serif text-3xl text-parchment-900">Walks in the park</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl bg-white border border-parchment-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-parchment-100 text-parchment-700">
                  <tr>
                    <th className="px-3 py-3 font-medium">Walk</th>
                    <th className="px-3 py-3 font-medium">Distance</th>
                    <th className="px-3 py-3 font-medium">Time</th>
                    <th className="px-3 py-3 font-medium">Difficulty</th>
                    <th className="px-3 py-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {walks.map((w, i) => (
                    <tr key={w.name} className={i % 2 === 0 ? "bg-white" : "bg-parchment-50/40"}>
                      <td className="px-3 py-2 font-medium text-parchment-900">{w.name}</td>
                      <td className="px-3 py-2 text-parchment-700">{w.distance}</td>
                      <td className="px-3 py-2 text-parchment-700">{w.time}</td>
                      <td className="px-3 py-2 text-parchment-700">{w.difficulty}</td>
                      <td className="px-3 py-2 text-parchment-700">{w.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Wildlife */}
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="card overflow-hidden p-0">
              <Photo filename="noosa_national_park_forest.jpg" alt="Rainforest eucalypt forest in Noosa National Park" variant="card" caption="" />
              <div className="p-5">
                <h3 className="font-serif text-2xl text-parchment-900">Forest wildlife</h3>
                <p className="mt-2 text-sm text-parchment-700">
                  The park's eucalypt forest and rainforest are home to koalas (look up in the
                  gum trees along the coastal walk), grey kangaroos, swamp wallabies, and a
                  wide range of birdlife. The best time to spot koalas is early morning in
                  winter, when they sit higher in the canopy to catch the sun.
                </p>
              </div>
            </article>
            <article className="card overflow-hidden p-0">
              <Photo filename="noosa_whale.jpg" alt="A humpback whale surfacing" variant="card" caption="" />
              <div className="p-5">
                <h3 className="font-serif text-2xl text-parchment-900">Whale season</h3>
                <p className="mt-2 text-sm text-parchment-700">
                  Humpback whales migrate past Noosa from June to November. The northern migration
                  (June–August) features larger groups of males and juveniles; the southern migration
                  (September–November) features mothers with newborn calves. Dolphin Point and Boiling
                  Pot are the most reliable lookouts. Don't approach — give them space.
                </p>
              </div>
            </article>
          </section>

          {/* FAQs */}
          <section className="mt-12 rounded-2xl bg-white p-6 border border-parchment-200">
            <h2 className="font-serif text-3xl text-parchment-900">Common questions</h2>
            <dl className="mt-6 space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-medium text-parchment-900">{f.q}</dt>
                  <dd className="mt-1 text-parchment-700 leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Official links */}
          <section className="mt-12 rounded-2xl bg-parchment-100 p-6">
            <h2 className="font-serif text-2xl text-parchment-900">Official sources</h2>
            <ul className="mt-3 space-y-2 text-sm text-parchment-700">
              <li>· <a href="https://parks.des.qld.gov.au/parks/noosa/" target="_blank" rel="noopener noreferrer" className="link">QPWS — Noosa National Park</a></li>
              <li>· <a href="https://parks.des.qld.gov.au/alerts/?p=NOOSA" target="_blank" rel="noopener noreferrer" className="link">QPWS — current Noosa alerts</a></li>
              <li>· <a href="https://parks.des.qld.gov.au/parks/noosa/accessible-recreation/" target="_blank" rel="noopener noreferrer" className="link">QPWS — accessibility information</a></li>
            </ul>
            <p className="mt-3 text-xs text-parchment-500">
              The QPWS alerts feed sometimes returns 403 to automated fetches. We mark it unavailable
              and tell you to check the URL above. See our <Link href="/surf-weather" className="link">surf &amp; weather page</Link> for source health.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
