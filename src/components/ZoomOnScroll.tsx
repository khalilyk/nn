"use client";

import { useEffect, useRef } from "react";

/* Image that zooms toward full-bleed as you scroll past it, then the next
   (sticky) section slides over — a "zoom into the next section" transition. */
export default function ZoomOnScroll({
  src,
  className = "",
  position = "center",
  from = 1,
  to = 1.6,
}: {
  src: string;
  className?: string;
  position?: string;
  from?: number;
  to?: number;
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
        // progress 0 when element top hits viewport bottom, 1 when its top hits viewport top
        const p = Math.min(1, Math.max(0, 1 - (rect.top + rect.height * 0.2) / vh));
        const scale = from + (to - from) * p;
        image.style.transform = `scale(${scale})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [from, to]);

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={src}
        alt=""
        className="w-full h-full object-cover"
        style={{ objectPosition: position, willChange: "transform", transform: `scale(${from})` }}
      />
    </div>
  );
}
