"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const team = [
  { name: "Alex Chen", role: "Creative Director", city: "Sydney", color: "#1a1f2e" },
  { name: "Jordan Mills", role: "Art Director", city: "Dubai", color: "#1f1a1a" },
  { name: "Sam Rivera", role: "Strategy Lead", city: "Sydney", color: "#1a1f1a" },
  { name: "Mia Park", role: "Brand Strategist", city: "Beirut", color: "#1f1d1a" },
  { name: "Kai Osei", role: "Content Director", city: "Sydney", color: "#1a1a1f" },
  { name: "Lee Vance", role: "Digital Lead", city: "Dubai", color: "#1a2e1a" },
];

const beliefs = [
  { n: "01", text: "Hospitality is the world's most human industry. We treat it that way." },
  { n: "02", text: "Strategy without soul is just a document. We build both." },
  { n: "03", text: "The best brands are specific. Specific is brave." },
  { n: "04", text: "We'd rather say no to the wrong client than yes to the wrong work." },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="pt-32 pb-24">
      {/* Intro */}
      <div className="px-6 md:px-10 mb-24">
        <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 mb-6">About</p>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="font-display text-[#E8E2D4] leading-none"
            style={{ fontSize: "clamp(4rem,12vw,10rem)" }}
          >
            WHO WE ARE
          </motion.h1>
        </div>
      </div>

      {/* Statement */}
      <div className="px-6 md:px-10 mb-24 border-t border-[#E8E2D4]/10 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <FadeIn>
            <p className="text-[#E8E2D4]/70 text-xl md:text-2xl font-light leading-relaxed">
              Not Normal is a hospitality brand advisory for venues that want to be talked about, not just visited.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-[#E8E2D4]/40 leading-relaxed text-sm font-light">
              <p>We work exclusively in hospitality — restaurants, bars, cafes, hotels. That focus means we understand the margins, the floor, the regulars, and what actually drives bookings.</p>
              <p>We&apos;re not a template agency. We don&apos;t use the same strategy twice. Every venue is different, every market is different, and every solution should be too.</p>
              <p>Sydney is home. Dubai and Beirut are where we&apos;ve built some of our most interesting work. We operate across all three with the same standard.</p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* What We Believe */}
      <div className="px-6 md:px-10 mb-24 border-t border-[#E8E2D4]/10 pt-16">
        <FadeIn>
          <h2 className="font-display text-4xl md:text-6xl text-[#E8E2D4] mb-12">WHAT WE BELIEVE</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E2D4]/10">
          {beliefs.map((b) => (
            <FadeIn key={b.n}>
              <div className="bg-[#080808] p-8">
                <span className="font-display text-[#D4FF38] text-sm mb-5 block">{b.n}</span>
                <p className="text-[#E8E2D4]/60 text-lg font-light leading-relaxed">{b.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="px-6 md:px-10 mb-24 border-t border-[#E8E2D4]/10 pt-16">
        <FadeIn>
          <h2 className="font-display text-4xl md:text-6xl text-[#E8E2D4] mb-12">THE TEAM</h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <FadeIn key={m.name} delay={i * 0.07}>
              <div>
                <div className="aspect-square mb-4" style={{ background: m.color }} />
                <h4 className="font-medium text-[#E8E2D4] text-sm">{m.name}</h4>
                <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 mt-1">{m.role} · {m.city}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Cities */}
      <div className="px-6 md:px-10 border-t border-[#E8E2D4]/10 pt-16">
        <h2 className="font-display text-4xl md:text-6xl text-[#E8E2D4] mb-8">THREE CITIES.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E8E2D4]/10">
          {[
            { city: "Sydney", desc: "Headquarters. The city that raised our standards." },
            { city: "Dubai", desc: "An established market. The world's most competitive hospitality scene." },
            { city: "Beirut", desc: "One of the world's great food cities. Always." },
          ].map((c) => (
            <div key={c.city} className="bg-[#080808] p-8">
              <h3 className="font-display text-4xl text-[#E8E2D4] mb-3">{c.city.toUpperCase()}</h3>
              <p className="text-[#E8E2D4]/40 text-sm font-light leading-relaxed">{c.desc}</p>
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4FF38] mt-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
