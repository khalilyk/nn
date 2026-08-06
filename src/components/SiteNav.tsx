"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Magnetic from "./Magnetic";
import ChatLink from "./ChatLink";
import type { NavLink, Footer } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

export default function SiteNav({ links = DEFAULT_CONTENT.nav, footer = DEFAULT_CONTENT.footer }: { links?: NavLink[]; footer?: Footer }) {
  const LINKS = links;
  const pathname = usePathname();
  const notHome = pathname !== "/";
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
        <a href="/" aria-label="Not Normal, home" title={notHome ? "Go home" : undefined} className="group relative flex items-center h-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/notnormal-logoblack.png" alt="Not Normal" className={`h-3.5 md:h-4 w-auto transition-opacity duration-300 ${scrolled ? "opacity-0" : "opacity-100"}`} style={{ filter: "invert(1)" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/notnormal-iconoutline.png" alt="Not Normal" className={`absolute left-0 top-1/2 -translate-y-1/2 h-7 w-auto transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ filter: "invert(1)" }} />
          {notHome && (
            <span className="pointer-events-none absolute left-0 top-full mt-3 whitespace-nowrap bg-[#F3F1EC] text-[#0A0A0A] px-3 py-1.5 text-[8px] tracking-[0.18em] uppercase rounded-full opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              Go home
            </span>
          )}
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

      {/* ─── MOBILE MENU TOGGLE (plain hamburger ⇄ X) ─── */}
      <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((o) => !o)}
        className="lg:hidden fixed top-6 right-8 md:top-8 md:right-16 z-[130] w-8 h-8 flex items-center justify-center"
        style={{ color: "#F3F1EC", mixBlendMode: "difference" }}
      >
        <span
          className="absolute left-1/2 top-1/2 block h-[2px] w-7 rounded-full bg-current"
          style={{ transform: menuOpen ? "translate(-50%,-50%) rotate(45deg)" : "translate(-50%,-50%) translateY(-4px)", transition: "transform 0.35s cubic-bezier(0.76,0,0.24,1)" }}
        />
        <span
          className="absolute left-1/2 top-1/2 block h-[2px] w-7 rounded-full bg-current"
          style={{ transform: menuOpen ? "translate(-50%,-50%) rotate(-45deg)" : "translate(-50%,-50%) translateY(4px)", transition: "transform 0.35s cubic-bezier(0.76,0,0.24,1)" }}
        />
      </button>

      {/* ─── MENU LOGO (fixed at the EXACT header-logo position, above the overlay) ─── */}
      <a
        href="/"
        aria-label="Not Normal, home"
        onClick={() => setMenuOpen(false)}
        className={`lg:hidden fixed top-6 left-8 md:top-8 md:left-16 z-[130] h-8 flex items-center transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/notnormal-logoblack.png" alt="Not Normal" className="h-3.5 md:h-4 w-auto" style={{ filter: "invert(1)" }} />
      </a>

      {/* ─── MOBILE MENU (black, expands from the toggle's corner) ─── */}
      <div
        className="lg:hidden fixed inset-0 z-[120] bg-[#0A0A0A] text-[#F3F1EC] flex flex-col px-7 pt-24 pb-8 overflow-hidden transition-[clip-path] duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          clipPath: menuOpen ? "circle(150% at calc(100% - 3rem) 2.5rem)" : "circle(0px at calc(100% - 3rem) 2.5rem)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        aria-hidden={!menuOpen}
      >
        {/* nav items */}
        <nav className="flex-1 flex flex-col justify-center gap-7">
          {[{ l: "Home", href: "/" }, ...LINKS.map((x) => ({ l: x.l, href: x.href })), { l: "Contact", href: "/contact" }].map(({ l, href }, i) => (
            <a
              key={l}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-sans font-medium uppercase tracking-[0.22em] leading-none hover:opacity-55 transition-opacity"
              style={{
                fontSize: "clamp(1.3rem, 5.5vw, 1.7rem)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.5s ease ${menuOpen ? 0.18 + i * 0.05 : 0}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.18 + i * 0.05 : 0}s`,
              }}
            >
              {l}
            </a>
          ))}
        </nav>

        {/* footer block */}
        <div style={{ opacity: menuOpen ? 1 : 0, transition: "opacity 0.5s ease 0.4s" }}>
          <div className="text-[12px] tracking-[0.12em] uppercase text-white/75 leading-[1.7]">
            {footer.locations.split(",").map((loc) => (
              <div key={loc}>{loc.trim()}</div>
            ))}
          </div>
          <div className="mt-8 pt-5 border-t border-white/12 flex items-center justify-between text-[10px] tracking-[0.16em] uppercase text-white/40">
            <span>© {new Date().getFullYear()} Not Normal</span>
            <a href={footer.socials[0]?.href ?? "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              {footer.socials[0]?.label ?? "Instagram"} ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
