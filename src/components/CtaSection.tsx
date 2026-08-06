import Reveal from "./Reveal";

/**
 * Full-bleed "let's talk" call-to-action, shown above the footer on every page
 * except the homepage. Styled in the brand orange (matches the brands carousel);
 * contact details are pulled from the footer content so they stay in sync.
 */
export default function CtaSection({
  email,
  phone,
  locations,
}: {
  email: string;
  phone: string;
  locations: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#FF5C1A] text-[#0A0A0A] px-8 md:px-16 py-16 md:py-28">
      {/* faint concentric arcs, lower-left, echoing the reference */}
      <div aria-hidden className="pointer-events-none absolute -left-40 -bottom-52 w-[560px] h-[560px] rounded-full border border-[#0A0A0A]/15" />
      <div aria-hidden className="pointer-events-none absolute -left-28 -bottom-40 w-[400px] h-[400px] rounded-full border border-[#0A0A0A]/10" />

      <div className="relative z-10">
        {/* eyebrow row */}
        <div className="flex items-center justify-between text-[10px] md:text-[11px] tracking-[0.25em] uppercase">
          <span>(Get in touch)</span>
          <span>Not Normal &#10038;</span>
        </div>

        {/* headline */}
        <Reveal>
          <h2 className="font-display uppercase leading-[0.9] tracking-tight mt-8 md:mt-12" style={{ fontSize: "clamp(2.6rem, 9vw, 7.5rem)" }}>
            Let&apos;s start{" "}
            <span className="underline decoration-[0.055em] underline-offset-[0.1em]">something</span>
          </h2>
        </Reveal>

        {/* details + invitation */}
        <div className="mt-12 md:mt-20 grid gap-12 md:grid-cols-2 md:items-end">
          {/* left: contact block + badge */}
          <div className="flex flex-col gap-9">
            <div className="space-y-2 text-[12px] md:text-[13px] tracking-wide">
              <a
                href={`mailto:${email}`}
                className="inline-block uppercase border-b border-[#0A0A0A]/40 pb-1 hover:border-[#0A0A0A] transition-colors"
              >
                {email}
              </a>
              <p><span className="font-semibold">P.</span> {phone}</p>
              <p className="uppercase"><span className="font-semibold">A.</span> {locations}</p>
            </div>

            <a
              href="/contact"
              className="group grid place-items-center w-32 h-32 md:w-36 md:h-36 rounded-full border border-[#0A0A0A] text-[10px] tracking-[0.22em] uppercase text-center leading-tight transition-colors hover:bg-[#0A0A0A] hover:text-[#FF5C1A]"
            >
              <span>
                Get in
                <br />
                touch <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">&#8599;</span>
              </span>
            </a>
          </div>

          {/* right: the invitation */}
          <div className="md:justify-self-end md:text-right md:max-w-md">
            <p className="leading-[1.4]" style={{ fontSize: "clamp(1.25rem, 2.6vw, 1.9rem)" }}>
              Ready to discuss{" "}
              <span className="underline decoration-1 underline-offset-4">your project</span>? Feel like we might be a{" "}
              <span className="underline decoration-1 underline-offset-4">great</span> fit? We{" "}
              <span className="font-editorial italic">would love</span> to{" "}
              <span className="font-editorial italic">hear</span> about it!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
