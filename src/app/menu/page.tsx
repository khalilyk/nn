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

      {/* ── THE AMUSE-BOUCHÉ — UL&CO. gridded board ── */}
      <section className="relative bg-[#f5e53c] text-[#1a1605] overflow-hidden px-4 md:px-8 py-12 md:py-16">
        <PaperTex seed={3} opacity={0.14} freq="0.55 0.65" />
        <div className="relative mx-auto max-w-6xl">
          {/* masthead */}
          <div className="flex items-end justify-between gap-3 pb-4">
            <p className="font-sans font-semibold uppercase tracking-wide max-w-[7rem] leading-tight" style={{ fontSize: "clamp(0.5rem, 1vw, 0.72rem)" }}>Not Normal · Branding &amp; Identity</p>
            <p className="font-slab font-bold leading-none" style={{ fontSize: "clamp(1.8rem, 6vw, 3.6rem)" }}>NN&amp;CO.</p>
            <p className="font-classic italic text-right leading-tight" style={{ fontSize: "clamp(0.5rem, 1vw, 0.72rem)" }}>
              Syd · Dxb · Bey <span className="font-slab not-italic font-bold ml-1" style={{ fontSize: "1.7em" }}>№ I</span>
            </p>
          </div>

          {/* categories */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 border-y-2 border-[#1a1605] divide-x divide-[#1a1605]/60">
            {[
              ["Naming", "Names, taglines & verbal DNA", "01"],
              ["Logo", "Primary marks & lockups", "02"],
              ["Strategy", "Positioning & narrative", "03"],
              ["Identity", "Type, colour & art direction", "04"],
              ["Guidelines", "Brand books & rules", "05"],
              ["Messaging", "Voice, tone & copy", "06"],
              ["Research", "Audience & market", "07"],
            ].map(([n, d, no]) => (
              <div key={no} className="px-3 py-3 text-center">
                <p className="font-slab font-bold uppercase leading-tight" style={{ fontSize: "clamp(0.72rem, 1.3vw, 0.95rem)" }}>{n}</p>
                <p className="font-sans mt-1 leading-snug" style={{ fontSize: "clamp(0.52rem, 0.95vw, 0.68rem)" }}>{d}</p>
                <p className="font-slab font-bold mt-2" style={{ fontSize: "clamp(0.85rem, 1.7vw, 1.2rem)" }}>{no}</p>
              </div>
            ))}
          </div>

          {/* main area */}
          <div className="grid lg:grid-cols-[auto_1fr_13rem] border-b-2 border-[#1a1605]">
            {/* mascot + rotated tagline */}
            <div className="hidden lg:flex flex-col items-center justify-between py-5 pr-4 border-r-2 border-[#1a1605]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/nn-panda.png" alt="" className="w-14 h-14 object-contain" />
              <p className="font-classic italic" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)" }}>
                Stand out and stay memorable.
              </p>
            </div>

            {/* main list */}
            <div className="px-1 lg:px-6 py-5 space-y-1.5">
              {[
                ["Brand Strategy", "Positioning, narrative, mission, vision & values", "01"],
                ["Naming & Tagline", "Naming systems, taglines & verbal identity", "02"],
                ["Logo & Identity", "Primary marks, lockups, sub-brands & usage", "03"],
                ["Visual System", "Colour, type, grid, art direction & iconography", "04"],
                ["Verbal Identity", "Tone of voice, messaging framework & copy", "05"],
                ["Brand Guidelines", "Comprehensive brand book & governance", "06"],
                ["Templates & Collateral", "Stationery, decks, social & print kits", "07"],
                ["Launch Toolkit", "Rollout assets, training & brand handover", "08"],
              ].map(([n, d, no]) => (
                <div key={no} className="flex items-baseline gap-2">
                  <span className="font-slab font-bold uppercase whitespace-nowrap" style={{ fontSize: "clamp(1rem, 2.2vw, 1.6rem)" }}>{n}</span>
                  <span className="font-sans uppercase leading-tight hidden md:block flex-shrink" style={{ fontSize: "clamp(0.5rem, 0.9vw, 0.64rem)" }}>{d}</span>
                  <span className="flex-1 border-b-2 border-dotted border-[#1a1605]/45" style={{ transform: "translateY(-0.3em)" }} />
                  <span className="font-slab font-bold" style={{ fontSize: "clamp(0.95rem, 1.9vw, 1.35rem)" }}>{no}</span>
                </div>
              ))}
            </div>

            {/* extras column */}
            <div className="px-1 lg:px-6 py-5 border-t-2 lg:border-t-0 lg:border-l-2 border-[#1a1605] space-y-5 font-sans">
              <div>
                <p className="font-slab font-bold uppercase" style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" }}>Workshops</p>
                <p className="leading-tight mt-1" style={{ fontSize: "clamp(0.6rem, 1.1vw, 0.75rem)" }}>Half Day<span className="float-right font-bold">1</span></p>
                <p className="leading-tight" style={{ fontSize: "clamp(0.6rem, 1.1vw, 0.75rem)" }}>Full Day<span className="float-right font-bold">2</span></p>
              </div>
              <div>
                <p className="font-slab font-bold uppercase" style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}>Brand Audit</p>
                <p className="leading-tight mt-1" style={{ fontSize: "clamp(0.6rem, 1.1vw, 0.72rem)" }}>Strategy, identity &amp; touchpoints. Add report +1</p>
              </div>
              <div>
                <p className="font-slab font-bold uppercase" style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}>Refresh</p>
                <p className="leading-tight mt-1" style={{ fontSize: "clamp(0.6rem, 1.1vw, 0.72rem)" }}>Evolve an existing brand</p>
              </div>
            </div>
          </div>

          {/* packages + sides */}
          <div className="grid sm:grid-cols-2 border-b-2 border-[#1a1605] divide-y sm:divide-y-0 sm:divide-x divide-[#1a1605]">
            <div className="px-1 sm:px-5 py-5">
              <p className="font-slab font-bold uppercase" style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.5rem)" }}>Packages <span className="font-sans normal-case font-normal" style={{ fontSize: "0.5em" }}>— scoped to your stage</span></p>
              <div className="mt-3 space-y-3 font-sans">
                {[
                  ["Starter Board", "Logo, palette, type & one-page guide", "A"],
                  ["Identity Board", "Full visual & verbal identity system", "B"],
                  ["Combo Board", "Strategy, identity & launch toolkit", "AB"],
                ].map(([n, d, t]) => (
                  <div key={t}>
                    <p className="font-slab font-bold uppercase" style={{ fontSize: "clamp(0.8rem, 1.5vw, 1rem)" }}>{n}<span className="float-right">{t}</span></p>
                    <p className="leading-tight" style={{ fontSize: "clamp(0.58rem, 1vw, 0.7rem)" }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-1 sm:px-5 py-5">
              <p className="font-slab font-bold uppercase" style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.5rem)" }}>Add-Ons</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-3 font-sans" style={{ fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)" }}>
                {["Stationery", "Social Kit", "Iconography", "Templates", "Signage", "Merch", "Packaging", "Motion"].map((s) => (
                  <p key={s}>{s}</p>
                ))}
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="flex items-center justify-between gap-4 pt-4">
            <p className="font-sans font-bold uppercase" style={{ fontSize: "clamp(0.8rem, 2.3vw, 1.5rem)" }}>Strategy — Design — Delivered In House</p>
            <p className="font-classic text-right" style={{ fontSize: "clamp(0.5rem, 1vw, 0.72rem)" }}>Property of <span className="font-bold">Not Normal Studio</span></p>
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
              <p className="uppercase mt-1" style={{ fontSize: "clamp(0.55rem, 1.3vw, 0.8rem)", letterSpacing: "0.35em" }}>Social &amp; Storytelling</p>
            </div>
            <div className="text-right">
              <span className="inline-block border-2 border-current px-2 py-1 uppercase font-display tracking-wide" style={{ fontSize: "clamp(0.5rem, 1.1vw, 0.65rem)" }}>Served Daily</span>
              <p className="font-display mt-2" style={{ fontSize: "clamp(0.75rem, 1.7vw, 1.05rem)" }}><span className="text-[0.65em] align-middle mr-1">NO.</span>II</p>
            </div>
          </div>

          {/* EARNED —— OWNED */}
          <div className="flex items-center gap-4 mt-10 font-display uppercase" style={{ fontSize: "clamp(1rem, 2.6vw, 1.6rem)" }}>
            <span>Earned</span>
            <span className="flex-1 h-[3px] bg-current" />
            <span>Owned</span>
          </div>

          {/* hero item */}
          <h2 className="font-display uppercase leading-[0.85] mt-8" style={{ fontSize: "clamp(2.3rem, 9vw, 5rem)" }}>
            Public Relations.<span className="ml-2 align-top" style={{ fontSize: "0.3em" }}>01</span>
          </h2>

          {/* split items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-0 mt-8 items-center">
            <div className="text-center sm:pr-8 sm:border-r-2 sm:border-current font-display uppercase leading-[0.9]" style={{ fontSize: "clamp(1.3rem, 4vw, 2rem)" }}>
              Social Media<br />Strategy <span className="align-top" style={{ fontSize: "0.45em" }}>02</span>
            </div>
            <div className="sm:pl-8 font-display uppercase leading-[0.9] space-y-3" style={{ fontSize: "clamp(1.5rem, 4.6vw, 2.4rem)" }}>
              <p>Photography &amp; Film <span className="align-top" style={{ fontSize: "0.4em" }}>03</span></p>
              <p>Campaigns &amp; Activations <span className="align-top" style={{ fontSize: "0.4em" }}>04</span></p>
            </div>
          </div>

          {/* boxed + script */}
          <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-6 items-center mt-10">
            <div className="border-2 border-current px-5 py-4 text-center leading-none">
              <p>
                <span className="font-classic font-bold" style={{ fontSize: "clamp(1.2rem, 3.6vw, 1.8rem)" }}>BRAND </span>
                <span className="font-display uppercase" style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)" }}>STORYTELLING</span>
              </p>
              <p className="font-classic italic mt-2" style={{ fontSize: "clamp(0.8rem, 1.8vw, 1rem)" }}>
                (Content &amp; Campaigns) <span className="not-italic ml-1">05</span>
              </p>
            </div>
            <div className="text-center">
              <p className="font-classic font-bold leading-none" style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.2rem)" }}>Creative Messaging</p>
              <p className="font-classic mt-1" style={{ fontSize: "clamp(0.9rem, 2vw, 1.15rem)" }}>06</p>
            </div>
          </div>

          {/* sides w/ dotted leaders */}
          <div className="mt-12 font-sans font-medium uppercase space-y-3" style={{ fontSize: "clamp(0.95rem, 2.4vw, 1.4rem)" }}>
            {[
              ["Influencer Marketing", "07"],
              ["Ambassador Programs", "08"],
              ["Community Management", "09"],
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
            <p style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.2rem)" }}>Always-On Content</p>
            <p className="mt-1" style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}>10</p>
          </div>

          {/* bottom rule */}
          <div className="mt-12 border-t-[3px] border-current pt-3 flex justify-between font-display uppercase" style={{ fontSize: "clamp(0.6rem, 1.4vw, 0.85rem)" }}>
            <span>Sydney · Dubai · Beirut</span>
            <span>thisisnn.com</span>
          </div>
          <div className="mt-3 flex justify-center"><ArcText text="SOCIAL · STORY · STUDIO" size={15} spacing={2.5} maxW="380px" /></div>
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
