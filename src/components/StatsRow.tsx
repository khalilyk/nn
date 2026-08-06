"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { to: 20, suffix: "+", label: "Years in hospitality" },
  { to: 3, suffix: "", label: "Cities, one lens" },
  { to: 50, suffix: "", label: "World's 50 Best" },
];

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function Stat({ to, suffix, label, run }: { to: number; suffix: string; label: string; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start = 0;
    const dur = 1300;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(easeOut(p) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);

  return (
    <div>
      <div className="font-sans font-bold leading-none tracking-tight" style={{ fontSize: "clamp(2.4rem, 6vw, 4.25rem)" }}>
        {n}
        {suffix}
      </div>
      <div className="mt-3 text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-[#0A0A0A]/45">{label}</div>
    </div>
  );
}

/** Three key numbers that count up once they scroll into view. */
export default function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRun(true); o.disconnect(); } },
      { threshold: 0.4 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-3 gap-4 md:gap-8">
      {STATS.map((s) => (
        <Stat key={s.label} {...s} run={run} />
      ))}
    </div>
  );
}
