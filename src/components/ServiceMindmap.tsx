"use client";

import { useEffect, useRef } from "react";

const SERVICES = [
  "Brand foundations",
  "Identity systems",
  "Menu development",
  "Campaign direction",
  "Packaging",
  "Content creation",
  "Digital strategy",
  "On-ground activations",
];

/* Live radial mindmap — services orbit a central hub, drifting gently and
   parallaxing toward the cursor. */
export default function ServiceMindmap() {
  const wrap = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const lines = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const n = SERVICES.length;
    const meta = SERVICES.map((_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      return { ax: Math.cos(a), ay: Math.sin(a), depth: 0.5 + (i % 3) * 0.3, phase: i * 1.7 };
    });

    let tmx = 0, tmy = 0, mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tmx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      tmy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => { tmx = 0; tmy = 0; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    let raf = 0;
    let start = 0;
    const loop = (t: number) => {
      if (!start) start = t;
      mx += (tmx - mx) * 0.07;
      my += (tmy - my) * 0.07;
      const r = el.getBoundingClientRect();
      const cx = r.width / 2;
      const cy = r.height / 2;
      const radius = Math.min(r.width, r.height) * 0.38;
      const time = (t - start) / 1000;
      meta.forEach((m, i) => {
        const idleX = Math.sin(time * 0.6 + m.phase) * 9;
        const idleY = Math.cos(time * 0.5 + m.phase) * 9;
        const px = cx + m.ax * radius + mx * 48 * m.depth + idleX;
        const py = cy + m.ay * radius + my * 48 * m.depth + idleY;
        const node = nodes.current[i];
        if (node) node.style.transform = `translate(-50%,-50%) translate(${px}px,${py}px)`;
        const ln = lines.current[i];
        if (ln) {
          ln.setAttribute("x1", String(cx + mx * 14));
          ln.setAttribute("y1", String(cy + my * 14));
          ln.setAttribute("x2", String(px));
          ln.setAttribute("y2", String(py));
        }
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrap} data-cursor="Explore" className="relative w-full" style={{ height: "clamp(460px, 60vh, 600px)" }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        {SERVICES.map((_, i) => (
          <line key={i} ref={(e) => { lines.current[i] = e; }} stroke="#0A0A0A" strokeOpacity="0.2" strokeWidth="1" />
        ))}
      </svg>

      {/* central hub */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-[#0A0A0A] text-[#F3F1EC] flex items-center justify-center text-center"
        style={{ width: "clamp(120px,13vw,160px)", height: "clamp(120px,13vw,160px)" }}
      >
        <span className="font-display uppercase leading-[0.92] tracking-tight" style={{ fontSize: "clamp(0.9rem,1.4vw,1.15rem)" }}>
          Your<br />concept
        </span>
      </div>

      {/* orbiting service nodes */}
      {SERVICES.map((s, i) => (
        <div
          key={s}
          ref={(e) => { nodes.current[i] = e; }}
          className="absolute left-0 top-0 z-20 whitespace-nowrap rounded-full border border-[#0A0A0A]/25 bg-[#F3F1EC] px-5 py-2.5 text-[12px] md:text-[13px] tracking-[0.04em] hover:bg-[#0A0A0A] hover:text-[#F3F1EC] hover:border-[#0A0A0A] hover:scale-105 transition-[background-color,color,border-color,scale] duration-300"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          {s}
        </div>
      ))}
    </div>
  );
}
