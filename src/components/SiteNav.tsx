"use client";

import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import ChatLink from "./ChatLink";
import type { NavLink } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

// staggered entrance for each stacked menu card
const card = (open: boolean, i: number) => ({
  opacity: open ? 1 : 0,
  transform: open ? "translateY(0) scale(1)" : "translateY(18px) scale(0.98)",
  transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${open ? 0.1 + i * 0.08 : 0}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${open ? 0.1 + i * 0.08 : 0}s`,
});

export default function SiteNav({ links = DEFAULT_CONTENT.nav }: { links?: NavLink[] }) {
  const LINKS = links;
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
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
        className={`lg:hidden fixed top-6 right-8 z-[120] w-8 h-8 flex items-center justify-center transition-opacity duration-200 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ color: "#F3F1EC", mixBlendMode: "difference" }}
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

      {/* ─── MOBILE MENU OVERLAY (3 stacked cards) ─── */}
      <div className={`fixed inset-0 z-[110] lg:hidden bg-[#0A0A0A] flex flex-col gap-2.5 p-2.5 pt-12 transition-opacity duration-[450ms] ease-in-out ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* 0 - close bar */}
        <button
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="rounded-[26px] bg-[#BBD9F2] text-[#0A0A0A] py-4 flex items-center justify-center"
          style={card(menuOpen, 0)}
        >
          <span className="relative block w-5 h-5">
            <span
              className="absolute left-1/2 top-1/2 block h-[2.5px] w-5 rounded-full bg-current"
              style={{ transform: menuOpen ? "translate(-50%,-50%) rotate(45deg)" : "translate(-50%,-50%) rotate(0deg)", transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1) 0.18s" }}
            />
            <span
              className="absolute left-1/2 top-1/2 block h-[2.5px] w-5 rounded-full bg-current"
              style={{ transform: menuOpen ? "translate(-50%,-50%) rotate(-45deg)" : "translate(-50%,-50%) rotate(0deg)", transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1) 0.18s" }}
            />
          </span>
        </button>

        {/* 1 - navigation card */}
        <div
          className="relative flex-1 overflow-hidden rounded-[26px] bg-[#C5E8B7] text-[#0A0A0A] flex flex-col justify-center items-center px-6 py-6"
          style={card(menuOpen, 1)}
        >
          <nav className="flex flex-col items-center gap-[2vh]">
            {LINKS.map(({ l, href }) => (
              <a
                key={l}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-display uppercase tracking-tight leading-none transition-opacity duration-300 hover:opacity-50"
                style={{ fontSize: "clamp(1.6rem, 7vw, 2.6rem)" }}
              >
                {l}
              </a>
            ))}
          </nav>
        </div>

        {/* 2 - ring ring band */}
        <a
          href="tel:+610433714701"
          onClick={() => setMenuOpen(false)}
          className="group relative z-0 rounded-[26px] bg-[#FBD9BE] text-[#0A0A0A] px-6 py-3 flex items-center justify-between"
          style={card(menuOpen, 2)}
        >
          <span className="font-display uppercase tracking-tight leading-none" style={{ fontSize: "clamp(1.4rem, 7vw, 2rem)" }}>Give us a ring</span>
          <span aria-hidden className="flex items-center group-hover:rotate-12 transition-transform duration-300 origin-center">
            <svg width="64" height="80" viewBox="-5 -10 110 135" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="m45.094 85.672s8.4219-9.1719 8.4219-9.1719l3.0469-39.234s-2.5625-3.2969-2.5625-3.2969h-19.812c0 0.015625 2.4883 3.293 2.4688 3.3125 0 0-3.2031 39.25-3.2031 39.25l-7.2031 9.1406c2.5352-0.011719 16.012 0.007813 18.844 0zm-3.0469-21.828h-2.4844c-0.85938 0-1.5625-0.70312-1.5625-1.5625 0-0.875 0.70312-1.5625 1.5625-1.5625h2.4844c2.0547 0.019531 2.0586 3.0938 0 3.125zm1.0156 4.5c0 0.85938-0.6875 1.5625-1.5625 1.5625h-2.4844c-0.85938 0-1.5625-0.70312-1.5625-1.5625 0-0.875 0.70312-1.5625 1.5625-1.5625h2.4844c0.875 0 1.5625 0.6875 1.5625 1.5625zm-0.4375-10.562h-2.4844c-0.85938 0-1.5625-0.70312-1.5625-1.5625s0.70312-1.5625 1.5625-1.5625h2.4844c2.0547 0.03125 2.0547 3.0938 0 3.125zm0.67188-6.0625h-2.4844c-2.0547-0.03125-2.0547-3.0938 0-3.125h2.4844c2.0508 0.039062 2.0547 3.0859 0 3.125zm0.125-6.0625h-2.5c-0.85938 0-1.5625-0.70312-1.5625-1.5625s0.70312-1.5625 1.5625-1.5625h2.5c2.0508 0.039062 2.0547 3.0859 0 3.125zm5.0156 2.9375h2.5c0.85938 0 1.5625 0.70312 1.5625 1.5625s-0.70312 1.5625-1.5625 1.5625h-2.5c-2.0508-0.039062-2.0547-3.0859 0-3.125zm-1.4375-4.5c0-0.85938 0.70312-1.5625 1.5625-1.5625h2.5c0.85938 0 1.5625 0.70312 1.5625 1.5625s-0.70312 1.5625-1.5625 1.5625h-2.5c-0.85938 0-1.5625-0.70312-1.5625-1.5625zm0.78125 10.562h2.4844c2.0547 0.03125 2.0547 3.0938 0 3.125h-2.4844c-2.0508-0.039062-2.0547-3.0859 0-3.125zm-0.57812 6.0625h2.4844c0.85938 0 1.5625 0.6875 1.5625 1.5625 0 0.85938-0.70312 1.5625-1.5625 1.5625h-2.4844c-2.0586-0.03125-2.0547-3.1055 0-3.125zm-0.54688 6.0625h2.4844c2.0547 0.019531 2.0586 3.0938 0 3.125h-2.4844c-2.0547-0.039062-2.0547-3.0977 0-3.125z" />
              <path d="m45.312 88.797h-18.5l10.281 7.2656c0.27344 0.19531 0.60156 0.28516 0.9375 0.28125l17.766-0.46875z" />
              <path d="m53.312 30.844c0.17969-2.2852 1.3711-17.207 1.5-19.125h-18.266c-0.8125 0-1.4844 0.625-1.5469 1.4375l-1.4531 17.688c1.707-0.015625 17.621 0.011719 19.766 0zm-8.7031-3.2969c-7.7617-0.25391-7.7617-11.496 0-11.75 7.7617 0.25391 7.7617 11.496 0 11.75z" />
              <path d="m44.609 18.922c-3.625 0.097656-3.625 5.4062 0 5.5 3.625-0.097656 3.625-5.4062 0-5.5z" />
              <path d="m73.32 3.7188c-0.82812-0.24219-1.6953 0.23438-1.9375 1.0625l-4.9648 17.055-8.543-9.1055s-1.3125 16.602-1.5156 19.188c0.21484 0.34766 3.2539 4.0469 3.25 4.2969 0.14844 0.24219 0.089844 0.70312 0.09375 0.89062l-3.125 40.156c-0.023437 0.16016-0.046875 0.33594-0.125 0.48438-0.0625 0.17969-8.2812 9.2031-8.2812 9.2031l10.266 6.9375 8.0625-11.672c0.6875-1 1.0938-2.1719 1.1719-3.3906l3.2969-48.969c0.125-1.8594-0.53125-3.7188-1.8125-5.0938-0.007812-0.007813 5.2266-19.109 5.2266-19.109 0.24219-0.82812-0.23437-1.6953-1.0625-1.9375z" />
            </svg>
          </span>
        </a>

        {/* 3 - mascot / chat card */}
        <div
          className="relative z-10 flex-[1.3] overflow-hidden rounded-[26px] bg-[#F9CEDF] text-[#0A0A0A]"
          style={card(menuOpen, 3)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nn-panda.png"
            alt="Not Normal"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 z-20 h-[90%] w-auto max-w-none"
          />
        </div>
      </div>
    </>
  );
}
