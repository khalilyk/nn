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
          Not Normal is a hospitality branding studio built for restaurants, bars, and cafes that want to be talked about — not just visited.
        </p>
      </div>

      {/* What we believe */}
      <div className="border-t border-white/10 pt-16 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">From concept to creation.</h2>
          <div className="space-y-5 text-white/50 leading-relaxed">
            <p>
              We&apos;re not a full-service agency. We&apos;re specialists — hospitality only. That focus means we understand your world: your margins, your floor, your regulars, and what actually makes someone choose you over the place next door.
            </p>
            <p>
              Real strategy. Bold ideas. Memorable brands. That&apos;s the promise we deliver on — whether you&apos;re opening your first venue or refreshing an established one.
            </p>
          </div>
        </div>
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

      {/* Locations */}
      <div className="border-t border-white/10 pt-16 mb-24">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">Where We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((l) => (
            <div key={l.city} className="border border-white/10 p-8">
              <h3 className="text-2xl font-bold mb-2">{l.city}</h3>
              <p className="text-white/40 text-sm">{l.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="border-t border-white/10 pt-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">What Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div key={t.author} className="border border-white/10 p-8">
              <p className="text-white/70 leading-relaxed mb-6 text-lg">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-xs tracking-widest uppercase text-white/30">— {t.author}, {t.venue}</p>
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
    title: "Hospitality Only",
    desc: "We don't spread ourselves thin. Restaurants, bars, cafes — that's our world. Deep focus means better results.",
  },
  {
    number: "02",
    title: "Strategy & Soul",
    desc: "Great hospitality brands aren't just pretty — they have a point of view. We make sure yours does too.",
  },
  {
    number: "03",
    title: "Every Touchpoint",
    desc: "From your logo to your menu to your social feed — it all needs to feel like it belongs together.",
  },
];

const locations = [
  { city: "Sydney", note: "Headquarters — where it all started." },
  { city: "Dubai", note: "Established market — working with top-tier venues." },
  { city: "Beirut", note: "One of the world's great food cities." },
];

const testimonials = [
  {
    quote: "Everything finally felt like it belonged together. Guests started commenting on the look.",
    author: "Bassil",
    venue: "Tonton Bakes",
  },
  {
    quote: "The photos didn't just look good — they felt like us.",
    author: "Stasha",
    venue: "PieHaus",
  },
  {
    quote: "Every single touchpoint felt considered and cohesive.",
    author: "Zara",
    venue: "Tony's Woodfire",
  },
  {
    quote: "Every photo felt like it was made to stop someone mid-scroll.",
    author: "Neha",
    venue: "Kinoya",
  },
];
