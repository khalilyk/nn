"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import FeaturedCarousel from "./FeaturedCarousel";

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
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
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

  return (
    <div className="relative">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-6 md:py-8 mix-blend-difference text-[#F3F1EC]">
        <a href="#top" className="font-display text-sm tracking-tight leading-none">
          NOT NORMAL<sup className="text-[8px] ml-0.5">™</sup>
        </a>
        <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {["Work", "About", "Journal"].map((l) => (
            <a key={l} href="#s04" className="text-[10px] tracking-[0.22em] uppercase hover:opacity-60 transition-opacity">
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#footer" className="text-[10px] tracking-[0.22em] uppercase hover:opacity-60 transition-opacity">
            Let&apos;s Talk
          </a>
          <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-current" />
          </span>
        </div>
      </nav>

      {/* ═══ 01 — HERO ═══ */}
      <Panel index={1} bg="black">
        <div id="top" className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-20 pb-16 overflow-hidden">
          {/* Hero photo top-right */}
          <div className="absolute top-0 right-0 w-[52%] h-[78%]">
            <Parallax src={IMG.hero} amount={35} scale={1.12} position="center 35%" className="w-full h-full" />
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
            <h1 className="font-display leading-[0.82] tracking-tight" style={{ fontSize: "clamp(4.5rem, 18vw, 17rem)" }}>
              <span className="block overflow-hidden"><Reveal as="span" className="block">NOT</Reveal></span>
              <span className="block overflow-hidden"><Reveal as="span" delay={0.08} className="block">NORMAL</Reveal></span>
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
        <div className="relative min-h-[62vh] flex items-center px-8 md:px-16 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center w-full">
            <Reveal>
              <h2 className="font-editorial leading-[1.02]" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}>
                Nobody<br />remembers<br />normal.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Parallax src={IMG.dinner} amount={40} className="aspect-[16/9] w-full grayscale" position="center" />
            </Reveal>
          </div>
          <SectionNo n="02" />
        </div>
      </Panel>

      {/* ═══ 03 — SOME BRANDS SERVE FOOD ═══ */}
      <Panel index={3} bg="black" minH="66vh">
        <div className="relative min-h-[66vh] flex items-center overflow-hidden">
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

      {/* ═══ 06 — LOYALTY IS DESIGNED ═══ */}
      <Panel index={6} bg="ivory" minH="50vh">
        <div className="relative min-h-[50vh] flex items-center px-8 md:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center w-full">
            <Reveal>
              <Parallax src={IMG.chef} amount={35} className="aspect-[16/9] w-full grayscale" position="center" />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-editorial text-right md:text-left" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
                Loyalty<br />is <span className="italic">designed.</span>
              </p>
            </Reveal>
          </div>
          <SectionNo n="06" side="right" />
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

      {/* ═══ FOOTER — THE INVITATION ═══ */}
      <Panel index={8} bg="ivory" minH="auto">
        <footer id="footer" className="px-8 md:px-16 pt-24 pb-10 md:pb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-20">
            <Reveal>
              <h2 className="font-editorial leading-[1.1]" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)" }}>
                Let&apos;s build something<br /><span className="italic">not normal.</span>
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
            <Reveal delay={0.16}>
              <div className="flex md:justify-end">
                <a href="mailto:hello@thisisnn.com" className="group w-28 h-28 rounded-full border border-[#0A0A0A] flex flex-col items-center justify-center gap-2 hover:bg-[#0A0A0A] hover:text-[#F3F1EC] transition-colors duration-500">
                  <span className="text-[9px] tracking-[0.25em] uppercase">Let&apos;s Talk</span>
                  <span className="text-base">→</span>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="border-t border-[#0A0A0A]/15 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] tracking-[0.2em] uppercase text-[#0A0A0A]/50">
            <span>© Not Normal Studio</span>
            <span>Sydney — Dubai — Beirut</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#0A0A0A] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#0A0A0A] transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </Panel>
    </div>
  );
}
