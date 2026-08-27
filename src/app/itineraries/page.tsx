import Link from "next/link";
import { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArticleLd, BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/sources";

export const metadata: Metadata = {
  title: "Itineraries for Noosa — one day, weekend, four days, family",
  description:
    "Itineraries for Noosa: one day in Noosa, a weekend, four days, family trip, and a dedicated " +
    "Fraser Island (K'gari) day-trip guide with current permit and safety information.",
  alternates: { canonical: "/itineraries" },
};

const ITINERARIES = [
  {
    name: "One day in Noosa",
    image: "noosa_main_beach.jpg",
    alt: "One day in Noosa — morning at Main Beach, walk the national park, lunch in Hastings Street",
    time: "1 day",
    blurb: "If you've only got 24 hours, do this. Start before 8am.",
    href: "/itineraries/one-day",
  },
  {
    name: "A Noosa weekend (2 days)",
    image: "noosa_little_cove.jpg",
    alt: "A Noosa weekend — Main Beach, Hastings Street, river ferry, sunset on the headland",
    time: "2 days",
    blurb: "Two days lets you fit in the river, the headland walk and a sunset.",
    href: "/itineraries/weekend",
  },
  {
    name: "Four days in Noosa",
    image: "noosa_hastings_street.jpg",
    alt: "Four days in Noosa — add the Everglades, a hinterland morning, and a slower day",
    time: "4 days",
    blurb: "Add the Everglades, a hinterland morning and a slower day.",
    href: "/itineraries/four-days",
  },
  {
    name: "Family trip (with kids)",
    image: "noosa_river_foreshore.jpg",
    alt: "Family trip — Noosa river, playground, ferry and sheltered beaches",
    time: "3–5 days",
    blurb: "Sheltered beaches, river ferry, playground, slow pace.",
    href: "/itineraries/family",
  },
  {
    name: "Fraser Island / K'gari day-trip from Noosa",
    image: "noosa_lake_weyba.jpg",
    alt: "Fraser Island K'gari — the largest sand island in the world, accessible from Noosa",
    time: "1 day or overnight",
    blurb: "The largest sand island in the world. Real operators, real permits, real safety.",
    href: "/itineraries/fraser-island",
    important: true,
  },
];

const DISCLOSURE =
  "Itineraries are recommendations, not guarantees. Conditions change — tides, weather, track " +
  "closures. Always check current BOM and QPWS information before setting out.";

export default function ItinerariesPage() {
  return (
    <>
      <ArticleLd
        url={`${SITE.productionUrl}/itineraries`}
        headline="Noosa itineraries"
        description="One day, weekend, four days, family, and Fraser Island (K'gari)."
        datePublished="2026-08-24"
        imageUrl={`${SITE.productionUrl}/images/noosa/noosa_main_beach_hero.jpg`}
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: SITE.productionUrl },
          { name: "Itineraries", url: `${SITE.productionUrl}/itineraries` },
        ]}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Itineraries" }]} />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Itineraries</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">Plan your Noosa trip well</h1>
        <p className="lead mt-3 max-w-3xl">
          Five tested itineraries, plus a dedicated Fraser Island / K'gari guide. Use them as a
          starting point and adjust to the season — these are not booking confirmations.
        </p>
        <div className="callout mt-6 max-w-3xl">
          <p className="font-semibold text-ocean-800">Disclaimer</p>
          <p className="mt-1 text-sm">{DISCLOSURE}</p>
        </div>
      </header>

      <section className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ITINERARIES.map((it) => (
          <Link key={it.name} href={it.href} className="card hover:shadow-md transition">
            <Photo filename={it.image} alt={it.alt} variant="card" />
            <div className="card-body">
              <h2 className="font-serif text-xl">{it.name}</h2>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-parchment-500">{it.time}</p>
              <p className="mt-3 text-sm text-parchment-700">{it.blurb}</p>
              {it.important && (
                <p className="mt-3 text-xs text-coral-600 font-medium">
                  Includes operator + permit + safety guidance
                </p>
              )}
              <p className="mt-4 text-sm font-medium text-ocean-600">Read the guide →</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}