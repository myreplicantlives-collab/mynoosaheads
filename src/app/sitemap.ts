import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.productionUrl;
  const now = new Date();
  const paths = [
    "/",
    "/places",
    "/where-to-stay",
    "/eat-drink",
    "/surf-weather",
    "/hikes",
    "/things-to-do",
    "/itineraries",
    "/itineraries/one-day",
    "/itineraries/weekend",
    "/itineraries/four-days",
    "/itineraries/family",
    "/itineraries/fraser-island",
    "/national-park",
    "/webcams",
    "/fishing",
    "/boat-hire",
    "/fraser-kgari",
    "/offers",
    "/visit",
    "/sources",
    "/image-credits",
    "/editorial-policy",
    "/corrections",
    "/about",
    "/contact",
  ];
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "/" ? "daily" : p.startsWith("/itineraries") ? "monthly" : "weekly",
    priority: p === "/" ? 1 : p === "/places" || p === "/where-to-stay" ? 0.9 : 0.7,
  }));
}
