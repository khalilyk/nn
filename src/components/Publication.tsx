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
import HeroMedia from "./HeroMedia";
import ScrollDriftX from "./ScrollDriftX";
import Testimonials from "./Testimonials";
import ChatLink from "./ChatLink";
import ThreeCities from "./ThreeCities";
import HoverWord from "./HoverWord";
import Greeting from "./Greeting";
import OverlapImages from "./OverlapImages";
import MenuSplit from "./MenuSplit";
import PacMan from "./PacMan";
import ClientLogos from "./ClientLogos";

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
const SLIDE_OFFSET: Record<string, string> = {
  left: "translateX(-12%)",
  right: "translateX(12%)",
  up: "translateY(-12%)",
  down: "translateY(12%)",
};

function Panel({
  children,
  bg,
  index,
  minH = "100vh",
  pin = true,
  slideFrom,
  clip = true,
}: {
  children: ReactNode;
  bg: "black" | "ivory";
  index: number;
  minH?: string;
  pin?: boolean;
  slideFrom?: "left" | "right" | "up" | "down";
  clip?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pin) return;
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
  }, [pin]);

  // Directional slide — plays in on enter, reverses out on leave (both scroll directions)
  useEffect(() => {
    const el = ref.current;
    if (!el || !slideFrom) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.transform = "translate(0, 0)";
          el.style.opacity = "1";
        } else {
          el.style.transform = SLIDE_OFFSET[slideFrom];
          el.style.opacity = "0";
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [slideFrom]);

  return (
    <section
      ref={ref}
      className={pin ? "panel" : "relative"}
      style={
        slideFrom
          ? {
              zIndex: index,
              transform: SLIDE_OFFSET[slideFrom],
              opacity: 0,
              transition: "transform 1s cubic-bezier(0.16,1,0.3,1), opacity 1s cubic-bezier(0.16,1,0.3,1)",
              willChange: "transform, opacity",
            }
          : { zIndex: index }
      }
    >
      <div
        ref={inner}
        className={`origin-top ${clip ? "overflow-hidden" : ""} ${bg === "black" ? "bg-[#0A0A0A] text-[#F3F1EC]" : "bg-[#F3F1EC] text-[#0A0A0A]"}`}
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
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Lock scroll while preloader is up or the mobile menu is open
  useEffect(() => {
    if (loading || menuOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [loading, menuOpen]);

  return (
    <div className="relative">
      <Preloader onDone={() => setLoading(false)} />
      <Cursor />
      <Grain />
      <ScrollProgress total={9} />
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-6 md:py-8 mix-blend-difference text-[#F3F1EC]">
        <a href="#top" className="font-display text-sm tracking-tight leading-none">
          NOT NORMAL<sup className="text-[8px] ml-0.5">™</sup>
        </a>
        <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {[
            { l: "About", href: "#s02", tip: "Who we are", shape: "rounded-full" },
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
        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80] shadow-[0_0_8px_2px_rgba(74,222,128,0.7)]" />
            </span>
            <span className="text-[9px] tracking-[0.18em] uppercase text-[#4ADE80]">2 spots this month</span>
          </span>
          <div className="hidden md:block">
            <Magnetic strength={0.5}>
              <ChatLink />
            </Magnetic>
          </div>
          {/* Mobile hamburger */}
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden relative flex flex-col items-center justify-center gap-[6px] w-8 h-8 -mr-1"
          >
            <span className={`block h-[2px] w-7 rounded-full bg-[#F3F1EC] transition-all duration-300 ${menuOpen ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-7 rounded-full bg-[#F3F1EC] transition-all duration-300 ${menuOpen ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU OVERLAY ─── */}
      <div
        className={`fixed inset-0 z-[99] md:hidden bg-[#0A0A0A] flex flex-col px-8 pt-24 pb-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Links */}
        <nav className="flex flex-col mt-auto">
          {[
            { l: "About", href: "#s02" },
            { l: "The Menu", href: "#s02" },
            { l: "Projects", href: "#s04" },
            { l: "Journal", href: "#s08" },
            { l: "Contact", href: "#footer" },
          ].map(({ l, href }, i) => (
            <a
              key={l}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-baseline gap-4 border-b border-[#F3F1EC]/10 py-4"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.1 + i * 0.07 : 0}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.1 + i * 0.07 : 0}s`,
              }}
            >
              <span className="font-mono text-[10px] text-[#B9B5AE]/50 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display uppercase text-[#F3F1EC] leading-none" style={{ fontSize: "clamp(2.2rem, 11vw, 3.5rem)" }}>
                {l}
              </span>
              <span className="ml-auto self-center text-[#F3F1EC]/30 group-hover:text-[#F3F1EC] transition-colors">→</span>
            </a>
          ))}
        </nav>

        {/* Footer block */}
        <div
          className="mt-10"
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.55 : 0}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.55 : 0}s`,
          }}
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80] shadow-[0_0_8px_2px_rgba(74,222,128,0.7)]" />
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase text-[#4ADE80]">2 spots this month</span>
            </span>
            <a
              href="#footer"
              onClick={() => setMenuOpen(false)}
              className="border border-[#F3F1EC]/40 rounded-full px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase text-[#F3F1EC]"
            >
              Let&apos;s Chat
            </a>
          </div>
          <div className="flex items-center justify-between text-[10px] tracking-[0.15em] uppercase text-[#B9B5AE]/60">
            <a href="mailto:hello@thisisnn.com" className="hover:text-[#F3F1EC] transition-colors">hello@thisisnn.com</a>
            <span>Sydney · Dubai · Beirut</span>
          </div>
        </div>
      </div>

      {/* ═══ 01 — HERO ═══ */}
      <Panel index={1} bg="black">
        <div id="top" className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-20 pb-16 overflow-hidden">
          {/* Hero crossfading media — full-bleed, centred */}
          <div className="absolute inset-0">
            <HeroMedia className="w-full h-full" />
            <div className="absolute inset-0 bg-[#0A0A0A]/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-transparent" />
          </div>

          {/* Vertical label + line, left edge */}
          <div className="absolute left-8 md:left-16 top-[18%] bottom-[30%] hidden md:flex flex-col items-center gap-4">
            <span className="w-px flex-1 bg-[#B9B5AE]/30" />
            <p className="text-[8px] tracking-[0.3em] uppercase text-[#B9B5AE]/60" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
              Branding — Marketing — Experience
            </p>
          </div>

          {/* Giant title — centred, justified */}
          <div className="relative z-10 w-full flex justify-center">
            <h1 className="font-display uppercase leading-[0.95] tracking-tight text-[#F3F1EC] w-full max-w-4xl" style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}>
              <span className="block overflow-hidden"><Reveal as="span" className="block text-center [text-align-last:center] md:text-justify md:[text-align-last:justify]">Let Them Savour,</Reveal></span>
              <span className="block overflow-hidden"><Reveal as="span" delay={0.08} className="block text-center [text-align-last:center] md:text-justify md:[text-align-last:justify]">Sip and Live</Reveal></span>
              <span className="block overflow-hidden"><Reveal as="span" delay={0.16} className="block text-center [text-align-last:center] md:text-justify md:[text-align-last:justify]">Your Story.</Reveal></span>
            </h1>
          </div>

          {/* Supporting copy bottom-right */}
          <div className="absolute bottom-24 right-8 md:right-16 max-w-[170px] text-left">
            <Reveal delay={0.3}>
              <p className="text-[11px] leading-relaxed text-[#B9B5AE]">
                A Hospitality Brand<br />Advisory For Those<br />That Refuse to Blend In
              </p>
            </Reveal>
          </div>

          {/* Bottom row */}
          <SectionNo n="01" dark />
        </div>
      </Panel>

      {/* ═══ 02 — NOBODY REMEMBERS NORMAL + THE MENU ═══ */}
      <Panel index={2} bg="ivory" minH="auto" pin={false} slideFrom="left" clip={false}>
        <div id="s02" className="relative">
          {/* Top — statement + image */}
          <div className="flex flex-col items-center justify-center text-center px-8 md:px-16 pt-28 pb-16">
            <Reveal>
              <Greeting />
              <h2 className="font-editorial leading-[1.15] mb-12 max-w-3xl mx-auto" style={{ fontSize: "clamp(1.8rem, 3.6vw, 3rem)" }}>
                We build <HoverWord mode="bold">bold</HoverWord> brands<br />
                for the <HoverWord variant={0}>edible</HoverWord> and <HoverWord variant={1}>drinkable</HoverWord>,<br />
                from <HoverWord variant={2}>branding</HoverWord> &amp; <HoverWord variant={3}>storytelling</HoverWord> to<br />
                <HoverWord variant={4}>stuff</HoverWord> you can <HoverWord variant={5}>hold</HoverWord>.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="w-full">
              <OverlapImages />
            </Reveal>
          </div>

          {/* The Menu — split screen, sticky left + scrolling services */}
          <div className="px-8 md:px-16 pb-24 md:pb-28">
            <Reveal>
              <MenuSplit />
            </Reveal>
          </div>

          <SectionNo n="02" />
        </div>
      </Panel>

      {/* ═══ 03 — CLIENTS ═══ */}
      <Panel index={3} bg="black" minH="auto" slideFrom="up">
        <div className="relative px-8 md:px-16 py-28 md:py-36">
          <ClientLogos />
          <SectionNo n="03" dark />
        </div>
      </Panel>

      {/* ═══ 04 — FEATURED PROJECTS (draggable carousel) ═══ */}
      <Panel index={4} bg="ivory" minH="80vh" slideFrom="right">
        <div id="s04" className="relative min-h-[80vh] flex items-center px-8 md:px-16 py-20 overflow-hidden">
          <ScrollDriftX range={0.07} className="w-full">
            <FeaturedCarousel />
          </ScrollDriftX>
          <SectionNo n="04" />
        </div>
      </Panel>

      {/* ═══ 05 — TESTIMONIALS ═══ */}
      <Panel index={5} bg="black" minH="85vh" slideFrom="down">
        <div className="relative min-h-[85vh] flex items-center overflow-hidden">
          <Testimonials />
          <SectionNo n="05" dark />
        </div>
      </Panel>

      {/* ═══ 06 — NORM ═══ */}
      <Panel index={6} bg="ivory" minH="auto" pin={false} slideFrom="left">
        <div id="s08" className="relative px-8 md:px-16 py-20 md:py-32 flex flex-col items-center">
          <Reveal>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-3 text-center">06 — Not a Therapist</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-editorial text-center mb-12 leading-[1.2]" style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)" }}>
Meet <span className="italic">NORM</span>, our marketing exec.<br />
              Here for a chat about all things food &amp; marketing.
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="w-full">
            <Terminal />
          </Reveal>
          <SectionNo n="06" />
        </div>
      </Panel>

      {/* ═══ 07 — PEOPLE DON'T SHARE AVERAGE ═══ */}
      <Panel index={7} bg="black" minH="42vh" slideFrom="down">
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

      {/* ═══ 08 — CTA: START FROM SCRATCH (centered, above footer) ═══ */}
      <Panel index={8} bg="ivory" minH="62vh" slideFrom="up">
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
          <SectionNo n="08" />
        </div>
      </Panel>

      {/* ═══ 09 — THREE CITIES ═══ */}
      <Panel index={9} bg="black" minH="60vh" slideFrom="left">
        <div className="relative min-h-[60vh] flex items-center px-8 md:px-16 py-20">
          <ThreeCities />
          <SectionNo n="09" dark />
        </div>
      </Panel>

      {/* ═══ FOOTER — THE INVITATION ═══ */}
      <Panel index={10} bg="ivory" minH="auto" slideFrom="up">
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
            <span>© {new Date().getFullYear()} Not Normal</span>
            <span>Sydney — Dubai — Beirut</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#0A0A0A] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#0A0A0A] transition-colors">Terms</a>
              <a href="/the-inside" className="hover:text-[#0A0A0A] transition-colors">The Inside</a>
            </div>
          </div>

          {/* Acknowledgement of Country */}
          <div className="mt-10 mx-auto max-w-xl rounded-xl border border-[#0A0A0A]/15 px-6 py-5">
            <p className="text-center text-[9px] leading-relaxed tracking-[0.12em] uppercase text-[#0A0A0A]/40">
              We acknowledge the Gadigal, the traditional custodians of the Country on which Not Normal and its brands stands.
            </p>
          </div>

          <p className="mt-10 text-center text-[9px] tracking-[0.25em] uppercase text-[#0A0A0A]/35">
            Nobody Remembers Normal.™
          </p>

          <PacMan />
        </footer>
      </Panel>
    </div>
  );
}
