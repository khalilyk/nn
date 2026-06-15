"use client";

import { useEffect, useRef } from "react";

/* Scroll-driven parallax image band (native scroll - no Lenis on this page). */
export default function ParallaxImage({
  src,
  alt = "",
  className = "w-full h-[55vh] md:h-[75vh]",
  amount = 16,
  scale = 1.28,
}: { src: string; alt?: string; className?: string; amount?: number; scale?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!wrap.current || !img.current) return;
      const r = wrap.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (entering bottom) → 1 (leaving top)
      const progress = (r.top + r.height / 2 - vh / 2) / vh;
      img.current.style.transform = `translateY(${(progress * amount).toFixed(2)}%) scale(${scale})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={src}
        alt={alt}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
}
