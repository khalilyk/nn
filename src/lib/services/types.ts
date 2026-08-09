// Client-safe types for the Services Catalog — the editable list of everything
// Not Normal offers, grouped by category (seeded from the site's "what we do"
// menu). Saving derives a rate card that proposals read for pricing.

export type CatalogItem = { id: string; name: string; rate: number; description?: string };
export type CatalogCategory = { id: string; name: string; items: CatalogItem[] };
export type ServicesCatalog = CatalogCategory[];

/** name -> rate, the flat lookup proposals & invoices read. */
export type RateCard = Record<string, number>;

export function catalogToRateCard(catalog: ServicesCatalog): RateCard {
  const rc: RateCard = {};
  for (const cat of catalog) for (const it of cat.items) if (it.name.trim()) rc[it.name.trim()] = it.rate || 0;
  return rc;
}

const slug = (x: string) => x.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const cat = (name: string, items: string[]): CatalogCategory => ({
  id: `cat-${slug(name)}`,
  name,
  items: items.map((n) => ({ id: `it-${slug(n)}`, name: n, rate: 0 })),
});

/** Seed catalog — mirrors the four "what we do" courses and their offerings. */
export const DEFAULT_CATALOG: ServicesCatalog = [
  cat("Branding & Identity", [
    "Naming & Tagline Development",
    "Brand Strategy & Positioning",
    "Logo & Identity Design",
    "Visual Identity Systems",
    "Tone of Voice & Messaging",
    "Brand Guidelines",
    "Menu Design",
    "Packaging Concepts",
  ]),
  cat("Web Design & Development", [
    "Website Design",
    "Website Development",
    "UX & User Journey Mapping",
    "Mobile Optimisation",
    "Booking & Reservation Integrations",
    "E-Commerce Solutions",
    "SEO Foundations",
    "Website Management & Updates",
  ]),
  cat("Print & Production", [
    "Signage & Environmental Graphics",
    "Packaging Production",
    "Menus & Printed Collateral",
    "Uniform Design & Manufacture",
    "Promotional Merchandise",
    "Exhibition & Event Displays",
    "Large Format Printing",
  ]),
  cat("PR & Brand Visibility", [
    "Public Relations (PR)",
    "Media Outreach & Press Releases",
    "Launch Strategies & Campaigns",
    "Influencer & Ambassador Partnerships",
    "Social Media Strategy",
    "Content Creation",
    "Photography & Videography",
    "Community Management",
  ]),
];
