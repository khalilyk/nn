import type { Menu } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/**
 * The Menu as clean editorial heroes (inspired by the HYKES/SEQUEL layout):
 * for each service, a small eyebrow, an oversized bold headline, a short blurb
 * on the right, and a wide image below. Stacked, scrolls vertically.
 */
export default function MenuShowcase({ menu = DEFAULT_CONTENT.menu }: { menu?: Menu }) {
  const imgs = menu.gallery ?? [];
  return (
    <div className="bg-white text-[#0A0A0A]">
      {menu.courses.map((c, i) => {
        const blurb = c.intro?.length ? c.intro.join(" ") : c.items.slice(0, 6).join(", ") + ".";
        return (
          <section key={c.title} className="px-8 md:px-16 pt-20 md:pt-28 pb-16 md:pb-24 border-t border-[#0A0A0A]/10 first:border-t-0">
            <div className="grid gap-8 md:grid-cols-[1fr_15rem] md:gap-16 md:items-end">
              <div>
                <p className="text-[14px] tracking-wide text-[#0A0A0A]/45 mb-2">{c.course}</p>
                <h2 className="font-sans font-bold uppercase leading-[0.82] tracking-tight" style={{ fontSize: "clamp(2.8rem, 9vw, 8rem)" }}>
                  {c.title}
                </h2>
              </div>
              <p className="text-[13px] leading-relaxed text-[#0A0A0A]/55">{blurb}</p>
            </div>

            <div className="group mt-12 md:mt-16 aspect-[16/8] overflow-hidden bg-[#e9e6df]">
              {imgs.length > 0 && (
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url('${imgs[i % imgs.length]}')` }}
                />
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
