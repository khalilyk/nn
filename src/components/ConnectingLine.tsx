"use client";

import { useEffect, useRef } from "react";

/**
 * The hand-drawn line that weaves down the About section. It draws itself in as
 * the section scrolls up through the viewport and retracts as you scroll back
 * up — the stroke's dash offset is tied to scroll position (reversible).
 */
export default function ConnectingLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;
    let raf = 0;
    let alive = true;
    // rAF loop (not a scroll listener) so it stays in sync with Lenis smooth scroll
    const loop = () => {
      if (!alive) return;
      const r = svg.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const p = Math.max(0, Math.min(1, (vh - r.top) / total)); // 0 entering → 1 left
      path.style.strokeDashoffset = String(1 - p);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full z-0"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        ref={pathRef}
        d="M55,4 C36,11 34,18 51,24 C72,31 71,43 44,51 C24,57 27,71 54,76 C80,80 82,90 38,97"
        stroke="#0A0A0A"
        strokeOpacity="0.16"
        strokeWidth="1.4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
      />
    </svg>
  );
}
