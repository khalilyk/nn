import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/get";
import { slugify } from "@/lib/slug";
import ProjectView from "@/components/ProjectView";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = await getSiteContent();
  const project = content.projects.find((p) => slugify(p.name) === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — Not Normal`,
    description: project.desc,
    openGraph: { title: `${project.name} — Not Normal`, description: project.desc, images: [project.images?.[0] ?? project.img] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getSiteContent();
  const project = content.projects.find((p) => slugify(p.name) === slug);
  if (!project) notFound();
  return <ProjectView project={project} content={content} />;
}
