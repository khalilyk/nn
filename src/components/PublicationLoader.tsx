"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import type { SiteContent } from "@/lib/content/types";
import { track } from "@/lib/track";

const Publication = dynamic(() => import("@/components/Publication"), { ssr: false });

export default function PublicationLoader({ initialContent }: { initialContent: SiteContent }) {
  useEffect(() => { track("page_view"); }, []);
  return <Publication initialContent={initialContent} />;
}
