import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Branding & Identity",
    desc: "Mission and values definition. Visual identity — logo, colour, type, art direction. Verbal identity — tone of voice, naming, taglines. Brand guidelines your whole team can use.",
    outcomes: ["Logo & visual system", "Brand guidelines", "Naming & tagline", "Menu design"],
  },
  {
    number: "02",
    title: "Social & Storytelling",
    desc: "Content creation that stops the scroll. Visuals, captions, strategy — all built around who you're trying to reach and what makes them book. We make your feed feel like you.",
    outcomes: ["Content strategy", "Photo & video shoots", "Caption writing", "Monthly management"],
  },
  {
    number: "03",
    title: "Experience & Innovation",
    desc: "The brand doesn't stop at the door. We design the moments guests remember — from menu R&D and staff training to table touches and the guest journey end to end.",
    outcomes: ["Menu R&D", "Staff training", "Guest journey mapping", "Concept development"],
  },
  {
    number: "04",
    title: "Visual Production",
    desc: "Design, print, and digital execution. Menus, signage, packaging, merch, digital assets — everything your brand needs to exist in the physical world.",
    outcomes: ["Menu & print design", "Packaging", "Signage & wayfinding", "Digital assets"],
  },
];

export default function Services() {
  return (
    <div className="px-6 md:px-12 pt-32 pb-24">
      <div className="max-w-4xl mb-24">
        <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">Services</p>
        <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-none tracking-tight mb-10">
          What<br />We Do
        </h1>
        <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl">
          From branding & storytelling to stuff you can hold — we cover every touchpoint that shapes how guests feel about your venue.
        </p>
      </div>

      <div className="space-y-0">
        {services.map((s, i) => (
          <div key={s.title} className={`border-t border-white/10 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 ${i === services.length - 1 ? "border-b" : ""}`}>
            <div>
              <p className="text-xs tracking-widest uppercase text-white/30 mb-4">{s.number}</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{s.title}</h2>
              <p className="text-white/50 leading-relaxed">{s.desc}</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs tracking-widest uppercase text-white/30 mb-5">What&apos;s Included</p>
              <ul className="space-y-3">
                {s.outcomes.map((o) => (
                  <li key={o} className="flex items-center gap-3 text-white/60">
                    <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="pt-24 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Not sure what you need?<br />Let&apos;s talk it through.
        </h2>
        <a
          href="https://calendly.com/notnormal/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="self-start md:self-auto text-xs tracking-widest uppercase bg-white text-[#0a0a0a] px-8 py-4 hover:bg-white/80 transition-colors"
        >
          Book a Free Call
        </a>
      </div>
    </div>
  );
}
