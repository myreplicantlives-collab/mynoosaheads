/**
 * Card primitive + variants.
 *
 * Three variants:
 *   - default     bordered card on paper
 *   - surface     card with subtle paper-100 background (sectioned content)
 *   - flat        borderless card (for overlays)
 *
 * Cards can carry an optional eyebrow, headline, body, footer, and a
 * disclosure pill (e.g. "Sponsored" per ACCC §9.10 disclosure rules).
 */

import type { ReactNode, HTMLAttributes } from "react";

export type CardVariant = "default" | "surface" | "flat";

const VARIANT_CLASS: Record<CardVariant, string> = {
  default: "card",
  surface: "card-surface",
  flat: "card-flat",
};

export type CardProps = HTMLAttributes<HTMLElement> & {
  variant?: CardVariant;
  /** Tag override — defaults to <article> for semantic editorial cards. */
  as?: "article" | "section" | "div" | "li";
  children?: ReactNode;
};

export function Card({
  variant = "default",
  as: Tag = "article",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag className={[VARIANT_CLASS[variant], className ?? ""].join(" ")} {...rest}>
      {children}
    </Tag>
  );
}

export type CardBodyProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export function CardBody({ className, children, ...rest }: CardBodyProps) {
  return (
    <div className={["card-body", className ?? ""].join(" ")} {...rest}>
      {children}
    </div>
  );
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: ReactNode;
  title?: ReactNode;
  disclosure?: ReactNode;
  children?: ReactNode;
};

/**
 * CardHeader — renders eyebrow (small caps), title (h3), optional disclosure
 * pill (e.g. "Sponsored"), and any extra children on the right.
 */
export function CardHeader({
  eyebrow,
  title,
  disclosure,
  className,
  children,
  ...rest
}: CardHeaderProps) {
  return (
    <div
      className={["card-body pb-3", className ?? ""].join(" ")}
      {...rest}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          {title ? (
            <h3 className="mt-1 font-display text-headline-lg text-ink-900">
              {title}
            </h3>
          ) : null}
        </div>
        {disclosure ? <span className="pill-disclosure">{disclosure}</span> : null}
      </div>
      {children}
    </div>
  );
}

export type CardFooterProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export function CardFooter({ className, children, ...rest }: CardFooterProps) {
  return (
    <div
      className={["px-5 md:px-6 py-3 border-t border-paper-200 bg-paper-50", className ?? ""].join(
        " "
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
