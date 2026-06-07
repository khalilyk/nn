"use client";

const items = [
  { q: "Everything finally felt like it belonged together.", name: "Bassil", role: "Tonton Bakes", color: "#FF2EC4", r: -5, x: -60 },
  { q: "The photos didn't just look good — they felt like us.", name: "Stasha", role: "PieHaus", color: "#C6FF4D", r: 4, x: 64 },
  { q: "Every touchpoint felt considered and cohesive.", name: "Zara", role: "Tony's Woodfire", color: "#6AB7FF", r: -3, x: -44 },
  { q: "Every frame was made to stop someone mid-scroll.", name: "Neha", role: "Kinoya", color: "#C9A7FF", r: 5, x: 50 },
];

export default function Testimonials() {
  return (
    <div className="relative z-10 w-full flex flex-col items-center text-center px-8 md:px-16 py-24">
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-16">In their words</p>

      <div className="flex flex-col items-center -space-y-5 md:-space-y-6 w-full max-w-2xl">
        {items.map((it, i) => (
          <div
            key={i}
            className="relative w-full max-w-md text-left text-[#0A0A0A] px-7 py-6 transition-transform duration-300 hover:-translate-y-1.5 hover:z-20"
            style={{
              background: it.color,
              transform: `rotate(${it.r}deg) translateX(${it.x}px)`,
              borderRadius: 6,
              boxShadow: "0 14px 30px -10px rgba(0,0,0,0.7)",
              zIndex: i + 1,
            }}
          >
            <blockquote className="font-sans font-semibold leading-[1.2]" style={{ fontSize: "clamp(1.05rem, 1.9vw, 1.45rem)" }}>
              {it.q}
            </blockquote>
            <p className="mt-3 text-[11px] tracking-[0.12em] uppercase font-medium text-[#0A0A0A]/70">
              {it.name} — {it.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
