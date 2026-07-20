/** Canonical public base URL for metadata, sitemap and robots.
 *
 *  NOTE: VERCEL_URL is the *per-deployment* host (changes on every deploy), so it
 *  must not be used for canonical/sitemap URLs. VERCEL_PROJECT_PRODUCTION_URL is
 *  the stable production domain. Set NEXT_PUBLIC_SITE_URL to override (e.g. once
 *  thisisnn.com points at this deployment). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://thisisnn.com")
).replace(/\/$/, "");
