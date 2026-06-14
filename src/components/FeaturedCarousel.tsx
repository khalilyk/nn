"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Project = {
  name: string;
  sub: string;
  city: string;
  year: string;
  img: string;
};

const projects: Project[] = [
  { name: "3FILS", sub: "Reimagining a Waterfront Icon", city: "Dubai", year: "2019", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80" },
  { name: "Revolver", sub: "A Neighbourhood Bar, Reborn", city: "Sydney", year: "2021", img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1800&q=80" },
  { name: "Maison Dali", sub: "Surrealism, Served", city: "Beirut", year: "2022", img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1800&q=80" },
  { name: "Oakberry", sub: "A Healthy Habit Made Iconic", city: "Dubai", year: "2023", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1800&q=80" },
  { name: "Benny's", sub: "A Room You Never Leave", city: "Sydney", year: "2024", img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1800&q=80" },
  { name: "Print Paradise", sub: "Editorial Meets Hospitality", city: "Beirut", year: "2025", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=80" },
  { name: "Kinoya", sub: "An Izakaya With a Soul", city: "Dubai", year: "2022", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=80" },
  { name: "Tony's Woodfire", sub: "Fire, Smoke & Story", city: "Sydney", year: "2023", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80" },
  { name: "Shanghai Me", sub: "Old-World Glamour, Rebuilt", city: "Dubai", year: "2021", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=80" },
  { name: "Mimi Kakushi", sub: "1920s Osaka, Reborn in Dubai", city: "Dubai", year: "2024", img: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1800&q=80" },
];

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
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 hidden md:block">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2.5">
            <button onClick={() => go(-1)} aria-label="Previous" className="w-9 h-9 rounded-full border border-[#0A0A0A]/30 flex items-center justify-center text-sm hover:bg-[#0A0A0A] hover:text-[#81D742] transition-colors">←</button>
            <button onClick={() => go(1)} aria-label="Next" className="w-9 h-9 rounded-full border border-[#0A0A0A]/30 flex items-center justify-center text-sm hover:bg-[#0A0A0A] hover:text-[#81D742] transition-colors">→</button>
          </div>
        </div>
      </div>

      {/* slide */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
        {/* image + overlaid name */}
        <div
          onPointerDown={onDown}
          onPointerUp={onUp}
          data-cursor="grab"
          className="md:col-span-3 relative aspect-[16/10] w-full overflow-hidden bg-[#0A0A0A] cursor-grab active:cursor-grabbing rounded-sm"
        >
          {projects.map((pr, i) => (
            <div
              key={pr.name}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ backgroundImage: `url('${pr.img}')`, opacity: i === index ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <h3
            key={p.name}
            className="absolute left-6 md:left-10 bottom-6 md:bottom-9 text-white font-sans font-bold tracking-tight leading-[0.95] animate-[fadeUp_0.5s_ease] drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.4rem)" }}
          >
            {p.name}
          </h3>
        </div>

        {/* caption */}
        <div className="md:col-span-2">
          <p key={`${p.name}-c`} className="font-sans leading-snug text-[#0A0A0A] animate-[fadeUp_0.55s_ease]" style={{ fontSize: "clamp(1.1rem, 1.7vw, 1.5rem)" }}>
            {p.name}<br />
            <span className="text-[#0A0A0A]/60">{p.sub}</span>
          </p>
          <p className="mt-6 text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45">
            {p.city} · {p.year}
          </p>
        </div>
      </div>

      {/* progress dots */}
      <div className="mt-8 flex gap-2">
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
