import type { Project } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";
import { slugify } from "@/lib/slug";

/**
 * Projects as a bento grid of image tiles — a full-width tile followed by two
 * squares, repeating. Each tile links to that project's own page.
 */
export default function ProjectsBento({ projects = DEFAULT_CONTENT.projects }: { projects?: Project[] }) {
  return (
    <div className="w-full text-[#F3F1EC] select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
        {projects.map((pr, i) => {
          const wide = i % 3 === 0; // full-width lead tile, then two squares
          const cover = pr.images?.[0] ?? pr.img;
          return (
            <a
              key={pr.name}
              href={`/projects/${slugify(pr.name)}`}
              data-cursor="Open"
              className={`group relative block overflow-hidden bg-[#0A0A0A] text-left ${wide ? "md:col-span-2 aspect-[16/10] md:aspect-[21/9]" : "aspect-[4/3] md:aspect-square"}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                style={{ backgroundImage: `url('${cover}')` }}
              />
              {/* legibility scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-[#0A0A0A]/10 to-transparent" />

              {/* content, centred */}
              <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-8 md:pb-10">
                <p className="text-[9px] md:text-[10px] tracking-[0.28em] uppercase text-[#F3F1EC]/70 mb-2">{pr.sub || pr.cat}</p>
                <p className="font-sans font-medium leading-tight" style={{ fontSize: wide ? "clamp(1.4rem, 3vw, 2.4rem)" : "clamp(1.15rem, 2vw, 1.6rem)" }}>
                  {pr.name}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
