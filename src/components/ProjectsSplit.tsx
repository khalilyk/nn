"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/content/types";

/* Pinned split-screen projects (desktop).
   The section pins to the viewport; as you scroll, the LEFT image column
   slides up and the RIGHT caption column slides down (opposite directions),
   staying aligned so image[i] always meets caption[i] — revealing the next
   project. Driven by a rAF loop reading getBoundingClientRect because Lenis
   doesn't fire scroll events and the transformed panels break CSS sticky. */
export default function ProjectsSplit({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (i: number) => void;
}) {
  const track = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const leftT = useRef<HTMLDivElement>(null);
  const rightT = useRef<HTMLDivElement>(null);
  const N = projects.length;

  useEffect(() => {
    const tr = track.current, ly = layer.current, lt = leftT.current, rt = rightT.current;
    if (!tr || !ly || !lt || !rt) return;
    let raf = 0, running = true;
    const loop = () => {
      if (!running) return;
      const vh = window.innerHeight;
      const r = tr.getBoundingClientRect();
      const maxScroll = tr.offsetHeight - vh;
      if (r.bottom > -vh && r.top < vh * 2 && maxScroll > 0) {
        const pinned = Math.min(Math.max(-r.top, 0), maxScroll);
        ly.style.transform = `translate3d(0, ${pinned.toFixed(1)}px, 0)`;
        const p = pinned / maxScroll;            // 0 → 1 across all projects
        const span = (N - 1) * vh;               // one full viewport per project
        lt.style.transform = `translate3d(0, ${(-p * span).toFixed(1)}px, 0)`;       // up
        rt.style.transform = `translate3d(0, ${((p - 1) * span).toFixed(1)}px, 0)`;  // down (opposite)
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(raf); };
  }, [N]);

  // scroll distance: first screen + ~0.85 viewport per extra project
  const trackHeight = `${100 + (N - 1) * 85}vh`;

  return (
    <div ref={track} className="relative" style={{ height: trackHeight }}>
      <div ref={layer} className="absolute inset-x-0 top-0 h-screen overflow-hidden will-change-transform">
        <div className="grid grid-cols-2 h-full">
          {/* LEFT — images, slide up */}
          <div className="relative overflow-hidden">
            <div ref={leftT} className="will-change-transform">
              {projects.map((pr, i) => (
                <button
                  key={`l-${i}`}
                  onClick={() => onOpen(i)}
                  data-cursor="Open"
                  className="group block w-full h-screen relative overflow-hidden bg-[#0A0A0A]"
                >
                  <div className="absolute inset-[7%] overflow-hidden rounded-[2px] shadow-[0_0_90px_-12px_rgba(255,255,255,0.38)]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      style={{ backgroundImage: `url('${pr.images?.[0] ?? pr.img}')` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — captions (reversed), slide down */}
          <div className="relative overflow-hidden">
            <div ref={rightT} className="will-change-transform">
              {projects.map((_, ri) => {
                const i = N - 1 - ri; // reversed order so it counter-aligns with the left
                const pr = projects[i];
                return (
                  <div key={`r-${ri}`} className="w-full h-screen flex flex-col justify-center px-10 md:px-16">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]/45 mb-5">
                      {String(i + 1).padStart(2, "0")} · {pr.cat} · {pr.city} · {pr.year}
                    </p>
                    <h3 className="font-sans font-bold tracking-tight leading-[0.95] mb-4" style={{ fontSize: "clamp(2rem, 3.4vw, 3.4rem)" }}>
                      {pr.name}
                    </h3>
                    <p className="text-[#F3F1EC]/60 max-w-md" style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.4rem)" }}>
                      {pr.sub}
                    </p>
                    <button
                      onClick={() => onOpen(i)}
                      data-cursor="Open"
                      className="mt-8 self-start inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase border-b border-[#F3F1EC] pb-1 hover:opacity-60 transition-opacity"
                    >
                      View Project <span aria-hidden>→</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* centre divider */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-[#F3F1EC]/15" />
      </div>
    </div>
  );
}
