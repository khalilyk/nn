"use client";

import dynamic from "next/dynamic";
import type { SiteContent } from "@/lib/content/types";

const Publication = dynamic(() => import("@/components/Publication"), { ssr: false });

export default function PublicationLoader({ initialContent }: { initialContent: SiteContent }) {
  return <Publication initialContent={initialContent} />;
}
