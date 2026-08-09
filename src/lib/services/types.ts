// Client-safe types for the Services Catalog — bric's 3-level model:
// Category → Service → line items (each with a rate + description). Saving
// derives a flat rate card that proposals & invoices price from.

export type ServiceLineItem = { id: string; name: string; rate: number; description?: string };
export type ServiceDef = { id: string; name: string; items: ServiceLineItem[] };
export type ServiceCategory = { id: string; name: string; services: ServiceDef[] };
export type ServicesCatalog = ServiceCategory[];

/** name -> rate, the flat lookup proposals & invoices read. */
export type RateCard = Record<string, number>;

export function catalogToRateCard(catalog: ServicesCatalog): RateCard {
  const rc: RateCard = {};
  for (const cat of catalog)
    for (const svc of cat.services)
      for (const it of svc.items) if (it.name.trim()) rc[it.name.trim()] = it.rate || 0;
  return rc;
}

const slug = (x: string) => x.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const li = (name: string, rate = 0, description = ""): ServiceLineItem => ({ id: `it-${slug(name)}`, name, rate, description });
const svc = (name: string, items: ServiceLineItem[]): ServiceDef => ({ id: `sv-${slug(name)}`, name, items });
const cat = (name: string, services: ServiceDef[]): ServiceCategory => ({ id: `cat-${slug(name)}`, name, services });

/** Seed catalog — the four "what we do" categories, each split into services. */
export const DEFAULT_CATALOG: ServicesCatalog = [
  cat("Branding & Identity", [
    svc("Brand Strategy", [
      li("Naming & Tagline Development", 0, "Distinctive names and a supporting tagline."),
      li("Brand Strategy & Positioning", 0, "Positioning, audience and market framing."),
      li("Tone of Voice & Messaging", 0, "Key messages and a consistent voice."),
    ]),
    svc("Visual Identity", [
      li("Logo & Identity Design", 0, "Logo suite, type, colour and art direction."),
      li("Visual Identity Systems", 0, "A flexible system across every touchpoint."),
      li("Brand Guidelines", 0, "A guidelines document so it's applied consistently."),
    ]),
    svc("Collateral", [
      li("Menu Design", 0, "Menus designed to look good and sell."),
      li("Packaging Concepts", 0, "Packaging concepts that stand out on shelf."),
    ]),
  ]),
  cat("Web Design & Development", [
    svc("Design", [
      li("Website Design", 0, "Custom, responsive website design."),
      li("UX & User Journey Mapping", 0, "Conversion-focused user journeys."),
      li("Mobile Optimisation", 0, "Fast, polished mobile experience."),
    ]),
    svc("Development", [
      li("Website Development", 0, "Full build with a CMS you can edit."),
      li("E-Commerce Solutions", 0, "Online store and checkout."),
      li("Booking & Reservation Integrations", 0, "Reservations wired into the site."),
    ]),
    svc("Ongoing", [
      li("SEO Foundations", 0, "Technical and on-page SEO groundwork."),
      li("Website Management & Updates", 0, "Ongoing edits, hosting and care."),
    ]),
  ]),
  cat("Print & Production", [
    svc("Environmental", [
      li("Signage & Environmental Graphics", 0, "Signage and in-venue graphics."),
      li("Exhibition & Event Displays", 0, "Stands and event displays."),
      li("Large Format Printing", 0, "Banners and large-format print."),
    ]),
    svc("Collateral", [
      li("Menus & Printed Collateral", 0, "Menus, cards and printed pieces."),
      li("Packaging Production", 0, "Production-ready packaging."),
      li("Promotional Merchandise", 0, "Branded merch and giveaways."),
    ]),
    svc("Apparel", [
      li("Uniform Design & Manufacture", 0, "Designed and manufactured uniforms."),
    ]),
  ]),
  cat("PR & Brand Visibility", [
    svc("PR & Media", [
      li("Public Relations (PR)", 0, "PR strategy and media relationships."),
      li("Media Outreach & Press Releases", 0, "Outreach and press releases."),
      li("Launch Strategies & Campaigns", 0, "Launch plans and campaigns."),
    ]),
    svc("Social & Content", [
      li("Social Media Strategy", 0, "Channel strategy and content pillars."),
      li("Content Creation", 0, "Ongoing content production."),
      li("Community Management", 0, "Day-to-day community management."),
    ]),
    svc("Creative", [
      li("Photography & Videography", 0, "Shoots for brand and content."),
      li("Influencer & Ambassador Partnerships", 0, "Partnerships and collaborations."),
    ]),
  ]),
];
