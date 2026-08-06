import type { About } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

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

        {/* ── Beat 3 · the full story + founder ── */}
        <div className="mt-40 md:mt-64 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-5">The story</p>
            <div className="space-y-5 text-[14px] md:text-[15px] leading-relaxed text-[#0A0A0A]/65">
              {body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <a
              href="/contact"
              className="group mt-9 flex w-full items-center justify-between gap-3 bg-[#0A0A0A] text-[#F3F1EC] px-7 py-5 text-[13px] uppercase tracking-[0.1em] leading-snug transition-colors duration-300 hover:bg-[#26262b]"
            >
              <span>Let&apos;s get started!</span>
              <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">&#8594;</span>
            </a>
          </div>

          <div className="relative self-center">
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={about.image} alt={about.founderName} className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {/* animated thought bubble above the head */}
            <div className="pointer-events-none absolute left-[46%] top-[4%] z-10 animate-[bob_3.5s_ease-in-out_infinite]">
              <div className="relative bg-white text-[#0A0A0A] rounded-[1.4rem] px-5 py-3 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.45)]">
                <span className="font-editorial italic leading-none whitespace-nowrap" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)" }}>{about.thoughtBubble}</span>
                {/* thought tail */}
                <span className="absolute -bottom-2.5 left-5 w-3.5 h-3.5 rounded-full bg-white shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)]" />
                <span className="absolute -bottom-5 left-2.5 w-2 h-2 rounded-full bg-white shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
