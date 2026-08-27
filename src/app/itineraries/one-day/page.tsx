import Link from "next/link";
import { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AffiliateLink } from "@/components/AffiliateLink";
import { ArticleLd, BreadcrumbLd, FaqLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/sources";
import bomMarine from "@/data/live/bom-marine.json";
import bomForecast from "@/data/live/bom-noosa-forecast.json";
import qpwsAlerts from "@/data/live/qpws-noosa-alerts.json";

export const metadata: Metadata = {
  title: "One day in Noosa — a tested 24-hour itinerary",
  description:
    "A tested one-day Noosa itinerary: sunrise at Main Beach, Hastings Street breakfast, " +
    "Noosa National Park headland walk, river ferry, sunset on the headland, dinner. Real " +
    "venues, current BOM and QPWS references.",
  alternates: { canonical: "/itineraries/one-day" },
};

const DISCLOSURE =
  "Itineraries are recommendations, not guarantees. Conditions change — tides, weather, " +
  "track closures. Always check current BOM and QPWS information before setting out.";

// Day plan — real venues with verifiable websites.
const SCHEDULE: { time: string; title: string; detail: string }[] = [
  {
    time: "06:30",
    title: "Sunrise at Main Beach",
    detail:
      "Get there before 7am in summer (later in winter). The patrolled flags go up at 8am; " +
      "swim between the flags once they're out. The beach faces north-east — early light is " +
      "kindest on the headland.",
  },
  {
    time: "08:00",
    title: "Breakfast on Hastings Street",
    detail:
      "Cafe Le Monde has been a Noosa institution since the 1970s (outdoor tables, expect a " +
      "queue at 8am). Aromas is the quieter, more substantial option if you want a long breakfast.",
  },
  {
    time: "09:30",
    title: "Noosa National Park — headland walk",
    detail:
      "Walk from the Hastings Street entrance south to Boiling Pot and Dolphin Point (about " +
      "1.5 km return). If you're steady on your feet, continue to Sunshine Beach (5.4 km one " +
      "way, allow 2.5–3 hours). Dolphins are most often seen from these lookouts.",
  },
  {
    time: "13:00",
    title: "Lunch — Hastings Street or Noosaville",
    detail:
      "If you're still on Hastings Street, Bistro C and Sails Restaurant both do long lunches " +
      "with a beach view (book ahead in peak season). If you've walked to Sunshine Beach, " +
      "The Boat Shed does a quiet lunch right on the sand.",
  },
  {
    time: "15:30",
    title: "River slow-down — ferry to North Shore",
    detail:
      "Walk or catch a short bus to the Noosa Ferry terminal at Hilton Esplanade, Noosaville. " +
      "The ferry runs upriver to Noosa North Shore — slow water, calm, very different energy " +
      "to the headland in the morning.",
  },
  {
    time: "17:30",
    title: "Sunset on the headland",
    detail:
      "Back to Noosa Heads for sunset. Little Cove is sheltered; the Laguna Bay lookout above " +
      "it gets the colour first. Stay for the green flash if you're lucky.",
  },
  {
    time: "19:30",
    title: "Dinner",
    detail:
      "Locale (handmade pasta, Hastings Street) or Ricky Olivares (river-side, Noosaville, " +
      "book ahead). Reserve in peak season — Saturdays fill a week out.",
  },
];

const FAQ = [
  {
    q: "Can you drive in from Brisbane or the Gold Coast in the morning?",
    a: "Yes. From Brisbane CBD it's about 1h 45m via the M1 and Eumundi–Noosa Road. From the " +
      "Gold Coast allow 2h 30m. Leave before 5am and you'll make sunrise.",
  },
  {
    q: "Do I need a 4WD?",
    a: "No — everything in this itinerary is accessible by standard car. Parking in Noosa " +
      "Heads is metered; the Noosa Council page lists current rates.",
  },
  {
    q: "Is the national park walk safe with kids?",
    a: "The first 1 km of the coastal walk (to Boiling Pot) is wide, flat and suitable for " +
      "strollers. Past Boiling Pot the track has cliff edges — hold hands with small children " +
      "and stay on the marked path.",
  },
  {
    q: "What's the best time of year for this itinerary?",
    a: "April to September. The water is cooler but the days are clear and the crowds thinner. " +
      "Whale season (June–November) is a bonus — you'll almost certainly see humpbacks from " +
      "the headland lookouts.",
  },
  {
    q: "What if it rains?",
    a: "Swap the national park walk for the Noosa Ferry round trip and the Noosa Main Beach " +
      "aquarium. The aquarium is small and sheltered — about 90 minutes for a thorough visit.",
  },
];

export default function OneDayPage() {
  const baseUrl = SITE.productionUrl;
  const marineSrc = sourceById("bom-marine");
  const bomSrc = sourceById("bom-noosa-forecast");
  const qpwsSrc = sourceById("qpws-alerts");

  const marine = (bomMarine as any).data;
  const forecast = (bomForecast as any).data;

  // First-period summary — pulled from the existing refresh-data.ts snapshot.
  const firstPeriod = marine?.periods?.[0];
  const today = forecast?.daily?.time?.[0];
  const todayMax = forecast?.daily?.temperature_2m_max?.[0];
  const todayMin = forecast?.daily?.temperature_2m_min?.[0];
  const marineFetchedAt = (bomMarine as any).fetchedAt;
  const bomFetchedAt = (bomForecast as any).fetchedAt;
  const alertsFetchedAt = (qpwsAlerts as any).fetchedAt;

  return (
    <>
      <ArticleLd
        url={`${baseUrl}/itineraries/one-day`}
        headline="One day in Noosa — a tested 24-hour itinerary"
        description="Sunrise at Main Beach, Hastings Street breakfast, Noosa National Park headland walk, sunset on the headland, dinner."
        datePublished="2026-08-24"
        imageUrl={`${baseUrl}/images/noosa/noosa_main_beach_hero.jpg`}
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Itineraries", url: `${baseUrl}/itineraries` },
          { name: "One day in Noosa", url: `${baseUrl}/itineraries/one-day` },
        ]}
      />
      <FaqLd qa={FAQ} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Itineraries", href: "/itineraries" },
          { label: "One day in Noosa" },
        ]}
      />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Itinerary · 1 day</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">One day in Noosa</h1>
        <p className="lead mt-3 max-w-3xl">
          Twenty-four hours, well spent. Drive in early, swim at sunrise, walk the headland,
          and finish with sunset drinks over Laguna Bay. This is the itinerary locals give
          friends who arrive for a single weekend.
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
        filename="noosa_main_beach.jpg"
        alt="Main Beach Noosa Heads at sunrise — patrolled north-facing beach at the end of Hastings Street"
        variant="hero"
        className="container-page rounded-2xl overflow-hidden mb-12"
        priority
      />

      {/* SCHEDULE */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">The day, hour by hour</h2>
        <p className="mt-3 max-w-3xl text-sm text-parchment-700">
          Times are a starting point, not a contract. Move things around to match the season,
          the weather and the people you're with.
        </p>
        <ol className="mt-8 space-y-8 max-w-3xl">
          {SCHEDULE.map((step, i) => (
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

      {/* LIVE WEATHER STRIP — BOM marine + Open-Meteo snapshot */}
      <section className="section bg-parchment-100">
        <div className="container-page">
          <h2 className="font-serif text-2xl md:text-3xl">What the ocean is doing today</h2>
          <p className="mt-3 max-w-3xl text-parchment-700">
            Conditions pulled from the BOM coastal waters forecast for the Sunshine Coast " +
            "and the Open-Meteo current snapshot for Noosa Heads. If the wind is up or the " +
            "swell has filled in, walk the sheltered Palm Grove circuit instead of the " +
            "headland.
          </p>
          {firstPeriod ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl">
              <div className="card">
                <div className="card-body">
                  <p className="text-xs uppercase tracking-wider text-parchment-500">Wind</p>
                  <p className="mt-1 font-serif text-lg">{firstPeriod.forecast_winds}</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <p className="text-xs uppercase tracking-wider text-parchment-500">Seas</p>
                  <p className="mt-1 font-serif text-lg">{firstPeriod.forecast_seas}</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <p className="text-xs uppercase tracking-wider text-parchment-500">Swell</p>
                  <p className="mt-1 font-serif text-base">
                    {firstPeriod.forecast_swell1}
                    {firstPeriod.forecast_swell2 ? ` ${firstPeriod.forecast_swell2}` : ""}
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <p className="text-xs uppercase tracking-wider text-parchment-500">Air</p>
                  <p className="mt-1 font-serif text-lg">
                    {today ? `${today}: ` : ""}
                    {todayMax !== undefined ? `${Math.round(todayMax)}°C / ` : ""}
                    {todayMin !== undefined ? `${Math.round(todayMin)}°C` : ""}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-parchment-700">Marine snapshot unavailable — check BOM directly.</p>
          )}
          <p className="mt-4 text-xs text-parchment-500">
            Sources:{" "}
            <a href={marineSrc?.url} target="_blank" rel="noopener noreferrer" className="link">
              {marineSrc?.title}
            </a>
            {" · "}
            <a href={bomSrc?.url} target="_blank" rel="noopener noreferrer" className="link">
              {bomSrc?.title}
            </a>
            {" — "}fetched{" "}
            {new Date(marineFetchedAt).toLocaleString("en-AU", { timeZone: "Australia/Brisbane" })} AEST
            {" · "}
            {new Date(bomFetchedAt).toLocaleString("en-AU", { timeZone: "Australia/Brisbane" })} AEST
            {" · "}refreshed by <code>npm run data:refresh</code>.
          </p>
        </div>
      </section>

      {/* NATIONAL PARK SAFETY — QPWS source */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">National park — read before you walk</h2>
        <div className="mt-4 max-w-3xl space-y-3 text-parchment-800">
          <p>
            The coastal walk is one of Australia's best short walks, but it is a national park
            and the conditions change. QPWS closes sections of the track after heavy rain,
            king tides, and for wildlife management — sometimes with little notice.
          </p>
          <ul className="space-y-2">
            <li className="flex gap-3"><span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-coral-500" aria-hidden /><span>Start at the Hastings Street entrance. The track is one-way either direction; most people go south to Sunshine Beach.</span></li>
            <li className="flex gap-3"><span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-coral-500" aria-hidden /><span>No swimming between Boiling Pot and Dolphin Point — currents are unpredictable.</span></li>
            <li className="flex gap-3"><span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-coral-500" aria-hidden /><span>Take water, hat, sunscreen. There is no shop on the track.</span></li>
            <li className="flex gap-3"><span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-coral-500" aria-hidden /><span>Watch edges with small children past Boiling Pot.</span></li>
          </ul>
          <div className="callout-warn mt-4">
            <p className="font-semibold text-parchment-900">Verify before walking</p>
            <p className="mt-1 text-sm">
              Check the current alerts page before setting out:{" "}
              <a href={qpwsSrc?.url} target="_blank" rel="noopener noreferrer" className="link">
                QPWS — current Noosa alerts and track closures
              </a>
              . Last automated check{" "}
              {new Date(alertsFetchedAt).toLocaleString("en-AU", { timeZone: "Australia/Brisbane" })} AEST
              {(qpwsAlerts as any).status !== "ok" && (
                <span className="ml-1 text-parchment-500">
                  (QPWS feed was unavailable at last refresh — the official page above is authoritative)
                </span>
              )}.
            </p>
          </div>
        </div>
      </section>

      {/* STAY — affiliate disclosure + non-affiliate link */}
      <section className="section bg-parchment-100">
        <div className="container-page">
          <h2 className="font-serif text-2xl md:text-3xl">If you're staying one night</h2>
          <p className="mt-3 max-w-3xl text-parchment-700">
            The closest accommodation to this itinerary is in Noosa Heads itself — walking
            distance to the beach, Hastings Street and the national park entrance. Use the
            Where-to-stay guide to compare areas.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/where-to-stay" className="btn btn-primary">
              Where to stay in Noosa →
            </Link>
            <AffiliateLink partner="booking" className="btn btn-outline">
              Search accommodation
            </AffiliateLink>
            <a href={bomSrc?.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              BOM Noosa Heads forecast →
            </a>
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
          <Link href="/itineraries/weekend" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">A Noosa weekend (2 days)</h3>
              <p className="mt-2 text-sm text-parchment-700">
                Add a day on the river — Noosaville ferry, Everglades, Sunday markets.
              </p>
            </div>
          </Link>
          <Link href="/national-park" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Noosa National Park</h3>
              <p className="mt-2 text-sm text-parchment-700">
                Walks, lookouts, wildlife seasons, current QPWS alerts.
              </p>
            </div>
          </Link>
          <Link href="/eat-drink" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Eat &amp; drink</h3>
              <p className="mt-2 text-sm text-parchment-700">
                Verified restaurants across Hastings Street, Noosaville and the hinterland.
              </p>
            </div>
          </Link>
          <Link href="/surf-weather" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Surf &amp; weather</h3>
              <p className="mt-2 text-sm text-parchment-700">
                BOM forecast for Noosa Heads, with timestamps and source attribution.
              </p>
            </div>
          </Link>
          <Link href="/where-to-stay" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Where to stay</h3>
              <p className="mt-2 text-sm text-parchment-700">
                Compare Noosa Heads, Noosaville, Sunshine Beach and Peregian.
              </p>
            </div>
          </Link>
          <Link href="/itineraries/fraser-island" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Fraser Island / K&apos;gari</h3>
              <p className="mt-2 text-sm text-parchment-700">
                Operators, permits and safety for a K&apos;gari day-trip.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}