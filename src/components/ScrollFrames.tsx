"use client";

import { useEffect, useRef } from "react";

const frames = ["/nn-f1.png", "/nn-f2.png", "/nn-f3.png", "/nn-f4.png", "/nn-f5.png", "/nn-f6.png"];
// Replay the 6-frame walk cycle this many times across the section's scroll range.
const LOOPS = 5;

/**
 * Scroll-driven walk cycle. The frames (nn-f1 → nn-f6, in order) crossfade
 * into one another based on fractional scroll position, eased with a rAF lerp,
 * so the people appear to walk smoothly as you scroll up/down.
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
      const total = rect.height + vh;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / total));
      target.v = p * frames.length * LOOPS; // continuous, monotonic
    };

    const tick = () => {
      // ease toward the scroll target for buttery motion
      current += (target.v - current) * 0.12;
      const fpos = ((current % frames.length) + frames.length) % frames.length;
      const base = Math.floor(fpos);
      const frac = fpos - base;
      const next = (base + 1) % frames.length;
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
    <div ref={ref} className="absolute inset-0 bg-[#0A0A0A]">
      {frames.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          ref={(el) => { imgs.current[i] = el; }}
          src={src}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: i === 0 ? 1 : 0, willChange: "opacity" }}
        />
      ))}
    </div>
  );
}
