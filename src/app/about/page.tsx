import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Card, CardBody, CardHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "About MyNoosaHeads — what we cover, who writes it, and how the publication is set up.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · MyNoosaHeads",
    description: "What we cover, who writes it, and how the publication is set up.",
    url: "/about",
    type: "article",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-paper-50">
      <Hero
        eyebrow="About"
        title="MyNoosaHeads"
        subtitle="An independent, sourced, slow-guide field manual for Noosa Heads and the surrounding shire. Built slowly, on the Sunshine Coast."
        flourish="By the headland, by the bar."
      />

      <section className="container-page py-14 md:py-20" aria-labelledby="what-h">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <h2 id="what-h" className="sr-only">What we cover</h2>
            <section>
              <h3 className="font-display text-display-sm text-ink-900">What we cover</h3>
              <div className="prose-mdx mt-4">
                <p>
                  MyNoosaHeads covers Noosa Heads, Noosaville, Tewantin,
                  Sunshine Beach, Peregian, and the western shire villages
                  (Pomona, Cooran, Kin Kin, Cooroy). Eight functional areas:
                  surf and weather, the national park, accommodation, things
                  to do, fishing, boats, travel, and webcams.
                </p>
                <p>
                  We organise the guide around what locals actually do, not
                  what the visitor brochure leads with. The result is a
                  publication that opens with a surf report and ends with a
                  description of the hinterland — both honest, both useful,
                  both sourced.
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-display text-display-sm text-ink-900">How we work</h3>
              <div className="prose-mdx mt-4">
                <p>
                  Every claim on this site links to a public source —
                  usually a government page (BOM, QPWS, MSQ, QLD Traffic,
                  Noosa Council), an industry body (Tourism Noosa, Visit
                  Sunshine Coast), or a third-sector service (Beachsafe,
                  SLSQ). Affiliate links are marked{" "}
                  <span className="chip-coral">Sponsored · ACCC Sch 2</span>{" "}
                  before you click, and the full statement lives at{" "}
                  <Link href="/how-we-make-money" className="link text-ocean-700">/how-we-make-money</Link>.
                </p>
                <p>
                  The live data tiles on the site refresh themselves every 30
                  minutes from BOM and Open-Meteo. We do not push them by
                  hand, and we do not edit the numbers. If a tile fails,
                  it falls back to a coral Unavailable badge rather than
                  guessing.
                </p>
                <p>
                  Editorial copy is reviewed against current QPWS and
                  council sources every month. The publication has no
                  newsletter, no login, no pop-ups, no email capture, no
                  AI photography, and no fabricated reviews or stats.
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-display text-display-sm text-ink-900">Who writes it</h3>
              <div className="prose-mdx mt-4">
                <p>
                  MyNoosaHeads is published by a small Sunshine Coast
                  editorial team with day-to-day ties to the Noosa shire.
                  Bylines sit at the foot of every category page. Errors
                  are corrected promptly and the correction is noted in
                  place — please{" "}
                  <Link href="/contact" className="link text-ocean-700">
                    drop us a line
                  </Link>{" "}
                  if you spot one.
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-display text-display-sm text-ink-900">Hosting and stack</h3>
              <div className="prose-mdx mt-4">
                <p>
                  The site is a Next.js 14 application, statically rendered
                  where possible and server-rendered for the live tiles.
                  It is hosted on Vercel Hobby (free tier; we will upgrade
                  to Pro at A$30/month only when traffic warrants). All
                  source code is held in a private Git repository.
                </p>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="At a glance" title="" />
              <CardBody>
                <dl className="text-body-sm space-y-3 text-ink-800">
                  <div>
                    <dt className="text-eyebrow text-ocean-700">Region</dt>
                    <dd>Noosa Shire, Queensland, Australia</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow text-ocean-700">Locale</dt>
                    <dd>en-AU</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow text-ocean-700">Established</dt>
                    <dd>2026</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow text-ocean-700">Hosting</dt>
                    <dd>Vercel Hobby (free tier)</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow text-ocean-700">Newsletter</dt>
                    <dd>None. Per chairman directive.</dd>
                  </div>
                </dl>
              </CardBody>
            </Card>
            <Card variant="surface">
              <CardHeader eyebrow="Legal" title="" />
              <CardBody>
                <ul className="text-body-sm space-y-2">
                  <li>
                    <Link href="/privacy" className="link text-ocean-700">Privacy policy</Link>
                  </li>
                  <li>
                    <Link href="/terms" className="link text-ocean-700">Terms of use</Link>
                  </li>
                  <li>
                    <Link href="/how-we-make-money" className="link text-ocean-700">How we make money</Link>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}
