"use client";

const items = [
  {
    course: "Amuse Bouché",
    title: "Branding",
    tagline: "Logos are just the tip of the iceberg.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    services: ["Brand Identity", "2D/3D Illustration", "Logo Design", "Packaging", "Brand Book", "Naming & Copy"],
  },
  {
    course: "Appetizers",
    title: "Social",
    tagline: "Content that earns the scroll.",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
    services: ["Social Strategy", "Photography", "Content Creation", "Copywriting", "Campaigns", "Community"],
  },
  {
    course: "Mains",
    title: "Experience",
    tagline: "Every touchpoint, intentional.",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80",
    services: ["Guest Journey", "Concept Design", "Menu R&D", "Service Design", "Staff Training", "Innovation"],
  },
  {
    course: "Desserts",
    title: "Production",
    tagline: "Strategy you can see and feel.",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    services: ["Art Direction", "3D & VFX", "Print Design", "Web Design", "Motion", "Signage"],
  },
];

const circled = ["❶", "❷", "❸", "❹", "❺", "❻"];

export default function MenuPanels() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      {items.map((it, i) => (
        <div
          key={i}
          className="group relative flex flex-col rounded-2xl border border-[#F3F1EC]/10 bg-[#0F0F0F] overflow-hidden p-7 md:p-9 transition-colors duration-500 hover:border-[#F3F1EC]/25"
        >
          {/* image */}
          <div className="relative h-44 md:h-52 mb-8 overflow-hidden rounded-xl">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${it.img}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
          </div>

          {/* title block */}
          <p className="text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE]/60 mb-3">{it.course}</p>
          <h3 className="font-display text-[#F3F1EC] leading-[0.95] mb-4" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}>
            {it.title}
          </h3>
          <p className="font-editorial text-[#F3F1EC]/85 leading-snug mb-7 max-w-[22ch]" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.45rem)" }}>
            {it.tagline}
          </p>

          {/* divider */}
          <div className="mt-auto">
            <div className="h-px w-full bg-[#F3F1EC]/12 mb-4" />
            <p className="font-marker text-[#B9B5AE]/70 text-sm mb-3">We do:</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {it.services.map((s, j) => (
                <li key={j} className="flex items-center gap-2 text-[13px] text-[#B9B5AE]">
                  <span className="text-[#FF2EC4] text-[11px] leading-none">{circled[j]}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
