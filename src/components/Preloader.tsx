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
      className="fixed inset-0 z-[300] bg-[#0A0A0A] flex flex-col items-center justify-center"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.95s cubic-bezier(0.76,0,0.24,1)",
      }}
    >
      <div className="overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/notnormal-logoblack.png"
          alt="Not Normal"
          style={{
            width: "clamp(220px, 40vw, 560px)",
            filter: "invert(1)",
            transform: leaving ? "translateY(-110%)" : "translateY(0)",
            transition: "transform 0.7s cubic-bezier(0.76,0,0.24,1)",
          }}
        />
      </div>
      <div className="absolute bottom-10 right-8 md:right-16">
        <span className="font-display text-[#F3F1EC]/70" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
          {String(count).padStart(3, "0")}
        </span>
      </div>
      <div className="absolute bottom-12 left-8 md:left-16">
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#F3F1EC]/40">Hospitality · Brand · Marketing</span>
      </div>
    </div>
  );
}
