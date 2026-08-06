import type { Menu } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/**
 * The Menu — each service as a SociaLite-style split: a cream text panel (label,
 * service list, oversized italic serif title) and a full-bleed image. The image
 * alternates side on every other row. Stacked, scrolls vertically.
 */
export default function MenuShowcase({ menu = DEFAULT_CONTENT.menu }: { menu?: Menu }) {
  const imgs = menu.gallery ?? [];
  return (
    <div className="bg-[#F5EFE0] text-[#0A0A0A] pt-24 md:pt-28">
      {menu.courses.map((c, i) => {
        const imgLeft = i % 2 === 1; // image on the left for the 2nd and 4th items
        return (
          <section key={c.title} className="grid md:grid-cols-2 border-t border-[#0A0A0A]/10">
            {/* text */}
            <div className={`order-2 ${imgLeft ? "md:order-2" : "md:order-1"} flex flex-col justify-between gap-12 p-8 md:p-14 lg:p-20 md:min-h-[86vh]`}>
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase text-[#0A0A0A]/45 mb-6">{c.course}</p>
                <ul className="max-w-md text-[13px] md:text-[15px] leading-relaxed text-[#0A0A0A]/60">
                  {c.items.map((it) => (
                    <li key={it} className="border-b border-[#0A0A0A]/10 py-2">{it}</li>
                  ))}
                </ul>
              </div>
              <span className="font-editorial italic leading-[0.85] text-[#FF5C1A]" style={{ fontSize: "clamp(2.6rem, 6.5vw, 6rem)" }}>
                {c.title}
              </span>
            </div>

            {/* image */}
            <div className={`order-1 ${imgLeft ? "md:order-1" : "md:order-2"} group relative overflow-hidden bg-[#e9e6df] min-h-[52vh] md:min-h-[86vh]`}>
              {imgs.length > 0 && (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
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
