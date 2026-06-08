"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CARD_SHADOW =
  "0 8px 16px rgba(0,0,0,0.28), 0 24px 44px -12px rgba(0,0,0,0.45), 0 48px 90px -24px rgba(0,0,0,0.55)";

const MESSAGE = [
  "Hanging in our office and a favourite of ours, it shows Abraham, who didn't wait to know who was standing before him. He saw guests approaching and immediately focused on making them comfortable, welcome and cared for.",
  "He offered shade, water, bread, and a feast prepared from the best he had. No shortcuts, no hesitation.",
  "For us, that's hospitality. Not serving what's convenient, but giving your best to every person who walks through the door.",
];

export default function Postcard() {
  const board = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const dragging = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ── MOBILE: stacked fronts → tap → tall portrait back ──
  if (!isDesktop) {
    return (
      <div className="w-full flex flex-col items-center">
        {!expanded ? (
          <div className="w-full flex flex-col gap-5" onClick={() => setExpanded(true)} data-cursor="Flip">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative w-full rounded-[3px] overflow-hidden bg-[#0A0A0A]"
                style={{ aspectRatio: "1599 / 1127", boxShadow: CARD_SHADOW }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/postcard-art.png" alt="" draggable={false} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="w-full max-w-sm mx-auto rounded-md bg-[#F3EDE0] text-[#0A0A0A] p-7 flex flex-col items-center text-center gap-6"
            style={{ boxShadow: CARD_SHADOW }}
            onClick={() => setExpanded(false)}
            data-cursor="Close"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/postcard-art.png" alt="" draggable={false} className="w-full rounded-[3px]" style={{ aspectRatio: "1599 / 1127", objectFit: "cover" }} />
            <div className="font-editorial leading-relaxed space-y-4" style={{ fontSize: "clamp(1rem, 4.2vw, 1.2rem)" }}>
              {MESSAGE.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <p className="text-[10px] tracking-[0.12em] uppercase text-[#0A0A0A]/45 mt-2">
              Abraham Welcoming the Three Angels — Francesco Guardi, 1750s
            </p>
          </div>
        )}
      </div>
    );
  }

  // ── DESKTOP: draggable + flip card ──
  const MAX = 12;
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
          <div ref={tilt} className="w-full h-full" style={{ transformStyle: "preserve-3d", transition: "transform 0.2s ease-out" }}>
            <div
              className="relative w-full h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
              {/* FRONT */}
              <div
                className="absolute inset-0 rounded-[3px] overflow-hidden bg-[#0A0A0A]"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", boxShadow: CARD_SHADOW }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/postcard-art.png" alt="" draggable={false} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
              </div>

              {/* BACK */}
              <div
                className="absolute inset-0 rounded-[3px] overflow-hidden bg-[#F3EDE0]"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", boxShadow: CARD_SHADOW }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/postcard-art-2.png" alt="" draggable={false} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                <div className="absolute inset-0 flex items-start justify-center px-[8%] pt-[6%] pb-[20%] pointer-events-none">
                  <div className="font-editorial text-[#0A0A0A] leading-relaxed space-y-2.5 max-w-md" style={{ fontSize: "clamp(0.6rem, 1.15vw, 0.85rem)" }}>
                    {MESSAGE.map((p, i) => <p key={i}>{p}</p>)}
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
