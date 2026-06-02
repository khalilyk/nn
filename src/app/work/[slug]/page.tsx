"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const projects: Record<string, {
  name: string; type: string; city: string; year: string; color: string;
  challenge: string; strategy: string; outcome: string; client: string;
}> = {
  "3fils": {
    name: "3Fils", type: "Brand Identity", city: "Dubai", year: "2024", color: "#1a1f2e",
    client: "3Fils Restaurant",
    challenge: "3Fils needed to evolve from a beloved pop-up into a permanent destination without losing the raw energy that built their cult following.",
    strategy: "We preserved the anti-establishment spirit while adding enough sophistication to sustain a permanent location. Every touchpoint was designed to feel earned, not designed.",
    outcome: "Fully booked for 3 months on opening. Voted Top 50 MENA within 6 months. Brand recognition increased 340% in target market.",
  },
  "revolver": {
    name: "Revolver", type: "Brand Strategy", city: "Sydney", year: "2024", color: "#1f1a1a",
    client: "Revolver Bar",
    challenge: "A new bar in Surry Hills entering an oversaturated market needed a reason to exist beyond the product.",
    strategy: "We built a cultural identity around a specific type of person — the quiet rebel — rather than around a drink category or aesthetic.",
    outcome: "Became a neighbourhood anchor within 4 months. Organic social growth of 280% in first quarter.",
  },
  "maison-dali": {
    name: "Maison Dali", type: "Full Brand", city: "Beirut", year: "2024", color: "#1a1f1a",
    client: "Maison Dali",
    challenge: "A Beirut restaurant inspired by surrealism needed a brand as layered and surprising as its cuisine.",
    strategy: "We created a world, not just a logo — each touchpoint a different act in the same surrealist play.",
    outcome: "Featured in Vogue Arabia and Condé Nast Traveller within first year. 98% booking capacity maintained.",
  },
};

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const p = projects[slug] || {
    name: slug?.replace(/-/g, " ").toUpperCase(),
    type: "Brand Identity", city: "Sydney", year: "2024", color: "#1a1a1a",
    client: "Client", challenge: "Coming soon.", strategy: "Coming soon.", outcome: "Coming soon.",
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="min-h-[70vh] flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 relative overflow-hidden"
        style={{ background: p.color }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
        <div className="relative z-10">
          <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/40 mb-4">{p.type} · {p.city} · {p.year}</p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              className="font-display text-[#E8E2D4] leading-none"
              style={{ fontSize: "clamp(4rem,12vw,10rem)" }}
            >
              {p.name}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-6 md:px-10 py-20 border-b border-[#E8E2D4]/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-[9px] tracking-widest uppercase text-[#E8E2D4]/30 mb-3">Client</p>
            <p className="text-[#E8E2D4]/70">{p.client}</p>
          </div>
          <div>
            <p className="text-[9px] tracking-widest uppercase text-[#E8E2D4]/30 mb-3">Service</p>
            <p className="text-[#E8E2D4]/70">{p.type}</p>
          </div>
          <div>
            <p className="text-[9px] tracking-widest uppercase text-[#E8E2D4]/30 mb-3">Location</p>
            <p className="text-[#E8E2D4]/70">{p.city}</p>
          </div>
        </div>
      </section>

      {/* Content sections */}
      {[
        { label: "The Challenge", content: p.challenge },
        { label: "The Strategy", content: p.strategy },
        { label: "The Outcome", content: p.outcome },
      ].map((s) => (
        <section key={s.label} className="px-6 md:px-10 py-16 border-b border-[#E8E2D4]/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 className="font-display text-3xl md:text-5xl text-[#E8E2D4]/20">{s.label.toUpperCase()}</h2>
            <p className="text-[#E8E2D4]/60 leading-relaxed text-lg font-light">{s.content}</p>
          </div>
        </section>
      ))}

      {/* Gallery placeholder */}
      <section className="px-6 md:px-10 py-16 border-b border-[#E8E2D4]/10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[4/3]" style={{ background: p.color, opacity: 0.5 + i * 0.08 }} />
          ))}
        </div>
      </section>

      {/* Nav */}
      <section className="px-6 md:px-10 py-16 flex items-center justify-between">
        <Link href="/work" className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 hover:text-[#E8E2D4] transition-colors">
          ← All Work
        </Link>
        <Link href="/contact" className="text-[10px] tracking-widest uppercase border border-[#D4FF38] text-[#D4FF38] px-6 py-3 hover:bg-[#D4FF38] hover:text-[#080808] transition-colors">
          Start a Project
        </Link>
      </section>
    </div>
  );
}
