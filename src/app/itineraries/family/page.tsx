import Link from "next/link";
import { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AffiliateLink } from "@/components/AffiliateLink";
import { ArticleLd, BreadcrumbLd, FaqLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/sources";
import bomMarine from "@/data/live/bom-marine.json";
import qpwsAlerts from "@/data/live/qpws-noosa-alerts.json";

export const metadata: Metadata = {
  title: "Noosa with kids — family-friendly itinerary, 3 to 5 days",
  description:
    "A family itinerary for Noosa: patrolled beaches, stroller-friendly walks, Noosa " +
    "aquarium, kids' cafes, calm-water river activities, slow pace. Real venues, current sources.",
  alternates: { canonical: "/itineraries/family" },
};

const DISCLOSURE =
  "Itineraries are recommendations, not guarantees. Conditions change — tides, weather, " +
  "track closures. Always check current BOM and QPWS information before setting out.";

const DAYS: { day: string; theme: string; schedule: { time: string; title: string; detail: string }[] }[] = [
  {
    day: "Day 1",
    theme: "Arrival — settle in, beach afternoon",
    schedule: [
      {
        time: "Midday",
        title: "Arrive, stock up, head to the beach",
        detail:
          "Settle in at your accommodation. Drive to Main Beach Noosa Heads — patrolled year-round " +
          "between the red-and-yellow flags. Lifeguards are on duty from 8am most days (later in winter).",
      },
      {
        time: "13:00",
        title: "Swim and sand",
        detail:
          "Main Beach faces north-east with no rips close to shore in normal conditions. The " +
          "patrolled area is at the southern end of the beach nearest Hastings Street.",
      },
      {
        time: "16:00",
        title: "Shade and ice cream",
        detail:
          "Betty's Burgers on Hastings Street is family-friendly and has high chairs. For " +
          "ice cream, Happy Pops or Noosa Chocolate Factory — both on Hastings Street.",
      },
      {
        time: "19:00",
        title: "Easy dinner",
        detail:
          "Sails Restaurant has a casual family menu and is used to kids. Massimo's for " +
          "wood-fired pizza and a relaxed vibe. Book ahead.",
      },
    ],
  },
  {
    day: "Day 2",
    theme: "Beach morning, aquarium, river",
    schedule: [
      {
        time: "08:00",
        title: "Sunrise swim — Little Cove",
        detail:
          "Smaller and more sheltered than Main Beach. Easier to keep an eye on small " +
          "swimmers. Patrolled in summer.",
      },
      {
        time: "10:00",
        title: "Noosa Main Beach aquarium",
        detail:
          "The aquarium is small, sheltered, and about 90 minutes for a thorough visit. Great " +
          "for younger children and a reliable rainy-day option.",
      },
      {
        time: "13:00",
        title: "Lunch — Hastings Street",
        detail:
          "Cafe Le Monde has high chairs and a relaxed atmosphere. Aromas has a kid menu and " +
          "outdoor tables.",
      },
      {
        time: "15:00",
        title: "Noosa River ferry — calm water",
        detail:
          "Ferry from Noosaville to Noosa North Shore. The river is sheltered — much calmer " +
          "than the open beach and good for kids who want to look at the water without waves.",
      },
      {
        time: "18:00",
        title: "Noosaville dinner",
        detail:
          "Gusto or Wood Fire Pizza — both family-friendly, with kids' menus and outdoor seating.",
      },
    ],
  },
  {
    day: "Day 3",
    theme: "National park — easy walks",
    schedule: [
      {
        time: "08:30",
        title: "Breakfast — Sunshine Beach",
        detail:
          "Chalet & Co is a locals' favourite café with a relaxed pace, kid-friendly, and " +
          "excellent coffee for the adults.",
      },
      {
        time: "10:00",
        title: "Palm Grove Circuit",
        detail:
          "Rainforest walk in Noosa National Park. 2.7 km loop, 45 minutes, flat, stroller-" +
          "friendly on the boardwalk sections. Shaded — a relief in summer.",
      },
      {
        time: "12:30",
        title: "Lunch in Noosa Junction",
        detail:
          "Noosa Junction is the commercial centre a few minutes back from Hastings Street. " +
          "Several family-friendly options, easy parking, and the Noosa Library if you need " +
          "an indoor break.",
      },
      {
        time: "14:30",
        title: "Coastal walk — first kilometre only",
        detail:
          "From the Hastings Street entrance to Boiling Pot is wide, flat and stroller-friendly. " +
          "Beyond Boiling Pot the track has cliff edges — turn around there with small kids.",
      },
      {
        time: "17:00",
        title: "Sunset at the beach",
        detail: "Main Beach again, low-key, ice cream, sandcastles in the late light.",
      },
    ],
  },
  {
    day: "Day 4",
    theme: "River day — Noosaville and Tewantin",
    schedule: [
      {
        time: "09:00",
        title: "Noosa Farmers Market (Sunday)",
        detail:
          "If you're here on a Sunday, the Noosa Farmers Market runs at the AFL grounds on " +
          "Weyba Road from 7am to noon. Local produce, food stalls, live music. Pushchair-friendly.",
      },
      {
        time: "11:00",
        title: "Noosa River foreshore — playground",
        detail:
          "The Noosa River playground on Gympie Terrace is large, fenced, and shaded. " +
          "Adjacent café for the adults.",
      },
      {
        time: "13:00",
        title: "Lunch — Noosaville",
        detail:
          "Maison's (garden setting, classic French technique) or Ricky's if you want the " +
          "chef's tasting. Both kid-tolerant.",
      },
      {
        time: "15:00",
        title: "Calm-water activity",
        detail:
          "Options: stand-up paddle on the river (Noosa Stand Up Paddle, lessons and " +
          "guided tours), a slow ferry loop, or a hire boat from Noosa Marina or Noosaville " +
          "for an hour. The river mouth is sheltered and shallow.",
      },
      {
        time: "17:30",
        title: "Sunset at Tewantin",
        detail:
          "Five minutes' drive upriver from Noosaville. Quiet park on the riverbank, ice " +
          "creams, walk-off-the-pizza.",
      },
    ],
  },
  {
    day: "Day 5 (optional)",
    theme: "Slower day — pick your favourite",
    schedule: [
      {
        time: "Morning",
        title: "Repeat the favourite beach",
        detail:
          "By day 5 you'll know which beach the family likes best. Go back. Main Beach for " +
          "facilities, Little Cove for quiet, Sunshine Beach for patrolled + café.",
      },
      {
        time: "Lunch",
        title: "Slow lunch",
        detail:
          "Bistro C for the special-occasion long lunch, or Massimo's for pizza the kids " +
          "already love.",
      },
      {
        time: "Afternoon",
        title: "One last swim",
        detail:
          "End the trip where you started — Main Beach, patrolled flags, late-afternoon " +
          "light on the headland.",
      },
    ],
  },
];

const SAFETY = [
  "Always swim between the red-and-yellow flags. Main Beach, Little Cove and Sunshine Beach are patrolled in summer.",
  "No swimming between Boiling Pot and Dolphin Point — currents on the headland are unpredictable.",
  "Keep an eye on the flags: a red flag means the lifeguards have closed the beach. Trust them.",
  "Noosa National Park is wildlife habitat. Do not feed the ducks, kookaburras or bush turkeys — they become aggressive.",
  "Sun protection is non-negotiable. The UV index regularly hits 12+ in summer. SPF 50, hat, rashie, reapply.",
  "If you hire a boat, the operator runs through the local rules — speed limits, no-wake zones, sandbars.",
];

const FAQ = [
  {
    q: "Which beach is best for small kids?",
    a: "Main Beach Noosa Heads is the easiest — patrolled, facilities on-site, gentle slope. " +
      "Little Cove is smaller and more sheltered. Sunshine Beach is the next patrolled beach " +
      "south, also good for kids.",
  },
  {
    q: "Are the national park walks stroller-friendly?",
    a: "The Palm Grove Circuit has boardwalk sections suitable for all-terrain strollers. " +
      "The first kilometre of the coastal walk (Hastings Street entrance to Boiling Pot) is " +
      "wide and flat. Beyond that, the track has steps and uneven surfaces — use a carrier.",
  },
  {
    q: "Is the Noosa aquarium suitable for toddlers?",
    a: "Yes — it's small, fully indoor, and most of the displays are at child eye-level. " +
      "Allow about 90 minutes for a thorough visit with a toddler.",
  },
  {
    q: "Can we hire a boat with kids?",
    a: "Yes — most Noosa boat hire operators welcome families. The river is sheltered with " +
      "speed limits and no-wake zones. Operators run a safety briefing before you leave " +
      "the marina.",
  },
  {
    q: "What if it rains for a day?",
    a: "The Noosa Main Beach aquarium is small but covers a morning. The Noosa Library in " +
      "Noosa Junction is modern and has a children's section. The Noosa Cinema in Noosa " +
      "Junction runs first-release movies in air-conditioned comfort.",
  },
];

export default function FamilyPage() {
  const baseUrl = SITE.productionUrl;
  const marineSrc = sourceById("bom-marine");
  const qpwsSrc = sourceById("qpws-alerts");
  const marine = (bomMarine as any).data;
  const firstPeriod = marine?.periods?.[0];
  const marineFetchedAt = (bomMarine as any).fetchedAt;
  const alertsFetchedAt = (qpwsAlerts as any).fetchedAt;

  return (
    <>
      <ArticleLd
        url={`${baseUrl}/itineraries/family`}
        headline="Noosa with kids — a family-friendly itinerary"
        description="Patrolled beaches, stroller-friendly walks, Noosa aquarium, kids' cafes, calm-water river activities, slow pace."
        datePublished="2026-08-24"
        imageUrl={`${baseUrl}/images/noosa/noosa_river_foreshore_hero.jpg`}
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Itineraries", url: `${baseUrl}/itineraries` },
          { name: "Family trip", url: `${baseUrl}/itineraries/family` },
        ]}
      />
      <FaqLd qa={FAQ} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Itineraries", href: "/itineraries" },
          { label: "Family trip" },
        ]}
      />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Itinerary · Family</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">Noosa with kids</h1>
        <p className="lead mt-3 max-w-3xl">
          Three to five days, slow pace, beach mornings and river afternoons. Noosa works well
          for families because the beaches are patrolled, the river is calm, and the national
          park has shaded walks the kids can manage.
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
        filename="noosa_river_foreshore.jpg"
        alt="The Noosa River foreshore at Noosaville — calm water, playground, flat walking, family-friendly"
        variant="hero"
        className="container-page rounded-2xl overflow-hidden mb-12"
        priority
      />

      {/* BEACH + WATER SNAPSHOT — BOM marine */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">Today's surf and weather</h2>
        <p className="mt-3 max-w-3xl text-parchment-700">
          The BOM coastal waters forecast for the Sunshine Coast. Useful for deciding whether
          to swim at Main Beach or stick to the river mouth.
        </p>
        {firstPeriod ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-3 max-w-3xl">
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
                <p className="mt-1 font-serif text-base">{firstPeriod.forecast_swell1}</p>
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
      </section>

      {/* DAY-BY-DAY */}
      {DAYS.map((d, di) => (
        <section key={d.day} className={`section ${di % 2 === 0 ? "bg-parchment-100" : "container-page"}`}>
          <div className={di % 2 === 0 ? "container-page" : ""}>
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
          </div>
        </section>
      ))}

      {/* SAFETY */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">Family safety — non-negotiable</h2>
        <div className="mt-4 max-w-3xl">
          <ul className="space-y-2">
            {SAFETY.map((s, i) => (
              <li key={i} className="flex gap-3 text-parchment-800">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-coral-500" aria-hidden />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="callout-warn mt-6 max-w-3xl">
          <p className="font-semibold text-parchment-900">Verify before walking the headland</p>
          <p className="mt-1 text-sm">
            Noosa National Park track conditions change. Always check the{" "}
            <a href={qpwsSrc?.url} target="_blank" rel="noopener noreferrer" className="link">
              QPWS Noosa alerts page
            </a>{" "}
            before setting out. Last automated check{" "}
            {new Date(alertsFetchedAt).toLocaleString("en-AU", { timeZone: "Australia/Brisbane" })} AEST
            {(qpwsAlerts as any).status !== "ok" && (
              <span className="ml-1 text-parchment-500">
                (QPWS feed was unavailable at last refresh — the official page above is authoritative)
              </span>
            )}.
          </p>
        </div>
      </section>

      {/* WHERE TO STAY */}
      <section className="section bg-parchment-100">
        <div className="container-page">
          <h2 className="font-serif text-2xl md:text-3xl">Where to stay with kids</h2>
          <p className="mt-3 max-w-3xl text-parchment-700">
            Noosa Heads is walking distance to Main Beach and the national park entrance. " +
            "Noosaville is quieter, with the river playground at the doorstep. Both have " +
            "apartment options with kitchens.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/where-to-stay" className="btn btn-primary">
              Where to stay →
            </Link>
            <AffiliateLink partner="booking" className="btn btn-outline">
              Search family accommodation
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
          <Link href="/itineraries/weekend" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">A Noosa weekend</h3>
              <p className="mt-2 text-sm text-parchment-700">Two-day base plan.</p>
            </div>
          </Link>
          <Link href="/national-park" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Noosa National Park</h3>
              <p className="mt-2 text-sm text-parchment-700">Stroller-friendly walks.</p>
            </div>
          </Link>
          <Link href="/places/noosaville" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Noosaville</h3>
              <p className="mt-2 text-sm text-parchment-700">River-side, calm water.</p>
            </div>
          </Link>
          <Link href="/boat-hire" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Boat hire</h3>
              <p className="mt-2 text-sm text-parchment-700">Self-drive on the river.</p>
            </div>
          </Link>
          <Link href="/eat-drink" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Eat &amp; drink</h3>
              <p className="mt-2 text-sm text-parchment-700">Family-friendly picks.</p>
            </div>
          </Link>
          <Link href="/surf-weather" className="card hover:shadow-md transition">
            <div className="card-body">
              <h3 className="font-serif text-lg">Surf &amp; weather</h3>
              <p className="mt-2 text-sm text-parchment-700">Today's BOM forecast.</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}