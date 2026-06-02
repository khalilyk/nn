"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const marqueeItems = [
  "Design", "Art Direction", "Brand Identity", "Motion", "Strategy",
  "Campaigns", "Digital", "Print", "Experience", "Culture",
];

const featuredWork = [
  { id: 1, title: "Void Brand Identity", category: "Branding", color: "linear-gradient(135deg, #6366f1, #8b5cf6)" },
  { id: 2, title: "Echo Campaign", category: "Art Direction", color: "linear-gradient(135deg, #ec4899, #f43f5e)" },
  { id: 3, title: "Phantom Digital", category: "Digital", color: "linear-gradient(135deg, #14b8a6, #06b6d4)" },
  { id: 4, title: "Signal Print Series", category: "Print", color: "linear-gradient(135deg, #f59e0b, #ef4444)" },
];

export default function Home() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    let x = 0;
    let raf: number;
    const step = () => {
      x -= 0.5;
      const half = el.scrollWidth / 2;
      if (Math.abs(x) >= half) x = 0;
      el.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-start justify-end px-6 md:px-12 pb-16 pt-32">
        <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
          Creative Studio — Est. 2024
        </p>
        <h1 className="text-[clamp(3rem,12vw,10rem)] font-bold leading-none tracking-tight">
          Not<br />Normal.
        </h1>
        <p className="mt-8 text-base md:text-lg text-white/50 max-w-md leading-relaxed">
          We build brands, campaigns, and experiences that refuse to fit in.
        </p>
        <div className="flex items-center gap-6 mt-10">
          <Link
            href="/work"
            className="text-xs tracking-widest uppercase border border-white/20 px-6 py-3 hover:bg-white hover:text-[#0a0a0a] transition-colors"
          >
            View Work
          </Link>
          <Link
            href="/contact"
            className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors"
          >
            Get in Touch →
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-t border-white/10 py-5 overflow-hidden">
        <div ref={marqueeRef} className="flex gap-12 whitespace-nowrap w-max">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-xs tracking-[0.3em] uppercase text-white/30">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Selected work preview */}
      <section className="px-6 md:px-12 py-24 border-t border-white/10">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Selected Work</h2>
          <Link href="/work" className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors hidden md:block">
            All Work →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredWork.map((item) => (
            <Link key={item.id} href="/work" className="group relative overflow-hidden aspect-[4/3] bg-white/5 block">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                style={{ background: item.color }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs tracking-widest uppercase text-white/40 mb-1">{item.category}</p>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-24 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-sm">
            Ready to be<br />Not Normal?
          </h2>
          <Link
            href="/contact"
            className="self-start md:self-auto text-xs tracking-widest uppercase bg-white text-[#0a0a0a] px-8 py-4 hover:bg-white/80 transition-colors"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  );
}
