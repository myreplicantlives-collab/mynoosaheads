/**
 * LastReviewedDate — page-level editorial integrity stamp.
 *
 * MSN-3057 (Workstream 2 — commercial page architecture):
 *   "a 'last reviewed' date" is required on every commercial page.
 *
 * MSN-3057 (Workstream 3 — reusable components):
 *   "last-reviewed dates"
 *
 * Renders as an <aside> with a clear date + the editor name. Surfaced
 * prominently on commercial pages; lives in the page footer for
 * editorial pages.
 *
 * The timestamp is set explicitly by the editor when the page is
 * reviewed; this component never reads from git or build metadata.
 * `reviewedBy` is optional; falls back to the brand editor from
 * `SITE.editor`.
 */

import { SITE } from "@/data/site";

export type LastReviewedDateProps = {
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  /** Optional override — falls back to the brand editor name. */
  reviewedBy?: string;
  /** Optional free-form note ("operator URLs re-verified"). */
  note?: string;
  /** Compact = single inline line; full = a small aside block. */
  variant?: "compact" | "full";
  className?: string;
};

export function LastReviewedDate({
  date,
  reviewedBy,
  note,
  variant = "full",
  className,
}: LastReviewedDateProps) {
  const editor = reviewedBy ?? SITE.editor.name;
  if (variant === "compact") {
    return (
      <p
        className={
          "text-caption text-ink-600 " + (className ?? "")
        }
        data-track="last_reviewed_compact"
      >
        Last reviewed <time dateTime={date}>{date}</time> · {editor}
        {note ? <span className="italic"> · {note}</span> : null}
      </p>
    );
  }
  return (
    <aside
      className={
        "rounded-lg bg-paper-100 ring-1 ring-paper-200 px-4 py-3 " +
        (className ?? "")
      }
      data-track="last_reviewed_full"
      aria-label="Last reviewed date"
    >
      <p className="text-body-sm text-ink-800 text-pretty">
        <strong className="text-ink-900">Last reviewed:</strong>{" "}
        <time dateTime={date}>{date}</time> by {editor}.
        {note ? (
          <span className="text-ink-700"> {note}</span>
        ) : null}
      </p>
    </aside>
  );
}
