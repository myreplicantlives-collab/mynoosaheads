/**
 * PriceDisclaimer — visitor-facing price + availability caveat.
 *
 * MSN-3057 (Workstream 3 — Reusable conversion components):
 *   "price/availability disclaimers"
 *
 * Per ACCC Schedule 2 + the Australian Consumer Law, prices and
 * availability shown to consumers must not be misleading. Because
 * MyNoosaHeads does not run a booking engine, every price and
 * availability check is delegated to the operator's site. This
 * component renders a restrained caveat that:
 *   1. Defers the price to the operator (no fabricated numbers).
 *   2. Defers the availability check to the operator (no
 *      false-availability claims).
 *   3. Names the source so the visitor knows whose data they are
 *      looking at when they click through.
 */

import type { ReactNode } from "react";

export type PriceDisclaimerProps = {
  /** Operator name (e.g. "Booking.com", "Netanya Noosa"). */
  source: string;
  /** Optional reason / context line shown in italics below the bold statement. */
  detail?: ReactNode;
  /** Compact mode renders a single-line sentence; default renders a small block. */
  compact?: boolean;
  className?: string;
};

export function PriceDisclaimer({
  source,
  detail,
  compact = false,
  className,
}: PriceDisclaimerProps) {
  if (compact) {
    return (
      <p
        className={
          "text-caption italic text-ink-600 text-pretty " + (className ?? "")
        }
        data-track="price_disclaimer_compact"
      >
        Prices and availability are set by {source}. Verify before you book.
      </p>
    );
  }
  return (
    <aside
      className={
        "rounded-lg bg-paper-50 ring-1 ring-paper-200 px-4 py-3 " +
        (className ?? "")
      }
      data-track="price_disclaimer_block"
      aria-label={`Price and availability disclaimer for ${source}`}
    >
      <p className="text-body-sm text-ink-800 text-pretty">
        <strong className="text-ink-900">Prices and availability:</strong>{" "}
        set and confirmed by {source}. Verify at the operator&apos;s site before
        you book.
      </p>
      {detail ? (
        <p className="mt-1 text-caption italic text-ink-600 text-pretty">
          {detail}
        </p>
      ) : null}
    </aside>
  );
}
