/**
 * Schema.org JSON-LD helpers — MSN-3057 M4 schema rollout.
 *
 * Centralises the schema.org types that recur across the site so
 * they can be edited in one place. Per Albert's §4.2 audit, M4
 * introduces:
 *   - TouristAttraction on activity / experience pages
 *   - LodgingBusiness geo on /stay/[slug] (no invented reviews)
 *   - Place geo on /areas/[area]
 *   - Restaurant geo on /eat-and-drink/[slug]
 *   - BreadcrumbList sitewide (utility)
 *   - ItemList (utility; pages already populate their own)
 *   - WebSite + SearchAction on homepage
 *   - sameAs on Organization
 *   - MediaObject on /webcams
 *   - LiveBlogPosting on /live
 *   - Person (editor) on editorial pages (utility)
 *   - FAQPage where genuine FAQ exists
 *
 * Dev-environment safety: schemas use `SITE.productionUrl` for
 * canonical URLs. The /contact and /privacy pages redact the
 * production contact email on non-production builds (already in M3).
 */

import { SITE } from "@/data/site";
import { NOOSA_AREAS_GEO, NOOSA_LANDMARKS_GEO, type LatLng } from "@/data/geo";

export const SCHEMA_BASE = {
  brand: SITE.brand,
  brandUrl: SITE.productionUrl,
  locale: SITE.locale,
  region: SITE.region,
};

export function organizationJsonLd() {
  const jsonLdEmail = SITE.isProduction
    ? SITE.email
    : "preview-redacted@mynoosaheads.invalid";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.productionUrl}#organization`,
    name: SITE.brand,
    url: SITE.productionUrl,
    logo: `${SITE.productionUrl}/brand/logo-2.svg`,
    description:
      "An independent guide to Noosa Heads, Queensland. Live surf and weather from BOM and Open-Meteo.",
    email: jsonLdEmail,
    foundingDate: String(SITE.established),
    areaServed: {
      "@type": "Place",
      name: "Noosa Heads, Queensland, Australia",
    },
    sameAs: [
      "https://www.visitnoosa.com.au/",
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.productionUrl}#website`,
    url: SITE.productionUrl,
    name: SITE.brand,
    inLanguage: SITE.locale,
    publisher: { "@id": `${SITE.productionUrl}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.productionUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.productionUrl}#editor`,
    name: SITE.editor.name,
    jobTitle: SITE.editor.role,
    worksFor: { "@id": `${SITE.productionUrl}#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.editor.location,
      addressRegion: "QLD",
      addressCountry: "AU",
    },
  };
}

/**
 * BreadcrumbList helper — pass the trail top-down, get a JSON-LD block.
 */
export function breadcrumbJsonLd(
  trail: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.productionUrl}${item.path.startsWith("/") ? item.path : "/" + item.path}`,
    })),
  };
}

/** Standard breadcrumb helper — root + current page. */
export function pageBreadcrumb(name: string, path: string) {
  return breadcrumbJsonLd([
    { name: SITE.brand, path: "/" },
    { name, path },
  ]);
}

/** Two-level breadcrumb — root + section + current. */
export function sectionBreadcrumb(
  sectionName: string,
  sectionPath: string,
  pageName: string,
  pagePath: string,
) {
  return breadcrumbJsonLd([
    { name: SITE.brand, path: "/" },
    { name: sectionName, path: sectionPath },
    { name: pageName, path: pagePath },
  ]);
}

export type PlaceData = {
  name: string;
  description?: string;
  url?: string;
  geo?: LatLng | null;
  containedIn?: string;
};

/** Place JSON-LD — area pages. */
export function placeJsonLd(d: PlaceData) {
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: d.name,
  };
  if (d.description) out.description = d.description;
  if (d.url) out.url = d.url;
  if (d.geo) {
    out.geo = {
      "@type": "GeoCoordinates",
      latitude: d.geo.latitude,
      longitude: d.geo.longitude,
    };
  }
  if (d.containedIn) {
    out.containedInPlace = {
      "@type": "AdministrativeArea",
      name: d.containedIn,
    };
  }
  return out;
}

export type LodgingData = {
  name: string;
  description?: string;
  url: string;
  address: string;
  geo?: LatLng | null;
  amenities?: string[];
  /** Note: rating fields are deliberately omitted — we do not invent reviews. */
};

/** LodgingBusiness JSON-LD — /stay/[slug]. No review/rating claims. */
export function lodgingBusinessJsonLd(d: LodgingData) {
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: d.name,
    url: d.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: d.address,
      addressRegion: "QLD",
      addressCountry: "AU",
    },
  };
  if (d.description) out.description = d.description;
  if (d.geo) {
    out.geo = {
      "@type": "GeoCoordinates",
      latitude: d.geo.latitude,
      longitude: d.geo.longitude,
    };
  }
  if (d.amenities && d.amenities.length) {
    out.amenityFeature = d.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    }));
  }
  return out;
}

export type RestaurantData = {
  name: string;
  description?: string;
  servesCuisine?: string;
  url: string;
  address: string;
  areaName?: string;
  reservationUrl?: string;
  geo?: LatLng | null;
};

export function restaurantJsonLd(d: RestaurantData) {
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: d.name,
    url: d.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: d.address.split(",")[0].trim(),
      addressLocality: d.areaName ?? "Noosa",
      addressRegion: "QLD",
      addressCountry: "AU",
    },
    acceptsReservations: "True",
  };
  if (d.description) out.description = d.description;
  if (d.servesCuisine) out.servesCuisine = d.servesCuisine;
  if (d.reservationUrl) out.hasMenu = d.reservationUrl;
  if (d.geo) {
    out.geo = {
      "@type": "GeoCoordinates",
      latitude: d.geo.latitude,
      longitude: d.geo.longitude,
    };
  }
  return out;
}

export type TouristAttractionData = {
  name: string;
  description: string;
  url: string;
  geo?: LatLng | null;
  isAccessibleForFree?: boolean;
};

/** TouristAttraction JSON-LD — activities / experiences. */
export function touristAttractionJsonLd(d: TouristAttractionData) {
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: d.name,
    description: d.description,
    url: d.url,
    isPartOf: { "@id": `${SITE.productionUrl}#website` },
  };
  if (d.geo) {
    out.geo = {
      "@type": "GeoCoordinates",
      latitude: d.geo.latitude,
      longitude: d.geo.longitude,
    };
  }
  if (d.isAccessibleForFree !== undefined) {
    out.isAccessibleForFree = d.isAccessibleForFree;
  }
  return out;
}

/** MediaObject JSON-LD — webcams. */
export function mediaObjectJsonLd(d: {
  name: string;
  contentUrl: string;
  thumbnailUrl?: string;
  description?: string;
  uploadDate?: string;
}) {
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MediaObject",
    name: d.name,
    contentUrl: d.contentUrl,
    encodingFormat: "image/jpeg",
  };
  if (d.thumbnailUrl) out.thumbnailUrl = d.thumbnailUrl;
  if (d.description) out.description = d.description;
  if (d.uploadDate) out.uploadDate = d.uploadDate;
  return out;
}

/** LiveBlogPosting JSON-LD — /live. */
export function liveBlogPostingJsonLd(d: {
  headline: string;
  description: string;
  url: string;
  liveBlogUpdate: Array<{
    headline: string;
    datePublished: string;
    articleBody: string;
    url?: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LiveBlogPosting",
    headline: d.headline,
    description: d.description,
    url: d.url,
    coverageStartTime: d.liveBlogUpdate[0]?.datePublished,
    coverageEndTime: d.liveBlogUpdate.at(-1)?.datePublished,
    liveBlogUpdate: d.liveBlogUpdate.map((u) => ({
      "@type": "BlogPosting",
      headline: u.headline,
      datePublished: u.datePublished,
      articleBody: u.articleBody,
      ...(u.url ? { url: u.url } : {}),
    })),
  };
}

export type FaqItem = {
  question: string;
  answer: string;
};

/** FAQPage JSON-LD — pages with genuine FAQ content. */
export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
}

/** Get a geo for an area slug, falling back to Noosa Heads centroid. */
export function geoForSlugOrNoosa(slug: string): LatLng {
  return (
    NOOSA_AREAS_GEO[slug] ??
    NOOSA_LANDMARKS_GEO["noosa-headland"] ?? {
      latitude: -26.3927,
      longitude: 153.0755,
    }
  );
}
