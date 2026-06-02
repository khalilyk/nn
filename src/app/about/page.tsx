export default function About() {
  return (
    <div className="px-6 md:px-12 pt-32 pb-24">
      {/* Intro */}
      <div className="max-w-4xl mb-24">
        <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">About</p>
        <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-none tracking-tight mb-10">
          We don&apos;t do<br />ordinary.
        </h1>
        <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl">
          Not Normal is a creative studio for brands that want to stand out — not blend in. We work at the intersection of strategy, design, and culture.
        </p>
      </div>

      {/* Values */}
      <div className="border-t border-white/10 pt-16 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((v) => (
            <div key={v.title}>
              <p className="text-xs tracking-widest uppercase text-white/30 mb-4">{v.number}</p>
              <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
              <p className="text-white/50 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="border-t border-white/10 pt-16 mb-24">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">The Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="group">
              <div
                className="aspect-square mb-5 overflow-hidden"
                style={{ background: member.color }}
              />
              <h4 className="font-bold text-lg">{member.name}</h4>
              <p className="text-sm text-white/40 tracking-wide">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="border-t border-white/10 pt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl md:text-6xl font-bold mb-2">{s.value}</p>
              <p className="text-xs tracking-widest uppercase text-white/40">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const values = [
  {
    number: "01",
    title: "Refuse the Norm",
    desc: "Every brief is an opportunity to challenge what's expected. We push until something feels genuinely different.",
  },
  {
    number: "02",
    title: "Culture First",
    desc: "Great work doesn't happen in a vacuum. We stay embedded in the culture our clients want to reach.",
  },
  {
    number: "03",
    title: "Obsessive Craft",
    desc: "Details matter. From the weight of a typeface to the rhythm of a campaign — we don't cut corners.",
  },
];

const team = [
  { name: "Alex Chen", role: "Creative Director", color: "linear-gradient(135deg, #6366f1 0%, #1a1a2e 100%)" },
  { name: "Jordan Mills", role: "Art Director", color: "linear-gradient(135deg, #ec4899 0%, #1a1a2e 100%)" },
  { name: "Sam Rivera", role: "Strategy Lead", color: "linear-gradient(135deg, #14b8a6 0%, #1a1a2e 100%)" },
  { name: "Mia Park", role: "Motion Designer", color: "linear-gradient(135deg, #f59e0b 0%, #1a1a2e 100%)" },
  { name: "Kai Osei", role: "Brand Strategist", color: "linear-gradient(135deg, #8b5cf6 0%, #1a1a2e 100%)" },
  { name: "Lee Vance", role: "Digital Director", color: "linear-gradient(135deg, #06b6d4 0%, #1a1a2e 100%)" },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "3", label: "Years Running" },
  { value: "8", label: "Awards Won" },
];
