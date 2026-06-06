"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps content in an SVG turbulence + displacement filter.
 * Moving the cursor over it "liquifies" the text like a hand through water —
 * the displacement ramps up with pointer speed and decays back to calm,
 * regardless of direction.
 */
export default function LiquidText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const [id] = useState(() => "liquid-" + Math.random().toString(36).slice(2, 9));

  const scale = useRef(0);     // current displacement scale
  const target = useRef(0);    // target driven by pointer speed
  const seed = useRef(0);      // drifting turbulence phase
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const p = last.current;
      if (p) {
        const d = Math.hypot(e.clientX - p.x, e.clientY - p.y);
        // pointer speed feeds the ripple; cap so fast flicks don't explode
        target.current = Math.min(40, target.current + d * 0.9);
      }
      last.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => { last.current = null; };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = () => {
      // decay the target, ease current toward it
      target.current *= 0.86;
      scale.current += (target.current - scale.current) * 0.18;
      seed.current += 0.012;

      const s = scale.current;
      if (disp.current) disp.current.setAttribute("scale", s.toFixed(2));
      if (turb.current) {
        // subtle baseFrequency wobble for a watery shimmer while disturbed
        const bf = 0.008 + Math.min(s, 30) * 0.0009;
        turb.current.setAttribute("baseFrequency", `${bf.toFixed(4)} ${(bf * 1.3).toFixed(4)}`);
        turb.current.setAttribute("seed", String(Math.floor(seed.current) % 100));
      }
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
            <feTurbulence
              ref={turb}
              type="fractalNoise"
              baseFrequency="0.008 0.0104"
              numOctaves={2}
              seed={0}
              result="noise"
            />
            <feDisplacementMap
              ref={disp}
              in="SourceGraphic"
              in2="noise"
              scale={0}
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
