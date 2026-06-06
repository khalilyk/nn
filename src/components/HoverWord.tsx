"use client";

import { useEffect, useRef, useState } from "react";

type Style = { fontFamily: string; fontStyle?: string; fontWeight?: number };

/* A varied pool of styles so each word cycles a different combination. */
const STYLES: Style[] = [
  { fontFamily: "var(--font-anton)" },
  { fontFamily: "var(--font-marker)", fontWeight: 700 },
  { fontFamily: "var(--font-grotesk)", fontWeight: 500 },
  { fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 700 },
  { fontFamily: "var(--font-playfair)", fontWeight: 900 },
  { fontFamily: "ui-monospace, monospace" },
  { fontFamily: "Georgia, serif", fontStyle: "italic" },
  { fontFamily: "var(--font-grotesk)", fontWeight: 300, fontStyle: "italic" },
];

/* Word that animates on hover.
   mode="bold"  → snaps to heavy weight
   mode="fonts" → scrolls through a distinct triple of font styles per word */
export default function HoverWord({
  children,
  mode = "fonts",
  variant = 0,
}: {
  children: string;
  mode?: "bold" | "fonts";
  variant?: number;
}) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Each word gets its own distinct rotation through the style pool
  const cycle = [
    STYLES[variant % STYLES.length],
    STYLES[(variant + 3) % STYLES.length],
    STYLES[(variant + 5) % STYLES.length],
  ];

  const enter = () => {
    if (mode === "bold") {
      setStyle({ fontWeight: 900, fontStyle: "normal" });
      return;
    }
    let i = 0;
    setStyle({ ...cycle[0] });
    timer.current = setInterval(() => {
      i = (i + 1) % cycle.length;
      setStyle({ ...cycle[i] });
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
