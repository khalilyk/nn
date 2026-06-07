"use client";

import { Fragment, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*";

/* A single word that scrambles on hover, resolving left-to-right. */
function Word({ word }: { word: string }) {
  const [display, setDisplay] = useState(word);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const run = () => {
    clearInterval(timer.current);
    let step = 0;
    timer.current = setInterval(() => {
      step += 1;
      const revealed = Math.floor(step / 5); // 5 ticks per resolved char (slow)
      let out = "";
      for (let i = 0; i < word.length; i++) {
        const ch = word[i];
        if (!/[a-zA-Z]/.test(ch)) { out += ch; continue; }
        out += i < revealed ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);
      if (revealed >= word.length) {
        clearInterval(timer.current);
        setDisplay(word);
      }
    }, 70); // 70ms per tick → unhurried flicker
  };

  return (
    <span onMouseEnter={run} className="inline-block">
      {display}
    </span>
  );
}

/* Splits text into words; each scrambles independently on hover. */
export default function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : ""}
          <Word word={w} />
        </Fragment>
      ))}
    </span>
  );
}
