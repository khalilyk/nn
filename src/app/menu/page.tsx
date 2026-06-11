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

const ink: React.CSSProperties = { fill: "none", stroke: "currentColor", strokeWidth: 4, strokeLinecap: "round", strokeLinejoin: "round" };

const Tomato = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" style={ink}>
    <path d="M40 120c-6-30 22-58 60-58s66 26 60 58c-5 28-33 46-60 46s-55-18-60-46z" />
    <path d="M100 62c-4-16-18-26-34-24 6 12 18 20 34 24z" />
    <path d="M100 62c4-16 18-26 34-24-6 12-18 20-34 24z" />
    <path d="M100 38c0-8 4-14 10-18" />
    <path d="M74 100c8-8 18-10 26-6M120 130c-6 6-16 8-24 6" />
  </svg>
);


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

      {/* ── THE AMUSE-BOUCHÉ — vintage slab-serif menu poster ── */}
      <section className="relative bg-[#D9D586] text-[#1c1b0d] overflow-hidden px-6 py-24 md:py-32">
        <PaperTex seed={3} opacity={0.45} freq="0.5 0.65" />
        <Grain />
        <div className="relative mx-auto max-w-2xl text-center leading-[1.05]">
          <p className="font-slab uppercase tracking-[0.12em]" style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)" }}>
            The Amuse-Bouché · No. <span className="align-super text-[0.75em]">I</span>
          </p>
          <h2 className="font-slab font-bold uppercase mt-3 leading-[0.95]" style={{ fontSize: "clamp(2.6rem, 9vw, 5.5rem)", letterSpacing: "0.005em" }}>
            Branding<br />&amp; Identity
          </h2>

          <p className="font-editorial mt-8 mx-auto max-w-md leading-relaxed" style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)" }}>
            A brand isn’t just a name or a logo — it’s the foundation of everything. We craft
            powerful, distinct identities that connect with audiences and make you unmistakable.
          </p>

          {/* central motif */}
          <div
            className="mx-auto my-10 md:my-12 w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden"
            style={{ boxShadow: "0 18px 40px -18px rgba(0,0,0,0.5)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3 md:space-y-4">
            <p className="font-slab font-semibold uppercase" style={{ fontSize: "clamp(1.15rem, 3vw, 1.7rem)", letterSpacing: "0.02em" }}>
              Naming &amp; Tagline Development
            </p>
            <p className="font-dmserif italic" style={{ fontSize: "clamp(1.4rem, 3.6vw, 2rem)" }}>
              Logo &amp; Brand Identity
            </p>
            <p className="font-slab font-semibold uppercase" style={{ fontSize: "clamp(1.15rem, 3vw, 1.7rem)", letterSpacing: "0.02em" }}>
              Brand Strategy &amp; Positioning
            </p>
            <p className="font-dmserif italic" style={{ fontSize: "clamp(1.4rem, 3.6vw, 2rem)" }}>
              Verbal &amp; Visual Identity
            </p>
          </div>
        </div>
      </section>

      {/* ── THE APPETISERS — electric-blue headline + ink scrawl ── */}
      <section className="relative bg-[#efe7d4] text-[#0A0A0A] overflow-hidden px-6 py-20 md:py-28">
        <PaperTex seed={5} opacity={0.5} freq="0.85 0.9" />
        <Grain />
        <div className="pointer-events-none absolute -left-4 bottom-4 w-44 md:w-64 text-[#0A0A0A] opacity-90 -rotate-12">
          <Tomato />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <p className="font-display uppercase tracking-[0.18em] text-[#1f9ee0]" style={{ fontSize: "clamp(0.8rem, 1.8vw, 1rem)" }}>
            The Appetisers · No. II
          </p>
          <h2 className="font-display uppercase leading-[0.8] text-[#1f9ee0] tracking-tight mt-2" style={{ fontSize: "clamp(3rem, 14vw, 8.5rem)" }}>
            Social &amp;<br />Storytelling
          </h2>
          <div className="font-brush text-[#111] mt-8 leading-[1.05]" style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}>
            <p className="-rotate-1">public relations, social</p>
            <p className="rotate-1 mt-2">media &amp; storytelling,</p>
            <p className="-rotate-1 mt-2 md:pl-10">photography &amp; video,</p>
            <p className="rotate-1 mt-2">campaigns that connect</p>
            <p className="-rotate-1 mt-2 md:pl-24">on creative messaging</p>
            <p className="mt-3">
              <span>+ influencer marketing</span>{" "}
              <span className="font-display text-[#1f9ee0] align-middle" style={{ fontSize: "clamp(1.2rem, 3.4vw, 2rem)" }}>+ more</span>
            </p>
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
