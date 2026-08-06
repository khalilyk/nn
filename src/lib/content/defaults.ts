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
    eyebrow: "About NN",
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
    { name: "Tonton Bakes", sub: "A little everyday magic.", city: "Dubai", year: "2024", cat: "Branding", desc: "We were tasked with building a brand that felt nostalgic yet fresh, charming without being cliché. Inspired by French and Italian bakery traditions and the warmth of the word 'Tonton' (French for uncle), we set out to create something that felt familiar, but never ordinary. We developed a hand-drawn identity system that feels artisanal but modern - pairing soft lines and playful details with a sophisticated palette of pastel purple and green. The logo, brand marks and tone of voice all reflect the essence of Tonton: approachable, slightly cheeky, and rooted in good taste.\n\nThe website was designed to feel like walking into the shop itself - inviting, warm, and filled with personality. Photography captured the hands-on baking process, crumb-close textures, and the kind of natural light that makes you want to slow down and order another pastry. We also created uniforms that feel like part of the story: clean, comfortable and unmistakably Tonton.", img: "/projects/tonton/DSCF3233-Enhanced-NR-scaled.jpg", images: ["/projects/tonton/DSCF3233-Enhanced-NR-scaled.jpg", "/projects/tonton/tontonbakes-hoodie.jpg", "/projects/tonton/nn-tontonlogo.jpg", "/projects/tonton/tontonbakes-box.jpg", "/projects/tonton/DSCF3134-Enhanced-NR-scaled.jpg", "/projects/tonton/DSCF3125-Enhanced-NR-scaled.jpg", "/projects/tonton/tontonbakes-phone.jpg", "/projects/tonton/DSCF3288-Enhanced-NR-scaled.jpg", "/projects/tonton/nn-tontonweb-scaled.jpg"] },
    { name: "Kinoya", sub: "An izakaya with a soul.", city: "Dubai", year: "2025", cat: "Content", desc: "Nestled in the heart of Dubai, Kinoya is more than a ramen bar - it's a cultural ritual. As a Michelin Bib Gourmand-awarded restaurant and one of the UAE's most beloved homegrown concepts, Kinoya embodies the warmth of an izakaya with the soul of Tokyo's backstreets. Our task was to capture this spirit through a lifestyle shoot that reflects not just the food, but the feeling: comforting, communal, and deeply personal.\n\nThe shoot spotlighted Kinoya's signature ramen, sushi, gyoza, and drinks in their natural habitat - steaming bowls mid-slurp, hands reaching for shared plates, and golden hour light pouring over wood textures and soft shadows. We leaned into the honest, lived-in beauty of the space, highlighting the quiet moments between bites and the energy that pulses through every seat at the counter. This wasn't about perfection - it was about presence.\n\nOur visual approach celebrated the Kinoya ethos: craftsmanship without pretension. Whether it was the swirl of noodles in broth or the glint of sake glasses clinking together, every frame aimed to tell a story of passion, precision, and place. This wasn't just a menu shoot - it was a window into Kinoya's world.", img: "/projects/kinoya/nn-kinoyaheader.jpg", images: ["/projects/kinoya/nn-kinoyaheader.jpg", "/projects/kinoya/nn-kinoya2.jpg", "/projects/kinoya/nn-kinoya4.jpg", "/projects/kinoya/nn-kinoya1.jpg", "/projects/kinoya/nn-kinoya5.jpg", "/projects/kinoya/nn-kinoya3.jpg"] },
    { name: "PieHaus", sub: "Flaky pies, bold coffee.", city: "Dubai", year: "2025", cat: "Content", desc: "We spent the day behind the scenes at PieHaus, shooting the new menu that brings 21grams' signature soul to a fresh concept. From hand-stretched Balkan pies to iced lattes and signature sips, every detail was captured to reflect the warmth, texture, and flavour that define PieHaus. Think golden layers, coffee steam, and that unmistakable just-out-the-oven glow.\n\nThe shoot was all about celebrating the craft - crisp edges, gooey centres, and drinks that hit just right. Whether you're popping in for a quick coffee or settling in for a slice (or two), the new PieHaus menu is baked to be remembered and now, it looks just as good as it tastes.", img: "/projects/piehaus/nn-ph-spinach.jpg", images: ["/projects/piehaus/nn-ph-spinach.jpg", "/projects/piehaus/nn-ph-granola.jpg", "/projects/piehaus/nn-ph-pastrami.jpg", "/projects/piehaus/nn-ph-coffee.jpg", "/projects/piehaus/nn-ph-olives.jpg", "/projects/piehaus/nn-ph-hummus.jpg"] },
    { name: "Voyage Concierge", sub: "Exclusive journeys, extraordinary experiences.", city: "Dubai", year: "2025", cat: "Branding", desc: "Voyage Concierge came to us with a clear mission: to redefine how the world experiences travel—seamless, intimate, and utterly bespoke. Our role was to translate that vision into a refined brand identity that felt as effortless and considered as the journeys they design.\n\nFrom the elegant logo to a warm, editorial tone of voice, every element was crafted to reflect the brand's promise of understated luxury and world-class personalization. We drew inspiration from vintage luggage tags, global coordinates, and handwritten notes—symbols of a time when travel was an art, not a transaction.\n\nBeyond the visual identity, we helped Voyage shape its brand story—one that speaks not to tourists, but to travelers. People who value the unseen, the tailored, the quietly spectacular.\n\nWe developed a motto, brand language, and moodboards that evoke wanderlust without the clichés. Because for Voyage Concierge, the destination isn't just a place—it's a feeling. And our goal was to make sure their brand feels exactly like that.", img: "/projects/voyage/nn-voyage.jpg", images: ["/projects/voyage/nn-voyage.jpg", "/projects/voyage/nn-voyagestamps1.jpg", "/projects/voyage/nn-voyagetote1.jpg", "/projects/voyage/nn-voyageshirt.jpg", "/projects/voyage/nn-voyagenote.jpg"] },
    { name: "Genesis Coffee Co.", sub: "Start strong or don't start at all.", city: "Dubai", year: "2025", cat: "Branding", desc: "Genesis Coffee Co was built from the ground up as an in-house project by Not Normal - a brand that believes in standing out, or not showing up at all. The concept began with a single idea: coffee marks the start of the day, just as Genesis marks the start of life.\n\nFrom that came a brand identity that feels raw, loud and intentional. We paired neon green with deep black to create contrast and clarity, using the all-caps IMPACT font to make every word feel urgent and alive. It's not soft. It's not polite. It's coffee for people who start things.\n\nFrom the visual language to the tone of voice, we stripped away the fluff and leaned into a confident, stripped-back look that celebrates the process - from hand-picked beans to small-batch UAE roasts. We designed everything to feel direct and graphic: custom vector iconography, bold line work and product photography that feels as sharp as the caffeine hit it represents. Genesis isn't just a coffee brand - it's a statement. One that says: start strong or don't start at all.", img: "/projects/genesis/genesis-coffeecup.jpg", images: ["/projects/genesis/genesis-coffeecup.jpg", "/projects/genesis/genesiscoffee-handsof-scaled.png", "/projects/genesis/genesis-stickerroll1.jpg", "/projects/genesis/genesis-coffeebox.jpg", "/projects/genesis/gensesis-beans.jpg", "/projects/genesis/genesis-buckethat.jpg", "/projects/genesis/genesis-coffeebag.jpg"] },
    { name: "Matter Nutrition", sub: "Printed with purpose.", city: "Dubai", year: "2025", cat: "Branding", desc: "We created a full set of branded print collateral for Matter Nutrition designed to match the energy of the gym floor. From bold posters and high-impact flyers to attitude-filled stickers and custom signage, every piece was made to move - just like the people who see them.\n\nThis wasn't just design for the wall - it was design for a community. Whether you're mid-set, sipping a shake, or just vibing in the space, the visuals speak loud and clear: this brand is built to fuel, focus, and flex. Clean, confident, and a little in your face - just how we like it.", img: "/projects/matter/nn-matter3.jpg", images: ["/projects/matter/nn-matter3.jpg", "/projects/matter/nn-matter2.jpg", "/projects/matter/nn-matter1.jpg", "/projects/matter/nn-matter4.jpg"] },
    { name: "Lucky's", sub: "A local legend, back on the road.", city: "Sydney", year: "2026", cat: "Branding", desc: "Some places don't need a reintroduction. They just need a second life.\n\nFor over 25 years, Padstow Seafoods was part of the neighbourhood routine. Families lining up on weekends, kids growing up on the same order, and Lucky behind the counter doing what he did best, simple, honest fish and chips done right.\n\nWhen the shop closed, the food stopped, but the memory didn't. Lucky's is our way of bringing that feeling back, not as a replica, but as a revival. A mobile fish and chip truck built on nostalgia, personality, and a stripped-back menu that focuses on what made it special in the first place.\n\nWe worked on the full brand direction from the ground up. Naming, identity, tone of voice, and visual system. The goal was to keep it bold, familiar, and instantly recognisable, while giving it the energy of something new. From logo and colour palette to truck signage, packaging and uniforms, every touchpoint was designed to feel fun, confident and a little bit loud, just like the queues Lucky used to have. This isn't just a food truck. It's a comeback. And some comebacks just make sense.", img: "/projects/luckys/luckys-1.png", images: ["/projects/luckys/luckys-1.png", "/projects/luckys/luckys-tabox-scaled.jpg", "/projects/luckys/luckys-truck-scaled.jpg", "/projects/luckys/luckys-tartaresauce.jpg", "/projects/luckys/luckys-shirt.jpg", "/projects/luckys/luckys-aframe.jpg", "/projects/luckys/luckys-2.png", "/projects/luckys/luckys-3.png", "/projects/luckys/luckys-tote.jpg"] },
    { name: "Tony's Woodfire", sub: "Not just a slice. A stance.", city: "Sydney", year: "2026", cat: "Branding", desc: "We created a full world of branded collateral for Tony's designed to match the heat of the oven and the buzz of a Friday night rush. From the logo to punchy menus and box designs, stickers and custom signage, every piece was built to feel bold, familiar and unmistakably Tony's. This wasn't just design for the walls - it was design for the neighbourhood. Whether you're grabbing a quick slice, waiting by the curb or opening a box at home, the brand shows up strong. Loud without shouting. Classic without feeling dated. Confident, nostalgic and just the right amount of attitude - exactly how a proper pizza joint should feel.", img: "/projects/tonys/tonys-pizzabox.png", images: ["/projects/tonys/tonys-pizzabox.png", "/projects/tonys/tonys-stools.png", "/projects/tonys/tonys-paper.jpg", "/projects/tonys/tonys-menu.png", "/projects/tonys/tonys-pizzachef.png", "/projects/tonys/tonys-lightbox.png"] },
    { name: "Yava", sub: "The soul behind the food.", city: "Dubai", year: "2024", cat: "Content", desc: "With Yava, the goal wasn't just to show the food - it was to show the soul behind it. We captured moments of the owner in their element - pouring coffee, plating dishes, sharing stories - to humanize the brand and deepen its emotional connection with guests. Every shot was designed to feel lived-in, intimate, and real.\n\nPR efforts were focused on positioning Yava not just as a restaurant, but as a cultural experience. We curated the narrative to showcase the founder's personal journey, bringing media attention to the people behind the food. From interviews to lifestyle features, we helped Yava step confidently into the public eye.\n\nBecause hospitality is personal - and when you share the face behind the flavour, it resonates. At Not Normal, we don't just elevate brands. We introduce stories worth remembering. Yava was one of them.", img: "/projects/yava/yava-1.jpg", images: ["/projects/yava/yava-1.jpg", "/projects/yava/yava-2.jpg", "/projects/yava/yava-3.jpg", "/projects/yava/yava-5.jpg", "/projects/yava/yava-4.jpg"] },
  ],

  brands: {
    eyebrow: "Friends we've worked with",
    heading: "Brands we've shaped.",
    logos: [
      "/nn-kinoya.png", "/nn-piehaus.png", "/nn-maisan15.png", "/nn-mimi.png", "/nn-xu.png",
      "/nn-shanghaimelogo.png", "/nn-genesis.png", "/nn-tontonlogo.png", "/nn-sirenelogo.png",
      "/nn-atlantislogo.png", "/nn-bymoudzlogo.png", "/nn-chezwamogo.png", "/nn-diantilogo.png",
      "/nn-evergreenlogo.png", "/nn-ftflogo.png", "/nn-matterlogo.png", "/nn-yavalogo.png",
    ],
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
    { l: "The Menu", href: "/menu", tip: "What we do", shape: "rounded-none" },
    { l: "Projects", href: "/projects", tip: "Selected proof", shape: "rounded-tl-xl rounded-br-xl" },
    { l: "About", href: "/about", tip: "Who we are", shape: "rounded-full" },
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
