"use client";

import { useEffect, useRef, useState } from "react";

const FONTS = [
  "var(--font-anton)",
  "var(--font-marker)",
  "var(--font-grotesk)",
  "var(--font-playfair)",
];

/* Word that animates on hover.
   mode="bold"  → snaps to heavy weight
   mode="fonts" → scrolls through 3 random font styles while hovered */
export default function HoverWord({
  children,
  mode = "fonts",
}: {
  children: string;
  mode?: "bold" | "fonts";
}) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const enter = () => {
    if (mode === "bold") {
      setStyle({ fontWeight: 900, fontStyle: "normal" });
      return;
    }
    const pool = [...FONTS].sort(() => Math.random() - 0.5).slice(0, 3);
    let i = 0;
    setStyle({ fontFamily: pool[0], fontStyle: "normal" });
    timer.current = setInterval(() => {
      i = (i + 1) % pool.length;
      setStyle({ fontFamily: pool[i], fontStyle: "normal" });
    }, 150);
  };

  const leave = () => {
    if (timer.current) clearInterval(timer.current);
    setStyle({});
  };

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  return (
    <span
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="inline-block cursor-default"
      style={{ transition: "font-weight 0.2s ease", ...style }}
    >
      {children}
    </span>
  );
}
