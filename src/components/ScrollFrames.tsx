"use client";

import { useEffect, useRef, useState } from "react";

const frames = ["/nn-f1.png", "/nn-f2.png", "/nn-f3.png", "/nn-f4.png", "/nn-f5.png", "/nn-f6.png"];
// Replay the 6-frame walk cycle this many times across the section's scroll
// range so each small scroll steps through the cycle → continuous walking.
const LOOPS = 5;

/**
 * Scroll-driven image sequence. As the section moves through the viewport,
 * the background cycles nn-f1 → nn-f6 (and back when scrolling up).
 */
export default function ScrollFrames() {
  const ref = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress 0 → 1 as the section travels through the viewport
        const total = rect.height + vh;
        const p = Math.min(1, Math.max(0, (vh - rect.top) / total));
        // cycle the walk loop multiple times across the scroll range
        setFrame(Math.floor(p * frames.length * LOOPS) % frames.length);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 bg-[#0A0A0A]">
      {frames.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: i === frame ? 1 : 0 }}
          draggable={false}
        />
      ))}
    </div>
  );
}
