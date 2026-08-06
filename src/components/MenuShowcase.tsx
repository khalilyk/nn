import type { Menu } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/**
 * The Menu as split-screen editorial rows: image on the left, text on the right
 * (eyebrow, oversized headline, deliverables blurb). Stacked, scrolls vertically.
 */
export default function MenuShowcase({ menu = DEFAULT_CONTENT.menu }: { menu?: Menu }) {
  const imgs = menu.gallery ?? [];
  return (
    <div className="bg-white text-[#0A0A0A]">
      {menu.courses.map((c, i) => {
        const blurb = c.intro?.length ? c.intro.join(" ") : c.items.slice(0, 6).join(", ") + ".";
        return (
          <section key={c.title} className="grid md:grid-cols-2 border-t border-[#0A0A0A]/10 first:border-t-0">
            {/* image, left */}
            <div className="group relative aspect-[4/5] md:aspect-auto md:min-h-[88vh] overflow-hidden bg-[#e9e6df]">
              {imgs.length > 0 && (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  style={{ backgroundImage: `url('${imgs[i % imgs.length]}')` }}
                />
              )}
            </div>

            {/* text, right */}
            <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-14 md:py-20">
              <p className="text-[13px] tracking-wide text-[#0A0A0A]/45 mb-3">{c.course}</p>
              <h2 className="font-sans font-bold uppercase leading-[0.88] tracking-tight" style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}>
                {c.title}
              </h2>
              <p className="mt-8 max-w-md text-[13px] md:text-[14px] leading-relaxed text-[#0A0A0A]/55">{blurb}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
}
