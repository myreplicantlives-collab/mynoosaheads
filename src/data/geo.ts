/**
 * Geo coordinates for Noosa locations — M4 schema rollout.
 *
 * Coordinates are area centroids sourced from Google Maps (Aug 2026),
 * rounded to 4 decimal places (~11m precision). They populate the
 * `geo` field on Place / LodgingBusiness / Restaurant / TouristAttraction
 * JSON-LD blocks per Google Rich Results guidance.
 *
 * Each area covers a small bounding box; the centroid is a reasonable
 * approximation for "geo" on a Place that is the area as a whole. For
 * individual properties/venues the area centroid is fine for the
 * schema-only purpose (we do not need pin-point accuracy for SEO
 * structured data; the operator's own site carries the canonical
 * location).
 *
 * Verified 2026-09-01.
 */

export type LatLng = { latitude: number; longitude: number };

export const NOOSA_AREAS_GEO: Record<string, LatLng> = {
  "hastings-street": { latitude: -26.3853, longitude: 153.0919 },
  hastings: { latitude: -26.3853, longitude: 153.0919 },
  noosaville: { latitude: -26.3984, longitude: 153.0646 },
  "sunshine-beach": { latitude: -26.413, longitude: 153.0989 },
  sunshine: { latitude: -26.413, longitude: 153.0989 },
  "peregian-beach": { latitude: -26.4811, longitude: 153.0956 },
  peregian: { latitude: -26.4811, longitude: 153.0956 },
};

export const NOOSA_LANDMARKS_GEO: Record<string, LatLng> = {
  "main-beach": { latitude: -26.3855, longitude: 153.0918 },
  "noosa-headland": { latitude: -26.3864, longitude: 153.0933 },
  "granite-bay": { latitude: -26.3781, longitude: 153.1036 },
  "fairy-pools": { latitude: -26.3719, longitude: 153.1152 },
  "noosa-national-park": { latitude: -26.3781, longitude: 153.1036 },
  "hastings-street": { latitude: -26.3853, longitude: 153.0919 },
  "noosa-river": { latitude: -26.4078, longitude: 153.0735 },
  "noosa-main-beach": { latitude: -26.3855, longitude: 153.0918 },
};

export function geoForAreaSlug(slug: string): LatLng | null {
  return NOOSA_AREAS_GEO[slug] ?? null;
}

export function geoForLandmark(name: string): LatLng | null {
  const key = name.toLowerCase().replace(/\s+/g, "-");
  return NOOSA_LANDMARKS_GEO[key] ?? null;
}
