"use client";

import { useEffect, useRef } from "react";

// deterministic pseudo-random (no Math.random → no hydration mismatch)
const rand = (n: number) => {
  const x = Math.sin(n * 99.13) * 43758.5453;
  return x - Math.floor(x);
};

/* Super-tiny black stars scattered in the background that parallax with the cursor. */
export default function StarField({ count = 64, color = "#0A0A0A" }: { count?: number; color?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const stars = Array.from({ length: count }, (_, i) => ({
    x: rand(i + 1) * 100,
    y: rand(i + 1.7) * 100,
    size: 3 + rand(i + 2.3) * 4,
    depth: 0.2 + rand(i + 3.1) * 1.1,
  }));

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      refs.current.forEach((s, i) => {
        if (s) {
          const d = stars[i].depth;
          s.style.transform = `translate(${(cx * d * 22).toFixed(2)}px, ${(cy * d * 22).toFixed(2)}px)`;
        }
      });
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrap} aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((st, i) => (
        <span
          key={i}
          ref={(e) => { refs.current[i] = e; }}
          className="absolute text-[#0A0A0A] will-change-transform"
          style={{ left: `${st.x}%`, top: `${st.y}%`, fontSize: `${st.size}px`, opacity: 0.32, lineHeight: 1 }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
