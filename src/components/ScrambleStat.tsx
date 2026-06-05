"use client";

import { useEffect, useRef, useState } from "react";

const PINK = "#FF2EC4";

/* A stat whose number scrambles before settling, with a playful pink
   marker scribble + handwritten annotation. */
export default function ScrambleStat({
  value,
  prefix = "",
  suffix = "",
  label,
  big = false,
  note,
  noteRotate = -6,
  notePos = "tr",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  big?: boolean;
  note?: string;
  noteRotate?: number;
  notePos?: "tr" | "tl";
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
            const settle = t * t;
            const rand = Math.floor(Math.random() * (max + 1));
            setDisplay(Math.round(value * settle + rand * (1 - settle)));
            requestAnimationFrame(tick);
          } else setDisplay(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="relative inline-block">
      {/* Handwritten annotation */}
      {note && (
        <span
          className="absolute z-10 leading-tight"
          style={{
            fontFamily: "var(--font-marker)",
            color: PINK,
            fontSize: big ? "1.4rem" : "1.1rem",
            transform: `rotate(${noteRotate}deg)`,
            top: notePos === "tr" ? "-0.6em" : "-0.6em",
            right: notePos === "tr" ? "-1.5em" : "auto",
            left: notePos === "tl" ? "-1em" : "auto",
            maxWidth: "9ch",
          }}
        >
          {note}
        </span>
      )}

      {/* Number */}
      <div className="relative font-display leading-none tabular-nums" style={{ fontSize: big ? "clamp(4rem, 11vw, 9rem)" : "clamp(2.5rem, 5vw, 4.5rem)" }}>
        {prefix}
        {display}
        {suffix}
        {/* pink scribble underline */}
        <svg
          className="absolute left-0 w-full"
          style={{ bottom: "-0.12em", height: "0.18em" }}
          viewBox="0 0 200 16"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M3 11 C 40 4, 80 14, 120 7 S 180 5, 197 10" stroke={PINK} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </div>

      <p className="text-[10px] tracking-[0.25em] uppercase text-[#B9B5AE]/70 mt-5">{label}</p>
    </div>
  );
}
