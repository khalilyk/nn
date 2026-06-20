"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { MoodPin } from "@/lib/pinterest";

/* Full-width 6-tile grid with a click-to-zoom lightbox. */
export default function MoodboardGrid({ pins }: { pins: MoodPin[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (open !== null && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
        setOpen((o) => (o === null ? o : (o + (e.key === "ArrowRight" ? 1 : -1) + pins.length) % pins.length));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, pins.length]);

  const cur = open !== null ? pins[open] : null;

  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
        {pins.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setOpen(i)}
            title="View"
            className="group relative block aspect-[3/4] overflow-hidden rounded-xl cursor-zoom-in"
            style={{ backgroundColor: p.color }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.img}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </button>
        ))}
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {cur && (
            <motion.div
              className="fixed inset-0 z-[400] flex items-center justify-center p-6 cursor-zoom-out"
              onClick={() => setOpen(null)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm" />
              <motion.div
                className="relative"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cur.img} alt="" className="max-h-[82vh] max-w-[88vw] rounded-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] object-contain" style={{ backgroundColor: cur.color }} />
                <a
                  href={`https://www.pinterest.com/pin/${cur.id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-3 right-3 rounded-full bg-white/90 hover:bg-white text-[#0A0A0A] text-[11px] tracking-[0.1em] uppercase px-3.5 py-1.5 transition-colors"
                >
                  Open on Pinterest ↗
                </a>
              </motion.div>
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/30 bg-white/10 text-white grid place-items-center hover:bg-white hover:text-[#0A0A0A] transition-colors"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
