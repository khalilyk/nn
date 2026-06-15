type Post = {
  cat: string;
  date: string;
  title: string;
  excerpt: string;
  read: string;
  bg: string;
  ink: string;
  accent: string;
  rotate: string;
  variant: "type" | "repeat" | "solid";
};

const POSTS: Post[] = [
  {
    cat: "Branding",
    date: "May 2026",
    title: "Why Nobody Remembers Normal",
    excerpt: "The case for building brands with staying power instead of chasing the trend.",
    read: "5 min read",
    bg: "#D8F24A",
    ink: "#0A0A0A",
    accent: "#0A0A0A",
    rotate: "-2deg",
    variant: "type",
  },
  {
    cat: "Hospitality",
    date: "Apr 2026",
    title: "Menus That Actually Sell",
    excerpt: "How layout, language and a little psychology turn a menu into a revenue tool.",
    read: "6 min read",
    bg: "#BBD9F2",
    ink: "#0A0A0A",
    accent: "#FF2EC4",
    rotate: "1.5deg",
    variant: "solid",
  },
  {
    cat: "Experience",
    date: "Mar 2026",
    title: "The First 90 Seconds",
    excerpt: "First impressions in hospitality, and why they quietly decide everything.",
    read: "4 min read",
    bg: "#EFEbe0",
    ink: "#0A0A0A",
    accent: "#0A0A0A",
    rotate: "-1deg",
    variant: "repeat",
  },
  {
    cat: "Content",
    date: "Feb 2026",
    title: "Design For The Photo",
    excerpt: "In the age of social, your venue is competing on camera too.",
    read: "5 min read",
    bg: "#81D742",
    ink: "#0A0A0A",
    accent: "#0A0A0A",
    rotate: "2deg",
    variant: "type",
  },
];

/* Little East-London-style circular badge */
function Badge({ ink }: { ink: string }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border w-9 h-9 text-[11px] font-display tracking-tight" style={{ borderColor: ink, color: ink }}>
      NN
    </span>
  );
}

function Poster({ p }: { p: Post }) {
  return (
    <article
      data-cursor="Read"
      className="group relative origin-center transition-transform duration-300 hover:!rotate-0 hover:-translate-y-2 cursor-pointer"
      style={{ transform: `rotate(${p.rotate})` }}
    >
      <div
        className="relative flex flex-col aspect-[3/4] overflow-hidden p-6 md:p-7 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]"
        style={{ background: p.bg, color: p.ink }}
      >
        {/* paper grain */}
        <span aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        {/* top row */}
        <div className="relative flex items-center justify-between text-[9px] tracking-[0.3em] uppercase">
          <span style={{ color: p.accent }}>{p.cat}</span>
          <span className="opacity-50">{p.date}</span>
        </div>

        {/* centre */}
        <div className="relative flex-1 flex flex-col justify-center py-6">
          {p.variant === "repeat" && (
            <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 font-display uppercase leading-[0.82] opacity-[0.08] select-none" style={{ fontSize: "clamp(3rem, 9vw, 6rem)" }}>
              Wow<br />Wow<br />Wow
            </span>
          )}
          <p className="relative text-[9px] tracking-[0.3em] uppercase opacity-60 mb-3">From the studio</p>
          <h3
            className="relative font-display uppercase tracking-tight leading-[0.9]"
            style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)" }}
          >
            {p.title}
          </h3>
          <p className="relative mt-4 text-[12px] leading-snug opacity-70 max-w-[26ch]">{p.excerpt}</p>
        </div>

        {/* bottom row */}
        <div className="relative flex items-end justify-between">
          <Badge ink={p.ink} />
          <span className="inline-flex items-center gap-2 text-[9px] tracking-[0.28em] uppercase">
            Read
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}

/* The Journal — a wall of pasted posters, one per article. */
export default function JournalSection() {
  return (
    <section id="journal" className="scroll-mt-20 relative bg-[#1A1714] text-[#F3F1EC] px-6 sm:px-10 md:px-16 py-20 md:py-28 overflow-hidden" data-cursor-color="#F3F1EC">
      {/* faint brick wall texture */}
      <span aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='b'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.04' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23b)'/%3E%3C/svg%3E\")" }} />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14 md:mb-20">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]/45 mb-4">The Journal</p>
            <h2 className="font-display uppercase tracking-tight leading-[0.92]" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              Notes from<br />the studio
            </h2>
          </div>
          <p className="font-editorial italic text-[#F3F1EC]/55 max-w-xs md:text-right" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>
            Pasted up like posters. Thinking out loud on brand, hospitality and not-normal ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-8">
          {POSTS.map((p) => (
            <Poster key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
