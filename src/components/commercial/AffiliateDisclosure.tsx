/**
 * AffiliateDisclosure — inline ACCC Schedule 2 statement.
 *
 * MSN-3057 (Workstream 3 — Reusable conversion components):
 *   "transparent affiliate disclosure"
 *
 * Per ACCC Schedule 2 (Australian Consumer Law), every commercial
 * relationship must be disclosed clearly and prominently. This
 * component renders an inline disclosure paragraph suitable for
 * the body of a commercial-intent page, plus a longer block
 * statement for the page footer.
 *
 * The disclosure gate is driven by `lib/affiliates.ts` —
 * `isAffiliateCommercial(programme)` returns `false` until a
 * programme is enabled AND verified. When false, the component
 * renders a "not currently participating" line so we are
 * honest about the state of every commercial touchpoint on
 * the page.
 */

import {
  buildDisclosureTable,
  isAffiliateCommercial,
  type ProgrammeId,
} from "@/lib/affiliates";

export type AffiliateDisclosureProps = {
  /**
   * Programmes whose links appear on the current page. Each one is
   * either a ProgrammeId from the central config or the literal string
   * "operator-direct" for non-commercial operator-direct links.
   */
  programmes: (ProgrammeId | "operator-direct")[];
  /** Display mode — "inline" = one-liner; "block" = full paragraph. */
  mode?: "inline" | "block";
  className?: string;
};

/**
 * Wording templates — kept as constants so the disclosure language
 * is consistent across every commercial page and the /disclosure page.
 */
const INLINE_OPERATOR_DIRECT = "Some links on this page take you to the operator's own booking page.";
const INLINE_ACTIVE = "Some links on this page are affiliate links — we may earn a commission at no extra cost to you.";
const INLINE_MIXED = "Some links are affiliate links; others go straight to the operator's booking page.";

export function AffiliateDisclosure({
  programmes,
  mode = "inline",
  className,
}: AffiliateDisclosureProps) {
  const hasOperatorDirect = programmes.includes("operator-direct");
  const activeProgrammes = programmes.filter(
    (p): p is ProgrammeId => p !== "operator-direct" && isAffiliateCommercial(p),
  );

  // Pick the right one-liner.
  let inline: string;
  if (activeProgrammes.length === 0 && hasOperatorDirect) {
    inline = INLINE_OPERATOR_DIRECT;
  } else if (activeProgrammes.length > 0 && hasOperatorDirect) {
    inline = INLINE_MIXED;
  } else if (activeProgrammes.length > 0) {
    inline = INLINE_ACTIVE;
  } else {
    // Both empty — should not happen, but degrade gracefully.
    inline = "All links on this page go to public, non-commercial sources.";
  }

  if (mode === "inline") {
    return (
      <p
        className={
          "text-caption italic text-ink-600 text-pretty " + (className ?? "")
        }
        data-track="affiliate_disclosure_inline"
      >
        {inline}{" "}
        <a href="/disclosure" className="link text-ocean-800 not-italic">
          Full disclosure
        </a>
        .
      </p>
    );
  }

  // block mode — paragraph + programme list
  const table = buildDisclosureTable();
  const referenced = table.filter((p) =>
    (programmes as Array<string | ProgrammeId>).includes(p.id),
  );

  return (
    <div
      className={
        "rounded-xl bg-paper-100 ring-1 ring-paper-200 p-5 " + (className ?? "")
      }
    >
      <p className="text-body-sm text-ink-800 text-pretty">
        <strong className="text-ink-900">Affiliate disclosure.</strong>{" "}
        {inline}{" "}
        <a href="/disclosure" className="link text-ocean-800">
          Full disclosure
        </a>{" "}
        and the{" "}
        <a href="/terms" className="link text-ocean-800">
          terms of use
        </a>{" "}
        set out the editorial firewall and the programme statuses.
      </p>
      {referenced.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {referenced.map((p) => (
            <li key={p.id}>
              <span className="inline-flex items-center rounded-pill border border-paper-300 bg-paper-50 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] font-semibold text-ink-700">
                {p.displayName} ·{" "}
                {p.status === "live"
                  ? "Active"
                  : p.status === "pending"
                    ? "Pending"
                    : "Inactive"}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
