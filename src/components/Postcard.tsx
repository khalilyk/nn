"use client";

import { useState } from "react";

const CARD_SHADOW =
  "0 8px 16px rgba(0,0,0,0.28), 0 24px 44px -12px rgba(0,0,0,0.45), 0 48px 90px -24px rgba(0,0,0,0.55)";

export default function Postcard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#F3EDE0]/80 mb-3">A little note</p>
      <p className="text-[10px] tracking-[0.15em] uppercase text-[#F3EDE0]/45 mb-12">Click the card to turn it over</p>

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
          {/* FRONT — vintage postcard */}
          <div
            className="absolute inset-0 rounded-[3px] bg-[#ECE6D6] flex flex-col p-[3.5%]"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", boxShadow: CARD_SHADOW }}
          >
            {/* top label */}
            <p className="text-center font-sans uppercase text-[#1a1a1a] tracking-[0.25em] text-[10px] md:text-[13px] py-1.5">
              Not Normal Co.
            </p>

            {/* photo + script */}
            <div className="relative flex-1 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/postcard-art.png" alt="" draggable={false} className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05]" />
              <div className="absolute inset-0 bg-[#000]/15" />
              <span
                className="absolute inset-0 flex items-center justify-center font-marker text-[#F3EDE0] -rotate-[4deg]"
                style={{ fontSize: "clamp(2.6rem, 9vw, 5.5rem)", textShadow: "0 3px 14px rgba(0,0,0,0.55)" }}
              >
                Greetings
              </span>
            </div>

            {/* bottom labels */}
            <div className="flex items-center justify-between font-sans uppercase text-[#1a1a1a] tracking-[0.2em] text-[8px] md:text-[11px] py-1.5">
              <span>Nobody Remembers</span>
              <span className="text-[#1a1a1a]">★</span>
              <span>Normal</span>
            </div>
          </div>

          {/* BACK — postcard reverse */}
          <div
            className="absolute inset-0 rounded-[3px] overflow-hidden bg-[#ECE6D6] text-[#0A0A0A] flex"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", boxShadow: CARD_SHADOW }}
          >
            {/* message */}
            <div className="flex-1 p-6 md:p-9 flex flex-col justify-between border-r border-[#0A0A0A]/15">
              <p className="font-marker leading-snug" style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.9rem)" }}>
                Wish you were here — let&apos;s make something nobody forgets.
              </p>
              <span className="font-marker text-[#0A0A0A]/70" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>— Not Normal</span>
            </div>

            {/* address + stamp */}
            <div className="w-[42%] p-6 md:p-9 flex flex-col">
              <div className="self-end w-14 h-16 md:w-16 md:h-20 border border-[#0A0A0A]/30 rounded-sm flex items-center justify-center mb-8">
                <span className="text-[#0A0A0A]/30 text-2xl">★</span>
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
