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
    <section className="relative bg-[#FF5C1A] overflow-hidden py-10 md:py-14">
      <div className="flex w-max animate-[marquee-left_60s_linear_infinite]">
        {row.map((src, i) => (
          <div
            key={i}
            aria-hidden={i >= logos.length}
            className="shrink-0 mx-3 md:mx-4 w-[112px] h-[112px] md:w-[150px] md:h-[150px] rounded-xl overflow-hidden bg-[#161616]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
}
