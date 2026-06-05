"use client";

import { useEffect, useRef, ReactNode } from "react";

/* Slow image drift / parallax. amount = px of travel across the viewport pass. */
export default function Parallax({
  src,
  alt = "",
  amount = 60,
  className = "",
  scale = 1.18,
  position = "center",
}: {
  src: string;
  alt?: string;
  amount?: number;
  className?: string;
  scale?: number;
  position?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrap.current;
        const image = img.current;
        if (!el || !image) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress -1 (below) .. 1 (above)
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        image.style.transform = `translateY(${progress * amount}px) scale(${scale})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [amount, scale]);

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ objectPosition: position, willChange: "transform" }}
      />
    </div>
  );
}
