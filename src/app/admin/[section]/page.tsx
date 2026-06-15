import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content/get";
import { SECTIONS } from "@/lib/content/sections";
import type { SiteContent } from "@/lib/content/types";
import LiveEditor from "@/components/admin/LiveEditor";

export const dynamic = "force-dynamic";

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const match = SECTIONS.find((s) => s.key === section);
  if (!match) notFound();
  const content = await getSiteContent();
  return <LiveEditor initial={content} initialSection={match.key as keyof SiteContent} />;
}
