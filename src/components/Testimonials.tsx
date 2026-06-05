"use client";

import { useEffect, useState } from "react";

const quotes = [
  { q: "Everything finally felt like it belonged together. Guests started commenting on the look the day we opened.", name: "Bassil", venue: "Tonton Bakes" },
  { q: "The photos didn't just look good — they felt like us. That's the part nobody else got right.", name: "Stasha", venue: "PieHaus" },
  { q: "Every single touchpoint felt considered and cohesive. It changed how people talk about us.", name: "Zara", venue: "Tony's Woodfire" },
  { q: "Every frame was made to stop someone mid-scroll. Our bookings have never been the same.", name: "Neha", venue: "Kinoya" },
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
      }, 500);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const t = quotes[i];

  return (
    <div className="w-full flex flex-col items-center text-center">
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-10">In their words</p>

      <div className="min-h-[7em] flex flex-col items-center justify-center max-w-3xl">
        <blockquote
          className="font-editorial italic leading-[1.25] transition-all duration-500"
          style={{
            fontSize: "clamp(1.5rem, 3.4vw, 2.8rem)",
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(10px)",
          }}
        >
          &ldquo;{t.q}&rdquo;
        </blockquote>
        <div
          className="mt-8 transition-all duration-500"
          style={{ opacity: show ? 1 : 0 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]">{t.name}</p>
          <p className="text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE]/50 mt-1">{t.venue}</p>
        </div>
      </div>

      {/* dots */}
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
  );
}
