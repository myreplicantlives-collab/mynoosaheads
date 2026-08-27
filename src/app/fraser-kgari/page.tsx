import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbLd, FaqLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";

export const metadata = {
  title: "K'gari (Fraser Island) day trip from Noosa",
  description:
    "The K'gari (Fraser Island) day trip from Noosa — operator links, current permit and safety notes from QPWS.",
};

export const dynamic = "force-static";

const faqs = [
  {
    q: "Do I need a permit for K'gari?",
    a: "Yes — a vehicle access permit is required for K'gari (Fraser Island), issued by QPWS. Bookings for camping and some commercial tours include the permit in the price. Independent drivers must purchase a permit in advance.",
  },
  {
    q: "Do I need a 4WD?",
    a: "Yes — K'gari's sand roads require a high-clearance 4WD. Most day-trip visitors go with a guided tour operator rather than self-driving.",
  },
  {
    q: "Is the day trip worth it?",
    a: "It's a long day (12+ hours from Noosa) but the highlights — Lake McKenzie, 75 Mile Beach, the Maheno shipwreck, Central Station rainforest — are bucket-list. If the weather is bad or the swell is up, the tour may be rerouted or cancelled.",
  },
  {
    q: "What's the best time to go?",
    a: "April to September is best — drier roads, cooler temperatures, lower stingers. Summer (December–February) has heat, humidity, marine stingers and the risk of road closures after heavy rain.",
  },
  {
    q: "What's the Aboriginal name and why do you use both?",
    a: "K'gari is the traditional name of the island, returned by the Queensland Government in 2014. Fraser Island remains the official dual name. We use K'gari first because the Aboriginal name belongs first.",
  },
];

export default function FraserKgariPage() {
  const baseUrl = SITE.productionUrl;
  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "K'gari (Fraser Island)", url: `${baseUrl}/fraser-kgari` },
        ]}
      />
      <FaqLd qa={faqs} />
      <main className="bg-parchment-50">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "K'gari (Fraser Island)" }]} />

          <header className="pb-8 pt-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">K'gari (Fraser Island)</p>
            <h1 className="mt-2 font-serif text-4xl text-parchment-900 sm:text-5xl">The K'gari day trip from Noosa</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-parchment-700">
              K'gari — formally renamed from Fraser Island in 2014 — is the world's largest sand island,
              a 75-mile stretch of dunes, rainforest and freshwater lakes. The day trip from Noosa is
              long but bucket-list. Here's how to do it honestly.
            </p>
            <p className="mt-3 rounded-xl border border-coral-400 bg-coral-400/10 p-3 text-sm text-parchment-800">
              <strong>Important:</strong> K'gari conditions change daily. Always check the{" "}
              <a href="https://parks.des.qld.gov.au/alerts/?p=KGARI" target="_blank" rel="noopener noreferrer" className="link">
                QPWS K'gari alerts page
              </a>{" "}before you book. Road closures after rain are common.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="card">
              <h2 className="font-serif text-2xl text-parchment-900">With a guided tour</h2>
              <p className="mt-3 text-sm leading-relaxed text-parchment-700">
                Most day-trip visitors go with a guided 4WD tour from Noosa. Tour operators depart
                early morning (~5–6am) and return ~6–8pm. The tour includes the ferry crossing,
                Lake McKenzie, 75 Mile Beach, the Maheno shipwreck, and Central Station rainforest.
                Prices typically include the QPWS permit and national park fees.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-parchment-700">
                <li>· Pickup from Noosa accommodation usually available</li>
                <li>· Bring: reef-safe sunscreen, hat, swimwear, towel, water bottle</li>
                <li>· Wear: clothes you can get sandy, walking shoes</li>
                <li>· Don't bring: valuables you don't want sand in</li>
              </ul>
              <p className="mt-3 text-xs">
                Operators can be booked via{" "}
                <a href="https://www.getyourguide.com/noosa-l322/" target="_blank" rel="noopener noreferrer" className="link">
                  GetYourGuide — Noosa
                </a>{" "}or directly with local operators. We don't name a single operator on this page
                because schedules and availability change — use the GetYourGuide link to compare current options.
              </p>
            </article>
            <article className="card">
              <h2 className="font-serif text-2xl text-parchment-900">Self-drive (experienced only)</h2>
              <p className="mt-3 text-sm leading-relaxed text-parchment-700">
                Driving K'gari's sand roads requires a high-clearance 4WD, low-range gearing, and
                experience. If you've never driven on sand before, the guided tour is the safer
                option. If you do self-drive:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-parchment-700">
                <li>· Deflate tyres to ~18psi for sand, re-inflate on hard surfaces</li>
                <li>· Carry recovery gear (snatch strap, shovel, compressor)</li>
                <li>· Buy the QPWS vehicle access permit in advance</li>
                <li>· Don't drive at low tide on the ocean beach without local experience</li>
                <li>· Check road closures — the QPWS alerts page is the official source</li>
              </ul>
              <p className="mt-3 text-xs">
                <a href="https://parks.des.qld.gov.au/parks/kgari/" target="_blank" rel="noopener noreferrer" className="link">
                  QPWS — K'gari World Heritage Area →
                </a>
              </p>
            </article>
          </section>

          <section className="mt-10 rounded-2xl bg-white p-6 border border-parchment-200">
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

          <section className="mt-10 rounded-2xl bg-parchment-100 p-6">
            <h2 className="font-serif text-2xl text-parchment-900">Official sources</h2>
            <ul className="mt-3 space-y-2 text-sm text-parchment-700">
              <li>· <a href="https://parks.des.qld.gov.au/parks/kgari/" target="_blank" rel="noopener noreferrer" className="link">QPWS — K'gari World Heritage Area</a></li>
              <li>· <a href="https://parks.des.qld.gov.au/alerts/?p=KGARI" target="_blank" rel="noopener noreferrer" className="link">QPWS — current K'gari alerts</a></li>
              <li>· <a href="https://parks.des.qld.gov.au/parks/kgari/permits/" target="_blank" rel="noopener noreferrer" className="link">QPWS — K'gari permits and fees</a></li>
              <li>· <a href="https://parks.des.qld.gov.au/parks/kgari/accessible-recreation/" target="_blank" rel="noopener noreferrer" className="link">QPWS — accessibility and conditions</a></li>
            </ul>
            <p className="mt-3 text-xs text-parchment-500">
              See our <Link href="/sources#park" className="link">sources page</Link> for the
              full citation ledger, including the date we last verified each link.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
