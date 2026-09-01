/**
 * BestForBadge — concise "best for" tag.
 *
 * MSN-3057 (Workstream 3 — Reusable conversion components):
 *   "concise 'best for' labels"
 *
 * Two display modes:
 *   - compact  uppercase pill, suitable for narrow rows
 *   - inline   sentence-case tag, suitable under a card title
 *
 * Colour palette follows the design-system ocean/rainforest tokens so
 * the badge reads as part of the editorial design, not as advertising.
 */

import type { CSSProperties } from "react";

export type BestForBadgeProps = {
  label: string;
  mode?: "compact" | "inline";
  className?: string;
  /** Optional title / tooltip on hover. */
  tooltip?: string;
};

export function BestForBadge({
  label,
  mode = "inline",
  className,
  tooltip,
}: BestForBadgeProps) {
  if (mode === "compact") {
    return (
      <span
        className={
          "inline-flex items-center rounded-pill border border-paper-300 bg-paper-100 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] font-semibold text-ink-700 " +
          (className ?? "")
        }
        title={tooltip ?? `Best for: ${label}`}
        aria-label={`Best for: ${label}`}
      >
        {label}
      </span>
    );
  }
  return (
    <span
      className={
        "inline-flex items-baseline gap-1 align-middle text-caption text-eucalyptus-700 " +
        (className ?? "")
      }
      title={tooltip ?? `Best for: ${label}`}
      aria-label={`Best for: ${label}`}
      style={{ fontStyle: "italic" } satisfies CSSProperties}
    >
      Best for: {label}
    </span>
  );
}
