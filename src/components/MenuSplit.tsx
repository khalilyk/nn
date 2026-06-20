"use client";

import { useState } from "react";
import type { Menu } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

// scatter positions (desktop) - top/left in %, slight rotation
// positioned over the big title rows (≈12/34/52/68%), clear of the eyebrow labels in between
const SCATTER = [
  { top: "11%", left: "30%", rot: -3 },
  { top: "15%", left: "62%", rot: 2 },
  { top: "33%", left: "18%", rot: 2 },
  { top: "35%", left: "66%", rot: 3 },
  { top: "52%", left: "26%", rot: -2 },
  { top: "53%", left: "60%", rot: 2 },
  { top: "82%", left: "16%", rot: -1 },
  { top: "82%", left: "68%", rot: 3 },
];

export default function MenuSplit({ menu = DEFAULT_CONTENT.menu }: { menu?: Menu }) {
  const COURSES = menu.courses;
  const PALETTE = menu.palette;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null); // desktop: course whose pills show (only while hovering)
  const [open, setOpen] = useState<number | null>(null); // mobile: which course's pills are revealed
  const cur = hovered !== null ? COURSES[hovered] : null;

  return (
    <div className="overflow-hidden">
      <div className="py-4 md:py-6">
        {/* heading */}
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-6 text-center">{menu.eyebrow}</p>
        <h3 className="font-editorial leading-[1.05] max-w-3xl mx-auto text-center mb-12 md:mb-16 text-[#0A0A0A]" style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}>
          {menu.heading}
        </h3>

        {/* layered list + scattered pills (desktop) */}
        <div className="relative hidden md:block" onMouseLeave={() => setHovered(null)}>
          <ul className="relative z-10">
            {COURSES.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.title}>
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => { setActive(i); setHovered(i); }}
                    data-cursor="View"
                    className="group w-full text-center flex flex-col items-center py-1.5 md:py-2"
                  >
                    <span className="flex flex-col items-center">
                      <span className={`block text-[8px] md:text-[9px] tracking-[0.3em] uppercase mb-1 transition-colors duration-300 ${on ? "text-[#FF2EC4]" : "text-[#0A0A0A]/25"}`}>
                        [ {c.course} ]
                      </span>
                      <span
                        className={`font-editorial leading-[0.92] transition-colors duration-300 ${on ? "text-[#0A0A0A]" : "text-[#0A0A0A]/25 group-hover:text-[#0A0A0A]/45"}`}
                        style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}
                      >
                        {c.title}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* scattered pills (desktop overlay) — only while hovering a course */}
          <div className="hidden md:block pointer-events-none absolute inset-0 z-20">
            {cur?.items.map((it, i) => {
              const pos = SCATTER[i % SCATTER.length];
              const col = PALETTE[i % PALETTE.length];
              return (
                <span
                  key={it}
                  className="absolute whitespace-nowrap rounded-md px-5 py-2.5 text-[13px] font-medium shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] animate-[fadeUp_0.45s_ease] will-change-transform"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: `rotate(${pos.rot}deg)`,
                    background: col.bg,
                    color: col.fg,
                    animationDelay: `${i * 0.04}s`,
                  }}
                >
                  {it}
                </span>
              );
            })}
          </div>
        </div>

        {/* mobile: tap a course to reveal its pills centered beneath it */}
        <div className="md:hidden space-y-6">
          {COURSES.map((c, ci) => {
            const on = open === ci;
            return (
              <div key={c.title} className="text-center">
                <button onClick={() => setOpen(on ? null : ci)} data-cursor="View" className="w-full flex flex-col items-center">
                  <span className={`block text-[8px] tracking-[0.3em] uppercase mb-1.5 transition-colors ${on ? "text-[#FF2EC4]" : "text-[#0A0A0A]/30"}`}>[ {c.course} ]</span>
                  <h4 className={`font-editorial leading-[0.95] transition-colors ${on ? "text-[#0A0A0A]" : "text-[#0A0A0A]/30"}`} style={{ fontSize: "clamp(1.9rem, 9vw, 3rem)" }}>
                    {c.title}
                  </h4>
                </button>
                {on && (
                  <div className="mt-4 animate-[fadeUp_0.4s_ease]">
                    {c.intro && <p className="text-[#0A0A0A]/60 text-sm leading-relaxed mb-5 max-w-sm mx-auto">{c.intro[0]}</p>}
                    <div className="flex flex-wrap justify-center gap-2.5">
                      {c.items.map((it, i) => {
                        const col = PALETTE[i % PALETTE.length];
                        return (
                          <span key={it} className="rounded-md px-4 py-2 text-[12px] font-medium" style={{ background: col.bg, color: col.fg }}>
                            {it}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
