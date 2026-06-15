"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content/types";
import { track } from "@/lib/track";

const Publication = dynamic(() => import("@/components/Publication"), { ssr: false });

export default function PublicationLoader({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initialContent);

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).has("preview");
    if (!preview) {
      track("page_view");
      return;
    }
    // Live-preview mode: accept draft content from the admin editor (same-origin parent).
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === "nn-preview" && e.data.content) setContent(e.data.content as SiteContent);
      if (e.data?.type === "nn-scroll" && e.data.anchor) {
        const el = document.querySelector(e.data.anchor as string);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("message", onMsg);
    window.parent?.postMessage({ type: "nn-preview-ready" }, window.location.origin);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return <Publication initialContent={content} />;
}
