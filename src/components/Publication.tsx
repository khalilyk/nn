"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import Reveal from "./Reveal";
import Parallax from "./Parallax";

/* ───────────────── IMAGERY ───────────────── */
const IMG = {
  hero: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
  dinner: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  interior: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
  fils: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80",
  cocktail: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1600&q=80",
  chef: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=80",
  crowd: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
  plate: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
  bar: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1400&q=80",
  table: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1400&q=80",
};

/* ───────────────── PANEL WRAPPER (stacking) ───────────────── */
function Panel({
  children,
  bg,
  index,
  className = "",
}: {
  children: ReactNode;
  bg: "black" | "ivory";
  index: number;
  className?: string;
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
        // How far the panel has been scrolled past its sticky position.
        // rect.top goes from 0 (pinned) to negative as next panel covers it.
        const pinnedPast = Math.min(1, Math.max(0, -rect.top / vh));
        const scale = 1 - pinnedPast * 0.06;
        const brightness = 1 - pinnedPast * 0.4;
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
    <section
      ref={ref}
      className="panel"
      style={{ zIndex: index }}
    >
      <div
        ref={inner}
        className={`min-h-screen origin-top ${
          bg === "black" ? "bg-[#0A0A0A]" : "bg-[#F3F1EC] text-[#0A0A0A]"
        } ${className}`}
        style={{
          boxShadow: "0 -40px 80px -20px rgba(0,0,0,0.6)",
          willChange: "transform, filter",
        }}
      >
        {children}
      </div>
    </section>
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
      {/* ─── Fixed top nav ─── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 py-5 mix-blend-difference text-[#F3F1EC]">
        <a href="#s01" className="font-display text-sm tracking-tight leading-none">
          NOT NORMAL<sup className="text-[8px] ml-0.5">™</sup>
        </a>
        <div className="hidden md:flex items-center gap-10">
          {["Work", "About", "Journal"].map((l) => (
            <a key={l} href="#s05" className="text-[10px] tracking-[0.22em] uppercase hover:opacity-60 transition-opacity">
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#s09" className="text-[10px] tracking-[0.22em] uppercase hover:opacity-60 transition-opacity">
            Let&apos;s Talk
          </a>
          <span className="w-3 h-3 rounded-full border border-current flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-current" />
          </span>
        </div>
      </nav>

      {/* ═══ 01 — THE STATEMENT ═══ */}
      <Panel index={1} bg="black">
        <div id="s01" className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-20 pb-16 overflow-hidden">
          {/* Hero photo, partially visible top-right */}
          <div className="absolute top-0 right-0 w-[55%] h-[62%] opacity-90">
            <Parallax src={IMG.hero} amount={40} scale={1.15} position="center 40%" className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0A0A0A]/30 to-[#0A0A0A]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
          </div>

          {/* Vertical label */}
          <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:block">
            <p className="text-[8px] tracking-[0.3em] uppercase text-[#B9B5AE]/60" style={{ writingMode: "vertical-rl" }}>
              Branding — Marketing — Guest Experience
            </p>
          </div>

          {/* Giant title */}
          <div className="relative z-10 md:pl-16">
            <h1 className="font-display leading-[0.82] tracking-tight" style={{ fontSize: "clamp(4.5rem, 19vw, 18rem)" }}>
              <span className="block overflow-hidden"><Reveal as="span" className="block">NOT</Reveal></span>
              <span className="block overflow-hidden"><Reveal as="span" delay={0.08} className="block">NORMAL</Reveal></span>
            </h1>
          </div>

          {/* Supporting copy bottom-right */}
          <div className="absolute bottom-24 right-6 md:right-10 max-w-[180px] text-right">
            <Reveal delay={0.3}>
              <p className="text-[11px] leading-relaxed text-[#B9B5AE]">
                A hospitality branding and marketing studio for brands that refuse to blend in.
              </p>
            </Reveal>
          </div>

          {/* Footer line */}
          <div className="absolute bottom-6 left-6 md:left-10 right-6 md:right-10 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] text-[#B9B5AE]/60">01</span>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60">Scroll</span>
              <span className="w-px h-6 bg-[#B9B5AE]/30" />
            </div>
            <span className="text-[10px] tracking-[0.2em] text-[#B9B5AE]/60" />
          </div>
        </div>
      </Panel>

      {/* ═══ 02 — THE PROBLEM ═══ */}
      <Panel index={2} bg="ivory">
        <div className="min-h-screen flex items-center px-6 md:px-10 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center w-full">
            <div>
              <Reveal>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE] mb-10">02 — The Problem</p>
              </Reveal>
              <h2 className="font-editorial leading-[1.05]" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}>
                <Reveal delay={0.05}>Nobody</Reveal>
                <Reveal delay={0.12}>remembers</Reveal>
                <Reveal delay={0.19} className="italic">normal.</Reveal>
              </h2>
            </div>
            <Reveal delay={0.1}>
              <Parallax src={IMG.dinner} amount={50} className="aspect-[4/3] w-full" position="center" />
            </Reveal>
          </div>
        </div>
      </Panel>

      {/* ═══ 03 — THE PERSPECTIVE ═══ */}
      <Panel index={3} bg="black">
        <div className="relative min-h-screen flex items-center px-6 md:px-10 py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <Parallax src={IMG.interior} amount={70} scale={1.2} position="center 40%" className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <Reveal>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE] mb-10">03 — The Perspective</p>
            </Reveal>
            <h2 className="font-editorial leading-[1.08] mb-10" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}>
              <Reveal delay={0.05}>Some brands</Reveal>
              <Reveal delay={0.12}>serve food.</Reveal>
              <Reveal delay={0.2}>Some become <span className="italic">culture.</span></Reveal>
            </h2>
            <Reveal delay={0.3}>
              <div className="space-y-3 max-w-md">
                {["Attention is a currency.", "Memory is the product.", "Loyalty is belonging.", "People share stories — never average."].map((t) => (
                  <p key={t} className="text-sm text-[#B9B5AE] border-l border-[#B9B5AE]/20 pl-4">{t}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <span className="inline-block mt-10 text-[#F3F1EC]/60 text-lg">→</span>
            </Reveal>
          </div>
        </div>
      </Panel>

      {/* ═══ 04 — THE FEED ═══ */}
      <Panel index={4} bg="ivory">
        <div className="min-h-screen px-6 md:px-10 py-24 flex flex-col justify-center">
          <Reveal>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE] mb-12">04 — The Feed</p>
          </Reveal>
          <div className="border-t border-[#0A0A0A]/15">
            {[
              { n: "01", t: "Why most restaurants don't need more followers", c: "Marketing" },
              { n: "02", t: "Your menu is a marketing tool", c: "Strategy" },
              { n: "03", t: "Good hospitality is good marketing", c: "Culture" },
              { n: "04", t: "The best loyalty programs don't feel like loyalty programs", c: "Loyalty" },
            ].map((a, i) => (
              <Reveal key={a.n} delay={i * 0.06}>
                <a href="#s08" className="group flex items-baseline justify-between gap-6 py-7 border-b border-[#0A0A0A]/15 hover:px-2 transition-all duration-500">
                  <span className="text-[10px] tracking-widest text-[#B9B5AE] w-8 shrink-0">{a.n}</span>
                  <h3 className="font-editorial flex-1 leading-tight" style={{ fontSize: "clamp(1.4rem, 3vw, 2.6rem)" }}>{a.t}</h3>
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE] shrink-0 hidden md:block">{a.c}</span>
                  <span className="text-lg shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>

      {/* ═══ 05 — THE PROOF ═══ */}
      <Panel index={5} bg="black">
        <div className="min-h-screen px-6 md:px-10 py-24">
          <Reveal>
            <div className="flex items-baseline justify-between mb-14">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE]">05 — The Proof</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE]/50">Not case studies</p>
            </div>
          </Reveal>

          {/* Featured proof: 3Fils */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-20">
              <div className="md:col-span-4">
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE] mb-4">Featured Proof — 01</p>
                <h3 className="font-display leading-none mb-4" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>3FILS</h3>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#B9B5AE] mb-6">Dubai →</p>
                <p className="text-sm text-[#B9B5AE] leading-relaxed max-w-xs mb-8">
                  From a bold idea to a dining experience that redefined a category. We built more than a brand — we built obsession.
                </p>
                <a href="#s09" className="text-[10px] tracking-[0.25em] uppercase border-b border-[#F3F1EC] pb-1 hover:opacity-60 transition-opacity">
                  View Proof →
                </a>
              </div>
              <div className="md:col-span-8">
                <Parallax src={IMG.fils} amount={40} className="aspect-[16/9] w-full" position="center" />
              </div>
            </div>
          </Reveal>

          {/* Other proof grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            {[
              { name: "Revolver", city: "Milan", img: IMG.bar },
              { name: "Maison Dali", city: "Paris", img: IMG.table },
              { name: "Oakberry", city: "Dubai", img: IMG.plate },
              { name: "Benny's", city: "Milan", img: IMG.cocktail },
              { name: "Print Paradise", city: "Paris", img: IMG.dinner },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 0.05}>
                <a href="#s09" className="group block">
                  <Parallax src={p.img} amount={30} className="aspect-[4/5] w-full mb-4" position="center" />
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-display text-xl tracking-tight">{p.name.toUpperCase()}</h4>
                    <span className="text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE]">{p.city}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>

      {/* ═══ 06 — CAPABILITIES ═══ */}
      <Panel index={6} bg="ivory">
        <div className="min-h-screen px-6 md:px-10 py-24 flex flex-col justify-center">
          <Reveal>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE] mb-14">06 — Capabilities</p>
          </Reveal>
          <div>
            {["Branding", "Campaigns", "Content", "Experiences", "Loyalty", "Websites"].map((c, i) => (
              <Reveal key={c} delay={i * 0.05}>
                <div className="group flex items-center gap-6 border-b border-[#0A0A0A]/15 py-3 cursor-default">
                  <span className="text-[10px] tracking-widest text-[#B9B5AE] w-8">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display leading-none tracking-tight transition-transform duration-500 group-hover:translate-x-3" style={{ fontSize: "clamp(2.2rem, 7vw, 6rem)" }}>
                    {c.toUpperCase()}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>

      {/* ═══ 07 — THE PLAYGROUND ═══ */}
      <Panel index={7} bg="black">
        <div className="min-h-screen px-6 md:px-10 py-24">
          <Reveal>
            <div className="flex items-baseline justify-between mb-14">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE]">07 — The Playground</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE]/50 hidden md:block">Experiments · Concepts · Moodboards</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Parallax src={IMG.cocktail} amount={50} scale={1.2} className="w-full h-full" />
                <div className="absolute inset-0 bg-[#0A0A0A]/30" />
                <p className="absolute bottom-6 left-6 font-editorial italic" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                  Attention is <span className="not-italic">earned.</span>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Parallax src={IMG.chef} amount={50} scale={1.2} className="w-full h-full" />
                <div className="absolute inset-0 bg-[#0A0A0A]/30" />
                <p className="absolute bottom-6 left-6 font-editorial" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                  Loyalty is <span className="italic">designed.</span>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="relative aspect-[21/9] overflow-hidden md:col-span-2">
                <Parallax src={IMG.crowd} amount={40} scale={1.15} position="center 60%" className="w-full h-full" />
                <div className="absolute inset-0 bg-[#0A0A0A]/40" />
                <p className="absolute bottom-8 left-8 font-editorial" style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)" }}>
                  People don&apos;t <span className="italic">share average.</span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Panel>

      {/* ═══ 08 — THE PLAYBOOK ═══ */}
      <Panel index={8} bg="ivory">
        <div className="min-h-screen px-6 md:px-10 py-24 flex flex-col justify-center">
          <Reveal>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE] mb-6">08 — The Playbook</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-editorial leading-[1.05] mb-16 max-w-3xl" style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)" }}>
              The industry&apos;s most valuable hospitality resource. <span className="italic text-[#B9B5AE]">Frameworks, not opinions.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0A0A0A]/10">
            {[
              { t: "Guest Psychology", d: "Why people choose, return, and tell others." },
              { t: "Brand Strategy", d: "Positioning that earns memory, not just attention." },
              { t: "The Loyalty Loop", d: "Belonging systems that never feel like a punch card." },
              { t: "Menu Architecture", d: "Designing the most-read marketing document you own." },
              { t: "The Attention Economy", d: "Spending and earning the only currency that matters." },
              { t: "Cultural Relevance", d: "Becoming part of the conversation, not interrupting it." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 0.04}>
                <div className="bg-[#F3F1EC] p-8 h-full group hover:bg-[#0A0A0A] hover:text-[#F3F1EC] transition-colors duration-500">
                  <span className="text-[9px] tracking-widest text-[#B9B5AE] group-hover:text-[#B9B5AE]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-editorial text-xl mt-4 mb-3">{f.t}</h3>
                  <p className="text-sm text-[#B9B5AE] leading-relaxed">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>

      {/* ═══ 09 — THE INVITATION ═══ */}
      <Panel index={9} bg="black">
        <div className="min-h-screen px-6 md:px-10 py-24 flex flex-col justify-between">
          <Reveal>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE]">09 — The Invitation</p>
          </Reveal>

          <div className="flex flex-col items-center text-center gap-8 py-16">
            <Reveal>
              <p className="font-editorial text-[#B9B5AE]" style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)" }}>
                If you want another agency, keep scrolling.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <h2 className="font-editorial leading-[1.05]" style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}>
                If you want people to <span className="italic">remember you</span>,<br />let&apos;s talk.
              </h2>
            </Reveal>
            <Reveal delay={0.4}>
              <a href="mailto:hello@notnormal.studio" className="group mt-6 inline-flex items-center gap-5">
                <span className="w-24 h-24 rounded-full border border-[#F3F1EC] flex items-center justify-center group-hover:bg-[#F3F1EC] group-hover:text-[#0A0A0A] transition-colors duration-500">
                  <span className="text-[10px] tracking-[0.25em] uppercase">Let&apos;s Talk</span>
                </span>
              </a>
            </Reveal>
          </div>

          {/* Footer */}
          <div className="border-t border-[#F3F1EC]/10 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE] mb-3">Contact</p>
                <a href="mailto:hello@notnormal.studio" className="block text-sm hover:opacity-60 transition-opacity">hello@notnormal.studio</a>
                <a href="tel:+971501234567" className="block text-sm hover:opacity-60 transition-opacity">+971 50 123 4567</a>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE] mb-3">Follow</p>
                <a href="#" className="block text-sm hover:opacity-60 transition-opacity">Instagram</a>
                <a href="#" className="block text-sm hover:opacity-60 transition-opacity">LinkedIn</a>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE] mb-3">Studios</p>
                <p className="text-sm">Dubai — Milan — Paris</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px] tracking-[0.2em] uppercase text-[#B9B5AE]/50">
              <span>© Not Normal Studio</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[#F3F1EC] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[#F3F1EC] transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
