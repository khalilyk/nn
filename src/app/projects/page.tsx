import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ParallaxImage from "@/components/ParallaxImage";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "The Work · Not Normal",
  description: "Selected proof — hospitality brands we've built across Sydney, Dubai and Beirut.",
};

const PROJECTS = [
  {
    no: "01",
    name: "3FILS",
    city: "Dubai",
    year: "2023",
    cat: "Branding · Identity · Content",
    desc: "From a bold idea to a dining experience that redefined a category. We built more than a brand — we built obsession.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    no: "02",
    name: "Revolver",
    city: "Sydney",
    year: "2023",
    cat: "Concept · Identity · Space",
    desc: "A neighbourhood bar reimagined as a cultural anchor. Quiet rebellion, designed into every detail.",
    img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=80",
  },
  {
    no: "03",
    name: "Maison Dali",
    city: "Beirut",
    year: "2024",
    cat: "World-building · Art Direction",
    desc: "Surrealism on a plate. A world, not a logo — each touchpoint a different act in the same play.",
    img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    no: "04",
    name: "Oakberry",
    city: "Dubai",
    year: "2024",
    cat: "Visual Direction · Content",
    desc: "Visual direction that turned a healthy habit into a status symbol. Crave-worthy, frame by frame.",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    no: "05",
    name: "Benny's",
    city: "Sydney",
    year: "2025",
    cat: "Concept · Identity · Energy",
    desc: "Concept, identity and energy for a room people don't want to leave. Built to be remembered.",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    no: "06",
    name: "Print Paradise",
    city: "Beirut",
    year: "2025",
    cat: "Editorial · Brand · Experience",
    desc: "Where editorial meets hospitality. A brand that reads like a magazine and tastes like a memory.",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative bg-[#F3F1EC] text-[#0A0A0A] overflow-hidden">
      <Cursor />
      <Grain />
      <SiteNav />

      {/* HEADER */}
      <header className="px-8 md:px-16 pt-36 md:pt-44 pb-12 md:pb-16 max-w-6xl mx-auto">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#0A0A0A]/45 mb-6">Selected proof</p>
        <h1 className="font-display uppercase leading-[0.88] tracking-tight" style={{ fontSize: "clamp(3rem, 13vw, 9rem)" }}>
          The Work
        </h1>
        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="font-editorial leading-[1.5] text-[#0A0A0A]/70 max-w-xl" style={{ fontSize: "clamp(1.05rem, 1.9vw, 1.45rem)" }}>
            A few of the hospitality brands we&apos;ve built to refuse the ordinary — across Sydney, Dubai &amp; Beirut.
          </p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 shrink-0">
            {PROJECTS.length} Projects · 2023&ndash;25
          </p>
        </div>
      </header>

      {/* FULL-WIDTH BAND */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80"
        alt="A table set for guests"
        className="w-full h-[42vh] md:h-[64vh]"
      />

      {/* PROJECT INDEX */}
      <section className="px-8 md:px-16 py-20 md:py-28 max-w-6xl mx-auto space-y-24 md:space-y-40">
        {PROJECTS.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={p.no} as="div" delay={0.05} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
              <div className={flip ? "md:order-2" : ""}>
                <ParallaxImage src={p.img} alt={p.name} className="w-full aspect-[4/5]" amount={12} />
              </div>
              <div className={flip ? "md:order-1 md:pr-8" : "md:pl-8"}>
                <span className="font-display text-[#0A0A0A]/25 leading-none block" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>{p.no}</span>
                <h2 className="font-display uppercase leading-[0.9] tracking-tight mt-3" style={{ fontSize: "clamp(2.2rem, 6vw, 4.2rem)" }}>{p.name}</h2>
                <p className="text-[10px] tracking-[0.28em] uppercase text-[#0A0A0A]/50 mt-4">{p.city} · {p.year} — {p.cat}</p>
                <p className="font-editorial leading-[1.5] text-[#0A0A0A]/75 mt-5 max-w-md" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>{p.desc}</p>
                <a
                  href="/contact"
                  data-cursor="Go"
                  className="group inline-flex items-center gap-3 mt-7 text-[10px] tracking-[0.28em] uppercase text-[#0A0A0A]"
                >
                  <span className="relative">
                    Start something like this
                    <span className="absolute left-0 -bottom-1 h-px w-full bg-[#0A0A0A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </a>
              </div>
            </Reveal>
          );
        })}
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
