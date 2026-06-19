"use client";

import { useEffect, useRef } from "react";

/** A background image layer that drifts with scroll (parallax), plus a dark overlay. */
export default function ParallaxBg({ src, overlay = 0.7, amp = 100 }: { src: string; overlay?: number; amp?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current, l = layer.current;
    if (!w || !l) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = w.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (below viewport) → 1 (above); 0 when centred
      const p = (r.top + r.height / 2 - vh / 2) / (vh + r.height / 2);
      l.style.transform = `translate3d(0, ${(-p * amp).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [amp]);

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        ref={layer}
        className="absolute inset-x-0 bg-cover bg-center will-change-transform"
        style={{ top: -amp, bottom: -amp, backgroundImage: `url('${src}')` }}
      />
      <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${overlay})` }} />
    </div>
  );
}
