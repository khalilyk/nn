"use client";

import { useEffect, useState } from "react";

export default function Preloader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += Math.floor(Math.random() * 9) + 7;
      if (n >= 100) {
        n = 100;
        clearInterval(id);
        setCount(100);
        setTimeout(() => setLeaving(true), 180);
        setTimeout(() => {
          setGone(true);
          onDone?.();
        }, 880);
      } else {
        setCount(n);
      }
    }, 55);
    return () => clearInterval(id);
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[300] bg-[#0A0A0A] overflow-hidden flex items-end"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.7s cubic-bezier(0.76,0,0.24,1)",
      }}
    >
      {/* water that fills the page from the bottom as it loads */}
      <div
        className="absolute bottom-0 left-0 w-full bg-[#81D742]"
        style={{ height: `${count}%`, transition: "height 0.3s cubic-bezier(0.3,0,0.2,1)" }}
      >
        {/* wavy crest on the water line */}
        <div className="absolute left-0 -top-3 w-full h-4 overflow-hidden pointer-events-none">
          <svg className="water-wave absolute bottom-0 left-0 w-[200%] h-full" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path d="M0 22 Q 150 2 300 22 T 600 22 T 900 22 T 1200 22 L1200 40 L0 40 Z" fill="#81D742" />
          </svg>
        </div>
      </div>

      {/* label, top */}
      <div className="absolute top-10 left-8 md:left-16 z-10">
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#F3F1EC]/40 mix-blend-difference">Hospitality · Brand · Marketing</span>
      </div>
      <div className="absolute top-10 right-8 md:right-16 z-10">
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#F3F1EC]/40 mix-blend-difference">Loading</span>
      </div>

      {/* giant full-page percentage */}
      <div className="relative z-10 w-full px-4 md:px-8 pb-2 md:pb-4 flex items-end leading-none text-[#F3F1EC] mix-blend-difference">
        <span className="font-display uppercase leading-[0.74]" style={{ fontSize: "clamp(7rem, 36vw, 30rem)" }}>
          {count}
        </span>
        <span className="font-display uppercase leading-none mb-[0.12em] ml-1" style={{ fontSize: "clamp(2rem, 9vw, 7rem)" }}>
          %
        </span>
      </div>
    </div>
  );
}
