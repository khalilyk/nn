const POSTS = [
  {
    cat: "Branding",
    date: "May 2026",
    title: "Why nobody remembers normal",
    excerpt: "The case for building brands with staying power instead of chasing the trend.",
    read: "5 min read",
  },
  {
    cat: "Hospitality",
    date: "Apr 2026",
    title: "Menu engineering that actually sells",
    excerpt: "How layout, language and a little psychology turn a menu into a revenue tool.",
    read: "6 min read",
  },
  {
    cat: "Experience",
    date: "Mar 2026",
    title: "The first 90 seconds of a guest's visit",
    excerpt: "First impressions in hospitality, and why they quietly decide everything.",
    read: "4 min read",
  },
  {
    cat: "Content",
    date: "Feb 2026",
    title: "Designing for the photo, not just the plate",
    excerpt: "In the age of social, your venue is competing on camera too.",
    read: "5 min read",
  },
];

/* The Journal — a simple editorial blog index. */
export default function JournalSection() {
  return (
    <section id="journal" className="scroll-mt-20 bg-[#E7E4DD] text-[#0A0A0A] px-4 sm:px-8 md:px-12 py-16 md:py-24">
      <div className="max-w-6xl mx-auto rounded-[1.75rem] md:rounded-[2.5rem] bg-white/75 px-7 sm:px-10 md:px-16 py-16 md:py-24 shadow-[0_50px_120px_-45px_rgba(0,0,0,0.55),0_18px_44px_-24px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-4">The Journal</p>
            <h2 className="font-display uppercase tracking-tight leading-[0.95]" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              Notes from<br />the studio
            </h2>
          </div>
          <p className="font-editorial italic text-[#0A0A0A]/55 max-w-xs md:text-right" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>
            Thinking out loud on brand, hospitality and not-normal ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {POSTS.map((p) => (
            <article
              key={p.title}
              data-cursor="Read"
              className="group relative bg-[#F3F1EC] border border-[#0A0A0A]/10 rounded-2xl p-8 md:p-10 hover:border-[#0A0A0A] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between text-[9px] tracking-[0.3em] uppercase mb-6">
                <span className="text-[#FF2EC4]">{p.cat}</span>
                <span className="text-[#0A0A0A]/40">{p.date}</span>
              </div>
              <h3 className="font-editorial leading-tight mb-4" style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)" }}>{p.title}</h3>
              <p className="text-[13px] md:text-[14px] leading-relaxed text-[#0A0A0A]/60 mb-8 max-w-sm">{p.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase">
                  Read article
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#0A0A0A]/35">{p.read}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
