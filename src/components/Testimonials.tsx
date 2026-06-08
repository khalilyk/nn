"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { q: "Everything finally felt like it belonged together.", name: "Bassil", venue: "Tonton Bakes", color: "#FF5C1A" },
  { q: "The photos didn't just look good, they felt like us.", name: "Stasha", venue: "PieHaus", color: "#FF2EC4" },
  { q: "Every touchpoint felt considered and cohesive.", name: "Zara", venue: "Tony's Woodfire", color: "#6AB7FF" },
  { q: "Every frame was made to stop someone mid-scroll.", name: "Neha", venue: "Kinoya", color: "#C9A7FF" },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
};

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const paginate = (d: number) => setState([(index + d + items.length) % items.length, d]);
  const t = items[index];

  // Swipe detection (no element follows the pointer)
  const startX = useRef<number | null>(null);
  const onDown = (e: React.PointerEvent) => { startX.current = e.clientX; };
  const onUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (dx < -60) paginate(1);
    else if (dx > 60) paginate(-1);
  };

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-8 md:p-16 text-[#0A0A0A] select-none"
      style={{ background: t.color, transition: "background 0.5s ease" }}
    >
      {/* top row */}
      <div className="flex items-center justify-between">
        <span className="font-sans font-bold text-[11px] md:text-[13px] tracking-[0.15em] uppercase">Hot Takes</span>
        <span className="font-sans text-[11px] md:text-[13px] tracking-[0.15em] uppercase tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </div>

      {/* giant quote */}
      <div
        className="flex-1 flex items-center"
        onPointerDown={onDown}
        onPointerUp={onUp}
        data-cursor="grab"
      >
        <AnimatePresence custom={dir} mode="wait" initial={false}>
          <motion.blockquote
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-bold uppercase leading-[0.92] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.4rem, 8vw, 6.5rem)" }}
          >
            {t.q}
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* bottom row */}
      <div className="flex items-end justify-between">
        <span className="font-sans font-bold text-[11px] md:text-[13px] tracking-[0.15em] uppercase">
          {t.name}, {t.venue}
        </span>
        <button
          onClick={() => paginate(1)}
          aria-label="Next"
          data-cursor="tap"
          className="font-sans font-bold text-[12px] md:text-[15px] tracking-[0.15em] uppercase flex items-center gap-2 hover:gap-3 transition-all"
        >
          Swipe <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
