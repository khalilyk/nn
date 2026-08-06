import type { Menu } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/**
 * The Menu — each service is a full-screen editorial slide (à la "HIRE THE BEST
 * TEAM_"): an oversized bold heading with a blinking cursor, and a small
 * monospace blurb top-right. Stacked full-viewport sections; scroll through them.
 */
export default function MenuShowcase({ menu = DEFAULT_CONTENT.menu }: { menu?: Menu }) {
  return (
    <div className="bg-[#F1EFEA] text-[#0A0A0A]">
      {menu.courses.map((c) => (
        <section key={c.title} className="relative min-h-screen flex items-center px-8 md:px-16">
          {/* monospace blurb, top-right */}
          <div className="font-spacemono absolute top-28 md:top-36 right-8 md:right-16 text-left max-w-[18rem] text-[12px] md:text-[13px] leading-relaxed text-[#0A0A0A]/70">
            <p className="mb-3 text-[#0A0A0A]/40">/ {c.course}</p>
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
      ))}
    </div>
  );
}
