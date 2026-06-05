"use client";

import { useEffect, useRef } from "react";

/* A soft pill that drifts left↔right behind the nav, following the cursor X. */
export default function NavPill() {
  const pill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const NAV_H = 80; // band height the pill lives in
    let targetX = window.innerWidth / 2;
    let x = targetX;
    let visible = 0;
    let targetVis = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetVis = e.clientY < NAV_H + 20 ? 1 : 0;
    };

    const loop = () => {
      x += (targetX - x) * 0.12;
      visible += (targetVis - visible) * 0.08;
      if (pill.current) {
        pill.current.style.transform = `translate(${x}px, -50%) translateX(-50%)`;
        pill.current.style.opacity = String(0.25 * visible);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[95] pointer-events-none hidden md:block" style={{ height: 80 }}>
      <div
        ref={pill}
        className="absolute top-1/2 left-0 rounded-full"
        style={{
          width: 150,
          height: 44,
          opacity: 0,
          background: "#F3F1EC",
          filter: "blur(6px)",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
