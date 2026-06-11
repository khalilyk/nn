import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "The Menu · Not Normal",
  description: "The Amuse-Bouché, Appetisers, Mains and Desserts — everything Not Normal brings to the table.",
};

const stroke: React.CSSProperties = { fill: "none", stroke: "#0A0A0A", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };

/* little hand-drawn doodles */
const Cutlery = () => (
  <svg viewBox="0 0 70 90" className="w-full h-full" style={stroke}>
    <path d="M14 14c0 10-3 12-3 18s3 6 3 12-1 30-1 30" />
    <path d="M22 14c0 10 3 12 3 18s-3 6-3 12 1 30 1 30" />
    <path d="M18 14v22" />
    <path d="M44 14c-6 2-9 9-9 18s3 12 9 13c0 6-1 29-1 29" />
    <path d="M58 14c-4 0-7 4-7 14s7 12 7 12-1 28-1 30" />
  </svg>
);
const Grapes = () => (
  <svg viewBox="0 0 60 70" className="w-full h-full" style={stroke}>
    <path d="M30 8c4-3 9-3 12-1" />
    <circle cx="24" cy="22" r="6" /><circle cx="36" cy="22" r="6" />
    <circle cx="18" cy="33" r="6" /><circle cx="30" cy="33" r="6" /><circle cx="42" cy="33" r="6" />
    <circle cx="24" cy="44" r="6" /><circle cx="36" cy="44" r="6" />
    <circle cx="30" cy="55" r="6" />
  </svg>
);
const Cheese = () => (
  <svg viewBox="0 0 80 60" className="w-full h-full" style={stroke}>
    <path d="M6 44L66 14l8 6-8 30z" />
    <circle cx="30" cy="34" r="2.5" /><circle cx="46" cy="30" r="2.5" /><circle cx="40" cy="40" r="2" />
  </svg>
);
const Bread = () => (
  <svg viewBox="0 0 90 40" className="w-full h-full" style={stroke}>
    <path d="M6 32c0-16 18-22 39-22s39 6 39 22z" />
    <path d="M30 16l-5 10M46 14l-5 12M62 16l-5 10" />
  </svg>
);

const head = "font-permanent leading-tight text-[#0A0A0A]";
const list = "font-typewriter mt-4 space-y-1.5 text-[#0A0A0A]/80";
const listSize = { fontSize: "clamp(0.75rem, 1.15vw, 0.85rem)" };

const COURSES = [
  {
    cat: "The Amuse-Bouché", title: "Branding & Identity", rot: -1, paper: -2.2,
    desc: "A brand isn’t just a name or a logo — it’s the foundation of everything. We craft powerful, distinct identities that connect with audiences, from defining your mission and values to designing visual and verbal identities that bring your brand to life. Whether launching from scratch or refining an existing brand, we make sure you stand out and stay memorable.",
    items: ["Naming & Tagline Development", "Logo & Brand Identity", "Brand Strategy & Positioning", "Verbal & Visual Identity"],
  },
  {
    cat: "The Appetisers", title: "Social & Storytelling", rot: 2, paper: 1.8,
    desc: "Great hospitality brands don’t just sell — they tell stories. We create engaging content, from stunning visuals to scroll-stopping social media and dynamic campaigns that connect with your audience. Through creative strategy, photo and video production, and brand messaging, we turn your vision into compelling narratives that people remember.",
    items: ["Public Relations (PR)", "Social Media Strategy", "Photography & Videography", "Campaign Ideation & Execution", "Creative Messaging", "Influencer & Ambassador Marketing"],
  },
  {
    cat: "The Mains", title: "Experience & Innovation", rot: -2, paper: 2.4,
    desc: "Beyond branding, we perfect the experience. From menu research and development to hospitality staff training, we help shape every touchpoint of the guest journey. Whether refining service standards, testing new concepts, or enhancing the overall experience, we create hospitality moments that leave a lasting impression.",
    items: ["Menu Research & Development", "Hospitality Staff Training", "Service Enhancement", "Concept Testing & Refinement"],
  },
  {
    cat: "The Desserts", title: "Visual Production", rot: 1, paper: -1.6,
    desc: "A brand isn’t just an idea — it needs to be seen, felt, and experienced. We translate strategy into reality with striking design, print, and digital execution. From food packaging, signage, and uniforms to website design and immersive event branding, we ensure every detail aligns with your identity, making your brand unmistakable in every space it lives.",
    items: ["Signage & Environmental Branding", "Print & Packaging Design", "Website Design & Development", "Uniform Design & Manufacture"],
  },
];

const DOODLES = [Cutlery, Grapes, Cheese, Bread];

export default function MenuPage() {
  return (
    <main className="relative bg-[#E7E4DD] text-[#0A0A0A] overflow-hidden">
      <Cursor />
      <SiteNav />

      {/* HEADER */}
      <header className="px-6 pt-36 md:pt-44 pb-10 md:pb-14 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#0A0A0A]/45 mb-5">Pull up a chair</p>
        <h1 className="font-display uppercase leading-[0.9] tracking-tight" style={{ fontSize: "clamp(2.8rem, 12vw, 8rem)" }}>
          The Menu
        </h1>
        <p className="font-editorial italic mt-5 mx-auto max-w-xl leading-relaxed text-[#0A0A0A]/65" style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}>
          Everything we bring to the table, served across Sydney, Dubai &amp; Beirut.
        </p>
      </header>

      {/* THE PAGES — a sheet per course, scattered & overlapping like real paper */}
      <section className="px-4 sm:px-8 pb-24 md:pb-32 flex justify-center">
        <div className="relative w-full max-w-[1080px]">
          {COURSES.map((c, i) => {
            const right = i % 2 === 1;
            const Doodle = DOODLES[i];
            return (
              <div
                key={c.cat}
                className={`relative w-full max-w-[540px] ${i === 0 ? "" : "-mt-12 md:-mt-20"} ${right ? "ml-auto" : "mr-auto"}`}
                style={{ zIndex: i + 1, transform: `rotate(${c.paper}deg)` }}
              >
                <div
                  className="relative bg-[#EDE7D7] text-[#0A0A0A] px-7 sm:px-10 md:px-12 py-11 md:py-14"
                  style={{ boxShadow: "0 28px 60px -28px rgba(0,0,0,0.45), 0 8px 20px -10px rgba(0,0,0,0.3)" }}
                >
                  <Grain />
                  <div className={`pointer-events-none absolute ${right ? "left-6" : "right-6"} top-6 w-12 md:w-16 opacity-90`} style={{ transform: `rotate(${c.rot * -3}deg)` }}>
                    <Doodle />
                  </div>

                  <p className="font-editorial italic text-[#0A0A0A]/55" style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)" }}>{c.cat}</p>
                  <h2 className={head + " mt-1"} style={{ fontSize: "clamp(1.9rem, 5.5vw, 3rem)", transform: `rotate(${c.rot}deg)` }}>{c.title}</h2>
                  <p className="font-editorial mt-4 leading-relaxed text-[#0A0A0A]/70" style={{ fontSize: "clamp(0.85rem, 1.25vw, 0.95rem)", maxWidth: "42ch" }}>{c.desc}</p>
                  <ul className={list} style={listSize}>
                    {c.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
