"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Localized water-ripple distortion that follows the cursor.
 * A soft "wet" patch tracks the pointer (with a fading wake); only the text
 * under that patch is displaced by animated turbulence, so dragging the cursor
 * across the words feels like running your finger through water.
 */
export default function LiquidText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const feImg = useRef<SVGFEImageElement>(null);
  const [id] = useState(() => "liquid-" + Math.random().toString(36).slice(2, 9));

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    // Off-screen canvas that holds the ripple mask (white = distort here).
    const W = 320, H = 180;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let px = -1, py = -1;     // cursor pos in canvas space
    let active = false;
    let seed = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * W;
      py = ((e.clientY - r.top) / r.height) * H;
      active = true;
    };
    const onLeave = () => { active = false; };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = () => {
      // Fade the existing mask (leaves a dissolving wake behind the cursor).
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.07)";
      ctx.fillRect(0, 0, W, H);

      // Stamp a soft blob where the cursor is.
      if (active && px >= 0) {
        ctx.globalCompositeOperation = "source-over";
        const rad = 70;
        const g = ctx.createRadialGradient(px, py, 0, px, py, rad);
        g.addColorStop(0, "rgba(255,255,255,0.95)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      // Push the mask into the filter + keep the water "moving".
      if (feImg.current) feImg.current.setAttribute("href", canvas.toDataURL());
      seed += 0.5;
      if (turb.current) turb.current.setAttribute("seed", String(Math.floor(seed) % 256));

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrap} className={className} style={{ filter: `url(#${id})` }}>
      <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
        <defs>
          <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
            {/* Watery noise */}
            <feTurbulence
              ref={turb}
              type="fractalNoise"
              baseFrequency="0.018 0.022"
              numOctaves={2}
              seed={0}
              result="noise"
            />
            {/* Fully-distorted version of the text */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={28}
              xChannelSelector="R"
              yChannelSelector="G"
              result="wavy"
            />
            {/* Ripple mask following the cursor (white = show distortion) */}
            <feImage
              ref={feImg}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="mask"
            />
            {/* Keep distortion only where the mask is */}
            <feComposite in="wavy" in2="mask" operator="in" result="wavyPatch" />
            {/* Lay the wet patch over the crisp text */}
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="wavyPatch" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
}
