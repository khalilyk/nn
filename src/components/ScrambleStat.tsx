"use client";

import { useEffect, useRef, useState } from "react";

/* A stat whose number randomly scrambles before settling on its value. */
export default function ScrambleStat({
  value,
  prefix = "",
  suffix = "",
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const digits = String(value).length;
        const max = Math.pow(10, digits) - 1;
        const duration = 1300;
        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          if (t < 1) {
            // ease how close we get to the real value as we settle
            const settle = t * t;
            const rand = Math.floor(Math.random() * (max + 1));
            const val = Math.round(value * settle + rand * (1 - settle));
            setDisplay(val);
            requestAnimationFrame(tick);
          } else {
            setDisplay(value);
          }
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <div className="font-display leading-none tabular-nums" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
        {prefix}
        {display}
        {suffix}
      </div>
      <p className="text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE]/70 mt-3">{label}</p>
    </div>
  );
}
