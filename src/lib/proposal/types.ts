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

export type Slide =
  | { id: string; layout: "cover"; image: string; eyebrow: string; titleStrong: string; titleRest: string }
  | { id: string; layout: "imageText"; image: string; heading: string; body: string }
  | { id: string; layout: "imageSections"; image: string; heading: string; sections: Section[] }
  | { id: string; layout: "statement"; heading: string; body: string; image: string }
  | { id: string; layout: "closing"; topLabel: string; email: string; sideLabel: string };

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

export const LAYOUT_LABELS: Record<SlideLayout, string> = {
  cover: "Cover",
  imageText: "Image + text",
  imageSections: "Image + bullet sections",
  statement: "Statement",
  closing: "Closing / contact",
};
