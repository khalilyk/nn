"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (el) {
        const val = el.dataset.cursor || "";
        setHovering(true);
        // grab/tap no longer swap to an emoji, just the dot
        setLabel(val === "grab" || val === "tap" ? "" : val);
      } else {
        setHovering(false);
        setLabel("");
      }
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
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={dot}
      className="fixed top-0 left-0 z-[200] pointer-events-none hidden md:flex items-center justify-center rounded-full"
      style={{
        background: "#81D742",
        width: hovering ? 64 : 10,
        height: hovering ? 64 : 10,
        transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {hovering && label && (
        <span className="text-[8px] tracking-[0.2em] uppercase text-[#0A0A0A] font-sans">{label}</span>
      )}
    </div>
  );
}
