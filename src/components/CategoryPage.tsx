/**
 * CategoryPage — shared layout for the 8 functional-area landing
 * pages (Sprint 1.3). Each route renders the same chrome — Hero,
 * editorial body, sources footer — but injects unique copy, sources,
 * and disclosure pills.
 *
 * Sprint 1.5 (MSN-2958 / TSK-2958-02): now also renders the category
 * hero photo (full-bleed, ~60vh) and inline images distributed
 * through the body. Both come from `src/data/photos.ts` which maps
 * Albert's verified Wikimedia inventory to each category slug.
 *
 * MSN-2959 / TSK-2959-FIX-3: the live-data strip section was removed
 * site-wide. The coast-time live tiles belong on /surf-and-weather
 * only; the category pages describe their category with editorial
 * body + sources. The homepage keeps its own distinct live-data strip
 * ("What the coast is doing right now"); /surf-and-weather is the
 * canonical live-data destination.
 *
 * Server-rendered.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import {
  Hero,
  HeroPhoto,
  CaptionedPhoto,
  Card,
  CardBody,
  CardHeader,
  Button,
  Icons,
  JsonLd,
} from "@/components/ui";
import { CATEGORY_PHOTOS, type WikimediaPhoto } from "@/data/photos";
import { SITE } from "@/data/site";

export type CategoryPageProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle: ReactNode;
  flourish?: ReactNode;
  /** Category slug — drives which photos render. Optional; if absent,
   * no photos are rendered (legacy mode). */
  slug?: string;
  primarySources: { label: string; href: string }[];
  bodySections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  disclosure?: ReactNode;
  callout?: {
    title: string;
    body: ReactNode;
    variant?: "rainforest" | "ocean";
  };
  relatedLinks?: { label: string; href: string; description: string }[];
  /** MSN-2964 — optional JSON-LD structured data block, rendered
   *  once per category page. Used for TouristDestination / Article
   *  / BreadcrumbList schemas on the 8 category routes. */
  jsonLd?: object | object[];
  /**
   * MSN-2973 — strip photographer attribution from the hero photo and
   * inline images. Set false on main-journey pages (/,
   * /accommodation, /things-to-do, /noosa-national-park,
   * /surf-and-weather) per Tim's directive. The full attribution
   * table lives at /photo-credits, linked from the footer only.
   * Defaults to true (legacy behaviour — keeps attribution on
   * /about, /webcams, /boats-and-watercraft, /travel-and-transport,
   * /fishing-reports).
   */
  showCredits?: boolean;
};

const calloutClass: Record<NonNullable<CategoryPageProps["callout"]>["variant"] & string, string> = {
  rainforest: "callout-rainforest",
  ocean: "callout",
};

export async function CategoryPage({
  eyebrow,
  title,
  subtitle,
  flourish,
  slug,
  primarySources,
  bodySections,
  disclosure,
  callout,
  relatedLinks,
  jsonLd,
  showCredits = true,
}: CategoryPageProps) {
  const photos = slug ? CATEGORY_PHOTOS[slug] : undefined;

  const creditLine = (p: WikimediaPhoto) => `Photo: ${p.author} / Wikimedia Commons · ${p.licence}`;
  const heroCredit = showCredits ? creditLine(photos!.hero) : undefined;

  // MSN-2964 — Auto-generate a BreadcrumbList + Article schema when no
  // explicit jsonLd is passed and we have a slug. This keeps the 8
  // category routes SEO-complete without each page author having to
  // hand-roll JSON-LD. Pages that need richer schemas (e.g.
  // /accommodation) pass jsonLd explicitly.
  const effectiveJsonLd = (() => {
    if (jsonLd) return jsonLd;
    if (!slug) return null;
    return [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${SITE.productionUrl}/${slug}#article`,
        url: `${SITE.productionUrl}/${slug}`,
        headline: typeof title === "string" ? title : String(slug),
        inLanguage: SITE.locale,
        isPartOf: { "@id": `${SITE.productionUrl}#website` },
        publisher: { "@id": `${SITE.productionUrl}#organization` },
        mainEntityOfPage: `${SITE.productionUrl}/${slug}`,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE.brand,
            item: SITE.productionUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: typeof title === "string" ? title : slug,
            item: `${SITE.productionUrl}/${slug}`,
          },
        ],
      },
    ];
  })();

  return (
    <div className="bg-paper-50">
      {effectiveJsonLd ? <JsonLd data={effectiveJsonLd} /> : null}
      {/* Sprint 1.5: full-bleed hero photo above the editorial hero,
       * with the eyebrow+title+subtitle overlaid.
       *
       * MSN-2975 perf chunk 2: hero photos now resolve to the
       * self-hosted WebP variants under /photos/ (see photos.ts →
       * heroWebpUrl/heroWebpSrcSet). HeroPhoto passes srcSet through
       * to next/image verbatim; the browser picks the best width
       * from the matching `sizes="100vw"` attribute. priority +
       * fetchPriority="high" both fire for LCP. */}
      {photos?.hero ? (
        <HeroPhoto
          src={photos.hero.url}
          srcSet={photos.hero.srcSet}
          alt={photos.hero.caption}
          credit={heroCredit ?? ""}
          caption={photos.hero.caption}
        />
      ) : null}
      <Hero
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        flourish={flourish}
      />

      {/* MSN-2959 / TSK-2959-FIX-3: live-data strip section removed site-wide.
       * The coast-time live tiles (surf, wind, tide, UV, sun-moon, alerts)
       * belong on the dedicated /surf-and-weather page, not duplicated
       * across 6+ category pages. Chairman directive 2026-08-27 20:05 BST.
       * Per Albert's spec §4.1: delete the entire section; do not just
       * relabel the eyebrow. The /surf-and-weather page remains the
       * canonical live-data destination; the homepage keeps its own
       * live-data strip ("What the coast is doing right now") which is
       * a distinct surface. */}

      {/* ─── Editorial body ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="cat-body-heading"
      >
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <h2 id="cat-body-heading" className="sr-only">
              Page body
            </h2>
            {bodySections.map((section, i) => (
              <section key={i} aria-labelledby={`section-${i}-h`}>
                <h3
                  id={`section-${i}-h`}
                  className="font-display text-display-sm text-ink-900 text-balance"
                >
                  {section.heading}
                </h3>
                <div className="prose-mdx mt-4">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                  {section.bullets && section.bullets.length > 0 ? (
                    <ul>
                      {section.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {/* Sprint 1.5: inline image after this section. Distribute
                 * 4 inline images across the body sections cyclically.
                 * If a category has 4 sections we get one per section;
                 * if 8 sections we still get one per section (mod 4).
                 *
                 * MSN-2975 perf chunk 2: inline photos still resolve to
                 * Wikimedia thumbnails (chunk 5 will switch the
                 * things-to-do 9-card grid + the rest of the inline
                 * grids to self-hosted WebPs). CaptionedPhoto will then
                 * accept a srcSet prop and pass it through verbatim. */}
                {photos?.inline?.[i % photos.inline.length] ? (
                  <CaptionedPhoto
                    src={photos.inline[i % photos.inline.length].url}
                    alt={photos.inline[i % photos.inline.length].caption}
                    credit={showCredits ? creditLine(photos.inline[i % photos.inline.length]) : ""}
                    caption={photos.inline[i % photos.inline.length].caption}
                  />
                ) : null}
              </section>
            ))}
            {callout ? (
              <aside
                className={calloutClass[callout.variant ?? "ocean"]}
                role="note"
              >
                <p className="eyebrow">{callout.title}</p>
                <div className="mt-2 text-body-sm text-ink-800">{callout.body}</div>
              </aside>
            ) : null}
            {disclosure ? (
              <aside className="callout" role="note">
                <p className="eyebrow">Disclosure</p>
                <div className="mt-2 text-body-sm text-ink-800">{disclosure}</div>
              </aside>
            ) : null}
          </div>

          {/* ─── Sidebar ─── */}
          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="Where to check" title="" />
              <CardBody>
                <ul className="space-y-2 text-body-sm">
                  {primarySources.map((s) => (
                    <li key={s.href} className="flex items-start gap-2">
                      <span
                        className="text-eucalyptus-700 mt-1 shrink-0"
                        aria-hidden="true"
                      >
                        <Icons.Compass size={14} />
                      </span>
                      <Link
                        href={s.href}
                        className="link text-ocean-700"
                        rel="noopener noreferrer"
                        target="_blank"
                        // MSN-2964 — outbound source link; fire a
                        // custom Plausible event so we can see which
                        // primary sources get the most clicks.
                        data-track={`source_${slug ?? "page"}_${s.label
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "_")
                          .replace(/^_|_$/g, "")
                          .slice(0, 40)}`}
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-caption text-ink-600">
                  All sources are public. If a link breaks, please{" "}
                  <Link href="/contact" className="link text-ocean-700">
                    let us know
                  </Link>
                  .
                </p>
              </CardBody>
            </Card>
            {relatedLinks && relatedLinks.length > 0 ? (
              <Card variant="surface">
                <CardHeader eyebrow="Related" title="" />
                <CardBody>
                  <ul className="space-y-3 text-body-sm">
                    {relatedLinks.map((r) => (
                      <li key={r.href}>
                        <Link href={r.href} className="link text-ocean-700 font-medium">
                          {r.label}
                        </Link>
                        <p className="text-caption text-ink-700 mt-0.5">{r.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            ) : null}
            <Card variant="surface">
              <CardHeader eyebrow="Editorial" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  Live tiles refresh every 30 minutes from BOM and Open-Meteo.
                  Editorial copy is reviewed monthly against current QPWS and
                  council sources.
                </p>
                <div className="mt-4">
                  <Button href="/contact" size="sm" variant="outline">
                    Report an error
                  </Button>
                </div>
              </CardBody>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}
