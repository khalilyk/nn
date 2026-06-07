"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const clients = [
  "3Fils", "Revolver", "Maison Dali", "Oakberry",
  "Kinoya", "Tony's Woodfire", "PieHaus", "Yava",
  "Bar Baker", "Shanghai Me", "Mimi Kakushi", "Lucky's",
];

const PER_PAGE = 4;

export default function ClientLogos() {
  const pages = Math.ceil(clients.length / PER_PAGE);
  const [page, setPage] = useState(0);
  const [delta, setDelta] = useState(0);
  const drag = useRef({ x: 0, active: false });
  const track = useRef<HTMLDivElement>(null);

  const clamp = (n: number) => Math.max(0, Math.min(pages - 1, n));

  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, active: true };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (drag.current.active) setDelta(e.clientX - drag.current.x);
  };
  const onUp = useCallback(() => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const w = track.current?.offsetWidth || window.innerWidth;
    setDelta((d) => {
      if (d < -w * 0.15) setPage((p) => clamp(p + 1));
      else if (d > w * 0.15) setPage((p) => clamp(p - 1));
      return 0;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages]);

  useEffect(() => {
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, [onUp]);

  return (
    <div className="w-full select-none">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <p className="font-editorial text-[#0A0A0A] leading-[1.2] md:whitespace-nowrap" style={{ fontSize: "clamp(1.3rem, 2.2vw, 2rem)" }}>
          Call them clients, call them friends, basically the same thing.
        </p>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 hidden md:block">Drag</span>
          <div className="flex gap-3">
            <button onClick={() => setPage((p) => clamp(p - 1))} aria-label="Previous"
              className="w-9 h-9 rounded-full border border-[#0A0A0A]/30 flex items-center justify-center text-sm text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F4C9A8] transition-colors">←</button>
            <button onClick={() => setPage((p) => clamp(p + 1))} aria-label="Next"
              className="w-9 h-9 rounded-full border border-[#0A0A0A]/30 flex items-center justify-center text-sm text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F4C9A8] transition-colors">→</button>
          </div>
        </div>
      </div>

      {/* Track */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing border-t border-l border-[#0A0A0A]/15"
        onPointerDown={onDown}
        onPointerMove={onMove}
        data-cursor="grab"
      >
        <div
          ref={track}
          className="flex"
          style={{
            transform: `translateX(calc(${-page * 100}% + ${delta}px))`,
            transition: drag.current.active ? "none" : "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {clients.map((name) => (
            <div
              key={name}
              className="shrink-0 basis-1/2 md:basis-1/4 border-r border-b border-[#0A0A0A]/15 flex items-center justify-center group"
              style={{ minHeight: "clamp(160px, 24vh, 280px)" }}
            >
              <span className="font-display text-[#0A0A0A]/40 group-hover:text-[#0A0A0A] transition-all duration-500 group-hover:scale-105 text-center px-2" style={{ fontSize: "clamp(1rem, 1.5vw, 1.6rem)" }}>
                {name.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-8">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            aria-label={`Page ${i + 1}`}
            className="h-1 rounded-full transition-all"
            style={{ width: i === page ? 28 : 8, background: i === page ? "#0A0A0A" : "rgba(10,10,10,0.25)" }}
          />
        ))}
      </div>
    </div>
  );
}
