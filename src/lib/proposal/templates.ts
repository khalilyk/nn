import type { Proposal, ProposalKind, Slide, SlideLayout } from "./types";
import { KIND_LABELS } from "./types";

/** A fresh slide of the given layout, for the "add slide" menu. */
export function blankSlide(layout: SlideLayout, id: string): Slide {
  switch (layout) {
    case "cover":
      return { id, layout, image: "", eyebrow: "This", titleStrong: "Proposal", titleRest: "is anything but normal" };
    case "imageText":
      return { id, layout, image: "", heading: "SECTION TITLE", body: "Write the section copy here.\n\nUse a blank line to start a new paragraph." };
    case "imageSections":
      return { id, layout, image: "", heading: "SECTION TITLE", sections: [{ title: "GROUP", bullets: ["First point", "Second point"] }] };
    case "statement":
      return { id, layout, image: "", heading: "FINAL THOUGHTS", body: "A closing statement.\n\nBecause nobody remembers normal." };
    case "closing":
      return { id, layout, topLabel: "ready to go?", email: "hello@thisisnn.com", sideLabel: "get in touch to start" };
  }
}

const sid = (k: string, i: number) => `${k}-${i}`;

/** Scope/investment content tuned per service type. */
function scopeSlides(kind: ProposalKind): Slide[] {
  if (kind === "branding") {
    return [
      { id: sid("branding", 3), layout: "imageSections", image: "", heading: "SCOPE & TIMELINE",
        sections: [
          { title: "PROJECT TIMELINE", intro: "Estimated 3–4 week rollout, subject to feedback and approval stages." , bullets: [] },
          { title: "BRAND STRATEGY", bullets: ["Brand positioning & messaging", "Tone of voice", "Audience & market framing", "Naming support (if required)"] },
          { title: "VISUAL IDENTITY", bullets: ["Logo suite & variations", "Typography system", "Colour palette", "Art direction & imagery style"] },
        ] },
      { id: sid("branding", 4), layout: "imageSections", image: "", heading: "DELIVERABLES",
        sections: [
          { title: "BRAND GUIDELINES", bullets: ["Full brand guideline document", "Logo usage rules", "Do's and don'ts", "Asset library"] },
          { title: "COLLATERAL", bullets: ["Social media templates", "Business cards & stationery", "Email signature", "Presentation template"] },
        ] },
      { id: sid("branding", 5), layout: "imageSections", image: "", heading: "INVESTMENT",
        sections: [
          { title: "FIXED INVESTMENT", intro: "A fixed project investment of $X AUD for the complete brand identity outlined within this proposal.", bullets: [] },
          { title: "PAYMENT STRUCTURE", bullets: ["50% deposit upon project commencement", "50% prior to final handover"] },
          { title: "OPTIONAL FUTURE ADDITIONS", bullets: ["Brand campaign design", "Packaging design", "Ongoing creative retainer"] },
        ] },
    ];
  }
  if (kind === "social") {
    return [
      { id: sid("social", 3), layout: "imageSections", image: "", heading: "SCOPE & TIMELINE",
        sections: [
          { title: "PROJECT TIMELINE", intro: "Ongoing monthly engagement with an initial 2-week strategy and setup phase.", bullets: [] },
          { title: "STRATEGY", bullets: ["Channel & audience strategy", "Content pillars & themes", "Posting cadence & calendar", "Competitor & market review"] },
          { title: "CONTENT", bullets: ["Monthly content production", "Short-form video direction", "Caption & copywriting", "Templated post systems"] },
        ] },
      { id: sid("social", 4), layout: "imageSections", image: "", heading: "MANAGEMENT & GROWTH",
        sections: [
          { title: "MANAGEMENT", bullets: ["Scheduling & publishing", "Community management", "Monthly reporting", "Performance optimisation"] },
          { title: "GROWTH", bullets: ["Paid amplification setup", "Hashtag & SEO strategy", "Influencer/partnership support"] },
        ] },
      { id: sid("social", 5), layout: "imageSections", image: "", heading: "INVESTMENT",
        sections: [
          { title: "MONTHLY RETAINER", intro: "A monthly investment of $X AUD covering the strategy, content and management outlined within this proposal.", bullets: [] },
          { title: "PAYMENT STRUCTURE", bullets: ["Monthly in advance", "Minimum 3-month engagement"] },
          { title: "OPTIONAL FUTURE ADDITIONS", bullets: ["Paid ad management", "Photography/video days", "Email marketing"] },
        ] },
    ];
  }
  // website (and mix) — closest to the EBS deck
  return [
    { id: sid("web", 3), layout: "imageSections", image: "", heading: "SCOPE & TIMELINE",
      sections: [
        { title: "PROJECT TIMELINE", intro: "Estimated 4-week rollout, subject to content delivery and approval stages.", bullets: [] },
        { title: "WEBSITE STRATEGY & STRUCTURE", bullets: ["Website architecture & sitemap planning", "UX and conversion strategy", "SEO structure planning", "State-based page framework", "Knowledge base/resource centre planning"] },
        { title: "UI/UX DESIGN", bullets: ["Fully custom website design", "Desktop & mobile responsive layouts", "Modern motion-led interface direction", "Typography and UI systems", "Video and content integration layouts"] },
      ] },
    { id: sid("web", 4), layout: "imageSections", image: "", heading: "BUILD & FOUNDATIONS",
      sections: [
        { title: "DEVELOPMENT & CMS", bullets: ["Full website development", "CMS/backend integration", "Team admin access and editing controls", "Blog/resource functionality", "Mailchimp, LinkedIn & YouTube integration", "Mobile & speed optimisation"] },
        { title: "SEO & CONTENT FOUNDATIONS", bullets: ["Service SEO page setup", "State-based landing pages", "Metadata and technical SEO setup", "Scalable future SEO structure"] },
      ] },
    { id: sid("web", 5), layout: "imageSections", image: "", heading: "INVESTMENT",
      sections: [
        { title: "FIXED INVESTMENT", intro: "A fixed project investment of $X AUD for the complete website strategy, design, development, integrations and launch.", bullets: [] },
        { title: "PAYMENT STRUCTURE", bullets: ["50% deposit upon project commencement", "50% prior to final launch"] },
        { title: "OPTIONAL FUTURE ADDITIONS", bullets: ["Ongoing SEO retainers", "AI automations", "Client portals"] },
      ] },
  ];
}

const OBJECTIVE: Record<ProposalKind, string> = {
  branding: "To craft a distinctive brand identity that communicates confidence and credibility, and gives the business a consistent, ownable presence across every touchpoint.\n\nSuccess looks like a brand people recognise and remember — one that feels considered, cohesive and unmistakably its own.",
  website: "To develop a future-focused digital platform that strengthens credibility, improves lead generation and supports long-term growth.\n\nSuccess looks like people recognising the name before the first meeting — and a platform that continuously grows with the business rather than needing to be rebuilt every few years.",
  social: "To build a social presence that earns attention, builds trust and turns followers into customers.\n\nSuccess looks like a consistent, recognisable feed, growing engagement, and content that does the selling before the first conversation.",
  mix: "To build a complete digital presence — brand, website and content working as one system — that strengthens credibility and supports long-term growth.\n\nSuccess looks like a cohesive presence people recognise and trust from the very first touchpoint.",
};

/** Seed a whole proposal from a service type. */
export function templateFor(kind: ProposalKind): Slide[] {
  const label = KIND_LABELS[kind];
  return [
    { id: sid("cover", 0), layout: "cover", image: "", eyebrow: "This", titleStrong: `${label} Proposal`, titleRest: "is anything but normal" },
    { id: sid("intro", 1), layout: "imageText", image: "", heading: "BUILDING SOMETHING THAT LASTS",
      body: "The opportunity here is bigger than a one-off project. It is about building something that positions the business as a modern, future-focused leader in its space.\n\nMost competitors still feel outdated and difficult to expand. This should feel different — cleaner, faster, smarter.\n\nThat is where Not Normal comes in." },
    { id: sid("obj", 2), layout: "imageText", image: "", heading: "OBJECTIVE", body: OBJECTIVE[kind] },
    ...scopeSlides(kind),
    { id: sid("final", 6), layout: "statement", image: "", heading: "FINAL THOUGHTS",
      body: "This project is not about something that simply looks good today. It is about building something that still feels relevant, expandable and future-focused years from now.\n\nMost importantly, something that communicates confidence, clarity and credibility from the very first moment.\n\nBecause nobody remembers normal." },
    { id: sid("close", 7), layout: "closing", topLabel: "ready to go?", email: "hello@thisisnn.com", sideLabel: "get in touch to start" },
  ];
}

export function blankProposal(kind: ProposalKind): Omit<Proposal, "id" | "createdAt" | "updatedAt"> {
  return {
    title: `${KIND_LABELS[kind]} Proposal`,
    kind,
    clientTag: "",
    client: { name: "", company: "", email: "" },
    slides: templateFor(kind),
  };
}
