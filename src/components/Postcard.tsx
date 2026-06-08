"use client";

import { useState } from "react";

export default function Postcard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-3">A little note</p>
      <p className="text-[10px] tracking-[0.15em] uppercase text-[#B9B5AE]/35 mb-12">Click the card to turn it over</p>

      <div
        className="relative w-full max-w-2xl cursor-pointer"
        style={{ perspective: "1600px", aspectRatio: "3 / 2" }}
        onClick={() => setFlipped((f) => !f)}
        data-cursor="tap"
      >
        <div
          className="relative w-full h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* FRONT — photo side */}
          <div
            className="absolute inset-0 rounded-md overflow-hidden bg-[#0A0A0A] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)]"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nn-f1.png" alt="" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-9 text-[#F3F1EC]">
              <span className="font-display uppercase tracking-tight leading-none" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}>
                Greetings from
              </span>
              <span className="font-display uppercase tracking-[0.15em] text-[11px] md:text-[13px] self-end">
                Sydney · Dubai · Beirut
              </span>
            </div>
          </div>

          {/* BACK — postcard reverse */}
          <div
            className="absolute inset-0 rounded-md overflow-hidden bg-[#F3F1EC] text-[#0A0A0A] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)] flex"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            {/* message */}
            <div className="flex-1 p-6 md:p-9 flex flex-col justify-between border-r border-[#0A0A0A]/15">
              <p className="font-marker leading-snug" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)" }}>
                Wish you were here — let&apos;s make something nobody forgets.
              </p>
              <span className="font-marker text-[#0A0A0A]/70" style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}>— Not Normal</span>
            </div>

            {/* address + stamp */}
            <div className="w-[42%] p-6 md:p-9 flex flex-col">
              <div className="self-end w-14 h-16 md:w-16 md:h-20 border border-[#0A0A0A]/30 rounded-sm flex items-center justify-center mb-8">
                <span className="font-display text-[#0A0A0A]/30 text-2xl">☺</span>
              </div>
              <div className="space-y-3 mt-auto">
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#0A0A0A]/40">To whoever refuses to blend in</p>
                <div className="h-px bg-[#0A0A0A]/20" />
                <div className="h-px bg-[#0A0A0A]/20" />
                <a href="mailto:hello@thisisnn.com" onClick={(e) => e.stopPropagation()} className="block text-[11px] tracking-[0.12em] uppercase hover:opacity-60 transition-opacity">hello@thisisnn.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
