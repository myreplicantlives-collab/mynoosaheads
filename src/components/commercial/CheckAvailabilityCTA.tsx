/**
 * CheckAvailabilityCTA — primary commercial CTA button.
 *
 * MSN-3057 (Workstream 3 — Reusable conversion components):
 *   "'check availability' CTAs"
 *
 * Renders a Button-like anchor with consistent copy + the data-track
 * contract so Plausible captures the click. The actual href is
 * passed in from the page so the page owns the URL decision
 * (operator-direct vs network vs untracked search). The CTA
 * presentation does NOT change based on whether the link is
 * affiliate-tracked — the AffiliateBadge handles that disclosure
 * separately so the CTA itself stays quiet.
 */

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type AnchorProps = ComponentPropsWithoutRef<"a">;

export type CheckAvailabilityCTAProps = Omit<AnchorProps, "href"> & {
  href: string;
  /** Custom label; default is "Check availability". */
  label?: string;
  /** "compact" reduces horizontal padding; default is the standard size. */
  size?: "compact" | "standard" | "lg";
  /** Where this CTA lives — surfaces in the data-track event name. */
  placement: string;
  /** Optional override of the track event name. */
  trackName?: string;
  /** When true, opens in a new tab and adds the right rel attributes. */
  external?: boolean;
  /** Visual emphasis — primary is the strong sea-glass; secondary is the
   *  ocean (informational). Default: primary. */
  emphasis?: "primary" | "secondary";
};

export function CheckAvailabilityCTA({
  href,
  label = "Check availability",
  size = "standard",
  placement,
  trackName,
  external = true,
  emphasis = "primary",
  className,
  ...rest
}: CheckAvailabilityCTAProps) {
  const sizeClass =
    size === "compact"
      ? "btn-sm"
      : size === "lg"
        ? "btn-lg"
        : "btn-md";
  const variantClass = emphasis === "primary" ? "btn-primary" : "btn-secondary";
  const track = trackName ?? `cta_check_availability_${placement}`;
  const anchorProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Link
      href={href}
      className={[variantClass, sizeClass, className ?? ""].join(" ")}
      data-track={track}
      {...anchorProps}
      {...rest}
    >
      {label}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
