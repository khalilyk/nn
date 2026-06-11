import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "The Menu · Not Normal",
  description: "The Amuse-Bouché, Appetisers, Mains and Desserts — everything Not Normal brings to the table.",
};

/* Course content — kept for rebuilding the body. */
export const COURSES = [
  {
    cat: "The Amuse-Bouché", title: "Branding & Identity",
    desc: "A brand isn’t just a name or a logo — it’s the foundation of everything. We craft powerful, distinct identities that connect with audiences, from defining your mission and values to designing visual and verbal identities that bring your brand to life. Whether launching from scratch or refining an existing brand, we make sure you stand out and stay memorable.",
    items: ["Naming & Tagline Development", "Logo & Brand Identity", "Brand Strategy & Positioning", "Verbal & Visual Identity"],
  },
  {
    cat: "The Appetisers", title: "Social & Storytelling",
    desc: "Great hospitality brands don’t just sell — they tell stories. We create engaging content, from stunning visuals to scroll-stopping social media and dynamic campaigns that connect with your audience. Through creative strategy, photo and video production, and brand messaging, we turn your vision into compelling narratives that people remember.",
    items: ["Public Relations (PR)", "Social Media Strategy", "Photography & Videography", "Campaign Ideation & Execution", "Creative Messaging", "Influencer & Ambassador Marketing"],
  },
  {
    cat: "The Mains", title: "Experience & Innovation",
    desc: "Beyond branding, we perfect the experience. From menu research and development to hospitality staff training, we help shape every touchpoint of the guest journey. Whether refining service standards, testing new concepts, or enhancing the overall experience, we create hospitality moments that leave a lasting impression.",
    items: ["Menu Research & Development", "Hospitality Staff Training", "Service Enhancement", "Concept Testing & Refinement"],
  },
  {
    cat: "The Desserts", title: "Visual Production",
    desc: "A brand isn’t just an idea — it needs to be seen, felt, and experienced. We translate strategy into reality with striking design, print, and digital execution. From food packaging, signage, and uniforms to website design and immersive event branding, we ensure every detail aligns with your identity, making your brand unmistakable in every space it lives.",
    items: ["Signage & Environmental Branding", "Print & Packaging Design", "Website Design & Development", "Uniform Design & Manufacture"],
  },
];




/* tunable paper-fibre texture (riso/letterpress grain) */
function PaperTex({ seed = 1, opacity = 0.5, freq = "0.7 0.8", blend = "multiply" as React.CSSProperties["mixBlendMode"] }) {
  const id = `paper-${seed}`;
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 w-full h-full" style={{ opacity, mixBlendMode: blend }} preserveAspectRatio="none">
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="3" seed={seed} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

/* arched section heading (SVG textPath) */
function ArcText({ text, up = true }: { text: string; up?: boolean }) {
  const id = "arc-" + text.replace(/[^a-z]/gi, "").toLowerCase();
  const d = up ? "M6,56 Q200,6 394,56" : "M6,16 Q200,66 394,16";
  return (
    <svg viewBox="0 0 400 66" className="w-full max-w-[280px] mx-auto h-12 md:h-14 overflow-visible" aria-label={text}>
      <path id={id} d={d} fill="none" />
      <text className="font-sans" style={{ fontWeight: 600, fontSize: 24, letterSpacing: 5, fill: "#0A0A0A" }}>
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">{text}</textPath>
      </text>
    </svg>
  );
}

/* full-width stretched letter band (each letter repeated, spread edge to edge) */
function StretchRow({ word, reps = 4 }: { word: string; reps?: number }) {
  const letters = word.toUpperCase().split("").flatMap((c) => Array(reps).fill(c) as string[]);
  return (
    <div className="flex justify-between font-sans font-semibold text-[#0A0A0A] select-none overflow-hidden" style={{ fontSize: "clamp(0.65rem, 1.5vw, 0.95rem)" }}>
      {letters.map((c, i) => <span key={i}>{c}</span>)}
    </div>
  );
}

function MenuList({ items }: { items: [string, string][] }) {
  return (
    <div className="font-sans mt-3">
      {items.map(([name, no]) => (
        <div key={no} className="flex items-baseline justify-between gap-3 py-[0.3rem]" style={{ fontSize: "clamp(0.78rem, 1.5vw, 0.95rem)" }}>
          <span>{name}</span>
          <span className="tabular-nums">{no}</span>
        </div>
      ))}
    </div>
  );
}

/* faded circular library-style ink stamp */
function Stamp() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 md:w-64 md:h-64 opacity-[0.16] mix-blend-multiply" style={{ color: "#2b5a86", transform: "translate(-50%,-50%) rotate(-7deg)" }}>
      <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="76" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path id="stamp-top" d="M36,100 A64,64 0 0,1 164,100" fill="none" />
      <path id="stamp-bot" d="M164,100 A64,64 0 0,0 36,100" fill="none" />
      <text fill="currentColor" className="font-classic" style={{ fontSize: 12.5, letterSpacing: 3 }}>
        <textPath href="#stamp-top" startOffset="50%" textAnchor="middle">NOT NORMAL · STUDIO</textPath>
      </text>
      <text fill="currentColor" className="font-classic" style={{ fontSize: 12.5, letterSpacing: 3 }}>
        <textPath href="#stamp-bot" startOffset="50%" textAnchor="middle">SOCIAL · STORYTELLING</textPath>
      </text>
      <text x="100" y="92" textAnchor="middle" fill="currentColor" className="font-classic" style={{ fontSize: 10, letterSpacing: 2 }}>EST.</text>
      <text x="100" y="116" textAnchor="middle" fill="currentColor" className="font-classic" style={{ fontSize: 18 }}>✦</text>
    </svg>
  );
}

/* one row of the scattered ledger menu */
function LedgerRow({ l, c, r, rule }: { l?: string; c?: string; r?: string; rule?: boolean }) {
  return (
    <div className="grid grid-cols-3 items-baseline gap-x-3 py-2">
      <span className="text-left">{l}</span>
      <span className="text-center">
        {c}
        {rule && <span className="block mx-auto mt-2 w-14 border-t border-[#26415a]/55" />}
      </span>
      <span className="text-right">{r}</span>
    </div>
  );
}

export default function MenuPage() {
  return (
    <main className="relative bg-[#E7E4DD] text-[#0A0A0A] overflow-hidden">
      <Cursor />
      <SiteNav />

      {/* HEADER */}
      <header className="bg-white px-6 pt-36 md:pt-44 pb-10 md:pb-14 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#0A0A0A]/45 mb-5">Pull up a chair</p>
        <h1 className="font-display uppercase leading-[0.9] tracking-tight mx-auto max-w-[14ch]" style={{ fontSize: "clamp(2.4rem, 9vw, 6.5rem)" }}>
          It&apos;s how you make them feel
        </h1>
        <p className="font-editorial italic mt-6 mx-auto max-w-xl leading-relaxed text-[#0A0A0A]/65" style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}>
          Everything we bring to the table, served across Sydney, Dubai &amp; Beirut.
        </p>
      </header>

      {/* ── THE AMUSE-BOUCHÉ — yellow drinks-menu ── */}
      <section className="relative bg-[#ecec3a] text-[#0A0A0A] overflow-hidden px-5 md:px-8 py-14 md:py-20">
        <PaperTex seed={3} opacity={0.16} freq="0.6 0.7" />
        <div className="relative mx-auto max-w-5xl">
          <p className="font-sans uppercase text-center tracking-[0.22em] mb-6" style={{ fontSize: "clamp(0.62rem, 1.3vw, 0.8rem)" }}>
            The Amuse-Bouché — Branding &amp; Identity — No. I
          </p>

          <div className="grid md:grid-cols-2 gap-x-8 md:gap-x-16 md:divide-x divide-[#0A0A0A]/40">
            {/* LEFT */}
            <div className="md:pr-10">
              <StretchRow word="Not Normal" />
              <div className="mt-10">
                <ArcText text="STRATEGY" />
                <MenuList items={[
                  ["Brand Strategy & Positioning", "01"],
                  ["Mission, Vision & Values", "02"],
                  ["Audience & Market Research", "03"],
                  ["Competitive Audit", "04"],
                ]} />
              </div>
              <div className="mt-10">
                <ArcText text="NAMING" up={false} />
                <MenuList items={[
                  ["Naming & Tagline Development", "05"],
                  ["Messaging Framework", "06"],
                  ["Tone Of Voice", "07"],
                ]} />
              </div>
            </div>

            {/* RIGHT */}
            <div className="md:pl-10 mt-12 md:mt-0">
              <StretchRow word="Not Normal" />
              <div className="mt-10">
                <ArcText text="IDENTITY" />
                <MenuList items={[
                  ["Logo & Brand Identity", "08"],
                  ["Colour & Type System", "09"],
                  ["Art Direction", "10"],
                  ["Iconography & Motifs", "11"],
                ]} />
              </div>
              <div className="mt-10">
                <ArcText text="TOOLKIT" up={false} />
                <MenuList items={[
                  ["Verbal & Visual Identity", "12"],
                  ["Brand Guidelines", "13"],
                  ["Templates & Collateral", "14"],
                  ["Brand Book", "15"],
                ]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE APPETISERS — 1909 ledger menu ── */}
      <section
        className="relative text-[#1a2330] overflow-hidden px-6 py-16 md:py-24 font-classic"
        style={{
          backgroundColor: "#f4efdf",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 29px, rgba(86,134,170,0.32) 29px 30px), repeating-linear-gradient(90deg, transparent 0 79px, rgba(86,134,170,0.26) 79px 80px)",
        }}
      >
        <PaperTex seed={5} opacity={0.22} freq="0.7 0.8" />
        <div className="relative mx-auto max-w-3xl">
          {/* masthead */}
          <div className="relative">
            <p className="absolute left-0 top-2" style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.3rem)" }}>The Appetisers</p>
            <p className="absolute right-0 -top-2 font-bold" style={{ fontSize: "clamp(1.8rem, 6vw, 3.2rem)" }}>No. II</p>
            <div className="text-center pt-16 md:pt-10">
              <p className="uppercase tracking-[0.25em]" style={{ fontSize: "clamp(1.3rem, 4vw, 2.4rem)" }}>Social</p>
              <p className="italic my-1" style={{ fontSize: "clamp(0.95rem, 2vw, 1.2rem)" }}>&amp;</p>
              <p className="uppercase tracking-[0.25em]" style={{ fontSize: "clamp(1.3rem, 4vw, 2.4rem)" }}>Storytelling</p>
            </div>
          </div>

          {/* scattered ledger courses */}
          <div className="relative mt-12 md:mt-16" style={{ fontSize: "clamp(0.82rem, 1.7vw, 1.05rem)" }}>
            <Stamp />
            <div className="relative">
              <LedgerRow c="Brand Storytelling" rule />
              <LedgerRow l="Media Relations" r="Press & Launches" />
              <LedgerRow c="Public Relations" rule />
              <LedgerRow l="Newsroom & Comms" r="Crisis Handling" />
              <LedgerRow c="Social Media & Content" rule />
              <LedgerRow l="Channel Strategy" r="Community Management" />
              <LedgerRow l="Content Calendars" r="Always-On Content" />
              <LedgerRow c="Photography & Film" rule />
              <LedgerRow l="Art Direction" r="Production" />
              <LedgerRow l="Reels & Shorts" r="Brand Films" />
              <LedgerRow c="Campaign Ideation & Execution" rule />
              <LedgerRow l="Seasonal Pushes" r="Activations" />
              <LedgerRow l="Paid & Organic" r="Always-On" />
              <LedgerRow c="Creative Messaging" rule />
              <LedgerRow l="Tone Of Voice" r="Copywriting" />
              <LedgerRow c="Influencer & Ambassador Marketing" rule />
              <LedgerRow l="Partnerships" r="Seeding" />
              <LedgerRow c="People Remember The Story" />
            </div>
          </div>
        </div>
      </section>

      {/* ── THE MAINS — handwritten kraft bistro menu ── */}
      <section className="relative bg-[#f1ede2] text-[#1b1a14] overflow-hidden px-6 py-20 md:py-28">
        <PaperTex seed={7} opacity={0.35} freq="0.5 0.6" />
        <Grain />
        <div className="relative mx-auto max-w-4xl">
          {/* masthead */}
          <div className="grid grid-cols-3 items-start gap-2">
            <div className="font-editorial uppercase leading-tight">
              <p style={{ fontSize: "clamp(0.8rem, 1.8vw, 1.05rem)", letterSpacing: "0.08em" }}>The Mains</p>
              <p className="text-[#1b1a14]/55" style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)", letterSpacing: "0.12em" }}>No. III</p>
            </div>
            <h2 className="font-editorial uppercase text-center leading-[0.92]" style={{ fontSize: "clamp(1.9rem, 7vw, 4.4rem)" }}>
              Experience<br className="hidden sm:block" /> &amp; Innovation
            </h2>
            <div className="font-editorial uppercase text-right leading-tight">
              <p style={{ fontSize: "clamp(0.8rem, 1.8vw, 1.05rem)", letterSpacing: "0.08em" }}>Not Normal</p>
              <p className="text-[#1b1a14]/55" style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)", letterSpacing: "0.12em" }}>Syd · Dxb · Bey</p>
            </div>
          </div>

          {/* items */}
          <div className="mt-16 md:mt-24 font-spacemono uppercase" style={{ fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)", letterSpacing: "0.03em" }}>
            {[
              [
                ["Menu Research & Development, Seasonal Tasting", "01"],
                ["Recipe Refinement, Costing, Supplier Sourcing", "02"],
                ["Concept Testing, Trialled & Honed", "03"],
              ],
              [
                ["Hospitality Staff Training, Hosting, Care", "04"],
                ["Service Standards, Sequence Of Service", "05"],
                ["Service Enhancement, Every Guest Touchpoint", "06"],
              ],
              [
                ["Guest Journey Mapping, First Hello To Last Bite", "07"],
                ["Ambience, Pacing & Memorable Moments", "08"],
              ],
            ].map((group, gi) => (
              <div key={gi} className={gi === 0 ? "" : "mt-10"}>
                {group.map(([name, no]) => (
                  <div key={no} className="flex items-baseline justify-between gap-6 py-[0.55rem]">
                    <span>{name}</span>
                    <span className="text-[#1b1a14]/60 tabular-nums">{no}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE DESSERTS — B&W photocopy zine ── */}
      <section className="bg-[#0A0A0A] text-[#0A0A0A] px-3 py-3 md:px-5 md:py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          {/* left: halftone image panel */}
          <div className="relative bg-[#b8b6ad] overflow-hidden flex flex-col justify-between p-6 md:p-8 min-h-[60vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity"
              style={{ filter: "grayscale(1) contrast(1.45) brightness(1.5)" }}
            />
            <div className="absolute inset-0 bg-[#cdcbc1]/35 pointer-events-none" />
            {/* halftone dots */}
            <div
              className="absolute inset-0 mix-blend-multiply opacity-50 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1.5px)", backgroundSize: "4px 4px" }}
            />
            <p className="font-spacemono uppercase tracking-[0.25em] text-[#15140f] relative z-10" style={{ fontSize: "clamp(0.7rem, 1.6vw, 0.95rem)" }}>The Desserts · No. IV</p>
            <p className="font-spacemono font-bold uppercase tracking-[0.12em] text-[#15140f] relative z-10 leading-[0.95]" style={{ fontSize: "clamp(2rem, 6vw, 3.6rem)" }}>Visual<br />Production</p>
          </div>

          {/* right: monospace menu */}
          <div className="relative bg-[#f4f3ee] px-6 py-7 md:px-9 md:py-9 font-spacemono text-[#15140f] flex flex-col">
            <PaperTex seed={9} opacity={0.5} freq="0.9 0.95" />
            {[
              { t: "Signage & Environmental Branding", d: "wayfinding, facades, immersive event branding + spatial identity" },
              { t: "Print & Packaging Design", d: "menus, food packaging, collateral + finishing" },
              { t: "Website Design & Development", d: "design systems, build, content + launch" },
              { t: "Uniform Design & Manufacture", d: "garment design, sampling + production" },
            ].map((d) => (
              <div key={d.t} className="border-b border-[#15140f]/30 py-4 first:pt-0">
                <p className="font-bold uppercase leading-tight" style={{ fontSize: "clamp(0.95rem, 2.1vw, 1.25rem)" }}>{d.t}</p>
                <p className="uppercase mt-1.5 text-[#15140f]/70 leading-snug" style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.72rem)" }}>{d.d}</p>
              </div>
            ))}
            <p className="font-bold uppercase tracking-[0.3em] text-center mt-auto pt-8" style={{ fontSize: "clamp(1.3rem, 4vw, 2.2rem)" }}>4 of 4</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
