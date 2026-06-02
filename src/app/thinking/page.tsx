"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const cats = ["All", "Hospitality", "Marketing", "Branding", "Guest Experience", "Leadership", "Food Culture"];

const articles = [
  { slug: "best-restaurants-dont-market", cat: "Hospitality", title: "Why the best restaurants don't market — they perform.", date: "May 2025", read: "5 min", excerpt: "The most talked-about venues in Sydney don't run ads. They build rituals." },
  { slug: "logo-vs-brand", cat: "Branding", title: "The difference between a logo and a brand is 10,000 experiences.", date: "Apr 2025", read: "4 min", excerpt: "Your brand isn't what you design. It's what people feel when no one is watching." },
  { slug: "guests-remember-feeling", cat: "Guest Experience", title: "Your guests remember how you made them feel, not what they ate.", date: "Mar 2025", read: "6 min", excerpt: "Daniel Kahneman's peak-end rule applies to every restaurant in the world." },
  { slug: "menu-design-psychology", cat: "Food Culture", title: "Menu design is the most underused tool in hospitality.", date: "Feb 2025", read: "7 min", excerpt: "A menu is a sales document, a story, and a piece of brand communication all at once." },
  { slug: "social-media-hospitality", cat: "Marketing", title: "Stop posting food photography. Start building a world.", date: "Jan 2025", read: "5 min", excerpt: "The restaurants winning on social aren't sharing food. They're sharing a life." },
  { slug: "hiring-culture", cat: "Leadership", title: "You can't teach hospitality — you can only hire for it.", date: "Dec 2024", read: "4 min", excerpt: "Skills are trainable. The instinct to make someone feel welcome is not." },
];

function ArticleCard({ a, i }: { a: typeof articles[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
    >
      <Link href={`/thinking/${a.slug}`} className="group block border-b border-[#E8E2D4]/10 pb-10 mb-10 hover:border-[#D4FF38]/20 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[9px] tracking-widest uppercase text-[#D4FF38]">{a.cat}</span>
          <span className="text-[9px] text-[#E8E2D4]/20">{a.date}</span>
          <span className="text-[9px] text-[#E8E2D4]/20">{a.read} read</span>
        </div>
        <h2 className="font-display text-2xl md:text-4xl text-[#E8E2D4]/80 group-hover:text-[#E8E2D4] transition-colors leading-tight mb-4">
          {a.title.toUpperCase()}
        </h2>
        <p className="text-[#E8E2D4]/40 text-sm leading-relaxed max-w-xl font-light">{a.excerpt}</p>
        <span className="inline-block mt-5 text-[9px] tracking-widest uppercase text-[#D4FF38] opacity-0 group-hover:opacity-100 transition-opacity">
          Read Article →
        </span>
      </Link>
    </motion.div>
  );
}

export default function Thinking() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? articles : articles.filter((a) => a.cat === cat);

  return (
    <div className="px-6 md:px-10 pt-32 pb-24">
      <div className="mb-16">
        <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 mb-6">Thinking</p>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="font-display text-[#E8E2D4] leading-none"
            style={{ fontSize: "clamp(4rem,12vw,10rem)" }}
          >
            JOURNAL
          </motion.h1>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-14 border-b border-[#E8E2D4]/10 pb-6">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`text-[9px] tracking-widest uppercase px-3 py-1.5 border transition-colors ${
              cat === c
                ? "border-[#D4FF38] text-[#D4FF38]"
                : "border-[#E8E2D4]/10 text-[#E8E2D4]/30 hover:text-[#E8E2D4] hover:border-[#E8E2D4]/30"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div>
        {filtered.map((a, i) => (
          <ArticleCard key={a.slug} a={a} i={i} />
        ))}
      </div>
    </div>
  );
}
