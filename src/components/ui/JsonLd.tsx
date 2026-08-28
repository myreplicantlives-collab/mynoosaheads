/**
 * JsonLd — server-rendered JSON-LD block for structured data (schema.org).
 *
 * Renders a single <script type="application/ld+json"> element with the
 * provided object. Safe for SSR: dangerouslySetInnerHTML is escaped by
 * React before being injected into the page.
 *
 * MSN-2964: used to declare Organization, WebSite, BreadcrumbList,
 * TouristDestination, LodgingBusiness, and Article schemas for SEO.
 *
 * Usage:
 *   <JsonLd data={{
 *     "@context": "https://schema.org",
 *     "@type": "Organization",
 *     name: "My Noosa Heads",
 *     url: SITE.productionUrl,
 *     ...
 *   }} />
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}