"use client";

import { useState } from "react";

const categories = ["All", "Branding", "Art Direction", "Digital", "Print", "Motion"];

const projects = [
  { id: 1, title: "Void Brand Identity", client: "Void Co.", category: "Branding", year: "2024", color: "linear-gradient(135deg, #6366f1, #1a1a2e)" },
  { id: 2, title: "Echo Campaign", client: "Echo Labs", category: "Art Direction", year: "2024", color: "linear-gradient(135deg, #ec4899, #1a1a2e)" },
  { id: 3, title: "Phantom Digital", client: "Phantom", category: "Digital", year: "2024", color: "linear-gradient(135deg, #14b8a6, #1a1a2e)" },
  { id: 4, title: "Signal Print Series", client: "Signal Mag", category: "Print", year: "2023", color: "linear-gradient(135deg, #f59e0b, #1a1a2e)" },
  { id: 5, title: "Fracture Motion Reel", client: "Fracture", category: "Motion", year: "2023", color: "linear-gradient(135deg, #8b5cf6, #1a1a2e)" },
  { id: 6, title: "Onyx Rebrand", client: "Onyx Studio", category: "Branding", year: "2023", color: "linear-gradient(135deg, #06b6d4, #1a1a2e)" },
  { id: 7, title: "Apex Digital Platform", client: "Apex", category: "Digital", year: "2023", color: "linear-gradient(135deg, #f43f5e, #1a1a2e)" },
  { id: 8, title: "Drift Art Direction", client: "Drift Magazine", category: "Art Direction", year: "2022", color: "linear-gradient(135deg, #84cc16, #1a1a2e)" },
  { id: 9, title: "Neon Brand System", client: "Neon Inc.", category: "Branding", year: "2022", color: "linear-gradient(135deg, #fb923c, #1a1a2e)" },
];

export default function Work() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="px-6 md:px-12 pt-32 pb-24">
      <div className="mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">Work</p>
        <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-none tracking-tight">
          Our Projects
        </h1>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 mb-16 border-t border-white/10 pt-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
              active === cat
                ? "border-white bg-white text-[#0a0a0a]"
                : "border-white/20 text-white/50 hover:text-white hover:border-white/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <div key={project.id} className="group cursor-pointer">
            <div
              className="aspect-[4/3] mb-4 overflow-hidden relative"
              style={{ background: project.color }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg leading-tight">{project.title}</h3>
                <p className="text-sm text-white/40 mt-1">{project.client}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-xs tracking-widest uppercase text-white/30">{project.category}</p>
                <p className="text-xs text-white/20 mt-1">{project.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
