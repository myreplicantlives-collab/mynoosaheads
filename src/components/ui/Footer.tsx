/**
 * Footer — 5 columns + ACCC disclosure slot.
 *
 * Per Albert's design brief (Live page §2 "Footer"):
 *   "5 columns: Sitemap · Live sources · Editorial (about, contact, corrections,
 *    image-credits, editorial-policy) · Legal (Privacy, Terms, Affiliate
 *    disclosure per §9.8 — each with ACCC badge) · Local partners (Noosa
 *    Council, Tourism Noosa, Sunshine Coast Council, QPWS).
 *    No newsletter field; social = plain text links."
 *
 * Sprint 1.2 ships the layout + ACCC pill placeholder. Sprint 1.3
 * (TSK-2957-03) wires real outbound links.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

export type FooterColumn = {
  heading: string;
  links: { label: string; href: string; external?: boolean; disclosure?: string }[];
};

export type FooterProps = {
  columns?: FooterColumn[];
  /** Override the legal-region text. Defaults to "AU · en-AU". */
  region?: string;
  /** Bottom-left flourish (e.g. "Built on the Sunshine Coast"). */
  flourish?: ReactNode;
  copyrightYear?: number;
};

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    heading: "Sitemap",
    links: [
      { label: "Surf & weather", href: "/surf-and-weather" },
      { label: "Noosa National Park", href: "/noosa-national-park" },
      { label: "Where to stay", href: "/where-to-stay" },
      { label: "Eat & drink", href: "/eat-and-drink" },
      { label: "Things to do", href: "/things-to-do" },
      { label: "Itineraries", href: "/itineraries" },
    ],
  },
  {
    heading: "Live sources",
    links: [
      { label: "BOM marine forecast", href: "https://www.bom.gov.au/", external: true },
      { label: "Open-Meteo", href: "https://open-meteo.com/", external: true },
      { label: "QPWS alerts", href: "https://www.qld.gov.au/environment/parks", external: true },
      { label: "Surf Life Saving QLD", href: "https://www.lifesaving.com.au/", external: true },
      { label: "Beachsafe.org.au", href: "https://beachsafe.org.au/", external: true },
    ],
  },
  {
    heading: "Editorial",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Corrections", href: "/corrections" },
      { label: "Image credits", href: "/image-credits" },
      { label: "Editorial policy", href: "/editorial-policy" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy", disclosure: "Privacy Act 1988 (Cth)" },
      { label: "Terms", href: "/terms", disclosure: "ACCC" },
      { label: "Affiliate disclosure", href: "/how-we-make-money", disclosure: "ACCC Sch 2" },
      { label: "Spam Act statement", href: "/spam-statement", disclosure: "Spam Act 2003" },
    ],
  },
  {
    heading: "Local partners",
    links: [
      { label: "Noosa Council", href: "https://www.noosa.qld.gov.au/", external: true },
      { label: "Tourism Noosa", href: "https://www.visitnoosa.com.au/", external: true },
      { label: "Sunshine Coast Council", href: "https://www.sunshinecoast.qld.gov.au/", external: true },
      { label: "QPWS", href: "https://www.qld.gov.au/environment/parks", external: true },
    ],
  },
];

export function Footer({
  columns = DEFAULT_COLUMNS,
  region = "AU · en-AU · Queensland, Australia",
  flourish,
  copyrightYear,
}: FooterProps) {
  const year = copyrightYear ?? new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-paper-300 bg-paper-100">
      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Logo mark="2" size="md" />
            <p className="mt-3 text-body-sm text-ink-700 max-w-xs">
              An honest, sourced guide to Noosa Heads. Built slowly, on the
              Sunshine Coast.
            </p>
            {flourish ? (
              <p className="mt-3 accent-flourish text-accent-md">{flourish}</p>
            ) : null}
          </div>
          {columns.map((col) => (
            <nav
              key={col.heading}
              aria-label={col.heading}
              className="text-body-sm"
            >
              <h3 className="text-eyebrow text-eucalyptus-700">{col.heading}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href} className="flex items-start gap-2">
                    <Link
                      href={link.href}
                      className="text-ink-700 hover:text-eucalyptus-700 hover:underline underline-offset-4"
                      {...(link.external
                        ? { rel: "noopener noreferrer", target: "_blank" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                    {link.disclosure ? (
                      <span
                        className="pill-disclosure shrink-0"
                        title={link.disclosure}
                      >
                        {link.disclosure}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="mt-10 border-paper-300" />

        <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-caption text-ink-600">
            © {year} MyNoosaHeads. {region}. All rights reserved.
          </p>
          <p className="text-caption text-ink-600">
            Built honestly. Sources linked on every page.
          </p>
        </div>
      </div>
    </footer>
  );
}
