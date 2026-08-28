/**
 * CaptionedPhoto — inline image with credit line, used inside the
 * editorial body of category pages.
 *
 * Sprint 1.5 (MSN-2958 / TSK-2958-02): every photo slot on every
 * category page uses this so attribution is consistent.
 *
 * Per Albert's `photo_inventory.md` every image on the site is from
 * Wikimedia Commons under CC BY-SA or CC BY. The credit line below
 * the image is non-optional under those licences.
 *
 * MSN-2975 perf chunk 2: inline photos still resolve to Wikimedia
 * thumbnails (chunk 5 will switch the things-to-do 9-card grid + the
 * remaining inline grids to self-hosted WebPs). When that lands,
 * swap next/image for a native <img> with srcSet+src+sizes+fetchPriority
 * — the same pattern as HomeHero/HeroPhoto — because next/image 14.2
 * deletes any user-supplied srcSet (see get-img-props.js) and the
 * optimizer is disabled on Cloudflare Pages. Explicit `width` +
 * `height` (or 16:9 default) keep CLS = 0 in the meantime.
 */

import Image from "next/image";

export type CaptionedPhotoProps = {
  src: string;
  alt: string;
  credit: string;
  /** Aspect ratio — defaults to 16:9 landscape. */
  width?: number;
  height?: number;
  /** Tiny inline base64 placeholder (1×1 or 4×4 px) — optional.
   * If omitted, we use Next.js' default `placeholder="empty"` which
   * paints a transparent background while the image loads. */
  blurDataURL?: string;
  /** Optional caption shown beneath the credit. */
  caption?: string;
  /** Display widths for the responsive `sizes` attribute. */
  sizes?: string;
  /** Image priority (above-the-fold LCP). Default false. */
  priority?: boolean;
};

export function CaptionedPhoto({
  src,
  alt,
  credit,
  width = 1280,
  height,
  blurDataURL,
  caption,
  sizes = "(min-width: 1024px) 720px, 100vw",
  priority = false,
}: CaptionedPhotoProps) {
  // Default to 16:9 if no aspect ratio given.
  const h = height ?? Math.round((width * 9) / 16);

  return (
    <figure className="my-8 md:my-10">
      <div className="relative w-full overflow-hidden rounded-2xl border border-paper-200 bg-paper-100">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={h}
          sizes={sizes}
          className="w-full h-auto"
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          priority={priority}
          // MSN-2959 / TSK-2959-POLISH-B: route through Vercel image
          // optimisation pipeline (AVIF/WebP). `unoptimized` removed
          // to recover Lighthouse Best Practices.
        />
      </div>
      <figcaption className="mt-3 flex flex-col gap-1 text-caption text-ink-600 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="font-medium text-ink-700">{caption ?? alt}</span>
        {credit ? <span className="text-ink-600">{credit}</span> : null}
      </figcaption>
    </figure>
  );
}
