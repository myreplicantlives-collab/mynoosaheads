import type { Metadata } from "next";
import Link from "next/link";
import { Hero, JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";

/**
 * /editorial-standards — public methodology page.
 *
 * MSN-3057 M3 Workstream 4: trust + editorial pages. This is the
 * methodology counterpart to /corrections — what we do *before* a
 * page is published.
 *
 * The page is written so a journalist or a reader can audit a page
 * on this site and reproduce the methodology. No internal jargon, no
 * developer-facing notes, no chairman-directive references in the
 * visitor-visible copy.
 */

export const metadata: Metadata = {
  title: "Editorial standards",
  description:
    "How MyNoosaHeads is researched and written. The methodology behind every page — sources, last-reviewed dates, and the affiliate firewall.",
  alternates: { canonical: "/editorial-standards" },
  openGraph: {
    title: `Editorial standards · ${SITE.brand}`,
    description: "The methodology behind every page on MyNoosaHeads.",
    url: "/editorial-standards",
    type: "article",
  },
};

export default function EditorialStandardsPage() {
  const updated = "2026-09-01";
  const editor = SITE.editor.name;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE.productionUrl}/editorial-standards#page`,
      url: `${SITE.productionUrl}/editorial-standards`,
      name: `Editorial standards · ${SITE.brand}`,
      inLanguage: SITE.locale,
      isPartOf: { "@id": `${SITE.productionUrl}#website` },
      dateModified: updated,
      author: {
        "@type": "Organization",
        name: SITE.brand,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE.productionUrl}#editor`,
      name: editor,
      worksFor: { "@id": `${SITE.productionUrl}#organization` },
      url: `${SITE.productionUrl}/about`,
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      <Hero
        eyebrow="Editorial standards"
        title="How we research and write a page."
        subtitle="The methodology behind every guide on MyNoosaHeads. Sources, last-reviewed dates, the affiliate firewall, and what we don’t do."
        flourish="Every page links back to its evidence."
      />

      <section
        className="container-narrow py-12 md:py-16"
        aria-labelledby="sources-heading"
      >
        <h2
          id="sources-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          Where the facts come from.
        </h2>
        <p className="mt-5 lead text-ink-800 text-pretty">
          Every claim on a guide page is anchored to a named source.
          For live conditions (surf, weather, tides, webcams) the
          source is the upstream provider — the Bureau of Meteorology
          station at Tewantin, the Open-Meteo marine model, Surf Life
          Saving Queensland for patrolled-beach status, the Maritime
          Safety Queensland bar-crossing report. We link to the source
          page, not a third-party summary.
        </p>
        <p className="mt-5 text-body-md text-ink-800 text-pretty">
          For editorial claims (best accommodation for families,
          walkable area, ferry frequency, market days) the source is
          the operator, the local council, or the state government.
          Where we cannot anchor a claim to a public source we soften
          the language or remove the claim.
        </p>
        <p className="mt-5 text-body-md text-ink-800 text-pretty">
          See the data-source index on{" "}
          <Link href="/live-conditions" className="link">
            /live-conditions
          </Link>
          .
        </p>
      </section>

      <section
        className="container-narrow py-12 md:py-16 border-t border-paper-200"
        aria-labelledby="reviewed-heading"
      >
        <h2
          id="reviewed-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          Last-reviewed dates.
        </h2>
        <p className="mt-5 text-body-md text-ink-800 text-pretty">
          Every page on the site carries a last-reviewed stamp at the
          foot of the page. The stamp records the date the page was
          last checked end-to-end — operator links, hours, prices,
          data-source URLs, schema, and the affiliate disclosure. The
          editor who signs off the review is named; that name is the
          same on every page so it is auditable.
        </p>
        <p className="mt-5 text-body-md text-ink-800 text-pretty">
          Reviews are scheduled on a rolling cycle. Commercial pages
          (accommodation, things to do, travel) are reviewed quarterly
          as a minimum. Live-data pages (surf, weather) are reviewed
          monthly because the upstream providers update their feeds
          frequently.
        </p>
      </section>

      <section
        className="container-narrow py-12 md:py-16 border-t border-paper-200"
        aria-labelledby="firewall-heading"
      >
        <h2
          id="firewall-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          The affiliate firewall.
        </h2>
        <p className="mt-5 text-body-md text-ink-800 text-pretty">
          Affiliate programmes pay a commission when a reader books or
          purchases through a tracked link. Affiliate relationships do
          not influence what we write. The firewall is mechanical:
        </p>
        <ul className="mt-5 space-y-3 text-body-md text-ink-800 text-pretty list-disc pl-5">
          <li>
            Editorial sections are written and signed off before any
            affiliate link is attached.
          </li>
          <li>
            Operators are not given advance sight of the editorial
            copy.
          </li>
          <li>
            Operators are not told they will be ranked, featured, or
            omitted.
          </li>
          <li>
            Every commercial page carries an{" "}
            <Link href="/disclosure" className="link">
              affiliate disclosure
            </Link>{" "}
            at the top, and the same disclosure is linked from every
            individual booking link.
          </li>
          <li>
            The full list of partner programmes is published on{" "}
            <Link href="/disclosure" className="link">
              /disclosure
            </Link>
            , with the status of each programme.
          </li>
        </ul>
      </section>

      <section
        className="container-narrow py-12 md:py-16 border-t border-paper-200"
        aria-labelledby="wont-heading"
      >
        <h2
          id="wont-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          What we don’t do.
        </h2>
        <ul className="mt-5 space-y-3 text-body-md text-ink-800 text-pretty list-disc pl-5">
          <li>
            We do not invent scarcity ("only 2 rooms left") or
            countdown timers.
          </li>
          <li>
            We do not publish prices that we have not verified against
            the operator’s own site within the last review cycle.
          </li>
          <li>
            We do not use a venue’s photo for a different venue.
            Every photograph on the site is captioned with the
            landmark or operator, the photographer, and the licence —
            see{" "}
            <Link href="/photo-credits" className="link">
              /photo-credits
            </Link>
            .
          </li>
          <li>
            We do not run third-party advertising or sponsored content
            blocks on editorial pages. Where a venue is a paying
            partner, that is disclosed on the page.
          </li>
        </ul>
        <p className="mt-8 text-body-sm text-ink-600">
          Last reviewed <time dateTime={updated}>{updated}</time> by{" "}
          {editor}.
        </p>
      </section>
    </div>
  );
}
