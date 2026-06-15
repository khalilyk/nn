import { getSiteContent } from "@/lib/content/get";
import LiveEditor from "@/components/admin/LiveEditor";

export const dynamic = "force-dynamic";

export default async function PreviewPage() {
  const content = await getSiteContent();
  return <LiveEditor initial={content} />;
}
