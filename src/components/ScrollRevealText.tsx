"use client";

import { useEffect, useRef } from "react";

/**
 * Body copy that reveals word-by-word as it scrolls through the viewport: each
 * word brightens from muted to full as it rises past a band, and dims again on
 * the way back up (opacity is tied to the word's position, not a one-shot).
 */
export default function ScrollRevealText({
  paragraphs,
  className = "",
}: {
  paragraphs: string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>("span[data-w]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const start = vh * 0.88; // word begins lighting as it enters the lower band
      const end = vh * 0.42; // fully lit once it's a bit above centre
      for (const w of words) {
        const top = w.getBoundingClientRect().top;
        let p = (start - top) / (start - end);
        p = Math.max(0, Math.min(1, p));
        w.style.opacity = (0.14 + p * 0.76).toFixed(3);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [paragraphs]);

  return (
    <div ref={ref} className={className}>
      {paragraphs.map((para, pi) => (
        <p key={pi} className={pi ? "mt-5" : ""}>
          {para.split(" ").map((word, wi) => (
            <span key={wi} data-w style={{ opacity: 0.14 }}>
              {word}{" "}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
