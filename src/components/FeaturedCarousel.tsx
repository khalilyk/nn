"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const projects = [
  {
    name: "3FILS",
    city: "Dubai",
    desc: "From a bold idea to a dining experience that redefined a category. We built more than a brand, we built obsession.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "REVOLVER",
    city: "Sydney",
    desc: "A neighbourhood bar reimagined as a cultural anchor. Quiet rebellion, designed into every detail.",
    img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "MAISON DALI",
    city: "Beirut",
    desc: "Surrealism on a plate. A world, not a logo — each touchpoint a different act in the same play.",
    img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "OAKBERRY",
    city: "Dubai",
    desc: "Visual direction that turned a healthy habit into a status symbol. Crave-worthy, frame by frame.",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "BENNY'S",
    city: "Sydney",
    desc: "Concept, identity and energy for a room people don't want to leave. Built to be remembered.",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "PRINT PARADISE",
    city: "Beirut",
    desc: "Where editorial meets hospitality. A brand that reads like a magazine and tastes like a memory.",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
  },
];

/* Typing effect — types the title whenever `active` flips true */
function useTyping(text: string, active: boolean) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (!active) {
      setShown("");
      return;
    }
    let i = 0;
    setShown("");
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 75);
    return () => clearInterval(id);
  }, [text, active]);
  return shown;
}

/* Image that drifts toward the cursor */
function CursorImage({ src, label }: { src: string; label: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const w = wrap.current;
    const el = img.current;
    if (!w || !el) return;
    const r = w.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `scale(1.08) translate(${x * -28}px, ${y * -28}px)`;
  };
  const onLeave = () => {
    if (img.current) img.current.style.transform = "scale(1.05) translate(0px, 0px)";
  };

  return (
    <div
      ref={wrap}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0A0A]"
    >
      <div
        ref={img}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${src}')`,
          transform: "scale(1.05)",
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
        }}
      />
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[#F3F1EC] tracking-wide pointer-events-none drop-shadow-lg"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.6rem)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function FeaturedCarousel() {
  const [index, setIndex] = useState(0);
  const [delta, setDelta] = useState(0);
  const drag = useRef({ startX: 0, active: false });
  const trackRef = useRef<HTMLDivElement>(null);

  const clamp = (n: number) => Math.max(0, Math.min(projects.length - 1, n));

  const onDown = (e: React.PointerEvent) => {
    drag.current = { startX: e.clientX, active: true };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    setDelta(e.clientX - drag.current.startX);
  };
  const onUp = useCallback(() => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const w = trackRef.current?.offsetWidth || window.innerWidth;
    const threshold = w * 0.12;
    setDelta((d) => {
      if (d < -threshold) setIndex((i) => clamp(i + 1));
      else if (d > threshold) setIndex((i) => clamp(i - 1));
      return 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, [onUp]);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => clamp(i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => clamp(i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="w-full select-none">
      {/* Header row */}
      <div className="flex items-end justify-between mb-10">
        <div className="flex items-center gap-6">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/50">Featured Projects</span>
          <span className="text-[9px] tracking-[0.3em] text-[#0A0A0A]/30">
            {String(index + 1).padStart(2, "0")} — {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 hidden md:block">Drag</span>
          <div className="flex gap-3">
            <button
              onClick={() => setIndex((i) => clamp(i - 1))}
              disabled={index === 0}
              className="w-9 h-9 rounded-full border border-[#0A0A0A]/30 flex items-center justify-center text-sm disabled:opacity-20 hover:bg-[#0A0A0A] hover:text-[#F3F1EC] transition-colors"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              onClick={() => setIndex((i) => clamp(i + 1))}
              disabled={index === projects.length - 1}
              className="w-9 h-9 rounded-full border border-[#0A0A0A]/30 flex items-center justify-center text-sm disabled:opacity-20 hover:bg-[#0A0A0A] hover:text-[#F3F1EC] transition-colors"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Carousel viewport */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={onDown}
        onPointerMove={onMove}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{
            transform: `translateX(calc(${-index * 100}% + ${delta}px))`,
            transition: drag.current.active ? "none" : "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {projects.map((p, i) => (
            <Slide key={p.name} project={p} active={i === index} idx={i} />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-10 flex gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="h-px flex-1 bg-[#0A0A0A]/15 relative overflow-hidden"
            aria-label={`Go to project ${i + 1}`}
          >
            <span
              className="absolute inset-0 bg-[#0A0A0A] origin-left transition-transform duration-500"
              style={{ transform: `scaleX(${i === index ? 1 : 0})` }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function Slide({
  project,
  active,
  idx,
}: {
  project: (typeof projects)[number];
  active: boolean;
  idx: number;
}) {
  const typed = useTyping(project.name, active);

  return (
    <div className="w-full shrink-0 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center px-1">
      {/* Text */}
      <div className="md:col-span-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-6">
          Project {String(idx + 1).padStart(2, "0")}
        </p>
        <h3 className="font-display leading-none mb-5 min-h-[1.1em]" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
          {typed}
          <span className={`inline-block w-[3px] h-[0.8em] ml-1 align-middle bg-[#0A0A0A] ${active && typed.length < project.name.length ? "animate-pulse" : "opacity-0"}`} />
        </h3>
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#0A0A0A]/60 mb-6 flex items-center gap-3">
          {project.city} <span>→</span>
        </p>
        <p className="text-sm text-[#0A0A0A]/55 leading-relaxed max-w-xs mb-8">{project.desc}</p>
        <a
          href="#footer"
          className="text-[10px] tracking-[0.25em] uppercase border-b border-[#0A0A0A] pb-1 inline-flex items-center gap-3 hover:opacity-60 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          View Project <span>→</span>
        </a>
      </div>

      {/* Image */}
      <div className="md:col-span-8">
        <CursorImage src={project.img} label={project.name} />
      </div>
    </div>
  );
}
