"use client";

import { useEffect, useState } from "react";

/* Black Pac-Man chasing a black ghost, looping across the screen.
   The gap to the ghost shifts at random intervals so it feels like a real chase. */
export default function PacMan() {
  const [gap, setGap] = useState(8);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setGap(6 + Math.random() * 60); // random gap
      timer = setTimeout(tick, 600 + Math.random() * 1600); // random cadence
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-10 overflow-hidden mt-8">
      <div
        className="absolute bottom-0 left-0 flex items-end"
        style={{ animation: "pac-run 11s linear infinite" }}
      >
        {/* Pac-Man */}
        <div
          className="rounded-full shrink-0"
          style={{ width: 26, height: 26, background: "#0A0A0A", animation: "pac-chomp 0.35s linear infinite" }}
        />
        {/* Ghost — random gap */}
        <svg
          width="24"
          height="26"
          viewBox="0 0 24 26"
          aria-hidden
          className="shrink-0"
          style={{ marginLeft: gap, transition: "margin-left 0.9s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <path d="M2 13a10 10 0 0 1 20 0v11l-3.3-2.2L15.3 24 12 21.8 8.7 24 5.3 21.8 2 24V13Z" fill="#0A0A0A" />
          <circle cx="8.5" cy="12" r="2.4" fill="#F3F1EC" />
          <circle cx="15.5" cy="12" r="2.4" fill="#F3F1EC" />
        </svg>
      </div>
    </div>
  );
}
