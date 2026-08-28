"use client";

import Image from "next/image";
import Link from "next/link";

export type ImageTileProps = {
  href: string;
  title: string;
  body?: string;
  image: {
    url: string;
    caption: string;
    author: string;
    licence: string;
    commonsPage: string;
  };
  /** Stronger visual treatment — bigger image area, primary CTA styling. */
  emphasis?: boolean;
  /** Anchor click tracking label (analytics wrapper picks this up). */
  dataTrack?: string;
  /** Optional aria-current for the active page. */
  ariaCurrent?: "page" | undefined;
};

/**
 * ImageTile — MSN-2972 card for the homepage 6-tile grid and the
 * /things-to-do 12-category grid.
 *
 * Layout:
 *   - Image area (60% of card height on desktop, 56% on mobile)
 *   - Text area: title + 1-sentence body + photographer credit
 *
 * Hover: subtle lift (translateY(-2px) + shadow). Focus: ring on the
 * link so keyboard users see the focus target. Whole tile is a single
 * <Link> for the maximum tap target.
 *
 * Client component because the photographer credit is a nested anchor
 * and we need onClick to stop propagation so clicking the credit
 * doesn't also navigate the parent Link. (Nested <a> elements are
 * invalid HTML; the credit anchor is the only way to surface the
 * Commons attribution back-link without losing the parent tap target.)
 */
export function ImageTile({
  href,
  title,
  body,
  image,
  emphasis = false,
  dataTrack,
  ariaCurrent,
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
          src={image.url}
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
        <p className="mt-3 text-caption text-ink-600">
          Photo:{" "}
          <a
            href={image.commonsPage}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-paper-300 underline-offset-2 hover:text-ocean-700"
            onClick={(e) => e.stopPropagation()}
          >
            {image.author}
          </a>{" "}
          / Wikimedia Commons · {image.licence}
        </p>
      </div>
    </Link>
  );
}
