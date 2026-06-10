"use client";

import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import ChatLink from "./ChatLink";

const IgIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LiIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(true)}
            className={`lg:hidden relative flex flex-col items-end justify-center gap-[6px] w-8 h-8 transition-opacity duration-200 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <span className="block h-[2px] w-7 rounded-full bg-[#F3F1EC]" />
            <span className="block h-[2px] w-7 rounded-full bg-[#F3F1EC]" />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU OVERLAY ─── */}
      <div className={`fixed inset-0 z-[110] lg:hidden bg-[#81D742] text-[#0A0A0A] flex flex-col items-center overflow-hidden px-8 pt-20 pb-12 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <button
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-8 w-11 h-11 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-[#81D742]"
          style={{ opacity: menuOpen ? 1 : 0, transition: "opacity 0.5s ease 0.1s, background-color 0.3s, color 0.3s" }}
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l12 12M13 1L1 13" /></svg>
        </button>

        {/* giant title */}
        <h2
          className="font-display uppercase tracking-tight text-center leading-[0.9]"
          style={{
            fontSize: "clamp(2.6rem, 13vw, 4.5rem)",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease 0.05s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s",
          }}
        >
          Navigation
        </h2>

        {/* centred links with flanking arrows */}
        <nav className="flex flex-col items-center gap-3 mt-auto mb-auto">
          {LINKS.map(({ l, href }, i) => (
            <a
              key={l}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-center gap-4 font-display uppercase tracking-tight text-[#0A0A0A] leading-none"
              style={{
                fontSize: "clamp(1.8rem, 9vw, 2.8rem)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.14 + i * 0.06 : 0}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.14 + i * 0.06 : 0}s`,
              }}
            >
              <span aria-hidden className="text-[0.6em] opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300">←</span>
              {l}
              <span aria-hidden className="text-[0.6em] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
            </a>
          ))}
        </nav>

        {/* social icons */}
        <div
          className="flex items-center gap-5"
          style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateY(0)" : "translateY(14px)", transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.5 : 0}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.5 : 0}s` }}
        >
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-12 h-12 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center transition-colors hover:bg-[#0A0A0A] hover:text-[#81D742]">
            <IgIcon />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-12 h-12 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center transition-colors hover:bg-[#0A0A0A] hover:text-[#81D742]">
            <LiIcon />
          </a>
        </div>
      </div>
    </>
  );
}
