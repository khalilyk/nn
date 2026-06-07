"use client";

import { useEffect, useRef, useState } from "react";

const cities = [
  { code: "SYD", name: "SYDNEY", line: "Where we're based, and where we build." },
  { code: "DXB", name: "DUBAI", line: "Where we cut our teeth on some of the region's most awarded concepts." },
  { code: "BEY", name: "BEIRUT", line: "Where hospitality isn't a business — it's a way of life." },
];

function CityButton({
  code,
  name,
  active,
  onEnter,
  onLeave,
}: {
  code: string;
  name: string;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const [text, setText] = useState(code);
  const [hovered, setHovered] = useState(false);
  const cur = useRef(code);

  useEffect(() => {
    const target = hovered ? name : code;
    let cancelled = false;
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      if (cancelled) return;
      const c = cur.current;
      if (c === target) return;
      const next = !target.startsWith(c) ? c.slice(0, -1) : target.slice(0, c.length + 1);
      cur.current = next;
      setText(next || " ");
      t = setTimeout(step, 32);
    };
    step();
    return () => { cancelled = true; clearTimeout(t); };
  }, [hovered, code, name]);

  return (
    <button
      onMouseEnter={() => { setHovered(true); onEnter(); }}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
      className="font-display leading-[0.95] transition-colors duration-500 whitespace-nowrap"
      style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)", color: active ? "#F3F1EC" : "rgba(243,241,236,0.28)" }}
    >
      {text}
    </button>
  );
}

export default function ThreeCities() {
  const ref = useRef<HTMLDivElement>(null);
  const sphere = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Parallax on scroll
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        const sp = sphere.current;
        if (!el || !sp) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = (rect.top + rect.height / 2 - vh / 2) / vh; // -1..1
        sp.style.transform = `translateY(${p * 80}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className="relative w-full flex flex-col items-center justify-center text-center">
      {/* Rotating dotted-sphere background */}
      <div ref={sphere} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" style={{ willChange: "transform" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/dotted-sphere.svg"
          alt=""
          className="animate-[spin-slow_90s_linear_infinite]"
          style={{ width: "clamp(414px, 57.5vw, 782px)", opacity: 0.15 }}
        />
      </div>

      <div
        className="relative z-10 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ opacity: seen ? 1 : 0, transform: seen ? "translateY(0)" : "translateY(30px)" }}
      >
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-5">The world is our oyster</p>
        <h2 className="font-editorial mb-12" style={{ fontSize: "clamp(1.8rem, 4vw, 3.4rem)" }}>
          Three Cities. <span className="italic">One Standard.</span>
        </h2>
      </div>

      {/* Airport codes — type out full name on hover */}
      <div className="relative z-10 flex flex-wrap items-baseline justify-center gap-x-10 gap-y-2 w-full">
        {cities.map((c, i) => (
          <CityButton
            key={c.code}
            code={c.code}
            name={c.name}
            active={active === i}
            onEnter={() => setActive(i)}
            onLeave={() => {}}
          />
        ))}
      </div>

      {/* Active city line */}
      <div className="relative z-10 w-full max-w-2xl mx-auto h-12 mt-8">
        {cities.map((c, i) => (
          <p
            key={c.code}
            className="absolute inset-x-0 top-0 text-[#B9B5AE] text-sm md:text-base leading-relaxed transition-all duration-500"
            style={{ opacity: active === i ? 1 : 0, transform: active === i ? "translateY(0)" : "translateY(8px)" }}
          >
            {c.line}
          </p>
        ))}
      </div>

      <p
        className="relative z-10 font-editorial italic text-[#B9B5AE] mt-12 max-w-xl transition-all duration-1000"
        style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", opacity: seen ? 1 : 0, transform: seen ? "translateY(0)" : "translateY(20px)", transitionDelay: "0.4s" }}
      >
        No matter where you are, we&apos;d love to work with you.
      </p>
    </div>
  );
}
