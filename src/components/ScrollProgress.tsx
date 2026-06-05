"use client";

import { useEffect, useState } from "react";

/* Fixed right-edge progress rail showing scroll % + current section number. */
export default function ScrollProgress({ total = 9 }: { total?: number }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setPct(h > 0 ? Math.min(1, window.scrollY / h) : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const current = Math.min(total, Math.floor(pct * total) + 1);

  return (
    <div className="fixed right-5 md:right-6 top-1/2 -translate-y-1/2 z-[120] hidden md:flex flex-col items-center gap-3 mix-blend-difference">
      <span className="text-[9px] tracking-[0.2em] text-[#F3F1EC] font-sans tabular-nums">
        {String(current).padStart(2, "0")}
      </span>
      <div className="relative w-px h-28 bg-[#F3F1EC]/25 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-[#F3F1EC] origin-top"
          style={{ height: "100%", transform: `scaleY(${pct})`, transition: "transform 0.1s linear" }}
        />
      </div>
      <span className="text-[9px] tracking-[0.2em] text-[#F3F1EC]/40 font-sans tabular-nums">
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
