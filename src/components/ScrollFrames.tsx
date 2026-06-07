"use client";

import { useEffect, useRef } from "react";

const frames = ["/nn-f1.png", "/nn-f2.png", "/nn-f3.png", "/nn-f4.png", "/nn-f5.png", "/nn-f6.png"];
// Scroll distance the sequence is scrubbed over (taller = slower, calmer).
const SCROLL_HEIGHT = "260vh";

/**
 * Pinned, scroll-scrubbed walk cycle. A tall spacer provides the scroll
 * distance; a sticky viewport holds the frames. Frames play in order
 * (nn-f1 → nn-f6) and crossfade by fractional progress, eased with a rAF
 * lerp, so the people walk slowly and smoothly as you scroll.
 */
export default function ScrollFrames() {
  const ref = useRef<HTMLDivElement>(null);
  const imgs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const target = { v: 0 };
    let current = 0;
    let raf = 0;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh; // distance the sticky child is pinned
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      target.v = p * (frames.length - 1); // single ordered pass f1 → f6
    };

    const tick = () => {
      current += (target.v - current) * 0.06; // gentle easing
      const base = Math.floor(current);
      const frac = current - base;
      const next = Math.min(frames.length - 1, base + 1);
      imgs.current.forEach((im, i) => {
        if (!im) return;
        im.style.opacity = i === base ? String(1 - frac) : i === next ? String(frac) : "0";
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="relative" style={{ height: SCROLL_HEIGHT }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A]">
        {frames.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            ref={(node) => { imgs.current[i] = node; }}
            src={src}
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0, willChange: "opacity" }}
          />
        ))}
      </div>
    </div>
  );
}
