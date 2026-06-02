"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/* ─── DATA ─── */
const works = [
  { name: "3Fils", type: "Brand Identity · Dubai", color: "#1a1f2e" },
  { name: "Revolver", type: "Brand Strategy · Sydney", color: "#1f1a1a" },
  { name: "Maison Dali", type: "Full Brand · Beirut", color: "#1a1f1a" },
  { name: "PieHaus", type: "Identity & Social · Sydney", color: "#1f1d1a" },
  { name: "Tony's Woodfire", type: "Identity & Experience · Sydney", color: "#1a1a1f" },
  { name: "Yava", type: "Brand & Content · Sydney", color: "#1f1a1f" },
  { name: "Bar Baker", type: "Concept & Identity · Sydney", color: "#1f1f1a" },
  { name: "Oakberry", type: "Visual Direction · Sydney", color: "#1a1f1f" },
];

const services = [
  "Branding & Identity",
  "Content & Storytelling",
  "Guest Experience & Innovation",
  "Digital Experiences",
  "Hospitality Consulting",
];

const journal = [
  { cat: "Hospitality", title: "Why the best restaurants don't market — they perform.", date: "May 2025" },
  { cat: "Branding", title: "The difference between a logo and a brand is 10,000 experiences.", date: "Apr 2025" },
  { cat: "Guest Experience", title: "Your guests remember how you made them feel, not what they ate.", date: "Mar 2025" },
];

const manifestoLines = [
  "People Remember People.",
  "Hospitality Starts Before Hello.",
  "The Menu Isn't The Product.",
];

/* ─── WORD REVEAL ─── */
function WordReveal({ text, className, delay = 0, style }: { text: string; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="clip-wrap">
      <motion.div
        initial={{ y: "105%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay }}
        className={className}
        style={style}
      >
        {text}
      </motion.div>
    </div>
  );
}

/* ─── FADE IN ─── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── WORK ITEM ─── */
function WorkItem({ name, type, color, index }: { name: string; type: string; color: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="relative"
    >
      <Link
        href={`/work/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        className="group flex items-center justify-between py-5 md:py-6 border-b border-[#E8E2D4]/10 hover:border-[#D4FF38]/30 transition-colors"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-baseline gap-6">
          <span className="text-[10px] tracking-widest text-[#E8E2D4]/20 w-6">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-display text-4xl md:text-6xl text-[#E8E2D4] group-hover:text-[#D4FF38] transition-colors leading-none">
            {name}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-xs tracking-widest uppercase text-[#E8E2D4]/30 hidden md:block">{type}</span>
          <motion.span
            animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-[#D4FF38] text-sm"
          >
            →
          </motion.span>
        </div>
      </Link>

      {/* Hover image preview */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute right-24 top-1/2 -translate-y-1/2 w-40 h-28 md:w-56 md:h-36 pointer-events-none z-10 overflow-hidden hidden md:block"
            style={{ background: color }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="text-[9px] tracking-widest uppercase text-white/40">{type.split(" · ")[0]}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── CITY ─── */
function City({ name, index }: { name: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  const colors = [
    "linear-gradient(135deg, #1a3a5c 0%, #0a1a2e 100%)",
    "linear-gradient(135deg, #5c3a1a 0%, #2e1a0a 100%)",
    "linear-gradient(135deg, #5c1a3a 0%, #2e0a1a 100%)",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="relative cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="clip-wrap">
        <motion.div
          animate={{ color: hovered ? "#D4FF38" : "#E8E2D4" }}
          transition={{ duration: 0.3 }}
          className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none"
        >
          {name}
        </motion.div>
      </div>
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="h-px bg-[#D4FF38] origin-left mt-2"
      />
      <motion.div
        animate={{ width: hovered ? 6 : 4, height: hovered ? 6 : 4, background: hovered ? "#D4FF38" : "#555" }}
        className="rounded-full mt-3 transition-colors"
      />
    </motion.div>
  );
}

/* ─── HERO ─── */
function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.02);
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.02);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  const words = ["NOBODY", "REMEMBERS", "NORMAL."];

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-20 px-6 md:px-10 overflow-hidden">
      {/* Ambient BG */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, #D4FF38 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-8"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 70% 60%, #ffffff 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Section indicator */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2 items-center">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="flex flex-col items-center gap-1">
            <span className="text-[8px] tracking-widest text-[#E8E2D4]/20">0{n}</span>
            {n < 6 && <div className="w-px h-8 bg-[#E8E2D4]/10" />}
            {n === 1 && <div className="w-1.5 h-1.5 rounded-full bg-[#D4FF38] -mt-9 -ml-px" />}
          </div>
        ))}
      </div>

      {/* Main text */}
      <div className="relative z-10 max-w-[95vw]">
        {words.map((word, i) => (
          <div key={word} className="clip-wrap">
            <motion.div
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 + i * 0.12 }}
              className={`font-display leading-[0.88] ${
                word === "NORMAL."
                  ? "text-[#D4FF38]"
                  : "text-[#E8E2D4]"
              }`}
              style={{ fontSize: "clamp(4.5rem, 16vw, 14rem)" }}
            >
              {word}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Sub row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 flex items-end justify-between mt-10"
      >
        <p className="text-sm text-[#E8E2D4]/50 max-w-xs leading-relaxed">
          A hospitality brand advisory for those that refuse to blend in.
        </p>
        <div className="flex flex-col items-center gap-2 text-[10px] tracking-widest uppercase text-[#E8E2D4]/30">
          <span>Scroll to begin</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-8 bg-[#E8E2D4]/20"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ─── HOME PAGE ─── */
export default function Home() {
  const [manifestoIdx, setManifestoIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setManifestoIdx((i) => (i + 1) % manifestoLines.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ── 01 HERO ── */}
      <Hero />

      {/* ── 02 WE BUILD REASONS TO CARE ── */}
      <section className="px-6 md:px-10 py-28 md:py-40 border-t border-[#E8E2D4]/10">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="md:w-1/2">
            <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 mb-8">02 / What We Do</p>
            <WordReveal
              text="WE BUILD"
              className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-[#E8E2D4]"
            />
            <WordReveal
              text="REASONS"
              className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-[#E8E2D4]"
              delay={0.1}
            />
            <WordReveal
              text="TO CARE."
              className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-[#D4FF38]"
              delay={0.2}
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-end">
            <FadeIn delay={0.3}>
              <p className="text-[#E8E2D4]/50 text-sm leading-relaxed mb-10 max-w-sm">
                Brands. Experiences. Campaigns. The details that make people remember.
              </p>
              <ul className="space-y-0">
                {services.map((s, i) => (
                  <li key={s}>
                    <Link
                      href="/services"
                      className="flex items-center justify-between py-4 border-b border-[#E8E2D4]/10 group hover:border-[#D4FF38]/20 transition-colors"
                    >
                      <span className="text-sm text-[#E8E2D4]/60 group-hover:text-[#E8E2D4] transition-colors tracking-wide">
                        {s}
                      </span>
                      <span className="text-[#D4FF38] opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 03 WORK REEL ── */}
      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden border-t border-[#E8E2D4]/10">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #0f1419 0%, #0a0a0a 40%, #1a1209 100%)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 md:px-10 pb-10">
          <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 mb-4">03 / Our Work</p>
          <Link
            href="/work"
            className="group flex items-center gap-4 hover:gap-6 transition-all duration-300"
          >
            <span className="font-display text-xl md:text-2xl text-[#E8E2D4] group-hover:text-[#D4FF38] tracking-widest transition-colors">
              EXPLORE OUR WORK
            </span>
            <div className="w-9 h-9 rounded-full border border-[#E8E2D4]/30 group-hover:border-[#D4FF38] flex items-center justify-center transition-colors">
              <span className="text-[#E8E2D4] group-hover:text-[#D4FF38] transition-colors">→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── 04 SELECTED WORK ── */}
      <section className="px-6 md:px-10 py-16 border-t border-[#E8E2D4]/10">
        <div className="flex items-end justify-between mb-4">
          <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30">04 / Selected Work</p>
          <Link href="/work" className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 hover:text-[#D4FF38] transition-colors">
            View All →
          </Link>
        </div>
        <div className="relative">
          {works.map((w, i) => (
            <WorkItem key={w.name} {...w} index={i} />
          ))}
        </div>
      </section>

      {/* ── 05 THREE CITIES ── */}
      <section className="px-6 md:px-10 py-24 md:py-36 border-t border-[#E8E2D4]/10">
        <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 mb-12">05 / Three Cities. One Standard.</p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-end">
          {["SYDNEY", "DUBAI", "BEIRUT"].map((city, i) => (
            <City key={city} name={city} index={i} />
          ))}
        </div>
      </section>

      {/* ── 06 JOURNAL PREVIEW ── */}
      <section className="px-6 md:px-10 py-24 border-t border-[#E8E2D4]/10">
        <div className="flex items-end justify-between mb-12">
          <FadeIn>
            <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 mb-2">Journal</p>
            <h2 className="font-display text-4xl md:text-6xl text-[#E8E2D4]">THINKING</h2>
          </FadeIn>
          <Link href="/thinking" className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 hover:text-[#D4FF38] transition-colors hidden md:block">
            All Articles →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E8E2D4]/10">
          {journal.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.1}>
              <Link href="/thinking" className="group block bg-[#080808] p-8 hover:bg-[#141414] transition-colors h-full">
                <p className="text-[9px] tracking-widest uppercase text-[#D4FF38] mb-4">{a.cat}</p>
                <h3 className="text-[#E8E2D4]/80 group-hover:text-[#E8E2D4] text-base leading-snug transition-colors mb-6 font-light">
                  {a.title}
                </h3>
                <p className="text-[10px] tracking-widest text-[#E8E2D4]/20">{a.date}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── MANIFESTO PREVIEW ── */}
      <section className="px-6 md:px-10 py-24 border-t border-[#E8E2D4]/10 overflow-hidden">
        <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 mb-12">Manifesto</p>
        <div className="relative h-32 md:h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={manifestoIdx}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex items-center"
            >
              <Link href="/manifesto">
                <h2
                  className="font-display text-[#E8E2D4]/30 hover:text-[#E8E2D4] transition-colors leading-none cursor-pointer"
                  style={{ fontSize: "clamp(2.5rem,7vw,6rem)" }}
                >
                  {manifestoLines[manifestoIdx]}
                </h2>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── 06 FULL SCREEN FOOTER ── */}
      <footer className="relative min-h-screen flex flex-col justify-between px-6 md:px-10 pt-24 pb-10 border-t border-[#E8E2D4]/10 overflow-hidden">
        {/* Ambient */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{ background: "radial-gradient(ellipse 70% 50% at 30% 70%, #D4FF38 0%, transparent 60%)" }}
        />

        <div className="relative z-10">
          <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 mb-16">06 / Let&apos;s Build</p>
          {["TO BE", "NOT NORMAL", "IS TO BE"].map((line, i) => (
            <div key={line} className="clip-wrap">
              <WordReveal
                text={line}
                className="font-display leading-[0.9] text-[#E8E2D4]"
                style={{ fontSize: "clamp(3rem,10vw,9rem)" }}
                delay={i * 0.1}
              />
            </div>
          ))}
          <WordReveal
            text="HOSPITABLE."
            className="font-display leading-[0.9] text-[#D4FF38]"
            style={{ fontSize: "clamp(3rem,10vw,9rem)" }}
            delay={0.3}
          />
        </div>

        <div className="relative z-10 mt-16">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
              <div>
                <p className="text-[#E8E2D4]/50 text-sm mb-6 max-w-xs leading-relaxed">
                  Let&apos;s build something worth remembering.
                </p>
                <a
                  href="https://calendly.com/notnormal/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 border border-[#D4FF38] px-8 py-4 hover:bg-[#D4FF38] transition-colors"
                >
                  <span className="text-[10px] tracking-widest uppercase text-[#D4FF38] group-hover:text-[#080808] transition-colors">
                    Start a Project
                  </span>
                  <span className="text-[#D4FF38] group-hover:text-[#080808] transition-colors">→</span>
                </a>
              </div>
              <div className="flex flex-col gap-2 text-right">
                {["SYDNEY", "DUBAI", "BEIRUT"].map((c) => (
                  <span key={c} className="font-display text-2xl text-[#E8E2D4]/20 hover:text-[#E8E2D4] transition-colors cursor-pointer">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
          <div className="mt-16 pt-6 border-t border-[#E8E2D4]/10 flex items-center justify-between">
            <span className="text-[9px] tracking-widest uppercase text-[#E8E2D4]/20">© Not Normal · All Rights Reserved</span>
            <div className="flex gap-6">
              {["Instagram", "LinkedIn", "Journal"].map((l) => (
                <Link key={l} href="#" className="text-[9px] tracking-widest uppercase text-[#E8E2D4]/20 hover:text-[#E8E2D4]/60 transition-colors">
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
