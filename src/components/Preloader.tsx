"use client";

import { useEffect, useState } from "react";

export default function Preloader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += Math.floor(Math.random() * 7) + 3;
      if (n >= 100) {
        n = 100;
        clearInterval(id);
        setCount(100);
        setTimeout(() => setLeaving(true), 350);
        setTimeout(() => {
          setGone(true);
          onDone?.();
        }, 1300);
      } else {
        setCount(n);
      }
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[300] bg-[#0A0A0A] overflow-hidden flex items-end"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.95s cubic-bezier(0.76,0,0.24,1)",
      }}
    >
      {/* label, top */}
      <div className="absolute top-10 left-8 md:left-16">
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#F3F1EC]/40">Hospitality · Brand · Marketing</span>
      </div>
      <div className="absolute top-10 right-8 md:right-16">
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#F3F1EC]/40">Loading</span>
      </div>

      {/* giant full-page percentage */}
      <div className="w-full px-4 md:px-8 pb-2 md:pb-4 flex items-end leading-none">
        <span className="font-display uppercase text-[#F3F1EC] leading-[0.74]" style={{ fontSize: "clamp(7rem, 36vw, 30rem)" }}>
          {count}
        </span>
        <span className="font-display uppercase text-[#81D742] leading-none mb-[0.12em] ml-1" style={{ fontSize: "clamp(2rem, 9vw, 7rem)" }}>
          %
        </span>
      </div>

      {/* progress fill bar */}
      <div className="absolute bottom-0 left-0 h-[6px] bg-[#81D742]" style={{ width: `${count}%`, transition: "width 0.18s linear" }} />
    </div>
  );
}
