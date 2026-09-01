/**
 * HowWeChoose — page-level methodology disclosure.
 *
 * MSN-3057 (Workstream 3 — Reusable conversion components):
 *   "'how we choose' editorial methodology"
 *
 * Per the brief's trust + credibility workstream, every commercial
 * page should carry a transparent methodology block. This component
 * renders a small editorial methodology block that explains:
 *   - the criteria the editorial team uses to pick options
 *   - how often the page is reviewed
 *   - what is NOT considered (no pay-for-placement, no sponsored
 *     endorsements)
 *
 * The body is structured (criterion + rationale) so the rendering is
 * consistent across pages.
 */

export type HowWeChooseCriterion = {
  criterion: string;
  rationale: string;
};

export type HowWeChooseProps = {
  /** Optional eyebrow / heading. Default: "How we choose". */
  heading?: string;
  criteria: HowWeChooseCriterion[];
  /** Optional reviewer name (defaults to the brand editor). */
  reviewer?: string;
  className?: string;
};

export function HowWeChoose({
  heading = "How we choose",
  criteria,
  reviewer,
  className,
}: HowWeChooseProps) {
  return (
    <section
      className={
        "rounded-xl bg-paper-50 ring-1 ring-paper-200 p-5 md:p-6 " +
        (className ?? "")
      }
      data-track="how_we_choose"
      aria-labelledby="how-we-choose-heading"
    >
      <h2
        id="how-we-choose-heading"
        className="font-display text-display-sm md:text-headline-lg text-ink-900 text-balance"
      >
        {heading}
      </h2>
      <ol className="mt-4 space-y-3 text-body-sm text-ink-800 list-decimal pl-5">
        {criteria.map((c, i) => (
          <li key={i}>
            <strong className="text-ink-900">{c.criterion}.</strong>{" "}
            <span className="text-pretty">{c.rationale}</span>
          </li>
        ))}
      </ol>
      {reviewer ? (
        <p className="mt-4 text-caption italic text-ink-600">
          Reviewed by {reviewer}.
        </p>
      ) : null}
    </section>
  );
}
