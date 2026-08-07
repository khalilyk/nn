"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);
  const [color, setColor] = useState("#81D742");
  const [hidden, setHidden] = useState(false);
  const [blink, setBlink] = useState(0);
  const lastEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf = 0;
    let clearTimer = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      // e.target isn't always an Element (e.g. SVG-internal nodes) - guard closest()
      const t = e.target instanceof Element ? e.target : null;
      const el = t?.closest<HTMLElement>("[data-cursor]");
      if (el) {
        const val = el.dataset.cursor || "";
        // entering a target cancels any pending shrink (prevents flicker across gaps)
        if (clearTimer) { clearTimeout(clearTimer); clearTimer = 0; }
        setHovering(true);
        // grab/tap no longer swap to an emoji, just the dot
        setLabel(val === "grab" || val === "tap" ? "" : val);
        // blink the eye each time it passes onto a new "Open" target (e.g. a project)
        if (el !== lastEl.current) {
          if (val === "Open") setBlink((b) => b + 1);
          lastEl.current = el;
        }
      } else if (!clearTimer) {
        lastEl.current = null;
        // brief gaps between posters shouldn't collapse the cursor - debounce the reset
        clearTimer = window.setTimeout(() => {
          clearTimer = 0;
          setHovering(false);
          setLabel("");
        }, 90);
      }
      // optional per-section cursor colour
      const colorEl = t?.closest<HTMLElement>("[data-cursor-color]");
      setColor(colorEl?.dataset.cursorColor || "#81D742");
      // hide the custom cursor entirely inside opted-out zones (e.g. the menu)
      setHidden(!!t?.closest("[data-cursor-hide]"));
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      if (clearTimer) clearTimeout(clearTimer);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={dot}
      className="fixed top-0 left-0 z-[400] pointer-events-none hidden md:flex items-center justify-center rounded-full"
      style={{
        background: color,
        width: hovering ? 64 : 10,
        height: hovering ? 64 : 10,
        opacity: hidden ? 0 : 1,
        transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease",
      }}
    >
      {hovering && label === "Open" ? (
        <svg key={blink} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color === "#0A0A0A" ? "#F3F1EC" : "#0A0A0A"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ animation: "eyeBlink 0.3s ease", transformOrigin: "center" }}>
          <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ) : hovering && label ? (
        <span className="text-[8px] tracking-[0.2em] uppercase font-sans" style={{ color: color === "#0A0A0A" ? "#F3F1EC" : "#0A0A0A" }}>{label}</span>
      ) : null}
    </div>
  );
}
