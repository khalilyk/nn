import type { Proposal, ProposalKind, Slide, SlideLayout } from "./types";
import { KIND_LABELS } from "./types";

/** A fresh slide of the given layout, for the "add slide" menu. */
export function blankSlide(layout: SlideLayout, id: string): Slide {
  switch (layout) {
    case "cover":
      return { id, layout, image: "", eyebrow: "This", titleStrong: "Proposal", titleRest: "is anything but normal" };
    case "closing":
      return { id, layout, topLabel: "ready to go?", email: "hello@thisisnn.com", sideLabel: "get in touch to start" };
    case "rich":
    default:
      return { id, layout: "rich", image: "", html: "<h3>SECTION TITLE</h3><p>Write your content here. Use the toolbar to format text, add headings, lists, links and more.</p>" };
  }
}

const sid = (k: string, i: number) => `${k}-${i}`;
const li = (items: string[]) => `<ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;

function scopeSlides(kind: ProposalKind): Slide[] {
  if (kind === "branding") {
    return [
      { id: sid("b", 3), layout: "rich", image: "", html:
        `<h3>SCOPE &amp; TIMELINE</h3><p><strong>PROJECT TIMELINE</strong><br/>Estimated 3–4 week rollout, subject to feedback and approval stages.</p>` +
        `<p><strong>BRAND STRATEGY</strong></p>${li(["Brand positioning &amp; messaging", "Tone of voice", "Audience &amp; market framing", "Naming support (if required)"])}` +
        `<p><strong>VISUAL IDENTITY</strong></p>${li(["Logo suite &amp; variations", "Typography system", "Colour palette", "Art direction &amp; imagery style"])}` },
      { id: sid("b", 4), layout: "rich", image: "", html:
        `<h3>DELIVERABLES</h3><p><strong>BRAND GUIDELINES</strong></p>${li(["Full brand guideline document", "Logo usage rules", "Do's and don'ts", "Asset library"])}` +
        `<p><strong>COLLATERAL</strong></p>${li(["Social media templates", "Business cards &amp; stationery", "Email signature", "Presentation template"])}` },
      { id: sid("b", 5), layout: "rich", image: "", html:
        `<h3>INVESTMENT</h3><p><strong>FIXED INVESTMENT</strong><br/>A fixed project investment of $X AUD for the complete brand identity outlined within this proposal.</p>` +
        `<p><strong>PAYMENT STRUCTURE</strong></p>${li(["50% deposit upon project commencement", "50% prior to final handover"])}` +
        `<p><strong>OPTIONAL FUTURE ADDITIONS</strong></p>${li(["Brand campaign design", "Packaging design", "Ongoing creative retainer"])}` },
    ];
  }
  if (kind === "social") {
    return [
      { id: sid("s", 3), layout: "rich", image: "", html:
        `<h3>SCOPE &amp; TIMELINE</h3><p><strong>PROJECT TIMELINE</strong><br/>Ongoing monthly engagement with an initial 2-week strategy and setup phase.</p>` +
        `<p><strong>STRATEGY</strong></p>${li(["Channel &amp; audience strategy", "Content pillars &amp; themes", "Posting cadence &amp; calendar", "Competitor &amp; market review"])}` +
        `<p><strong>CONTENT</strong></p>${li(["Monthly content production", "Short-form video direction", "Caption &amp; copywriting", "Templated post systems"])}` },
      { id: sid("s", 4), layout: "rich", image: "", html:
        `<h3>MANAGEMENT &amp; GROWTH</h3><p><strong>MANAGEMENT</strong></p>${li(["Scheduling &amp; publishing", "Community management", "Monthly reporting", "Performance optimisation"])}` +
        `<p><strong>GROWTH</strong></p>${li(["Paid amplification setup", "Hashtag &amp; SEO strategy", "Influencer/partnership support"])}` },
      { id: sid("s", 5), layout: "rich", image: "", html:
        `<h3>INVESTMENT</h3><p><strong>MONTHLY RETAINER</strong><br/>A monthly investment of $X AUD covering the strategy, content and management outlined within this proposal.</p>` +
        `<p><strong>PAYMENT STRUCTURE</strong></p>${li(["Monthly in advance", "Minimum 3-month engagement"])}` +
        `<p><strong>OPTIONAL FUTURE ADDITIONS</strong></p>${li(["Paid ad management", "Photography/video days", "Email marketing"])}` },
    ];
  }
  // website / mix
  return [
    { id: sid("w", 3), layout: "rich", image: "", html:
      `<h3>SCOPE &amp; TIMELINE</h3><p><strong>PROJECT TIMELINE</strong><br/>Estimated 4-week rollout, subject to content delivery and approval stages.</p>` +
      `<p><strong>WEBSITE STRATEGY &amp; STRUCTURE</strong></p>${li(["Website architecture &amp; sitemap planning", "UX and conversion strategy", "SEO structure planning", "State-based page framework", "Knowledge base/resource centre planning"])}` +
      `<p><strong>UI/UX DESIGN</strong></p>${li(["Fully custom website design", "Desktop &amp; mobile responsive layouts", "Modern motion-led interface direction", "Typography and UI systems"])}` },
    { id: sid("w", 4), layout: "rich", image: "", html:
      `<h3>BUILD &amp; FOUNDATIONS</h3><p><strong>DEVELOPMENT &amp; CMS</strong></p>${li(["Full website development", "CMS/backend integration", "Team admin access and editing controls", "Blog/resource functionality", "Mailchimp, LinkedIn &amp; YouTube integration", "Mobile &amp; speed optimisation"])}` +
      `<p><strong>SEO &amp; CONTENT FOUNDATIONS</strong></p>${li(["Service SEO page setup", "State-based landing pages", "Metadata and technical SEO setup", "Scalable future SEO structure"])}` },
    { id: sid("w", 5), layout: "rich", image: "", html:
      `<h3>INVESTMENT</h3><p><strong>FIXED INVESTMENT</strong><br/>A fixed project investment of $X AUD for the complete website strategy, design, development, integrations and launch.</p>` +
      `<p><strong>PAYMENT STRUCTURE</strong></p>${li(["50% deposit upon project commencement", "50% prior to final launch"])}` +
      `<p><strong>OPTIONAL FUTURE ADDITIONS</strong></p>${li(["Ongoing SEO retainers", "AI automations", "Client portals"])}` },
  ];
}

const OBJECTIVE: Record<ProposalKind, string> = {
  branding: "To craft a distinctive brand identity that communicates confidence and credibility, and gives the business a consistent, ownable presence across every touchpoint.</p><p>Success looks like a brand people recognise and remember — one that feels considered, cohesive and unmistakably its own.",
  website: "To develop a future-focused digital platform that strengthens credibility, improves lead generation and supports long-term growth.</p><p>Success looks like people recognising the name before the first meeting — and a platform that continuously grows with the business rather than needing to be rebuilt every few years.",
  social: "To build a social presence that earns attention, builds trust and turns followers into customers.</p><p>Success looks like a consistent, recognisable feed, growing engagement, and content that does the selling before the first conversation.",
  mix: "To build a complete digital presence — brand, website and content working as one system — that strengthens credibility and supports long-term growth.</p><p>Success looks like a cohesive presence people recognise and trust from the very first touchpoint.",
};

export function templateFor(kind: ProposalKind): Slide[] {
  const label = KIND_LABELS[kind];
  return [
    { id: sid("cover", 0), layout: "cover", image: "", eyebrow: "This", titleStrong: `${label} Proposal`, titleRest: "is anything but normal" },
    { id: sid("intro", 1), layout: "rich", image: "", html:
      `<h3>BUILDING SOMETHING THAT LASTS</h3><p>The opportunity here is bigger than a one-off project. It is about building something that positions the business as a modern, future-focused leader in its space.</p><p>Most competitors still feel outdated and difficult to expand. This should feel different — cleaner, faster, smarter.</p><p>That is where Not Normal comes in.</p>` },
    { id: sid("obj", 2), layout: "rich", image: "", html: `<h3>OBJECTIVE</h3><p>${OBJECTIVE[kind]}</p>` },
    ...scopeSlides(kind),
    { id: sid("final", 6), layout: "rich", image: "", html:
      `<h3>FINAL THOUGHTS</h3><p>This project is not about something that simply looks good today. It is about building something that still feels relevant, expandable and future-focused years from now.</p><p>Most importantly, something that communicates confidence, clarity and credibility from the very first moment.</p><p>Because nobody remembers normal.</p>` },
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
