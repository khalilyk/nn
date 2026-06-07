"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const quotes = [
  { q: "Everything finally felt like it belonged together. Guests started commenting on the look the day we opened.", name: "Bassil", venue: "Tonton Bakes", pos: { left: "2%", top: "6%" }, rot: -6 },
  { q: "The photos didn't just look good — they felt like us. That's the part nobody else got right.", name: "Stasha", venue: "PieHaus", pos: { left: "52%", top: "0%" }, rot: 5 },
  { q: "Every single touchpoint felt considered and cohesive. It changed how people talk about us.", name: "Zara", venue: "Tony's Woodfire", pos: { left: "8%", top: "46%" }, rot: 4 },
  { q: "Every frame was made to stop someone mid-scroll. Our bookings have never been the same.", name: "Neha", venue: "Kinoya", pos: { left: "55%", top: "44%" }, rot: -4 },
];

export default function Testimonials() {
  const board = useRef<HTMLDivElement>(null);
  const [z, setZ] = useState(quotes.map((_, i) => i + 1));
  const top = useRef(quotes.length);

  const bringToFront = (i: number) => {
    top.current += 1;
    setZ((prev) => prev.map((v, idx) => (idx === i ? top.current : v)));
  };

  return (
    <div className="relative z-10 w-full flex flex-col items-center px-8 md:px-16 py-20">
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-3">In their words</p>
      <p className="text-[10px] tracking-[0.15em] uppercase text-[#0A0A0A]/30 mb-12">Drag the cards around</p>

      {/* Whiteboard */}
      <div ref={board} className="relative w-full max-w-4xl" style={{ height: "clamp(560px, 78vh, 720px)" }}>
        {quotes.map((t, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={board}
            dragMomentum={false}
            dragElastic={0.12}
            onPointerDown={() => bringToFront(i)}
            whileDrag={{ scale: 1.04 }}
            initial={{ rotate: t.rot }}
            style={{
              left: t.pos.left,
              top: t.pos.top,
              zIndex: z[i],
              boxShadow:
                "0 2px 6px rgba(0,0,0,0.18), 0 8px 18px rgba(0,0,0,0.20), 0 22px 40px rgba(0,0,0,0.26), 0 48px 80px rgba(0,0,0,0.30)",
            }}
            className="absolute w-[300px] md:w-[340px] rounded-3xl bg-[#0A0A0A] flex flex-col gap-6 p-8 md:p-9 cursor-grab active:cursor-grabbing select-none"
            data-cursor="grab"
          >
            <span className="font-display text-[#F3F1EC] text-2xl leading-none">&ldquo;</span>
            <blockquote className="font-editorial italic text-[#F3F1EC] leading-[1.3]" style={{ fontSize: "clamp(1.15rem, 1.7vw, 1.5rem)" }}>
              {t.q}
            </blockquote>
            <div className="pt-4 border-t border-white/12">
              <p className="font-display tracking-[0.12em] uppercase text-[#F3F1EC]" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)" }}>{t.name}</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE] mt-1.5">{t.venue}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
