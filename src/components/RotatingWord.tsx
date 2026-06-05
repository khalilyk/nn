"use client";

import { useEffect, useState } from "react";

const words = [
  "memorable",
  "hospitable",
  "different",
  "warm",
  "a storyteller",
  "inviting",
  "yourself",
];

export default function RotatingWord({ interval = 2500 }: { interval?: number }) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setShow(false); // fade out
      setTimeout(() => {
        setI((prev) => (prev + 1) % words.length);
        setShow(true); // fade in next
      }, 450);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <span className="inline-flex items-baseline gap-3">
      <span className="opacity-30">[</span>
      <span className="relative inline-block overflow-hidden align-baseline" style={{ minWidth: "6ch" }}>
        <span
          className="italic inline-block transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(-0.4em)",
          }}
        >
          {words[i]}
        </span>
      </span>
      <span className="opacity-30">]</span>
    </span>
  );
}
