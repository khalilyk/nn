"use client";

import { useEffect, useState } from "react";

/* ASCII papers / drawings / logos that build themselves up, cycling on an interval. */
const frames: { title: string; art: string[] }[] = [
  {
    title: "identity · logomark",
    art: [
      "┌───────────────────────┐",
      "│                       │",
      "│   N N   NOT NORMAL     │",
      "│   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀       │",
      "│   hospitality brand    │",
      "│   ™  v1.0              │",
      "│                       │",
      "└───────────────────────┘",
    ],
  },
  {
    title: "brand book · spread",
    art: [
      "╔═══════════════════════╗",
      "║  BRAND BOOK           ║",
      "║  ───────────────────  ║",
      "║  ▦▦▦▦   colour        ║",
      "║  ▦▦▦▦   type · grid   ║",
      "║  Aa Bb Cc  Druk·Serif ║",
      "║  voice · tone · story ║",
      "╚═══════════════════════╝",
    ],
  },
  {
    title: "sketch · concept 03",
    art: [
      "+-----------------------+",
      "|     ___               |",
      "|    /   \\   menu       |",
      "|    \\___/   ~~~~~~      |",
      "|    o o o   ~~~~        |",
      "|   [plate]  signage    |",
      "|   draft · pencil      |",
      "+-----------------------+",
    ],
  },
  {
    title: "moodboard · grid",
    art: [
      ".......................",
      "[▣][▣][▣]   warm        ",
      "[▣][ ][▣]   editorial   ",
      "[▣][▣][▣]   tactile     ",
      " ref · ref · ref        ",
      " palette locked         ",
      ".......................",
    ],
  },
  {
    title: "campaign · layout",
    art: [
      "┌───────────┬───────────┐",
      "│  HEADLINE │   image    │",
      "│  ───────  │  ▒▒▒▒▒▒    │",
      "│  body····· │ ▒▒▒▒▒▒    │",
      "│  > cta     │ ▒▒▒▒▒▒    │",
      "└───────────┴───────────┘",
      "  press · social · ooh   ",
    ],
  },
];

export default function AsciiBuilder({ interval = 30000 }: { interval?: number }) {
  const [frame, setFrame] = useState(0);
  const [shown, setShown] = useState(0);

  // advance to next composition on the interval
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % frames.length), interval);
    return () => clearInterval(id);
  }, [interval]);

  // build the current composition up, line by line
  useEffect(() => {
    setShown(0);
    const total = frames[frame].art.length;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= total) clearInterval(id);
    }, 260);
    return () => clearInterval(id);
  }, [frame]);

  const art = frames[frame].art;
  const building = shown < art.length;

  return (
    <div className="w-full font-mono text-[#0A0A0A]" style={{ fontSize: "clamp(10px, 1.1vw, 14px)" }}>
      {/* status */}
      <div className="flex items-center justify-between mb-4 text-[9px] tracking-[0.2em] uppercase text-[#0A0A0A]/40">
        <span>{frames[frame].title}</span>
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${building ? "bg-[#0A0A0A] animate-pulse" : "bg-[#0A0A0A]/30"}`} />
          {building ? "building" : "rendered"}
        </span>
      </div>

      {/* art */}
      <pre className="leading-[1.35] whitespace-pre overflow-hidden">
        {art.map((line, i) => (
          <div key={i} style={{ opacity: i < shown ? 1 : 0, transition: "opacity 0.2s" }}>
            {i < shown ? line : ""}
            {i === shown - 1 && building && (
              <span className="inline-block w-[0.6em] h-[1em] ml-0.5 align-middle bg-[#0A0A0A] animate-pulse" />
            )}
          </div>
        ))}
      </pre>

      {/* progress dots */}
      <div className="flex gap-1.5 mt-5">
        {frames.map((_, i) => (
          <span key={i} className={`h-px flex-1 ${i === frame ? "bg-[#0A0A0A]" : "bg-[#0A0A0A]/15"}`} />
        ))}
      </div>
    </div>
  );
}
