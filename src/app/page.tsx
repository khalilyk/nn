import { getSiteContent } from "@/lib/content/get";
import PublicationLoader from "@/components/PublicationLoader";

// Always read the latest published content (cheap single query; falls back to defaults).
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();
  return <PublicationLoader initialContent={content} />;
}
