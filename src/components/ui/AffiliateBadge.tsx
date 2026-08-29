/**
 * AffiliateBadge — inline "Affiliate" disclosure marker.
 *
 * MSN-2959 chairman directive: every monetised outbound link to an
 * affiliate programme must carry an inline visual marker before the
 * user clicks. Per ACCC Schedule 2 (Australian Consumer Law), material
 * connections must be disclosed prior to the consumer's action.
 *
 * MSN-2964 (directive B): rendering is gated by VERIFIED_AFFILIATES
 * in src/data/site.ts. Until a programme's participation is verified,
 * the badge must not render. Do not claim participation in a specific
 * programme unless participation is verified.
 *
 * Two display modes:
 *   - "inline"  (default)  small italic label that sits next to the
 *                         link text. Designed to look like part of the
 *                         link itself, not like a separate badge.
 *   - "compact"            uppercase pill-style, for tight button rows.
 *
 * Hover behaviour: the badge itself is non-interactive (it's a span),
 * but the surrounding link has a `title` attribute via the consumer
 * that surfaces the full disclosure on hover. For pure badge use, the
 * `tooltip` prop renders the long-form disclosure on hover.
 *
 * The visual register is intentionally restrained — this is a calm,
 * premium publication, not an aggressive monetisation surface. The
 * badge sits inside the ocean palette so it reads as "disclosure",
 * not "warning".
 */

import type { CSSProperties } from "react";

export type AffiliateBadgeProps = {
  /** Programme name (only used for accessibility metadata when supplied). Optional — falls back to "Affiliate". */
  programme?: string;
  /** Visual mode. "inline" = italic note; "compact" = uppercase pill. */
  mode?: "inline" | "compact";
  /**
   * Tooltip text shown on hover. If absent, we render the canonical
   * ACCC-compliant disclosure language.
   */
  tooltip?: string;
  className?: string;
};

const DEFAULT_TOOLTIP =
  "We earn a small commission on this link at no extra cost to you.";

export function AffiliateBadge({
  programme,
  mode = "inline",
  tooltip = DEFAULT_TOOLTIP,
  className,
}: AffiliateBadgeProps) {
  const label = programme ? `${programme} · Affiliate` : "Affiliate";
  if (mode === "compact") {
    return (
      <span
        className={
          "ml-2 inline-flex items-center gap-1 rounded-pill border border-ocean-200 bg-ocean-50 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] font-semibold text-ocean-700 " +
          (className ?? "")
        }
        title={tooltip}
        aria-label={`Affiliate link: ${programme ?? "commercial partner"}`}
      >
        Affiliate
      </span>
    );
  }
  // inline mode — italic note that reads as part of the link
  return (
    <span
      className={
        "ml-1.5 inline-flex items-baseline gap-1 align-middle text-caption italic text-ocean-700 " +
        (className ?? "")
      }
      title={tooltip}
      aria-label={`Affiliate link: ${programme ?? "commercial partner"}`}
      style={{ fontStyle: "italic" } satisfies CSSProperties}
    >
      · Affiliate
    </span>
  );
}

export type { AffiliateBadgeProps as AffiliateBadgePropsOriginal };
