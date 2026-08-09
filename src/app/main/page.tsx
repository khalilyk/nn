import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/get";
import PublicationLoader from "@/components/PublicationLoader";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteContent();
  const title = "Studio, Services & Work";
  const description = "Our services, selected work and how to start a project, hospitality branding, web, print and PR from Sydney, Dubai and Beirut.";
  return {
    title,
    description,
    alternates: { canonical: "/main" },
    openGraph: { title: `${title} · Not Normal`, description, url: "/main", images: [{ url: seo.ogImage || "/nn-header-poster.jpg", width: 1920, height: 1080 }] },
    twitter: { card: "summary_large_image", title: `${title} · Not Normal`, description },
  };
}

export default async function Page() {
  const content = await getSiteContent();
  return <PublicationLoader initialContent={content} show={["manifesto","menu","projects","contact","footer"]} />;
}
