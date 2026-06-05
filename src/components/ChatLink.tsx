"use client";

import { useEffect, useRef, useState } from "react";

const BASE = "Let's Chat";
const ALT = "Oh Hey!";

/* Nav CTA that types from "Let's Chat" → "Oh Hey!" on hover and back on leave. */
export default function ChatLink() {
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
      let next: string;
      if (!target.startsWith(c)) {
        next = c.slice(0, -1); // backspace mismatched tail
      } else {
        next = target.slice(0, c.length + 1); // type forward
      }
      cur.current = next;
      setText(next || " ");
      timer = setTimeout(step, 45);
    };
    step();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [hovered]);

  return (
    <a
      href="#footer"
      data-cursor="Chat"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 border border-current rounded-full px-4 py-2 hover:bg-current/5 transition-colors"
      style={{ borderWidth: "1px" }}
    >
      <span className="text-[10px] tracking-[0.22em] uppercase min-w-[5.5em]">{text}</span>
      <span className="relative w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center">
        <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
        <span className="absolute inset-0 rounded-full border border-current animate-ping opacity-60" />
      </span>
    </a>
  );
}
