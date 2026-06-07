"use client";

import MenuLink from "./MenuLink";

const services = [
  {
    title: "Branding & Identity",
    body: "A brand isn't just a name or a logo — it's the foundation of everything.",
    tags: ["brand identity", "logo design", "brand book", "packaging", "naming & copy", "2D/3D illustration"],
  },
  {
    title: "Social & Storytelling",
    body: "Great hospitality brands don't just sell — they tell stories worth sharing.",
    tags: ["social strategy", "content creation", "campaigns", "photography", "copywriting", "community"],
  },
  {
    title: "Experience & Innovation",
    body: "Beyond branding, we perfect every touchpoint of the guest journey.",
    tags: ["guest journey", "menu R&D", "staff training", "concept design", "service design", "innovation"],
  },
  {
    title: "Visual Production",
    body: "Strategy translated into striking design, print and digital execution.",
    tags: ["print design and production", "web design and development", "signage"],
  },
];

export default function MenuSplit() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
      {/* Left — sticky intro + CTA */}
      <div className="md:sticky md:top-[50vh] md:-translate-y-1/2 self-start h-fit">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-6">The Menu — What We Do</p>
        <h3 className="font-editorial leading-[1.1] mb-8" style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)" }}>
          From concept to creation, this is what happens when strategy meets standout design.
        </h3>
        <p className="text-[#0A0A0A]/70 leading-relaxed max-w-md mb-10" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)" }}>
          We help hospitality brands stand out through strategy, design, content and guest experience. From branding to campaigns, every detail is crafted to connect and be remembered.
        </p>
        <MenuLink />
      </div>

      {/* Right — scrolling services */}
      <div className="flex flex-col">
        {services.map((s, i) => (
          <div
            key={i}
            className={`py-10 md:py-14 ${i > 0 ? "border-t border-[#0A0A0A]/12" : ""}`}
          >
            <h4 className="font-editorial leading-tight mb-5" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)" }}>
              {s.title}
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#0A0A0A]/25 px-3.5 py-1.5 text-[12px] text-[#0A0A0A]/80 transition-colors duration-300 hover:bg-[#0A0A0A] hover:text-[#F3F1EC] hover:border-[#0A0A0A]"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-[#0A0A0A]/65 leading-relaxed max-w-md" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)" }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
