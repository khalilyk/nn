"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Liquid-drag distortion. The cursor paints its own motion vector into a
 * displacement map (neutral grey = no displacement; coloured = pull), so
 * dragging across the text smears the strokes along the drag direction,
 * then relaxes back as the painted trail fades toward neutral.
 */
export default function LiquidText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const feImg = useRef<SVGFEImageElement>(null);
  const [id] = useState(() => "liquid-" + Math.random().toString(36).slice(2, 9));

  useEffect(() => {
    const el = wrap.current;
    const img = feImg.current;
    if (!el || !img) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let elW = 1, elH = 1;
    const NEUTRAL = "rgb(128,128,128)"; // 0.5 in both channels => zero displacement
    const clearNeutral = () => { ctx.fillStyle = NEUTRAL; ctx.fillRect(0, 0, elW, elH); };

    const resize = () => {
      const r = el.getBoundingClientRect();
      elW = Math.max(1, Math.round(r.width));
      elH = Math.max(1, Math.round(r.height));
      canvas.width = elW;
      canvas.height = elH;
      clearNeutral();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let prevX = -1, prevY = -1;

    const stamp = (x: number, y: number, dx: number, dy: number) => {
      // Encode the drag vector into R (x) / G (y) channels around neutral 128.
      const gain = 3.2, cap = 110;
      const cx = 128 + Math.max(-cap, Math.min(cap, dx * gain));
      const cy = 128 + Math.max(-cap, Math.min(cap, dy * gain));
      const rad = Math.max(70, elH * 0.5);
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, `rgba(${cx},${cy},128,0.85)`);
      g.addColorStop(1, "rgba(128,128,128,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (prevX < 0) { prevX = x; prevY = y; }
      const dx = x - prevX;
      const dy = y - prevY;
      // Interpolate stamps along the segment so fast moves stay continuous.
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.min(24, Math.round(dist / 8)));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        stamp(prevX + dx * t, prevY + dy * t, dx, dy);
      }
      prevX = x; prevY = y;
    };
    const onLeave = () => { prevX = -1; prevY = -1; };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = () => {
      // Ease the whole field back toward neutral => the smear relaxes/heals.
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(128,128,128,0.10)";
      ctx.fillRect(0, 0, elW, elH);

      // Re-assert attrs each frame (React reconcile strips JS-set attrs).
      img.setAttribute("x", "0");
      img.setAttribute("y", "0");
      img.setAttribute("width", String(elW));
      img.setAttribute("height", String(elH));
      img.setAttribute("href", canvas.toDataURL());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrap} className={className} style={{ filter: `url(#${id})` }}>
      <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
        <defs>
          <filter id={id} x="-30%" y="-30%" width="160%" height="160%" primitiveUnits="userSpaceOnUse">
            <feImage ref={feImg} preserveAspectRatio="none" result="map" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale={140}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
}
