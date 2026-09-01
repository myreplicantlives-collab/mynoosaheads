/**
 * WhyWeRecommend — editorial methodology block.
 *
 * MSN-3057 (Workstream 3 — Reusable conversion components):
 *   "'why we recommend this' sections"
 *
 * Renders an aside-style block that explains the reasoning behind a
 * particular recommendation. The body is short editorial copy
 * (typically 2-3 sentences) plus an optional pull-quote.
 *
 * The styling is restrained — paper-100 surface, a thin left border
 * in the rainforest accent, italic body text. Designed to feel like
 * part of the editorial copy, not an advertorial panel.
 */

import type { ReactNode } from "react";

export type WhyWeRecommendProps = {
  /** Optional eyebrow — defaults to "Why we recommend this". */
  eyebrow?: string;
  /** The recommendation being explained — typically a property or
   *  experience name. */
  for?: string;
  body: ReactNode;
  /** Optional short author / context line. */
  byline?: string;
  className?: string;
};

export function WhyWeRecommend({
  eyebrow = "Why we recommend this",
  for: forProp,
  body,
  byline,
  className,
}: WhyWeRecommendProps) {
  return (
    <aside
      className={
        "rounded-lg bg-paper-100 ring-1 ring-paper-200 pl-4 pr-4 py-4 border-l-2 border-rainforest-500 " +
        (className ?? "")
      }
      data-track="why_we_recommend"
      aria-label={eyebrow}
    >
      <p className="eyebrow text-rainforest-700">
        {eyebrow}
        {forProp ? <> · {forProp}</> : null}
      </p>
      <div className="mt-2 text-body-sm text-ink-800 italic text-pretty">
        {body}
      </div>
      {byline ? (
        <p className="mt-2 text-caption text-ink-600">— {byline}</p>
      ) : null}
    </aside>
  );
}
