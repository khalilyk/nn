"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);
  const [emoji, setEmoji] = useState<"grab" | "tap" | null>(null);
  const [pressed, setPressed] = useState(false);

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
        if (val === "grab") { setEmoji("grab"); setLabel(""); }
        else if (val === "tap") { setEmoji("tap"); setLabel(""); }
        else { setEmoji(null); setLabel(val); }
      } else {
        setHovering(false);
        setEmoji(null);
        setLabel("");
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // Comic hand / finger mode
  if (emoji) {
    const grab = emoji === "grab";
    return (
      <div
        ref={dot}
        className="fixed top-0 left-0 z-[200] pointer-events-none hidden md:flex items-center justify-center"
        style={{ fontSize: grab ? (pressed ? 52 : 60) : pressed ? 40 : 48, transition: "font-size 0.12s ease", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}
      >
        <span style={{ transform: grab ? (pressed ? "rotate(-12deg)" : "rotate(0deg)") : pressed ? "translateY(3px)" : "translateY(0)", transition: "transform 0.12s ease" }}>
          {grab ? (pressed ? "✊" : "🖐️") : "👆"}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={dot}
      className="fixed top-0 left-0 z-[200] pointer-events-none hidden md:flex items-center justify-center rounded-full"
      style={{
        mixBlendMode: "difference",
        background: "#F3F1EC",
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
