const VALUES = [
  { n: "01", t: "Bold thinking", d: "The world doesn't need more of the same. We make the choice that makes people look twice." },
  { n: "02", t: "Strategic clarity", d: "Taste with a reason behind it. Every decision earns its place." },
  { n: "03", t: "Experiences people remember", d: "We build brands with staying power, not brands that chase the trend." },
  { n: "04", t: "Rooted in hospitality", d: "We understand what makes a concept resonate and what builds genuine guest loyalty." },
];

/* The About content, woven into the one-pager. */
export default function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-20 bg-white text-[#0A0A0A] overflow-hidden">
      {/* statement */}
      <div className="relative px-6 pt-24 md:pt-32 pb-16 md:pb-24">
        <div aria-hidden className="absolute inset-x-0 top-[24%] z-0 flex justify-center pointer-events-none select-none">
          <span className="font-display uppercase leading-none whitespace-nowrap text-[#0A0A0A]/[0.04]" style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}>
            Not Normal
          </span>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-6">Who we are</p>
          <h2 className="font-display uppercase leading-[0.92] tracking-tight" style={{ fontSize: "clamp(2.2rem, 7.5vw, 5.6rem)" }}>
            We&apos;re about indulging<br />in the extraordinary.
          </h2>
          <p className="font-editorial mt-8 mx-auto max-w-2xl leading-[1.5] text-[#0A0A0A]/70" style={{ fontSize: "clamp(1.05rem, 1.9vw, 1.5rem)" }}>
            From restaurants to cafés, lifestyle concepts to pop-ups — we build identities, campaigns, content and
            experiences that make people stop, feel and remember.
          </p>
        </div>
      </div>

      {/* founder */}
      <div className="px-8 md:px-16 py-20 md:py-28">
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
                Built across cities, cultures and award-winning hospitality brands, Not Normal creates work designed to
                be remembered.
              </p>
            </div>
          </div>
          <div>
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/nn-founder.png" alt="Khalil Khouri" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* manifesto */}
      <div className="relative bg-[#0A0A0A] text-[#F3F1EC] px-8 md:px-16 py-20 md:py-28" data-cursor-color="#F3F1EC">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]/40 mb-8">The short version</p>
          <p className="font-editorial leading-[1.25]" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.8rem)" }}>
            The world doesn&apos;t need more of the same. We&apos;re not an agency that follows trends, we&apos;re a
            studio that builds brands with staying power, rooted in genuine hospitality.
          </p>
        </div>
      </div>

      {/* values */}
      <div className="px-8 md:px-16 py-20 md:py-28 max-w-6xl mx-auto">
        <h3 className="font-display uppercase tracking-tight mb-14" style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}>
          How we&apos;re wired
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0A0A0A]/10">
          {VALUES.map((v) => (
            <div key={v.n} className="bg-white p-8 md:p-12">
              <span className="font-display text-[#FF2EC4] text-2xl">{v.n}</span>
              <h4 className="font-display uppercase tracking-tight mt-4 mb-3" style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}>
                {v.t}
              </h4>
              <p className="text-[13px] md:text-[14px] leading-relaxed text-[#0A0A0A]/60">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
