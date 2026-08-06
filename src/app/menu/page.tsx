import { getSiteContent } from "@/lib/content/get";
import PublicationLoader from "@/components/PublicationLoader";

export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await getSiteContent();
  return <PublicationLoader initialContent={content} show={["menu","brands","cta","footer"]} />;
}
