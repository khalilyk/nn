import type { Menu } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/**
 * The Menu as an editorial filmstrip — each service is a card with a small
 * vertical caption, a big serif title, an image and its key deliverables
 * (inspired by magazine portfolio layouts). Scrolls horizontally.
 */
export default function MenuEditorial({ menu = DEFAULT_CONTENT.menu }: { menu?: Menu }) {
  const imgs = menu.gallery ?? [];
  return (
    <div className="flex gap-10 md:gap-20 overflow-x-auto pb-6 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-cursor="Scroll">
      {menu.courses.map((c, i) => (
        <article key={c.title} className={`snap-start shrink-0 w-[80vw] sm:w-[400px] md:w-[440px] ${i % 2 ? "md:mt-28" : ""}`}>
          <div className="flex gap-4 md:gap-6">
            {/* vertical caption */}
            <span
              className="hidden md:block shrink-0 self-end text-[10px] tracking-[0.18em] uppercase text-[#0A0A0A]/45"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              ({String(i + 1).padStart(3, "0")}) {c.course}
            </span>

            <div className="flex-1 min-w-0">
              <h3 className="font-editorial leading-[0.98]" style={{ fontSize: "clamp(2rem, 3.4vw, 3.2rem)" }}>
                {c.title}
              </h3>
              <div className="group relative mt-6 aspect-[4/5] overflow-hidden bg-[#e9e6df]">
                {imgs.length > 0 && (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    style={{ backgroundImage: `url('${imgs[i % imgs.length]}')` }}
                  />
                )}
              </div>
              <ul className="mt-5 space-y-1.5 text-[12px] leading-relaxed text-[#0A0A0A]/55">
                {c.items.slice(0, 5).map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
