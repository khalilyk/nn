import type { Menu } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/**
 * The Menu as a 2×2 grid of services. Each cell is split into an image (left)
 * and text (right): eyebrow, title and key deliverables.
 */
export default function MenuShowcase({ menu = DEFAULT_CONTENT.menu }: { menu?: Menu }) {
  const imgs = menu.gallery ?? [];
  return (
    <div className="bg-white text-[#0A0A0A] px-4 md:px-6 pt-24 md:pt-28 pb-16 md:pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-7xl mx-auto">
        {menu.courses.map((c, i) => (
          <article key={c.title} className="grid grid-cols-2 overflow-hidden rounded-sm border border-[#0A0A0A]/10 min-h-[260px] md:min-h-[360px]">
            {/* image */}
            <div className="group relative overflow-hidden bg-[#e9e6df]">
              {imgs.length > 0 && (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  style={{ backgroundImage: `url('${imgs[i % imgs.length]}')` }}
                />
              )}
            </div>

            {/* text */}
            <div className="flex flex-col justify-center p-5 md:p-8">
              <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#0A0A0A]/40 mb-2">{c.course}</p>
              <h3 className="font-sans font-bold uppercase leading-[0.95] tracking-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 2rem)" }}>
                {c.title}
              </h3>
              <ul className="mt-4 space-y-1 text-[11px] md:text-[12px] leading-relaxed text-[#0A0A0A]/55">
                {c.items.slice(0, 5).map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
