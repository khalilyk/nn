import type { Menu } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/**
 * The Menu — a calm editorial header (serif headline with an italic accent, a
 * small intro line) above a tidy horizontal row of service cards: image,
 * eyebrow, serif title and a short blurb.
 */
export default function MenuShowcase({ menu = DEFAULT_CONTENT.menu }: { menu?: Menu }) {
  const imgs = menu.gallery ?? [];
  const words = menu.heading.trim().replace(/\.$/, "").split(" ");
  const lastWord = words.pop();

  return (
    <div className="bg-white text-[#0A0A0A] px-8 md:px-16 pt-28 md:pt-36 pb-16 md:pb-24">
      {/* header */}
      <div className="max-w-4xl mb-12 md:mb-16">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-6">{menu.eyebrow}</p>
        <h2 className="font-editorial leading-[1.02]" style={{ fontSize: "clamp(2rem, 4.6vw, 3.8rem)" }}>
          {words.join(" ")} <span className="italic text-[#FF5C1A]">{lastWord}.</span>
        </h2>
      </div>

      {/* cards */}
      <div className="flex gap-8 md:gap-12 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {menu.courses.map((c, i) => (
          <article key={c.title} className="shrink-0 w-[78vw] sm:w-[320px] md:w-[360px]">
            <div className="group aspect-[4/3] overflow-hidden bg-[#f0ede6]">
              {imgs.length > 0 && (
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  style={{ backgroundImage: `url('${imgs[i % imgs.length]}')` }}
                />
              )}
            </div>
            <p className="mt-6 text-[9px] tracking-[0.24em] uppercase text-[#0A0A0A]/45">{c.course}</p>
            <h3 className="mt-2 font-editorial leading-[1.05]" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)" }}>{c.title}</h3>
            <ul className="mt-4 text-[12px] leading-relaxed text-[#0A0A0A]/55">
              {c.items.map((it) => (
                <li key={it} className="border-b border-[#0A0A0A]/10 py-1.5">{it}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 h-px w-full bg-[#FF5C1A]/40" />
    </div>
  );
}
