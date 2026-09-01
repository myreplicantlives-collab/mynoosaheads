/**
 * MobileStickyCTA — small, restrained bottom-of-screen action.
 *
 * MSN-3057 (Workstream 3 — Reusable conversion components):
 *   "mobile sticky CTA where appropriate"
 *
 * Renders nothing above the `md` breakpoint. On mobile, it sticks to
 * the bottom of the viewport as a non-intrusive band with one
 * primary action and (optionally) one secondary link. Designed to
 * sit on top of the page content without obscuring important copy
 * — uses safe-area-inset-bottom for iOS Safari.
 *
 * The component renders `null` if `enabled === false` so callers
 * can disable the sticky CTA on a per-page basis (e.g. when the
 * primary CTA is already in-view above the fold).
 */

import Link from "next/link";

export type MobileStickyCTAProps = {
  enabled?: boolean;
  primary: {
    label: string;
    href: string;
    /** Where this CTA lives — surfaces in the data-track event name. */
    placement: string;
    external?: boolean;
  };
  secondary?: {
    label: string;
    href: string;
    placement: string;
  };
  className?: string;
};

export function MobileStickyCTA({
  enabled = true,
  primary,
  secondary,
  className,
}: MobileStickyCTAProps) {
  if (!enabled) return null;
  const primaryProps = primary.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <div
      className={
        "md:hidden fixed inset-x-0 bottom-0 z-30 border-t border-paper-200 bg-paper-50/95 backdrop-blur supports-[backdrop-filter]:bg-paper-50/80 " +
        (className ?? "")
      }
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      data-track="mobile_sticky_cta"
      role="region"
      aria-label="Quick action"
    >
      <div className="container-page py-3 flex items-center gap-3">
        <Link
          href={primary.href}
          className="btn-primary btn-md flex-1"
          data-track={`mobile_sticky_primary_${primary.placement}`}
          {...primaryProps}
        >
          {primary.label}
        </Link>
        {secondary ? (
          <Link
            href={secondary.href}
            className="btn-outline btn-md"
            data-track={`mobile_sticky_secondary_${secondary.placement}`}
          >
            {secondary.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
