import { SITE } from "@/data/site";

// All JSON-LD is rendered server-side and inlined as a <script type="application/ld+json">
// (Next.js will not escape the children — they are objects).

export function OrganizationLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.productionUrl,
    logo: `${SITE.productionUrl}/images/noosa/noosa_main_beach_hero.jpg`,
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "editorial",
        url: `${SITE.productionUrl}/contact`,
        availableLanguage: ["en-AU"],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function WebSiteLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.brand,
    url: SITE.productionUrl,
    inLanguage: SITE.locale,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.productionUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ArticleLd({
  url,
  headline,
  description,
  datePublished,
  dateModified,
  imageUrl,
  authorName = SITE.author.name,
  inLanguage = SITE.locale,
}: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
  authorName?: string;
  inLanguage?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage,
    author: { "@type": "Organization", name: authorName, url: SITE.productionUrl },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      logo: { "@type": "ImageObject", url: `${SITE.productionUrl}/images/noosa/noosa_main_beach_hero.jpg` },
    },
    image: imageUrl ? [imageUrl] : [`${SITE.productionUrl}/images/noosa/noosa_main_beach_hero.jpg`],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FaqLd({ qa }: { qa: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function LocalBusinessLd({
  name,
  url,
  description,
  areaServed,
  priceRange,
  address: addr,
  telephone,
  imageUrl,
}: {
  name: string;
  url: string;
  description: string;
  areaServed: string;
  priceRange?: string;
  address?: string;
  telephone?: string;
  imageUrl?: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url,
    description,
    areaServed,
    image: imageUrl,
    priceRange,
    telephone,
  };
  if (addr) data.address = { "@type": "PostalAddress", streetAddress: addr, addressRegion: "QLD", addressCountry: "AU" };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}