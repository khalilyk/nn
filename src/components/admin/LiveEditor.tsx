"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Field from "./Field";
import { SECTIONS } from "@/lib/content/sections";
import type { SiteContent } from "@/lib/content/types";

export default function LiveEditor({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [active, setActive] = useState<keyof SiteContent>("hero");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [ready, setReady] = useState(false);
  const iframe = useRef<HTMLIFrameElement>(null);

  // when the preview iframe says it's ready, push current content
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === "nn-preview-ready") setReady(true);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // push content to the preview whenever it changes (debounced)
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => {
      iframe.current?.contentWindow?.postMessage({ type: "nn-preview", content }, window.location.origin);
    }, 120);
    return () => clearTimeout(id);
  }, [content, ready]);

  const save = async () => {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      setStatus(res.ok ? "saved" : "error");
      if (res.ok) setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#E8E8EA]" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* top bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white border-b border-black/10">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="rounded-full bg-[#F1F1F3] hover:bg-[#E6E6E9] px-4 py-2 text-[12px] text-[#0A0A0A]/70 transition-colors">← Exit</Link>
          <span className="font-semibold text-[14px] text-[#0A0A0A]">Live editor</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-black/55">
            {status === "saving" && "Publishing…"}
            {status === "saved" && "Published ✓"}
            {status === "error" && "Save failed — is the database connected?"}
          </span>
          <button onClick={save} disabled={status === "saving"} className="rounded-full bg-[#0A0A0A] text-white px-6 py-2.5 text-[12px] tracking-[0.15em] uppercase font-medium hover:opacity-80 transition-opacity disabled:opacity-50">
            Publish
          </button>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* editor panel */}
        <div className="w-[340px] shrink-0 flex flex-col border-r border-black/10 bg-white">
          <div className="p-3 border-b border-black/10">
            <select
              value={active}
              onChange={(e) => setActive(e.target.value as keyof SiteContent)}
              className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#0A0A0A]"
            >
              {SECTIONS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 overflow-y-auto p-3 text-[#0A0A0A]">
            <Field k={active} value={content[active]} onChange={(v) => setContent((c) => ({ ...c, [active]: v }))} />
          </div>
        </div>

        {/* live preview */}
        <div className="flex-1 min-w-0 bg-[#D9DBDD] p-4">
          <iframe
            ref={iframe}
            src="/?preview=1"
            className="w-full h-full rounded-xl bg-white shadow-lg border border-black/10"
            title="Live preview"
          />
        </div>
      </div>
    </div>
  );
}
