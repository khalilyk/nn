import { getSiteContent } from "@/lib/content/get";
import SeoEditor from "@/components/admin/SeoEditor";

export const dynamic = "force-dynamic";

export default async function SeoPage() {
  const content = await getSiteContent();
  return <SeoEditor content={content} />;
}
