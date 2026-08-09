import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/get";
import { SITE_URL } from "@/lib/site-url";
import { slugify } from "@/lib/slug";
import ProjectView from "@/components/ProjectView";

export const dynamic = "force-dynamic";

/** Trim a body to a clean ~160-char meta description on a word boundary. */
function metaDesc(text: string): string {
  const first = (text || "").split(/\n\n+/)[0].replace(/\s+/g, " ").trim();
  if (first.length <= 160) return first;
  return first.slice(0, 157).replace(/\s+\S*$/, "") + "…";
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = await getSiteContent();
  const project = content.projects.find((p) => slugify(p.name) === slug);
  if (!project) return { title: "Project not found", robots: { index: false, follow: false } };
  const desc = metaDesc(project.desc);
  const img = project.images?.[0] ?? project.img;
  const title = `${project.name}${project.cat ? `, ${project.cat}` : ""}`;
  return {
    title,
    description: desc,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.name} · Not Normal`,
      description: desc,
      url: `/projects/${slug}`,
      type: "article",
      images: [{ url: img, alt: `${project.name}, Not Normal` }],
    },
    twitter: { card: "summary_large_image", title: `${project.name} · Not Normal`, description: desc, images: [img] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getSiteContent();
  const project = content.projects.find((p) => slugify(p.name) === slug);
  if (!project) notFound();
  const base = SITE_URL;
  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.name,
    description: metaDesc(project.desc),
    url: `${base}/projects/${slug}`,
    image: (project.images?.length ? project.images : [project.img]).map((i) => (i.startsWith("http") ? i : `${base}${i}`)),
    genre: project.cat,
    creator: { "@type": "Organization", name: "Not Normal", url: base },
    ...(project.city ? { locationCreated: project.city } : {}),
    ...(project.year ? { dateCreated: String(project.year) } : {}),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ProjectView project={project} content={content} />
    </>
  );
}
