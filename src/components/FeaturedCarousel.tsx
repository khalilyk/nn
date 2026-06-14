"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Project = {
  name: string;
  tagline: string;
  city: string;
  year: string;
  cat: string;
  desc: string;
  img: string;
};

const projects: Project[] = [
  {
    name: "3FILS",
    tagline: "Bold, Quiet, Unforgettable.",
    city: "Dubai",
    year: "2019",
    cat: "Branding",
    desc: "From a bold idea to a dining experience that redefined a category. We built more than a brand, we built obsession — every plate, every touchpoint designed to be remembered.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Revolver",
    tagline: "Gather, Linger, Belong.",
    city: "Sydney",
    year: "2021",
    cat: "Identity",
    desc: "A neighbourhood bar reimagined as a cultural anchor. Quiet rebellion designed into every detail, from the identity to the room people never want to leave.",
    img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Maison Dali",
    tagline: "Dream, Dine, Wonder.",
    city: "Beirut",
    year: "2022",
    cat: "Branding",
    desc: "Surrealism on a plate. We built a world, not a logo — each touchpoint a different act in the same play, designed to surprise and seduce in equal measure.",
    img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Oakberry",
    tagline: "Crave, Glow, Repeat.",
    city: "Dubai",
    year: "2023",
    cat: "Content",
    desc: "Visual direction that turned a healthy habit into a status symbol. Crave-worthy frame by frame, built to be screenshot, shared and remembered.",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Benny's",
    tagline: "Eat, Drink, Stay.",
    city: "Sydney",
    year: "2024",
    cat: "Identity",
    desc: "Concept, identity and energy for a room people don't want to leave. A brand built around the feeling of a great night that never quite ends.",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Print Paradise",
    tagline: "Read, Taste, Remember.",
    city: "Beirut",
    year: "2025",
    cat: "Print",
    desc: "Where editorial meets hospitality. A brand that reads like a magazine and tastes like a memory, printed across every surface worth touching.",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
  },
];

/* Simple line-art "cheers" illustration, echoing the reference centrepiece. */
function CheersMark() {
  return (
    <svg viewBox="0 0 220 90" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-full max-w-[260px]" aria-hidden>
      {/* left wine glass, tilted */}
      <g transform="rotate(-16 50 45)">
        <path d="M38 20 h24 l-4 18 a8 8 0 0 1 -16 0 z" />
        <path d="M50 38 v22" />
        <path d="M40 62 h20" />
      </g>
      {/* sparkles */}
      <path d="M22 14 v8 M18 18 h8" />
      <path d="M196 24 v6 M193 27 h6" />
      {/* center tumbler */}
      <path d="M98 24 h26 l-3 38 h-20 z" />
      <path d="M100 40 h22" />
      {/* straw */}
      <path d="M118 24 l8 -12" />
      {/* right coffee cup */}
      <path d="M150 34 h34 l-4 24 a6 6 0 0 1 -6 5 h-14 a6 6 0 0 1 -6 -5 z" />
      <path d="M184 38 a9 9 0 0 1 0 16" />
      <path d="M150 70 h40" />
      {/* steam */}
      <path d="M162 26 q3 -5 0 -10 M172 26 q3 -5 0 -10" />
    </svg>
  );
}

export default function FeaturedCarousel() {
  const [index, setIndex] = useState(0);
  const drag = useRef({ startX: 0, active: false });

  const clamp = (n: number) => (n + projects.length) % projects.length;
  const go = useCallback((dir: number) => setIndex((i) => clamp(i + dir)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onDown = (e: React.PointerEvent) => {
    drag.current = { startX: e.clientX, active: true };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onUp = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const dx = e.clientX - drag.current.startX;
    if (dx < -60) go(1);
    else if (dx > 60) go(-1);
  };

  const p = projects[index];

  return (
    <div className="w-full select-none">
      {/* slim top row */}
      <div className="flex items-end justify-between gap-6 mb-6">
        <div className="flex items-baseline gap-4">
          <span className="font-editorial italic text-[#0A0A0A]/50" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.25rem)" }}>02</span>
          <h2 className="font-editorial leading-none" style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)" }}>Works</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 hidden md:block">{p.cat}</span>
          <div className="flex gap-2.5">
            <button onClick={() => go(-1)} aria-label="Previous" className="w-9 h-9 rounded-full border border-[#0A0A0A]/30 flex items-center justify-center text-sm hover:bg-[#0A0A0A] hover:text-[#81D742] transition-colors">←</button>
            <button onClick={() => go(1)} aria-label="Next" className="w-9 h-9 rounded-full border border-[#0A0A0A]/30 flex items-center justify-center text-sm hover:bg-[#0A0A0A] hover:text-[#81D742] transition-colors">→</button>
          </div>
        </div>
      </div>

      {/* split card */}
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-[0_40px_100px_-40px_rgba(0,0,0,0.45)]">
        {/* LEFT — cream content panel */}
        <div className="relative bg-[#F6F1E4] text-[#3A332B] flex flex-col justify-between p-8 md:p-12 min-h-[460px] md:min-h-[600px] order-2 md:order-1">
          {/* heading + tag */}
          <div key={p.name} className="animate-[fadeUp_0.5s_ease]">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <h3 className="font-editorial leading-[1.05]" style={{ fontSize: "clamp(2rem, 3.6vw, 3.2rem)" }}>
                {p.tagline}
              </h3>
              <span className="text-[#3A332B]/55" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)" }}>
                {p.city} / {p.year.slice(2)}
              </span>
            </div>
          </div>

          {/* centre illustration */}
          <div className="flex justify-center text-[#C9A227] py-8">
            <CheersMark />
          </div>

          {/* body */}
          <div key={`${p.name}-b`} className="animate-[fadeUp_0.6s_ease]">
            <p className="leading-relaxed text-[#3A332B]/85 max-w-md" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)" }}>
              {p.desc}
            </p>
          </div>
        </div>

        {/* RIGHT — full-bleed photo */}
        <div
          onPointerDown={onDown}
          onPointerUp={onUp}
          data-cursor="grab"
          className="relative min-h-[300px] md:min-h-[600px] overflow-hidden bg-[#0A0A0A] cursor-grab active:cursor-grabbing order-1 md:order-2"
        >
          {projects.map((pr, i) => (
            <div
              key={pr.name}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ backgroundImage: `url('${pr.img}')`, opacity: i === index ? 1 : 0 }}
            />
          ))}
          <div className="absolute bottom-4 right-4 z-10 text-[#F3F1EC] font-display tracking-tight bg-[#0A0A0A]/40 backdrop-blur-sm px-3 py-1 rounded-full" style={{ fontSize: "0.85rem" }}>
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* progress dots */}
      <div className="mt-6 flex gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to project ${i + 1}`}
            className="h-px flex-1 bg-[#0A0A0A]/15 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-[#0A0A0A] origin-left transition-transform duration-500" style={{ transform: `scaleX(${i === index ? 1 : 0})` }} />
          </button>
        ))}
      </div>
    </div>
  );
}
