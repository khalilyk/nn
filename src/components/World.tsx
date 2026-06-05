"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const RenaissanceScene = dynamic(() => import("./RenaissanceScene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    roman: "I",
    eyebrow: "Autumn — Winter 2024",
    heading: ["The", "Collection"],
    sub: "Where the past becomes the future.\nWhere craft meets culture.",
    align: "left",
  },
  {
    roman: "II",
    eyebrow: "On Movement",
    heading: ["Built", "To Last"],
    sub: "A millennium of craft.\nA moment of style.",
    align: "right",
  },
  {
    roman: "III",
    eyebrow: "On Form",
    heading: ["The Art", "Of Making"],
    sub: "Every stitch, a brushstroke.\nEvery silhouette, a frame.",
    align: "left",
  },
  {
    roman: "IV",
    eyebrow: "The Pieces",
    heading: ["Artifacts", "Of Now"],
    sub: "Not just objects.\nRecords of a moment.",
    align: "right",
  },
  {
    roman: "V",
    eyebrow: "The Eternal Drop",
    heading: ["Available", "Now"],
    sub: null,
    cta: "Explore the Collection",
    align: "center",
  },
];

export default function World() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Global progress tracker
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => { scrollProgress.current = self.progress; },
    });

    // Per-section text reveals
    const cards = document.querySelectorAll(".editorial-card");
    cards.forEach((card) => {
      const roman = card.querySelector(".s-roman");
      const eyebrow = card.querySelector(".s-eyebrow");
      const lines = card.querySelectorAll(".s-line");
      const sub = card.querySelector(".s-sub");
      const cta = card.querySelector(".s-cta");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(roman, { y: 60, opacity: 0, duration: 1.0, ease: "power3.out" })
        .from(eyebrow, { y: 20, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.7")
        .from(lines, { y: 100, opacity: 0, duration: 1.1, ease: "power3.out", stagger: 0.12 }, "-=0.6")
        .from(sub, { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

      if (cta) tl.from(cta, { y: 20, opacity: 0, duration: 0.7 }, "-=0.4");
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* ── Fixed Three.js canvas ── */}
      <div className="fixed inset-0 z-0">
        <RenaissanceScene scrollProgress={scrollProgress} />
      </div>

      {/* ── Scrollable editorial content ── */}
      <div className="relative z-10" style={{ pointerEvents: "none" }}>
        {sections.map((s, idx) => (
          <section
            key={idx}
            className="editorial-card min-h-screen flex flex-col justify-center px-10 md:px-20 py-24"
            style={{
              alignItems:
                s.align === "right"
                  ? "flex-end"
                  : s.align === "center"
                  ? "center"
                  : "flex-start",
            }}
          >
            <div className={`max-w-3xl ${s.align === "center" ? "text-center" : ""}`}>
              {/* Roman numeral */}
              <div
                className="s-roman font-serif font-black leading-none select-none"
                style={{
                  fontSize: "clamp(5rem, 15vw, 14rem)",
                  color: "var(--gold)",
                  opacity: 0.18,
                  marginBottom: "-0.15em",
                  lineHeight: 1,
                }}
              >
                {s.roman}.
              </div>

              {/* Eyebrow */}
              <p
                className="s-eyebrow font-sans tracking-[0.3em] uppercase mb-6"
                style={{ fontSize: "0.65rem", color: "rgba(242,236,216,0.45)" }}
              >
                {s.eyebrow}
              </p>

              {/* Heading */}
              <div
                className="font-serif italic font-bold leading-none mb-8 overflow-hidden"
                style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
              >
                {s.heading.map((line, i) => (
                  <div
                    key={i}
                    className="s-line overflow-hidden"
                    style={{ lineHeight: 0.92 }}
                  >
                    <span className="block" style={{ color: "var(--ivory)" }}>
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sub text */}
              {s.sub && (
                <p
                  className="s-sub font-sans leading-relaxed"
                  style={{
                    fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                    color: "rgba(242,236,216,0.45)",
                    whiteSpace: "pre-line",
                    maxWidth: "28ch",
                    marginLeft: s.align === "right" ? "auto" : undefined,
                  }}
                >
                  {s.sub}
                </p>
              )}

              {/* CTA */}
              {s.cta && (
                <button
                  className="s-cta group mt-10 inline-flex items-center gap-4"
                  style={{ pointerEvents: "auto" }}
                >
                  <span
                    className="font-sans tracking-[0.25em] uppercase border-b pb-1 transition-colors"
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--gold)",
                      borderColor: "var(--gold)",
                    }}
                  >
                    {s.cta}
                  </span>
                  <span
                    className="w-10 h-10 rounded-full border flex items-center justify-center text-sm transition-colors"
                    style={{ color: "var(--gold)", borderColor: "var(--gold)" }}
                  >
                    →
                  </span>
                </button>
              )}
            </div>

            {/* Thin horizontal rule between sections */}
            {idx < sections.length - 1 && (
              <div
                className="absolute bottom-0 left-20 right-20"
                style={{ height: "1px", background: "rgba(201,160,50,0.1)" }}
              />
            )}
          </section>
        ))}
      </div>
    </>
  );
}
