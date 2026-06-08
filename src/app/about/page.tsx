import Link from "next/link";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "About · Not Normal",
  description:
    "Not Normal is a hospitality branding studio building bold brands for the edible and drinkable. Sydney · Dubai · Beirut.",
};

const VALUES = [
  { n: "01", t: "Bold over safe", d: "Beige doesn't get remembered. We make the choice that makes people look twice." },
  { n: "02", t: "Taste, then tactics", d: "Strategy matters, but it's nothing without craft. We sweat both." },
  { n: "03", t: "Hospitality first", d: "We come from the floor, the pass, the bar. We build brands that know how to host." },
  { n: "04", t: "Make it, don't just say it", d: "Branding, storytelling, and stuff you can actually hold. Ideas that ship." },
];

const STUDIOS = [
  { city: "Sydney", note: "Where it started, harbour-side and caffeinated." },
  { city: "Dubai", note: "Where it scales, fast, golden, never quiet." },
  { city: "Beirut", note: "Where it gets soul, late nights and louder flavours." },
];

export default function AboutPage() {
  return (
    <main className="relative bg-white text-[#0A0A0A] overflow-hidden">
      <Cursor />
      <Grain />
      <SiteNav />

      {/* HERO */}
      <section className="relative px-6 pt-36 md:pt-44 pb-20 md:pb-28">
        <div aria-hidden className="absolute inset-x-0 top-[18%] z-0 flex justify-center pointer-events-none select-none">
          <span className="font-display uppercase leading-none whitespace-nowrap text-[#0A0A0A]/[0.04]" style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}>
            Not Normal
          </span>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-6">Who we are</p>
          <h1 className="font-display uppercase leading-[0.92] tracking-tight" style={{ fontSize: "clamp(2.4rem, 8vw, 6rem)" }}>
            We make brands<br />nobody forgets.
          </h1>
          <p className="font-editorial mt-8 mx-auto max-w-2xl leading-[1.5] text-[#0A0A0A]/70" style={{ fontSize: "clamp(1.05rem, 1.9vw, 1.5rem)" }}>
            Not Normal is a hospitality branding studio building bold brands for the edible and drinkable, from
            branding and storytelling to stuff you can hold.
          </p>
        </div>
      </section>

      {/* MANIFESTO BAND */}
      <section className="relative bg-[#0A0A0A] text-[#F3F1EC] px-8 md:px-16 py-24 md:py-32" data-cursor-color="#F3F1EC">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]/40 mb-8">The short version</p>
          <p className="font-editorial leading-[1.25]" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.8rem)" }}>
            Normal is forgettable. We&apos;re here for the venues, the makers and the menus that refuse to blend in,
            and we give them a look, a voice and a feeling that sticks long after the last bite.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-8 md:px-16 py-24 md:py-32 max-w-6xl mx-auto">
        <h2 className="font-display uppercase tracking-tight mb-14" style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}>
          How we&apos;re wired
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0A0A0A]/10">
          {VALUES.map((v) => (
            <div key={v.n} className="bg-white p-8 md:p-12">
              <span className="font-display text-[#FF2EC4] text-2xl">{v.n}</span>
              <h3 className="font-display uppercase tracking-tight mt-4 mb-3" style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}>
                {v.t}
              </h3>
              <p className="text-[13px] md:text-[14px] leading-relaxed text-[#0A0A0A]/60">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STUDIOS */}
      <section className="bg-[#F3F1EC] px-8 md:px-16 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-3">Find us</p>
          <h2 className="font-display uppercase tracking-tight mb-14" style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}>
            Three cities,<br />one obsession.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {STUDIOS.map((s) => (
              <div key={s.city}>
                <h3 className="font-display uppercase leading-none" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>{s.city}</h3>
                <span className="block w-10 h-px bg-[#0A0A0A]/30 my-5" />
                <p className="font-editorial italic text-[#0A0A0A]/65 leading-relaxed" style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}>{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-24 md:py-36 text-center">
        <p className="font-display uppercase tracking-tight leading-[0.95] mx-auto max-w-4xl" style={{ fontSize: "clamp(2rem, 6vw, 4.6rem)" }}>
          Wanna build<br />something not normal?
        </p>
        <Link
          href="/contact"
          data-cursor="Let's talk"
          className="group inline-flex items-center gap-3 mt-12 bg-[#0A0A0A] text-[#F3F1EC] rounded-full px-9 py-4 text-[11px] tracking-[0.22em] uppercase hover:gap-5 transition-all"
        >
          Start a project <span aria-hidden>→</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
