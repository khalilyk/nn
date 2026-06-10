import Link from "next/link";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ParallaxImage from "@/components/ParallaxImage";
import ServiceMindmap from "@/components/ServiceMindmap";

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

const CLIENTS_ROW_1 = ["3Fils", "Revolver", "Maison Dali", "Oakberry", "Kinoya", "Tony's Woodfire"];
const CLIENTS_ROW_2 = ["PieHaus", "Yava", "Bar Baker", "Shanghai Me", "Mimi Kakushi", "Lucky's"];

function MarqueeRow({ items, dir }: { items: string[]; dir: "left" | "right" }) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-[#0A0A0A]/15">
      <div className={`flex w-max ${dir === "left" ? "marquee-left" : "marquee-right"}`}>
        {loop.map((name, i) => (
          <div
            key={i}
            className="shrink-0 w-[clamp(190px,26vw,300px)] aspect-square border-r border-[#0A0A0A]/15 flex items-center justify-center group"
          >
            <span className="font-display uppercase text-[#0A0A0A]/40 group-hover:text-[#0A0A0A] group-hover:scale-105 transition-all duration-500 text-center px-3" style={{ fontSize: "clamp(1rem, 1.5vw, 1.6rem)" }}>
              {name.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

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
            From restaurants to cafés, lifestyle concepts to pop-ups - we build identities, campaigns, content and
            experiences that make people stop, feel and remember.
          </p>
        </div>
      </section>

      {/* PARALLAX IMAGE */}
      <ParallaxImage src="/nn-f3.png" alt="Out in the city" />

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

      {/* TWO-IMAGE SPLIT */}
      <section className="px-2 md:px-2.5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nn-f2.png" alt="Not Normal" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nn-f5.png" alt="Not Normal" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-[#F3F1EC] px-8 md:px-16 py-24 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-3">What we do</p>
          <h2 className="font-display uppercase tracking-tight mb-12" style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}>
            Everything a concept<br />needs to be unforgettable.
          </h2>
          {/* mobile: simple pill list */}
          <ul className="md:hidden flex flex-wrap justify-center gap-3">
            {SERVICES.map((s) => (
              <li key={s} className="rounded-full border border-[#0A0A0A]/25 px-5 py-2.5 text-[12px] tracking-[0.04em]">
                {s}
              </li>
            ))}
          </ul>
          {/* desktop: live mindmap */}
          <div className="hidden md:block">
            <ServiceMindmap />
          </div>
          <p className="mt-10 max-w-xl mx-auto text-[13px] md:text-[14px] leading-relaxed text-[#0A0A0A]/60">
            For restaurants, cafés and lifestyle venues that recognise personal interactions and brand consistency
            are what guests actually remember.
          </p>
        </div>
      </section>

      {/* FOUNDER — split screen, image on the right */}
      <section className="px-8 md:px-16 py-24 md:py-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-6">The founder</p>
          <p className="font-editorial leading-[1.1]" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            Founded by <span className="italic">Khalil Khouri</span>.
          </p>
          <div className="mt-8 space-y-5 text-[14px] md:text-[15px] leading-relaxed text-[#0A0A0A]/65">
            <p>
              The former Head of Marketing behind some of Dubai&apos;s most recognised hospitality brands, including{" "}
              <span className="text-[#FF2EC4]">3Fils</span>, <span className="text-[#FF2EC4]">BRIX</span> and{" "}
              <span className="text-[#FF2EC4]">Bordo Mavi</span>, Not Normal was born from a simple belief:{" "}
              <span className="text-[#0A0A0A] font-medium">the world doesn&apos;t need more of the same.</span>
            </p>
            <p>
              Over the past two decades, our work has helped shape brands recognised by{" "}
              <span className="text-[#0A0A0A] font-medium">Michelin</span>, celebrated by{" "}
              <span className="text-[#0A0A0A] font-medium">The World&apos;s 50 Best Restaurants</span>, and awarded
              across some of the region&apos;s most competitive dining markets. From Dubai&apos;s waterfront
              institutions to emerging concepts in Sydney and creative collaborations throughout Beirut, we&apos;ve seen
              firsthand what separates a venue people visit from one they talk about.
            </p>
            <p>
              Today, Not Normal partners with restaurants, cafés and lifestyle brands to build identities with
              substance and longevity. From concept development and brand strategy to menus, packaging, content,
              digital marketing and launch campaigns, every project is approached through a hospitality lens.
            </p>
            <p>
              We understand what makes guests return, what creates genuine connection and what turns a good concept
              into a destination.
            </p>
            <p>
              Built across cities, cultures and award-winning hospitality brands, Not Normal creates work designed to
              be remembered.
            </p>
          </div>
          </div>
          {/* image */}
          <div className="md:sticky md:top-28">
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/nn-founder.png" alt="Khalil Khouri" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <section className="bg-[#81D742] text-[#0A0A0A] px-8 md:px-16 py-24 md:py-32" data-cursor-color="#F3F1EC">
        <div className="max-w-6xl mx-auto">
          {/* client logo marquee — two rows, opposite directions */}
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-6">Call them clients, call them friends</p>
          <div
            className="marquee-row border-t border-[#0A0A0A]/15"
            style={{
              maskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
            }}
          >
            <MarqueeRow items={CLIENTS_ROW_1} dir="left" />
            <MarqueeRow items={CLIENTS_ROW_2} dir="right" />
          </div>
        </div>
      </section>

      {/* CTA — matches the home page "starting from scratch" section */}
      <section className="px-8 md:px-16 py-24 md:py-36 flex flex-col items-center justify-center text-center">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-6">Wanna build something not normal?</p>
        <h2 className="font-editorial leading-[1.1] mb-10 max-w-2xl mx-auto" style={{ fontSize: "clamp(1.8rem, 3.8vw, 3.4rem)" }}>
          We&apos;ll build your brand from the ground up.
          <span className="italic"> Identity, strategy, story</span>, the whole thing.
        </h2>
        <Link
          href="/contact"
          data-cursor="Go"
          className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-[#0A0A0A] px-9 py-4"
        >
          <span className="absolute inset-0 bg-[#0A0A0A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          <span className="relative z-10 text-[10px] tracking-[0.28em] uppercase text-[#0A0A0A] group-hover:text-[#F3F1EC] transition-colors duration-500">
            Start a project
          </span>
          <span className="relative z-10 w-7 h-7 rounded-full border border-[#0A0A0A] group-hover:border-[#F3F1EC] flex items-center justify-center overflow-hidden">
            <span className="text-[#0A0A0A] group-hover:text-[#F3F1EC] transition-all duration-500 group-hover:translate-x-5">→</span>
            <span className="absolute text-[#F3F1EC] -translate-x-5 group-hover:translate-x-0 transition-transform duration-500">→</span>
          </span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
