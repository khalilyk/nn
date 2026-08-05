"use client";

import { useEffect, useRef, Fragment, ReactNode } from "react";
import Lenis from "lenis";
import Reveal from "./Reveal";
import FeaturedCarousel from "./FeaturedCarousel";
import ClientLogos from "./ClientLogos";
import ParallaxBg from "./ParallaxBg";
import PinInView from "./PinInView";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import Terminal from "./Terminal";
import Cursor from "./Cursor";
import Grain from "./Grain";
import ScrollProgress from "./ScrollProgress";
import Magnetic from "./Magnetic";
import HeroMedia from "./HeroMedia";
import Testimonials from "./Testimonials";
import HoverWord from "./HoverWord";
import Greeting from "./Greeting";
import ScrambleText from "./ScrambleText";
import OverlapImages from "./OverlapImages";
import MenuSplit from "./MenuSplit";
import Postcard from "./Postcard";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import JournalSection from "./JournalSection";
import type { SiteContent } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

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

  // Directional slide, plays in once on enter then stays (no reset-on-leave → no scroll flicker)
  useEffect(() => {
    const el = ref.current;
    if (!el || !slideFrom) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.transform = "translate(0, 0)";
          el.style.opacity = "1";
          obs.disconnect();
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
        style={{ minHeight: minH, boxShadow: "0 -30px 60px -25px rgba(0,0,0,0.5)", willChange: pin ? "transform, filter" : "auto" }}
      >
        {children}
      </div>
    </section>
  );
}

/* Bottom corner section number */
// section index labels removed by request
function SectionNo(_: { n: string; side?: "left" | "right"; dark?: boolean }) {
  return null;
}

/* ───────────────── PUBLICATION ───────────────── */
export default function Publication({ initialContent, show }: { initialContent?: SiteContent; show?: string[] }) {
  const c = initialContent ?? DEFAULT_CONTENT;
  // sections render in this order; a page passes `show` to pick a subset (and its order)
  const DEFAULT_ORDER = ["hero", "menu", "brands", "projects", "postcard", "norm", "testimonials", "about", "notes", "contact", "footer"];
  const order = show ?? DEFAULT_ORDER;
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
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

  const sectionMap: Record<string, ReactNode> = {
      /* ═══ HERO ═══ */
      hero: (
      <Panel index={1} bg="black">
        <div id="top" className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-20 pb-16 overflow-hidden">
          {/* Hero crossfading media, full-bleed, centred */}
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
              {c.hero.verticalLabel}
            </p>
          </div>

          {/* Giant title, centred, justified */}
          <div className="relative z-10 w-full flex justify-center">
            <h1 className="font-display uppercase leading-[0.95] tracking-tight text-[#F3F1EC] w-full max-w-2xl" style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}>
              {c.hero.titleLines.map((line, i) => (
                <span key={i} className="block overflow-hidden"><Reveal as="span" delay={i * 0.08} className="block text-center"><ScrambleText text={line} /></Reveal></span>
              ))}
            </h1>
          </div>

          {/* Bottom meta row — badge in bottom-left corner, copy in bottom-right, with
              padding equal to the page's side padding (perfectly balanced corners) */}
          <div className="absolute bottom-8 right-8 left-8 md:bottom-16 md:left-16 md:right-16 flex flex-col-reverse md:flex-row md:items-end md:justify-between gap-5">
            <Reveal delay={0.3}>
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80] shadow-[0_0_8px_2px_rgba(74,222,128,0.7)]" />
                </span>
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#4ADE80]">{c.hero.spotsLeftBadge}</span>
              </span>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-[11px] leading-relaxed text-[#B9B5AE] md:text-right max-w-[260px] md:max-w-[260px] text-balance">
                {c.hero.supportingCopy}
              </p>
            </Reveal>
          </div>

          {/* Bottom row */}
          <SectionNo n="01" dark />
        </div>
      </Panel>
      ),

      /* ═══ MENU ═══ */
      menu: (
      <Panel index={2} bg="ivory" minH="auto" pin={false} clip={false}>
        <div id="s02" className="relative">
          {/* Top, statement + image */}
          <div className="flex flex-col items-center justify-center text-center px-8 md:px-16 pt-28 pb-16">
            <Reveal>
              <Greeting />
              <h2 className="font-editorial uppercase leading-[1.15] mb-12 max-w-5xl mx-auto whitespace-normal md:whitespace-nowrap" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.9rem)" }}>
                We build <HoverWord mode="bold">bold</HoverWord> brands<br />
                for the <HoverWord variant={0}>edible</HoverWord> and <HoverWord variant={1}>drinkable</HoverWord>,<br />
                from <HoverWord variant={2}>branding</HoverWord> &amp; <HoverWord variant={3}>storytelling</HoverWord> to<br />
                <HoverWord variant={4}>stuff</HoverWord> you can <HoverWord variant={5}>hold</HoverWord>.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="w-full">
              <OverlapImages images={c.menu.gallery} />
            </Reveal>
          </div>

          {/* The Menu, split screen, sticky left + scrolling services.
              No Reveal wrapper here - its transform would break the sticky column. */}
          <div className="px-8 md:px-16 pb-24 md:pb-28">
            <MenuSplit menu={c.menu} />
          </div>

          <SectionNo n="02" />
        </div>
      </Panel>
      ),

      /* ═══ BRANDS — orange logo carousel ═══ */
      brands: <ClientLogos brands={c.brands} />,

      /* ═══ FEATURED PROJECTS ═══ */
      projects: (
      <Panel index={3} bg="ivory" minH="auto" pin={false}>
        <div id="s04" className="relative bg-[#0A0A0A] text-[#F3F1EC]" data-cursor-color="#F3F1EC">
          {/* mobile keeps the section-wide fixed wall; desktop's wall lives inside the pinned split layer (no drift) */}
          <div className="md:hidden">
            <ParallaxBg src="/nn-wall.png" overlay={0.82} cover={false} />
          </div>
          <div className="relative px-8 md:px-16 pt-28 md:pt-36 pb-28 md:pb-36 overflow-hidden">
            <FeaturedCarousel projects={c.projects} />
          </div>
          <SectionNo n="03" />
        </div>
      </Panel>
      ),

      /* ═══ POSTCARD ═══ */
      postcard: (
      <Panel index={5} bg="ivory" minH="auto" pin={false} slideFrom="up">
        <div className="relative px-8 md:px-16 py-28 md:py-36 bg-[#C0392B] overflow-hidden">
          {/* graffiti backdrop, pinned in the viewport while the section scrolls */}
          <PinInView>
            <span aria-hidden className="w-full h-full flex flex-col items-center justify-center text-center font-permanent uppercase leading-[0.78] text-[#0A0A0A]/[0.18] select-none" style={{ fontSize: "clamp(6.4rem, 27vw, 24rem)" }}>
              Not The<br />Louvre
            </span>
          </PinInView>
          <div className="relative z-10">
            <Postcard />
          </div>
          <SectionNo n="04" dark />
        </div>
      </Panel>
      ),

      /* ═══ NORM ═══ */
      norm: (
      <Panel index={6} bg="ivory" minH="auto" pin={false} slideFrom="left">
        <div id="s08" className="relative px-8 md:px-16 py-20 md:py-32 flex flex-col items-center">
          <Reveal>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-3 text-center">05, Not a Therapist</p>
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
          <SectionNo n="05" />
        </div>
      </Panel>
      ),

      /* ═══ TESTIMONIALS ═══ */
      testimonials: (
      <Panel index={7} bg="black" minH="85vh" pin={false}>
        <div className="relative min-h-[85vh] overflow-hidden">
          <Testimonials items={c.testimonials} />
        </div>
      </Panel>
      ),

      /* ═══ ABOUT ═══ */
      about: (
      <Panel index={2} bg="ivory" minH="auto" pin={false}>
        <AboutSection about={c.about} />
      </Panel>
      ),

      /* ═══ JOURNAL / NOTES ═══ */
      notes: (
      <Panel index={9} bg="ivory" minH="auto" pin={false}>
        <JournalSection notes={c.notes} />
      </Panel>
      ),

      /* ═══ CONTACT (incl. Three Cities) ═══ */
      contact: (
      <Panel index={10} bg="ivory" minH="auto" pin={false}>
        <ContactSection contact={c.contact} />
      </Panel>
      ),

      /* ═══ FOOTER, THE INVITATION ═══ */
      footer: (
      <Panel index={10} bg="ivory" minH="auto" slideFrom="up">
        <SiteFooter footer={c.footer} />
      </Panel>
      ),
  };

  return (
    <div className="relative overflow-x-clip md:overflow-x-visible">
      <Cursor />
      <Grain />
      {order.filter((k) => k !== "footer").length > 1 && (
        <ScrollProgress total={order.filter((k) => k !== "footer").length} />
      )}
      <SiteNav links={c.nav} />
      {order.map((k) => (sectionMap[k] ? <Fragment key={k}>{sectionMap[k]}</Fragment> : null))}
    </div>
  );
}
