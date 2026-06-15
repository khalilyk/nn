import { getSiteContent } from "@/lib/content/get";
import ContentEditor from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default async function AdminPage() {
  const content = await getSiteContent();
  const stats = [
    { label: "Projects", value: content.projects.length },
    { label: "Notes", value: content.notes.posts.length },
    { label: "Testimonials", value: content.testimonials.length },
    { label: "Menu items", value: content.menu.courses.reduce((n, c) => n + c.items.length, 0) },
  ];
  return <ContentEditor initial={content} greeting={greeting()} stats={stats} />;
}
