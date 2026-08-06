/** "Ready? Let's talk" CTA — centred on black, over the spinning sphere, with a
 *  button through to the contact form. Shown above the footer. */
export default function TalkCTA() {
  const tagline = "We'll build your brand from the ground up. Identity, strategy, story, the whole thing.";
  return (
    <section className="relative bg-[#0A0A0A] text-[#F3F1EC] overflow-hidden px-8 md:px-16 py-28 md:py-40" data-cursor-color="#F3F1EC">
      {/* rotating dotted-sphere background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/dotted-sphere.svg" alt="" className="animate-[spin-slow_90s_linear_infinite]" style={{ width: "clamp(500px, 72vw, 1000px)", opacity: 0.1 }} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center text-center">
        <h2 className="font-sans font-bold leading-[0.9] tracking-tight" style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}>
          Ready?
        </h2>
        {tagline && (
          <p className="mt-8 font-sans text-[#F3F1EC]/60 max-w-xl leading-relaxed" style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)" }}>
            {tagline}
          </p>
        )}
        <a
          href="/contact#contact-form"
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[#F3F1EC] text-[#0A0A0A] px-9 py-4 text-[11px] tracking-[0.18em] uppercase font-bold transition-colors hover:bg-[#4ADE80]"
        >
          Start the conversation <span className="transition-transform group-hover:translate-x-0.5">&#8594;</span>
        </a>
      </div>
    </section>
  );
}
