import Link from "next/link";
import { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AffiliateLink } from "@/components/AffiliateLink";
import { ArticleLd, BreadcrumbLd, FaqLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/sources";
import bomMarine from "@/data/live/bom-marine.json";

export const metadata: Metadata = {
  title: "A Noosa weekend — 2-day itinerary with river and national park",
  description:
    "Two days in Noosa: day 1 on the headland (Hastings Street, Main Beach, Noosa National " +
    "Park); day 2 on the river (Noosaville, ferry, Everglades, Sunday markets). Real venues, " +
    "current sources.",
  alternates: { canonical: "/itineraries/weekend" },
};

const DISCLOSURE =
  "Itineraries are recommendations, not guarantees. Conditions change — tides, weather, " +
  "track closures. Always check current BOM and QPWS information before setting out.";

const DAY1: { time: string; title: string; detail: string }[] = [
  {
    time: "08:00",
    title: "Breakfast — Hastings Street",
    detail:
      "Same plan as the one-day itinerary: Cafe Le Monde or Aromas. Outdoor tables on Hastings " +
      "Street, expect a queue at 8am in summer.",
  },
  {
    time: "09:30",
    title: "Noosa National Park coastal walk",
    detail:
      "Walk south from the Hastings Street entrance to Boiling Pot and Dolphin Point. If " +
      "you're steady, continue all the way to Sunshine Beach (5.4 km one way, 2.5–3 hours). " +
      "Dolphins most often seen from these headlands; humpbacks in winter.",
  },
  {
    time: "13:00",
    title: "Long lunch",
    detail:
      "Bistro C or Sails Restaurant on Hastings Street for beachfront. Pitchfork if you want " +
      "sharing plates. Book ahead on Saturdays in peak season.",
  },
  {
    time: "15:30",
    title: "Little Cove swim",
    detail:
      "Walk down from Hastings Street to Little Cove — small, sheltered, often quieter than " +
      "Main Beach. Patrolled in summer.",
  },
  {
    time: "17:30",
    title: "Sunset drinks — Hastings Street",
    detail:
      "Locale has the best aperitivo on the street. Aromas does a long, slow afternoon. " +
      "Sit outside and watch the headland change colour.",
  },
  {
    time: "19:30",
    title: "Dinner",
    detail:
      "Thomas Corner for a chef's-hat tasting menu (Tue–Sat). Wasabi if you want " +
      "sushi and sashimi. Embassy XO for Asian share plates.",
  },
];

const DAY2: { time: string; title: string; detail: string }[] = [
  {
    time: "08:00",
    title: "Breakfast — Noosaville",
    detail:
      "Drive or ferry to Noosaville (about 10 minutes by car). Cafe on the river foreshore " +
      "options; walk the Gympie Terrace strip. Slower pace than day one.",
  },
  {
    time: "09:30",
    title: "Noosa Ferry — upriver",
    detail:
      "The Noosa North Shore Ferries depart from the Hilton Esplanade stop (Noosaville). " +
      "One-way to Noosa North Shore takes about 25 minutes; the ferry runs every 30 minutes " +
      "in peak season. Buy tickets on board.",
  },
  {
    time: "11:00",
    title: "Noosa Everglades",
    detail:
      "From Noosa North Shore you can connect to Everglades EcoCruises — a calm-water cruise " +
      "into the upper Noosa River system. Allow half a day for the full cruise, including " +
      "transfers from Noosa North Shore. Book ahead in peak season.",
  },
  {
    time: "14:30",
    title: "Lunch — back in Noosaville",
    detail:
      "Ricky's (chef-owned, river-side), Maison's (French-leaning, garden setting) or Wood " +
      "Fire Pizza for a casual share table. All on or near Gympie Terrace.",
  },
  {
    time: "16:00",
    title: "Sunday markets or river walk",
    detail:
      "If it's Sunday, the Noosa Farmers Market runs at the AFL grounds on Weyba Road " +
      "(7am–noon). On other days, walk the Noosa River foreshore from Noosaville to " +
      "Tewantin — flat, paved, ~5 km one way.",
  },
  {
    time: "17:30",
    title: "Sunset — Tewantin",
    detail:
      "Tewantin is the closest town upriver. Quiet, locals' pub, the Imperial. Watch the " +
      "light change over Mt Cooran from the riverbank.",
  },
];

const FAQ = [
  {
    q: "Where should I stay for this two-day itinerary?",
    a: "Noosa Heads puts you walking distance to day 1; Noosaville is closer to day 2. " +
      "If you don't want to move, Noosa Heads is the better base — the river is a 10-minute " +
      "drive and the ferry terminal has parking.",
  },
  {
    q: "Is the Everglades cruise suitable for kids?",
    a: "Yes — calm water, no swell, sheltered. Most operators welcome children of all ages. " +
      "The full cruise is about 4.5 hours including transfers; the shorter option is 2 hours.",
  },
  {
    q: "Can I do this in one day instead?",
    a: "Not really — you'd be rushing both halves. See the one-day itinerary for a focused " +
      "single day.",
  },
  {
    q: "Is the ferry included in anything?",
    a: "The Noosa Ferry is a separate ticketed boat service (cash and card on board). The " +
      "Everglades cruise is a different operator and is booked separately.",
  },
  {
    q: "Do I need to book the Everglades cruise in advance?",
    a: "In peak season (school holidays, long weekends) yes — the morning cruises fill. In " +
      "winter you can usually book the day before.",
  },
];

export default function WeekendPage() {
  const baseUrl = SITE.productionUrl;
  const marineSrc = sourceById("bom-marine");
  const ferrySrc = sourceById("noosa-ferry");
  const evergladesSrc = sourceById("everglades-ecocruises");
  const qpwsSrc = sourceById("qpws-alerts");

  const marine = (bomMarine as any).data;
  const dayPeriod = marine?.periods?.[1];
  const marineFetchedAt = (bomMarine as any).fetchedAt;

  return (
    <>
      <ArticleLd
        url={`${baseUrl}/itineraries/weekend`}
        headline="A Noosa weekend — two days on the headland and the river"
        description="Day 1 at Noosa Heads (Hastings Street, Main Beach, national park); day 2 on the river (Noosaville, ferry, Everglades, markets)."
        datePublished="2026-08-24"
        imageUrl={`${baseUrl}/images/noosa/noosa_ferry_hero.jpg`}
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Itineraries", url: `${baseUrl}/itineraries` },
          { name: "A Noosa weekend", url: `${baseUrl}/itineraries/weekend` },
        ]}
      />
      <FaqLd qa={FAQ} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Itineraries", href: "/itineraries" },
          { label: "A Noosa weekend" },
        ]}
      />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Itinerary · 2 days</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">A Noosa weekend</h1>
        <p className="lead mt-3 max-w-3xl">
          Day one on the headland, day two on the river. The two halves of Noosa — the beach /
          national park energy and the slow-water river energy — are only ten minutes apart by
          car but feel like different holidays.
        </p>
        <p className="mt-4 max-w-3xl text-sm text-parchment-600">
          Plan your Noosa trip well.
        </p>
        <div className="callout mt-6 max-w-3xl">
          <p className="font-semibold text-parchment-900">Conditions change</p>
          <p className="mt-1 text-sm">{DISCLOSURE}</p>
        </div>
      </header>

      <Photo
        filename="noosa_ferry.jpg"
        alt="The Noosa Ferry on the Noosa River — a slow-water crossing between Noosaville and Noosa North Shore"
        variant="hero"
        className="container-page rounded-2xl overflow-hidden mb-12"
        priority
      />

      {/* DAY 1 */}
      <section className="section container-page">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl md:text-3xl">Day 1 — The headland</h2>
          <Link href="/itineraries/one-day" className="text-sm link hidden md:inline">
            Full one-day detail →
          </Link>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-parchment-700">
          Arrive Friday evening or early Saturday. Park once and walk for the rest of the day.
        </p>
        <ol className="mt-8 space-y-8 max-w-3xl">
          {DAY1.map((step, i) => (
            <li key={i} className="grid gap-4 sm:grid-cols-[100px_1fr]">
              <div>
                <p className="font-serif text-2xl text-ocean-700">{step.time}</p>
              </div>
              <div>
                <h3 className="font-serif text-xl">{step.title}</h3>
                <p className="mt-2 text-parchment-700 leading-relaxed">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-sm text-parchment-700">
          Verify current park conditions before the coastal walk —{" "}
          <a href={qpwsSrc?.url} target="_blank" rel="noopener noreferrer" className="link">
            QPWS Noosa alerts
          </a>.
        </p>
      </section>

      {/* MARINE STRIP — day 2 */}
      <section className="section bg-parchment-100">
        <div className="container-page">
          <h2 className="font-serif text-2xl md:text-3xl">Day 2 weather — Sunday on the water</h2>
          <p className="mt-3 max-w-3xl text-parchment-700">
            Day 2 lives on the river. The BOM Sunshine Coast marine forecast covers the river
            entrance — useful even though the river itself is calm water.
          </p>
          {dayPeriod ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-3 max-w-3xl">
              <div className="card">
                <div className="card-body">
                  <p className="text-xs uppercase tracking-wider text-parchment-500">Wind</p>
                  <p className="mt-1 font-serif text-lg">{dayPeriod.forecast_winds}</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <p className="text-xs uppercase tracking-wider text-parchment-500">Seas</p>
                  <p className="mt-1 font-serif text-lg">{dayPeriod.forecast_seas}</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <p className="text-xs uppercase tracking-wider text-parchment-500">Weather</p>
                  <p className="mt-1 font-serif text-lg">{dayPeriod.forecast_weather}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-parchment-700">Marine snapshot unavailable — check BOM directly.</p>
          )}
          <p className="mt-4 text-xs text-parchment-500">
            Source:{" "}
            <a href={marineSrc?.url} target="_blank" rel="noopener noreferrer" className="link">
              {marineSrc?.title}
            </a>
            {" — "}fetched{" "}
            {new Date(marineFetchedAt).toLocaleString("en-AU", { timeZone: "Australia/Brisbane" })} AEST
            {" · "}refreshed by <code>npm run data:refresh</code>.
          </p>
        </div>
      </section>

      {/* DAY 2 */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">Day 2 — The river</h2>
        <p className="mt-3 max-w-3xl text-sm text-parchment-700">
          Slower pace. Boat, birds, a long lunch. The river side of Noosa is the half most
          first-time visitors skip — it's the half locals prefer.
        </p>
        <ol className="mt-8 space-y-8 max-w-3xl">
          {DAY2.map((step, i) => (
            <li key={i} className="grid gap-4 sm:grid-cols-[100px_1fr]">
              <div>
                <p className="font-serif text-2xl text-ocean-700">{step.time}</p>
              </div>
              <div>
                <h3 className="font-serif text-xl">{step.title}</h3>
                <p className="mt-2 text-parchment-700 leading-relaxed">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* OPERATOR BOOKING */}
      <section className="section bg-parchment-100">
        <div className="container-page">
          <h2 className="font-serif text-2xl md:text-3xl">Booking — ferry and Everglades</h2>
          <p className="mt-3 max-w-3xl text-parchment-700">
            Two different operators. The river ferry is walk-up; the Everglades cruise needs a
            booking in peak season.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 max-w-4xl">
            <article className="card">
              <div className="card-body">
                <h3 className="font-serif text-lg">Noosa North Shore Ferries</h3>
                <p className="mt-2 text-sm text-parchment-700">
                  The river ferry between Noosaville and Noosa North Shore. Every 30 minutes
                  in peak season. Cash and card on board.
                </p>
                <a href={ferrySrc?.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-xs mt-4">
                  Operator website →
                </a>
              </div>
            </article>
            <article className="card">
              <div className="card-body">
                <h3 className="font-serif text-lg">Everglades EcoCruises</h3>
                <p className="mt-2 text-sm text-parchment-700">
                  Calm-water cruise into the Noosa Everglades. Half-day and full-day options.
                  Book ahead in school holidays.
                </p>
                <a href={evergladesSrc?.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-xs mt-4">
                  Operator website →
                </a>
              </div>
            </article>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <AffiliateLink partner="getyourguide" className="btn btn-primary">
              Browse tours on GetYourGuide
            </AffiliateLink>
            <AffiliateLink partner="viator" className="btn btn-outline">
              Compare on Viator
            </AffiliateLink>
          </div>
        </div>
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

      {/* INTERNAL SIBLINGS — ≥3 contextual links */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">Keep planning</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/itineraries/one-day" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">One day in Noosa</h3>
              <p className="mt-2 text-sm text-parchment-700">If you've only got 24 hours.</p>
            </div>
          </Link>
          <Link href="/itineraries/four-days" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Four days in Noosa</h3>
              <p className="mt-2 text-sm text-parchment-700">Add the hinterland and a slow day.</p>
            </div>
          </Link>
          <Link href="/places/noosaville" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Noosaville</h3>
              <p className="mt-2 text-sm text-parchment-700">River-side base for day 2.</p>
            </div>
          </Link>
          <Link href="/national-park" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Noosa National Park</h3>
              <p className="mt-2 text-sm text-parchment-700">Walks, lookouts, current QPWS alerts.</p>
            </div>
          </Link>
          <Link href="/eat-drink" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Eat &amp; drink</h3>
              <p className="mt-2 text-sm text-parchment-700">Hastings Street and Noosaville picks.</p>
            </div>
          </Link>
          <Link href="/where-to-stay" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Where to stay</h3>
              <p className="mt-2 text-sm text-parchment-700">Heads vs Noosaville vs Sunshine.</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}