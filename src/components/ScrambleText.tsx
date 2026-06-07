"use client";

import { useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*";

/**
 * Scrambles its letters on hover, then resolves left-to-right back to the
 * real text. Length is preserved so justified/688 layouts don't shift.
 */
export default function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const raf = useRef<number | undefined>(undefined);
  const frame = useRef(0);

  const run = () => {
    cancelAnimationFrame(raf.current ?? 0);
    frame.current = 0;
    const tick = () => {
      frame.current += 1;
      const revealed = frame.current / 3; // ~3 frames per resolved char
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || !/[a-zA-Z]/.test(ch)) { out += ch; continue; }
        if (i < revealed) out += ch;
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);
      if (revealed < text.length) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    tick();
  };

  return (
    <span onMouseEnter={run} className={className}>
      {display}
    </span>
  );
}
