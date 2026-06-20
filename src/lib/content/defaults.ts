import type { SiteContent } from "./types";

/** A simple SVG wordmark as a data URI — placeholder client logos until real ones are uploaded. */
const textLogo = (t: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 80'><text x='120' y='52' font-family='Helvetica,Arial,sans-serif' font-size='30' font-weight='700' letter-spacing='1' text-anchor='middle' fill='#F3F1EC'>${t}</text></svg>`
  );

/** The current site content, used as the DB seed AND the runtime fallback.
 *  Components import their slice from here as the default prop, so the site
 *  renders identically whether or not the database is connected. */
export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    verticalLabel: "Branding, Marketing, Experience",
    titleLines: ["Let Them Savour,", "Sip and Live", "Your Story."],
    spotsLeftBadge: "2 spots left this month",
    supportingCopy: "A Hospitality Brand Advisory For Those That Refuse to Blend In",
  },

  menu: {
    eyebrow: "The Menu, What We Do",
    heading: "Four ways we make brands unforgettable.",
    courses: [
      {
        course: "The Amuse Bouche",
        title: "Branding & Identity",
        items: [
          "Naming & Tagline Development",
          "Brand Strategy & Positioning",
          "Logo & Identity Design",
          "Visual Identity Systems",
          "Tone of Voice & Messaging",
          "Brand Guidelines",
          "Menu Design",
          "Packaging Concepts",
        ],
      },
      {
        course: "The Appetizers",
        title: "Web Design & Development",
        items: [
          "Website Design",
          "Website Development",
          "UX & User Journey Mapping",
          "Mobile Optimisation",
          "Booking & Reservation Integrations",
          "E-Commerce Solutions",
          "SEO Foundations",
          "Website Management & Updates",
        ],
      },
      {
        course: "The Mains",
        title: "Print & Production",
        items: [
          "Signage & Environmental Graphics",
          "Packaging Production",
          "Menus & Printed Collateral",
          "Uniform Design & Manufacture",
          "Promotional Merchandise",
          "Exhibition & Event Displays",
          "Large Format Printing",
        ],
      },
      {
        course: "The Desserts",
        title: "PR & Brand Visibility",
        intro: [
          "A great brand deserves to be discovered through storytelling, media relationships, content and collaborations that put it in front of the right audience.",
        ],
        items: [
          "Public Relations (PR)",
          "Media Outreach & Press Releases",
          "Launch Strategies & Campaigns",
          "Influencer & Ambassador Partnerships",
          "Social Media Strategy",
          "Content Creation",
          "Photography & Videography",
          "Community Management",
        ],
      },
    ],
    palette: [
      { bg: "#EFE7D6", fg: "#0A0A0A" },
      { bg: "#E4DAF6", fg: "#0A0A0A" },
      { bg: "#C9A227", fg: "#0A0A0A" },
      { bg: "#FF6A3D", fg: "#0A0A0A" },
      { bg: "#F2EBA0", fg: "#0A0A0A" },
      { bg: "#BFE3C6", fg: "#0A0A0A" },
      { bg: "#F7C8DD", fg: "#0A0A0A" },
      { bg: "#BCD6F5", fg: "#0A0A0A" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80",
    ],
  },

  about: {
    eyebrow: "The founder",
    founderName: "Khalil Khouri",
    heading: "Founded on a refusal to blend in.",
    image: "/nn-founder.jpg",
    thoughtBubble: "What's for lunch?",
    paragraphs: [
      "Most venues settle for being good. Not Normal exists for the ones that refuse to be forgotten.",
      "The conviction is simple: the world doesn't need more of the same. Founder Khalil Khouri has spent two decades proving it, behind names recognised by Michelin, celebrated by The World's 50 Best, and awarded across Dubai's most competitive dining rooms. 3Fils. BRIX. Bordo Mavi.",
      "From Dubai's waterfront to new concepts in Sydney and collaborations across Beirut, one thing held true everywhere. There's a difference between a venue people visit and one they can't stop talking about. We build the second kind.",
      "Restaurants, cafés, lifestyle brands. Identity, strategy, menus, packaging, content, launch. Every decision runs through a hospitality lens, because that's the only one we've ever worked through.",
      "Built across cities and cultures. Designed to be remembered.",
    ],
  },

  projects: [
    { name: "3FILS", sub: "Reimagining a Waterfront Icon", city: "Dubai", year: "2019", cat: "Branding", desc: "From a bold idea to a dining experience that redefined a category. We built more than a brand, we built obsession, with every plate and touchpoint designed to be remembered.", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80" },
    { name: "Revolver", sub: "A Neighbourhood Bar, Reborn", city: "Sydney", year: "2021", cat: "Identity", desc: "A neighbourhood bar reimagined as a cultural anchor. Quiet rebellion designed into every detail, from the identity to the room people never want to leave.", img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1800&q=80" },
    { name: "Maison Dali", sub: "Surrealism, Served", city: "Beirut", year: "2022", cat: "Branding", desc: "Surrealism on a plate. We built a world, not a logo. Each touchpoint a different act in the same play, designed to surprise and seduce in equal measure.", img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1800&q=80" },
    { name: "Oakberry", sub: "A Healthy Habit Made Iconic", city: "Dubai", year: "2023", cat: "Content", desc: "Visual direction that turned a healthy habit into a status symbol. Crave-worthy frame by frame, built to be screenshot, shared and remembered.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1800&q=80" },
    { name: "Benny's", sub: "A Room You Never Leave", city: "Sydney", year: "2024", cat: "Identity", desc: "Concept, identity and energy for a room people don't want to leave. A brand built around the feeling of a great night that never quite ends.", img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1800&q=80" },
    { name: "Print Paradise", sub: "Editorial Meets Hospitality", city: "Beirut", year: "2025", cat: "Print", desc: "Where editorial meets hospitality. A brand that reads like a magazine and tastes like a memory, printed across every surface worth touching.", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=80" },
    { name: "Kinoya", sub: "An Izakaya With a Soul", city: "Dubai", year: "2022", cat: "Branding", desc: "An izakaya with a soul. A warm, lived-in identity that carries the intimacy of a Tokyo back-alley into a Dubai dining room.", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=80" },
    { name: "Tony's Woodfire", sub: "Fire, Smoke & Story", city: "Sydney", year: "2023", cat: "Content", desc: "Fire, smoke and story. A bold, tactile brand built around the primal pull of cooking over open flame.", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80" },
    { name: "Shanghai Me", sub: "Old-World Glamour, Rebuilt", city: "Dubai", year: "2021", cat: "Identity", desc: "Old-world glamour, rebuilt for today. A cinematic identity steeped in 1930s Shanghai, dialled up for a modern fine-dining stage.", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=80" },
    { name: "Mimi Kakushi", sub: "1920s Osaka, Reborn in Dubai", city: "Dubai", year: "2024", cat: "Branding", desc: "1920s Osaka reborn in Dubai. A richly detailed world of jazz-age Japan, translated into every plate, menu and surface.", img: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1800&q=80" },
  ],

  clients: {
    eyebrow: "Selected partners",
    heading: "Brands we've shaped.",
    logos: ["KINOYA", "PIEHAUS", "MAISON15", "MIMI KAKUSHI", "XU"].map(textLogo),
  },

  testimonials: [
    { q: "Everything finally felt like it belonged together.", name: "Bassil", venue: "Tonton Bakes", color: "#FF5C1A" },
    { q: "The photos didn't just look good, they felt like us.", name: "Stasha", venue: "PieHaus", color: "#FF2EC4" },
    { q: "Every touchpoint felt considered and cohesive.", name: "Zara", venue: "Tony's Woodfire", color: "#6AB7FF" },
    { q: "Every frame was made to stop someone mid-scroll.", name: "Neha", venue: "Kinoya", color: "#C9A7FF" },
  ],

  notes: {
    eyebrow: "Thinking out loud",
    heading: "Notes we've scribbled down",
    posts: [
      { variant: "split", cat: "Branding", date: "May 2026", title: "Why Nobody Remembers Normal", read: "5 min read", excerpt: "The case for building brands with staying power instead of chasing the trend.", body: "Most brands disappear because they try to please everyone. The ones that last pick a point of view and commit to it.\n\nNormal is forgettable by definition. If your venue looks, sounds and feels like the place next door, you're asking to be a commodity — competing on price and convenience instead of meaning.\n\nWe build for memory: a clear idea, a distinct voice, and details that reward attention. That's what turns a one-time visit into a story people tell.", bg: "#BBD9F2", ink: "#0A0A0A", rotate: "-2deg", top: "BRANDS NOT", bottom: "BACKGROUND", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80" },
      { variant: "type", cat: "Hospitality", date: "Apr 2026", title: "Menus That Actually Sell", read: "6 min read", excerpt: "How layout, language and a little psychology turn a menu into a revenue tool.", body: "A menu isn't a list — it's the highest-leverage piece of design in any venue. Every guest reads it, and small choices move real money.\n\nStructure guides the eye: group with intent, anchor with a hero dish, and give your best margins room to breathe. Language sells the experience, not the ingredients.\n\nDone well, the menu does the upselling for you — quietly, on every table, every service.", bg: "#D8F24A", ink: "#0A0A0A", rotate: "1.5deg", eyebrow: "Quality over noise", lines: ["MENUS", "THAT MAKE", "MONEY…"], footer: "Without the crafty bullshit" },
      { variant: "blah", cat: "Content", date: "Mar 2026", title: "Say Something Worth Hearing", read: "4 min read", excerpt: "Stop sounding like everyone else.", body: "Hospitality content has a sameness problem: the same adjectives, the same shots, the same captions. It all blurs into noise.\n\nThe fix isn't louder — it's truer. Say the specific thing only your venue can say. Show the texture, the people, the imperfect real moments.\n\nA single honest line beats ten polished clichés. Make people feel something and they'll remember where they felt it.", bg: "#ECE7DA", ink: "#0A0A0A", rotate: "-1deg", word: "BLAH", rows: 5, line: "Stop sounding like everyone else.", img: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=700&q=80" },
      { variant: "type", cat: "Experience", date: "Feb 2026", title: "The First 90 Seconds", read: "5 min read", excerpt: "First impressions in hospitality, and why they quietly decide everything.", body: "Guests decide how they feel about your venue almost before they sit down. The greeting, the smell, the light, the first sound — it all lands in the first 90 seconds.\n\nMost places spend everything on the food and nothing on the arrival. That's a missed opportunity, because the opening sets the lens for the whole visit.\n\nDesign the entrance like a first line of a story. Get it right and everything after feels better.", bg: "#81D742", ink: "#0A0A0A", rotate: "2deg", eyebrow: "First impressions", lines: ["THE", "FIRST 90", "SECONDS"], footer: "Decide everything" },
    ],
  },

  contact: {
    heading: "Ready to create something unforgettable?",
    intro: "Got an idea? A dream? A half-baked concept scribbled on a napkin? We're into that. Whether you're building from scratch or looking to shake things up, drop us a message. We're here for bold moves, real conversations, and doing things differently, one unforgettable brand at a time.",
    detailEyebrow: "Contact Us",
    detailHeading: "A limited number of projects. A lot of attention.",
    detailBody: [
      "We keep our client roster intentionally small, allowing us to stay hands-on from strategy through to execution. That means availability is limited, and most months fill quickly.",
      "If you're serious about building something memorable, let's talk.",
    ],
    email: "hello@thisisnn.com",
    phone: "+61 433 714 701",
    formEyebrow: "Or fill the form",
    formHeading: "Wanna start something?",
    coffeeOptions: ["Espresso", "Cappuccino", "Long black", "Decaf", "I don't drink coffee"],
  },

  nav: [
    { l: "The Menu", href: "/#s02", tip: "What we do", shape: "rounded-none" },
    { l: "Projects", href: "/#s04", tip: "Selected proof", shape: "rounded-tl-xl rounded-br-xl" },
    { l: "About", href: "/#about", tip: "Who we are", shape: "rounded-full" },
    { l: "Notes", href: "/#journal", tip: "Thinking & insights", shape: "rounded-lg" },
  ],

  footer: {
    email: "hello@thisisnn.com",
    phone: "+61 433 714 701",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/bynotnormal" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/bynotnormal" },
    ],
    locations: "Sydney, Dubai, Beirut",
    landAck: "We acknowledge the Gadigal, the traditional custodians of the Country on which Not Normal and its brands stands.",
    trademark: "Nobody Remembers Normal.™",
    legal: {
      privacy: {
        title: "Privacy Policy",
        body: [
          "Not Normal (“we”, “us”) respects your privacy. This policy explains what we collect, why, and how we look after it.",
          "What we collect. When you reach out through our contact form or by email, we collect the details you choose to share, typically your name, email, phone number and a description of your project. We don't collect anything you don't hand us.",
          "How we use it. We use your information solely to respond to your enquiry, scope potential work, and stay in touch about your project. We do not sell, rent or trade your data to anyone.",
          "Storage. Your details are stored securely and kept only as long as needed to serve your enquiry or meet our legal obligations.",
          "Third parties. We rely on a small number of trusted providers (for email and hosting) who process data on our behalf under their own safeguards. We never share more than necessary.",
          "Your rights. You can ask us at any time to see, correct or delete the information we hold about you. Just email hello@thisisnn.com.",
          "Updates. We may revise this policy from time to time. The latest version always lives here.",
        ],
      },
      terms: {
        title: "Terms of Use",
        body: [
          "By using this website you agree to the terms below. If you don't agree, please don't use the site.",
          "Our content. All copy, design, imagery and brand work on this site belongs to Not Normal unless stated otherwise. You're welcome to view and share it, but not to copy, reproduce or repurpose it without our written permission.",
          "Your enquiry. Sending an enquiry doesn't create a contract or guarantee that we'll take on your project. Any engagement is confirmed separately in a signed proposal or agreement.",
          "No warranty. The site is provided “as is”. While we keep it accurate and current, we make no guarantees that it'll be error-free or always available.",
          "Liability. To the extent permitted by law, Not Normal isn't liable for any loss arising from your use of this site or reliance on its content.",
          "External links. Where we link out to other sites, we're not responsible for their content or practices.",
          "Governing law. These terms are governed by the laws of New South Wales, Australia.",
        ],
      },
    },
  },
  seo: {
    title: "Not Normal, Nobody Remembers Normal",
    description:
      "A hospitality branding and marketing studio for brands that refuse to blend in. Sydney, Dubai, Beirut.",
    keywords:
      "hospitality branding, restaurant branding, brand strategy, marketing studio, Sydney, Dubai, Beirut",
    ogImage: "/nn-header-poster.jpg",
  },
};
