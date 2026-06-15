import type { About } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/* The About content, woven into the one-pager. */
export default function AboutSection({ about = DEFAULT_CONTENT.about }: { about?: About }) {
  return (
    <section id="about" className="relative scroll-mt-20 bg-white text-[#0A0A0A] overflow-hidden">
      {/* founder */}
      <div className="px-8 md:px-16 pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-6">{about.eyebrow}</p>
            <p className="font-editorial leading-[1.1]" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              Founded by <span className="italic">{about.founderName}</span>.
            </p>
            <div className="mt-8 space-y-5 text-[14px] md:text-[15px] leading-relaxed text-[#0A0A0A]/65">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={about.image} alt={about.founderName} className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {/* animated thought bubble above the head */}
            <div className="pointer-events-none absolute left-[46%] top-[4%] z-10 animate-[bob_3.5s_ease-in-out_infinite]">
              <div className="relative bg-white text-[#0A0A0A] rounded-[1.4rem] px-5 py-3 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.45)]">
                <span className="font-marker leading-none whitespace-nowrap" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)" }}>{about.thoughtBubble}</span>
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
