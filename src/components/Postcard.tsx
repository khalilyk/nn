"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const CARD_SHADOW =
  "0 8px 16px rgba(0,0,0,0.28), 0 24px 44px -12px rgba(0,0,0,0.45), 0 48px 90px -24px rgba(0,0,0,0.55)";

export default function Postcard() {
  const board = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const dragging = useRef(false);

  const MAX = 12; // degrees
  const onMove = (e: React.PointerEvent) => {
    const t = tilt.current;
    if (!t) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    t.style.transform = `rotateX(${-py * MAX}deg) rotateY(${px * MAX}deg)`;
  };
  const onLeave = () => {
    if (tilt.current) tilt.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className="w-full flex flex-col items-center">
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
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          data-cursor="Flip"
          className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
          style={{ perspective: "1600px", aspectRatio: "1599 / 1127" }}
        >
          {/* tilt layer (follows cursor) */}
          <div
            ref={tilt}
            className="w-full h-full"
            style={{ transformStyle: "preserve-3d", transition: "transform 0.2s ease-out" }}
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
              <img src="/postcard-art-2.png" alt="" draggable={false} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
              <div className="absolute inset-0 flex items-start justify-center px-[8%] pt-[6%] pb-[20%] pointer-events-none">
                <div className="font-editorial text-[#0A0A0A] leading-snug md:leading-relaxed space-y-1.5 md:space-y-2.5 max-w-md" style={{ fontSize: "clamp(0.5rem, 1.9vw, 0.85rem)" }}>
                  <p>Hanging in our office and a favourite of ours, it shows Abraham, who didn&apos;t wait to know who was standing before him. He saw guests approaching and immediately focused on making them comfortable, welcome and cared for.</p>
                  <p>He offered shade, water, bread, and a feast prepared from the best he had. No shortcuts, no hesitation.</p>
                  <p>For us, that&apos;s hospitality. Not serving what&apos;s convenient, but giving your best to every person who walks through the door.</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
