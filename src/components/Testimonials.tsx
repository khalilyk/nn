"use client";

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
  return (
    <div className="relative z-10 w-full px-8 md:px-16 py-20">
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-12 text-center">In their words</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 max-w-5xl mx-auto">
        {quotes.map((t, idx) => (
          <a
            key={idx}
            href={t.href}
            className="group flex flex-col rounded-2xl bg-[#F3F1EC] text-[#0A0A0A] p-8 md:p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:-translate-y-1.5"
          >
            {/* project image */}
            <div className="h-40 w-full overflow-hidden rounded-xl mb-7">
              <div
                className="h-full w-full bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                style={{ backgroundImage: `url('${t.img}')` }}
              />
            </div>

            {/* quote */}
            <blockquote className="font-editorial italic leading-[1.3] flex-1" style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.55rem)" }}>
              &ldquo;{t.q}&rdquo;
            </blockquote>

            {/* attribution */}
            <div className="mt-8 pt-5 border-t border-[#0A0A0A]/12">
              <p className="font-display tracking-[0.12em] uppercase group-hover:text-[#FF2EC4] transition-colors" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.2rem)" }}>{t.name}</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/50 mt-1.5">{t.venue}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
