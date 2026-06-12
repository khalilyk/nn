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
function ArcText({ text, up = true, size = 24, spacing = 5, maxW = "280px" }: { text: string; up?: boolean; size?: number; spacing?: number; maxW?: string }) {
  const id = "arc-" + text.replace(/[^a-z]/gi, "").toLowerCase();
  const d = up ? "M6,56 Q200,6 394,56" : "M6,16 Q200,66 394,16";
  return (
    <svg viewBox="0 0 400 66" className="w-full mx-auto h-12 md:h-14 overflow-visible" style={{ maxWidth: maxW }} aria-label={text}>
      <path id={id} d={d} fill="none" />
      <text className="font-sans" style={{ fontWeight: 600, fontSize: size, letterSpacing: spacing, fill: "#0A0A0A" }}>
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">{text}</textPath>
      </text>
    </svg>
  );
}

function BarRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="grid grid-cols-[34%_1fr] sm:grid-cols-[30%_1fr] gap-x-5 sm:gap-x-8 items-start">
      <div className="text-right uppercase text-[#a5403f] tracking-[0.1em] leading-snug whitespace-pre-line pt-[0.15em]" style={{ fontSize: "clamp(0.6rem, 1.25vw, 0.82rem)" }}>{label}</div>
      <div className="uppercase tracking-[0.04em] leading-snug" style={{ fontSize: "clamp(0.78rem, 1.7vw, 1.05rem)" }}>
        {items.map((it, i) => <p key={i}>{it}</p>)}
      </div>
    </div>
  );
}

/* scattered coffee drops / splatter */
function CoffeeDrops() {
  const drop = "M30 3 C40 22 49 34 49 47 C49 61 41 71 30 71 C19 71 11 61 11 47 C11 34 20 22 30 3 Z";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ color: "#3a2012" }}>
      <svg viewBox="0 0 60 74" className="absolute right-[7%] top-[8%] w-9 md:w-12 opacity-[0.22] mix-blend-multiply -rotate-12"><path d={drop} fill="currentColor" /></svg>
      <svg viewBox="0 0 60 74" className="absolute right-[14%] top-[14%] w-4 md:w-5 opacity-[0.18] mix-blend-multiply rotate-6"><path d={drop} fill="currentColor" /></svg>
      <svg viewBox="0 0 20 20" className="absolute right-[5%] top-[20%] w-2 opacity-[0.18] mix-blend-multiply"><circle cx="10" cy="10" r="9" fill="currentColor" /></svg>
      <svg viewBox="0 0 60 74" className="absolute left-[6%] bottom-[10%] w-10 md:w-14 opacity-[0.2] mix-blend-multiply rotate-[160deg]"><path d={drop} fill="currentColor" /></svg>
      <svg viewBox="0 0 20 20" className="absolute left-[15%] bottom-[8%] w-2.5 opacity-[0.16] mix-blend-multiply"><circle cx="10" cy="10" r="9" fill="currentColor" /></svg>
      <svg viewBox="0 0 20 20" className="absolute left-[4%] bottom-[22%] w-1.5 opacity-[0.16] mix-blend-multiply"><circle cx="10" cy="10" r="9" fill="currentColor" /></svg>
    </div>
  );
}

/* dried wine-glass ring stain */
function WineRing() {
  return (
    <svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute right-[5%] top-[6%] w-36 md:w-56 opacity-[0.22] mix-blend-multiply rotate-6" style={{ color: "#5e1f2e" }}>
      <circle cx="100" cy="100" r="70" fill="currentColor" opacity="0.07" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="6" opacity="0.45" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8" strokeDasharray="210 50" strokeDashoffset="30" strokeLinecap="round" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeDasharray="120 140" />
    </svg>
  );
}

export default function MenuPage() {
  return (
    <main className="relative bg-[#E7E4DD] text-[#0A0A0A] overflow-hidden">
      <Cursor />
      <SiteNav />

      {/* HEADER */}
      <header className="relative overflow-hidden bg-white px-6 pt-36 md:pt-44 pb-10 md:pb-14 text-center">
        <div aria-hidden className="absolute inset-x-0 top-[30%] z-0 flex justify-center pointer-events-none select-none">
          <span className="font-display uppercase leading-none whitespace-nowrap text-[#0A0A0A]/[0.04]" style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}>
            Not Normal
          </span>
        </div>
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#0A0A0A]/45 mb-5">What we do</p>
          <h1 className="font-display uppercase leading-[0.9] tracking-tight mx-auto max-w-[14ch]" style={{ fontSize: "clamp(2.4rem, 9vw, 6.5rem)" }}>
            It&apos;s how you make them feel
          </h1>
          <p className="font-editorial italic mt-6 mx-auto max-w-xl leading-relaxed text-[#0A0A0A]/65" style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}>
            Everything we bring to the table, served across Sydney, Dubai &amp; Beirut.
          </p>
        </div>
      </header>

      {/* ── THE AMUSE-BOUCHÉ — pink typewriter bar menu ── */}
      <section className="relative bg-[#f09a9c] text-[#1c1012] overflow-hidden px-6 py-16 md:py-24 font-spacemono">
        <PaperTex seed={3} opacity={0.16} freq="0.7 0.8" />
        <CoffeeDrops />
        <div className="relative mx-auto max-w-2xl">
          <p className="uppercase text-center tracking-[0.25em] text-[#a5403f] mb-12" style={{ fontSize: "clamp(0.55rem, 1.2vw, 0.72rem)" }}>
            The Amuse-Bouché · No. I
          </p>

          {/* top group */}
          <div className="space-y-7">
            <BarRow label="Naming" items={["Naming & Tagline Development"]} />
            <BarRow label="Strategy" items={["Brand Strategy & Positioning"]} />
            <BarRow label="Logo" items={["Logo & Identity Design"]} />
            <BarRow label="Visual" items={["Visual Identity Systems"]} />
          </div>

          {/* centrepiece */}
          <div className="text-center my-12 md:my-16">
            <p className="font-fancy leading-[0.8] text-[#1c1012]" style={{ fontSize: "clamp(3.4rem, 16vw, 8rem)" }}>Branding</p>
            <div className="relative inline-block mt-1">
              <p className="uppercase text-[#b03f3e] tracking-[0.3em]" style={{ fontSize: "clamp(0.9rem, 3vw, 1.6rem)" }}>&amp; Identity</p>
              <svg viewBox="0 0 300 24" className="absolute -bottom-3 left-1/4 w-3/4 h-4 overflow-visible" aria-hidden>
                <path d="M6,14 C70,2 150,2 230,12 C250,15 268,12 292,4" fill="none" stroke="#b03f3e" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* bottom group */}
          <div className="space-y-7">
            <BarRow label="Voice" items={["Tone of Voice & Messaging"]} />
            <BarRow label="Guides" items={["Brand Guidelines"]} />
            <BarRow label="Menu" items={["Menu Design"]} />
            <BarRow label="Packaging" items={["Packaging Concepts"]} />
          </div>
        </div>
      </section>

      {/* ── THE APPETISERS — Lewis BBQ poster ── */}
      <section className="relative bg-[#d7e5db] text-[#0e1a12] overflow-hidden px-6 py-14 md:py-20">
        <PaperTex seed={5} opacity={0.16} freq="0.7 0.8" />
        <div className="relative mx-auto max-w-3xl">
          {/* masthead */}
          <div className="grid grid-cols-3 items-start gap-2">
            <p className="font-classic font-bold italic leading-tight" style={{ fontSize: "clamp(0.65rem, 1.5vw, 0.95rem)" }}>
              Nobody<br />remembers<br />normal.
            </p>
            <div className="text-center">
              <p className="font-script leading-[0.9]" style={{ fontSize: "clamp(2.2rem, 9vw, 4.6rem)" }}>Not Normal</p>
              <p className="uppercase mt-1" style={{ fontSize: "clamp(0.55rem, 1.3vw, 0.8rem)", letterSpacing: "0.35em" }}>Web Design &amp; Development</p>
            </div>
            <div className="text-right">
              <span className="inline-block border-2 border-current px-2 py-1 uppercase font-display tracking-wide" style={{ fontSize: "clamp(0.5rem, 1.1vw, 0.65rem)" }}>Served Daily</span>
              <p className="font-display mt-2" style={{ fontSize: "clamp(0.75rem, 1.7vw, 1.05rem)" }}><span className="text-[0.65em] align-middle mr-1">NO.</span>II</p>
            </div>
          </div>

          {/* DESIGN —— BUILD */}
          <div className="flex items-center gap-4 mt-10 font-display uppercase" style={{ fontSize: "clamp(1rem, 2.6vw, 1.6rem)" }}>
            <span>Design</span>
            <span className="flex-1 h-[3px] bg-current" />
            <span>Build</span>
          </div>

          {/* hero item */}
          <h2 className="font-display uppercase leading-[0.85] mt-8" style={{ fontSize: "clamp(2.3rem, 9vw, 5rem)" }}>
            Website Design.<span className="ml-2 align-top" style={{ fontSize: "0.3em" }}>01</span>
          </h2>

          {/* split items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-0 mt-8 items-center">
            <div className="text-center sm:pr-8 sm:border-r-2 sm:border-current font-display uppercase leading-[0.9]" style={{ fontSize: "clamp(1.3rem, 4vw, 2rem)" }}>
              Website<br />Development <span className="align-top" style={{ fontSize: "0.45em" }}>02</span>
            </div>
            <div className="sm:pl-8 font-display uppercase leading-[0.9] space-y-3" style={{ fontSize: "clamp(1.5rem, 4.6vw, 2.4rem)" }}>
              <p>UX &amp; Journey Mapping <span className="align-top" style={{ fontSize: "0.4em" }}>03</span></p>
              <p>Mobile Optimisation <span className="align-top" style={{ fontSize: "0.4em" }}>04</span></p>
            </div>
          </div>

          {/* boxed + script */}
          <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-6 items-center mt-10">
            <div className="border-2 border-current px-5 py-4 text-center leading-none">
              <p>
                <span className="font-classic font-bold" style={{ fontSize: "clamp(1.2rem, 3.6vw, 1.8rem)" }}>BOOKING + </span>
                <span className="font-display uppercase" style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)" }}>RESERVATIONS</span>
              </p>
              <p className="font-classic italic mt-2" style={{ fontSize: "clamp(0.8rem, 1.8vw, 1rem)" }}>
                (Integrations) <span className="not-italic ml-1">05</span>
              </p>
            </div>
            <div className="text-center">
              <p className="font-classic font-bold leading-none" style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.2rem)" }}>E-Commerce</p>
              <p className="font-classic mt-1" style={{ fontSize: "clamp(0.9rem, 2vw, 1.15rem)" }}>06</p>
            </div>
          </div>

          {/* sides w/ dotted leaders */}
          <div className="mt-12 font-sans font-medium uppercase space-y-3" style={{ fontSize: "clamp(0.95rem, 2.4vw, 1.4rem)" }}>
            {[
              ["SEO Foundations", "07"],
              ["Website Management & Updates", "08"],
            ].map(([n, no]) => (
              <div key={no} className="flex items-end">
                <span>{n}</span>
                <span className="flex-1 mx-3 border-b-2 border-dotted border-current/70" style={{ transform: "translateY(-0.35em)" }} />
                <span>{no}</span>
              </div>
            ))}
          </div>

          {/* serif centre */}
          <div className="text-center mt-12 font-classic">
            <p style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.2rem)" }}>Built To Convert</p>
            <p className="mt-1" style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}>—</p>
          </div>

          {/* bottom rule */}
          <div className="mt-12 border-t-[3px] border-current pt-3 flex justify-between font-display uppercase" style={{ fontSize: "clamp(0.6rem, 1.4vw, 0.85rem)" }}>
            <span>Sydney · Dubai · Beirut</span>
            <span>thisisnn.com</span>
          </div>
          <div className="mt-3 flex justify-center"><ArcText text="WEB · DESIGN · STUDIO" size={15} spacing={2.5} maxW="380px" /></div>
        </div>
      </section>

      {/* ── THE MAINS — handwritten kraft bistro menu ── */}
      <section className="relative bg-[#f1ede2] text-[#1b1a14] overflow-hidden px-6 py-20 md:py-28">
        <PaperTex seed={7} opacity={0.35} freq="0.5 0.6" />
        <Grain />
        <WineRing />
        <div className="relative mx-auto max-w-4xl">
          {/* masthead */}
          <div className="flex flex-wrap items-start justify-between gap-y-5 sm:grid sm:grid-cols-3 sm:items-start gap-2">
            <div className="order-1 font-editorial uppercase leading-tight">
              <p style={{ fontSize: "clamp(0.8rem, 1.8vw, 1.05rem)", letterSpacing: "0.08em" }}>The Mains</p>
              <p className="text-[#1b1a14]/55" style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)", letterSpacing: "0.12em" }}>No. III</p>
            </div>
            <h2 className="order-3 sm:order-2 basis-full sm:basis-auto font-editorial uppercase text-center leading-[0.92]" style={{ fontSize: "clamp(2.4rem, 7vw, 4.4rem)" }}>
              Print<br className="hidden sm:block" /> &amp; Production
            </h2>
            <div className="order-2 sm:order-3 font-editorial uppercase text-right leading-tight">
              <p style={{ fontSize: "clamp(0.8rem, 1.8vw, 1.05rem)", letterSpacing: "0.08em" }}>Print Paradise</p>
              <p className="text-[#1b1a14]/55" style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)", letterSpacing: "0.12em" }}>Sister Co.</p>
            </div>
          </div>

          {/* items */}
          <div className="mt-16 md:mt-24 font-spacemono uppercase" style={{ fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)", letterSpacing: "0.03em" }}>
            {[
              [
                ["Signage & Environmental Graphics", "01"],
                ["Packaging Production", "02"],
                ["Menus & Printed Collateral", "03"],
              ],
              [
                ["Uniform Design & Manufacture", "04"],
                ["Promotional Merchandise", "05"],
              ],
              [
                ["Exhibition & Event Displays", "06"],
                ["Large Format Printing", "07"],
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
          <div className="relative bg-[#d9d7cd] overflow-hidden flex flex-col justify-between p-6 md:p-8 min-h-[60vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
              style={{ filter: "grayscale(1) contrast(1.85) brightness(1.32)" }}
            />
            {/* halftone — white dots punched into the shadows (screen) */}
            <div
              className="absolute inset-0 mix-blend-screen pointer-events-none"
              style={{ backgroundImage: "radial-gradient(#fff 0.9px, transparent 1.3px)", backgroundSize: "3px 3px", opacity: 0.6 }}
            />
            {/* fine black grain in the midtones (multiply) */}
            <div
              className="absolute inset-0 mix-blend-multiply pointer-events-none"
              style={{ backgroundImage: "radial-gradient(#000 0.7px, transparent 1.1px)", backgroundSize: "3px 3px", opacity: 0.25 }}
            />
            <p className="self-start bg-[#f4f3ee] px-2.5 py-1 font-spacemono uppercase tracking-[0.25em] text-[#15140f] relative z-10" style={{ fontSize: "clamp(0.7rem, 1.6vw, 0.95rem)" }}>The Desserts · No. IV</p>
            <p className="self-start bg-[#f4f3ee] px-3 py-2 font-spacemono font-bold uppercase tracking-[0.12em] text-[#15140f] relative z-10 leading-[0.95]" style={{ fontSize: "clamp(1.7rem, 5.2vw, 3.1rem)" }}>PR &amp; Brand<br />Visibility</p>
          </div>

          {/* right: monospace menu */}
          <div className="relative bg-[#f4f3ee] px-6 py-7 md:px-9 md:py-9 font-spacemono text-[#15140f] flex flex-col">
            <PaperTex seed={9} opacity={0.5} freq="0.9 0.95" />
            {[
              { t: "Public Relations (PR)", d: "media strategy, positioning + narrative" },
              { t: "Media Outreach & Press Releases", d: "press kits, pitching + coverage" },
              { t: "Launch Strategies & Campaigns", d: "openings, moments + rollouts" },
              { t: "Influencer & Ambassador Partnerships", d: "seeding, partnerships + activations" },
              { t: "Social Media Strategy", d: "channels, planning + always-on" },
              { t: "Content Creation", d: "concepts, copy + creative" },
              { t: "Photography & Videography", d: "food, interiors, reels + brand films" },
              { t: "Community Management", d: "engagement, replies + growth" },
            ].map((d) => (
              <div key={d.t} className="border-b border-[#15140f]/30 py-3 first:pt-0">
                <p className="font-bold uppercase leading-tight" style={{ fontSize: "clamp(0.85rem, 1.9vw, 1.1rem)" }}>{d.t}</p>
                <p className="uppercase mt-1 text-[#15140f]/70 leading-snug" style={{ fontSize: "clamp(0.56rem, 1.05vw, 0.68rem)" }}>{d.d}</p>
              </div>
            ))}
            <p className="font-bold uppercase tracking-[0.3em] text-center mt-auto pt-8" style={{ fontSize: "clamp(1.3rem, 4vw, 2.2rem)" }}>4 of 4</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white text-[#0A0A0A] px-8 md:px-16 py-24 md:py-36 flex flex-col items-center justify-center text-center">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-6">Wanna build something not normal?</p>
        <h2 className="font-editorial leading-[1.1] mb-10 max-w-2xl mx-auto" style={{ fontSize: "clamp(1.8rem, 3.8vw, 3.4rem)" }}>
          We&apos;ll build your brand from the ground up.<span className="italic"> Identity, strategy, story</span>, the whole thing.
        </h2>
        <a data-cursor="Go" className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-[#0A0A0A] px-9 py-4" href="/contact">
          <span className="absolute inset-0 bg-[#0A0A0A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          <span className="relative z-10 text-[10px] tracking-[0.28em] uppercase text-[#0A0A0A] group-hover:text-[#F3F1EC] transition-colors duration-500">Start a project</span>
          <span className="relative z-10 w-7 h-7 rounded-full border border-[#0A0A0A] group-hover:border-[#F3F1EC] flex items-center justify-center overflow-hidden">
            <span className="text-[#0A0A0A] group-hover:text-[#F3F1EC] transition-all duration-500 group-hover:translate-x-5">→</span>
            <span className="absolute text-[#F3F1EC] -translate-x-5 group-hover:translate-x-0 transition-transform duration-500">→</span>
          </span>
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
