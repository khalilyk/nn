"use client";

import { useEffect, useRef } from "react";

/** Pins its children fixed in the viewport while the parent section is on screen
 *  (the site's transformed panels break CSS sticky / background-attachment:fixed,
 *  and Lenis doesn't fire scroll events, so we use a rAF loop). */
export default function PinInView({ children }: { children: React.ReactNode }) {
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
      if (r.bottom > -vh && r.top < vh * 2) {
        // keep the layer fixed to the viewport (clipped to the section by overflow-hidden)
        l.style.transform = `translate3d(0, ${(-r.top).toFixed(1)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div ref={layer} className="absolute inset-x-0 top-0 will-change-transform" style={{ height: "100dvh" }}>
        {children}
      </div>
    </div>
  );
}
