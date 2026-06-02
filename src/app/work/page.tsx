"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";

const projects = [
  { slug: "3fils", name: "3Fils", type: "Brand Identity", city: "Dubai", year: "2024", color: "#1a1f2e" },
  { slug: "revolver", name: "Revolver", type: "Brand Strategy", city: "Sydney", year: "2024", color: "#1f1a1a" },
  { slug: "maison-dali", name: "Maison Dali", type: "Full Brand", city: "Beirut", year: "2024", color: "#1a1f1a" },
  { slug: "piehaus", name: "PieHaus", type: "Identity & Social", city: "Sydney", year: "2023", color: "#1f1d1a" },
  { slug: "tonys", name: "Tony's Woodfire", type: "Identity & Experience", city: "Sydney", year: "2023", color: "#1a1a1f" },
  { slug: "yava", name: "Yava", type: "Brand & Content", city: "Sydney", year: "2023", color: "#1f1a1f" },
  { slug: "bar-baker", name: "Bar Baker", type: "Concept & Identity", city: "Sydney", year: "2023", color: "#1f1f1a" },
  { slug: "oakberry", name: "Oakberry", type: "Visual Direction", city: "Sydney", year: "2022", color: "#1a1f1f" },
  { slug: "kinoya", name: "Kinoya", type: "Full Brand", city: "Sydney", year: "2022", color: "#1f1a2e" },
  { slug: "shanghai-me", name: "Shanghai Me", type: "Brand Identity", city: "Dubai", year: "2022", color: "#2e1a1a" },
  { slug: "mimi-kakushi", name: "Mimi Kakushi", type: "Identity & Experience", city: "Dubai", year: "2022", color: "#1a2e2e" },
  { slug: "genesis", name: "Genesis Coffee Co.", type: "Visual Direction", city: "Sydney", year: "2022", color: "#1e1a14" },
];

const cities = ["All", "Sydney", "Dubai", "Beirut"];

function ProjectRow({ p, i }: { p: typeof projects[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: i * 0.05 }}
    >
      <Link
        href={`/work/${p.slug}`}
        className="group flex items-center justify-between py-5 border-b border-[#E8E2D4]/10 hover:border-[#D4FF38]/20 transition-colors relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-baseline gap-6">
          <span className="text-[9px] tracking-widest text-[#E8E2D4]/20 w-6">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-display text-3xl md:text-5xl text-[#E8E2D4] group-hover:text-[#D4FF38] transition-colors leading-none">
            {p.name}
          </span>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/25 hidden md:block">{p.type}</span>
          <span className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/25 hidden md:block">{p.city}</span>
          <span className="text-[10px] text-[#E8E2D4]/20">{p.year}</span>
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
            className="text-[#D4FF38]"
          >→</motion.span>
        </div>

        {/* Hover image */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 w-48 h-32 pointer-events-none z-10 hidden md:block"
              style={{ background: p.color }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
}

export default function Work() {
  const [city, setCity] = useState("All");
  const filtered = city === "All" ? projects : projects.filter((p) => p.city === city);

  return (
    <div className="px-6 md:px-10 pt-32 pb-24">
      <div className="mb-20">
        <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 mb-6">Selected Work</p>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="font-display leading-none text-[#E8E2D4]"
            style={{ fontSize: "clamp(4rem,12vw,10rem)" }}
          >
            OUR WORK
          </motion.h1>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-4 mb-12 border-b border-[#E8E2D4]/10 pb-6">
        {cities.map((c) => (
          <button
            key={c}
            onClick={() => setCity(c)}
            className={`text-[10px] tracking-widest uppercase transition-colors ${
              city === c ? "text-[#D4FF38]" : "text-[#E8E2D4]/30 hover:text-[#E8E2D4]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div>
        {filtered.map((p, i) => (
          <ProjectRow key={p.slug} p={p} i={i} />
        ))}
      </div>
    </div>
  );
}
