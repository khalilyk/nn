import { getSiteContent } from "@/lib/content/get";
import ProjectsManager from "@/components/admin/ProjectsManager";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const content = await getSiteContent();
  return <ProjectsManager content={content} />;
}
