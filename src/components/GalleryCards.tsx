"use client";

import { useEffect, useRef } from "react";

/**
 * Project gallery whose tiles are scroll-linked "cards": each slides up and
 * fades into place as it rises through the viewport, and reverses as you scroll
 * back up (transform is tied to scroll position, not a one-shot reveal).
 */
export default function GalleryCards({ images }: { images: string[] }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const start = vh * 0.95; // begins rising when its top reaches near the bottom edge
      const end = vh * 0.55; // fully settled once it's a little above centre
      for (const el of refs.current) {
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        let p = (start - top) / (start - end);
        p = Math.max(0, Math.min(1, p));
        const ty = (1 - p) * 70; // slide-up distance in px
        const scale = 0.97 + p * 0.03;
        el.style.transform = `translateY(${ty.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        el.style.opacity = (0.25 + p * 0.75).toFixed(3);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [images]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
      {images.map((src, i) => {
        const full = i % 3 === 2; // every third image spans full width
        return (
          <div
            key={src + i}
            ref={(el) => { refs.current[i] = el; }}
            className={`relative overflow-hidden bg-[#111] will-change-transform ${full ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
            style={{ opacity: 0.25 }}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${src}')` }} />
          </div>
        );
      })}
    </div>
  );
}
