import type { Metadata } from "next";
import Link from "next/link";
import { Hero, JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";

/**
 * /corrections — public corrections policy and running corrections log.
 *
 * MSN-3057 M3 Workstream 4: trust + editorial pages. This page is the
 * single source of truth for what we have corrected and why. The
 * editor name + last-reviewed date are rendered from `SITE.editor` so
 * the corrections policy stays consistent with the footer.
 *
 * The form of correction is "what we said → what was wrong → what we
 * changed" — no vague "we strive for accuracy" copy.
 *
 * Australian Press Council-style language: factual errors are
 * corrected promptly and prominently. Substantive errors carry a note
 * at the top of the affected page for 30 days.
 */

export const metadata: Metadata = {
  title: "Corrections",
  description:
    "How MyNoosaHeads handles factual errors. The corrections policy, the running corrections log, and how to report a mistake.",
  alternates: { canonical: "/corrections" },
  openGraph: {
    title: `Corrections · ${SITE.brand}`,
    description: "Our corrections policy and the running corrections log.",
    url: "/corrections",
    type: "article",
  },
};

const CORRECTIONS: Array<{
  date: string;
  page: string;
  what: string;
  why: string;
  fix: string;
}> = [
  {
    date: "2026-09-01",
    page: "/surf-and-weather",
    what: "Surf report page header read ‘powered by Surfline’ in the M1 build.",
    why: "Surfline is not a source we link to. The phrasing leaked from a legacy header snippet.",
    fix: "Header rewritten to list the actual data sources (BOM Tewantin, Open-Meteo, SLSQ patrolled-beach status, MSQ bar crossings). Surfline wording removed across the page.",
  },
];

export default function CorrectionsPage() {
  const updated = "2026-09-01";
  const editor = SITE.editor.name;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE.productionUrl}/corrections#page`,
      url: `${SITE.productionUrl}/corrections`,
      name: `Corrections · ${SITE.brand}`,
      inLanguage: SITE.locale,
      isPartOf: { "@id": `${SITE.productionUrl}#website` },
      dateModified: updated,
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      <Hero
        eyebrow="Editorial integrity"
        title="Corrections policy."
        subtitle="What we do when we get something wrong — and a running log of corrections we have made."
        flourish="If you spot a mistake, please tell us."
      />

      <section
        className="container-narrow py-12 md:py-16"
        aria-labelledby="policy-heading"
      >
        <h2
          id="policy-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          The policy.
        </h2>
        <p className="mt-5 lead text-ink-800 text-pretty">
          When a factual error is confirmed we correct it, we say what
          we changed, and we record the correction below. We do not
          silently edit pages and hope nobody noticed. Corrections are
          dated and attributed to the editor who signed off the fix.
        </p>
        <ul className="mt-6 space-y-4 text-body-md text-ink-700 text-pretty list-disc pl-5">
          <li>
            <strong className="text-ink-900">Factual errors</strong> are
            corrected on the page within five working days of
            confirmation and added to the log below. Substantive
            errors also carry a correction notice at the top of the
            affected page for 30 days.
          </li>
          <li>
            <strong className="text-ink-900">Data errors</strong> on
            live-data pages (surf, weather, webcams) are usually caused
            by the upstream provider, not by us. We fix the upstream
            link first, then leave a note on the affected page until
            the upstream feed stabilises.
          </li>
          <li>
            <strong className="text-ink-900">Opinion or recommendation
            changes</strong> are not corrections. If we change a
            recommended operator or a piece of advice, we update the
            page and the{" "}
            <Link href="/last-reviewed" className="link">
              last-reviewed
            </Link>{" "}
            stamp, but we do not log it as a correction.
          </li>
        </ul>
      </section>

      <section
        className="container-narrow py-12 md:py-16 border-t border-paper-200"
        aria-labelledby="log-heading"
      >
        <h2
          id="log-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          The log.
        </h2>
        <p className="mt-4 text-body-sm text-ink-600">
          Last reviewed <time dateTime={updated}>{updated}</time> by{" "}
          {editor}.
        </p>

        <ol className="mt-8 space-y-8">
          {CORRECTIONS.map((c, i) => (
            <li
              key={c.date + i}
              className="rounded-xl bg-paper-100 ring-1 ring-paper-200 p-6"
            >
              <p className="text-caption text-ink-600">
                <time dateTime={c.date}>{c.date}</time> ·{" "}
                <Link href={c.page} className="link">
                  {c.page}
                </Link>
              </p>
              <p className="mt-3 text-body-md text-ink-900">
                <strong className="text-ink-900">What we said:</strong>{" "}
                {c.what}
              </p>
              <p className="mt-2 text-body-md text-ink-800">
                <strong className="text-ink-900">Why it was wrong:</strong>{" "}
                {c.why}
              </p>
              <p className="mt-2 text-body-md text-ink-800">
                <strong className="text-ink-900">What we changed:</strong>{" "}
                {c.fix}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-body-md text-ink-700 text-pretty">
          See something wrong?{" "}
          <Link href="/contact" className="link">
            Tell the editor
          </Link>
          . Please include the page URL and the line you’re querying —
          that gets it fixed fastest.
        </p>
      </section>
    </div>
  );
}
