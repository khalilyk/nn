import type { SiteContent } from "./types";

export const SECTIONS: { key: keyof SiteContent; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "menu", label: "Menu" },
  { key: "about", label: "About" },
  { key: "projects", label: "Projects" },
  { key: "brands", label: "Brands" },
  { key: "testimonials", label: "Testimonials" },
  { key: "notes", label: "Notes" },
  { key: "contact", label: "Contact" },
  { key: "nav", label: "Navigation" },
  { key: "footer", label: "Footer" },
];

export const SECTION_KEYS = SECTIONS.map((s) => s.key) as string[];
