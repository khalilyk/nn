"use client";

import { useEffect, useState } from "react";

const quotes = [
  {
    q: "Everything finally felt like it belonged together. Guests started commenting on the look the day we opened.",
    name: "Bassil", venue: "Tonton Bakes", href: "#s04",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    q: "The photos didn't just look good — they felt like us. That's the part nobody else got right.",
    name: "Stasha", venue: "PieHaus", href: "#s04",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
  },
  {
    q: "Every single touchpoint felt considered and cohesive. It changed how people talk about us.",
    name: "Zara", venue: "Tony's Woodfire", href: "#s04",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
  },
  {
    q: "Every frame was made to stop someone mid-scroll. Our bookings have never been the same.",
    name: "Neha", venue: "Kinoya", href: "#s04",
    img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((p) => (p + 1) % quotes.length);
        setShow(true);
      }, 900);
    }, 9000);
    return () => clearInterval(id);
  }, []);

  const t = quotes[i];

  return (
    <>
      {/* Background — the active project's main image */}
      {quotes.map((qt, idx) => (
        <div
          key={idx}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1200ms]"
          style={{ backgroundImage: `url('${qt.img}')`, opacity: idx === i && show ? 0.32 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-[#0A0A0A]/70" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 90% at 50% 50%, transparent 25%, #0A0A0A 100%)" }} />

      <div className="relative z-10 w-full flex flex-col items-center text-center px-8 md:px-16">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-10">In their words</p>

        <a href={t.href} className="group min-h-[7em] flex flex-col items-center justify-center max-w-3xl">
          <blockquote
            className="font-editorial italic leading-[1.25] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.8rem)", opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)" }}
          >
            &ldquo;{t.q}&rdquo;
          </blockquote>
          <div className="mt-10 transition-all duration-[900ms]" style={{ opacity: show ? 1 : 0 }}>
            <p className="font-display tracking-[0.15em] uppercase text-[#F3F1EC] group-hover:text-[#FF2EC4] transition-colors" style={{ fontSize: "clamp(1rem, 1.6vw, 1.35rem)" }}>{t.name}</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#B9B5AE] mt-2">{t.venue}</p>
          </div>
        </a>

        <div className="flex gap-2 mt-10">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setShow(false); setTimeout(() => { setI(idx); setShow(true); }, 200); }}
              className="h-1.5 rounded-full transition-all"
              style={{ width: idx === i ? 24 : 6, background: idx === i ? "#F3F1EC" : "rgba(243,241,236,0.25)" }}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
