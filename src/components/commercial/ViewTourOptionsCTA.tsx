/**
 * ViewTourOptionsCTA — primary tour / activity CTA button.
 *
 * MSN-3057 (Workstream 3 — Reusable conversion components):
 *   "'view tour options' CTAs"
 *
 * Sister to CheckAvailabilityCTA but with tour-flavoured copy and a
 * "outdoor" emphasis by default (so the colour reads slightly
 * differently from an accommodation CTA — ocean for tours, primary
 * for accommodation).
 */

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type AnchorProps = ComponentPropsWithoutRef<"a">;

export type ViewTourOptionsCTAProps = Omit<AnchorProps, "href"> & {
  href: string;
  /** Custom label; default is "View tour options". */
  label?: string;
  /** "compact" reduces horizontal padding; default is standard. */
  size?: "compact" | "standard" | "lg";
  /** Where this CTA lives — surfaces in the data-track event name. */
  placement: string;
  /** Optional override of the track event name. */
  trackName?: string;
  external?: boolean;
};

export function ViewTourOptionsCTA({
  href,
  label = "View tour options",
  size = "standard",
  placement,
  trackName,
  external = true,
  className,
  ...rest
}: ViewTourOptionsCTAProps) {
  const sizeClass =
    size === "compact"
      ? "btn-sm"
      : size === "lg"
        ? "btn-lg"
        : "btn-md";
  const track = trackName ?? `cta_view_tour_${placement}`;
  const anchorProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Link
      href={href}
      className={["btn-secondary", sizeClass, className ?? ""].join(" ")}
      data-track={track}
      {...anchorProps}
      {...rest}
    >
      {label}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
