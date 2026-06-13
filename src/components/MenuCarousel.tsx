"use client";

import { Children, useEffect, useRef, useState } from "react";

/* Full-screen, auto-looping course carousel.
   Each slide fills the viewport height (content auto-scaled to fit — no scrolling).
   Advances left → right on a timer; also supports arrows and drag/swipe. */
export default function MenuCarousel({
  children,
  bgs = [],
  interval = 6000,
}: {
  children: React.ReactNode;
  bgs?: string[];
  interval?: number;
}) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const base = n > 1 ? 1 : 0;
  const all = n > 1 ? [slides[n - 1], ...slides, slides[0]] : slides; // clones for seamless wrap

  const [pos, setPos] = useState(base);
  const [anim, setAnim] = useState(true);
  const [w, setW] = useState(0);
  const [drag, setDrag] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const paused = useRef(false);
  const vp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = vp.current;
    if (!el) return;
    const upd = () => setW(el.clientWidth);
    upd();
    const ro = new ResizeObserver(upd);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (n <= 1) return;
    const id = setInterval(() => { if (!paused.current) { setAnim(true); setPos((p) => p + 1); } }, interval);
    return () => clearInterval(id);
  }, [interval, n]);

  // seamless wrap at the clones
  useEffect(() => {
    if (n <= 1) return;
    if (pos === n + 1) { const t = setTimeout(() => { setAnim(false); setPos(1); }, 720); return () => clearTimeout(t); }
    if (pos === 0) { const t = setTimeout(() => { setAnim(false); setPos(n); }, 720); return () => clearTimeout(t); }
  }, [pos, n]);

  useEffect(() => {
    if (!anim) { const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true))); return () => cancelAnimationFrame(r); }
  }, [anim]);

  const onDown = (e: React.PointerEvent) => {
    if (n <= 1) return;
    if ((e.target as HTMLElement).closest("button")) return; // let arrows/dots work
    dragging.current = true;
    startX.current = e.clientX;
    paused.current = true;
    setAnim(false);
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
  };
  const onMove = (e: React.PointerEvent) => { if (dragging.current) setDrag(e.clientX - startX.current); };
  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    paused.current = false;
    const d = drag;
    setDrag(0);
    setAnim(true);
    if (Math.abs(d) > Math.min(w * 0.16, 110)) setPos((p) => (d < 0 ? p + 1 : p - 1));
  };

  const go = (dir: number) => { setAnim(true); setPos((p) => p + dir); };
  const dotActive = (((pos - base) % n) + n) % n;
  const tx = -(pos * w) + drag;

  return (
    <div
      ref={vp}
      data-cursor="Drag"
      className="relative w-full h-[100svh] overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div
        className="flex h-full"
        style={{ transform: `translate3d(${tx}px,0,0)`, transition: anim && !dragging.current ? "transform 0.7s cubic-bezier(0.7,0,0.3,1)" : "none" }}
      >
        {all.map((s, idx) => {
          const real = (((idx - base) % n) + n) % n;
          return <Slide key={idx} bg={bgs[real]}>{s}</Slide>;
        })}
      </div>

      {n > 1 && (
        <>
          <button
            aria-label="Previous course"
            onClick={() => go(-1)}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/70 text-white flex items-center justify-center text-2xl leading-none pb-0.5 mix-blend-difference hover:bg-white/10 transition-colors"
          >
            ‹
          </button>
          <button
            aria-label="Next course"
            onClick={() => go(1)}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/70 text-white flex items-center justify-center text-2xl leading-none pb-0.5 mix-blend-difference hover:bg-white/10 transition-colors"
          >
            ›
          </button>
        </>
      )}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2 mix-blend-difference">
        {slides.map((_, d) => (
          <button
            key={d}
            aria-label={`Course ${d + 1}`}
            onClick={() => { setAnim(true); setPos(d + base); }}
            className={`h-1.5 rounded-full bg-white transition-all duration-300 ${dotActive === d ? "w-7" : "w-1.5 opacity-50"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* One slide: fills the viewport, scales its course down to fit (so it never scrolls). */
function Slide({ bg, children }: { bg?: string; children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => {
      if (!outer.current || !inner.current) return;
      const avail = outer.current.clientHeight;
      const need = inner.current.scrollHeight; // transform doesn't affect this
      setScale(need > avail ? avail / need : 1);
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (inner.current) ro.observe(inner.current);
    if (outer.current) ro.observe(outer.current);
    window.addEventListener("resize", fit);
    const t = setTimeout(fit, 400);
    return () => { ro.disconnect(); window.removeEventListener("resize", fit); clearTimeout(t); };
  }, []);

  return (
    <div ref={outer} className="w-full h-full shrink-0 overflow-hidden flex items-center justify-center" style={{ background: bg }}>
      <div ref={inner} className="w-full" style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>
        {children}
      </div>
    </div>
  );
}
