"use client";

import { useEffect, useRef } from "react";

const frames = ["/nn-f1.png", "/nn-f2.png", "/nn-f3.png", "/nn-f4.png", "/nn-f5.png", "/nn-f6.png"];

/**
 * Scroll-driven walk cycle (no pin). As the section passes through the
 * viewport the frames play in order (nn-f1 → nn-f6) and crossfade by
 * fractional progress, eased with a rAF lerp, so the people walk smoothly.
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
      target.v = p * (frames.length - 1); // ordered f1 → f6 across the pass
    };

    const tick = () => {
      current += (target.v - current) * 0.08;
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
    <div ref={ref} className="absolute inset-0 bg-[#0A0A0A]">
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
  );
}
