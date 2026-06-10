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
  const [closing, setClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const openMenu = () => { setClosing(false); setMenuOpen(true); };
  const closeMenu = () => setClosing(true); // circle expands, then unmounts onTransitionEnd

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
          <button
            aria-label="Menu"
            onClick={openMenu}
            className={`lg:hidden relative flex flex-col items-end justify-center gap-[6px] w-8 h-8 transition-opacity duration-200 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <span className="block h-[2px] w-7 rounded-full bg-[#F3F1EC]" />
            <span className="block h-[2px] w-7 rounded-full bg-[#F3F1EC]" />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU OVERLAY ─── */}
      <div className={`fixed inset-0 z-[110] lg:hidden bg-[#81D742] text-[#0A0A0A] flex flex-col items-center overflow-hidden px-8 pt-20 pb-12 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* the X button itself zooms out to cover the screen, then unmounts the menu */}
        <button
          aria-label="Close menu"
          onClick={closeMenu}
          onTransitionEnd={(e) => {
            // once the X has scaled up to cover the screen, unmount the menu behind it.
            // `closing` stays true so it keeps covering while the overlay fades out;
            // openMenu resets it before the next open.
            if (e.propertyName === "transform" && closing) setMenuOpen(false);
          }}
          className="absolute top-6 right-8 w-11 h-11 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A]"
          style={{
            opacity: menuOpen ? 1 : 0,
            backgroundColor: closing ? "#0A0A0A" : "transparent",
            transformOrigin: "center",
            transform: closing ? "scale(60)" : "scale(1)",
            transition: closing
              ? "transform 0.6s cubic-bezier(0.7,0,0.3,1), background-color 0.15s ease"
              : "opacity 0.5s ease 0.1s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l12 12M13 1L1 13" /></svg>
        </button>

        {/* full-bleed fish-eye title, stuck to the very top */}
        <h2
          aria-label="Navigation"
          className="absolute top-0 left-0 w-full flex justify-between items-center font-display uppercase leading-none px-2 pt-6 select-none"
          style={{
            fontSize: "clamp(2rem, 11vw, 4.5rem)",
            perspective: "300px",
            transformStyle: "preserve-3d",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 0.5s ease 0.05s",
          }}
        >
          {"NAVIGATION".split("").map((ch, i, arr) => {
            const d = (i / (arr.length - 1) - 0.5) * 2; // -1..1 across the word
            const bulge = 1 - d * d; // 0 at edges, 1 in the centre
            const tz = (bulge * 90).toFixed(1); // centre letters pushed toward the viewer = convex bulge
            return (
              <span
                key={i}
                aria-hidden
                style={{ display: "inline-block", transform: `translateZ(${tz}px)`, transformOrigin: "center center" }}
              >
                {ch}
              </span>
            );
          })}
        </h2>

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
          className="pointer-events-none absolute left-1/2 bottom-0 z-0 w-[800px] max-w-none h-auto"
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
