// ── Proposal generator types ──

export type ProposalKind = "branding" | "website" | "social" | "mix";

export const KIND_LABELS: Record<ProposalKind, string> = {
  branding: "Branding",
  website: "Website",
  social: "Social Media Strategy",
  mix: "Full Service",
};

/** A bulleted, titled block used on "sections" slides (scope, investment, etc). */
export type Section = { title: string; intro?: string; bullets: string[] };

/** Per-slide design overrides (font, colours, size, alignment). */
export type SlideStyle = {
  bg?: string; // slide background colour
  fg?: string; // text colour
  font?: "mono" | "sans" | "serif";
  size?: "s" | "m" | "l"; // overall text scale
  align?: "left" | "center";
};

export const FONT_LABELS: Record<NonNullable<SlideStyle["font"]>, string> = {
  mono: "Mono",
  sans: "Sans",
  serif: "Serif",
};

type SlideBase = { id: string; style?: SlideStyle };

export type Slide = SlideBase & (
  | { layout: "cover"; image: string; eyebrow: string; titleStrong: string; titleRest: string }
  | { layout: "rich"; image: string; html: string }
  | { layout: "closing"; topLabel: string; email: string; sideLabel: string }
);

export type SlideLayout = Slide["layout"];

export type Proposal = {
  id: number;
  title: string; // internal name, e.g. "EBS Website Proposal"
  kind: ProposalKind;
  clientTag: string; // short label shown on the right edge of each slide, e.g. "EBS"
  client: { name: string; company: string; email: string };
  slides: Slide[];
  createdAt: string;
  updatedAt: string;
};

/** True if a hex colour is dark (so chrome should flip to light). */
export function isDarkHex(hex?: string): boolean {
  if (!hex) return false;
  const m = hex.replace("#", "");
  if (m.length < 6) return false;
  const r = parseInt(m.slice(0, 2), 16), g = parseInt(m.slice(2, 4), 16), b = parseInt(m.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) < 140;
}

export const SIZE_SCALE: Record<NonNullable<SlideStyle["size"]>, number> = { s: 0.88, m: 1, l: 1.18 };

/** Resolve a slide's style into concrete tokens used by both the preview and PDF. */
export function resolveStyle(style?: SlideStyle) {
  const bg = style?.bg || "#FFFFFF";
  const fg = style?.fg || "#0A0A0A";
  const scale = SIZE_SCALE[style?.size || "m"];
  const font = style?.font || "mono";
  const align = style?.align || "left";
  const dark = isDarkHex(bg);
  return { bg, fg, scale, font, align, dark };
}

export const LAYOUT_LABELS: Record<SlideLayout, string> = {
  cover: "Cover",
  rich: "Content",
  closing: "Closing / contact",
};
