import type { About } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";
import ScrollRevealText from "./ScrollRevealText";
import StatsRow from "./StatsRow";

/* The Founder story, told as three stacked "beats" — an opening headline, a
   centred statement, and the full story — with a single hand-drawn line weaving
   down the section to link them (inspired by editorial one-pagers). */
export default function AboutSection({ about = DEFAULT_CONTENT.about }: { about?: About }) {
  const [lead, ...rest] = about.paragraphs;
  const closing = rest.length ? rest[rest.length - 1] : "";
  const body = rest.slice(0, Math.max(0, rest.length - 1)); // middle paragraphs → the full story

  return (
    <section id="about" className="relative scroll-mt-20 bg-white text-[#0A0A0A] overflow-hidden">
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
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-6">{about.eyebrow}</p>
          <h2 className="font-editorial leading-[1.05]" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
            {about.heading ? about.heading : <>Founded by <span className="italic">{about.founderName}</span>.</>}
          </h2>
          {lead && (
            <p className="mt-7 text-[14px] md:text-[15px] leading-relaxed text-[#0A0A0A]/60 max-w-md mx-auto">
              {lead}
            </p>
          )}
        </div>

        {/* ── Beat 2 · statement ── */}
        {closing && (
          <div className="max-w-3xl mx-auto text-center mt-40 md:mt-64">
            <p className="font-editorial leading-[1.28]" style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.6rem)" }}>
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
            className="text-[#0A0A0A] leading-relaxed text-[16px] md:text-[19px]"
          />

          {/* stats */}
          <div className="mt-16">
            <StatsRow />
          </div>

          {/* credibility strip */}
          <div className="mt-14 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 shrink-0 sm:w-32">Recognised by</p>
              <div className="flex flex-wrap gap-2">
                {["Michelin", "The World's 50 Best"].map((t) => (
                  <span key={t} className="text-[11px] tracking-[0.08em] uppercase border border-[#0A0A0A]/15 rounded-full px-4 py-2">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 shrink-0 sm:w-32">Behind names like</p>
              <div className="flex flex-wrap gap-2">
                {["3Fils", "BRIX", "Bordo Mavi"].map((t) => (
                  <span key={t} className="text-[11px] tracking-[0.08em] uppercase border border-[#0A0A0A]/15 rounded-full px-4 py-2">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <a
            href="/contact"
            className="group mt-14 flex w-full items-center justify-between gap-3 bg-[#0A0A0A] text-[#F3F1EC] px-7 py-5 text-[13px] uppercase tracking-[0.1em] leading-snug transition-colors duration-300 hover:bg-[#4ADE80] hover:text-[#0A0A0A]"
          >
            <span>Let&apos;s get started!</span>
            <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">&#8594;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
