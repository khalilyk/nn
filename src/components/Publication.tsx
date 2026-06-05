"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Lenis from "lenis";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import FeaturedCarousel from "./FeaturedCarousel";
import RotatingWord from "./RotatingWord";
import Terminal from "./Terminal";
import Cursor from "./Cursor";
import Grain from "./Grain";
import Preloader from "./Preloader";
import ScrollProgress from "./ScrollProgress";
import Magnetic from "./Magnetic";
import NavPill from "./NavPill";
import HeroMedia from "./HeroMedia";

/* ───────────────── IMAGERY ───────────────── */
const IMG = {
  hero: "https://images.unsplash.com/photo-1556909211-36987daf7b4d?auto=format&fit=crop&w=1400&q=80", // chef seasoning / dark food
  dinner: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=80", // dinner table wine
  interior: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80", // dark restaurant interior
  fils: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80", // warm restaurant entrance
  cocktail: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=80", // dark bar cocktail
  chef: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=80", // chef plating
  crowd: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80", // crowded restaurant
};

/* ───────────────── STACKING PANEL ───────────────── */
function Panel({
  children,
  bg,
  index,
  minH = "100vh",
}: {
  children: ReactNode;
  bg: "black" | "ivory";
  index: number;
  minH?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        const card = inner.current;
        if (!el || !card) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const pinnedPast = Math.min(1, Math.max(0, -rect.top / vh));
        const scale = 1 - pinnedPast * 0.04;
        const brightness = 1 - pinnedPast * 0.25;
        card.style.transform = `scale(${scale})`;
        card.style.filter = `brightness(${brightness})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="panel" style={{ zIndex: index }}>
      <div
        ref={inner}
        className={`origin-top ${bg === "black" ? "bg-[#0A0A0A] text-[#F3F1EC]" : "bg-[#F3F1EC] text-[#0A0A0A]"}`}
        style={{ minHeight: minH, boxShadow: "0 -30px 60px -25px rgba(0,0,0,0.5)", willChange: "transform, filter" }}
      >
        {children}
      </div>
    </section>
  );
}

/* Bottom corner section number */
function SectionNo({ n, side = "left", dark }: { n: string; side?: "left" | "right"; dark?: boolean }) {
  return (
    <span
      className={`absolute bottom-7 ${side === "left" ? "left-8 md:left-16" : "right-8 md:right-16"} text-[10px] tracking-[0.2em] ${
        dark ? "text-[#B9B5AE]/70" : "text-[#0A0A0A]/40"
      }`}
    >
      {n}
    </span>
  );
}

/* ───────────────── PUBLICATION ───────────────── */
export default function Publication() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Lock scroll while preloader is up
  useEffect(() => {
    if (loading) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [loading]);

  return (
    <div className="relative">
      <Preloader onDone={() => setLoading(false)} />
      <Cursor />
      <Grain />
      <ScrollProgress total={9} />
      <NavPill />
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-6 md:py-8 mix-blend-difference text-[#F3F1EC]">
        <a href="#top" className="font-display text-sm tracking-tight leading-none">
          NOT NORMAL<sup className="text-[8px] ml-0.5">™</sup>
        </a>
        <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {[
            { l: "About", href: "#s03", tip: "Who we are", shape: "rounded-full" },
            { l: "The Menu", href: "#s02", tip: "What we do", shape: "rounded-none" },
            { l: "Projects", href: "#s04", tip: "Selected proof", shape: "rounded-tl-xl rounded-br-xl" },
            { l: "Journal", href: "#s08", tip: "Thinking & insights", shape: "rounded-lg" },
            { l: "Contact", href: "#footer", tip: "Let's chat", shape: "rounded-tr-xl rounded-bl-xl" },
          ].map(({ l, href, tip, shape }) => (
            <a key={l} href={href} className="group relative text-[10px] tracking-[0.22em] uppercase">
              <span className="transition-opacity group-hover:opacity-60">{l}</span>
              {/* Tooltip — unique shape per item */}
              <span
                className={`pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap bg-[#F3F1EC] px-3 py-1.5 text-[8px] tracking-[0.18em] text-[#0A0A0A] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 ${shape}`}
              >
                {tip}
                <span className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#F3F1EC]" />
              </span>
            </a>
          ))}
        </div>
        <Magnetic strength={0.5}>
          <a href="#footer" data-cursor="Chat" className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.22em] uppercase hover:opacity-60 transition-opacity">
              Let&apos;s Chat
            </span>
            <span className="relative w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
              <span className="absolute inset-0 rounded-full border border-current animate-ping opacity-60" />
            </span>
          </a>
        </Magnetic>
      </nav>

      {/* ═══ 01 — HERO ═══ */}
      <Panel index={1} bg="black">
        <div id="top" className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-20 pb-16 overflow-hidden">
          {/* Hero crossfading media top-right */}
          <div className="absolute top-0 right-0 w-[52%] h-[78%]">
            <HeroMedia className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0A0A0A]/20 to-[#0A0A0A]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
          </div>

          {/* Vertical label + line, left edge */}
          <div className="absolute left-8 md:left-16 top-[18%] bottom-[30%] hidden md:flex flex-col items-center gap-4">
            <span className="w-px flex-1 bg-[#B9B5AE]/30" />
            <p className="text-[8px] tracking-[0.3em] uppercase text-[#B9B5AE]/60" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
              Branding — Marketing — Experience
            </p>
          </div>

          {/* Giant title */}
          <div className="relative z-10 md:pl-16">
            <h1 className="font-display leading-[0.82] tracking-tight opacity-20" style={{ fontSize: "clamp(3rem, 13vw, 12rem)" }}>
              <span className="block overflow-hidden"><Reveal as="span" className="block">NOBODY</Reveal></span>
              <span className="block overflow-hidden"><Reveal as="span" delay={0.08} className="block">REMEMBERS</Reveal></span>
              <span className="block overflow-hidden"><Reveal as="span" delay={0.16} className="block">NORMAL</Reveal></span>
            </h1>
          </div>

          {/* Supporting copy bottom-right */}
          <div className="absolute bottom-24 right-8 md:right-16 max-w-[170px] text-left">
            <Reveal delay={0.3}>
              <p className="text-[11px] leading-relaxed text-[#B9B5AE]">
                A hospitality branding and marketing studio for brands that refuse to blend in.
              </p>
            </Reveal>
          </div>

          {/* Bottom row */}
          <SectionNo n="01" dark />
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60">Scroll</span>
            <span className="w-px h-5 bg-[#B9B5AE]/30" />
          </div>
        </div>
      </Panel>

      {/* ═══ 02 — NOBODY REMEMBERS NORMAL ═══ */}
      <Panel index={2} bg="ivory" minH="62vh">
        <div id="s02" className="relative min-h-[62vh] flex flex-col items-center justify-center text-center px-8 md:px-16 py-20">
          <Reveal>
            <h2 className="font-editorial leading-[1.15] mb-12 max-w-3xl mx-auto" style={{ fontSize: "clamp(1.8rem, 3.6vw, 3rem)" }}>
              We build bold brands<br />for the edible &amp; drinkable,<br />from branding &amp; storytelling<br />to stuff you can hold.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="w-full max-w-3xl mx-auto">
            <Parallax src={IMG.dinner} amount={40} className="aspect-[16/9] w-full grayscale" position="center" />
          </Reveal>
          <SectionNo n="02" />
        </div>
      </Panel>

      {/* ═══ 03 — SOME BRANDS SERVE FOOD ═══ */}
      <Panel index={3} bg="black" minH="66vh">
        <div id="s03" className="relative min-h-[66vh] flex items-center overflow-hidden">
          {/* Right photo full bleed */}
          <div className="absolute top-0 right-0 bottom-0 w-[58%]">
            <Parallax src={IMG.interior} amount={50} scale={1.15} position="center 40%" className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
          </div>
          <div className="relative z-10 px-8 md:px-16 py-20">
            <Reveal>
              <h2 className="font-editorial leading-[1.05]" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}>
                Some brands<br />serve food.<br />
                <span className="block mt-2">Some become</span>
                <span className="italic">culture.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <span className="inline-block mt-10 text-[#F3F1EC]/70 text-xl">→</span>
            </Reveal>
          </div>
          <SectionNo n="03" dark />
        </div>
      </Panel>

      {/* ═══ 04 — FEATURED PROJECTS (draggable carousel) ═══ */}
      <Panel index={4} bg="ivory" minH="80vh">
        <div id="s04" className="relative min-h-[80vh] flex items-center px-8 md:px-16 py-20">
          <FeaturedCarousel />
          <SectionNo n="04" />
        </div>
      </Panel>

      {/* ═══ 05 — ATTENTION IS EARNED ═══ */}
      <Panel index={5} bg="black" minH="46vh">
        <div className="relative min-h-[46vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Parallax src={IMG.cocktail} amount={50} scale={1.18} position="center 45%" className="w-full h-full" />
            <div className="absolute inset-0 bg-[#0A0A0A]/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />
          </div>
          <div className="relative z-10 w-full px-8 md:px-20">
            <Reveal>
              <p className="font-editorial" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
                Attention is <span className="italic">earned.</span>
              </p>
            </Reveal>
          </div>
          <SectionNo n="05" dark />
        </div>
      </Panel>

      {/* ═══ 06 — CTA: START FROM SCRATCH (centered) ═══ */}
      <Panel index={6} bg="ivory" minH="62vh">
        <div className="relative min-h-[62vh] flex flex-col items-center justify-center text-center px-8 md:px-16 py-24">
          <Reveal>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-6">Starting from scratch?</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-editorial leading-[1.1] mb-10 max-w-2xl mx-auto" style={{ fontSize: "clamp(1.8rem, 3.8vw, 3.4rem)" }}>
              We&apos;ll build your brand from the ground up.
              <span className="italic"> Identity, strategy, story</span> — the whole thing.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <Magnetic strength={0.35}>
              <a
                href="#footer"
                data-cursor="Go"
                className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-[#0A0A0A] px-9 py-4"
              >
                <span className="absolute inset-0 bg-[#0A0A0A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                <span className="relative z-10 text-[10px] tracking-[0.28em] uppercase text-[#0A0A0A] group-hover:text-[#F3F1EC] transition-colors duration-500">
                  Are You Ready?
                </span>
                <span className="relative z-10 w-7 h-7 rounded-full border border-[#0A0A0A] group-hover:border-[#F3F1EC] flex items-center justify-center overflow-hidden">
                  <span className="text-[#0A0A0A] group-hover:text-[#F3F1EC] transition-all duration-500 group-hover:translate-x-5">→</span>
                  <span className="absolute text-[#F3F1EC] -translate-x-5 group-hover:translate-x-0 transition-transform duration-500">→</span>
                </span>
              </a>
            </Magnetic>
          </Reveal>
          <SectionNo n="06" />
        </div>
      </Panel>

      {/* ═══ 07 — PEOPLE DON'T SHARE AVERAGE ═══ */}
      <Panel index={7} bg="black" minH="42vh">
        <div className="relative min-h-[42vh] flex items-center overflow-hidden">
          <div className="absolute top-0 right-0 bottom-0 w-[58%]">
            <Parallax src={IMG.crowd} amount={40} scale={1.15} position="center 55%" className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
          </div>
          <div className="relative z-10 px-8 md:px-16 py-16">
            <Reveal>
              <p className="font-editorial leading-[1.1]" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
                People don&apos;t<br />share average.
              </p>
            </Reveal>
          </div>
          <SectionNo n="07" dark />
        </div>
      </Panel>

      {/* ═══ 08 — NORM ═══ */}
      <Panel index={8} bg="ivory" minH="auto">
        <div id="s08" className="relative px-8 md:px-16 py-24 md:py-32 flex flex-col items-center">
          <Reveal>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-3 text-center">08 — Not a Therapist</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-editorial text-center mb-12 leading-[1.2]" style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)" }}>
              Meet <span className="italic">NORM</span>.<br />
              Here to chat about all things food &amp; marketing.
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="w-full">
            <Terminal />
          </Reveal>
          <SectionNo n="08" />
        </div>
      </Panel>

      {/* ═══ FOOTER — THE INVITATION ═══ */}
      <Panel index={9} bg="ivory" minH="auto">
        <footer id="footer" className="px-8 md:px-16 pt-24 pb-10 md:pb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
            <Reveal>
              <h2 className="font-editorial leading-[1.2]" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)" }}>
                to be not normal<br />is to be <RotatingWord />
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="space-y-1.5 md:pt-2">
                <a href="mailto:hello@thisisnn.com" className="block text-[11px] tracking-[0.1em] uppercase hover:opacity-60 transition-opacity">hello@thisisnn.com</a>
                <a href="tel:+971501234567" className="block text-[11px] tracking-[0.1em] hover:opacity-60 transition-opacity">+971 50 123 4567</a>
                <div className="pt-4 space-y-1.5">
                  <a href="#" className="block text-[11px] tracking-[0.1em] uppercase hover:opacity-60 transition-opacity">Instagram</a>
                  <a href="#" className="block text-[11px] tracking-[0.1em] uppercase hover:opacity-60 transition-opacity">LinkedIn</a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="border-t border-[#0A0A0A]/15 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] tracking-[0.2em] uppercase text-[#0A0A0A]/50">
            <span>© Not Normal</span>
            <span>Sydney — Dubai — Beirut</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#0A0A0A] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#0A0A0A] transition-colors">Terms</a>
            </div>
          </div>

          <p className="mt-6 text-center text-[9px] tracking-[0.25em] uppercase text-[#0A0A0A]/35">
            Nobody Remembers Normal.™
          </p>

          {/* Acknowledgement of Country */}
          <p className="mt-10 text-center text-[9px] leading-relaxed tracking-[0.12em] uppercase text-[#0A0A0A]/35 max-w-xl mx-auto">
            We acknowledge the Gadigal, the traditional custodians of the Country on which Not Normal and its brands stands.
          </p>
        </footer>
      </Panel>
    </div>
  );
}
