import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd, Card, CardBody, CardHeader } from "@/components/ui";
import { SITE } from "@/data/site";
import { WALKS, WALKS_BY_SLUG } from "@/data/walks";
import {
  touristAttractionJsonLd,
  sectionBreadcrumb,
  geoForSlugOrNoosa,
} from "@/lib/schema";

/**
 * /noosa-national-park/walks/[slug] — MSN-2975 V2 individual walk page.
 *
 * Atmospheric standalone page for one of the three anchor walks.
 * Pulls content from /data/walks.ts (Albert's D4 brief).
 *
 * Per V2 voice guide (D8):
 *   - Walk at a glance: numbers, not adjectives
 *   - Difficulty: honest
 *   - Safety: defer to QPWS / SLSQ / BOM
 *
 * Critical V2 corrections applied:
 *   - Tanglewood: V2 uses ~5.5 km one-way (V1 said 3 km; flag for Tim)
 *   - Alexandria Bay: clothing-optional stretch noted with caveat
 *   - NP area (on parent page): 2,883 ha, not 4,000 ha
 */

export function generateStaticParams() {
  return WALKS.map((w) => ({ slug: w.slug }));
}

type PageProps = { params: { slug: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  const w = WALKS_BY_SLUG[params.slug];
  if (!w) return { title: "Not found" };
  return {
    title: `${w.name} · Noosa National Park`,
    description: w.headline,
    alternates: { canonical: `/noosa-national-park/walks/${w.slug}` },
    openGraph: {
      title: `${w.name} · MyNoosaHeads`,
      description: w.headline,
      url: `/noosa-national-park/walks/${w.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${w.name} · MyNoosaHeads`,
      description: w.headline,
    },
  };
}

export default function WalkPage({ params }: PageProps) {
  const w = WALKS_BY_SLUG[params.slug];
  if (!w) notFound();

  // MSN-3057 M4 — `Article` swapped for `TouristAttraction` per Albert §4.2.
  // Walks are bookable outdoor experiences, not editorial articles. The
  // `geo` block uses the Noosa National Park centroid; precise per-walk
  // coordinates can be added later from QPWS data.
  const jsonLd = [
    touristAttractionJsonLd({
      name: w.name,
      description: w.headline,
      url: `${SITE.productionUrl}/noosa-national-park/walks/${w.slug}`,
      geo: geoForSlugOrNoosa("noosa-national-park"),
      isAccessibleForFree: true,
    }),
    sectionBreadcrumb(
      "Noosa National Park",
      "/noosa-national-park",
      w.name,
      `/noosa-national-park/walks/${w.slug}`,
    ),
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="border-b border-paper-200 bg-paper-50">
        <div className="container-page py-12 md:py-20">
          <p className="eyebrow">Noosa National Park · Walk</p>
          <h1 className="mt-3 font-display text-display-xl md:text-display-xl text-ink-900 text-balance max-w-4xl">
            {w.headline}
          </h1>
          <p className="mt-3 lead max-w-3xl text-pretty">{w.name}</p>
        </div>
      </section>

      {/* Walk at a glance */}
      <section className="border-b border-paper-200 bg-paper-100">
        <div className="container-page py-10">
          <p className="eyebrow">At a glance</p>
          <dl className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="font-semibold text-ink-900">Distance</dt>
              <dd className="mt-1 text-body-md text-ink-800">{w.distance}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink-900">Grade</dt>
              <dd className="mt-1 text-body-md text-ink-800">{w.grade}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink-900">Duration</dt>
              <dd className="mt-1 text-body-md text-ink-800">{w.duration}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink-900">Start</dt>
              <dd className="mt-1 text-body-md text-ink-800">{w.startPoint}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink-900">End</dt>
              <dd className="mt-1 text-body-md text-ink-800">{w.endPoint}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink-900">Surface</dt>
              <dd className="mt-1 text-body-md text-ink-800">{w.surface}</dd>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <dt className="font-semibold text-ink-900">Elevation</dt>
              <dd className="mt-1 text-body-md text-ink-800">{w.elevation}</dd>
            </div>
          </dl>
          <p className="mt-6 text-caption text-ink-600 text-pretty">
            Distance, grade, and time per Queensland Parks and Wildlife Service —{" "}
            <a
              href="https://parks.qld.gov.au/parks/noosa/journeys/walking-tracks-summary"
              className="link text-ocean-800"
              rel="noopener noreferrer"
              target="_blank"
            >
              Walking tracks summary
            </a>
            .
          </p>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="eyebrow">What it&rsquo;s like</p>
              <p className="mt-3 prose-mdx text-body-lg text-ink-800">
                {w.whatItsLike}
              </p>
            </div>

            <div>
              <p className="eyebrow">Why people walk it</p>
              <ul className="mt-3 space-y-2 text-body-md text-ink-800">
                {w.whyPeopleWalkIt.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="text-eucalyptus-700 mt-1.5 shrink-0" aria-hidden="true">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">What to bring</p>
              <ul className="mt-3 space-y-2 text-body-md text-ink-800">
                {w.whatToBring.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-eucalyptus-700 mt-1.5 shrink-0" aria-hidden="true">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Difficulty &amp; fitness</p>
              <p className="mt-3 text-body-md text-ink-800">{w.difficulty}.</p>
            </div>

            <div>
              <p className="eyebrow">Facilities</p>
              <ul className="mt-3 space-y-2 text-body-md text-ink-800">
                {w.facilities.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-eucalyptus-700 mt-1.5 shrink-0" aria-hidden="true">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {w.notes ? (
              <aside className="callout" role="note">
                <p className="eyebrow">Note</p>
                <p className="mt-2 text-body-sm text-ink-800">{w.notes}</p>
              </aside>
            ) : null}

            <div>
              <p className="eyebrow">Safety</p>
              <ul className="mt-3 space-y-2 text-body-md text-ink-800">
                {w.safety.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="text-eucalyptus-700 mt-1.5 shrink-0" aria-hidden="true">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {w.combine ? (
              <aside className="callout-rainforest" role="note">
                <p className="eyebrow">Combine with</p>
                <p className="mt-2 text-body-sm text-ink-800">{w.combine}</p>
              </aside>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="How to get there" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  <span className="font-semibold text-ink-900">Start: </span>
                  {w.howToGetThere.start}
                </p>
                <p className="mt-2 text-body-sm text-ink-800">
                  <span className="font-semibold text-ink-900">Parking: </span>
                  {w.howToGetThere.parking}
                </p>
                {w.howToGetThere.transport ? (
                  <p className="mt-2 text-body-sm text-ink-800">
                    <span className="font-semibold text-ink-900">Transport: </span>
                    {w.howToGetThere.transport}
                  </p>
                ) : null}
              </CardBody>
            </Card>

            <Card variant="surface">
              <CardHeader eyebrow="Where to check" title="" />
              <CardBody>
                <ul className="space-y-2 text-body-sm">
                  {w.whereToCheck.map((s) => (
                    <li key={s.href} className="flex items-start gap-2">
                      <span className="text-eucalyptus-700 mt-1 shrink-0" aria-hidden="true">↗</span>
                      <a
                        href={s.href}
                        className="link text-ocean-800"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card variant="surface">
              <CardHeader eyebrow="Related" title="" />
              <CardBody>
                <ul className="space-y-2 text-body-sm">
                  <li>
                    <Link href="/noosa-national-park" className="link text-ocean-800">
                      Noosa National Park overview
                    </Link>
                  </li>
                  <li>
                    <Link href="/surf-and-weather" className="link text-ocean-800">
                      Today&rsquo;s surf and weather
                    </Link>
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
