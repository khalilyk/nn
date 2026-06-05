"use client";

import { useEffect, useRef, useState } from "react";

const cities = [
  { name: "Sydney", line: "Where we're based, and where we build." },
  { name: "Dubai", line: "Where we cut our teeth on some of the region's most awarded concepts." },
  { name: "Beirut", line: "Where hospitality isn't a business — it's a way of life." },
];

export default function ThreeCities() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full flex flex-col items-center justify-center text-center">
      <div
        className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ opacity: seen ? 1 : 0, transform: seen ? "translateY(0)" : "translateY(30px)" }}
      >
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-5">The world is our oyster</p>
        <h2 className="font-editorial mb-12" style={{ fontSize: "clamp(1.8rem, 4vw, 3.4rem)" }}>
          Three Cities. <span className="italic">One Standard.</span>
        </h2>
      </div>

      {/* Cities — one line */}
      <div className="flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2 w-full">
        {cities.map((c, i) => (
          <button
            key={c.name}
            onMouseEnter={() => setActive(i)}
            className="font-display leading-[0.95] transition-colors duration-500"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)", color: active === i ? "#F3F1EC" : "rgba(243,241,236,0.28)" }}
          >
            {c.name.toUpperCase()}
            {i < cities.length - 1 && <span className="text-[#B9B5AE]/40 mx-2">·</span>}
          </button>
        ))}
      </div>

      {/* Active city line */}
      <div className="relative w-full max-w-2xl mx-auto h-12 mt-7">
        {cities.map((c, i) => (
          <p
            key={c.name}
            className="absolute inset-x-0 top-0 text-[#B9B5AE] text-sm md:text-base leading-relaxed transition-all duration-500"
            style={{ opacity: active === i ? 1 : 0, transform: active === i ? "translateY(0)" : "translateY(8px)" }}
          >
            {c.line}
          </p>
        ))}
      </div>

      {/* Closing */}
      <p
        className="font-editorial italic text-[#B9B5AE] mt-12 max-w-xl transition-all duration-1000"
        style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", opacity: seen ? 1 : 0, transform: seen ? "translateY(0)" : "translateY(20px)", transitionDelay: "0.4s" }}
      >
        Different markets. Same obsession with making brands impossible to forget.
      </p>
    </div>
  );
}
