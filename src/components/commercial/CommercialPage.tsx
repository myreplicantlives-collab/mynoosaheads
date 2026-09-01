/**
 * CommercialPage — shared layout for the 22 commercial-cluster pages.
 *
 * MSN-3057 (Workstream 2 — commercial page architecture):
 *   "Every commercial page must provide genuine decision-making value
 *    and should include:
 *      * a clear visitor need or search intent
 *      * an editorial introduction
 *      * an appropriate number of credible options
 *      * concise 'best for' labels
 *      * useful comparison information
 *      * location and transport context
 *      * transparent affiliate disclosure
 *      * a clear primary CTA
 *      * related editorial links
 *      * a 'last reviewed' date
 *      * accurate source records"
 *
 * This layout is the chassis that delivers those requirements. Each
 * page imports the layout, supplies its content sections, and the
 * layout renders them in the editorial register.
 *
 * Pages that are not yet ready for publication wrap their content in
 * <NotReadyBanner> at the top so the page framework is visible
 * without misrepresenting the depth of the content.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { type ProgrammeId } from "@/lib/affiliates";
import {
  AffiliateDisclosure,
  HowWeChoose,
  LastReviewedDate,
  MobileStickyCTA,
  NotReadyBanner,
  PriceDisclaimer,
  RelatedRecommendations,
  type RelatedRecommendation,
} from "@/components/commercial";

export type CommercialPageProps = {
  /** Route slug — used in JSON-LD and breadcrumbs. */
  slug: string;
  /** Page metadata: title and description (used for the HTML head). */
  title: string;
  description: string;
  /** Editorial category (e.g. "Where to stay", "Things to do"). */
  category: string;
  /** Eyebrow / sub-heading — e.g. "Best places to stay". */
  intent: string;
  /** H1 — kept short and editorial. */
  h1: ReactNode;
  /** One-paragraph editorial introduction. */
  intro: ReactNode;
  /** Hero image. */
  hero: {
    src: string;
    alt: string;
    srcSet?: string;
  };
  /** "Not ready for publication" banner reason. When set, the page
   *  renders with the banner at top + a subdued tone. */
  notReady?: { reason: string; detail?: ReactNode; targetDate?: string };
  /** Page sections — headings + body content. Rendered in order. */
  sections: Array<{
    heading: string;
    body: ReactNode;
  }>;
  /** Optional location + transport context block. */
  locationContext?: ReactNode;
  /** Comparison table — optional. */
  comparisonTable?: ReactNode;
  /** Primary CTA for the sticky bar. */
  stickyPrimary?: {
    label: string;
    href: string;
    placement: string;
    external?: boolean;
  };
  /** Programmes used on this page. Drives the affiliate disclosure. */
  programmes: (ProgrammeId | "operator-direct")[];
  /** Price + availability source name. */
  priceSource: string;
  /** Last reviewed date. */
  lastReviewed: string;
  /** Optional methodology block. */
  methodology?: ReactNode;
  /** Related guides list. */
  related: RelatedRecommendation[];
  /** JSON-LD — defaults to a WebPage schema; override for richer types. */
  jsonLd?: object;
};

export function CommercialPage({
  slug,
  title,
  description,
  category,
  intent,
  h1,
  intro,
  hero,
  notReady,
  sections,
  locationContext,
  comparisonTable,
  stickyPrimary,
  programmes,
  priceSource,
  lastReviewed,
  methodology,
  related,
  jsonLd,
}: CommercialPageProps) {
  const canonical = `${SITE.productionUrl}/${slug.replace(/^\//, "")}`;
  const jsonLdPayload =
    jsonLd ?? {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": canonical,
      url: canonical,
      name: title,
      description,
      inLanguage: SITE.locale,
      isPartOf: { "@id": `${SITE.productionUrl}#website` },
      publisher: { "@id": `${SITE.productionUrl}#organization` },
      dateModified: lastReviewed,
    };
  return (
    <div className="bg-paper-50 pb-24 md:pb-0">
      <JsonLd data={jsonLdPayload} />

      {/* ─── 1. Hero ──────────────────────────────────────────────── */}
      <section
        aria-label={title}
        className="relative w-full overflow-hidden bg-ink-900 h-[55vh] min-h-[420px] max-h-[680px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.src}
          srcSet={hero.srcSet}
          alt={hero.alt}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-900/15 via-transparent to-ink-900/35"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent"
          aria-hidden="true"
        />
        <div className="relative h-full w-full">
          <div className="container-page h-full flex flex-col justify-end pb-12 md:pb-16">
            <p className="eyebrow text-paper-300">{category.toUpperCase()}</p>
            <p className="mt-1 text-caption text-paper-300 italic">
              {intent}
            </p>
            <h1
              className="mt-2 font-display text-display-lg md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              {h1}
            </h1>
          </div>
        </div>
      </section>

      {/* ─── 2. Not-ready banner (if applicable) ───────────────────── */}
      {notReady ? (
        <section className="container-page pt-8">
          <NotReadyBanner
            reason={notReady.reason}
            detail={notReady.detail}
            targetDate={notReady.targetDate}
          />
        </section>
      ) : null}

      {/* ─── 3. Editorial intro ───────────────────────────────────── */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="intro-heading"
      >
        <div className="container-page py-10 md:py-14">
          <div className="max-w-3xl">
            <h2
              id="intro-heading"
              className="font-display text-display-sm md:text-headline-lg text-ink-900 text-balance"
            >
              Quick read
            </h2>
            <div className="mt-4 lead text-ink-800 text-pretty">{intro}</div>
          </div>
        </div>
      </section>

      {/* ─── 4. Body sections (the page's core content) ───────────── */}
      {sections.map((s, i) => (
        <section
          key={i}
          className={
            i % 2 === 0
              ? "bg-paper-50 border-b border-paper-200"
              : "bg-paper-100 border-b border-paper-200"
          }
          aria-labelledby={`section-${i}-heading`}
        >
          <div className="container-page py-12 md:py-16">
            <h2
              id={`section-${i}-heading`}
              className="font-display text-display-sm md:text-headline-lg text-ink-900 text-balance"
            >
              {s.heading}
            </h2>
            <div className="mt-4 max-w-3xl text-body-md text-ink-800 text-pretty [&_p+p]:mt-4">
              {s.body}
            </div>
          </div>
        </section>
      ))}

      {/* ─── 5. Location + transport context ──────────────────────── */}
      {locationContext ? (
        <section
          className="container-page py-12 md:py-16 border-b border-paper-200"
          aria-labelledby="location-heading"
        >
          <h2
            id="location-heading"
            className="font-display text-display-sm md:text-headline-lg text-ink-900 text-balance"
          >
            Location and transport.
          </h2>
          <div className="mt-4 max-w-3xl text-body-md text-ink-800 text-pretty [&_p+p]:mt-4">
            {locationContext}
          </div>
        </section>
      ) : null}

      {/* ─── 6. Comparison table ──────────────────────────────────── */}
      {comparisonTable ? (
        <section
          className="container-page py-12 md:py-16 border-b border-paper-200"
          aria-labelledby="comparison-heading"
        >
          <h2
            id="comparison-heading"
            className="font-display text-display-sm md:text-headline-lg text-ink-900 text-balance"
          >
            Side by side.
          </h2>
          <div className="mt-6">{comparisonTable}</div>
        </section>
      ) : null}

      {/* ─── 7. Price + affiliate disclosure ──────────────────────── */}
      <section
        className="container-page py-12 md:py-16 border-b border-paper-200"
        aria-labelledby="commercial-disclosure-heading"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <PriceDisclaimer source={priceSource} />
          <AffiliateDisclosure programmes={programmes} mode="block" />
        </div>
      </section>

      {/* ─── 8. Methodology (optional) ─────────────────────────────── */}
      {methodology ? (
        <section
          className="container-page py-12 md:py-16 border-b border-paper-200"
          aria-labelledby="methodology-heading"
        >
          <h2 id="methodology-heading" className="sr-only">
            Methodology
          </h2>
          {methodology}
        </section>
      ) : null}

      {/* ─── 9. Related guides ────────────────────────────────────── */}
      <section className="container-page py-12 md:py-16 border-b border-paper-200">
        <RelatedRecommendations items={related} />
      </section>

      {/* ─── 10. Last reviewed ────────────────────────────────────── */}
      <section className="container-page py-10">
        <LastReviewedDate date={lastReviewed} note="operator URLs re-verified" />
      </section>

      {/* ─── 11. Mobile sticky CTA (md+ hidden) ──────────────────── */}
      {stickyPrimary ? (
        <MobileStickyCTA
          enabled={!!stickyPrimary}
          primary={stickyPrimary}
        />
      ) : null}
    </div>
  );
}

/**
 * Helper — link back to the parent hub from a child commercial page.
 * Used by every accommodation /things-to-do child page footer.
 */
export function ParentHubLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <p className="text-body-sm text-ink-700">
      ←{" "}
      <Link href={href} className="link text-ocean-800" data-track={`parent_hub_${href}`}>
        Back to {label}
      </Link>
    </p>
  );
}
