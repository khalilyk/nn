"use client";

import { useEffect, useRef, useState } from "react";

const CITIES = [
  { code: "SYD", name: "SYDNEY", line: "Where we're based, and where we build." },
  { code: "DXB", name: "DUBAI", line: "Where we cut our teeth on some of the region's most awarded concepts." },
  { code: "BEY", name: "BEIRUT", line: "Where hospitality isn't a business, it's a way of life." },
];

function CityCode({
  code, name, active, onEnter, activeColor, idleColor,
}: {
  code: string; name: string; active: boolean; onEnter: () => void; activeColor: string; idleColor: string;
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
      onMouseLeave={() => setHovered(false)}
      className="font-sans font-bold leading-[0.95] transition-colors duration-500 whitespace-nowrap"
      style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: active ? activeColor : idleColor }}
    >
      {text}
    </button>
  );
}

export default function CityCodes({
  activeColor = "#F3F1EC",
  idleColor = "rgba(243,241,236,0.28)",
  lineColor = "#B9B5AE",
  center = false,
}: {
  activeColor?: string;
  idleColor?: string;
  lineColor?: string;
  center?: boolean;
}) {
  const [active, setActive] = useState(0);
  const justify = center ? "justify-center" : "justify-center md:justify-start";
  const lineAlign = center ? "text-center" : "text-center md:text-left";
  const lineMargin = center ? "mx-auto" : "mx-auto md:mx-0";
  return (
    <div className="mt-8">
      <div className={`flex flex-nowrap items-baseline gap-x-5 sm:gap-x-7 ${justify}`}>
        {CITIES.map((c, i) => (
          <CityCode key={c.code} code={c.code} name={c.name} active={active === i} onEnter={() => setActive(i)} activeColor={activeColor} idleColor={idleColor} />
        ))}
      </div>
      <div className={`relative h-9 mt-4 max-w-md ${lineMargin}`}>
        {CITIES.map((c, i) => (
          <p
            key={c.code}
            className={`absolute inset-x-0 top-0 text-xs md:text-[13px] leading-relaxed transition-all duration-500 ${lineAlign}`}
            style={{ color: lineColor, opacity: active === i ? 1 : 0, transform: active === i ? "translateY(0)" : "translateY(8px)" }}
          >
            {c.line}
          </p>
        ))}
      </div>
    </div>
  );
}
