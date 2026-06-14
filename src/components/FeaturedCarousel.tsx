"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Project = {
  name: string;
  city: string;
  cat: string;
  year: string;
  desc: string;
  img: string;
};

const projects: Project[] = [
  {
    name: "3FILS",
    city: "Dubai",
    cat: "Branding",
    year: "2019",
    desc: "From a bold idea to a dining experience that redefined a category. We built more than a brand, we built obsession.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Revolver",
    city: "Sydney",
    cat: "Identity",
    year: "2021",
    desc: "A neighbourhood bar reimagined as a cultural anchor. Quiet rebellion, designed into every detail.",
    img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Maison Dali",
    city: "Beirut",
    cat: "Branding",
    year: "2022",
    desc: "Surrealism on a plate. A world, not a logo, each touchpoint a different act in the same play.",
    img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Oakberry",
    city: "Dubai",
    cat: "Content",
    year: "2023",
    desc: "Visual direction that turned a healthy habit into a status symbol. Crave-worthy, frame by frame.",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Benny's",
    city: "Sydney",
    cat: "Identity",
    year: "2024",
    desc: "Concept, identity and energy for a room people don't want to leave. Built to be remembered.",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Print Paradise",
    city: "Beirut",
    cat: "Print",
    year: "2025",
    desc: "Where editorial meets hospitality. A brand that reads like a magazine and tastes like a memory.",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function FeaturedCarousel() {
  const [index, setIndex] = useState(0);
  const drag = useRef({ startX: 0, active: false });
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);

  const clamp = (n: number) => (n + projects.length) % projects.length;
  const go = useCallback((dir: number) => setIndex((i) => clamp(i + dir)), []);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // drag to advance
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

  // image drifts toward cursor
  const onMove = (e: React.MouseEvent) => {
    const w = wrap.current, el = img.current;
    if (!w || !el) return;
    const r = w.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `scale(1.08) translate(${x * -22}px, ${y * -22}px)`;
  };
  const onLeave = () => {
    if (img.current) img.current.style.transform = "scale(1.05) translate(0,0)";
  };

  const p = projects[index];

  return (
    <div className="w-full select-none">
      {/* Heading */}
      <div className="flex items-end justify-between gap-6 mb-8">
        <div className="flex items-baseline gap-5 md:gap-8">
          <span className="font-editorial italic text-[#0A0A0A]/50" style={{ fontSize: "clamp(1rem, 1.6vw, 1.4rem)" }}>02</span>
          <h2 className="font-editorial leading-none" style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}>Works</h2>
        </div>
        <span className="font-editorial italic text-[#0A0A0A]/50 hidden sm:block" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.25rem)" }}>
          2019 — 2025
        </span>
      </div>

      {/* Split screen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center border-t border-[#0A0A0A]/15 pt-10 md:pt-12">
        {/* LEFT — details */}
        <div className="order-2 md:order-1">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-6">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} — {p.cat} · {p.city}
          </p>
          <h3 key={p.name} className="font-display uppercase leading-[0.92] tracking-tight mb-6 animate-[fadeUp_0.5s_ease]" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
            {p.name}
          </h3>
          <p className="text-sm md:text-[15px] text-[#0A0A0A]/60 leading-relaxed max-w-sm mb-8">{p.desc}</p>

          <a
            href="#footer"
            data-cursor="tap"
            onClick={(e) => e.stopPropagation()}
            className="text-[10px] tracking-[0.25em] uppercase border-b border-[#0A0A0A] pb-1 inline-flex items-center gap-3 hover:opacity-60 transition-opacity"
          >
            View Project <span>→</span>
          </a>

          {/* controls */}
          <div className="flex items-center gap-5 mt-12">
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="w-11 h-11 rounded-full border border-[#0A0A0A]/30 flex items-center justify-center text-sm hover:bg-[#0A0A0A] hover:text-[#81D742] transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="w-11 h-11 rounded-full border border-[#0A0A0A]/30 flex items-center justify-center text-sm hover:bg-[#0A0A0A] hover:text-[#81D742] transition-colors"
            >
              →
            </button>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 ml-2 hidden md:block">Drag or swipe</span>
          </div>
        </div>

        {/* RIGHT — image */}
        <div className="order-1 md:order-2">
          <div
            ref={wrap}
            onPointerDown={onDown}
            onPointerUp={onUp}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            data-cursor="grab"
            className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden bg-[#0A0A0A] rounded-sm cursor-grab active:cursor-grabbing"
          >
            {projects.map((pr, i) => (
              <div
                key={pr.name}
                ref={i === index ? img : undefined}
                className="absolute inset-0 bg-cover bg-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  backgroundImage: `url('${pr.img}')`,
                  opacity: i === index ? 1 : 0,
                  transform: "scale(1.05)",
                }}
              />
            ))}
            {/* counter */}
            <div className="absolute bottom-4 right-4 z-10 text-[#F3F1EC] font-display tracking-tight bg-[#0A0A0A]/40 backdrop-blur-sm px-3 py-1 rounded-full" style={{ fontSize: "0.85rem" }}>
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
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
      </div>
    </div>
  );
}
