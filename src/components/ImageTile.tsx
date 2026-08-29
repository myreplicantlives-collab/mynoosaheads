"use client";

import Image from "next/image";
import Link from "next/link";

export type ImageTileProps = {
  href: string;
  title: string;
  body?: string;
  image: {
    /** MSN-2982: image URL/path. Accepts either {url} (legacy) or {path} (MSN-2982 verified set). */
    url?: string;
    path?: string;
    caption: string;
    author?: string;
    licence?: string;
    sourcePage?: string;
  };
  /** Stronger visual treatment — bigger image area, primary CTA styling. */
  emphasis?: boolean;
  /** Anchor click tracking label (analytics wrapper picks this up). */
  dataTrack?: string;
  /** Optional aria-current for the active page. */
  ariaCurrent?: "page" | undefined;
  /**
   * MSN-2973 — strip the photographer credit line. Set true on the
   * main-journey pages (homepage 6-tile grid, /things-to-do 8-card
   * grid) where Tim's directive was to remove attribution from
   * rendered HTML. The full attribution table lives at /photo-credits
   * and is linked from the footer only.
   */
  hideAttribution?: boolean;
};

/**
 * ImageTile — MSN-2972 card for the homepage 6-tile grid and the
 * /things-to-do 8-category grid.
 *
 * Layout:
 *   - Image area (60% of card height on desktop, 56% on mobile)
 *   - Text area: title + 1-sentence body (+ photographer credit,
 *     suppressed on main-journey pages per MSN-2973)
 *
 * Hover: subtle lift (translateY(-2px) + shadow). Focus: ring on the
 * link so keyboard users see the focus target. Whole tile is a single
 * <Link> for the maximum tap target.
 */
export function ImageTile({
  href,
  title,
  body,
  image,
  emphasis = false,
  dataTrack,
  ariaCurrent,
  hideAttribution = false,
}: ImageTileProps) {
  return (
    <Link
      href={href}
      data-track={dataTrack}
      aria-current={ariaCurrent}
      className={[
        "group relative block overflow-hidden rounded-2xl bg-paper-100 shadow-sm transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:shadow-lg",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-50",
        emphasis ? "ring-1 ring-eucalyptus-300/60" : "ring-1 ring-paper-200",
      ].join(" ")}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-200">
        <Image
          src={image.path ?? image.url ?? ""}
          alt={image.caption}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {emphasis ? (
          <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-paper-50/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-eucalyptus-700 shadow-sm">
            Most popular
          </span>
        ) : null}
      </div>
      <div className="p-5 md:p-6">
        <h3 className="font-display text-headline-md text-ink-900 text-balance">
          {title}
        </h3>
        {body ? (
          <p className="mt-2 text-body-sm text-ink-700 text-pretty">
            {body}
          </p>
        ) : null}
        {/* MSN-2973 — attribution stripped on main-journey pages. Full
         *  table lives at /photo-credits.
         *  MSN-2980 — renamed commonsPage → sourcePage (Wikimedia is
         *  forbidden per chairman mandate 2026-08-29). */}
        {!hideAttribution ? (
          <p className="mt-3 text-caption text-ink-600">
            Photo:{" "}
            <a
              href={image.sourcePage}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-paper-300 underline-offset-2 hover:text-ocean-700"
              onClick={(e) => e.stopPropagation()}
            >
              {image.author}
            </a>{" "}
            · {image.licence}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
