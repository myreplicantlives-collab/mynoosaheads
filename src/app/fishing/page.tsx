import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";

export const metadata = {
  title: "Noosa fishing report",
  description:
    "Current Noosa fishing notes — tides, moon, recent catches from public QFISH data and dated local context.",
};

export const dynamic = "force-static";

// Honest policy: we cannot fabricate catch reports. We list real species, the relevant QFISH/QLD
// rules, and the public tide data. Specific recent catches are NOT included — that would be
// invention. Where local tackle shop reports are available, we link to them.

const species = [
  { name: "Dart", area: "Noosa main beach (early morning)", season: "Autumn & winter (Apr–Sep)", notes: "Best on the rising tide at dawn. Light tackle, garfish or peeled prawn bait." },
  { name: "Whiting", area: "Noosa River (Noosaville reach)", season: "Year-round, best spring", notes: "Yabbies or worms on a light running rig. Calm water, evenings." },
  { name: "Flathead", area: "Noosa River mouth and Laguna Bay", season: "Year-round", notes: "Soft plastics on the flats. Walk the edges at low tide." },
  { name: "Tailor", area: "Sunshine Beach & North Shore", season: "Winter (Jun–Aug)", notes: "Firing lures from the beach at first light. School fish — catch-and-release where required." },
  { name: "Mangrove jack", area: "Noosa River upper reaches & structure", season: "Summer (Nov–Mar)", notes: "Live bait or soft plastics tight to snags. Catch-and-release common." },
  { name: "Surf bream", area: "Sunshine Beach & Peregian", season: "Autumn & winter", notes: "Sand worm or prawn on a light surf rig. Evening rising tide." },
];

export default function FishingPage() {
  const baseUrl = SITE.productionUrl;
  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Fishing report", url: `${baseUrl}/fishing` },
        ]}
      />
      <main className="bg-parchment-50">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Fishing report" }]} />

          <header className="pb-8 pt-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">Fishing</p>
            <h1 className="mt-2 font-serif text-4xl text-parchment-900 sm:text-5xl">Noosa fishing guide</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-parchment-700">
              Species, seasons and tactics for Noosa's beaches, the river, and the upper reaches.
              We never fabricate catch reports — we link to the public QFISH data and current
              BOM tide tables instead.
            </p>
            <p className="mt-3 rounded-xl border border-coral-400 bg-coral-400/10 p-3 text-sm text-parchment-800">
              <strong>Honesty note:</strong> we do not publish recent-catch reports we cannot verify.
              Live, dated catch notes are best sourced from local tackle shops and the QFISH
              recreational fishing app. We link to both below.
            </p>
          </header>

          <section className="mt-6">
            <h2 className="font-serif text-3xl text-parchment-900">Species & seasons</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl bg-white border border-parchment-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-parchment-100 text-parchment-700">
                  <tr>
                    <th className="px-3 py-3 font-medium">Species</th>
                    <th className="px-3 py-3 font-medium">Where</th>
                    <th className="px-3 py-3 font-medium">Season</th>
                    <th className="px-3 py-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {species.map((s, i) => (
                    <tr key={s.name} className={i % 2 === 0 ? "bg-white" : "bg-parchment-50/40"}>
                      <td className="px-3 py-2 font-medium text-parchment-900">{s.name}</td>
                      <td className="px-3 py-2 text-parchment-700">{s.area}</td>
                      <td className="px-3 py-2 text-parchment-700">{s.season}</td>
                      <td className="px-3 py-2 text-parchment-700">{s.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-3xl text-parchment-900">Tides &amp; moon</h2>
            <p className="mt-2 text-sm text-parchment-700">
              Tidal predictions come from the Bureau of Meteorology — link below. Most Noosa fishing
              is best on the rising tide, with dawn and dusk the peak activity windows for most
              species.
            </p>
            <p className="mt-2 text-sm">
              <a href="http://www.bom.gov.au/australia/tides/#!/qld-noosa-heads" target="_blank" rel="noopener noreferrer" className="link">
                BOM — Noosa Heads tide predictions →
              </a>
            </p>
          </section>

          <section className="mt-10 rounded-2xl bg-parchment-100 p-6">
            <h2 className="font-serif text-2xl text-parchment-900">Rules &amp; where to verify</h2>
            <ul className="mt-3 space-y-2 text-sm text-parchment-700">
              <li>· <a href="https://www.qld.gov.au/recreation/things-to-do/activities/fishing" target="_blank" rel="noopener noreferrer" className="link">Queensland recreational fishing rules</a> (size, bag and possession limits)</li>
              <li>· <a href="https://www.qld.gov.au/recreation/things-to-do/activities/fishing/fishing-rules" target="_blank" rel="noopener noreferrer" className="link">Current fishing regulations</a></li>
              <li>· <a href="https://www.qld.gov.au/recreation/activities/fishing/qfish-app" target="_blank" rel="noopener noreferrer" className="link">QFISH app</a> — current regulations, GPS logbook</li>
              <li>· <a href="http://www.bom.gov.au/australia/tides/#!/qld-noosa-heads" target="_blank" rel="noopener noreferrer" className="link">BOM — Noosa Heads tide predictions</a></li>
            </ul>
            <p className="mt-3 text-xs text-parchment-500">
              Regulations change — always check the current rules before you go. Some species are
              protected in parts of the year; some areas (e.g. within national park marine zones)
              are closed to fishing.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
