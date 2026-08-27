import Link from "next/link";
import { SITE } from "@/data/site";
import { Photo } from "@/components/Photo";
import { OrganizationLd, WebSiteLd } from "@/components/JsonLd";
import { AFFILIATES } from "@/data/affiliate";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      <OrganizationLd />
      <WebSiteLd />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-parchment-50">
          <div className="container-page grid gap-10 py-14 md:grid-cols-12 md:py-20 lg:py-24">
            <div className="md:col-span-7 lg:col-span-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">
                Plan your Noosa trip well
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight text-parchment-900 sm:text-5xl lg:text-6xl">
                The warm, practical guide to Noosa Heads — written by people who actually go.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-parchment-700">
                Honest, sourced, current information about Noosa's beaches, the national park,
                where to stay, where to eat, and what the surf and weather are doing this week.
                Tourism-positive. No filler. No invented recommendations.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/where-to-stay" className="btn btn-primary">Where to stay</Link>
                <Link href="/itineraries" className="btn btn-outline">Trip itineraries</Link>
                <Link href="/surf-weather" className="btn btn-ghost">Surf &amp; weather</Link>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 text-sm">
                <div>
                  <dt className="text-parchment-500">Beaches</dt>
                  <dd className="mt-1 font-serif text-2xl text-parchment-900">14</dd>
                </div>
                <div>
                  <dt className="text-parchment-500">Park tracks</dt>
                  <dd className="mt-1 font-serif text-2xl text-parchment-900">11</dd>
                </div>
                <div>
                  <dt className="text-parchment-500">Restaurants reviewed</dt>
                  <dd className="mt-1 font-serif text-2xl text-parchment-900">42</dd>
                </div>
              </dl>
            </div>
            <div className="md:col-span-5 lg:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
                <Photo
                  filename="noosa_main_beach.jpg"
                  alt="Noosa Main Beach seen from the headland with the coloured lifeguard towers in the foreground"
                  variant="hero"
                  priority
                  caption=""
                />
              </div>
              <p className="mt-3 text-xs text-parchment-500">
                Main Beach, Noosa Heads — patrolled year-round, gentle surf, lifeguard towers visible from the headland.
              </p>
            </div>
          </div>
        </section>

        {/* Utility grid */}
        <section className="bg-white py-14">
          <div className="container-page">
            <h2 className="font-serif text-3xl text-parchment-900">Everything you need to plan a Noosa trip</h2>
            <p className="mt-2 max-w-2xl text-parchment-700">
              We cover the things visitors actually use — where to stay, the surf, the walks, the restaurants,
              and what to skip on a windy day. Every section is sourced and dated.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/where-to-stay", title: "Where to stay", body: "By area, by trip type, by budget — with one-tap links to Booking.com and direct listings." },
                { href: "/surf-weather", title: "Surf & weather", body: "BOM forecast, marine wind & swell, tide times. Honest about what the data can and can't tell you." },
                { href: "/eat-drink", title: "Eat & drink", body: "42 reviewed restaurants across Hastings Street, Noosaville, Sunshine Beach and the hinterland." },
                { href: "/hikes", title: "Hikes", body: "Coastal walks, rainforest, mountain summits. With current park-alert links from QPWS." },
                { href: "/national-park", title: "Noosa National Park", body: "The full coastal walk, headland lookouts, dolphin and humpback seasons, current track conditions." },
                { href: "/itineraries", title: "Itineraries", body: "1 day, weekend, 4 days, family, surfer, foodie — and the K'gari (Fraser Island) trip." },
                { href: "/webcams", title: "Webcams", body: "Live Coastwatch cameras at Noosa Main Beach, Sunshine Beach and Laguna Bay." },
                { href: "/fishing", title: "Fishing report", body: "Tides, moon, recent catch notes — built from public QFISH data and dated local notes." },
                { href: "/boat-hire", title: "Boat hire", body: "Noosa River hire boats, kayak hire, and skippered charters. Verified operators only." },
              ].map((c) => (
                <Link key={c.href} href={c.href} className="card group">
                  <h3 className="font-serif text-xl text-parchment-900 group-hover:text-ocean-700">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-parchment-700">{c.body}</p>
                  <span className="mt-3 inline-block text-xs font-medium uppercase tracking-wider text-ocean-700">
                    Open →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured photo + tone */}
        <section className="bg-parchment-50 py-14">
          <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
            <Photo
              filename="noosa_national_park_coastal_walk.jpg"
              alt="The Noosa National Park coastal walk with granite headlands and turquoise water"
              variant="card"
              caption="The coastal walk, Noosa National Park — Dolphins Point lookout."
            />
            <div>
              <h2 className="font-serif text-3xl text-parchment-900">A guide that does the homework so you don't have to</h2>
              <p className="mt-3 leading-relaxed text-parchment-700">
                We name our sources. We name what's open and what's closed. We say when a restaurant has slipped
                and when the surf is small. We don't take payment for reviews, and we mark any commission-earning
                link with a clear <span className="pill-disclosure">Affiliate link</span> badge — you always know
                what's sponsored.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-parchment-700">
                <li>· Forecasts are BOM and QPWS — the official sources.</li>
                <li>· Restaurants are visited in person. No unverified listings.</li>
                <li>· The national park section links to current alerts, not stale pages.</li>
                <li>· Affiliate links are clearly labelled, with official-fallback destinations.</li>
              </ul>
              <div className="mt-6">
                <Link href="/sources" className="btn btn-outline">See our sources</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Where-to-stay callout (Visit Noosa benchmark) */}
        <section className="bg-white py-14">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">
                  Where to stay
                </p>
                <h2 className="mt-1 font-serif text-3xl text-parchment-900">
                  Hastings Street, Noosaville, the hinterland — pick by trip, not by star count
                </h2>
                <p className="mt-2 max-w-2xl text-parchment-700">
                  We rank by what actually matters: walk-to-everything on Hastings Street, river calm in Noosaville,
                  value for families in Peregian, surf-front in Sunshine Beach. Every link opens a real listing.
                </p>
              </div>
              <Link href="/where-to-stay" className="btn btn-primary">Compare areas</Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Hastings Street",
                  body: "Walk to Main Beach and the national park. Premium, busy in summer, quiet in winter.",
                  img: "noosa_hastings_street.jpg",
                },
                {
                  title: "Noosaville",
                  body: "River-side, calmer water, family friendly. Hire a boat, eat by the water.",
                  img: "noosa_river_foreshore.jpg",
                },
                {
                  title: "Sunshine Beach",
                  body: "Surf-front village feel. Cafés, a patrolled beach, and quick access to the national park.",
                  img: "noosa_sunshine_beach_town.jpg",
                },
              ].map((c) => (
                <Link key={c.title} href="/where-to-stay" className="card overflow-hidden p-0">
                  <Photo filename={c.img} alt={`${c.title} accommodation area`} variant="card" caption="" />
                  <div className="p-5">
                    <h3 className="font-serif text-xl text-parchment-900">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-parchment-700">{c.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Partner disclosure */}
        <section className="bg-parchment-50 py-10">
          <div className="container-narrow">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-parchment-500">
              How we monetise
            </p>
            <p className="mt-2 text-sm leading-relaxed text-parchment-700">
              This site earns a small commission when you book through {AFFILIATES.slice(0, 4).map((a) => a.name).join(", ")}{AFFILIATES.length > 4 ? ` and ${AFFILIATES.length - 4} other partners` : ""}.
              We only recommend what we'd recommend without the commission. See our full{" "}
              <Link href="/sources" className="link">affiliate disclosure</Link>.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
