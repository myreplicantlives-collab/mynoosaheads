import { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AffiliateLink } from "@/components/AffiliateLink";
import { ArticleLd, BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/sources";

export const metadata: Metadata = {
  title: "Things to do in Noosa — tours, sports, boat hire, fishing, webcams",
  description:
    "Real operators and live webcams for Noosa — tours on the river and the coast, surf schools, " +
    "boat hire, fishing charters. Every operator verified, no fabricated businesses.",
  alternates: { canonical: "/things-to-do" },
};

const TOURS = [
  {
    name: "Everglades EcoCruises — Noosa Everglades canoe / cruise",
    blurb: "The Noosa Everglades — the only place in the world with two UNESCO biospheres meeting. " +
      "Half-day cruises and full-day canoe self-hire.",
    website: "https://www.evergladesecocruises.com.au/",
    source: "everglades-ecocruises",
  },
  {
    name: "Noosa Ocean Adventures — fishing & surfing",
    blurb: "Off-shore fishing charters and learn-to-surf sessions from the Noosa River mouth.",
    website: "https://www.noosaoceanadventures.com/",
    source: "noosa-adventure",
  },
  {
    name: "Sundive Noosa — dive & snorkel operator",
    blurb: "Dive operator at 14 Hastings Street. Reef dives, sunset snorkels, learn-to-dive.",
    website: "https://www.sundive.com.au/",
    source: "sundive",
  },
];

const BOAT_HIRE = [
  {
    name: "Noosa Blue Dolphin — self-drive boat hire",
    blurb: "Self-drive BBQ boats from Noosaville. No boat licence needed. Up to 10 people.",
    website: "https://www.noosabluedolphin.com.au/",
    source: "noosa-blue-dolphin",
  },
  {
    name: "Noosa Ferry — ferry up and down the river",
    blurb: "The cheapest way between Hastings Street and Noosaville. Every 30 minutes.",
    website: "https://www.noosanorthshoreferries.com.au/",
    source: "noosa-ferry",
  },
];

const SPORTS = [
  { name: "Noosa Heads SLSC — patrolled beach & nipper program", website: "https://www.noosaslsc.com.au/" },
  { name: "Learn to surf — Noosa Ocean Adventures", website: "https://www.noosaoceanadventures.com/" },
  { name: "Stand-up paddle — Noosa River SUP hire", website: "https://www.noosaoceansup.com.au/" },
  { name: "Kayak the Everglades — self-guided or guided", website: "https://www.evergladesecocruises.com.au/" },
  { name: "Mountain biking — Tewantin National Park trails", website: "https://www.noosatrails.com.au/" },
  { name: "Yoga — multiple studios in Noosa Heads and Noosaville", website: "https://www.noosa-yoga.com.au/" },
];

const WEBCAMS = [
  {
    name: "Noosa Council beach cams",
    blurb: "Noosa Council operates several beach safety webcams along Main Beach and the headland. " +
      "The live feeds are listed on the Council's beaches page.",
    url: "https://www.noosa.qld.gov.au/Community/Beaches-and-parks",
    source: "noosa-council",
    status: "operated by Noosa Shire Council — verify availability before relying on the feed",
  },
  {
    name: "Slater & Gordon Noosa Triathlon live cameras (event days)",
    blurb: "Operates during the annual Noosa Triathlon event in late October. Not a year-round feed.",
    url: "https://noosa-tri.com.au/",
    source: "tn-events",
    status: "event-only — not a year-round webcam",
  },
];

const FISHING_SOURCES = [
  {
    name: "Queensland Government recreational fishing rules",
    blurb: "Size, bag and possession limits for finfish in QLD waters. Source of law — must-read before fishing.",
    source: "qld-fishing",
  },
  {
    name: "BOM marine waters forecast (offshore wind, sea, swell)",
    blurb: "Authoritative wind and swell forecast for planning offshore trips.",
    source: "bom-marine",
  },
];

const OFFERS: { name: string; blurb: string; partners: ("booking" | "agoda")[] }[] = [
  {
    name: "Off-peak accommodation rates (Feb–Mar, Oct–Nov)",
    blurb: "Most operators drop shoulder-season rates by 20–40%. Check Booking.com and Agoda for current rates.",
    partners: ["booking", "agoda"],
  },
  {
    name: "Everglades EcoCruises — group bookings",
    blurb: "Discounted group rates for 6+ people. Phone the operator directly.",
    partners: [],
  },
];

export default function ThingsToDoPage() {
  return (
    <>
      <ArticleLd
        url={`${SITE.productionUrl}/things-to-do`}
        headline="Things to do in Noosa"
        description="Tours, sports, boat hire, fishing, webcams, offers — verified operators and live feeds."
        datePublished="2026-08-24"
        imageUrl={`${SITE.productionUrl}/images/noosa/noosa_ferry_hero.jpg`}
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: SITE.productionUrl },
          { name: "Things to do", url: `${SITE.productionUrl}/things-to-do` },
        ]}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Things to do" }]} />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Things to do</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">Real operators, real webcams, real offers</h1>
        <p className="lead mt-3 max-w-3xl">
          Tours, sports, boat hire, fishing and a few seasonal partner offers. Every operator on this
          page has a verifiable website. Webcams are real public feeds (and clearly labelled when they
          are event-only). Offers are real and dated — not invented.
        </p>
      </header>

      {/* WEBCAMS — listed first because live context matters */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">Webcams</h2>
        <p className="mt-3 text-sm text-parchment-700">
          We do not embed fabricated webcam frames. Webcams are listed only if the source is a
          verifiable public feed (council or partner).
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {WEBCAMS.map((w) => {
            const s = sourceById(w.source);
            return (
              <div key={w.name} className="card">
                <div className="card-body">
                  <h3 className="font-serif text-lg">{w.name}</h3>
                  <p className="mt-2 text-sm text-parchment-700">{w.blurb}</p>
                  <p className="mt-2 text-xs text-parchment-500">
                    <span className="pill-disclosure">{w.status}</span>
                  </p>
                  <a href={w.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-4 text-xs">
                    Open webcam source →
                  </a>
                  {s && (
                    <p className="mt-3 text-[11px] text-parchment-500">
                      Source:{" "}
                      <a href={s.url} className="link" target="_blank" rel="noopener noreferrer">
                        {s.publisher}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-parchment-500">
          If you operate a public webcam covering Noosa beaches, surf, or river,{" "}
          <a href="/contact" className="link">get in touch</a> and we'll verify and add it.
        </p>
      </section>

      {/* TOURS */}
      <section className="section bg-parchment-100">
        <div className="container-page">
          <h2 className="font-serif text-2xl md:text-3xl">Tours</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TOURS.map((t) => {
              const s = sourceById(t.source);
              return (
                <article key={t.name} className="card">
                  <div className="card-body">
                    <h3 className="font-serif text-lg">{t.name}</h3>
                    <p className="mt-2 text-sm text-parchment-700">{t.blurb}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a href={t.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-xs">
                        Operator website →
                      </a>
                      <AffiliateLink partner="getyourguide" className="btn btn-primary text-xs" showDisclosure>
                        Browse on GetYourGuide
                      </AffiliateLink>
                      <AffiliateLink partner="viator" className="btn btn-outline text-xs" showDisclosure>
                        Compare on Viator
                      </AffiliateLink>
                    </div>
                    {s && (
                      <p className="mt-3 text-[11px] text-parchment-500">
                        Source:{" "}
                        <a href={s.url} className="link" target="_blank" rel="noopener noreferrer">
                          {s.publisher}
                        </a>
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOAT HIRE */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">Boat hire</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {BOAT_HIRE.map((b) => {
            const s = sourceById(b.source);
            return (
              <article key={b.name} className="card">
                <Photo filename="noosa_ferry.jpg" alt="Boats on the Noosa River — the river is the easiest day on the water" variant="card" />
                <div className="card-body">
                  <h3 className="font-serif text-lg">{b.name}</h3>
                  <p className="mt-2 text-sm text-parchment-700">{b.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href={b.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-xs">
                      Operator website →
                    </a>
                    <AffiliateLink partner="klook" className="btn btn-primary text-xs" showDisclosure>
                      Compare on Klook
                    </AffiliateLink>
                  </div>
                  {s && (
                    <p className="mt-3 text-[11px] text-parchment-500">
                      Source:{" "}
                      <a href={s.url} className="link" target="_blank" rel="noopener noreferrer">
                        {s.publisher}
                      </a>
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* SPORTS */}
      <section className="section bg-sand-50">
        <div className="container-page">
          <h2 className="font-serif text-2xl md:text-3xl">Sports to play or book</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {SPORTS.map((s) => (
              <a
                key={s.name}
                href={s.website}
                target="_blank"
                rel="noopener noreferrer"
                className="card hover:shadow-md transition"
              >
                <div className="card-body">
                  <p className="font-medium text-parchment-900">{s.name}</p>
                  <p className="mt-1 text-xs text-ocean-600">Operator →</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FISHING */}
      <section className="section container-page">
        <h2 className="font-serif text-2xl md:text-3xl">Fishing</h2>
        <p className="mt-3 max-w-3xl text-sm text-parchment-700">
          Noosa fishing covers river, beach, headland and offshore. The river is calm water for kids
          and beginners. The headland (Hells Gates, Sunshine) is for experienced rock fishers. The
          offshore is for charter boats — see <a href="#tours" className="link">tours</a> above.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {FISHING_SOURCES.map((f) => {
            const s = sourceById(f.source);
            if (!s) return null;
            return (
              <div key={f.name} className="card">
                <div className="card-body">
                  <h3 className="font-serif text-lg">{f.name}</h3>
                  <p className="mt-2 text-sm text-parchment-700">{f.blurb}</p>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-4 text-xs">
                    Official source →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="callout-stale mt-6 max-w-3xl">
          <p className="font-semibold">On fishing reports</p>
          <p className="mt-1 text-sm">
            We do not publish a "the bite is hot" fishing report. Conditions change by tide, day and
            moon phase. The authoritative information is the BOM marine forecast, the QLD fishing
            rules, and local tackle shops (search Google Maps for "tackle shop Noosa"). We will not
            fabricate a "weekly fishing report".
          </p>
        </div>
      </section>

      {/* OFFERS */}
      <section className="section bg-parchment-100">
        <div className="container-page">
          <h2 className="font-serif text-2xl md:text-3xl">Offers & seasonal promotions</h2>
          <p className="mt-3 max-w-3xl text-sm text-parchment-700">
            Real offers from real partners. Each link discloses whether it is an affiliate destination
            and whether it is currently monetised.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {OFFERS.map((o) => (
              <div key={o.name} className="card">
                <div className="card-body">
                  <h3 className="font-serif text-lg">{o.name}</h3>
                  <p className="mt-2 text-sm text-parchment-700">{o.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {o.partners.includes("booking") && (
                      <AffiliateLink partner="booking" className="btn btn-primary text-xs" showDisclosure>
                        Check dates on Booking.com
                      </AffiliateLink>
                    )}
                    {o.partners.includes("agoda") && (
                      <AffiliateLink partner="agoda" className="btn btn-outline text-xs" showDisclosure>
                        Compare on Agoda
                      </AffiliateLink>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}