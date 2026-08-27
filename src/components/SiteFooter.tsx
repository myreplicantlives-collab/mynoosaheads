import { Footer } from "@/components/ui";
import { FOOTER_DISCLOSURE } from "@/data/site";

/**
 * SiteFooter — wraps the design-system Footer, populating it from the
 * canonical FOOTER_DISCLOSURE constant so the entire footer is
 * data-driven.
 */
export function SiteFooter() {
  return (
    <Footer
      columns={FOOTER_DISCLOSURE.columns.map((col) => ({
        heading: col.heading,
        links: [...col.links],
      }))}
      region={FOOTER_DISCLOSURE.region}
      copyrightYear={FOOTER_DISCLOSURE.copyrightYear}
      flourish={FOOTER_DISCLOSURE.complianceBand}
    />
  );
}
