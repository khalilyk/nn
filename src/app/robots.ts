import type { MetadataRoute } from "next";
import { SITE_URL as base } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/login"] },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
