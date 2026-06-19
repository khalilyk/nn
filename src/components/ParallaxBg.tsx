"use client";

import { useEffect, useRef } from "react";

/** A background image that stays fixed in the viewport while the section scrolls
 *  over it (emulates background-attachment:fixed, which the transformed panels break). */
export default function ParallaxBg({ src, overlay = 0.7, cover = true }: { src: string; overlay?: number; cover?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current, l = layer.current;
    if (!w || !l) return;
    let raf = 0, running = true;
    const loop = () => {
      if (!running) return;
      const r = w.getBoundingClientRect();
      const vh = window.innerHeight;
      // only update while the section is anywhere near the viewport
      if (r.bottom > -vh && r.top < vh * 2) {
        // pin the viewport-tall layer to the top of the screen while the section covers it
        const ty = Math.min(Math.max(-r.top, 0), Math.max(0, r.height - vh));
        l.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        ref={layer}
        className="absolute inset-x-0 top-0 bg-center bg-no-repeat will-change-transform"
        style={{ height: "100dvh", backgroundImage: `url('${src}')`, backgroundSize: cover ? "cover" : "contain" }}
      />
      <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${overlay})` }} />
    </div>
  );
}
