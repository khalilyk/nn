import type { Menu } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/** grey → black, so the last slide merges into the dark projects section below */
const SHADES = [
  { bg: "#EDEBE4", fg: "#0A0A0A" },
  { bg: "#B9B7B1", fg: "#0A0A0A" },
  { bg: "#575652", fg: "#F1EFEA" },
  { bg: "#161616", fg: "#F1EFEA" },
];

/**
 * The Menu — each service is a full-screen editorial slide (à la "HIRE THE BEST
 * TEAM_"): an oversized bold heading with a blinking cursor and a stacked
 * monospace service list. The backgrounds step from grey to black so the
 * section merges into the dark projects grid below.
 */
export default function MenuShowcase({ menu = DEFAULT_CONTENT.menu }: { menu?: Menu }) {
  return (
    <div>
      {menu.courses.map((c, i) => {
        const shade = SHADES[i % SHADES.length];
        return (
          <section
            key={c.title}
            className="relative min-h-screen flex items-center px-8 md:px-16"
            style={{ backgroundColor: shade.bg, color: shade.fg }}
          >
            {/* monospace list, top-right */}
            <div className="font-spacemono absolute top-28 md:top-36 right-8 md:right-16 text-left max-w-[18rem] text-[12px] md:text-[13px] leading-relaxed opacity-75">
              <p className="mb-3 opacity-60">/ {c.course}</p>
              {c.items.map((it) => (
                <p key={it}>{it}</p>
              ))}
            </div>

            {/* oversized heading, lower-left */}
            <h2 className="font-sans font-bold uppercase leading-[0.9] tracking-tight max-w-[11ch]" style={{ fontSize: "clamp(2.6rem, 10vw, 8rem)" }}>
              {c.title}
              <span className="text-[#FF5C1A] animate-pulse">_</span>
            </h2>
          </section>
        );
      })}
    </div>
  );
}
