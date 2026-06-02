"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const marqueeItems = [
  "Branding", "Identity", "Social", "Storytelling", "Experience",
  "Menu R&D", "Visual Production", "Campaigns", "Strategy", "Soul",
];

const featuredClients = [
  { name: "Kinoya", type: "Japanese Restaurant", color: "linear-gradient(135deg, #1a1a2e, #2d2d44)" },
  { name: "Tony's Woodfire", type: "Italian Restaurant", color: "linear-gradient(135deg, #2e1a1a, #442d2d)" },
  { name: "Tonton Bakes", type: "Patisserie", color: "linear-gradient(135deg, #1a2e1a, #2d442d)" },
  { name: "Mimi Kakushi", type: "Japanese Izakaya", color: "linear-gradient(135deg, #1a1a2e, #44332d)" },
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
          Hospitality Branding — Sydney · Dubai · Beirut
        </p>
        <h1 className="text-[clamp(3rem,12vw,10rem)] font-bold leading-none tracking-tight">
          Nobody<br />Remembers<br />Normal.
        </h1>
        <p className="mt-8 text-base md:text-lg text-white/50 max-w-xl leading-relaxed">
          Strategy and soul for the restaurants in Sydney people can&apos;t stop talking about.
        </p>
        <div className="flex items-center gap-6 mt-10">
          <Link
            href="/work"
            className="text-xs tracking-widest uppercase border border-white/20 px-6 py-3 hover:bg-white hover:text-[#0a0a0a] transition-colors"
          >
            Our Work
          </Link>
          <a
            href="https://calendly.com/notnormal/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors"
          >
            Book a Call →
          </a>
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

      {/* Services intro */}
      <section className="px-6 md:px-12 py-24 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            We build bold brands for the edible & drinkable.
          </h2>
          <div className="space-y-6 text-white/50 leading-relaxed">
            <p>
              From branding & storytelling to stuff you can hold — we cover every touchpoint that shapes how guests feel about your restaurant before, during, and after they eat.
            </p>
            <p>
              We&apos;re specialists. Hospitality only. That means we understand your world, your margins, and what actually drives bookings.
            </p>
            <Link href="/services" className="inline-block text-xs tracking-widest uppercase text-white hover:text-white/60 transition-colors mt-2">
              What We Do →
            </Link>
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="px-6 md:px-12 py-24 border-t border-white/10">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-12">Brands We&apos;ve Built</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {allClients.map((client) => (
            <div key={client} className="bg-[#0a0a0a] flex items-center justify-center py-8 px-6">
              <span className="text-sm font-medium text-white/50 tracking-wide text-center">{client}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section className="px-6 md:px-12 py-24 border-t border-white/10">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Selected Work</h2>
          <Link href="/work" className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors hidden md:block">
            All Work →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredClients.map((item) => (
            <Link key={item.name} href="/work" className="group relative overflow-hidden aspect-[4/3] block" style={{ background: item.color }}>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs tracking-widest uppercase text-white/40 mb-1">{item.type}</p>
                <h3 className="text-2xl font-bold">{item.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 md:px-12 py-24 border-t border-white/10">
        <blockquote className="max-w-3xl">
          <p className="text-2xl md:text-4xl font-medium leading-snug text-white/80 mb-8">
            &ldquo;Every single touchpoint felt considered and cohesive.&rdquo;
          </p>
          <cite className="text-sm text-white/40 not-italic tracking-widest uppercase">
            Zara — Tony&apos;s Woodfire
          </cite>
        </blockquote>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-24 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-sm">
            Ready to be<br />Not Normal?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://calendly.com/notnormal/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase bg-white text-[#0a0a0a] px-8 py-4 hover:bg-white/80 transition-colors text-center"
            >
              Book a Free Call
            </a>
            <Link
              href="/contact"
              className="text-xs tracking-widest uppercase border border-white/20 px-8 py-4 hover:bg-white/5 transition-colors text-center"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const allClients = [
  "Lucky's", "Tony's Woodfire", "Kinoya", "Tonton Bakes",
  "PieHaus", "Yava", "Genesis Coffee Co.", "Voyage Concierge",
  "Matter Nutrition", "Xu", "Mimi Kakushi", "Atlantis",
  "Chez Wamogo", "Sirene", "Shanghai Me", "By Moudz",
];
