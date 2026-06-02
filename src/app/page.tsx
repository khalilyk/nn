"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ─── NAV ITEMS ─── */
const navItems = [
  { n: "01", label: "HOME", id: "home" },
  { n: "02", label: "WORK", id: "work" },
  { n: "03", label: "CITIES", id: "cities" },
  { n: "04", label: "JOURNAL", id: "journal" },
  { n: "05", label: "CONTACT", id: "contact" },
];

/* ─── CONTENT SECTIONS ─── */
const sections = [
  {
    id: "work",
    n: "02",
    lines: ["SELECTED", "WORK"],
    green: [] as number[],
    sub: "Restaurants. Cafes. Hotels. Bars.",
    cta: "VIEW ALL PROJECTS",
    href: "/work",
    bg: "linear-gradient(145deg, #120e08 0%, #1c1508 40%, #0e0a04 80%, #080808 100%)",
    light: "radial-gradient(ellipse 70% 80% at 62% 48%, rgba(70,50,15,0.45) 0%, transparent 65%)",
  },
  {
    id: "cities",
    n: "03",
    lines: ["THREE CITIES.", "ONE STANDARD."],
    green: [1],
    sub: "Sydney. Dubai. Beirut.",
    cta: "EXPLORE OUR CITIES",
    href: "/about",
    bg: "linear-gradient(160deg, #080808 0%, #100c04 30%, #201508 60%, #0a0808 100%)",
    light: "radial-gradient(ellipse 90% 60% at 55% 85%, rgba(90,60,10,0.5) 0%, transparent 55%)",
  },
  {
    id: "journal",
    n: "04",
    lines: ["JOURNAL"],
    green: [] as number[],
    sub: "Insights on hospitality, marketing\nand guest experience.",
    cta: "READ ARTICLES",
    href: "/thinking",
    bg: "linear-gradient(135deg, #0c0b08 0%, #161208 50%, #080808 100%)",
    light: "radial-gradient(ellipse 60% 70% at 42% 42%, rgba(55,42,12,0.4) 0%, transparent 60%)",
  },
  {
    id: "contact",
    n: "05",
    lines: ["LET'S BUILD", "SOMETHING WORTH", "REMEMBERING."],
    green: [] as number[],
    sub: "",
    cta: "START A PROJECT",
    href: "/contact",
    bg: "linear-gradient(140deg, #0e0905 0%, #180e06 40%, #0a0808 100%)",
    light: "radial-gradient(ellipse 75% 65% at 58% 55%, rgba(65,38,10,0.4) 0%, transparent 60%)",
  },
];

/* ─── CTA BUTTON ─── */
function Cta({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 group mt-5">
      <span className="text-[9px] tracking-[0.22em] uppercase text-[#D4FF38]">
        {label}
      </span>
      <div className="w-6 h-6 rounded-full border border-[#D4FF38] flex items-center justify-center text-[#D4FF38] text-[10px] group-hover:bg-[#D4FF38] group-hover:text-[#080808] transition-colors">
        →
      </div>
    </Link>
  );
}

/* ─── PHOTO PANEL ─── */
function Photo({
  bg,
  light,
  counter,
  showArrow = true,
}: {
  bg: string;
  light?: string;
  counter: string;
  showArrow?: boolean;
}) {
  return (
    <div className="relative h-full overflow-hidden flex-1" style={{ background: bg }}>
      {light && <div className="absolute inset-0" style={{ background: light }} />}
      {/* Left edge fade */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#080808]/70 to-transparent" />
      {/* Counter */}
      <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 select-none">
        <span
          className="font-display text-[#E8E2D4]/12 leading-none"
          style={{ fontSize: "clamp(4rem, 9vw, 7.5rem)" }}
        >
          {counter}
        </span>
        {showArrow && <span className="text-[#D4FF38] text-base">→</span>}
      </div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.45 }
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
        <div className="flex flex-col w-[38%] md:w-[32%] border-r border-[#E8E2D4]/8 shrink-0">

          {/* Section nav */}
          <div className="border-b border-[#E8E2D4]/8 px-4 md:px-6 py-5 flex flex-col gap-[10px]">
            {navItems.map(({ n, label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`flex items-center gap-2 transition-colors ${
                  active === id ? "text-[#D4FF38]" : "text-[#E8E2D4]/22 hover:text-[#E8E2D4]/60"
                }`}
              >
                <span className="text-[8px] tracking-widest">{n}</span>
                <span className="text-[8px] tracking-[0.2em] uppercase">{label}</span>
              </a>
            ))}
          </div>

          {/* Hero copy */}
          <div className="flex-1 flex flex-col justify-between px-4 md:px-6 py-7">
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
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.12 }}
                    className={`font-display ${g ? "text-[#D4FF38]" : "text-[#E8E2D4]"}`}
                    style={{ fontSize: "clamp(2.6rem, 6.5vw, 6rem)" }}
                  >
                    {t}
                  </motion.div>
                </div>
              ))}

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
                className="text-[#E8E2D4]/40 text-[11px] leading-relaxed mt-5 max-w-[200px]"
              >
                We build hospitality brands, guest experiences and marketing that people remember.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-1.5 text-[#E8E2D4]/25"
            >
              <span className="text-[9px] tracking-[0.2em] uppercase">↓ Scroll to Begin</span>
            </motion.div>
          </div>
        </div>

        {/* Right photo */}
        <Photo
          bg="linear-gradient(145deg, #141008 0%, #221808 25%, #1a1208 55%, #0c0808 100%)"
          light="radial-gradient(ellipse 80% 70% at 58% 38%, rgba(75,52,18,0.5) 0%, transparent 60%)"
          counter="01 / 05"
          showArrow={false}
        />
      </section>

      {/* ── SECTIONS 02–05 ── */}
      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="flex border-b border-[#E8E2D4]/8"
          style={{ minHeight: "clamp(220px, 38vh, 340px)" }}
        >
          {/* Left content */}
          <div className="w-[38%] md:w-[32%] shrink-0 flex flex-col justify-center px-4 md:px-6 py-7 border-r border-[#E8E2D4]/8">
            <span className="text-[8px] tracking-widest text-[#E8E2D4]/18 mb-3 block">{s.n}</span>

            {s.lines.map((line, i) => (
              <div key={i} className="overflow-hidden" style={{ lineHeight: 0.9 }}>
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                  className={`font-display ${s.green.includes(i) ? "text-[#D4FF38]" : "text-[#E8E2D4]"}`}
                  style={{ fontSize: "clamp(1.6rem, 4.2vw, 3.8rem)" }}
                >
                  {line}
                </motion.div>
              </div>
            ))}

            {s.sub && (
              <p className="text-[10px] text-[#E8E2D4]/35 mt-3 leading-relaxed max-w-[190px]">
                {s.sub}
              </p>
            )}

            <Cta href={s.href} label={s.cta} />
          </div>

          {/* Right photo */}
          <Photo bg={s.bg} light={s.light} counter={s.n} />
        </section>
      ))}
    </div>
  );
}
