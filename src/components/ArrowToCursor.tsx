"use client";

import { useEffect, useRef } from "react";

/** A down-arrow glyph that rotates to point toward the cursor. */
export default function ArrowToCursor({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const target = { a: 0 }; // desired angle (deg)
    const cur = { a: 0 };    // eased angle (deg)
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // base glyph points straight down (= +90° in screen space); aim the delta
      // at the cursor
      target.a = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI - 90;
    };

    const loop = () => {
      // shortest-path delta so it never spins the long way round
      let diff = ((target.a - cur.a + 180) % 360 + 360) % 360 - 180;
      cur.a += diff * 0.1; // smooth follow
      if (ref.current) ref.current.style.transform = `rotate(${cur.a}deg)`;
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
    <svg
      ref={ref}
      aria-hidden
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      style={{ transition: "transform 0.18s ease-out", willChange: "transform" }}
    >
      <path d="M12 3v17M4 12l8 8 8-8" />
    </svg>
  );
}
