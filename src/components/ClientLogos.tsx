"use client";

import { useEffect, useRef } from "react";
import type { Clients } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/* Orange logo carousel — square tiles, slow steady auto-loop that you can also
   grab and drag (mouse) or swipe (touch). Auto-scroll pauses while interacting. */
export default function ClientLogos({ clients = DEFAULT_CONTENT.clients }: { clients?: Clients }) {
  const logos = (clients.logos ?? []).filter(Boolean);
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });
  const pos = useRef(0);          // float source-of-truth (scrollLeft rounds, so we track our own)
  const paused = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el || logos.length < 1) return;
    let raf = 0, running = true;
    const SPEED = 0.55; // px/frame — slow & steady
    const loop = () => {
      if (!running) return;
      const half = el.scrollWidth / 2;
      if (!paused.current && !drag.current.active) {
        // auto-scroll: advance our float position and apply it
        pos.current += SPEED;
        if (half > 0) {
          if (pos.current >= half) pos.current -= half;
          else if (pos.current < 0) pos.current += half;
        }
        el.scrollLeft = pos.current;
      } else if (!drag.current.active && half > 0) {
        // touch momentum scroll: keep it seamless without overriding native scroll
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        else if (el.scrollLeft < 0) el.scrollLeft += half;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(raf); };
  }, [logos.length]);

  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      if (scroller.current) pos.current = scroller.current.scrollLeft; // resync after interaction
      paused.current = false;
    }, 1400);
  };

  const onDown = (e: React.PointerEvent) => {
    paused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    if (e.pointerType === "mouse") {
      const el = scroller.current;
      if (!el) return;
      drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
      el.setPointerCapture?.(e.pointerId);
    }
    // touch: let native overflow scrolling handle the swipe
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const el = scroller.current;
    if (!el) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const onUp = () => { drag.current.active = false; scheduleResume(); };

  if (!logos.length) return null;
  const row = [...logos, ...logos]; // duplicate for the seamless wrap

  return (
    <section className="relative z-10 bg-[#FF5C1A] overflow-hidden py-14 md:py-20">
      <p className="text-center text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#0A0A0A]/55 mb-8 md:mb-10">
        {clients.eyebrow || "Brands we've shaped"}
      </p>
      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="flex overflow-x-auto select-none cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {row.map((src, i) => (
          <div
            key={i}
            aria-hidden={i >= logos.length}
            className="shrink-0 mx-3 md:mx-4 w-[130px] h-[130px] md:w-[168px] md:h-[168px] rounded-xl overflow-hidden bg-[#161616]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" draggable={false} className="w-full h-full object-contain pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
