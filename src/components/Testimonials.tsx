"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  { q: "Everything finally felt like it belonged together.", name: "Bassil", role: "Owner — Tonton Bakes" },
  { q: "The photos didn't just look good — they felt like us.", name: "Stasha", role: "Founder — PieHaus" },
  { q: "Every touchpoint felt considered and cohesive.", name: "Zara", role: "Director — Tony's Woodfire" },
  { q: "Every frame was made to stop someone mid-scroll.", name: "Neha", role: "Owner — Kinoya" },
];

const stickers = [
  { t: "Strategy", r: -5, x: -46 },
  { t: "Storytelling", r: 4, x: 54 },
  { t: "Simplicity", r: -3, x: -34 },
  { t: "Connection", r: 3, x: 36 },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
};

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const paginate = (d: number) => setState([(index + d + quotes.length) % quotes.length, d]);
  const t = quotes[index];

  return (
    <div className="relative z-10 w-full flex flex-col items-center text-center px-8 md:px-16 py-24">
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-12">In their words</p>

      {/* Pink sticker words */}
      <div className="flex flex-col items-center -space-y-2 md:-space-y-3 mb-14">
        {stickers.map((s) => (
          <span
            key={s.t}
            className="font-display uppercase text-[#0A0A0A] bg-[#FF2EC4] leading-none px-5 py-2.5 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)]"
            style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", transform: `rotate(${s.r}deg) translateX(${s.x}px)`, borderRadius: 4 }}
          >
            {s.t}
          </span>
        ))}
      </div>

      {/* Big serif quote */}
      <div className="relative w-full max-w-3xl min-h-[6em] flex items-center justify-center">
        <AnimatePresence custom={dir} mode="wait" initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <blockquote className="font-editorial text-[#F3F1EC] leading-[1.05]" style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)" }}>
              {t.q}
            </blockquote>
            <p className="mt-7 text-[13px] md:text-[15px] text-[#B9B5AE]">
              <span className="text-[#F3F1EC]">{t.name}</span>{" — "}{t.role.replace(/^.*— /, "")}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-5 mt-12">
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous"
          data-cursor="tap"
          className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-[#F3F1EC] transition-colors hover:bg-[#F3F1EC] hover:text-[#0A0A0A]"
        >
          ←
        </button>
        <button
          onClick={() => paginate(1)}
          aria-label="Next"
          data-cursor="tap"
          className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-[#F3F1EC] transition-colors hover:bg-[#F3F1EC] hover:text-[#0A0A0A]"
        >
          →
        </button>
      </div>
    </div>
  );
}
