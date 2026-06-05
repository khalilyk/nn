"use client";

import { useEffect, useRef, useState } from "react";

const cities = [
  { name: "Sydney", line: "Where we're based, and where we build.", img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80" },
  { name: "Dubai", line: "Where we cut our teeth on some of the region's most awarded concepts.", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80" },
  { name: "Beirut", line: "Where hospitality isn't a business — it's a way of life.", img: "https://images.unsplash.com/photo-1559564484-0e7f7e8e3b8a?auto=format&fit=crop&w=1600&q=80" },
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
    <div ref={ref} className="relative w-full flex flex-col items-center text-center">
      {/* Hover background image (scoped to this section) */}
      {cities.map((c, i) => (
        <div
          key={c.name}
          className="absolute bg-cover bg-center pointer-events-none transition-opacity duration-700"
          style={{ inset: "-25vh -50vw", backgroundImage: `url('${c.img}')`, opacity: active === i ? 0.2 : 0, zIndex: 0 }}
        />
      ))}

      <div
        className="relative z-10 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ opacity: seen ? 1 : 0, transform: seen ? "translateY(0)" : "translateY(30px)" }}
      >
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-5">Three Cities</p>
        <h2 className="font-editorial mb-16" style={{ fontSize: "clamp(1.8rem, 4vw, 3.4rem)" }}>
          Three Cities. <span className="italic">One Standard.</span>
        </h2>
      </div>

      {/* Cities — one line */}
      <div className="relative z-10 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-4 w-full">
        {cities.map((c, i) => (
          <button
            key={c.name}
            onMouseEnter={() => setActive(i)}
            className="font-display leading-[0.95] transition-all duration-500"
            style={{
              fontSize: "clamp(2.4rem, 7vw, 6.5rem)",
              color: active === i ? "#F3F1EC" : "rgba(243,241,236,0.3)",
            }}
          >
            {c.name.toUpperCase()}
            {i < cities.length - 1 && <span className="text-[#FF2EC4] mx-2">.</span>}
          </button>
        ))}
      </div>

      {/* Active city line */}
      <div className="relative z-10 min-h-[3em] mt-8">
        {cities.map((c, i) => (
          <p
            key={c.name}
            className="absolute left-1/2 -translate-x-1/2 w-full text-[#B9B5AE] text-sm md:text-base leading-relaxed max-w-md mx-auto transition-all duration-500"
            style={{ opacity: active === i ? 1 : 0, transform: active === i ? "translate(-50%,0)" : "translate(-50%,8px)" }}
          >
            {c.line}
          </p>
        ))}
      </div>

      {/* Closing */}
      <p
        className="relative z-10 font-editorial italic text-[#B9B5AE] mt-14 max-w-xl transition-all duration-1000"
        style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", opacity: seen ? 1 : 0, transform: seen ? "translateY(0)" : "translateY(20px)", transitionDelay: "0.4s" }}
      >
        Different markets. Same obsession with making brands impossible to forget.
      </p>
    </div>
  );
}
