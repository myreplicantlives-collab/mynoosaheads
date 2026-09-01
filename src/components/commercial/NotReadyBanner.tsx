/**
 * NotReadyBanner — honest "not yet ready" call-out.
 *
 * Per the verbatim brief:
 *   "Where insufficient verified content exists, create the page
 *    framework and mark it as not ready for publication rather than
 *    publishing weak content."
 *
 * This component renders a visible banner at the top of a page that
 * is in the framework-only state. The banner is honest about why
 * the page is not yet ready (missing operator verification, missing
 * pricing data, etc.) so visitors do not mistake the page for a
 * finished recommendation.
 *
 * The banner uses the same accent palette as the rest of the
 * design system (ocean border, paper-100 surface) and is rendered
 * with high contrast so it is not missed.
 */

import type { ReactNode } from "react";

export type NotReadyBannerProps = {
  /**
   * Why the page is not yet ready. Be specific — visitors respect
   * "We're verifying the operator URLs and surf-school pricing" more
   * than a generic "Coming soon".
   */
  reason: string;
  /**
   * Editor's note — what is missing and what will change. Optional.
   */
  detail?: ReactNode;
  /** When the page is expected to be publication-ready (optional). */
  targetDate?: string;
  className?: string;
};

export function NotReadyBanner({
  reason,
  detail,
  targetDate,
  className,
}: NotReadyBannerProps) {
  return (
    <aside
      className={
        "rounded-xl bg-paper-100 ring-2 ring-ocean-300 p-5 md:p-6 " +
        (className ?? "")
      }
      data-track="not_ready_banner"
      role="status"
      aria-label="Page status: not ready for publication"
    >
      <p className="eyebrow text-ocean-800">
        Page status · not ready for publication
      </p>
      <p className="mt-2 text-body-md text-ink-900 text-pretty">
        <strong>{reason}</strong>
      </p>
      {detail ? (
        <p className="mt-2 text-body-sm text-ink-700 text-pretty">{detail}</p>
      ) : null}
      {targetDate ? (
        <p className="mt-2 text-caption italic text-ink-600">
          Target publication: <time dateTime={targetDate}>{targetDate}</time>.
          See the <a href="/contact" className="link text-ocean-800">contact page</a>{" "}
          if you want to be notified when this guide goes live.
        </p>
      ) : null}
    </aside>
  );
}
