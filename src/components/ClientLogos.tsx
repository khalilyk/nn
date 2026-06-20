"use client";

import type { Clients } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/* Simple orange logo carousel — square tiles, slow steady infinite loop. */
export default function ClientLogos({ clients = DEFAULT_CONTENT.clients }: { clients?: Clients }) {
  const logos = (clients.logos ?? []).filter(Boolean);
  if (!logos.length) return null;
  // duplicate the set so the -50% marquee wraps seamlessly
  const row = [...logos, ...logos];

  return (
    <section className="relative z-10 bg-[#FF5C1A] overflow-hidden py-14 md:py-20">
      <p className="text-center text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#0A0A0A]/55 mb-8 md:mb-10">
        {clients.eyebrow || "Brands we've shaped"}
      </p>
      <div className="flex w-max animate-[marquee-left_60s_linear_infinite]">
        {row.map((src, i) => (
          <div
            key={i}
            aria-hidden={i >= logos.length}
            className="shrink-0 mx-3 md:mx-4 w-[130px] h-[130px] md:w-[168px] md:h-[168px] rounded-xl overflow-hidden bg-[#161616]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
}
