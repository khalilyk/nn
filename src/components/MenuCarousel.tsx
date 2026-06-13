"use client";

import { Children, useEffect, useRef, useState } from "react";

/* Auto-looping horizontal carousel for the four course "menus".
   Advances left → right on an interval, seamless infinite loop, pauses on hover. */
export default function MenuCarousel({ children, interval = 6000 }: { children: React.ReactNode; interval?: number }) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const all = n > 0 ? [...slides, slides[0]] : slides; // clone first for a seamless wrap
  const [i, setI] = useState(0);
  const [anim, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);
  const [h, setH] = useState<number | undefined>(undefined);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  // auto-advance
  useEffect(() => {
    if (paused || n <= 1) return;
    const id = setInterval(() => setI((p) => p + 1), interval);
    return () => clearInterval(id);
  }, [interval, paused, n]);

  // seamless wrap: when the clone (index n) settles, snap back to 0 without animation
  useEffect(() => {
    if (i === n && n > 0) {
      const t = setTimeout(() => { setAnim(false); setI(0); }, 720);
      return () => clearTimeout(t);
    }
  }, [i, n]);

  // re-enable animation a frame after a no-anim snap
  useEffect(() => {
    if (!anim) {
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
      return () => cancelAnimationFrame(r);
    }
  }, [anim]);

  // match viewport height to the active slide (and track its image-load/resize growth)
  useEffect(() => {
    const el = trackRefs.current[i];
    if (!el) return;
    const update = () => setH(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, [i]);

  const dot = i % (n || 1);

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: h, transition: anim ? "height 0.6s cubic-bezier(0.7,0,0.3,1)" : "none" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex items-start"
        style={{ transform: `translateX(-${i * 100}%)`, transition: anim ? "transform 0.7s cubic-bezier(0.7,0,0.3,1)" : "none" }}
      >
        {all.map((s, idx) => (
          <div key={idx} ref={(el) => { trackRefs.current[idx] = el; }} className="w-full shrink-0">
            {s}
          </div>
        ))}
      </div>

      {/* progress dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2 mix-blend-difference">
        {slides.map((_, d) => (
          <button
            key={d}
            aria-label={`Go to course ${d + 1}`}
            onClick={() => { setAnim(true); setI(d); }}
            className={`h-1.5 rounded-full bg-white transition-all duration-300 ${dot === d ? "w-7" : "w-1.5 opacity-50"}`}
          />
        ))}
      </div>
    </div>
  );
}
