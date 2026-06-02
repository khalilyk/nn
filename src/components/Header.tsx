"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FullscreenMenu from "./FullscreenMenu";

const manifesto = [
  "Nobody Remembers Normal.",
  "People Remember People.",
  "Hospitality Starts Before Hello.",
  "The Menu Isn't The Product.",
  "Details Aren't Details.",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % manifesto.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 py-5">
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-[11px] tracking-[0.22em] uppercase text-[#E8E2D4] hover:text-[#D4FF38] transition-colors z-10 font-medium"
        >
          Not Normal
        </Link>

        {/* Centre: Rotating manifesto */}
        <div className="absolute left-1/2 -translate-x-1/2 overflow-hidden h-4 pointer-events-none hidden md:block">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="block text-[10px] tracking-[0.18em] uppercase text-[#E8E2D4]/50 whitespace-nowrap"
            >
              {manifesto[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Right: Dot-grid menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-9 h-9 rounded-full border border-[#E8E2D4]/25 flex items-center justify-center hover:border-[#D4FF38]/60 transition-colors z-10 group"
          aria-label="Menu"
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                className="text-[#E8E2D4] text-xs leading-none"
              >
                ✕
              </motion.span>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-3 gap-[3px]"
              >
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] h-[3px] rounded-full bg-[#E8E2D4]/60 group-hover:bg-[#D4FF38] transition-colors"
                    style={{ transitionDelay: `${i * 15}ms` }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </header>

      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
