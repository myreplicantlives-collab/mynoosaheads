/**
 * Hero — full-bleed or constrained.
 *
 * Per the design brief, the homepage hero is full-bleed with a granite
 * headland photo + H1 + sub + inline live strip. Category/article pages
 * use the constrained variant. Hero takes children for the trailing slot.
 */

import type { ReactNode } from "react";

export type HeroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  flourish?: ReactNode;
  background?: "image" | "paper" | "surface";
  imageSrc?: string;
  imageAlt?: string;
  fullBleed?: boolean;
  align?: "left" | "center";
  trailingSlot?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
};

export function Hero({
  eyebrow,
  title,
  subtitle,
  flourish,
  background = "paper",
  imageSrc,
  imageAlt,
  fullBleed = false,
  align = "left",
  trailingSlot,
  actions,
  children,
}: HeroProps) {
  const isDark = background === "image";

  const inner = (
    <div
      className={[
        fullBleed ? "w-full" : "container-page",
        "relative",
        fullBleed ? "" : "py-16 md:py-24",
      ].join(" ")}
    >
      {background === "image" && imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={imageAlt ?? ""}
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden={!imageAlt}
          />
          <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        </>
      ) : null}
      <div
        className={[
          "relative",
          isDark ? "text-paper-50" : "text-ink-900",
          fullBleed ? "container-page py-16 md:py-24" : "",
          align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        ].join(" ")}
      >
        {eyebrow ? (
          <p
            className={[
              "eyebrow",
              isDark ? "text-paper-200" : "",
            ].join(" ")}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={[
            "mt-3 font-display",
            fullBleed
              ? "text-display-xl"
              : "text-display-lg",
            "text-balance",
          ].join(" ")}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            className={[
              "mt-5 lead text-pretty",
              isDark ? "text-paper-100" : "text-ink-700",
            ].join(" ")}
          >
            {subtitle}
          </p>
        ) : null}
        {flourish ? (
          <p
            className={[
              "mt-4 accent-flourish text-accent-md",
            ].join(" ")}
          >
            {flourish}
          </p>
        ) : null}
        {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
        {trailingSlot ? <div className="mt-8">{trailingSlot}</div> : null}
        {children}
      </div>
    </div>
  );

  const bgClass =
    background === "image"
      ? "relative overflow-hidden bg-eucalyptus-900"
      : background === "surface"
        ? "bg-paper-100"
        : "bg-paper-50";

  return (
    <section
      className={bgClass}
      aria-label={typeof title === "string" ? title : undefined}
    >
      {inner}
    </section>
  );
}
