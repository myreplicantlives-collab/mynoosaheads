/**
 * ComparisonTable — side-by-side comparison of areas, operators, or
 * transport options.
 *
 * MSN-3057 (Workstream 3 — Reusable conversion components):
 *   "comparison tables"
 *
 * Used by:
 *   - /accommodation/hastings-versus-noosaville (area decision aid)
 *   - /travel-and-transport/brisbane-airport-to-noosa (option comparison)
 *   - any future page that needs a side-by-side comparison
 *
 * Visitor-readable, mobile-first. The first column is the row label,
 * the remaining columns are the options. Optional caption sits
 * above the table; optional source citation sits below.
 */

import type { ReactNode } from "react";

export type ComparisonTableColumn = {
  /** Short column heading — e.g. "Hastings Street". */
  heading: string;
  /** Optional short subtitle / "best for" tag under the heading. */
  bestFor?: string;
};

export type ComparisonTableRow = {
  /** Row label — e.g. "Walk to Main Beach". */
  label: string;
  /** Cell values — one per column, in the same order. Use a string,
   *  number, or short ReactNode (em-dash "—" for "not applicable"). */
  values: ReactNode[];
};

export type ComparisonTableProps = {
  columns: ComparisonTableColumn[];
  rows: ComparisonTableRow[];
  /** Optional caption above the table. */
  caption?: ReactNode;
  /** Optional source citation below the table. */
  source?: ReactNode;
  /** Mobile behaviour — "scroll" = horizontally scrollable; "stack" = stacked. */
  mobile?: "scroll" | "stack";
  className?: string;
};

export function ComparisonTable({
  columns,
  rows,
  caption,
  source,
  mobile = "scroll",
  className,
}: ComparisonTableProps) {
  const wrapperClass =
    mobile === "scroll" ? "overflow-x-auto" : "grid gap-3 md:grid-cols-2";

  return (
    <div
      className={
        "rounded-xl bg-paper-50 ring-1 ring-paper-200 p-4 md:p-6 " +
        (className ?? "")
      }
      data-track="comparison_table"
    >
      {caption ? (
        <p className="mb-3 text-caption italic text-ink-600">{caption}</p>
      ) : null}
      {mobile === "stack" ? (
        <StackedTable columns={columns} rows={rows} />
      ) : (
        <div className={wrapperClass}>
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="border-b-2 border-paper-300">
                <th scope="col" className="py-3 pr-3 font-display text-headline-md text-ink-900 align-bottom">
                  <span className="sr-only">Aspect</span>
                </th>
                {columns.map((c, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="py-3 pr-3 font-display text-headline-md text-ink-900"
                  >
                    {c.heading}
                    {c.bestFor ? (
                      <p className="mt-0.5 text-caption italic font-normal text-ink-600">
                        {c.bestFor}
                      </p>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-paper-200 align-top">
                  <th
                    scope="row"
                    className="py-3 pr-3 text-ink-900 font-medium whitespace-nowrap"
                  >
                    {row.label}
                  </th>
                  {row.values.map((v, j) => (
                    <td key={j} className="py-3 pr-3 text-ink-800 text-pretty">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {source ? (
        <p className="mt-4 text-caption text-ink-600">{source}</p>
      ) : null}
    </div>
  );
}

/** Stacked mobile variant — column headings appear above each card. */
function StackedTable({
  columns,
  rows,
}: {
  columns: ComparisonTableColumn[];
  rows: ComparisonTableRow[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {columns.map((col, ci) => (
        <div key={ci} className="rounded-lg bg-paper-100 p-4 ring-1 ring-paper-200">
          <h4 className="font-display text-headline-md text-ink-900">
            {col.heading}
          </h4>
          {col.bestFor ? (
            <p className="mt-0.5 text-caption italic text-ink-600">
              {col.bestFor}
            </p>
          ) : null}
          <dl className="mt-3 space-y-2 text-body-sm">
            {rows.map((row, ri) => (
              <div key={ri}>
                <dt className="eyebrow text-ink-600">{row.label}</dt>
                <dd className="mt-0.5 text-ink-800 text-pretty">
                  {row.values[ci] ?? "—"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
