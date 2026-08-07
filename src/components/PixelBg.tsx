"use client";

import { useEffect, useRef } from "react";

/** Gradient stops travelled from the bright origin outward. */
const STOPS: { p: number; c: [number, number, number] }[] = [
  { p: 0.0, c: [247, 208, 84] }, // warm yellow (origin)
  { p: 0.22, c: [198, 134, 252] }, // light violet
  { p: 0.46, c: [124, 58, 237] }, // purple
  { p: 0.74, c: [49, 27, 90] }, // deep indigo
  { p: 1.0, c: [12, 10, 20] }, // near-black
];

function mix(d: number): [number, number, number] {
  const x = Math.max(0, Math.min(1, d));
  for (let i = 1; i < STOPS.length; i++) {
    if (x <= STOPS[i].p) {
      const a = STOPS[i - 1];
      const b = STOPS[i];
      const t = (x - a.p) / (b.p - a.p);
      return [a.c[0] + (b.c[0] - a.c[0]) * t, a.c[1] + (b.c[1] - a.c[1]) * t, a.c[2] + (b.c[2] - a.c[2]) * t];
    }
  }
  return STOPS[STOPS.length - 1].c;
}

/**
 * Interactive cubic/pixel gradient. A grid of squares forms a gradient whose
 * bright origin eases toward the cursor (defaulting to a corner) and fades to
 * transparent at the edges so it blends with whatever sits behind it.
 */
export default function PixelBg({ className = "", cell = 24 }: { className?: string; cell?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const scope = canvas.closest<HTMLElement>("[data-pixel-scope]");
    let w = 0, h = 0, raf = 0, alive = true;
    // normalised origin — defaults near the bottom-left corner, eases toward the pointer
    const origin = { x: 0.12, y: 0.86 };
    const target = { x: 0.12, y: 0.86 };
    const cursor = { x: -9999, y: -9999 }; // pixel coords, for the per-cell reaction
    let interacting = false;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
      cursor.x = e.clientX - r.left;
      cursor.y = e.clientY - r.top;
      interacting = true;
    };

    let t0 = 0;
    const draw = (t: number) => {
      if (!alive) return;
      if (!t0) t0 = t;
      const time = (t - t0) / 1000;
      // gentle idle drift when the pointer isn't driving it
      if (!interacting) {
        target.x = 0.12 + Math.sin(time * 0.5) * 0.06;
        target.y = 0.86 + Math.cos(time * 0.4) * 0.05;
      }
      origin.x += (target.x - origin.x) * 0.06;
      origin.y += (target.y - origin.y) * 0.06;

      // shift the whole palette's hue based on scroll progress through the scope
      if (scope) {
        const r = scope.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const progress = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - vh)));
        canvas.style.filter = `hue-rotate(${(progress * 300).toFixed(1)}deg)`;
      }

      ctx.clearRect(0, 0, w, h);
      const ox = origin.x * w;
      const oy = origin.y * h;
      const maxD = Math.hypot(w, h) * 0.52;
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);
      for (let cx = 0; cx < cols; cx++) {
        for (let cy = 0; cy < rows; cy++) {
          const px = cx * cell + cell / 2;
          const py = cy * cell + cell / 2;
          const d = Math.hypot(px - ox, py - oy) / maxD;
          // reaction to the cursor crossing: nearby cells brighten and grow
          const boost = Math.max(0, 1 - Math.hypot(px - cursor.x, py - cursor.y) / 112);
          if (d >= 1 && boost <= 0) continue;
          const [r, g, b] = mix(Math.max(0, d - boost * 0.35));
          const alpha = Math.min(1, Math.pow(1 - Math.min(1, d), 2.6) * 0.95 + boost * 0.6);
          const grow = boost * 3;
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha.toFixed(3)})`;
          ctx.fillRect(cx * cell + 1 - grow / 2, cy * cell + 1 - grow / 2, cell - 2 + grow, cell - 2 + grow);
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(draw);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [cell]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
