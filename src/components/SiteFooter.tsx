import { Footer, type FooterProps } from "@/components/ui";
import { FOOTER_DISCLOSURE } from "@/data/site";

/**
 * SiteFooter — wraps the design-system Footer, populating it from the
 * canonical FOOTER_DISCLOSURE constant so the entire footer is
 * data-driven.
 *
 * MSN-2959 / TSK-2959-FIX-3: passes `complianceBand` (the new 91-word
 * ACCC-aware disclosure summary that replaces the deleted
 * /how-we-make-money route) directly to <Footer>. The Footer renders
 * the paragraph as the canonical disclosure location on every page.
 *
 * Accepts the full FooterProps interface so layout.tsx can either use
 * SiteFooter with no args (data-driven from site.ts) or pass explicit
 * overrides (the wiring-fix contract from the MSN-2959 chair-grade
 * brief). When no props are passed, falls back to FOOTER_DISCLOSURE.
 */
export function SiteFooter(props: FooterProps = {}) {
  const columns =
    props.columns ??
    FOOTER_DISCLOSURE.columns.map((col) => ({
      heading: col.heading,
      links: [...col.links],
    }));
  return (
    <Footer
      columns={columns}
      region={props.region ?? FOOTER_DISCLOSURE.region}
      copyrightYear={props.copyrightYear ?? FOOTER_DISCLOSURE.copyrightYear}
      complianceBand={props.complianceBand ?? FOOTER_DISCLOSURE.complianceBand}
    />
  );
}
