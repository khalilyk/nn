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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % manifesto.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-500 ${
          scrolled && !menuOpen ? "bg-[#080808]/80 backdrop-blur-sm" : ""
        }`}
      >
        {/* Left: Logo */}
        <Link href="/" className="font-display text-sm tracking-[0.25em] text-[#E8E2D4] hover:text-[#D4FF38] transition-colors z-10">
          NOT NORMAL
        </Link>

        {/* Centre: Rotating manifesto */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block overflow-hidden h-5 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="block text-[10px] tracking-[0.2em] uppercase text-[#E8E2D4]/40 whitespace-nowrap"
            >
              {manifesto[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Right: Menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-9 h-9 rounded-full border border-[#E8E2D4]/20 flex items-center justify-center hover:border-[#D4FF38] transition-colors group z-10"
          aria-label="Menu"
        >
          <div className="flex flex-col gap-[5px] items-center justify-center w-4">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-full h-px bg-[#E8E2D4] group-hover:bg-[#D4FF38] transition-colors origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-full h-px bg-[#E8E2D4] group-hover:bg-[#D4FF38] transition-colors"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-full h-px bg-[#E8E2D4] group-hover:bg-[#D4FF38] transition-colors origin-center"
            />
          </div>
        </button>
      </header>

      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
