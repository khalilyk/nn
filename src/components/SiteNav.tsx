"use client";

import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import ChatLink from "./ChatLink";

const LINKS = [
  { l: "About", href: "/#s02", tip: "Who we are", shape: "rounded-full" },
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
        <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
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
          <div className="hidden md:block">
            <Magnetic strength={0.5}>
              <ChatLink />
            </Magnetic>
          </div>
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(true)}
            className={`md:hidden relative flex flex-col items-end justify-center gap-[6px] w-8 h-8 transition-opacity duration-200 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <span className="block h-[2px] w-7 rounded-full bg-[#F3F1EC]" />
            <span className="block h-[2px] w-7 rounded-full bg-[#F3F1EC]" />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU OVERLAY ─── */}
      <div className={`fixed inset-0 z-[99] md:hidden bg-[#F3F1EC] text-[#0A0A0A] flex flex-col overflow-hidden px-8 pt-24 pb-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <button
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-8 w-10 h-10 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-[#F3F1EC]"
          style={{ opacity: menuOpen ? 1 : 0, transition: "opacity 0.5s ease 0.1s, background-color 0.3s, color 0.3s" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 1l12 12M13 1L1 13" /></svg>
        </button>

        <div className="h-px bg-[#0A0A0A]/15 mb-8" style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "opacity 0.5s ease 0.05s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s" }} />

        <nav className="flex flex-col gap-1">
          {LINKS.map(({ l, href }, i) => (
            <a
              key={l}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-[#0A0A0A] leading-[1.15] transition-opacity duration-300 hover:opacity-50"
              style={{
                fontSize: "clamp(1.9rem, 8.5vw, 2.6rem)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.12 + i * 0.06 : 0}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.12 + i * 0.06 : 0}s`,
              }}
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="h-px bg-[#0A0A0A]/15 my-8" style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "opacity 0.5s ease 0.45s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s" }} />

        <div style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateY(0)" : "translateY(14px)", transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.5 : 0}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.5 : 0}s` }}>
          <a href="/the-inside" onClick={() => setMenuOpen(false)} className="font-sans text-[17px] text-[#0A0A0A] transition-opacity duration-300 hover:opacity-50">The Inside</a>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#0A0A0A]/40 mt-8 mb-4">Social</p>
          <div className="flex flex-col gap-2.5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="font-sans text-[17px] text-[#0A0A0A] transition-opacity duration-300 hover:opacity-50">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="font-sans text-[17px] text-[#0A0A0A] transition-opacity duration-300 hover:opacity-50">LinkedIn</a>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2" style={{ opacity: menuOpen ? 1 : 0, transition: `opacity 0.6s ease ${menuOpen ? 0.6 : 0}s` }}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16a34a]" />
          </span>
          <span className="text-[10px] tracking-[0.18em] uppercase text-[#16a34a]">2 spots this month</span>
        </div>
      </div>
    </>
  );
}
