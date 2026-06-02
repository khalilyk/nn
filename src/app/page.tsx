"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/* ─── HERO ─── */
function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 25, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 25, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.015);
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.015);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  const words = [
    { text: "NOBODY", green: false },
    { text: "REMEMBERS", green: false },
    { text: "NORMAL.", green: true },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Atmospheric BG */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Dark moody radial */}
        <div className="absolute inset-0 bg-[#080808]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 55% 35%, rgba(60,45,20,0.55) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 60%, rgba(30,25,15,0.4) 0%, transparent 60%)",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(8,8,8,0.85) 100%)",
          }}
        />
      </motion.div>

      {/* Section indicators — right edge */}
      <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-0">
        {[1, 2, 3, 4, 5, 6].map((n, i) => (
          <div key={n} className="flex flex-col items-center">
            <span className="text-[8px] text-[#E8E2D4]/25 tracking-widest">{String(n).padStart(2, "0")}</span>
            {n < 6 && (
              <div className="relative w-px h-10 bg-[#E8E2D4]/10 my-0.5">
                {n === 1 && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D4FF38]" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main hero text */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 md:px-8 pt-24 pb-0">
        {words.map(({ text, green }, i) => (
          <div key={text} className="overflow-hidden leading-[0.87]">
            <motion.div
              initial={{ y: "102%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.13 }}
              className={`font-display ${green ? "text-[#D4FF38]" : "text-[#E8E2D4]"}`}
              style={{ fontSize: "clamp(5rem, 21.5vw, 18rem)" }}
            >
              {text}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 flex items-end justify-between px-5 md:px-8 pb-8 pt-6"
      >
        <div />
        <div className="flex flex-col items-end gap-3 text-right max-w-[220px]">
          <p className="text-[11px] text-[#E8E2D4]/45 leading-relaxed">
            A hospitality brand advisory for those that refuse to blend in.
          </p>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#E8E2D4]/30">Scroll to begin</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="text-[#E8E2D4]/30 text-xs"
            >
              ↓
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── SECTION LABEL ─── */
function SLabel({ n, text }: { n: string; text: string }) {
  return (
    <div className="flex items-center gap-3 mb-8 md:mb-12">
      <span className="text-[9px] text-[#E8E2D4]/30 tracking-widest">{n}</span>
      <span className="text-[9px] tracking-[0.2em] uppercase text-[#E8E2D4]/30">{text}</span>
    </div>
  );
}

/* ─── WORD REVEAL ─── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "103%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── FADE ─── */
function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── SELECTED WORK ITEM ─── */
const workNames = ["3Fils", "Revolver", "Maison Dali", "PieHaus", "Tony's"];
const workColors = ["#1a1f2e", "#1f1a1a", "#1a1f1a", "#2e1d1a", "#1a1a1f"];

function WorkName({ name, i, color }: { name: string; i: number; color: string }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      className="overflow-hidden border-b border-[#E8E2D4]/8 group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/work/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        className="flex items-center justify-between py-3"
      >
        <motion.span
          animate={{ color: hovered ? "#D4FF38" : "#E8E2D4" }}
          transition={{ duration: 0.25 }}
          className="font-display leading-none"
          style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)" }}
        >
          {name.toUpperCase()}
        </motion.span>
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.2 }}
          className="text-[#D4FF38] text-base shrink-0 ml-4"
        >
          →
        </motion.span>
      </Link>

      {/* Hover image */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 w-44 h-28 pointer-events-none z-10 hidden md:block"
            style={{ background: color }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── CITY BLOCK ─── */
function CityBlock({ city, index }: { city: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <div ref={ref}>
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: "105%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
          className="font-display text-[#E8E2D4] leading-none"
          style={{ fontSize: "clamp(1.8rem, 7.5vw, 7rem)" }}
        >
          {city}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 + index * 0.1 }}
        className="w-1.5 h-1.5 rounded-full bg-[#D4FF38] mt-3"
      />
    </div>
  );
}

/* ─── HOME ─── */
export default function Home() {
  return (
    <>
      {/* ── 01 HERO ── */}
      <Hero />

      {/* ── 02 WE BUILD REASONS TO CARE ── */}
      <section className="px-5 md:px-8 py-16 md:py-24 border-t border-[#E8E2D4]/8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-end">
          {/* Left */}
          <div>
            <Reveal>
              <div
                className="font-display text-[#E8E2D4] leading-[0.88]"
                style={{ fontSize: "clamp(3.2rem, 11vw, 9rem)" }}
              >
                WE BUILD
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div
                className="font-display text-[#E8E2D4] leading-[0.88]"
                style={{ fontSize: "clamp(3.2rem, 11vw, 9rem)" }}
              >
                REASONS
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div
                className="font-display leading-[0.88]"
                style={{ fontSize: "clamp(3.2rem, 11vw, 9rem)", color: "#E8E2D4" }}
              >
                TO{" "}
                <span className="text-[#D4FF38]">CARE.</span>
              </div>
            </Reveal>
          </div>

          {/* Right */}
          <Fade delay={0.2} className="flex flex-col justify-end pb-1">
            <p className="text-[#E8E2D4]/40 text-sm leading-loose font-light">
              Brands.<br />
              Experiences.<br />
              Campaigns.<br />
              The details<br />
              that make people<br />
              remember.
            </p>
          </Fade>
        </div>
      </section>

      {/* ── 03 OUR WORK (image strip) ── */}
      <section className="relative h-[42vh] md:h-[55vh] overflow-hidden border-t border-[#E8E2D4]/8">
        {/* Atmospheric dark image */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0e1117 0%, #14110a 30%, #1a1408 60%, #0a0a0a 100%)",
          }}
        />
        {/* Simulate moody lighting */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 80% at 45% 55%, rgba(90,65,20,0.35) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-[#080808]/40" />

        {/* Label top-left */}
        <div className="absolute top-6 left-5 md:left-8">
          <SLabel n="03" text="Our Work" />
        </div>

        {/* CTA bottom-right */}
        <div className="absolute bottom-8 right-5 md:right-8 flex items-center gap-4">
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#E8E2D4]/70">
            Explore<br />Our Work
          </span>
          <Link
            href="/work"
            className="w-11 h-11 rounded-full border border-[#E8E2D4]/30 flex items-center justify-center hover:border-[#D4FF38] hover:text-[#D4FF38] transition-colors text-[#E8E2D4]/70 text-sm"
          >
            →
          </Link>
        </div>
      </section>

      {/* ── 04 SELECTED WORK ── */}
      <section className="px-5 md:px-8 py-12 md:py-16 border-t border-[#E8E2D4]/8">
        {/* Header row */}
        <div className="flex items-start justify-between mb-2">
          <SLabel n="04" text="Selected Work" />
          <Fade>
            <Link
              href="/work"
              className="flex items-center gap-2 text-[9px] tracking-[0.18em] uppercase text-[#E8E2D4]/30 hover:text-[#E8E2D4] transition-colors mt-1"
            >
              View Projects
              <span className="w-5 h-5 border border-current rounded-full flex items-center justify-center text-[10px] leading-none">+</span>
            </Link>
          </Fade>
        </div>

        <div className="mt-2">
          {workNames.map((name, i) => (
            <WorkName key={name} name={name} i={i} color={workColors[i]} />
          ))}
        </div>
      </section>

      {/* ── 05 THREE CITIES ── */}
      <section className="px-5 md:px-8 py-12 md:py-20 border-t border-[#E8E2D4]/8">
        <SLabel n="05" text="Three Cities" />
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {["SYDNEY", "DUBAI", "BEIRUT"].map((city, i) => (
            <CityBlock key={city} city={city} index={i} />
          ))}
        </div>
      </section>

      {/* ── 06 LET'S BUILD ── */}
      <section className="px-5 md:px-8 py-12 md:py-20 border-t border-[#E8E2D4]/8">
        <SLabel n="06" text="Let's Build" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-end">
          {/* Left: manifesto */}
          <div>
            {["TO BE", "NOT NORMAL", "IS TO BE"].map((line, i) => (
              <Reveal key={line} delay={i * 0.08}>
                <div
                  className="font-display text-[#E8E2D4] leading-[0.88]"
                  style={{ fontSize: "clamp(2.8rem, 9vw, 7.5rem)" }}
                >
                  {line}
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.24}>
              <div
                className="font-display text-[#D4FF38] leading-[0.88]"
                style={{ fontSize: "clamp(2.8rem, 9vw, 7.5rem)" }}
              >
                HOSPITABLE.
              </div>
            </Reveal>
          </div>

          {/* Right: CTA */}
          <Fade delay={0.3} className="flex flex-col gap-8 justify-end pb-1">
            <p className="text-[#E8E2D4]/45 text-sm leading-relaxed font-light max-w-xs">
              Let&apos;s build something worth remembering.
            </p>
            <a
              href="https://calendly.com/notnormal/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 self-start"
            >
              <span className="text-[9px] tracking-[0.22em] uppercase text-[#E8E2D4]/60 group-hover:text-[#D4FF38] transition-colors">
                Start a Project
              </span>
              <div className="w-9 h-9 rounded-full border border-[#E8E2D4]/25 group-hover:border-[#D4FF38] flex items-center justify-center text-[#E8E2D4]/60 group-hover:text-[#D4FF38] transition-colors text-sm">
                →
              </div>
            </a>
          </Fade>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-5 md:px-8 py-6 border-t border-[#E8E2D4]/8 flex items-center justify-between">
        <div>
          <p className="text-[9px] tracking-widest uppercase text-[#E8E2D4]/20">© Not Normal</p>
          <p className="text-[9px] tracking-widest uppercase text-[#E8E2D4]/15">All Rights Reserved</p>
        </div>
        <div className="flex gap-5">
          {["Instagram", "LinkedIn", "Journal"].map((l) => (
            <Link
              key={l}
              href={l === "Journal" ? "/thinking" : l === "Instagram" ? "https://instagram.com/bynotnormal" : "https://linkedin.com/company/bynotnormal"}
              target={l !== "Journal" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-[9px] tracking-[0.18em] uppercase text-[#E8E2D4]/25 hover:text-[#E8E2D4]/70 transition-colors"
            >
              {l}
            </Link>
          ))}
        </div>
      </footer>
    </>
  );
}
