import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd, Card, CardBody, CardHeader } from "@/components/ui";
import { SITE } from "@/data/site";
import { EXPERIENCES, EXPERIENCES_BY_SLUG } from "@/data/experiences";
import {
  touristAttractionJsonLd,
  sectionBreadcrumb,
  geoForSlugOrNoosa,
} from "@/lib/schema";

/**
 * /things-to-do/[slug] — MSN-2975 V2 individual experience page.
 *
 * Atmospheric standalone page for one of the four anchor experiences.
 * Pulls content from /data/experiences.ts (Albert's D2 brief).
 *
 * Per V2 voice guide (D8):
 *   - Headline leads with the visitor's action
 *   - "What this looks like" answers the actual question
 *   - One CTA per section, defer safety to authoritative sources
 */

export function generateStaticParams() {
  return EXPERIENCES.map((e) => ({ slug: e.slug }));
}

type PageProps = { params: { slug: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  const exp = EXPERIENCES_BY_SLUG[params.slug];
  if (!exp) return { title: "Not found" };
  return {
    title: `${exp.title} · Things to do in Noosa`,
    description: exp.hook,
    alternates: { canonical: `/things-to-do/${exp.slug}` },
    openGraph: {
      title: `${exp.title} · MyNoosaHeads`,
      description: exp.hook,
      url: `/things-to-do/${exp.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${exp.title} · MyNoosaHeads`,
      description: exp.hook,
    },
  };
}

export default function ExperiencePage({ params }: PageProps) {
  const exp = EXPERIENCES_BY_SLUG[params.slug];
  if (!exp) notFound();

  // MSN-3057 M4 — `Article` swapped for `TouristAttraction` per Albert §4.2.
  // Activities are bookable experiences, not editorial articles.
  // `geo` added using the Noosa-headland centroid (precise per-activity
  // coords are not yet curated; the area centroid is correct for SEO).
  const geo = geoForSlugOrNoosa("noosa-headland");
  const jsonLd = [
    touristAttractionJsonLd({
      name: exp.title,
      description: exp.hook,
      url: `${SITE.productionUrl}/things-to-do/${exp.slug}`,
      geo,
    }),
    sectionBreadcrumb(
      "Things to do",
      "/things-to-do",
      exp.title,
      `/things-to-do/${exp.slug}`,
    ),
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="border-b border-paper-200 bg-paper-50">
        <div className="container-page py-12 md:py-20">
          <p className="eyebrow">Things to do · Noosa</p>
          <h1 className="mt-3 font-display text-display-xl md:text-display-xl text-ink-900 text-balance max-w-4xl">
            {exp.headline}
          </h1>
          <p className="mt-5 lead max-w-3xl text-pretty">{exp.hook}</p>
          <p className="mt-4 text-caption text-ink-700 italic font-display">
            {exp.bestFor}
          </p>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="eyebrow">What this looks like</p>
              <p className="mt-3 prose-mdx text-body-lg text-ink-800">
                {exp.whatItLooksLike}
              </p>
            </div>

            <div>
              <p className="eyebrow">What to bring</p>
              <ul className="mt-3 space-y-2 text-body-md text-ink-800">
                {exp.whatToBring.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-eucalyptus-700 mt-1.5 shrink-0" aria-hidden="true">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">How long &amp; difficulty</p>
              <p className="mt-3 text-body-md text-ink-800">
                <span className="font-semibold text-ink-900">Duration: </span>
                {exp.howLong}
              </p>
              <p className="mt-2 text-body-md text-ink-800">
                <span className="font-semibold text-ink-900">Difficulty: </span>
                {exp.difficulty}
              </p>
            </div>

            {exp.options.length > 0 ? (
              <div>
                <p className="eyebrow">Where to book</p>
                <ul className="mt-3 space-y-3">
                  {exp.options.map((o) => (
                    <li key={o.href} className="text-body-md text-ink-800">
                      <a
                        href={o.href}
                        className="link text-ocean-800 font-semibold"
                        rel="noopener noreferrer"
                        target="_blank"
                        data-track={`ttd_${exp.slug}_${o.label.toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 30)}`}
                      >
                        {o.label}
                      </a>
                      {o.caption ? (
                        <p className="mt-1 text-body-sm text-ink-700">{o.caption}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              <p className="eyebrow">Safety</p>
              <ul className="mt-3 space-y-2 text-body-md text-ink-800">
                {exp.safety.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="text-eucalyptus-700 mt-1.5 shrink-0" aria-hidden="true">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="Where to check" title="" />
              <CardBody>
                <ul className="space-y-2 text-body-sm">
                  {exp.whereToCheck.map((s) => (
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
                    <Link href="/surf-and-weather" className="link text-ocean-800">
                      Today&rsquo;s surf and weather
                    </Link>
                  </li>
                  <li>
                    <Link href="/noosa-national-park" className="link text-ocean-800">
                      Noosa National Park walks
                    </Link>
                  </li>
                  <li>
                    <Link href="/accommodation" className="link text-ocean-800">
                      Where to stay
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
