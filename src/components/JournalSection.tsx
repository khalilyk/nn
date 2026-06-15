"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Base = {
  cat: string;
  date: string;
  title: string;
  read: string;
  bg: string;
  ink: string;
  rotate: string;
};

type SplitPost = Base & {
  variant: "split";
  top: string;
  bottom: string;
  img: string;
};
type TypePost = Base & {
  variant: "type";
  eyebrow: string;
  lines: string[];
  footer: string;
};
type BlahPost = Base & {
  variant: "blah";
  word: string;
  rows: number;
  line: string;
  img: string;
};

type Post = SplitPost | TypePost | BlahPost;

const POSTS: Post[] = [
  {
    variant: "split",
    cat: "Branding",
    date: "May 2026",
    title: "Why Nobody Remembers Normal",
    read: "5 min read",
    bg: "#BBD9F2",
    ink: "#0A0A0A",
    rotate: "-2deg",
    top: "BRANDS NOT",
    bottom: "BACKGROUND",
    img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80",
  },
  {
    variant: "type",
    cat: "Hospitality",
    date: "Apr 2026",
    title: "Menus That Actually Sell",
    read: "6 min read",
    bg: "#D8F24A",
    ink: "#0A0A0A",
    rotate: "1.5deg",
    eyebrow: "Quality over noise",
    lines: ["MENUS", "THAT MAKE", "MONEY…"],
    footer: "Without the crafty bullshit",
  },
  {
    variant: "blah",
    cat: "Content",
    date: "Mar 2026",
    title: "Say Something Worth Hearing",
    read: "4 min read",
    bg: "#ECE7DA",
    ink: "#0A0A0A",
    rotate: "-1deg",
    word: "BLAH",
    rows: 5,
    line: "Stop sounding like everyone else.",
    img: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=700&q=80",
  },
  {
    variant: "type",
    cat: "Experience",
    date: "Feb 2026",
    title: "The First 90 Seconds",
    read: "5 min read",
    bg: "#81D742",
    ink: "#0A0A0A",
    rotate: "2deg",
    eyebrow: "First impressions",
    lines: ["THE", "FIRST 90", "SECONDS"],
    footer: "Decide everything",
  },
];

function Badge({ ink }: { ink: string }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border w-9 h-9 text-[10px] font-display tracking-tight shrink-0" style={{ borderColor: ink, color: ink }}>
      NN
    </span>
  );
}

function Poster({ p }: { p: Post }) {
  return (
    <article
      data-cursor="Read"
      className="group relative cursor-pointer transition-[transform,z-index] duration-300 hover:z-20 hover:-translate-y-2"
    >
      <div
        className="relative flex flex-col aspect-[3/4] overflow-hidden ring-1 ring-black/25 shadow-[10px_0_30px_-6px_rgba(0,0,0,0.6),0_24px_50px_-12px_rgba(0,0,0,0.65)]"
        style={{ background: p.bg, color: p.ink }}
      >
        {/* paper grain */}
        <span aria-hidden className="pointer-events-none absolute inset-0 z-20 opacity-[0.07] mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        {/* ── SPLIT: word / image / word ── */}
        {p.variant === "split" && (
          <div className="relative z-10 flex flex-col h-full p-5">
            <h3 className="font-sans font-bold uppercase tracking-tight leading-[0.9]" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)" }}>{p.top}</h3>
            <div className="relative flex-1 my-4 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute left-2 bottom-2"><Badge ink={p.ink} /></span>
            </div>
            <h3 className="font-sans font-bold uppercase tracking-tight leading-[0.9]" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)" }}>{p.bottom}</h3>
          </div>
        )}

        {/* ── TYPE: eyebrow / big slogan / footer ── */}
        {p.variant === "type" && (
          <div className="relative z-10 flex flex-col h-full p-6 text-center">
            <p className="text-[9px] tracking-[0.35em] uppercase opacity-70">{p.eyebrow}</p>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-sans font-bold uppercase tracking-tight leading-[0.95]" style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.6rem)" }}>
                {p.lines.map((l, i) => <span key={i} className="block">{l}</span>)}
              </h3>
            </div>
            <p className="text-[9px] tracking-[0.3em] uppercase opacity-70">{p.footer}</p>
          </div>
        )}

        {/* ── BLAH: repeated word + product image ── */}
        {p.variant === "blah" && (
          <div className="relative z-10 h-full overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-center -ml-2">
              {Array.from({ length: p.rows }).map((_, i) => (
                <span key={i} className="font-sans font-bold uppercase tracking-tight leading-[0.92] whitespace-nowrap" style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)" }}>{p.word}</span>
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt="" className="absolute right-0 bottom-0 h-[78%] w-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)]" />
            <span className="absolute left-4 top-1/2 -translate-y-1/2"><Badge ink={p.ink} /></span>
          </div>
        )}

      </div>
    </article>
  );
}

/* The Journal — a draggable, looping wall of pasted posters. */
export default function JournalSection() {
  const track = useRef<HTMLDivElement>(null);
  const setW = useRef(0);
  const x = useRef(0);
  const drag = useRef<{ active: boolean; startX: number; startVal: number; moved: boolean }>({ active: false, startX: 0, startVal: 0, moved: false });
  const [, force] = useState(0);

  // measure one set's width (track holds 3 copies)
  useEffect(() => {
    const measure = () => {
      if (track.current) setW.current = track.current.scrollWidth / 3;
      force((n) => n + 1);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const apply = useCallback(() => {
    const el = track.current;
    if (!el || !setW.current) return;
    const m = ((x.current % setW.current) + setW.current) % setW.current; // [0, setW)
    el.style.transform = `translate3d(${m - setW.current}px,0,0)`; // [-setW, 0)
  }, []);

  useEffect(() => { apply(); });

  const move = useCallback((dx: number) => { x.current += dx; apply(); }, [apply]);

  const onDown = (e: React.PointerEvent) => {
    drag.current = { active: true, startX: e.clientX, startVal: x.current, moved: false };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    if (track.current) track.current.style.transition = "none";
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const d = e.clientX - drag.current.startX;
    if (Math.abs(d) > 4) drag.current.moved = true;
    x.current = drag.current.startVal + d;
    apply();
  };
  const onUp = () => { drag.current.active = false; };

  // arrow nav, one poster-ish step
  const step = (dir: number) => {
    if (track.current) track.current.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
    const itemW = setW.current ? setW.current / POSTS.length : 320;
    move(dir * -itemW);
    window.setTimeout(() => { if (track.current) track.current.style.transition = "none"; }, 620);
  };

  const items = [...POSTS, ...POSTS, ...POSTS];

  return (
    <section id="journal" className="scroll-mt-20 relative bg-[#1A1714] text-[#F3F1EC] pt-20 md:pt-28 overflow-hidden" data-cursor-color="#F3F1EC">
      <span aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='b'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.04' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23b)'/%3E%3C/svg%3E\")" }} />

      {/* header (padded) */}
      <div className="relative px-6 sm:px-10 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14 md:mb-20">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]/45 mb-4">The Journal</p>
            <h2 className="font-display uppercase tracking-tight leading-[0.92]" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              Notes from<br />the studio
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-5">
            <p className="font-editorial italic text-[#F3F1EC]/55 max-w-xs md:text-right" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>
              Pasted up like posters. Drag to flick through.
            </p>
            <div className="flex items-center gap-3">
              <button onClick={() => step(-1)} aria-label="Previous" className="w-10 h-10 rounded-full border border-[#F3F1EC]/30 flex items-center justify-center text-sm hover:bg-[#F3F1EC] hover:text-[#1A1714] transition-colors">←</button>
              <button onClick={() => step(1)} aria-label="Next" className="w-10 h-10 rounded-full border border-[#F3F1EC]/30 flex items-center justify-center text-sm hover:bg-[#F3F1EC] hover:text-[#1A1714] transition-colors">→</button>
            </div>
          </div>
        </div>
      </div>

      {/* draggable, looping poster track */}
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y shadow-[0_-30px_80px_-30px_rgba(0,0,0,0.9)]"
        data-cursor="Drag"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onUp}
      >
        <div ref={track} className="flex w-max select-none">
          {items.map((p, i) => (
            <div
              key={`${p.title}-${i}`}
              className="shrink-0 w-[72vw] sm:w-[44vw] md:w-[320px] lg:w-[360px]"
              onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); } }}
            >
              <Poster p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
