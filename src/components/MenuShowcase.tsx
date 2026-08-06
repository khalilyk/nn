import type { Menu } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/**
 * The Menu — each service told like a case-study "The Challenge" block: a
 * centred serif heading with an italic accent (the course name), a single tall
 * photo, then handwritten copy (Kalam) with the service circled by a hand-drawn
 * ellipse. Stacked on paper, scrolls vertically.
 */
export default function MenuShowcase({ menu = DEFAULT_CONTENT.menu }: { menu?: Menu }) {
  const imgs = menu.gallery ?? [];
  return (
    <div className="bg-[#F1ECE1] text-[#1a1a1a] px-6 md:px-16 pt-28 md:pt-36 pb-10">
      {menu.courses.map((c, i) => {
        const parts = c.course.split(" ");
        const first = parts.shift();
        const rest = parts.join(" ");
        return (
          <section key={c.title} className="max-w-3xl mx-auto py-16 md:py-24 border-t border-[#1a1a1a]/10 first:border-t-0">
            <h3 className="font-editorial text-center leading-[1.05]" style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)" }}>
              {first} <span className="italic">{rest}</span>
            </h3>

            {/* photo */}
            <div className="mt-10 md:mt-14 w-full max-w-md mx-auto aspect-[3/4] overflow-hidden bg-[#e4ddcd] shadow-[0_26px_60px_-30px_rgba(0,0,0,0.6)]">
              {imgs.length > 0 && (
                <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${imgs[i % imgs.length]}')` }} />
              )}
            </div>

            {/* handwritten copy */}
            <div className="font-kalam mt-10 max-w-xl mx-auto text-[17px] md:text-[19px] leading-[1.9]">
              <p>
                {c.items.slice(0, -1).join(", ")}
                {c.items.length > 1 ? ", and " : ""}
                {c.items[c.items.length - 1]?.toLowerCase()}.
              </p>

              {/* circled service title */}
              <div className="relative mt-8 inline-block px-3">
                <span className="relative z-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>{c.title}</span>
                <svg
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2"
                  style={{ width: "112%", height: "220%", marginLeft: "-6%" }}
                  viewBox="0 0 200 70"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M20,36 C22,16 66,8 104,9 C154,10 190,18 188,36 C186,54 146,62 100,61 C52,60 16,54 14,38"
                    stroke="#1a1a1a"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
