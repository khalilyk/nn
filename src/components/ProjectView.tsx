import type { Project, SiteContent } from "@/lib/content/types";
import { slugify } from "@/lib/slug";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import Cursor from "./Cursor";
import Grain from "./Grain";

/** A single project's own page: hero, story, full gallery, and next/back links. */
export default function ProjectView({ project, content }: { project: Project; content: SiteContent }) {
  const cover = project.images?.[0] ?? project.img;
  const gallery = (project.images && project.images.length ? project.images : [project.img]).filter(Boolean);
  const rest = gallery.slice(1); // hero already shows the first image

  const body = project.desc.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  // find the next project in the list for the footer link
  const idx = content.projects.findIndex((p) => p.name === project.name);
  const next = content.projects[(idx + 1) % content.projects.length];

  return (
    <div className="relative bg-[#0A0A0A] text-[#F3F1EC] overflow-x-clip">
      <Cursor />
      <Grain />
      <SiteNav links={content.nav} footer={content.footer} />

      <main>
        {/* hero */}
        <section className="relative h-[74vh] min-h-[440px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${cover}')` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-[#0A0A0A]/40" />
          <div className="absolute inset-x-0 bottom-0 px-8 md:px-16 pb-12 md:pb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]/60 mb-4">
              {project.cat} · {project.city} · {project.year}
            </p>
            <h1 className="font-sans font-bold uppercase tracking-tight leading-[0.95]" style={{ fontSize: "clamp(2.4rem, 7vw, 6rem)" }}>
              {project.name}
            </h1>
            <p className="font-editorial italic text-[#F3F1EC]/70 mt-4" style={{ fontSize: "clamp(1.15rem, 2vw, 1.8rem)" }}>
              {project.sub}
            </p>
          </div>
        </section>

        {/* story */}
        <section className="px-8 md:px-16 py-20 md:py-28">
          <div className="max-w-3xl space-y-6 text-[15px] md:text-[17px] leading-relaxed text-[#F3F1EC]/75">
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* gallery */}
        {rest.length > 0 && (
          <section className="px-4 md:px-6 pb-20 md:pb-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
              {rest.map((src, i) => {
                const full = i % 3 === 2; // every third image spans full width
                return (
                  <div
                    key={src + i}
                    className={`relative overflow-hidden bg-[#111] ${full ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
                  >
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${src}')` }} />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* nav */}
        <section className="px-8 md:px-16 pb-24 md:pb-32 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-t border-white/10 pt-12">
          <a href="/projects" className="group inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase hover:opacity-60 transition-opacity">
            <span className="transition-transform group-hover:-translate-x-0.5">←</span> All projects
          </a>
          {next && next.name !== project.name && (
            <a href={`/projects/${slugify(next.name)}`} className="group inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase hover:opacity-60 transition-opacity">
              Next: {next.name} <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          )}
        </section>
      </main>

      {/* white "start from scratch" CTA band */}
      <section className="bg-white text-[#0A0A0A] px-8 md:px-16 py-20 md:py-28">
        <div className="w-full flex flex-col items-center text-center">
          <h2 className="font-sans font-bold uppercase leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)" }}>
            Starting from scratch?
          </h2>
          <p className="mt-6 max-w-xl text-[15px] md:text-[17px] leading-relaxed text-[#0A0A0A]/60">
            We&apos;ll build your brand from the ground up. Identity, strategy, story, the whole thing.
          </p>
          <a
            href="/contact"
            className="group mt-9 inline-flex items-center gap-3 text-[12px] tracking-[0.2em] uppercase font-bold border-b-2 border-[#0A0A0A] pb-1.5 hover:opacity-60 transition-opacity"
          >
            Let&apos;s get started <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </section>

      <SiteFooter footer={content.footer} />
    </div>
  );
}
