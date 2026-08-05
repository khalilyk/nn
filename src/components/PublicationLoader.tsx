"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content/types";
import { track } from "@/lib/track";
import GlitchLoader from "@/components/GlitchLoader";

const Publication = dynamic(() => import("@/components/Publication"), { ssr: false });

export default function PublicationLoader({ initialContent, show }: { initialContent: SiteContent; show?: string[] }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [loading, setLoading] = useState(true);

  // glitch loading screen — once per session, never in the admin live-preview iframe.
  // Ends as soon as the page is actually ready (window load), with a brief minimum
  // so the glitch is visible, and a hard cap so it never overstays.
  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).has("preview");
    if (preview || sessionStorage.getItem("nn-loaded")) { setLoading(false); return; }

    const MIN = 1200; // keep the glitch on screen at least this long
    const CAP = 2500; // never block longer than this
    const start = performance.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setLoading(false);
      sessionStorage.setItem("nn-loaded", "1");
    };
    const ready = () => {
      const wait = Math.max(0, MIN - (performance.now() - start));
      setTimeout(finish, wait);
    };

    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });
    const cap = setTimeout(finish, CAP);

    return () => { window.removeEventListener("load", ready); clearTimeout(cap); };
  }, []);

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

  return (
    <>
      {loading && <GlitchLoader />}
      <Publication initialContent={content} show={show} />
    </>
  );
}
