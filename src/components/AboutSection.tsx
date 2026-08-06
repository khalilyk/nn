import type { About } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";
import ScrollRevealText from "./ScrollRevealText";

/* The Founder story, told as three stacked "beats" — an opening headline, a
   centred statement, and the full story — with a single hand-drawn line weaving
   down the section to link them (inspired by editorial one-pagers). */
export default function AboutSection({ about = DEFAULT_CONTENT.about }: { about?: About }) {
  const [lead, ...rest] = about.paragraphs;
  const closing = rest.length ? rest[rest.length - 1] : "";
  const body = rest.slice(0, Math.max(0, rest.length - 1)); // middle paragraphs → the full story

  return (
    <section id="about" className="relative scroll-mt-20 bg-[#F4F2ED] text-[#0A0A0A] overflow-hidden">
      {/* softly drifting, colour-cycling gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[
          { w: "55vw", top: "2%", left: "30%", c: "212,164,92", a: 0.42, blur: 60, drift: "blobA", ds: "22s" },
          { w: "44vw", top: "30%", left: "0%", c: "120,120,130", a: 0.30, blur: 70, drift: "blobB", ds: "28s" },
          { w: "40vw", top: "58%", left: "50%", c: "212,164,92", a: 0.32, blur: 80, drift: "blobA", ds: "34s" },
        ].map((b, i) => (
          <div key={i} className="absolute" style={{ width: b.w, height: b.w, top: b.top, left: b.left, animation: `blobHue ${18 + i * 6}s linear infinite`, willChange: "filter" }}>
            <div
              className="w-full h-full rounded-full"
              style={{ background: `radial-gradient(circle, rgba(${b.c},${b.a}), rgba(${b.c},0) 62%)`, filter: `blur(${b.blur}px)`, animation: `${b.drift} ${b.ds} ease-in-out infinite${i === 2 ? " reverse" : ""}`, willChange: "transform" }}
            />
          </div>
        ))}
      </div>

      {/* connecting line, drawn behind everything and stretched to the section.
          non-scaling-stroke keeps the ink crisp however tall the section gets. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M55,4 C36,11 34,18 51,24 C72,31 71,43 44,51 C24,57 27,71 54,76 C80,80 82,90 38,97"
          stroke="#0A0A0A"
          strokeOpacity="0.16"
          strokeWidth="1.4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative z-10 px-8 md:px-16 pt-28 md:pt-40 pb-24 md:pb-36">
        {/* ── Beat 1 · opening ── */}
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-8">{about.eyebrow}</p>
          <div className="grid md:grid-cols-[1fr_15rem] gap-8 md:gap-14 items-start">
            <h2 className="font-editorial leading-[1.0]" style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)" }}>
              {about.heading ? about.heading : <>Founded by <span className="italic">{about.founderName}</span>.</>}
            </h2>
            {lead && (
              <p className="font-editorial text-[15px] md:text-[17px] leading-relaxed text-[#0A0A0A]/60 md:pt-4">
                {lead}
              </p>
            )}
          </div>
        </div>

        {/* ── Beat 2 · statement ── */}
        {closing && (
          <div className="max-w-5xl mx-auto mt-40 md:mt-64">
            <p className="font-editorial leading-[1.2]" style={{ fontSize: "clamp(1.7rem, 4.2vw, 3.4rem)" }}>
              {closing}
            </p>
          </div>
        )}

        {/* ── Beat 3 · the full story, with the founder portrait below ── */}
        <div className="mt-40 md:mt-64 max-w-3xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-6">The story</p>

          {/* scroll-revealed copy */}
          <ScrollRevealText
            paragraphs={body}
            className="font-editorial text-[#0A0A0A] leading-relaxed text-[18px] md:text-[22px]"
          />

        </div>
      </div>
    </section>
  );
}
