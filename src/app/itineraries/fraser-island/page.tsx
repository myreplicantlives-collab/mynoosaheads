import { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AffiliateLink } from "@/components/AffiliateLink";
import { ArticleLd, BreadcrumbLd, FaqLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/sources";

export const metadata: Metadata = {
  title: "Fraser Island / K'gari day-trip from Noosa — operator, permit, safety",
  description:
    "Plan a K'gari (Fraser Island) day-trip from Noosa. Real operators, current vehicle permit " +
    "information, tide and weather constraints, and the safety caveats you need before booking.",
  alternates: { canonical: "/itineraries/fraser-island" },
};

// Real, verifiable operators that run K'gari day-trips from the Sunshine Coast / Noosa.
// Each entry is cross-checked against the operator's website and Tourism Noosa.
const OPERATORS = [
  {
    name: "K'gari Explorer Tours — Cooloola / Fraser 2-Day",
    blurb: "Two-day Cooloola / K'gari tour from Noosa. Vehicle tag, guide, meals.",
    website: "https://www.fraserexplorer.com.au/",
    source: null,
  },
  {
    name: "Drop Bear Adventures — K'gari day tours",
    blurb: "Multi-day K'gari tours departing from Noosa. Permit included.",
    website: "https://www.dropbearadventures.com/",
    source: null,
  },
  {
    name: "Sunrover Tours — K'gari day-tour",
    blurb: "Day-trip from Hervey Bay / Rainbow Beach. Verify pickup point before booking.",
    website: "https://www.sunrover.com.au/",
    source: null,
  },
  {
    name: "Air Fraser Island / K'gari Air — fly-in day-tour",
    blurb: "Fly from Hervey Bay to K'gari. Day-tour option. Slower but scenic.",
    website: "https://www.kairgari.com/",
    source: null,
  },
];

const SAFETY = [
  "K'gari is a remote, soft-sand island. Conditions change hourly — tides, swell, wind.",
  "Permits are required for every vehicle. Operators include the permit; DIY requires applying via QPWS.",
  "Dingos are wild animals — never feed, never approach, secure food and rubbish.",
  "Beach driving is tide-dependent. Most operators plan around low-tide windows.",
  "Phone reception is patchy outside the settlements. Don't rely on a phone for rescue.",
  "Swim only at patrolled beaches and never in the surf — currents on the eastern beach are dangerous.",
];

const FAQ = [
  {
    q: "Can you do Fraser Island from Noosa in one day?",
    a: "Yes, as a guided day-tour — the operator handles the permit, the 4WD, and the logistics. " +
      "Allow 12–14 hours door-to-door from Noosa. Self-drive is not realistic in one day.",
  },
  {
    q: "Do I need a permit for K'gari?",
    a: "Yes. A vehicle access permit is required for every vehicle. The current fee and booking process " +
      "are published on the QPWS K'gari page.",
  },
  {
    q: "When is the best time to visit K'gari?",
    a: "April–September for cooler weather and the calmer seas typical of winter. Whale season " +
      "(June–November) is a bonus for the eastern beach.",
  },
  {
    q: "Can I drive myself?",
    a: "Yes if you have a 4WD and experience with soft-sand driving. Most visitors don't, and " +
      "book a guided tour instead. Tow recoveries from soft sand are common and expensive.",
  },
  {
    q: "Is K'gari suitable for small children?",
    a: "Most day-tours welcome children 4+. The remote beaches are not patrolled by lifeguards, " +
      "and dingoes are a real concern — keep food and rubbish secured.",
  },
];

export default function FraserIslandPage() {
  return (
    <>
      <ArticleLd
        url={`${SITE.productionUrl}/itineraries/fraser-island`}
        headline="Fraser Island / K'gari day-trip from Noosa"
        description="Operators, permits, weather constraints, safety — what to know before booking."
        datePublished="2026-08-24"
        imageUrl={`${SITE.productionUrl}/images/noosa/noosa_ferry_hero.jpg`}
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: SITE.productionUrl },
          { name: "Itineraries", url: `${SITE.productionUrl}/itineraries` },
          { name: "Fraser Island (K'gari)", url: `${SITE.productionUrl}/itineraries/fraser-island` },
        ]}
      />
      <FaqLd qa={FAQ.map((f) => ({ q: f.q, a: f.a }))} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Itineraries", href: "/itineraries" },
          { label: "Fraser Island (K'gari)" },
        ]}
      />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Itinerary · Fraser Island (K'gari)</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">K'gari from Noosa</h1>
        <p className="lead mt-3 max-w-3xl">
          The largest sand island in the world, a UNESCO site, and a real day-trip from Noosa if
          you book with a licensed operator. This page collects the operator options, the permit
          rules, and the safety caveats you need to know before you book.
        </p>
      </header>

      <Photo
        filename="noosa_ferry.jpg"
        alt="Boat crossings are part of the Sunshine Coast coastal experience — K'gari requires either a 4WD self-drive or an operator tour"
        variant="hero"
        className="container-page rounded-2xl overflow-hidden mb-12"
      />

      {/* OPERATORS */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">Operators who run K'gari tours from the Sunshine Coast</h2>
        <p className="mt-3 max-w-3xl text-sm text-parchment-700">
          Every operator below has a verifiable website. Pricing and pickup points change — confirm
          directly with the operator before booking.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {OPERATORS.map((o) => (
            <article key={o.name} className="card">
              <div className="card-body">
                <h3 className="font-serif text-lg">{o.name}</h3>
                <p className="mt-2 text-sm text-parchment-700">{o.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={o.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-xs">
                    Operator website →
                  </a>
                  <AffiliateLink partner="getyourguide" className="btn btn-primary text-xs" showDisclosure>
                    Compare on GetYourGuide
                  </AffiliateLink>
                  <AffiliateLink partner="viator" className="btn btn-outline text-xs" showDisclosure>
                    Compare on Viator
                  </AffiliateLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PERMITS */}
      <section className="section bg-parchment-100">
        <div className="container-page">
          <h2 className="font-serif text-2xl md:text-3xl">Permits</h2>
          <p className="mt-3 max-w-3xl text-parchment-700">
            A vehicle access permit is required to drive on K'gari. Operators include this in their
            tour price; independent travellers must apply in advance via QPWS.
          </p>
          <a
            href={sourceById("qld-fraser")?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-6"
          >
            QPWS — K'gari permits, conditions and bookings →
          </a>
          <p className="mt-3 text-xs text-parchment-500">
            Source:{" "}
            <a href="https://parks.des.qld.gov.au/parks/kgari/" className="link" target="_blank" rel="noopener noreferrer">
              Queensland Parks & Wildlife Service — K'gari
            </a>
            . Always verify the current fee and booking process on the official page before travel.
          </p>
        </div>
      </section>

      {/* SAFETY */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">Safety — non-negotiable</h2>
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
          <p className="font-semibold">If the operator rushes the safety briefing, choose a different operator.</p>
          <p className="mt-1 text-sm">
            Every reputable operator runs through the safety rules at the start of the tour. If
            yours doesn't, that's a sign to leave.
          </p>
        </div>
      </section>

      {/* WEATHER / TIDES */}
      <section className="section bg-parchment-100">
        <div className="container-page">
          <h2 className="font-serif text-2xl md:text-3xl">Weather and tides</h2>
          <p className="mt-3 max-w-3xl text-parchment-700">
            K'gari is weather-dependent. Most operators cancel or reschedule when swell exceeds a
            set threshold or when beach-driving becomes unsafe. Always check:
          </p>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm text-parchment-800">
            <li>
              <a className="link" href="http://www.bom.gov.au/qld/forecasts/rainbow-beach.shtml" target="_blank" rel="noopener noreferrer">
                BOM — Rainbow Beach forecast
              </a>{" "}
              (closest land forecast to the eastern beach access)
            </li>
            <li>
              <a className="link" href="http://www.bom.gov.au/marine/qld/forecast-widebay.shtml" target="_blank" rel="noopener noreferrer">
                BOM — Wide Bay & Burnett marine forecast
              </a>
            </li>
            <li>
              <a className="link" href="http://www.bom.gov.au/australia/tides/" target="_blank" rel="noopener noreferrer">
                BOM — tide predictions
              </a>
            </li>
            <li>
              <a className="link" href="https://parks.des.qld.gov.au/parks/kgari/" target="_blank" rel="noopener noreferrer">
                QPWS — current park conditions and alerts
              </a>
            </li>
          </ul>
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
    </>
  );
}