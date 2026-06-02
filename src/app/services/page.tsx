"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const services = [
  {
    n: "01",
    title: "Branding & Identity",
    lines: ["Mission & values definition", "Visual identity — logo, colour, type", "Verbal identity — voice, naming, taglines", "Brand guidelines & systems"],
    desc: "Your brand is a promise made before the guest arrives and kept long after they leave. We build the systems that make that promise consistent, compelling and impossible to ignore.",
  },
  {
    n: "02",
    title: "Content & Storytelling",
    lines: ["Content strategy & direction", "Photo & video production", "Social media management", "Campaign concept & execution"],
    desc: "The restaurants people talk about have a story. We find yours, shape it, and push it into every piece of content your audience will ever see.",
  },
  {
    n: "03",
    title: "Guest Experience & Innovation",
    lines: ["Guest journey mapping", "Menu R&D & concept development", "Staff training & culture", "Touchpoint design"],
    desc: "The brand doesn't stop at the door. From the first DM to the final bill, every moment is designed to make your guest feel like they chose right.",
  },
  {
    n: "04",
    title: "Digital & Web",
    lines: ["Website design & development", "Booking experience", "Digital asset creation", "Google & SEO foundations"],
    desc: "Your digital presence is your first impression. We build websites that convert curiosity into bookings and bookings into regulars.",
  },
  {
    n: "05",
    title: "Hospitality Consulting",
    lines: ["Concept development", "Pre-opening strategy", "Brand audits", "Growth advisory"],
    desc: "For those building something from scratch or rebuilding something that lost its edge. We've sat inside enough great venues to know what separates the ones that last.",
  },
];

function ServiceBlock({ s, i }: { s: typeof services[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 border-b border-[#E8E2D4]/10"
    >
      <div className="md:col-span-1">
        <span className="font-display text-sm text-[#D4FF38]">{s.n}</span>
      </div>
      <div className="md:col-span-4">
        <h2 className="font-display text-3xl md:text-5xl text-[#E8E2D4] leading-none mb-6">{s.title.toUpperCase()}</h2>
        <ul className="space-y-2">
          {s.lines.map((l) => (
            <li key={l} className="flex items-center gap-3 text-[10px] tracking-widest uppercase text-[#E8E2D4]/30">
              <span className="w-1 h-px bg-[#D4FF38]" />
              {l}
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-7 flex items-center">
        <p className="text-[#E8E2D4]/50 text-lg leading-relaxed font-light">{s.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="px-6 md:px-10 pt-32 pb-24">
      <div className="mb-16">
        <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 mb-6">What We Do</p>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="font-display text-[#E8E2D4] leading-none"
            style={{ fontSize: "clamp(4rem,12vw,10rem)" }}
          >
            SERVICES
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 text-[#E8E2D4]/40 text-lg font-light max-w-xl leading-relaxed"
        >
          From branding to storytelling to stuff you can hold — we cover every touchpoint that shapes how guests feel about your venue.
        </motion.p>
      </div>

      {services.map((s, i) => <ServiceBlock key={s.n} s={s} i={i} />)}

      <div className="pt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <p className="font-display text-3xl md:text-5xl text-[#E8E2D4]/60 leading-tight max-w-sm">
          NOT SURE WHAT<br />YOU NEED?
        </p>
        <a
          href="https://calendly.com/notnormal/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 border border-[#D4FF38] px-8 py-4 hover:bg-[#D4FF38] transition-colors"
        >
          <span className="text-[10px] tracking-widest uppercase text-[#D4FF38] group-hover:text-[#080808] transition-colors">
            Book a Free Call
          </span>
          <span className="text-[#D4FF38] group-hover:text-[#080808] transition-colors">→</span>
        </a>
      </div>
    </div>
  );
}
