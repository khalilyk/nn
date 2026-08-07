import type { Menu } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";
import PixelBg from "./PixelBg";

/**
 * The Menu — each service is a full-screen editorial slide ("HIRE THE BEST
 * TEAM_" style) over an interactive cubic/pixel gradient background that follows
 * the cursor. The gradient is sticky so it stays put while the slides scroll,
 * and fades to near-black at the edges so it merges into the projects below.
 */
export default function MenuShowcase({ menu = DEFAULT_CONTENT.menu }: { menu?: Menu }) {
  return (
    <div data-pixel-scope data-cursor-hide className="relative bg-[#0A0A0A] text-[#F1EFEA]">
      {/* interactive pixel gradient, pinned behind the scrolling slides */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0" style={{ marginBottom: "-100vh" }}>
        <PixelBg className="absolute inset-0 h-full w-full" />
      </div>
      {/* fade the pixel grid IN from black at the top so there's no hard grid
          edge where it meets the white manifesto above */}
      <div aria-hidden className="pointer-events-none absolute top-0 inset-x-0 h-[45vh] z-[5] bg-gradient-to-b from-[#0A0A0A] to-transparent" />
      {/* fade the last slide into black so it merges into the projects grid */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 h-[85vh] z-[5] bg-gradient-to-b from-transparent to-[#0A0A0A]" />

      {menu.courses.map((c) => (
        <section key={c.title} className="relative z-10 min-h-screen flex items-center px-8 md:px-16">
          {/* monospace list, top-right */}
          <div className="font-spacemono absolute top-28 md:top-36 right-8 md:right-16 text-left max-w-[18rem] text-[12px] md:text-[13px] leading-relaxed opacity-80">
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
      ))}
    </div>
  );
}
