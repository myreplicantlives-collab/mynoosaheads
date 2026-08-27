/**
 * Button — variants × sizes.
 *
 * Variants:
 *   - primary     Eucalyptus (default brand action: "Read more", "Subscribe to alerts" — note: site has no newsletter)
 *   - secondary   Ocean (informational: "View the BOM forecast")
 *   - coral       Coral (attention: "Road closure — check detours")
 *   - outline     Subtle action with paper border
 *   - ghost       Inline / tertiary action
 *   - link        Underlined text-only action (use sparingly)
 *
 * Sizes: sm, md, lg, xl.
 *
 * `as` prop allows polymorphism — render as a Link when `href` is set,
 * otherwise as <button>. The component always forwards refs.
 */

import { forwardRef } from "react";
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "coral"
  | "outline"
  | "ghost"
  | "link";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  coral: "btn-coral",
  outline: "btn-outline",
  ghost: "btn-ghost",
  link: "btn-link",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
};

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes({
  variant,
  size,
  fullWidth,
  className,
}: Pick<BaseProps, "variant" | "size" | "fullWidth" | "className">) {
  return [
    SIZE_CLASS[size ?? "md"],
    VARIANT_CLASS[variant ?? "primary"],
    fullWidth ? "w-full" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    children,
    className,
  } = props;

  const cls = classes({ variant, size, fullWidth, className });
  const content = (
    <>
      {leadingIcon ? <span className="shrink-0">{leadingIcon}</span> : null}
      {children}
      {trailingIcon ? <span className="shrink-0">{trailingIcon}</span> : null}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, leadingIcon: _li, trailingIcon: _ti, ...anchorRest } =
      props;
    void _li;
    void _ti;
    if (external) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cls}
          rel="noopener noreferrer"
          target="_blank"
          {...anchorRest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        {...anchorRest}
      >
        {content}
      </Link>
    );
  }

  const {
    leadingIcon: _li,
    trailingIcon: _ti,
    ...buttonRest
  } = props as ButtonAsButton;
  void _li;
  void _ti;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={
        (buttonRest as ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button"
      }
      className={cls}
      {...buttonRest}
    >
      {content}
    </button>
  );
});
