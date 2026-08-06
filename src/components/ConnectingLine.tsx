"use client";

import { useEffect, useRef } from "react";

/**
 * The hand-drawn line that weaves down the About section. It's a solid stroke
 * revealed top-to-bottom by a scroll-driven clip, so it draws in as the section
 * scrolls up and retracts on the way back down — no dash artifacts, no gaps.
 */
export default function ConnectingLine() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    let alive = true;
    const loop = () => {
      if (!alive) return;
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const p = Math.max(0, Math.min(1, (vh - r.top) / total)); // 0 entering → 1 left
      // reveal from the top: clip away the bottom (1 - p) of the box
      wrap.style.clipPath = `inset(0 0 ${((1 - p) * 100).toFixed(2)}% 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M55,4 C36,11 34,18 51,24 C72,31 71,43 44,51 C24,57 27,71 54,76 C80,80 82,90 38,97"
          stroke="#0A0A0A"
          strokeOpacity="0.16"
          strokeWidth="1.4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
