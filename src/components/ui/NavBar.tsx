"use client";

/**
 * NavBar — sticky primary nav.
 *
 * Per the design brief (homepage §2):
 *   "Header (logo · nav · search · 'Live' badge)"
 *
 * The nav renders a sticky top bar with logo, primary links, a search
 * button (placeholder until /search ships in Sprint 1.3), and an ocean
 * "Live" pulse badge indicating live data is fresh.
 *
 * Mobile (<md): collapses to a hamburger sheet. Uses native <details>/<summary>
 * for zero-JS progressive enhancement; the JS layer enhances with ARIA state.
 */

import { useEffect, useState, useId } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Icons } from "./Icon";
import { SearchDialog } from "./SearchDialog";
import { SEARCHABLE_PAGES } from "@/data/site";

export type NavItem = {
  label: string;
  href: string;
  /** Marks this as the currently active page (sets aria-current="page"). */
  active?: boolean;
};

export type NavBarProps = {
  brand?: string;
  items?: NavItem[];
  /** Render a "Live" badge. */
  showLiveBadge?: boolean;
  /** Optional aria-label override for the <nav> landmark. */
  ariaLabel?: string;
};

const DEFAULT_ITEMS: NavItem[] = [
  { label: "Surf & weather", href: "/surf-and-weather" },
  { label: "National Park", href: "/noosa-national-park" },
  { label: "Where to stay", href: "/where-to-stay" },
  { label: "Eat & drink", href: "/eat-and-drink" },
  { label: "Things to do", href: "/things-to-do" },
];

export function NavBar({
  brand = "MyNoosaHeads",
  items = DEFAULT_ITEMS,
  showLiveBadge = true,
  ariaLabel = "Primary",
}: NavBarProps) {
  const [open, setOpen] = useState(false);
  const sheetId = useId();

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-paper-50/85 backdrop-blur supports-[backdrop-filter]:bg-paper-50/70 border-b border-paper-200">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 rounded-md"
            aria-label={`${brand} home`}
          >
            <Logo mark="2" />
          </Link>

          <nav
            aria-label={ariaLabel}
            className="hidden md:flex items-center gap-1"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={[
                  "rounded-md px-3 py-2 text-body-sm transition",
                  item.active
                    ? "text-eucalyptus-700 font-semibold"
                    : "text-ink-700 hover:bg-paper-100 hover:text-ink-900",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {showLiveBadge ? (
              <span className="chip-rainforest hidden sm:inline-flex">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-rainforest-500"
                  aria-hidden="true"
                />
                Live
              </span>
            ) : null}
            {/* MSN-3044 — Item 4 fix: the search button now opens a real
             *  SearchDialog that filters across the curated route list
             *  in SEARCHABLE_PAGES (src/data/site.ts). */}
            <SearchDialog pages={[...SEARCHABLE_PAGES]} />
            <button
              type="button"
              className="btn-ghost btn-sm md:hidden"
              aria-expanded={open}
              aria-controls={sheetId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Icons.Close size={18} /> : <Icons.Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id={sheetId}
        hidden={!open}
        className="md:hidden border-t border-paper-200 bg-paper-50"
      >
        <nav aria-label="Mobile primary" className="container-page py-3">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={[
                    "block py-3 text-body-sm border-b border-paper-200 last:border-b-0",
                    item.active
                      ? "text-eucalyptus-700 font-semibold"
                      : "text-ink-800",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              {/* MSN-3044 — Item 4 fix: mobile-menu Search button now
               *  opens the same SearchDialog (block variant). */}
              <SearchDialog pages={[...SEARCHABLE_PAGES]} block />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
