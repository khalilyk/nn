"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  { q: "Everything finally felt like it belonged together. Guests started commenting on the look the day we opened.", name: "Bassil", venue: "Tonton Bakes" },
  { q: "The photos didn't just look good — they felt like us. That's the part nobody else got right.", name: "Stasha", venue: "PieHaus" },
  { q: "Every single touchpoint felt considered and cohesive. It changed how people talk about us.", name: "Zara", venue: "Tony's Woodfire" },
  { q: "Every frame was made to stop someone mid-scroll. Our bookings have never been the same.", name: "Neha", venue: "Kinoya" },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, scale: 0.92, opacity: 0 }),
  center: { x: 0, scale: 1, opacity: 1, rotate: 0 },
  exit: (dir: number) => ({
    x: dir > 0 ? -460 : 460,
    rotate: dir > 0 ? -16 : 16,
    opacity: 0,
  }),
};

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const paginate = (d: number) => setState([(index + d + quotes.length) % quotes.length, d]);
  const t = quotes[index];

  return (
    <div className="relative z-10 w-full flex flex-col items-center px-8 md:px-16 py-20">
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-14">In their words</p>

      {/* Card deck */}
      <div className="relative w-full max-w-md" style={{ height: "clamp(340px, 48vh, 440px)" }}>
        {/* static cards behind for the stacked-deck look */}
        <div className="absolute inset-0 rounded-3xl bg-[#121212] border border-white/8" style={{ transform: "translate(-22px, 18px) rotate(-7deg)" }} />
        <div className="absolute inset-0 rounded-3xl bg-[#161616] border border-white/8" style={{ transform: "translate(14px, 10px) rotate(4deg)" }} />

        {/* active card */}
        <AnimatePresence custom={dir} mode="popLayout" initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) paginate(1);
              else if (info.offset.x > 80) paginate(-1);
            }}
            className="absolute inset-0 rounded-3xl bg-[#0A0A0A] border border-white/12 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] flex flex-col justify-between p-9 md:p-11 cursor-grab active:cursor-grabbing select-none"
            data-cursor="grab"
          >
            <span className="font-display text-[#F3F1EC] text-2xl leading-none">&ldquo;</span>
            <blockquote className="font-editorial italic text-[#F3F1EC] leading-[1.3]" style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)" }}>
              {t.q}
            </blockquote>
            <div className="pt-5 border-t border-white/12">
              <p className="font-display tracking-[0.12em] uppercase text-[#F3F1EC]" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>{t.name}</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE] mt-1.5">{t.venue}</p>
            </div>
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
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}
        </span>
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
