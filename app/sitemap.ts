import type { MetadataRoute } from "next";
import { SITE_URL, work } from "@/lib/content";

const UPDATED = new Date(process.env.BUILD_TIME ?? Date.now());

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.9 },
    ...work.map((w) => ({ url: `${SITE_URL}/work/${w.slug}`, lastModified: UPDATED, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE_URL}/resume`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/hire`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.9 },
  ];
}
