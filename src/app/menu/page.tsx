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
        <Grain />
        <div className="relative mx-auto max-w-2xl text-center leading-[1.15]">
          <p className="font-slab font-bold uppercase" style={{ fontSize: "clamp(2.2rem, 7vw, 4rem)", letterSpacing: "0.01em" }}>
            The Amuse-Bouché
          </p>
          <p className="font-editorial italic mt-1" style={{ fontSize: "clamp(1.6rem, 5vw, 2.8rem)" }}>
            Branding &amp; Identity
          </p>
          <p className="font-editorial italic mt-5" style={{ fontSize: "clamp(1rem, 2.2vw, 1.35rem)" }}>
            Course No. <span className="align-super text-[0.7em]">I</span>
          </p>

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
            <p className="font-editorial italic" style={{ fontSize: "clamp(1.2rem, 3.2vw, 1.8rem)" }}>
              Logo &amp; Brand Identity
            </p>
            <p className="font-slab font-semibold uppercase" style={{ fontSize: "clamp(1.15rem, 3vw, 1.7rem)", letterSpacing: "0.02em" }}>
              Brand Strategy &amp; Positioning
            </p>
            <p className="font-editorial italic" style={{ fontSize: "clamp(1.2rem, 3.2vw, 1.8rem)" }}>
              Verbal &amp; Visual Identity
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
