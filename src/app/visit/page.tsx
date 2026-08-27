import { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArticleLd, BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Visit Noosa — first-timers, timing, getting here",
  description:
    "First-timer guide to visiting Noosa — when to come, how to get here, what to expect, " +
    "and the small things worth knowing before you set out.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <>
      <ArticleLd
        url={`${SITE.productionUrl}/visit`}
        headline="Visit Noosa"
        description="First-timer guide, timing, getting here."
        datePublished="2026-08-24"
        imageUrl={`${SITE.productionUrl}/images/noosa/noosa_main_beach_hero.jpg`}
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: SITE.productionUrl },
          { name: "Visit", url: `${SITE.productionUrl}/visit` },
        ]}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Visit" }]} />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Visit</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">First-timer's guide to Noosa</h1>
        <p className="lead mt-3 max-w-3xl">
          Noosa is not a hidden secret and pretending it is does not help. What helps is knowing
          that Main Beach car park fills by 8:30am, that Hastings Street is better at breakfast
          than dinner, that the coastal walk is worth starting before 8am, and that the ferry to
          the North Shore runs every thirty minutes.
        </p>
      </header>

      <Photo
        filename="noosa_main_beach.jpg"
        alt="Main Beach at Noosa Heads — the most photographed beach on the Sunshine Coast"
        variant="hero"
        className="container-page rounded-2xl overflow-hidden mb-12"
      />

      <article className="container-prose space-y-10 pb-12">
        <section>
          <h2 className="font-serif text-2xl">When to come</h2>
          <p className="mt-3 text-parchment-800 leading-relaxed">
            The Australian school holidays (Easter, late June, late September, mid December) are
            busy everywhere on the coast. February is hot, occasionally stormy, and the quietest.
            April–May and September–October are the sweet spots — warm enough to swim, cool enough
            to sleep, and rates are softer than peak season.
          </p>
          <p className="mt-3 text-parchment-800 leading-relaxed">
            Whale season is June to November. Humpbacks pass close to the headland on the way north
            and back, and you can watch them from the coastal walk.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl">Getting here</h2>
          <p className="mt-3 text-parchment-800 leading-relaxed">
            By air — fly to Sunshine Coast Airport (MCY), 30 minutes south of Noosa. Brisbane
            Airport (BNE) is 90 minutes south and has more flight options. By car — Noosa is 1.5
            hours north of Brisbane via the M1 motorway. Parking in Noosa Heads is tight; parking
            in Noosaville is much easier.
          </p>
          <p className="mt-3 text-parchment-800 leading-relaxed">
            By bus — Greyhound and Premier run services from Brisbane and Sydney. The local bus
            network is run by Translink.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl">Getting around</h2>
          <ul className="mt-3 space-y-2">
            <li>· <strong>Noosa Ferry</strong> runs between Hastings Street and Noosaville every 30 minutes — the cheapest way to skip the Hastings Street parking problem.</li>
            <li>· <strong>Local buses</strong> (Translink) connect the towns and beaches along the coast.</li>
            <li>· <strong>Bike</strong> is excellent for the flat ride from Noosaville to Peregian via the coastal path.</li>
            <li>· <strong>Car</strong> is convenient for the hinterland and the surf beaches, but expect Hastings Street parking to fill by 9am on summer weekends.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl">What to expect</h2>
          <p className="mt-3 text-parchment-800 leading-relaxed">
            Noosa is warm and humid October to April. Winters (June–August) are mild, dry, and cooler
            at night — bring a light jumper. Sun protection is essential — the sun on the east coast
            is stronger than visitors from Europe or North America expect. SPF 50+, a hat, and a
            rashie are not optional.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl">Next steps</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/where-to-stay" className="card hover:shadow-md transition">
              <div className="card-body">
                <p className="font-medium text-parchment-900">Where to stay →</p>
                <p className="mt-1 text-sm text-parchment-700">Area, occasion and trip-type comparisons.</p>
              </div>
            </Link>
            <Link href="/surf-weather" className="card hover:shadow-md transition">
              <div className="card-body">
                <p className="font-medium text-parchment-900">Today's surf & weather →</p>
                <p className="mt-1 text-sm text-parchment-700">BOM marine forecast + current conditions.</p>
              </div>
            </Link>
            <Link href="/places" className="card hover:shadow-md transition">
              <div className="card-body">
                <p className="font-medium text-parchment-900">The places →</p>
                <p className="mt-1 text-sm text-parchment-700">Eight places worth planning around.</p>
              </div>
            </Link>
            <Link href="/itineraries" className="card hover:shadow-md transition">
              <div className="card-body">
                <p className="font-medium text-parchment-900">Itineraries →</p>
                <p className="mt-1 text-sm text-parchment-700">One day, weekend, four days, family, Fraser Island.</p>
              </div>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}