"use client";

import { useEffect, useRef, ReactNode } from "react";

/* Translates its children horizontally based on the section's scroll progress:
   enters from the left → centred → exits to the right. */
export default function ScrollDriftX({
  children,
  range = 0.08,
  className = "",
}: {
  children: ReactNode;
  range?: number; // fraction of viewport width to travel each direction
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when entering (top at viewport bottom), 1 when leaving (bottom at top)
        const p = (vh - rect.top) / (vh + rect.height);
        const clamped = Math.min(1, Math.max(0, p));
        const x = (clamped - 0.5) * 2 * range * window.innerWidth;
        el.style.transform = `translateX(${x}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [range]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
