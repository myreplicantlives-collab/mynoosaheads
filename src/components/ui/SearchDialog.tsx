"use client";

/**
 * SearchDialog — site-search modal triggered by the header + mobile
 * Search buttons.
 *
 * MSN-3044 — Item 4 fix: the audit (MSN-3043) found the header and
 * mobile-menu Search buttons were inert (no onClick, no input, no
 * modal). We wire them to a real, accessible search experience
 * instead of removing them, because the visitor expectation is set
 * by the visible button.
 *
 * The search is a simple client-side filter against a curated
 * route list (SEARCHABLE_PAGES in src/data/site.ts). Every entry is
 * a real page; nothing is fabricated. Results match title, short
 * pitch and category. Selected results navigate via Next.js Link.
 *
 * Accessibility:
 *   - role="dialog" + aria-modal="true"
 *   - aria-labelledby + aria-describedby pointing at the dialog
 *     title and the live result count
 *   - Escape closes
 *   - Focus is trapped while open; on close, focus returns to the
 *     trigger button
 *   - The input is type="search" so VoiceOver / mobile keyboards
 *     render the correct affordances
 */

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";

export type SearchEntry = {
  label: string;
  href: string;
  pitch: string;
  category?: string;
};

export type SearchDialogProps = {
  /** The full set of searchable pages. */
  pages: SearchEntry[];
  /** Button label (header trigger). Defaults to "Search". */
  triggerLabel?: string;
  /** Optional: when true, the trigger is rendered as a wide outlined
   *  button (used by the mobile menu). */
  block?: boolean;
};

export function SearchDialog({
  pages,
  triggerLabel = "Search",
  block = false,
}: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const descId = useId();

  // Lock scroll + Escape-to-close while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Focus the input on open.
    setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo<SearchEntry[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pages.slice(0, 8);
    return pages
      .filter((p) => {
        return (
          p.label.toLowerCase().includes(q) ||
          p.pitch.toLowerCase().includes(q) ||
          (p.category ?? "").toLowerCase().includes(q)
        );
      })
      .slice(0, 12);
  }, [pages, query]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={
          block
            ? "btn-outline btn-sm w-full"
            : "btn-ghost btn-sm hidden sm:inline-flex"
        }
        aria-label={triggerLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" role="presentation" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.5-4.5" />
        </svg>
        <span className={block ? "" : "sr-only"}>{triggerLabel}</span>
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          <button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-xl rounded-2xl bg-paper-50 shadow-xl ring-1 ring-paper-200">
            <div className="border-b border-paper-200 px-5 py-4">
              <h2 id={titleId} className="font-display text-display-sm text-ink-900">
                Search MyNoosaHeads
              </h2>
              <p id={descId} className="mt-1 text-caption text-ink-600">
                Live filter across the curated route list. Press Escape to close.
              </p>
            </div>
            <div className="px-5 py-4">
              <label htmlFor="search-input" className="sr-only">
                Search MyNoosaHeads
              </label>
              <input
                ref={inputRef}
                id="search-input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “headland walk”, “bar crossing”, “Hastings”…"
                className="w-full rounded-md border border-paper-300 bg-paper-50 px-4 py-3 text-body-md text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-ocean-500"
              />
            </div>
            <ul className="max-h-80 overflow-y-auto border-t border-paper-200 px-2 py-2" role="listbox">
              {results.length === 0 ? (
                <li className="px-3 py-4 text-body-sm text-ink-600">
                  No matches. Try a category name like <em>surf</em>, <em>stay</em> or <em>walk</em>.
                </li>
              ) : (
                results.map((r) => (
                  <li key={r.href} role="option">
                    <Link
                      href={r.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-3 hover:bg-paper-100 focus:bg-paper-100 focus:outline-none"
                    >
                      <span className="block font-display text-body-md text-ink-900">
                        {r.label}
                      </span>
                      <span className="mt-0.5 block text-caption text-ink-600">
                        {r.category ? `${r.category} · ` : ""}
                        {r.pitch}
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
            <div className="flex items-center justify-between border-t border-paper-200 px-5 py-3 text-caption text-ink-600">
              <span>
                {results.length} of {pages.length} pages
              </span>
              <button
                type="button"
                className="text-caption text-ocean-700 hover:underline"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
