import type { Menu } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/**
 * The Menu — an editorial "case study" look on paper: a serif heading with an
 * italic accent, then a row of service cards whose copy is set in a handwritten
 * font (Kalam) for an annotated, hand-made feel.
 */
export default function MenuShowcase({ menu = DEFAULT_CONTENT.menu }: { menu?: Menu }) {
  const imgs = menu.gallery ?? [];
  return (
    <div className="bg-[#F1ECE1] text-[#1a1a1a] px-8 md:px-16 pt-28 md:pt-36 pb-16 md:pb-24">
      {/* header */}
      <h2 className="font-editorial text-center leading-[1.05]" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}>
        The <span className="italic">Menu.</span>
      </h2>
      <p className="font-kalam text-center text-[15px] md:text-[17px] text-[#1a1a1a]/70 mt-4">Here&apos;s everything on offer —</p>

      {/* cards */}
      <div className="mt-14 md:mt-20 flex gap-10 md:gap-16 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {menu.courses.map((c, i) => (
          <article key={c.title} className="shrink-0 w-[78vw] sm:w-[320px] md:w-[360px]">
            <div className="group aspect-[4/5] overflow-hidden bg-[#e4ddcd] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)]">
              {imgs.length > 0 && (
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  style={{ backgroundImage: `url('${imgs[i % imgs.length]}')` }}
                />
              )}
            </div>

            <p className="font-kalam mt-6 text-[13px] tracking-[0.06em] uppercase text-[#1a1a1a]/55">{c.course}</p>
            <h3 className="font-kalam leading-[1.1] mt-1" style={{ fontSize: "clamp(1.7rem, 2.6vw, 2.3rem)" }}>{c.title}</h3>
            <ul className="font-kalam mt-3 text-[15px] leading-[1.7] text-[#1a1a1a]/75">
              {c.items.map((it) => (
                <li key={it}>— {it}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
