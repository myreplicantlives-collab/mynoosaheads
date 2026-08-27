import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbLd, FaqLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { affiliateUrl } from "@/data/affiliate";

export const metadata = {
  title: "Where to stay in Noosa",
  description:
    "Pick the right Noosa area for your trip — Hastings Street, Noosaville, Sunshine Beach, Peregian, the hinterland. Honest comparison, real listings, official Booking.com destinations.",
};

export const dynamic = "force-static";

const areas = [
  {
    slug: "hastings-street",
    name: "Hastings Street",
    vibe: "Walk to Main Beach, the national park, and the best restaurants on the strip.",
    bestFor: ["First-timers", "Couples", "Short stays", "No-car trips"],
    pros: [
      "30 seconds to Main Beach",
      "Walk to ~25 restaurants",
      "National park entrance at the end of the street",
      "Lively, busy in summer",
    ],
    cons: ["Most expensive area", "Noisy in peak season", "Limited parking"],
    img: "noosa_hastings_street.jpg",
    booking: "ss=Hastings+Street%2C+Noosa+Heads",
    summary:
      "The most walkable base in Noosa. If you've never been and you can afford it, stay here for the first two nights and use it as your launchpad.",
  },
  {
    slug: "noosaville",
    name: "Noosaville",
    vibe: "Calmer river-side, family friendly, hire a boat for the afternoon.",
    bestFor: ["Families", "Longer stays", "Self-caterers", "Boaters"],
    pros: [
      "Quieter at night",
      "Apartments with kitchens are common",
      "Walking distance to restaurants along the river",
      "Best base for hiring a boat or kayak",
    ],
    cons: ["20-minute walk or short drive to Main Beach", "Less nightlife"],
    img: "noosa_river_foreshore.jpg",
    booking: "ss=Noosaville",
    summary:
      "The value pick for families. Self-catering apartments on the river are the most comfortable base for a 5+ night stay.",
  },
  {
    slug: "sunshine-beach",
    name: "Sunshine Beach",
    vibe: "Surf-front village, locals' feel, great cafés.",
    bestFor: ["Surfers", "Repeat visitors", "Quieter stays"],
    pros: [
      "Patrolled beach, surf-front apartments",
      "5-minute drive to Hastings Street",
      "Cooler village feel — fewer tour groups",
      "Closer to the surf breaks at Sunshine and Sunrise",
    ],
    cons: ["Fewer walkable restaurants", "Steep walk from many apartments to the beach"],
    img: "noosa_sunshine_beach_town.jpg",
    booking: "ss=Sunshine+Beach",
    summary:
      "The locals' pick. A 5-minute drive south of Hastings Street, with a surf-front village feel and some of the best breakfast spots on the coast.",
  },
  {
    slug: "peregian",
    name: "Peregian Beach",
    vibe: "Small village 10 minutes north of Noosa, surf club, family beach.",
    bestFor: ["Families", "Quiet seekers", "Longer stays"],
    pros: [
      "Patrolled beach with a surf club",
      "Cheaper than Hastings Street",
      "Sunday Peregian Beach Markets",
      "10 minutes to Noosa, 10 minutes to Coolum",
    ],
    cons: ["Need a car", "Fewer restaurants on the beachfront"],
    img: "noosa_peregian_beach.jpg",
    booking: "ss=Peregian+Beach",
    summary:
      "If you want Noosa without the Noosa price, Peregian is the most underrated option. 10 minutes north, surf club, village feel.",
  },
  {
    slug: "hinterland",
    name: "Hinterland",
    vibe: "Pomona, Cooran, Kin Kin — quiet, leafy, mountain feel.",
    bestFor: ["Quiet seekers", "Hikers", "Writers", "Repeat visitors"],
    pros: [
      "Mountains, rainforest, real quiet",
      "Cheaper than the coast",
      "20–30 min drive to Noosa",
      "Best for a self-drive holiday",
    ],
    cons: ["You need a car", "Limited restaurants", "Cooler in winter"],
    img: "noosa_pomona.jpg",
    booking: "ss=Pomona%2C+Sunshine+Coast",
    summary:
      "If you have a car and want the quietest possible base, the hinterland is beautiful in autumn and spring.",
  },
];

const occasions = [
  {
    title: "First time, 3 nights",
    rec: "Hastings Street",
    body:
      "Walk to everything, use Noosa as your base for the K'gari day trip and the national park walks.",
  },
  {
    title: "Family, 7 nights",
    rec: "Noosaville",
    body:
      "Two-bedroom apartment on the river, a boat for a day, and an easy drive to Main Beach when you want surf.",
  },
  {
    title: "Couples, weekend",
    rec: "Hastings Street or Sunshine Beach",
    body:
      "Hastings Street for restaurant density; Sunshine Beach for a quieter village feel with great breakfast.",
  },
  {
    title: "Surfer, 5+ nights",
    rec: "Sunshine Beach",
    body:
      "Walking distance to the surf, away from the Hastings Street crowds, easy drive to the points.",
  },
  {
    title: "Quiet writers' week",
    rec: "Pomona or Cooran",
    body:
      "Hinterland cottage, a writing desk, and a 25-minute drive into Noosa when you want a beach day.",
  },
];

const faqs = [
  {
    q: "Where should I stay in Noosa for the first time?",
    a: "Hastings Street. It's the most walkable area, 30 seconds to Main Beach, and the entrance to Noosa National Park is at the end of the street. It's the most expensive area — but for a 2–3 night first visit it's the easiest base.",
  },
  {
    q: "Where should I stay in Noosa for a family?",
    a: "Noosaville. Two-bedroom river-side apartments are common, you can hire a boat for the day, and the river beach is calmer than the ocean for small kids. You'll need a car to get to Main Beach for surf lessons.",
  },
  {
    q: "Do I need a car in Noosa?",
    a: "If you stay on Hastings Street, no — most things are walkable and the Noosa Ferry runs along the river. If you stay in Noosaville, Sunshine Beach, Peregian or the hinterland, yes — public transport is limited.",
  },
  {
    q: "What's the cheapest area to stay in Noosa?",
    a: "Peregian Beach and the hinterland (Pomona, Cooran, Kin Kin) are noticeably cheaper than Hastings Street. The trade-off is you'll need a car.",
  },
  {
    q: "What's the best area for surfers?",
    a: "Sunshine Beach — walking distance to the surf, closer to the points at Noosa Heads, and quieter than Hastings Street. Sunrise Beach (just south) is also a strong option for apartment-only stays.",
  },
];

export default function WhereToStayPage() {
  const baseUrl = SITE.productionUrl;
  const bookingLink = (query: string) =>
    affiliateUrl("booking", `https://www.booking.com/searchresults.html?${query}`).url;

  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Where to stay", url: `${baseUrl}/where-to-stay` },
        ]}
      />
      <FaqLd qa={faqs} />
      <main className="bg-parchment-50">
        <div className="container-page">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Where to stay" },
            ]}
          />

          {/* Header */}
          <header className="pb-8 pt-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">
              Where to stay
            </p>
            <h1 className="mt-2 font-serif text-4xl text-parchment-900 sm:text-5xl">
              Pick the right Noosa area for your trip
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-parchment-700">
              The biggest single decision for a Noosa trip is which area to base yourself in.
              We compare the five real choices by trip type, with pros and cons and one-tap
              links to live inventory on Booking.com.
            </p>
          </header>

          {/* Area comparison table */}
          <section className="bg-white rounded-2xl border border-parchment-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-parchment-100 text-parchment-700">
                  <tr>
                    <th className="px-4 py-3 font-medium">Area</th>
                    <th className="px-4 py-3 font-medium">Best for</th>
                    <th className="px-4 py-3 font-medium">Walk to beach</th>
                    <th className="px-4 py-3 font-medium">Car needed?</th>
                    <th className="px-4 py-3 font-medium">Vibe</th>
                  </tr>
                </thead>
                <tbody>
                  {areas.map((a, i) => (
                    <tr key={a.slug} className={i % 2 === 0 ? "bg-white" : "bg-parchment-50/40"}>
                      <td className="px-4 py-3 font-semibold text-parchment-900">
                        <Link href={`#${a.slug}`} className="hover:text-ocean-700">{a.name}</Link>
                      </td>
                      <td className="px-4 py-3 text-parchment-700">{a.bestFor.join(", ")}</td>
                      <td className="px-4 py-3 text-parchment-700">
                        {a.slug === "hastings-street" ? "Yes — 1 min" :
                         a.slug === "noosaville" ? "River-side — yes" :
                         a.slug === "sunshine-beach" ? "Yes — short walk" :
                         a.slug === "peregian" ? "Yes — short walk" :
                         "No — drive to beach"}
                      </td>
                      <td className="px-4 py-3 text-parchment-700">
                        {a.slug === "hastings-street" ? "No" : "Recommended"}
                      </td>
                      <td className="px-4 py-3 text-parchment-700">{a.vibe.split(",")[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Area detail cards */}
          <section className="mt-12 space-y-10">
            {areas.map((a) => (
              <article key={a.slug} id={a.slug} className="grid gap-6 rounded-2xl border border-parchment-200 bg-white p-6 md:grid-cols-12">
                <div className="md:col-span-5">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl">
                    <Photo filename={a.img} alt={a.vibe} variant="card" caption="" />
                  </div>
                </div>
                <div className="md:col-span-7">
                  <h2 className="font-serif text-3xl text-parchment-900">{a.name}</h2>
                  <p className="mt-2 text-parchment-700">{a.vibe}</p>
                  <p className="mt-3 leading-relaxed text-parchment-800">{a.summary}</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-parchment-500">Pros</h3>
                      <ul className="mt-2 space-y-1 text-sm text-parchment-700">
                        {a.pros.map((p) => (<li key={p}>· {p}</li>))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-parchment-500">Trade-offs</h3>
                      <ul className="mt-2 space-y-1 text-sm text-parchment-700">
                        {a.cons.map((p) => (<li key={p}>· {p}</li>))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={bookingLink(a.booking)}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="btn btn-primary"
                    >
                      See {a.name} on Booking.com
                    </a>
                    <Link href="/sources#accommodation" className="btn btn-outline text-xs">
                      How we link to Booking.com
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* By occasion */}
          <section className="mt-14">
            <h2 className="font-serif text-3xl text-parchment-900">Where to stay by trip type</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {occasions.map((o) => (
                <div key={o.title} className="card">
                  <p className="text-xs uppercase tracking-wider text-parchment-500">{o.title}</p>
                  <p className="mt-2 font-serif text-2xl text-parchment-900">{o.rec}</p>
                  <p className="mt-2 text-sm text-parchment-700">{o.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-14 rounded-2xl bg-white p-6 border border-parchment-200">
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

          {/* Monetisation explainer */}
          <section className="mt-12 rounded-2xl bg-parchment-100 p-6">
            <h2 className="font-serif text-2xl text-parchment-900">How we monetise accommodation links</h2>
            <p className="mt-3 text-sm leading-relaxed text-parchment-700">
              The "See on Booking.com" buttons above go to Booking.com's official Noosa search,
              filtered to the area you picked. If we have an approved Booking.com partner ID set
              as an environment variable, we add it to the link and earn a small commission on
              completed bookings. We don't take payment for any listing, and we never inflate a
              property's recommendation because of commission. Read the full disclosure on{" "}
              <Link href="/sources#accommodation" className="link">our sources page</Link>.
            </p>
            <p className="mt-2 text-xs text-parchment-500">
              Affiliate disclosure: Booking.com partner links. We may earn a commission on bookings made through these links.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
