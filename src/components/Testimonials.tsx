"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Testimonial } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
};

export default function Testimonials({ items = DEFAULT_CONTENT.testimonials }: { items?: Testimonial[] }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const paginate = (d: number) => setState([(index + d + items.length) % items.length, d]);
  const t = items[index];

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

      {/* giant quote — drag to swipe (touch-pan-y keeps vertical page scroll working) */}
      <div className="flex-1 flex items-center overflow-hidden" data-cursor="grab">
        <AnimatePresence custom={dir} mode="popLayout" initial={false}>
          <motion.blockquote
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            dragSnapToOrigin
            onDragEnd={(_e, info) => {
              if (info.offset.x < -70 || info.velocity.x < -450) paginate(1);
              else if (info.offset.x > 70 || info.velocity.x > 450) paginate(-1);
            }}
            whileDrag={{ cursor: "grabbing" }}
            className="font-sans font-bold uppercase leading-[0.92] tracking-[-0.02em] cursor-grab touch-pan-y"
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
