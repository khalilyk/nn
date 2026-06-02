"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { n: "01", label: "HOME", id: "home" },
  { n: "02", label: "WORK", id: "work" },
  { n: "03", label: "CITIES", id: "cities" },
  { n: "04", label: "JOURNAL", id: "journal" },
  { n: "05", label: "CONTACT", id: "contact" },
];

const sections = [
  {
    id: "work",
    n: "02",
    lines: ["SELECTED", "WORK"],
    green: [] as number[],
    sub: "Restaurants. Cafes. Hotels. Bars.",
    cta: "VIEW ALL PROJECTS",
    href: "/work",
    photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
    photoPos: "center center",
  },
  {
    id: "cities",
    n: "03",
    lines: ["THREE CITIES.", "ONE STANDARD."],
    green: [1],
    sub: "Sydney. Dubai. Beirut.",
    cta: "EXPLORE OUR CITIES",
    href: "/about",
    photo: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80",
    photoPos: "center 60%",
  },
  {
    id: "journal",
    n: "04",
    lines: ["JOURNAL"],
    green: [] as number[],
    sub: "Insights on hospitality, marketing\nand guest experience.",
    cta: "READ ARTICLES",
    href: "/thinking",
    photo: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1400&q=80",
    photoPos: "center center",
  },
  {
    id: "contact",
    n: "05",
    lines: ["LET'S BUILD", "SOMETHING WORTH", "REMEMBERING."],
    green: [] as number[],
    sub: "",
    cta: "START A PROJECT",
    href: "/contact",
    photo: "https://images.unsplash.com/photo-1559329007-40df68a1daab?auto=format&fit=crop&w=1400&q=80",
    photoPos: "center center",
  },
];

function Cta({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 group mt-5">
      <span className="text-[9px] tracking-[0.22em] uppercase text-[#D4FF38]">{label}</span>
      <div className="w-6 h-6 rounded-full border border-[#D4FF38] flex items-center justify-center text-[#D4FF38] text-[10px] group-hover:bg-[#D4FF38] group-hover:text-[#080808] transition-colors shrink-0">
        →
      </div>
    </Link>
  );
}

export default function Home() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4 }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="flex flex-col">

      {/* ── 01 HERO ── */}
      <section
        id="home"
        className="flex border-b border-[#E8E2D4]/8"
        style={{ minHeight: "calc(100vh - 96px)" }}
      >
        {/* Left panel */}
        <div
          className="flex flex-col shrink-0 border-r border-[#E8E2D4]/8"
          style={{ width: "clamp(260px, 38%, 560px)" }}
        >
          {/* Nav */}
          <div className="border-b border-[#E8E2D4]/8 px-6 py-5 flex flex-col gap-2">
            {navItems.map(({ n, label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`flex items-center gap-2.5 py-0.5 transition-colors ${
                  active === id ? "text-[#D4FF38]" : "text-[#E8E2D4]/25 hover:text-[#E8E2D4]/60"
                }`}
              >
                <span className="text-[8px] tracking-widest font-medium">{n}</span>
                <span className="text-[8px] tracking-[0.2em] uppercase">{label}</span>
              </a>
            ))}
          </div>

          {/* Hero copy */}
          <div className="flex-1 flex flex-col justify-between px-6 py-8">
            <div>
              {[
                { t: "NOBODY", g: false },
                { t: "REMEMBERS", g: false },
                { t: "NORMAL.", g: true },
              ].map(({ t, g }, i) => (
                <div key={t} className="overflow-hidden" style={{ lineHeight: 0.88 }}>
                  <motion.div
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.13 }}
                    className={`font-display ${g ? "text-[#D4FF38]" : "text-[#E8E2D4]"}`}
                    style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
                  >
                    {t}
                  </motion.div>
                </div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.7 }}
                className="text-[#E8E2D4]/40 text-[11px] leading-relaxed mt-6 max-w-[200px]"
              >
                We build hospitality brands, guest experiences and marketing that people remember.
              </motion.p>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-[9px] tracking-[0.2em] uppercase text-[#E8E2D4]/25"
            >
              ↓ Scroll to Begin
            </motion.p>
          </div>
        </div>

        {/* Right: hero photo */}
        <div className="flex-1 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80')",
            }}
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-[#080808]/45" />
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#080808] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-[#080808]/30" />
          {/* 01/05 counter */}
          <div className="absolute bottom-6 right-6 text-[9px] tracking-widest text-[#E8E2D4]/30">01 / 05</div>
          {/* Side dots */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {navItems.map(({ id }) => (
              <div key={id} className={`w-1 h-1 rounded-full ${active === id ? "bg-[#D4FF38]" : "bg-[#E8E2D4]/15"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIONS 02–05 ── */}
      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="flex border-b border-[#E8E2D4]/8"
          style={{ minHeight: "clamp(240px, 38vh, 360px)" }}
        >
          {/* Left content */}
          <div
            className="shrink-0 flex flex-col justify-center px-6 py-8 border-r border-[#E8E2D4]/8"
            style={{ width: "clamp(260px, 38%, 560px)" }}
          >
            <span className="text-[8px] tracking-widest text-[#E8E2D4]/20 mb-3">{s.n}</span>
            {s.lines.map((line, i) => (
              <div key={i} className="overflow-hidden" style={{ lineHeight: 0.9 }}>
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                  className={`font-display ${s.green.includes(i) ? "text-[#D4FF38]" : "text-[#E8E2D4]"}`}
                  style={{ fontSize: "clamp(2rem, 4.8vw, 5rem)" }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
            {s.sub && (
              <p className="text-[10px] text-[#E8E2D4]/35 mt-3 leading-relaxed" style={{ maxWidth: 190 }}>
                {s.sub}
              </p>
            )}
            <Cta href={s.href} label={s.cta} />
          </div>

          {/* Right photo */}
          <div className="flex-1 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover"
              style={{ backgroundImage: `url('${s.photo}')`, backgroundPosition: s.photoPos }}
            />
            <div className="absolute inset-0 bg-[#080808]/50" />
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080808] to-transparent" />
            {/* Large counter + arrow */}
            <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 select-none">
              <span
                className="font-display leading-none text-[#E8E2D4]/15"
                style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
              >
                {s.n}
              </span>
              <span className="text-[#D4FF38] text-lg">→</span>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
