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

// each poster weathers differently — stains, fade, crease, a torn corner
const WEATHER = [
  { stain1: "18% 82%", stain2: "86% 14%", stainO: 0.5, fade: "72% 18%", crease: 17, tear: "tr" },
  { stain1: "82% 76%", stain2: "10% 22%", stainO: 0.42, fade: "24% 72%", crease: -13, tear: "bl" },
  { stain1: "48% 92%", stain2: "90% 44%", stainO: 0.55, fade: "38% 14%", crease: 7, tear: "tl" },
  { stain1: "14% 26%", stain2: "76% 86%", stainO: 0.46, fade: "62% 62%", crease: -23, tear: "br" },
  { stain1: "60% 8%", stain2: "22% 70%", stainO: 0.5, fade: "82% 82%", crease: 12, tear: "tr" },
];

// unique crumpled-paper relief per poster (seed + frequency + fold positions)
const PAPER = [
  { seed: 7, freq: "0.012 0.016", foldX: "37%", foldY: "56%" },
  { seed: 23, freq: "0.014 0.011", foldX: "63%", foldY: "41%" },
  { seed: 44, freq: "0.011 0.018", foldX: "49%", foldY: "61%" },
  { seed: 61, freq: "0.016 0.013", foldX: "44%", foldY: "47%" },
  { seed: 88, freq: "0.013 0.017", foldX: "58%", foldY: "52%" },
];

function crumpleURI(seed: number, freq: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='420' height='560'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='4' seed='${seed}' stitchTiles='stitch' result='n'/><feDiffuseLighting in='n' lighting-color='#ffffff' surfaceScale='9' diffuseConstant='1'><feDistantLight azimuth='235' elevation='34'/></feDiffuseLighting></filter><rect width='100%' height='100%' filter='url(#f)'/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// each poster peels off the wall a little differently
const LIFTS = [
  { rot: -5, x: -14, y: -26, origin: "bottom right" },
  { rot: 4, x: 12, y: -20, origin: "bottom left" },
  { rot: -3.5, x: -8, y: -30, origin: "bottom center" },
  { rot: 6, x: 16, y: -16, origin: "bottom left" },
  { rot: 3, x: 10, y: -28, origin: "bottom right" },
];

function Poster({ p, idx }: { p: Post; idx: number }) {
  const [hover, setHover] = useState(false);
  const L = LIFTS[idx % LIFTS.length];
  const W = WEATHER[idx % WEATHER.length];
  const P = PAPER[idx % PAPER.length];
  return (
    <article
      data-cursor="Read"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="group relative cursor-pointer transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        zIndex: hover ? 40 : 1,
        transformOrigin: L.origin,
        transform: hover ? `translate(${L.x}px, ${L.y}px) rotate(${L.rot}deg) scale(1.06)` : "translate(0,0) rotate(0deg) scale(1)",
      }}
    >
      <div
        className="relative flex flex-col aspect-[3/4] overflow-hidden ring-1 ring-black/25 transition-shadow duration-[450ms]"
        style={{
          background: p.bg,
          color: p.ink,
          boxShadow: hover
            ? "0 50px 90px -20px rgba(0,0,0,0.85), 0 12px 28px -8px rgba(0,0,0,0.6)"
            : "10px 0 30px -6px rgba(0,0,0,0.55), 0 18px 40px -14px rgba(0,0,0,0.55)",
        }}
      >
        {/* lifted-corner sheen — sells the peel */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-[450ms]"
          style={{
            opacity: hover ? 1 : 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 22%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.22) 100%)",
          }}
        />
        {/* paper grain */}
        <span aria-hidden className="pointer-events-none absolute inset-0 z-20 opacity-[0.07] mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        {/* weathering: discolour stains */}
        <span aria-hidden className="pointer-events-none absolute inset-0 z-20 mix-blend-multiply" style={{ opacity: W.stainO, background: `radial-gradient(ellipse at ${W.stain1}, rgba(74,55,32,0.55), transparent 55%), radial-gradient(circle at ${W.stain2}, rgba(40,32,22,0.5), transparent 50%)` }} />
        {/* weathering: sun-faded patch */}
        <span aria-hidden className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-50" style={{ background: `radial-gradient(circle at ${W.fade}, rgba(255,255,255,0.85), transparent 55%)` }} />
        {/* crumpled-paper relief (unique per poster) */}
        <span aria-hidden className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light" style={{ opacity: 0.9, backgroundImage: `url("${crumpleURI(P.seed, P.freq)}")`, backgroundSize: "cover" }} />
        <span aria-hidden className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay" style={{ opacity: 0.4, backgroundImage: `url("${crumpleURI(P.seed, P.freq)}")`, backgroundSize: "cover" }} />
        {/* fold lines */}
        <span aria-hidden className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light opacity-70" style={{ background: `linear-gradient(90deg, transparent calc(${P.foldX} - 1.5px), rgba(0,0,0,0.22) ${P.foldX}, rgba(255,255,255,0.32) calc(${P.foldX} + 1.5px), transparent calc(${P.foldX} + 3px)), linear-gradient(0deg, transparent calc(${P.foldY} - 1.5px), rgba(0,0,0,0.2) ${P.foldY}, rgba(255,255,255,0.28) calc(${P.foldY} + 1.5px), transparent calc(${P.foldY} + 3px))` }} />

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

  const items = [...POSTS, ...POSTS, ...POSTS];

  return (
    <section id="journal" className="scroll-mt-20 relative bg-[#1A1714] text-[#F3F1EC] pt-20 md:pt-28 pb-10 overflow-x-clip" data-cursor-color="#F3F1EC">
      <span aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='b'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.04' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23b)'/%3E%3C/svg%3E\")" }} />

      {/* header (padded) */}
      <div className="relative px-6 sm:px-10 md:px-16">
        <div className="text-center mb-14 md:mb-20">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]/45 mb-4">Notes</p>
          <h2 className="font-display uppercase tracking-tight leading-[0.92]" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Notes from<br />the studio
          </h2>
        </div>
      </div>

      {/* draggable, looping poster track */}
      <div
        className="relative overflow-x-clip overflow-y-visible cursor-grab active:cursor-grabbing touch-pan-y shadow-[0_-30px_80px_-30px_rgba(0,0,0,0.9)]"
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
              <Poster p={p} idx={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
