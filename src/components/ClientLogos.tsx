"use client";

import type { Clients } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/* A boxed, auto-scrolling carousel of client logos. */
export default function ClientLogos({ clients = DEFAULT_CONTENT.clients }: { clients?: Clients }) {
  const logos = (clients.logos ?? []).filter(Boolean);
  if (!logos.length) return null;
  // duplicate so the marquee loops seamlessly
  const row = [...logos, ...logos];

  return (
    <section className="relative bg-[#F3F1EC] text-[#0A0A0A] py-20 md:py-28 overflow-hidden">
      <div className="text-center px-8 mb-12 md:mb-16">
        {clients.eyebrow && <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-4">{clients.eyebrow}</p>}
        {clients.heading && <h2 className="font-editorial leading-[1.1]" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>{clients.heading}</h2>}
      </div>

      <div className="relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#F3F1EC] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#F3F1EC] to-transparent" />

        <div className="flex w-max border-t border-b border-[#0A0A0A]/12 animate-[marquee-left_40s_linear_infinite] hover:[animation-play-state:paused]">
          {row.map((src, i) => (
            <div
              key={i}
              className="group relative shrink-0 w-[200px] md:w-[240px] h-[130px] md:h-[150px] grid place-items-center p-8 border-r border-[#0A0A0A]/12"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="max-w-full max-h-full object-contain grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300" />
              {/* diamond markers at the box corners (grid-intersection look) */}
              <span className="absolute -top-1 -right-1 w-2 h-2 rotate-45 bg-[#0A0A0A]/20" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 rotate-45 bg-[#0A0A0A]/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
