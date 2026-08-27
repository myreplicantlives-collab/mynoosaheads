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
  title: "Four days in Noosa — full 4-day itinerary with hinterland",
  description:
    "Four days in Noosa: day 1 headland, day 2 river, day 3 Coolum and Maroochydore " +
    "north, day 4 Cooran and Pomona hinterland. Real venues, current sources.",
  alternates: { canonical: "/itineraries/four-days" },
};

const DISCLOSURE =
  "Itineraries are recommendations, not guarantees. Conditions change — tides, weather, " +
  "track closures. Always check current BOM and QPWS information before setting out.";

const DAYS: { day: string; theme: string; schedule: { time: string; title: string; detail: string }[] }[] = [
  {
    day: "Day 1",
    theme: "Noosa Heads — the headland",
    schedule: [
      {
        time: "08:00",
        title: "Breakfast on Hastings Street",
        detail: "Cafe Le Monde or Aromas — outdoor tables, expect a queue at 8am in peak season.",
      },
      {
        time: "09:30",
        title: "Noosa National Park coastal walk",
        detail:
          "Hastings Street entrance south to Boiling Pot and Dolphin Point. Continue to " +
          "Sunshine Beach if you have the legs (5.4 km one way). Verify the track is open on " +
          "the QPWS alerts page before you leave.",
      },
      {
        time: "13:00",
        title: "Long lunch",
        detail: "Bistro C or Sails on Hastings Street. Booking ahead on Saturdays is sensible.",
      },
      {
        time: "15:30",
        title: "Little Cove",
        detail: "Small, sheltered beach ten minutes' walk from Hastings Street. Patrolled in summer.",
      },
      {
        time: "19:30",
        title: "Dinner",
        detail: "Locale (handmade pasta) or Ricky Olivares (river-side, chef-owned, book ahead).",
      },
    ],
  },
  {
    day: "Day 2",
    theme: "Noosaville — the river",
    schedule: [
      {
        time: "09:00",
        title: "Noosa Ferry — upriver",
        detail:
          "Hilton Esplanade ferry terminal. One-way to Noosa North Shore takes about 25 " +
          "minutes; ferry runs every 30 minutes in peak season. Cash and card on board.",
      },
      {
        time: "10:30",
        title: "Noosa Everglades",
        detail:
          "Connect to Everglades EcoCruises at Noosa North Shore. Half-day or full-day cruise " +
          "into the upper Noosa River system. Calm water, birdlife, no swell.",
      },
      {
        time: "15:00",
        title: "Lunch — Noosaville",
        detail: "Ricky's (chef-owned), Maison's (garden setting) or Wood Fire Pizza for casual.",
      },
      {
        time: "17:00",
        title: "River foreshore walk",
        detail: "Flat, paved walk along Gympie Terrace — five kilometres one way to Tewantin if you've got it.",
      },
      {
        time: "19:30",
        title: "Dinner",
        detail: "Gusto in Noosaville for generous Italian share plates.",
      },
    ],
  },
  {
    day: "Day 3",
    theme: "Coolum and Maroochydore — north",
    schedule: [
      {
        time: "08:30",
        title: "Drive north to Coolum (20 minutes)",
        detail:
          "Coolum is the next patrolled beach north of Peregian. Long, north-facing, " +
          "excellent for an early swim before the wind picks up.",
      },
      {
        time: "09:30",
        title: "Coolum coastal walk",
        detail:
          "Point Perry lookout at the north end of Coolum beach is a short walk with views " +
          "up and down the coast. The main beach is patrolled year-round.",
      },
      {
        time: "11:30",
        title: "Drive to Mooloolaba / Maroochydore",
        detail:
          "Twenty minutes further north. Mooloolaba is the marina side; Maroochydore is the " +
          "river-side town with the Cotton Tree park at its mouth. Walk the river mouth.",
      },
      {
        time: "13:00",
        title: "Lunch — Mooloolaba",
        detail:
          "Mooloolaba Esplanade has the bulk of the dining. The Larder (modern Australian, " +
          "esplanade) or Blowfish Beach House for sushi and seafood with a view.",
      },
      {
        time: "15:30",
        title: "Cotton Tree or SEA LIFE",
        detail:
          "Cotton Tree is a quiet park at the Maroochy river mouth — flat, family-friendly. " +
          "SEA LIFE Sunshine Coast aquarium is on the Mooloolaba wharf if the kids want " +
          "shelter from the sun.",
      },
      {
        time: "18:30",
        title: "Sunset at Cotton Tree",
        detail: "Walk the river mouth at golden hour. Quiet, locals' spot.",
      },
      {
        time: "19:30",
        title: "Dinner — back in Noosa or in Mooloolaba",
        detail: "If you've driven back, dine on Hastings Street. If you've stayed up north, " +
          "the Mooloolaba Esplanade has plenty of choices.",
      },
    ],
  },
  {
    day: "Day 4",
    theme: "Cooran and Pomona — the hinterland",
    schedule: [
      {
        time: "08:00",
        title: "Drive to Cooran (35 minutes)",
        detail:
          "West of Noosa, into the hinterland. Cooran is a small town on the rail line to " +
          "Gympie; quiet, slow, very different energy to the coast.",
      },
      {
        time: "09:00",
        title: "Mt Cooran (Cooran Tablelands)",
        detail:
          "The Cooran Tableland walk is a moderate climb through rainforest and open " +
          "eucalypt to a granite peak with views to the coast. Allow 3 hours return, take " +
          "water. Track access is via private land — check with the Noosa council or the " +
          "local walking group before setting out.",
      },
      {
        time: "13:00",
        title: "Lunch — Pomona",
        detail:
          "Five minutes' drive from Cooran. The Imperial Hotel (Pomona Hotel) is a heritage " +
          "pub with classic country pub food. Sit on the verandah.",
      },
      {
        time: "14:30",
        title: "Pomona walk or river",
        detail:
          "Pomona is the gateway to Mount Pinbarren National Park — short walks to the " +
          "summit through rainforest (2 km return, allow 90 minutes). Easier option: walk " +
          "the Noosa Trail Network loops around the town.",
      },
      {
        time: "16:30",
        title: "Sunset at the coast",
        detail: "Drive back to Noosa Heads for sunset on the headland (see day 1).",
      },
    ],
  },
];

const FAQ = [
  {
    q: "Is four days too long?",
    a: "Not at all. Four days lets you do the headland properly, spend a day on the river, " +
      "see the beaches north of Noosa, and get into the hinterland. Locals use a week without " +
      "running out of new things to do.",
  },
  {
    q: "Do I need a car for this itinerary?",
    a: "Yes — days 3 and 4 are not realistically walkable or bikeable from Noosa Heads. " +
      "Days 1 and 2 can be done without a car (Noosa has a local bus and the ferry).",
  },
  {
    q: "Where should I base myself?",
    a: "Noosa Heads is the simplest base — walking distance to day 1, short drive to days 2, " +
      "3 and 4. Noosaville is a quieter alternative, slightly further from the headland.",
  },
  {
    q: "Is Mt Cooran a hard walk?",
    a: "It's a moderate climb with some steep sections — not technical but a steady uphill " +
      "for the first half. Take water, wear proper shoes. The summit is exposed and can be " +
      "windy.",
  },
  {
    q: "Can I skip the hinterland day?",
    a: "Yes — see the weekend itinerary for the river-and-headland version. The hinterland " +
      "is what makes four days different from two.",
  },
];

export default function FourDaysPage() {
  const baseUrl = SITE.productionUrl;
  const marineSrc = sourceById("bom-marine");
  const ferrySrc = sourceById("noosa-ferry");
  const evergladesSrc = sourceById("everglades-ecocruises");
  const qpwsSrc = sourceById("qpws-alerts");

  const marine = (bomMarine as any).data;
  const day3Period = marine?.periods?.[2];
  const marineFetchedAt = (bomMarine as any).fetchedAt;

  return (
    <>
      <ArticleLd
        url={`${baseUrl}/itineraries/four-days`}
        headline="Four days in Noosa — headland, river, north beaches and hinterland"
        description="Four days, four different halves of the Sunshine Coast: Noosa Heads, Noosaville, Coolum/Maroochydore, Cooran/Pomona."
        datePublished="2026-08-24"
        imageUrl={`${baseUrl}/images/noosa/noosa_hastings_street_hero.jpg`}
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Itineraries", url: `${baseUrl}/itineraries` },
          { name: "Four days in Noosa", url: `${baseUrl}/itineraries/four-days` },
        ]}
      />
      <FaqLd qa={FAQ} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Itineraries", href: "/itineraries" },
          { label: "Four days in Noosa" },
        ]}
      />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Itinerary · 4 days</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">Four days in Noosa</h1>
        <p className="lead mt-3 max-w-3xl">
          Four days lets you see all four halves of the Sunshine Coast from a Noosa base: the
          Noosa Heads headland, the Noosa River, the beaches north to Coolum and Maroochydore,
          and the hinterland towns of Cooran and Pomona.
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
        filename="noosa_pomona.jpg"
        alt="Pomona in the Noosa hinterland — heritage pub town and gateway to Mount Pinbarren National Park"
        variant="hero"
        className="container-page rounded-2xl overflow-hidden mb-12"
        priority
      />

      {/* DAYS 1 + 2 */}
      {DAYS.slice(0, 2).map((d, di) => (
        <section key={d.day} className={`section ${di % 2 === 0 ? "container-page" : "bg-parchment-100"}`}>
          <div className={di % 2 === 0 ? "" : "container-page"}>
            <h2 className="font-serif text-2xl md:text-3xl">{d.day} — {d.theme}</h2>
            <ol className="mt-8 space-y-8 max-w-3xl">
              {d.schedule.map((step, i) => (
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
            {di === 0 && (
              <p className="mt-6 max-w-3xl text-sm text-parchment-700">
                Verify current park conditions before the coastal walk —{" "}
                <a href={qpwsSrc?.url} target="_blank" rel="noopener noreferrer" className="link">
                  QPWS Noosa alerts
                </a>.
              </p>
            )}
          </div>
        </section>
      ))}

      {/* MARINE — day 3 forecast */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">Day 3 — Coolum and Maroochydore (north)</h2>
        <p className="mt-3 max-w-3xl text-parchment-700">
          Day 3 is the longest drive. The BOM coastal waters forecast still covers the beaches
          north of Noosa — useful for deciding between the sheltered Mooloolaba harbour and the
          open Coolum beach.
        </p>
        {day3Period ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-3 max-w-3xl">
            <div className="card">
              <div className="card-body">
                <p className="text-xs uppercase tracking-wider text-parchment-500">Wind</p>
                <p className="mt-1 font-serif text-lg">{day3Period.forecast_winds}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <p className="text-xs uppercase tracking-wider text-parchment-500">Seas</p>
                <p className="mt-1 font-serif text-lg">{day3Period.forecast_seas}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <p className="text-xs uppercase tracking-wider text-parchment-500">Weather</p>
                <p className="mt-1 font-serif text-lg">{day3Period.forecast_weather}</p>
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
        <ol className="mt-10 space-y-8 max-w-3xl">
          {DAYS[2].schedule.map((step, i) => (
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

      {/* DAY 4 */}
      <section className="section bg-parchment-100">
        <div className="container-page">
          <h2 className="font-serif text-2xl md:text-3xl">{DAYS[3].day} — {DAYS[3].theme}</h2>
          <p className="mt-3 max-w-3xl text-parchment-700">
            The hinterland is the half most first-time visitors skip. Quiet towns, rainforest
            walks, a heritage pub lunch — a slow reset after three days on the coast.
          </p>
          <ol className="mt-8 space-y-8 max-w-3xl">
            {DAYS[3].schedule.map((step, i) => (
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
          <div className="callout-warn mt-6 max-w-3xl">
            <p className="font-semibold text-parchment-900">Verify before walking — QPWS safety</p>
            <p className="mt-1 text-sm">
              Mt Pinbarren and Cooran Tablelands cross private land and state forest. Verify the
              current access and track conditions on the{" "}
              <a href={qpwsSrc?.url} target="_blank" rel="noopener noreferrer" className="link">
                QPWS alerts page
              </a>{" "}before you drive out. Carry water, tell someone your plan.
            </p>
          </div>
        </div>
      </section>

      {/* OPERATORS — ferry/Everglades same as weekend */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">Booking — day 2 on the river</h2>
        <p className="mt-3 max-w-3xl text-parchment-700">
          Two operators you'll need for day 2: the ferry upriver and the Everglades cruise.
          Book the cruise ahead in peak season; the ferry is walk-up.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2 max-w-4xl">
          <article className="card">
            <div className="card-body">
              <h3 className="font-serif text-lg">Noosa North Shore Ferries</h3>
              <p className="mt-2 text-sm text-parchment-700">
                The river ferry between Noosaville and Noosa North Shore. Every 30 minutes
                in peak season.
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
          <Link href="/itineraries/weekend" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">A Noosa weekend</h3>
              <p className="mt-2 text-sm text-parchment-700">Two days: headland and river.</p>
            </div>
          </Link>
          <Link href="/itineraries/one-day" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">One day in Noosa</h3>
              <p className="mt-2 text-sm text-parchment-700">The single-day plan.</p>
            </div>
          </Link>
          <Link href="/places/peregian" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Peregian Beach</h3>
              <p className="mt-2 text-sm text-parchment-700">Between Noosa and Coolum.</p>
            </div>
          </Link>
          <Link href="/hikes" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Hikes</h3>
              <p className="mt-2 text-sm text-parchment-700">Five Noosa walks.</p>
            </div>
          </Link>
          <Link href="/eat-drink" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Eat &amp; drink</h3>
              <p className="mt-2 text-sm text-parchment-700">Verified restaurants by area.</p>
            </div>
          </Link>
          <Link href="/where-to-stay" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Where to stay</h3>
              <p className="mt-2 text-sm text-parchment-700">Base yourself for four days.</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}