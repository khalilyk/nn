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
    const img = feImg.current;
    if (!el || !img) return;

    // Off-screen canvas that holds the ripple mask (white = distort here).
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let elW = 1, elH = 1;
    const resize = () => {
      const r = el.getBoundingClientRect();
      elW = Math.max(1, Math.round(r.width));
      elH = Math.max(1, Math.round(r.height));
      canvas.width = elW;
      canvas.height = elH;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let px = -1, py = -1;
    let active = false;
    let seed = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      active = true;
    };
    const onLeave = () => { active = false; };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = () => {
      // Fade the existing mask (leaves a dissolving wake behind the cursor).
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, elW, elH);

      // Stamp a soft blob where the cursor is.
      if (active && px >= 0) {
        ctx.globalCompositeOperation = "source-over";
        const rad = Math.max(60, elH * 0.5);
        const g = ctx.createRadialGradient(px, py, 0, px, py, rad);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      // Re-assert every frame: React reconciliation can strip JS-set attrs
      // that aren't in JSX, so keep the feImage mapped to the element box.
      img.setAttribute("x", "0");
      img.setAttribute("y", "0");
      img.setAttribute("width", String(elW));
      img.setAttribute("height", String(elH));
      img.setAttribute("href", canvas.toDataURL());
      seed += 0.5;
      if (turb.current) turb.current.setAttribute("seed", String(Math.floor(seed) % 256));

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
          <filter id={id} x="-20%" y="-20%" width="140%" height="140%" primitiveUnits="userSpaceOnUse">
            <feTurbulence
              ref={turb}
              type="fractalNoise"
              baseFrequency="0.02 0.03"
              numOctaves={2}
              seed={0}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={30}
              xChannelSelector="R"
              yChannelSelector="G"
              result="wavy"
            />
            <feImage ref={feImg} preserveAspectRatio="none" result="mask" />
            <feComposite in="wavy" in2="mask" operator="in" result="wavyPatch" />
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
