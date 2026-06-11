import Link from "next/link";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "The Menu · Not Normal",
  description: "Everything we serve, course by course — branding, storytelling, experience and production for hospitality.",
};

const COURSES = [
  {
    no: "I",
    course: "Amuse-Bouche",
    title: "Brand Foundations",
    desc: "A brand isn't just a name or a logo, it's the foundation of everything. We craft distinct identities that connect.",
    items: ["Brand strategy", "Positioning", "Naming", "Brand story", "Vision & values", "Customer personas"],
  },
  {
    no: "II",
    course: "Appetisers",
    title: "Identity & Storytelling",
    desc: "Great hospitality brands don't just sell, they tell stories worth sharing — across every visual and verbal touchpoint.",
    items: ["Logo design", "Visual identity", "Brand guidelines", "Typography", "Social content", "Copywriting"],
  },
  {
    no: "III",
    course: "Mains",
    title: "Experience & Innovation",
    desc: "Beyond branding, we perfect the experience — shaping every touchpoint of the guest journey, from menu to service.",
    items: ["Menu development", "Guest journey", "Concept design", "Staff training", "Service design", "Signature products"],
  },
  {
    no: "IV",
    course: "Sides",
    title: "Campaigns & Growth",
    desc: "Launches that land and marketing that compounds — turning a great concept into a destination people return to.",
    items: ["Launch campaigns", "Photography & film", "Digital strategy", "SEO", "CRM & loyalty", "Partnerships"],
  },
  {
    no: "V",
    course: "Desserts",
    title: "Production & On-Ground",
    desc: "Strategy translated into striking, tangible reality — print, packaging, signage and unforgettable activations.",
    items: ["Packaging", "Print & production", "Web design & development", "Signage", "Pop-ups", "Events"],
  },
];

export default function MenuPage() {
  return (
    <main className="relative bg-[#F3F1EC] text-[#0A0A0A] overflow-hidden">
      <Cursor />
      <Grain />
      <SiteNav />

      {/* HERO */}
      <section className="relative px-6 pt-36 md:pt-44 pb-16 md:pb-24 text-center">
        <div aria-hidden className="absolute inset-x-0 top-[20%] z-0 flex justify-center pointer-events-none select-none">
          <span className="font-display uppercase leading-none whitespace-nowrap text-[#0A0A0A]/[0.04]" style={{ fontSize: "clamp(6rem, 26vw, 26rem)" }}>
            Carte
          </span>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#0A0A0A]/45 mb-6">Pull up a chair</p>
          <h1 className="font-display uppercase leading-[0.9] tracking-tight" style={{ fontSize: "clamp(3rem, 13vw, 9rem)" }}>
            The Menu
          </h1>
          <p className="font-editorial italic mt-7 mx-auto max-w-xl leading-relaxed text-[#0A0A0A]/70" style={{ fontSize: "clamp(1.05rem, 1.9vw, 1.4rem)" }}>
            Everything we serve, course by course. No set menu, no fixed price — every concept is plated to order.
          </p>
        </div>
      </section>

      {/* COURSES */}
      <section className="px-6 md:px-8 pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto border-t border-[#0A0A0A]/15">
          {COURSES.map((c) => (
            <div key={c.no} className="border-b border-[#0A0A0A]/15 py-12 md:py-16">
              <div className="flex items-baseline justify-center gap-3 mb-4">
                <span className="font-display text-[#FF2EC4]" style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.2rem)" }}>{c.no}</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45">{c.course}</span>
              </div>
              <h2 className="font-display uppercase tracking-tight text-center leading-[0.95]" style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)" }}>
                {c.title}
              </h2>
              <p className="font-editorial italic text-center mx-auto max-w-xl mt-4 mb-8 leading-relaxed text-[#0A0A0A]/65" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}>
                {c.desc}
              </p>
              <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2.5">
                {c.items.map((it) => (
                  <li key={it} className="rounded-full border border-[#0A0A0A]/20 px-4 py-2 text-[12px] md:text-[13px] tracking-[0.03em] transition-colors duration-300 hover:bg-[#0A0A0A] hover:text-[#F3F1EC]">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-center text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 pt-10">
            Served daily · Sydney · Dubai · Beirut
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-24 md:py-32 flex flex-col items-center text-center">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-6">Hungry?</p>
        <h2 className="font-display uppercase tracking-tight leading-[0.95] mx-auto max-w-4xl" style={{ fontSize: "clamp(2rem, 6vw, 4.6rem)" }}>
          Ready to order?
        </h2>
        <Link
          href="/contact"
          data-cursor="Let's eat"
          className="group inline-flex items-center gap-3 mt-10 bg-[#0A0A0A] text-[#F3F1EC] rounded-full px-9 py-4 text-[11px] tracking-[0.22em] uppercase hover:gap-5 transition-all"
        >
          Book a table <span aria-hidden>→</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
