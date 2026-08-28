/**
 * HeroPhoto — full-bleed category-page hero with caption overlay.
 *
 * Sprint 1.5 (MSN-2958 / TSK-2958-02). Per Albert's visual_audit.md §1,
 * category hero images should occupy ~60vh on desktop with the
 * headline + sub overlaid in the lower-left.
 *
 * The headline is rendered above the image (not on top of it) to avoid
 * the legibility problems of overlay-on-photo. The image carries a
 * gentle dark gradient at the foot so the headline drop still has
 * contrast on bright photos.
 *
 * MSN-2975 perf chunk 2: when `srcSet` is provided (the common case
 * on category pages — CategoryPage passes `photos.hero.srcSet`), the
 * underlying <img> tag gets the matching srcset + sizes so the
 * browser picks the best width (640w / 1080w / 1920w / 3840w) for the
 * viewport. fetchPriority="high" fires for LCP on hero images.
 *
 * Implementation note: we use a native <img> + absolute inset-0 inside
 * a sized parent (h-[55vh] / md:h-[60vh]) instead of next/image.
 * next/image deletes any user-supplied srcSet (`delete rest.srcSet` in
 * get-img-props.js) and the optimizer is disabled on Cloudflare Pages
 * (`images.unoptimized = true`) — so responsive srcSet is only
 * reachable via a native <img>. Absolute positioning + parent sizing
 * gives CLS = 0 on both Vercel and Cloudflare.
 */

export type HeroPhotoProps = {
  src: string;
  alt: string;
  credit: string;
  /** Caption shown on the photo (default = alt text). */
  caption?: string;
  /** Optional aspect ratio / height override. Defaults to ~60vh on
   * desktop and ~50vh on mobile (responsive). */
  height?: {
    mobile?: string; // tailwind height class, e.g. "h-[55vh]"
    desktop?: string; // tailwind height class, e.g. "md:h-[60vh]"
  };
  /** Tiny inline base64 placeholder (1×1 or 4×4 px). */
  blurDataURL?: string;
  /** Optional responsive srcSet (the 4 self-hosted WebP widths). */
  srcSet?: string;
  /** LCP hint. Defaults to true (hero images are above the fold). */
  priority?: boolean;
};

export function HeroPhoto({
  src,
  alt,
  credit,
  caption,
  height = { mobile: "h-[55vh]", desktop: "md:h-[60vh]" },
  blurDataURL,
  srcSet,
  priority = true,
}: HeroPhotoProps) {
  return (
    <figure className="relative w-full">
      <div
        className={`relative w-full overflow-hidden bg-eucalyptus-900 ${height.mobile ?? "h-[55vh]"} ${height.desktop ?? "md:h-[60vh]"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          srcSet={srcSet ?? undefined}
          sizes="100vw"
          alt={alt}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          className="absolute inset-0 h-full w-full object-cover"
          style={
            blurDataURL
              ? {
                  backgroundImage: `url(${blurDataURL})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        />
        {/* Caption + credit on the photo (lower-left). MSN-2973 — credit
         *  is hidden on main-journey pages (passed as empty string). */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 hero-overlay pointer-events-auto">
            <p className="font-display text-paper-50 text-display-sm md:text-display-md text-balance max-w-3xl">
              {caption ?? alt}
            </p>
            {credit ? (
              <p className="mt-2 text-caption text-paper-100">{credit}</p>
            ) : null}
          </div>
        </div>
      </div>
    </figure>
  );
}
