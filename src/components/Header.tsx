"use client";

import { useState } from "react";
import Link from "next/link";
import FullscreenMenu from "./FullscreenMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-5 md:px-6 bg-[#080808] border-b border-[#E8E2D4]/8">
        {/* Left */}
        <Link href="/" className="text-[10px] tracking-[0.22em] uppercase text-[#E8E2D4] hover:text-[#D4FF38] transition-colors font-medium">
          Not Normal
        </Link>

        {/* Center */}
        <div className="hidden md:flex items-center gap-2">
          <div className="w-[5px] h-[5px] rounded-full bg-[#D4FF38]" />
          <span className="text-[9px] tracking-[0.22em] uppercase text-[#E8E2D4]/60">
            Hospitality Brand Advisory
          </span>
        </div>

        {/* Right: menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-8 h-8 border border-[#E8E2D4]/20 rounded flex items-center justify-center hover:border-[#D4FF38]/50 transition-colors group"
          aria-label="Menu"
        >
          <div className="flex flex-col gap-[4px] w-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-px bg-[#E8E2D4]/60 group-hover:bg-[#D4FF38] transition-colors w-full" />
            ))}
          </div>
        </button>
      </header>

      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
