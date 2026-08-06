"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Button label that re-types itself on hover — backspaces to empty then types
 * back, matching the nav "Let's Chat" typewriter feel. A hidden copy reserves
 * the full width so the button never resizes mid-animation.
 */
export default function TypeText({ children, className = "" }: { children: string; className?: string }) {
  const full = children;
  const [text, setText] = useState(full);
  const [trigger, setTrigger] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (trigger === 0) return;
    let stop = false;
    let i = full.length;
    let deleting = true;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (stop) return;
      if (deleting) {
        i -= 1;
        setText(full.slice(0, i));
        if (i <= 0) deleting = false;
      } else {
        i += 1;
        setText(full.slice(0, i));
        if (i >= full.length) return;
      }
      t = setTimeout(tick, 34);
    };
    t = setTimeout(tick, 34);
    return () => { stop = true; clearTimeout(t); };
  }, [trigger, full]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setTrigger((x) => x + 1)}
    >
      <span aria-hidden className="invisible">{full}</span>
      <span className="absolute left-0 top-0 whitespace-nowrap">{text || " "}</span>
    </span>
  );
}
