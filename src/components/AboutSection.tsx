/* The About content, woven into the one-pager. */
export default function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-20 bg-white text-[#0A0A0A] overflow-hidden">
      {/* founder */}
      <div className="px-8 md:px-16 pt-28 md:pt-36 pb-20 md:pb-28">
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
          <div className="relative">
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/nn-founder.png" alt="Khalil Khouri" className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {/* animated thought bubble above the head */}
            <div className="pointer-events-none absolute left-[34%] -top-3 md:-top-5 z-10 animate-[bob_3.5s_ease-in-out_infinite]">
              <div className="relative bg-white text-[#0A0A0A] rounded-[1.4rem] px-5 py-3 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.45)]">
                <span className="font-marker leading-none whitespace-nowrap" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)" }}>What&apos;s for lunch?</span>
                {/* thought tail */}
                <span className="absolute -bottom-2.5 left-5 w-3.5 h-3.5 rounded-full bg-white shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)]" />
                <span className="absolute -bottom-5 left-2.5 w-2 h-2 rounded-full bg-white shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* manifesto */}
      <div className="relative bg-[#81D742] text-[#0A0A0A] px-8 md:px-16 py-20 md:py-28" data-cursor-color="#0A0A0A">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans leading-[1.4]" style={{ fontSize: "clamp(1.05rem, 2vw, 1.6rem)" }}>
            &ldquo;Food is everything we are. It&apos;s an extension of nationalist feeling, ethnic feeling, your
            personal history, your province, your region, your tribe, your grandma. It&apos;s inseparable from those
            from the get-go.&rdquo;
          </p>
          <p className="mt-6 text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/55">— Anthony Bourdain</p>
        </div>
      </div>

    </section>
  );
}
