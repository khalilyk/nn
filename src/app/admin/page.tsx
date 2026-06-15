import { getSiteContent } from "@/lib/content/get";
import ContentEditor from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getSiteContent();
  return (
    <>
      <h1 className="text-[22px] font-bold mb-1">Edit content</h1>
      <p className="text-[13px] text-black/50 mb-6">Make changes, then Publish. The live site updates immediately.</p>
      <ContentEditor initial={content} />
    </>
  );
}
