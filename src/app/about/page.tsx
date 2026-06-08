import Link from "next/link";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "About · Not Normal",
  description:
    "Not Normal is a hospitality branding studio that builds brands with staying power. Founded by Khalil Khouri. Sydney · Dubai · Beirut.",
};

const VALUES = [
  { n: "01", t: "Bold thinking", d: "The world doesn't need more of the same. We make the choice that makes people look twice." },
  { n: "02", t: "Strategic clarity", d: "Taste with a reason behind it. Every decision earns its place." },
  { n: "03", t: "Experiences people remember", d: "We build brands with staying power, not brands that chase the trend." },
  { n: "04", t: "Rooted in hospitality", d: "We understand what makes a concept resonate and what builds genuine guest loyalty." },
];

const SERVICES = [
  "Brand foundations",
  "Identity systems",
  "Menu development",
  "Campaign direction",
  "Packaging",
  "Content creation",
  "Digital strategy",
  "On-ground activations",
];

const STUDIOS = ["Sydney", "Dubai", "Beirut"];

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
          <h1 className="font-display uppercase leading-[0.92] tracking-tight" style={{ fontSize: "clamp(2.2rem, 7.5vw, 5.6rem)" }}>
            We&apos;re about indulging<br />in the extraordinary.
          </h1>
          <p className="font-editorial mt-8 mx-auto max-w-2xl leading-[1.5] text-[#0A0A0A]/70" style={{ fontSize: "clamp(1.05rem, 1.9vw, 1.5rem)" }}>
            Not Normal is a hospitality branding studio building bold brands for the edible and drinkable, for the
            dreamers who&apos;ve poured their lives into building something special.
          </p>
        </div>
      </section>

      {/* MANIFESTO BAND */}
      <section className="relative bg-[#0A0A0A] text-[#F3F1EC] px-8 md:px-16 py-24 md:py-32" data-cursor-color="#F3F1EC">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]/40 mb-8">The short version</p>
          <p className="font-editorial leading-[1.25]" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.8rem)" }}>
            The world doesn&apos;t need more of the same. We&apos;re not an agency that follows trends, we&apos;re a
            studio that builds brands with staying power, rooted in genuine hospitality.
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

      {/* WHAT WE DO */}
      <section className="bg-[#F3F1EC] px-8 md:px-16 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-3">What we do</p>
          <h2 className="font-display uppercase tracking-tight mb-12" style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}>
            Everything a concept<br />needs to be unforgettable.
          </h2>
          <ul className="flex flex-wrap gap-3">
            {SERVICES.map((s) => (
              <li key={s} className="rounded-full border border-[#0A0A0A]/25 px-5 py-2.5 text-[12px] md:text-[13px] tracking-[0.04em]">
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-xl text-[13px] md:text-[14px] leading-relaxed text-[#0A0A0A]/60">
            For restaurants, cafés and lifestyle venues that recognise personal interactions and brand consistency
            are what guests actually remember.
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="px-8 md:px-16 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-6">The founder</p>
          <p className="font-editorial leading-[1.3]" style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)" }}>
            Founded by <span className="italic">Khalil Khouri</span>, former Head of Marketing for acclaimed Dubai
            restaurants <span className="text-[#FF2EC4]">3Fils</span>, <span className="text-[#FF2EC4]">BRIX</span> and{" "}
            <span className="text-[#FF2EC4]">Bordo Mavi</span>.
          </p>
          <p className="mt-8 max-w-2xl text-[13px] md:text-[14px] leading-relaxed text-[#0A0A0A]/60">
            Everything we make is rooted in hospitality. We&apos;ve lived the floor, the pass and the bar, so we
            understand what makes a concept resonate and what builds genuine guest loyalty.
          </p>
        </div>
      </section>

      {/* STUDIOS */}
      <section className="bg-[#0A0A0A] text-[#F3F1EC] px-8 md:px-16 py-24 md:py-32" data-cursor-color="#F3F1EC">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]/40 mb-3">Find us</p>
          <h2 className="font-display uppercase tracking-tight mb-14" style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}>
            Three cities,<br />one obsession.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STUDIOS.map((city) => (
              <h3 key={city} className="font-display uppercase leading-none border-t border-[#F3F1EC]/20 pt-6" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
                {city}
              </h3>
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
