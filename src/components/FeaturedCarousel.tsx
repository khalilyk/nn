"use client";

import { useState } from "react";

type Project = {
  name: string;
  city: string;
  cat: string;
  year: string;
  desc: string;
  img: string;
};

const projects: Project[] = [
  {
    name: "3FILS",
    city: "Dubai",
    cat: "Branding",
    year: "2019",
    desc: "From a bold idea to a dining experience that redefined a category. We built more than a brand, we built obsession.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Revolver",
    city: "Sydney",
    cat: "Identity",
    year: "2021",
    desc: "A neighbourhood bar reimagined as a cultural anchor. Quiet rebellion, designed into every detail.",
    img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Maison Dali",
    city: "Beirut",
    cat: "Branding",
    year: "2022",
    desc: "Surrealism on a plate. A world, not a logo, each touchpoint a different act in the same play.",
    img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Oakberry",
    city: "Dubai",
    cat: "Content",
    year: "2023",
    desc: "Visual direction that turned a healthy habit into a status symbol. Crave-worthy, frame by frame.",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Benny's",
    city: "Sydney",
    cat: "Identity",
    year: "2024",
    desc: "Concept, identity and energy for a room people don't want to leave. Built to be remembered.",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Print Paradise",
    city: "Beirut",
    cat: "Print",
    year: "2025",
    desc: "Where editorial meets hospitality. A brand that reads like a magazine and tastes like a memory.",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
  },
];

const FILTERS = ["All", "Branding", "Identity", "Content", "Print"];

export default function FeaturedCarousel() {
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <div className="w-full select-none">
      {/* Heading */}
      <div className="flex items-baseline gap-5 md:gap-8 mb-8">
        <span className="font-editorial italic text-[#0A0A0A]/50" style={{ fontSize: "clamp(1rem, 1.6vw, 1.4rem)" }}>02</span>
        <h2 className="font-editorial leading-none" style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}>Works</h2>
      </div>

      {/* Filter tabs + range */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#0A0A0A]/15 pb-5 mb-2">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              data-cursor="tap"
              className={`text-[10px] tracking-[0.25em] uppercase transition-colors ${
                filter === f ? "text-[#0A0A0A]" : "text-[#0A0A0A]/40 hover:text-[#0A0A0A]/70"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="font-editorial italic text-[#0A0A0A]/50" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.25rem)" }}>
          2019 — 2025
        </span>
      </div>

      {/* Rows */}
      <div>
        {list.map((p, i) => (
          <Row key={p.name} project={p} idx={i} />
        ))}
      </div>
    </div>
  );
}

function Row({ project, idx }: { project: Project; idx: number }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href="#footer"
      data-cursor="View"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group grid grid-cols-1 md:grid-cols-12 items-center gap-5 md:gap-8 border-b border-[#0A0A0A]/15 py-7 md:py-9"
    >
      {/* category + name */}
      <div className="md:col-span-5 order-2 md:order-1">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-3">
          {String(idx + 1).padStart(2, "0")} — {project.cat} · {project.city}
        </p>
        <h3
          className="font-display uppercase leading-[0.95] tracking-tight transition-transform duration-500 group-hover:translate-x-2"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
        >
          {project.name}
        </h3>
      </div>

      {/* thumbnail */}
      <div className="md:col-span-4 order-1 md:order-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0A0A] rounded-sm">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ backgroundImage: `url('${project.img}')`, transform: hover ? "scale(1.08)" : "scale(1)" }}
          />
        </div>
      </div>

      {/* view link */}
      <div className="md:col-span-3 order-3 flex md:justify-end">
        <span className="inline-flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase text-[#0A0A0A]/70 group-hover:text-[#0A0A0A] transition-colors">
          View the
          <span className="inline-block w-8 h-px bg-[#0A0A0A]/40 group-hover:w-12 transition-all duration-500" />
          Project
        </span>
      </div>
    </a>
  );
}
