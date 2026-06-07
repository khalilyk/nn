"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  { q: "Everything finally felt like it belonged together. Guests started commenting on the look the day we opened.", name: "Bassil", role: "Owner — Tonton Bakes" },
  { q: "The photos didn't just look good — they felt like us. That's the part nobody else got right.", name: "Stasha", role: "Founder — PieHaus" },
  { q: "Every single touchpoint felt considered and cohesive. It changed how people talk about us.", name: "Zara", role: "Director — Tony's Woodfire" },
  { q: "Every frame was made to stop someone mid-scroll. Our bookings have never been the same.", name: "Neha", role: "Owner — Kinoya" },
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
    <div className="relative z-10 w-full flex flex-col items-center px-8 md:px-16 py-20">
      <p className="w-full max-w-3xl text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-10">In their words</p>

      {/* White card */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#F3F1EC] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)] overflow-hidden">
        <AnimatePresence custom={dir} mode="wait" initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 md:p-16 text-[#0A0A0A]"
          >
            {/* accent quote mark */}
            <svg width="44" height="34" viewBox="0 0 44 34" fill="#FF2EC4" aria-hidden className="mb-8">
              <path d="M0 34V19.5C0 8.7 7.2 1.4 18 0l2 6.5C13.5 8 10 11.4 10 16h8v18H0zm24 0V19.5C24 8.7 31.2 1.4 42 0l2 6.5C37.5 8 34 11.4 34 16h8v18H24z" />
            </svg>

            <blockquote className="font-sans font-medium leading-[1.18] tracking-[-0.01em]" style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.6rem)" }}>
              {t.q}
            </blockquote>

            <div className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span className="font-sans font-semibold text-[15px] md:text-[17px]">{t.name}</span>
              <span className="font-sans text-[15px] md:text-[17px] text-[#0A0A0A]/40">{t.role}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="w-full max-w-3xl flex items-center gap-5 mt-10">
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
        <span className="ml-auto text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
