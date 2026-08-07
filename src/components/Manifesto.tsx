import ArrowToCursor from "./ArrowToCursor";
import Clock from "./Clock";

/** Yellow poster header — oversized black grotesk "NOBODY REMEMBERS NORMAL"
 *  with an inset serif-italic pill, a corner wordmark, a down arrow and a
 *  small footer row (inspired by the Hopeful Monsters poster). */
export default function Manifesto({ line }: { line?: string }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white text-[#0A0A0A] px-6 md:px-12 pt-28 pb-16">
      {/* giant heading */}
      <div className="relative">
        <h2 className="font-sans font-bold uppercase leading-[0.8] tracking-[-0.02em]" style={{ fontSize: "clamp(3.4rem, 15vw, 12.5rem)" }}>
          <span className="block">Nobody</span>
          <span className="block">Remembers</span>
          <span className="flex items-center gap-4 md:gap-6">
            <span>Normal</span>
            <ArrowToCursor className="h-[0.7em] w-[0.7em] shrink-0" />
          </span>
        </h2>

        {/* inset serif-italic pill, overlapping the heading, gently floating */}
        <span className="absolute right-0 md:right-auto md:left-0 top-[46%] md:top-1/2 -translate-y-1/2">
          <span
            className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white rounded-full px-4 md:px-6 py-2 md:py-3 whitespace-nowrap shadow-[6px_6px_0_rgba(0,0,0,0.15)]"
            style={{ animation: "nnFloat 4.5s ease-in-out infinite", willChange: "transform" }}
          >
            <span className="font-editorial italic text-[15px] md:text-[26px] leading-none">Refuse</span>
            <span aria-hidden className="text-[15px] md:text-[24px] leading-none">→</span>
            <span className="font-editorial italic text-[15px] md:text-[26px] leading-none">to blend in</span>
          </span>
        </span>
      </div>

      {/* footer row — kept above the fade so it stays legible on the yellow */}
      <div className="absolute bottom-20 md:bottom-24 inset-x-6 md:inset-x-12 z-10 flex items-center justify-between font-sans font-bold uppercase tracking-[0.12em] text-[9px] md:text-[11px]">
        <Clock mode="date" />
        <Clock mode="time" className="hidden sm:inline" />
        <span className="text-right">{line ? line : "Refuse to blend in"}</span>
      </div>

      {/* short fade so the yellow eases into the black menu below */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 h-12 md:h-16 z-[5] bg-gradient-to-b from-transparent to-[#0A0A0A]" />
    </section>
  );
}
