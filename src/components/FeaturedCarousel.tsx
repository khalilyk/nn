"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

type Project = {
  name: string;
  sub: string;
  city: string;
  year: string;
  cat: string;
  desc: string;
  img: string;
};

const projects: Project[] = [
  { name: "3FILS", sub: "Reimagining a Waterfront Icon", city: "Dubai", year: "2019", cat: "Branding", desc: "From a bold idea to a dining experience that redefined a category. We built more than a brand, we built obsession — every plate and touchpoint designed to be remembered.", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80" },
  { name: "Revolver", sub: "A Neighbourhood Bar, Reborn", city: "Sydney", year: "2021", cat: "Identity", desc: "A neighbourhood bar reimagined as a cultural anchor. Quiet rebellion designed into every detail, from the identity to the room people never want to leave.", img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1800&q=80" },
  { name: "Maison Dali", sub: "Surrealism, Served", city: "Beirut", year: "2022", cat: "Branding", desc: "Surrealism on a plate. We built a world, not a logo — each touchpoint a different act in the same play, designed to surprise and seduce in equal measure.", img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1800&q=80" },
  { name: "Oakberry", sub: "A Healthy Habit Made Iconic", city: "Dubai", year: "2023", cat: "Content", desc: "Visual direction that turned a healthy habit into a status symbol. Crave-worthy frame by frame, built to be screenshot, shared and remembered.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1800&q=80" },
  { name: "Benny's", sub: "A Room You Never Leave", city: "Sydney", year: "2024", cat: "Identity", desc: "Concept, identity and energy for a room people don't want to leave. A brand built around the feeling of a great night that never quite ends.", img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1800&q=80" },
  { name: "Print Paradise", sub: "Editorial Meets Hospitality", city: "Beirut", year: "2025", cat: "Print", desc: "Where editorial meets hospitality. A brand that reads like a magazine and tastes like a memory, printed across every surface worth touching.", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=80" },
  { name: "Kinoya", sub: "An Izakaya With a Soul", city: "Dubai", year: "2022", cat: "Branding", desc: "An izakaya with a soul — a warm, lived-in identity that carries the intimacy of a Tokyo back-alley into a Dubai dining room.", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=80" },
  { name: "Tony's Woodfire", sub: "Fire, Smoke & Story", city: "Sydney", year: "2023", cat: "Content", desc: "Fire, smoke and story. A bold, tactile brand built around the primal pull of cooking over open flame.", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80" },
  { name: "Shanghai Me", sub: "Old-World Glamour, Rebuilt", city: "Dubai", year: "2021", cat: "Identity", desc: "Old-world glamour, rebuilt for today. A cinematic identity steeped in 1930s Shanghai, dialled up for a modern fine-dining stage.", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=80" },
  { name: "Mimi Kakushi", sub: "1920s Osaka, Reborn in Dubai", city: "Dubai", year: "2024", cat: "Branding", desc: "1920s Osaka reborn in Dubai. A richly detailed world of jazz-age Japan, translated into every plate, menu and surface.", img: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1800&q=80" },
];

export default function FeaturedCarousel() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [gi, setGi] = useState(0);
  const [mounted, setMounted] = useState(false);
  const drag = useRef({ startX: 0, active: false });

  const clamp = (n: number) => (n + projects.length) % projects.length;
  const go = useCallback((dir: number) => setIndex((i) => clamp(i + dir)), []);

  useEffect(() => setMounted(true), []);
  useEffect(() => { setGi(0); }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(null); return; }
      if (open !== null) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, open]);

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
    else setOpen(index); // a click (not a drag) opens the project
  };

  const p = projects[index];
  const doc = open !== null ? projects[open] : null;

  return (
    <div className="w-full select-none text-[#F3F1EC]">
      {/* slide */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-stretch">
        {/* image + overlaid name */}
        <div
          onPointerDown={onDown}
          onPointerUp={onUp}
          data-cursor="View project"
          className="md:col-span-7 relative aspect-[16/10] md:aspect-auto md:min-h-[560px] w-full overflow-hidden bg-[#0A0A0A] cursor-pointer"
        >
          {projects.map((pr, i) => (
            <div
              key={pr.name}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ backgroundImage: `url('${pr.img}')`, opacity: i === index ? 1 : 0 }}
            />
          ))}
          <h3
            key={p.name}
            className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 text-white font-sans font-bold tracking-tight leading-[0.95] animate-[fadeUp_0.5s_ease] drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.6rem)" }}
          >
            {p.name}
          </h3>
        </div>

        {/* caption on dark */}
        <div className="md:col-span-5 flex flex-col justify-center px-2 md:px-12">
          <p key={`${p.name}-c`} className="font-sans leading-snug animate-[fadeUp_0.55s_ease]" style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)" }}>
            {p.name}<br />
            {p.sub}
          </p>

          <button
            onClick={() => setOpen(index)}
            data-cursor="Open"
            className="mt-6 self-start inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase border-b border-[#F3F1EC] pb-1 hover:opacity-60 transition-opacity"
          >
            View Project <span>→</span>
          </button>

          {/* controls */}
          <div className="flex items-center gap-5 mt-10">
            <button onClick={() => go(-1)} aria-label="Previous" className="w-10 h-10 rounded-full border border-[#F3F1EC]/30 flex items-center justify-center text-sm hover:bg-[#F3F1EC] hover:text-[#1C1C1C] transition-colors">←</button>
            <button onClick={() => go(1)} aria-label="Next" className="w-10 h-10 rounded-full border border-[#F3F1EC]/30 flex items-center justify-center text-sm hover:bg-[#F3F1EC] hover:text-[#1C1C1C] transition-colors">→</button>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]/40 ml-2">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* project popup — portaled to body to escape the transformed panel */}
      {mounted && doc && createPortal(
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8" data-cursor="Close" onClick={() => setOpen(null)}>
          <div className="absolute inset-0 bg-[#0A0A0A]/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-4xl max-h-[88vh] flex flex-col md:grid md:grid-cols-2 overflow-hidden rounded-3xl bg-[#161513] text-[#F3F1EC] shadow-[0_50px_140px_-40px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
            data-cursor=""
          >
            {/* image carousel */}
            {(() => {
              const gallery = [doc.img, projects[(open! + 3) % projects.length].img, projects[(open! + 6) % projects.length].img];
              const body = [
                doc.desc,
                `Working across ${doc.city}, we shaped every touchpoint — identity, environment and content — into one coherent story that feels unmistakably ${doc.name}.`,
                `The result: a ${doc.cat.toLowerCase()}-led brand that earns attention, drives footfall and keeps people coming back. Not normal, by design.`,
              ];
              return (
                <>
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden bg-[#0A0A0A]" data-cursor="grab">
                    {gallery.map((src, i) => (
                      <div
                        key={src + i}
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                        style={{ backgroundImage: `url('${src}')`, opacity: i === gi ? 1 : 0 }}
                      />
                    ))}
                    <button onClick={() => setGi((g) => (g - 1 + gallery.length) % gallery.length)} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-white/40 bg-[#0A0A0A]/30 backdrop-blur-sm flex items-center justify-center text-sm text-white hover:bg-white hover:text-[#0A0A0A] transition-colors">←</button>
                    <button onClick={() => setGi((g) => (g + 1) % gallery.length)} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-white/40 bg-[#0A0A0A]/30 backdrop-blur-sm flex items-center justify-center text-sm text-white hover:bg-white hover:text-[#0A0A0A] transition-colors">→</button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                      {gallery.map((_, i) => (
                        <button key={i} onClick={() => setGi(i)} aria-label={`Image ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === gi ? "w-5 bg-white" : "w-1.5 bg-white/50"}`} />
                      ))}
                    </div>
                  </div>
                  {/* details */}
                  <div className="flex flex-col p-7 md:p-10 overflow-y-auto max-h-[50vh] md:max-h-[88vh]">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]/45 mb-4">{doc.cat} · {doc.city} · {doc.year}</p>
                    <h3 className="font-sans font-bold tracking-tight leading-none mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{doc.name}</h3>
                    <p className="font-editorial italic text-[#F3F1EC]/70 mb-6" style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)" }}>{doc.sub}</p>
                    <div className="space-y-4 text-[14px] leading-relaxed text-[#F3F1EC]/70">
                      {body.map((para, i) => <p key={i}>{para}</p>)}
                    </div>
                  </div>
                </>
              );
            })()}
            {/* close */}
            <button
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-[#F3F1EC]/30 bg-[#0A0A0A]/40 backdrop-blur-sm flex items-center justify-center text-sm hover:bg-[#F3F1EC] hover:text-[#1C1C1C] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
