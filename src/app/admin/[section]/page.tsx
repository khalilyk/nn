import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content/get";
import { SECTIONS } from "@/lib/content/sections";
import type { SiteContent } from "@/lib/content/types";
import SectionEditor from "@/components/admin/SectionEditor";

export const dynamic = "force-dynamic";

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const match = SECTIONS.find((s) => s.key === section);
  if (!match) notFound();
  const content = await getSiteContent();
  return <SectionEditor initial={content} sectionKey={match.key as keyof SiteContent} label={match.label} />;
}
