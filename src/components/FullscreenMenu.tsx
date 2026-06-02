"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const nav = [
  {
    label: "Work",
    sub: ["Selected Work", "All Projects", "Case Studies"],
    href: "/work",
  },
  {
    label: "Thinking",
    sub: ["Journal", "Manifesto", "Observations"],
    href: "/thinking",
  },
  {
    label: "Services",
    sub: ["Branding & Identity", "Content & Storytelling", "Guest Experience", "Digital & Web", "Consulting"],
    href: "/services",
  },
  {
    label: "Company",
    sub: ["About", "Sydney", "Dubai", "Beirut", "Contact"],
    href: "/about",
  },
];

const stagger = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const item = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  exit: { y: -30, opacity: 0, transition: { duration: 0.3 } },
};

export default function FullscreenMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-40 bg-[#080808] flex flex-col"
        >
          {/* Background accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-0 left-0 right-0 h-px bg-[#D4FF38] origin-left"
          />

          <div className="flex-1 flex items-end px-6 md:px-10 pb-16 pt-32">
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 w-full"
            >
              {nav.map((section) => (
                <motion.div key={section.label} variants={item}>
                  <Link
                    href={section.href}
                    onClick={onClose}
                    className="font-display text-5xl md:text-7xl text-[#E8E2D4] hover:text-[#D4FF38] transition-colors block mb-6 leading-none"
                  >
                    {section.label}
                  </Link>
                  <ul className="space-y-2">
                    {section.sub.map((s) => (
                      <li key={s}>
                        <Link
                          href={section.href}
                          onClick={onClose}
                          className="text-xs tracking-widest uppercase text-[#E8E2D4]/30 hover:text-[#E8E2D4]/80 transition-colors"
                        >
                          {s}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Footer row */}
          <div className="px-6 md:px-10 py-6 border-t border-[#E8E2D4]/10 flex items-center justify-between">
            <span className="text-xs tracking-widest uppercase text-[#E8E2D4]/20">Sydney · Dubai · Beirut</span>
            <div className="flex gap-6">
              {["Instagram", "LinkedIn", "Journal"].map((l) => (
                <Link key={l} href="#" onClick={onClose} className="text-xs tracking-widest uppercase text-[#E8E2D4]/30 hover:text-[#E8E2D4] transition-colors">
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
