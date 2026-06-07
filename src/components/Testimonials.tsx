"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  { q: "Everything finally felt like it belonged together.", name: "Bassil", venue: "Tonton Bakes" },
  { q: "The photos didn't just look good — they felt like us.", name: "Stasha", venue: "PieHaus" },
  { q: "Every touchpoint felt considered and cohesive.", name: "Zara", venue: "Tony's Woodfire" },
  { q: "Every frame was made to stop someone mid-scroll.", name: "Neha", venue: "Kinoya" },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const paginate = (d: number) => setState([(index + d + quotes.length) % quotes.length, d]);
  const t = quotes[index];

  return (
    <div className="relative z-10 w-full flex flex-col items-center px-8 md:px-16 py-20">
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-12">In their words</p>

      <div className="relative w-full max-w-3xl flex items-center gap-4 md:gap-8">
        {/* Prev */}
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous"
          data-cursor="tap"
          className="shrink-0 w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-[#F3F1EC] transition-colors hover:bg-[#F3F1EC] hover:text-[#0A0A0A]"
        >
          ←
        </button>

        {/* White card */}
        <div className="relative flex-1 overflow-hidden rounded-xl bg-[#F3F1EC] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)]" style={{ aspectRatio: "1.7 / 1" }}>
          <AnimatePresence custom={dir} mode="wait" initial={false}>
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 text-[#0A0A0A]"
            >
              <p className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#0A0A0A]/45 text-center">{t.venue}</p>

              <blockquote
                className="font-editorial leading-[1.15] text-center px-2"
                style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.6rem)" }}
              >
                {t.q}
              </blockquote>

              <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-center font-medium">{t.name}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next */}
        <button
          onClick={() => paginate(1)}
          aria-label="Next"
          data-cursor="tap"
          className="shrink-0 w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-[#F3F1EC] transition-colors hover:bg-[#F3F1EC] hover:text-[#0A0A0A]"
        >
          →
        </button>
      </div>

      <span className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 tabular-nums mt-10">
        {String(index + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}
      </span>
    </div>
  );
}
