"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const entries = [
  {
    number: "I",
    statement: "Nobody Remembers Normal.",
    body: "The brands people love weren't built by playing it safe. They were built by people who cared too much to settle for acceptable. Normal is forgettable. Normal is the enemy of memorable. And in hospitality, memorable is everything.",
  },
  {
    number: "II",
    statement: "People Remember People.",
    body: "Technology can take an order. Only a person can make a moment. The greatest hospitality brands in the world have never been about the product — they've been about the humans who deliver it. Train your team like they're the brand. Because they are.",
  },
  {
    number: "III",
    statement: "Hospitality Starts Before Hello.",
    body: "By the time your guest sits down, you've already won or lost. The Instagram post that made them book. The confirmation email that made them look forward to it. The signage that made them feel welcome before they opened the door. Every touchpoint is an act of hospitality.",
  },
  {
    number: "IV",
    statement: "The Menu Isn't The Product.",
    body: "The product is the feeling. The menu is the method. The most successful restaurants in the world sell an experience that food happens to be part of. When you understand that, everything changes — how you write your menu, how you train your team, how you design your space.",
  },
  {
    number: "V",
    statement: "Details Aren't Details.",
    body: "Details are the product. The weight of your menu. The temperature of the room. The way your staff say goodbye. The guests who return aren't coming back for the main course — they're coming back because everything felt right. Everything felt considered. Everything felt like you cared.",
  },
];

function Entry({ e, i }: { e: typeof entries[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="py-20 md:py-28 border-b border-[#E8E2D4]/10 grid grid-cols-1 md:grid-cols-12 gap-8"
    >
      <div className="md:col-span-1">
        <span className="font-display text-sm text-[#D4FF38]">{e.number}</span>
      </div>
      <div className="md:col-span-11">
        <h2
          className="font-display text-[#E8E2D4] leading-[0.9] mb-10"
          style={{ fontSize: "clamp(2.5rem,6vw,5.5rem)" }}
        >
          {e.statement.toUpperCase()}
        </h2>
        <p className="text-[#E8E2D4]/50 text-lg leading-relaxed font-light max-w-2xl">{e.body}</p>
      </div>
    </motion.section>
  );
}

export default function Manifesto() {
  return (
    <div className="px-6 md:px-10 pt-32 pb-24">
      <div className="mb-12">
        <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 mb-6">Our Beliefs</p>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="font-display text-[#E8E2D4] leading-none"
            style={{ fontSize: "clamp(4rem,12vw,10rem)" }}
          >
            MANIFESTO
          </motion.h1>
        </div>
      </div>
      {entries.map((e, i) => (
        <Entry key={e.number} e={e} i={i} />
      ))}
    </div>
  );
}
