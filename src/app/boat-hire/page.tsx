import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { affiliateUrl } from "@/data/affiliate";

export const metadata = {
  title: "Noosa boat hire — river, kayak and skippered charters",
  description:
    "Real boat hire operators on the Noosa River — self-drive hire boats, kayaks, and skippered cruises.",
};

export const dynamic = "force-static";

const operators = [
  {
    name: "Noosa Blue Dolphin",
    type: "Self-drive hire boats, cruises",
    blurb: "Hire boats from the Noosaville waterfront. Picnic boats for up to 8 people. Half-day and full-day hire. Skippered cruises also available.",
    url: "https://www.noosabluedolphin.com.au/",
  },
  {
    name: "Noosa North Shore Ferries",
    type: "Ferry + cruises",
    blurb: "The main ferry crossing from Tewantin to the North Shore. Also runs sunset cruises and the Everglades day cruise.",
    url: "https://www.noosanorthshoreferries.com.au/",
  },
  {
    name: "Everglades EcoCruises",
    type: "Skippered eco-cruise",
    blurb: "Half-day cruise up the upper Noosa River through the Everglades. Commentary on the ecosystem. Includes canapés on the premium cruise.",
    url: "https://www.evergladesecocruises.com.au/",
  },
  {
    name: "Sunshine Coast Afloat (kayak hire)",
    type: "Kayak & SUP hire",
    blurb: "Self-guided kayak and SUP hire on the Noosa River. Delivered to your accommodation or picked up from the river foreshore.",
    url: "https://www.sunshinecoastafloat.com/",
  },
];

export default function BoatHirePage() {
  const baseUrl = SITE.productionUrl;
  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Boat hire", url: `${baseUrl}/boat-hire` },
        ]}
      />
      <main className="bg-parchment-50">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Boat hire" }]} />

          <header className="pb-8 pt-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">Boat hire</p>
            <h1 className="mt-2 font-serif text-4xl text-parchment-900 sm:text-5xl">Real operators on the Noosa River</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-parchment-700">
              Hire boats, kayaks, and skippered cruises. Each operator has a current website and an
              on-water base at the Noosaville foreshore or Tewantin. We link to the operator's site
              (some earn us a small commission via Viator) — see our <Link href="/sources" className="link">sources page</Link> for the disclosure.
            </p>
          </header>

          <section className="mt-6 grid gap-4 md:grid-cols-2">
            {operators.map((o) => {
              const link = affiliateUrl("viator", o.url).url;
              return (
                <article key={o.name} className="card">
                  <h2 className="font-serif text-2xl text-parchment-900">
                    <a href={link} target="_blank" rel="sponsored noopener noreferrer" className="hover:text-ocean-700">
                      {o.name}
                    </a>
                  </h2>
                  <p className="mt-1 text-xs uppercase tracking-wider text-parchment-500">{o.type}</p>
                  <p className="mt-3 text-sm leading-relaxed text-parchment-700">{o.blurb}</p>
                  <p className="mt-3 text-xs">
                    <a href={link} target="_blank" rel="sponsored noopener noreferrer" className="link">
                      Visit operator →
                    </a>
                    <span className="pill-disclosure ml-2">Affiliate link</span>
                  </p>
                </article>
              );
            })}
          </section>

          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="card overflow-hidden p-0">
              <Photo filename="noosa_river_foreshore.jpg" alt="Noosa River foreshore at Noosaville" variant="card" caption="" />
              <div className="p-5">
                <h3 className="font-serif text-2xl text-parchment-900">Self-drive hire boats</h3>
                <p className="mt-2 text-sm text-parchment-700">
                  The classic Noosa holiday: hire a picnic boat for the morning, drop anchor at
                  one of the river-side beaches upstream of Tewantin, swim, eat, drift back. Most
                  operators require a brief on-water safety briefing; some require a boat licence
                  for larger craft.
                </p>
              </div>
            </article>
            <article className="card overflow-hidden p-0">
              <Photo filename="noosa_ferry.jpg" alt="Noosa North Shore ferry crossing the river" variant="card" caption="" />
              <div className="p-5">
                <h3 className="font-serif text-2xl text-2xl text-parchment-900">Ferry &amp; cruises</h3>
                <p className="mt-2 text-sm text-parchment-700">
                  The North Shore Ferry is the easiest way to reach the beach on the north side of
                  the river mouth. Sunset cruises and the upper-river Everglades cruise are the
                  two most popular skippered options.
                </p>
              </div>
            </article>
          </section>

          <section className="mt-10 rounded-2xl bg-parchment-100 p-6">
            <h2 className="font-serif text-2xl text-parchment-900">Safety &amp; rules</h2>
            <ul className="mt-3 space-y-2 text-sm text-parchment-700">
              <li>· Noosa River has its own speed limits and "no wash" zones — operators will brief you.</li>
              <li>· Always wear the life jackets provided, especially for kids.</li>
              <li>· Check the day's tide and weather before heading out — see <Link href="/surf-weather" className="link">surf &amp; weather</Link>.</li>
              <li>· Don't drink and skipper — Maritime Safety Queensland rules apply.</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
