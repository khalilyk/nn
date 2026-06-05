"use client";

import { useEffect, useRef, useState } from "react";

const BASE = "The Full Menu";
const ALT = "What We Do";

/* Dark-on-ivory button that types The Full Menu → What We Do on hover. */
export default function MenuLink() {
  const [hovered, setHovered] = useState(false);
  const [text, setText] = useState(BASE);
  const cur = useRef(BASE);

  useEffect(() => {
    const target = hovered ? ALT : BASE;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (cancelled) return;
      const c = cur.current;
      if (c === target) return;
      const next = !target.startsWith(c) ? c.slice(0, -1) : target.slice(0, c.length + 1);
      cur.current = next;
      setText(next || " ");
      timer = setTimeout(step, 45);
    };
    step();
    return () => { cancelled = true; clearTimeout(timer); };
  }, [hovered]);

  return (
    <a
      href="#s04"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-3 rounded-full border border-[#0A0A0A] px-6 py-3 hover:bg-[#0A0A0A]/5 transition-colors"
      style={{ borderWidth: "1px" }}
    >
      <span className="text-[10px] tracking-[0.22em] uppercase min-w-[7.5em]">{text}</span>
      <span className="relative w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center">
        <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
        <span className="absolute inset-0 rounded-full border border-current animate-ping opacity-60" />
      </span>
    </a>
  );
}
