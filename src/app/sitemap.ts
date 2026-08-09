import type { MetadataRoute } from "next";
import { SITE_URL as base } from "@/lib/site-url";
import { getSiteContent } from "@/lib/content/get";
import { slugify } from "@/lib/slug";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getSiteContent();
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/main`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];
  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${slugify(p.name)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...staticPages, ...projectPages];
}
