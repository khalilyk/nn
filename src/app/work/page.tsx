"use client";

import { useState } from "react";

const categories = ["All", "Branding", "Social", "Visual Production", "Experience"];

const projects = [
  { id: 1, title: "Kinoya", type: "Japanese Restaurant · Surry Hills", category: "Branding", color: "linear-gradient(135deg, #1a1a2e, #2d2d44)" },
  { id: 2, title: "Tony's Woodfire", type: "Italian Restaurant · Sydney", category: "Branding", color: "linear-gradient(135deg, #2e1a1a, #442d2d)" },
  { id: 3, title: "Tonton Bakes", type: "Patisserie · Sydney", category: "Visual Production", color: "linear-gradient(135deg, #2e2a1a, #443d2d)" },
  { id: 4, title: "PieHaus", type: "Pie Bar · Sydney", category: "Social", color: "linear-gradient(135deg, #1a2e1a, #2d442d)" },
  { id: 5, title: "Mimi Kakushi", type: "Japanese Izakaya · Dubai", category: "Branding", color: "linear-gradient(135deg, #1a1a2e, #3d2d44)" },
  { id: 6, title: "Atlantis", type: "Hospitality Group · Dubai", category: "Experience", color: "linear-gradient(135deg, #1a2a2e, #2d3d44)" },
  { id: 7, title: "Shanghai Me", type: "Chinese Restaurant · Dubai", category: "Branding", color: "linear-gradient(135deg, #2e1a1a, #44302d)" },
  { id: 8, title: "Genesis Coffee Co.", type: "Specialty Coffee · Sydney", category: "Visual Production", color: "linear-gradient(135deg, #1e1a14, #362e20)" },
  { id: 9, title: "Yava", type: "Café · Sydney", category: "Social", color: "linear-gradient(135deg, #1a1e14, #2e3620)" },
  { id: 10, title: "Lucky's", type: "Bar & Dining · Sydney", category: "Branding", color: "linear-gradient(135deg, #2e1e1a, #443020)" },
  { id: 11, title: "Sirene", type: "Seafood Restaurant · Beirut", category: "Experience", color: "linear-gradient(135deg, #1a242e, #2d3844)" },
  { id: 12, title: "By Moudz", type: "Private Dining · Beirut", category: "Social", color: "linear-gradient(135deg, #2a1a2e, #402d44)" },
];

export default function Work() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="px-6 md:px-12 pt-32 pb-24">
      <div className="mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">Work</p>
        <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-none tracking-tight">
          Our Clients
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
            <div>
              <h3 className="font-bold text-lg leading-tight">{project.title}</h3>
              <p className="text-sm text-white/40 mt-1">{project.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
