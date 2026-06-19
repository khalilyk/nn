"use client";

/* Retro glitch "LOADING..." screen with a filling bar. */
export default function GlitchLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black grid place-items-center overflow-hidden" style={{ animation: "nn-jitter 0.42s steps(3) infinite" }}>
      {/* scanline tint */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.6) 0 1px, transparent 1px 3px)" }} />

      <div className="relative text-center px-8" style={{ animation: "nn-flicker 2.4s steps(1) infinite" }}>
        <div
          data-text="LOADING..."
          className="nn-glitch font-sans font-extrabold uppercase tracking-[0.18em] leading-none mb-5"
          style={{ fontSize: "clamp(2rem, 7vw, 3.4rem)" }}
        >
          LOADING...
        </div>

        {/* bar */}
        <div className="mx-auto w-[260px] md:w-[340px] h-7 md:h-8 border-2 border-white p-[3px]">
          <div className="h-full bg-white" style={{ animation: "nn-loadbar 2.1s cubic-bezier(0.45,0.05,0.4,1) forwards" }} />
        </div>
      </div>
    </div>
  );
}
