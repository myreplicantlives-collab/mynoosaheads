/**
 * Icon set — custom line icons, 1.5px stroke, 24px nominal.
 *
 * Per Albert's design brief: ~14 icons (surf wave, fish, boat, compass,
 * eucalyptus sprig, park gate, sun, moon, tide arrow, wind arrow, umbrella,
 * BBQ, camera, alert). Two weights: --ink default, --accent active. No emoji.
 *
 * Implementation notes:
 *   - All icons are pure inline SVG components (no external dep).
 *   - `currentColor` is used for the stroke so the parent's `text-*` colour
 *     class controls appearance.
 *   - `aria-hidden` is on by default; consumers should pass an aria-label
 *     on the parent if the icon carries meaning.
 *   - Each icon takes optional `size` (px) and `className` props.
 */

import type { SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  size?: number;
  strokeWidth?: number;
  title?: string;
};

const baseProps = (size: number, strokeWidth: number, title?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  role: title ? "img" : "presentation",
  "aria-label": title,
  "aria-hidden": title ? undefined : true,
});

export function WaveIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M2 14c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0" />
      <path d="M2 18c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0" />
    </svg>
  );
}

export function FishIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 12c3-4 8-5 13-3 2 .8 3 1.5 5 3-2 1.5-3 2.2-5 3-5 2-10 1-13-3z" />
      <circle cx="16" cy="11" r="0.8" fill="currentColor" />
      <path d="M6 12l-3-2v4z" />
    </svg>
  );
}

export function BoatIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 17l1.5 3h15L21 17" />
      <path d="M5 17l1-8h12l1 8" />
      <path d="M12 4v9" />
      <path d="M9 7h6" />
    </svg>
  );
}

export function CompassIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5l-1.8 4.2-4.2 1.8 1.8-4.2z" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function EucalyptusIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M12 21V8" />
      <path d="M12 14c-3 0-5-2-5-5 3 0 5 2 5 5z" />
      <path d="M12 11c3 0 5-2 5-5-3 0-5 2-5 5z" />
      <path d="M12 18c-2 0-4-1.5-4-4 2 0 4 1.5 4 4z" />
      <path d="M12 18c2 0 4-1.5 4-4-2 0-4 1.5-4 4z" />
    </svg>
  );
}

export function ParkGateIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M4 21V8l8-3 8 3v13" />
      <path d="M4 14h16" />
      <path d="M9 14v7M15 14v7" />
    </svg>
  );
}

export function SunIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M21 13.5A9 9 0 1 1 10.5 3a7 7 0 0 0 10.5 10.5z" />
    </svg>
  );
}

export function TideArrowIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M3 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M18 5l3-1-1 3" />
    </svg>
  );
}

export function WindArrowIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 8h12a3 3 0 1 0-3-3" />
      <path d="M3 12h17a3 3 0 1 1-3 3" />
      <path d="M3 16h9" />
    </svg>
  );
}

export function UmbrellaIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M12 2a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9z" />
      <path d="M12 11v9a2 2 0 0 1-4 0" />
    </svg>
  );
}

export function BbqIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M5 16h14l-1 4H6z" />
      <path d="M7 16c0-2 1-3 1-5M12 16c0-2 1-3 1-5M17 16c0-2 1-3 1-5" />
      <path d="M10 4l-2 2M14 4l2 2" />
    </svg>
  );
}

export function CameraIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7l2-3h4l2 3" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export function AlertIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M12 3l10 18H2z" />
      <path d="M12 10v5" />
      <circle cx="12" cy="18" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** Simple chevron-right, used in NavBar + CTAs. */
export function ChevronRightIcon({
  size = 24,
  strokeWidth = 1.75,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/** Hamburger icon for mobile nav. */
export function MenuIcon({
  size = 24,
  strokeWidth = 1.75,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/** Close icon for mobile nav. */
export function CloseIcon({
  size = 24,
  strokeWidth = 1.75,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** Search icon (used in nav). */
export function SearchIcon({
  size = 24,
  strokeWidth = 1.75,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.5-4.5" />
    </svg>
  );
}

/** Map-pin icon (used in nav + cards). */
export function PinIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/** Calendar icon. */
export function CalendarIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

/** External-link arrow. */
export function ExternalIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M14 4h6v6" />
      <path d="M10 14L20 4" />
      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

/**
 * IconRegistry — single import surface for the style guide.
 * Keeps `import { Icons } from "@/components/ui/Icon"` working as a bag.
 */
export const Icons = {
  Wave: WaveIcon,
  Fish: FishIcon,
  Boat: BoatIcon,
  Compass: CompassIcon,
  Eucalyptus: EucalyptusIcon,
  ParkGate: ParkGateIcon,
  Sun: SunIcon,
  Moon: MoonIcon,
  TideArrow: TideArrowIcon,
  WindArrow: WindArrowIcon,
  Umbrella: UmbrellaIcon,
  Bbq: BbqIcon,
  Camera: CameraIcon,
  Alert: AlertIcon,
  ChevronRight: ChevronRightIcon,
  Menu: MenuIcon,
  Close: CloseIcon,
  Search: SearchIcon,
  Pin: PinIcon,
  Calendar: CalendarIcon,
  External: ExternalIcon,
} as const;

export type IconName = keyof typeof Icons;
