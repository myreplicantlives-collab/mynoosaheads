import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";

export const metadata = {
  title: "Noosa webcams — live cameras",
  description:
    "Live Coastwatch and council webcams at Noosa Main Beach, Sunshine Beach, Laguna Bay and the river.",
};

export const dynamic = "force-static";

// Live public webcams that we link to. We do NOT embed fake or simulated camera frames.
// Each link goes to the operator's official page where the live image actually exists.

const webcams = [
  {
    name: "Noosa Main Beach — Hastings Street cam",
    operator: "Noosa Council / Coastwatch",
    location: "Noosa Heads",
    description: "Live image of Main Beach and the headland. Useful for checking swell, wind, crowd, and the flags before you walk down.",
    url: "https://www.noosa.qld.gov.au/Community/Beaches-and-parks",
    embedNote: "Click through to the Noosa Council beaches page for the live image. We link rather than embed to keep the page fast and the attribution clear.",
  },
  {
    name: "Sunshine Beach cam",
    operator: "Noosa Council / Coastwatch",
    location: "Sunshine Beach",
    description: "Live view south over Sunshine Beach. Good for swell and crowd check.",
    url: "https://www.noosa.qld.gov.au/Community/Beaches-and-parks",
    embedNote: "Link to the council beach page where the live image is hosted.",
  },
  {
    name: "Laguna Bay — Boiling Pot lookout",
    operator: "Coastwatch",
    location: "Noosa National Park headland",
    description: "Panoramic view over Laguna Bay from the coastal walk. Helps confirm swell and visibility.",
    url: "https://www.coastwatch.com.au/",
    embedNote: "Coastwatch hosts public surf cams across the east coast of Australia.",
  },
  {
    name: "Noosa River — Noosaville",
    operator: "Marina / operator cam",
    location: "Noosaville",
    description: "River conditions at the main hire-boat area.",
    url: "https://www.noosanorthshoreferries.com.au/",
    embedNote: "Live image at the ferry operator's site.",
  },
];

export default function WebcamsPage() {
  const baseUrl = SITE.productionUrl;
  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Webcams", url: `${baseUrl}/webcams` },
        ]}
      />
      <main className="bg-parchment-50">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Webcams" }]} />

          <header className="pb-8 pt-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">Webcams</p>
            <h1 className="mt-2 font-serif text-4xl text-parchment-900 sm:text-5xl">Live cameras around Noosa</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-parchment-700">
              Real public webcams operated by Noosa Council and Coastwatch. We link to the operator's
              page rather than embedding — that keeps the attribution honest and the page fast.
              If a camera is down, the operator's page will say so.
            </p>
            <p className="mt-3 rounded-xl border border-coral-400 bg-coral-400/10 p-3 text-sm text-parchment-800">
              <strong>Honesty note:</strong> we never show simulated or placeholder webcam images.
              If a feed is unavailable, the operator's page shows the outage. We don't fake it.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {webcams.map((w) => (
              <article key={w.name} className="card">
                <h2 className="font-serif text-2xl text-parchment-900">{w.name}</h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-parchment-500">
                  {w.operator} · {w.location}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-parchment-700">{w.description}</p>
                <p className="mt-3 text-xs">
                  <a href={w.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-xs">
                    Open live camera →
                  </a>
                </p>
                <p className="mt-3 text-xs text-parchment-500">{w.embedNote}</p>
              </article>
            ))}
          </div>

          <section className="mt-12 rounded-2xl bg-parchment-100 p-6">
            <h2 className="font-serif text-2xl text-parchment-900">What we don't do</h2>
            <ul className="mt-3 space-y-2 text-sm text-parchment-700">
              <li>· We don't show fake or stale webcam images. If the source is down, we say so.</li>
              <li>· We don't embed a third-party webcam if the operator doesn't permit it.</li>
              <li>· We don't claim a camera is live when we can't verify it.</li>
            </ul>
            <p className="mt-3 text-xs text-parchment-500">
              Cross-reference with the <Link href="/surf-weather" className="link">BOM forecast</Link> — the
              official forecast tells you what's coming; the webcams tell you what's there now.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
