/**
 * Full-bleed "talk to us" call-to-action, shown above the footer on every page
 * except the homepage. Purple ground, black display headline centred on the
 * page, and a dark pill linking through to the contact page.
 */
export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#C9C6F5] text-[#0A0A0A] px-8 md:px-16 py-20 md:py-32">
      <div className="mx-auto max-w-6xl flex flex-col items-center text-center">
        <h2 className="font-sans font-bold uppercase leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.6rem, 9vw, 7.5rem)" }}>
          <span className="block">Your idea</span>
          <span className="block">Deserves better.</span>
          <span className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
            <span>Talk to us!</span>
            <a
              href="/contact"
              className="font-sans uppercase tracking-[0.14em] rounded-full bg-[#0A0A0A] text-[#C9C6F5] px-10 py-6 md:px-12 md:py-7 text-sm md:text-base leading-none text-center transition-[transform,background-color] duration-300 hover:bg-[#1c1a2e] hover:-translate-y-0.5"
            >
              Let&apos;s do this
            </a>
          </span>
        </h2>

        {/* underline beneath the headline */}
        <div className="mt-8 md:mt-10 h-px w-full max-w-[38rem] bg-[#0A0A0A]/70" />
      </div>
    </section>
  );
}
