"use client";

import { useEffect, useRef, useState } from "react";

const cities = [
  { name: "Sydney", line: "Where we're based, and where we build." },
  { name: "Dubai", line: "Where we cut our teeth on some of the region's most awarded concepts." },
  { name: "Beirut", line: "Where hospitality isn't a business — it's a way of life." },
];

function Word({ name, line, active, onHover }: { name: string; line: string; active: boolean; onHover: () => void }) {
  return (
    <div className="text-center cursor-default" onMouseEnter={onHover}>
      <div className="overflow-hidden">
        <span
          className="font-display block leading-[0.95] transition-all duration-500"
          style={{
            fontSize: "clamp(3rem, 9vw, 8rem)",
            color: active ? "#F3F1EC" : "rgba(243,241,236,0.28)",
            transform: active ? "translateY(0)" : "translateY(0)",
            letterSpacing: active ? "0.01em" : "0",
          }}
        >
          {name.toUpperCase()}
        </span>
      </div>
      {/* animated underline */}
      <div className="h-px bg-[#FF2EC4] mx-auto transition-all duration-500" style={{ width: active ? "70px" : "0px" }} />
      <p
        className="text-[#B9B5AE] text-sm md:text-base leading-relaxed max-w-md mx-auto transition-all duration-500 mt-4"
        style={{ opacity: active ? 1 : 0, maxHeight: active ? 80 : 0 }}
      >
        {line}
      </p>
    </div>
  );
}

export default function ThreeCities() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((i) => (i + 1) % cities.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full flex flex-col items-center text-center">
      {/* Heading */}
      <div
        className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ opacity: seen ? 1 : 0, transform: seen ? "translateY(0)" : "translateY(30px)" }}
      >
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-5">Three Cities</p>
        <h2 className="font-editorial mb-14" style={{ fontSize: "clamp(1.8rem, 4vw, 3.4rem)" }}>
          Three Cities. <span className="italic">One Standard.</span>
        </h2>
      </div>

      {/* Cities */}
      <div className="flex flex-col gap-6 md:gap-8 w-full">
        {cities.map((c, i) => (
          <div
            key={c.name}
            className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: seen ? 1 : 0,
              transform: seen ? "translateY(0)" : "translateY(40px)",
              transitionDelay: `${0.15 + i * 0.12}s`,
            }}
          >
            <Word
              name={c.name}
              line={c.line}
              active={active === i}
              onHover={() => {
                paused.current = true;
                setActive(i);
              }}
            />
          </div>
        ))}
      </div>

      {/* Closing */}
      <p
        className="font-editorial italic text-[#B9B5AE] mt-16 max-w-xl transition-all duration-1000"
        style={{
          fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
          opacity: seen ? 1 : 0,
          transform: seen ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "0.6s",
        }}
      >
        Different markets. Same obsession with making brands impossible to forget.
      </p>
    </div>
  );
}
