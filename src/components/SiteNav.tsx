"use client";

import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import ChatLink from "./ChatLink";

const LINKS = [
  { l: "About", href: "/about", tip: "Who we are", shape: "rounded-full" },
  { l: "The Menu", href: "/#s02", tip: "What we do", shape: "rounded-none" },
  { l: "Projects", href: "/#s04", tip: "Selected proof", shape: "rounded-tl-xl rounded-br-xl" },
  { l: "Journal", href: "/#s08", tip: "Thinking & insights", shape: "rounded-lg" },
  { l: "Contact", href: "/contact", tip: "Let's chat", shape: "rounded-tr-xl rounded-bl-xl" },
];

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-6 md:py-8 mix-blend-difference text-[#F3F1EC]">
        <a href="/" aria-label="Not Normal, home" className="relative flex items-center h-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/notnormal-logoblack.png" alt="Not Normal" className={`h-3.5 md:h-4 w-auto transition-opacity duration-300 ${scrolled ? "opacity-0" : "opacity-100"}`} style={{ filter: "invert(1)" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/notnormal-iconoutline.png" alt="Not Normal" className={`absolute left-0 top-1/2 -translate-y-1/2 h-7 w-auto transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ filter: "invert(1)" }} />
        </a>
        <div className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {LINKS.map(({ l, href, tip, shape }) => (
            <a key={l} href={href} className="group relative text-[10px] tracking-[0.22em] uppercase">
              <span className="transition-opacity group-hover:opacity-60">{l}</span>
              <span className={`pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap bg-[#F3F1EC] px-3 py-1.5 text-[8px] tracking-[0.18em] text-[#0A0A0A] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 ${shape}`}>
                {tip}
                <span className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#F3F1EC]" />
              </span>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Magnetic strength={0.5}>
              <ChatLink />
            </Magnetic>
          </div>
          {/* spacer to keep nav layout; the morphing toggle lives above the overlay */}
          <span className="lg:hidden w-8 h-8" aria-hidden />
        </div>
      </nav>

      {/* ─── MORPHING HAMBURGER ⇄ X TOGGLE (above the overlay) ─── */}
      <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((v) => !v)}
        className="lg:hidden fixed top-6 right-8 z-[120] w-8 h-8 flex items-center justify-center"
        style={{ color: menuOpen ? "#0A0A0A" : "#F3F1EC", mixBlendMode: menuOpen ? "normal" : "difference" }}
      >
        <span
          className="absolute left-1/2 top-1/2 block h-[2px] w-7 rounded-full bg-current"
          style={{
            transform: menuOpen ? "translate(-50%,-50%) rotate(45deg)" : "translate(-50%,-50%) translateY(-4px)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <span
          className="absolute left-1/2 top-1/2 block h-[2px] w-7 rounded-full bg-current"
          style={{
            transform: menuOpen ? "translate(-50%,-50%) rotate(-45deg)" : "translate(-50%,-50%) translateY(4px)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </button>

      {/* ─── MOBILE MENU OVERLAY ─── */}
      <div className={`fixed inset-0 z-[110] lg:hidden bg-[#81D742] text-[#0A0A0A] flex flex-col items-center overflow-hidden px-8 pt-20 pb-12 transition-opacity duration-[450ms] ease-in-out ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>


        {/* centred links */}
        <nav className="relative z-10 flex flex-col items-center gap-3 mt-auto mb-auto">
          {LINKS.map(({ l, href }, i) => (
            <a
              key={l}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-display uppercase tracking-tight text-[#0A0A0A] leading-none transition-opacity duration-300 hover:opacity-60"
              style={{
                fontSize: "clamp(1.8rem, 9vw, 2.8rem)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.14 + i * 0.06 : 0}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.14 + i * 0.06 : 0}s`,
              }}
            >
              {l}
            </a>
          ))}
        </nav>

        {/* running panda mascot, pinned to the bottom */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/nn-panda.png"
          alt="Not Normal"
          className="pointer-events-none absolute left-1/2 bottom-0 z-0 w-[400px] max-w-none h-auto"
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translate(-50%, 22%)" : "translate(-50%, calc(22% + 14px))",
            transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.5 : 0}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.5 : 0}s`,
          }}
        />
      </div>
    </>
  );
}
