"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const CARD_SHADOW =
  "0 8px 16px rgba(0,0,0,0.28), 0 24px 44px -12px rgba(0,0,0,0.45), 0 48px 90px -24px rgba(0,0,0,0.55)";

export default function Postcard() {
  const board = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const dragging = useRef(false);

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#F3EDE0]/80 mb-3">A little note</p>
      <p className="text-[10px] tracking-[0.15em] uppercase text-[#F3EDE0]/45 mb-12">Drag it around · click to flip</p>

      {/* drag board */}
      <div ref={board} className="relative w-full" style={{ height: "clamp(420px, 62vh, 620px)" }}>
        <motion.div
          drag
          dragConstraints={board}
          dragMomentum={false}
          dragElastic={0.15}
          onDragStart={() => { dragging.current = true; }}
          onDragEnd={() => { setTimeout(() => { dragging.current = false; }, 0); }}
          whileDrag={{ scale: 1.03 }}
          onClick={() => { if (!dragging.current) setFlipped((f) => !f); }}
          data-cursor="grab"
          className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
          style={{ perspective: "1600px", aspectRatio: "3 / 2" }}
        >
          <div
            className="relative w-full h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {/* FRONT — artwork, original colour */}
            <div
              className="absolute inset-0 rounded-[3px] overflow-hidden bg-[#0A0A0A]"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", boxShadow: CARD_SHADOW }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/postcard-art.png" alt="" draggable={false} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
            </div>

            {/* BACK — page 2 of the PDF (caption) */}
            <div
              className="absolute inset-0 rounded-[3px] overflow-hidden bg-[#F3EDE0]"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", boxShadow: CARD_SHADOW }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/postcard-art-2.png" alt="" draggable={false} className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
