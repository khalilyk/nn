type Base = {
  cat: string;
  date: string;
  title: string;
  read: string;
  bg: string;
  ink: string;
  rotate: string;
};

type SplitPost = Base & {
  variant: "split";
  top: string;
  bottom: string;
  img: string;
};
type TypePost = Base & {
  variant: "type";
  eyebrow: string;
  lines: string[];
  footer: string;
};
type BlahPost = Base & {
  variant: "blah";
  word: string;
  rows: number;
  line: string;
  img: string;
};

type Post = SplitPost | TypePost | BlahPost;

const POSTS: Post[] = [
  {
    variant: "split",
    cat: "Branding",
    date: "May 2026",
    title: "Why Nobody Remembers Normal",
    read: "5 min read",
    bg: "#BBD9F2",
    ink: "#0A0A0A",
    rotate: "-2deg",
    top: "BRANDS NOT",
    bottom: "BACKGROUND",
    img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80",
  },
  {
    variant: "type",
    cat: "Hospitality",
    date: "Apr 2026",
    title: "Menus That Actually Sell",
    read: "6 min read",
    bg: "#D8F24A",
    ink: "#0A0A0A",
    rotate: "1.5deg",
    eyebrow: "Quality over noise",
    lines: ["MENUS", "THAT MAKE", "MONEY…"],
    footer: "Without the crafty bullshit",
  },
  {
    variant: "blah",
    cat: "Content",
    date: "Mar 2026",
    title: "Say Something Worth Hearing",
    read: "4 min read",
    bg: "#ECE7DA",
    ink: "#0A0A0A",
    rotate: "-1deg",
    word: "BLAH",
    rows: 5,
    line: "Stop sounding like everyone else.",
    img: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=700&q=80",
  },
  {
    variant: "type",
    cat: "Experience",
    date: "Feb 2026",
    title: "The First 90 Seconds",
    read: "5 min read",
    bg: "#81D742",
    ink: "#0A0A0A",
    rotate: "2deg",
    eyebrow: "First impressions",
    lines: ["THE", "FIRST 90", "SECONDS"],
    footer: "Decide everything",
  },
];

function Badge({ ink }: { ink: string }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border w-9 h-9 text-[10px] font-display tracking-tight shrink-0" style={{ borderColor: ink, color: ink }}>
      NN
    </span>
  );
}

function Poster({ p }: { p: Post }) {
  return (
    <article
      data-cursor="Read"
      className="group relative cursor-pointer transition-[transform,z-index] duration-300 hover:z-20 hover:-translate-y-2"
    >
      <div
        className="relative flex flex-col aspect-[3/4] overflow-hidden ring-1 ring-black/20 shadow-[8px_0_24px_-8px_rgba(0,0,0,0.55)]"
        style={{ background: p.bg, color: p.ink }}
      >
        {/* paper grain */}
        <span aria-hidden className="pointer-events-none absolute inset-0 z-20 opacity-[0.07] mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        {/* ── SPLIT: word / image / word ── */}
        {p.variant === "split" && (
          <div className="relative z-10 flex flex-col h-full p-5">
            <h3 className="font-sans font-bold uppercase tracking-tight leading-[0.9]" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)" }}>{p.top}</h3>
            <div className="relative flex-1 my-4 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute left-2 bottom-2"><Badge ink={p.ink} /></span>
            </div>
            <h3 className="font-sans font-bold uppercase tracking-tight leading-[0.9]" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)" }}>{p.bottom}</h3>
          </div>
        )}

        {/* ── TYPE: eyebrow / big slogan / footer ── */}
        {p.variant === "type" && (
          <div className="relative z-10 flex flex-col h-full p-6 text-center">
            <p className="text-[9px] tracking-[0.35em] uppercase opacity-70">{p.eyebrow}</p>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-sans font-bold uppercase tracking-tight leading-[0.95]" style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.6rem)" }}>
                {p.lines.map((l, i) => <span key={i} className="block">{l}</span>)}
              </h3>
            </div>
            <p className="text-[9px] tracking-[0.3em] uppercase opacity-70">{p.footer}</p>
          </div>
        )}

        {/* ── BLAH: repeated word + product image ── */}
        {p.variant === "blah" && (
          <div className="relative z-10 h-full overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-center -ml-2">
              {Array.from({ length: p.rows }).map((_, i) => (
                <span key={i} className="font-sans font-bold uppercase tracking-tight leading-[0.92] whitespace-nowrap" style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)" }}>{p.word}</span>
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt="" className="absolute right-0 bottom-0 h-[78%] w-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)]" />
            <span className="absolute left-4 top-1/2 -translate-y-1/2"><Badge ink={p.ink} /></span>
          </div>
        )}

      </div>
    </article>
  );
}

/* The Journal — a wall of pasted posters, one per article. */
export default function JournalSection() {
  return (
    <section id="journal" className="scroll-mt-20 relative bg-[#1A1714] text-[#F3F1EC] px-6 sm:px-10 md:px-16 py-20 md:py-28 overflow-hidden" data-cursor-color="#F3F1EC">
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
          {POSTS.map((p) => (
            <Poster key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
