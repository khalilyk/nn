"use client";

import { useEffect, useRef, ReactNode } from "react";

/* Translates its children horizontally based on the section's scroll progress:
   enters from the left → centred → exits to the right. */
export default function ScrollDriftX({
  children,
  range = 0.08,
  mode = "center",
  className = "",
}: {
  children: ReactNode;
  range?: number; // fraction of viewport width to travel each direction
  mode?: "center" | "exitRight"; // center: left→centre→right; exitRight: centred then exits right
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
        const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
        let x: number;
        if (mode === "exitRight") {
          // centred & readable up to mid-pass, then accelerates off to the right
          const after = Math.max(0, (p - 0.5) * 2);
          x = Math.pow(after, 1.5) * window.innerWidth * 1.15;
        } else {
          x = (p - 0.5) * 2 * range * window.innerWidth;
        }
        el.style.transform = `translateX(${x}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [range, mode]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
