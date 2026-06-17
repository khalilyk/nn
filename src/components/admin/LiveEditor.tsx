"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Field from "./Field";
import NotesEditor from "./NotesEditor";
import { SECTIONS } from "@/lib/content/sections";
import type { SiteContent, Notes } from "@/lib/content/types";

export default function LiveEditor({ initial, initialSection = "hero" }: { initial: SiteContent; initialSection?: keyof SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [active, setActive] = useState<keyof SiteContent>(initialSection);
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

  // scroll the preview to the section being edited
  const ANCHORS: Record<string, string> = {
    hero: "#top", menu: "#s02", about: "#about", projects: "#s04",
    notes: "#journal", contact: "#contact", footer: "#footer", nav: "#top",
  };
  useEffect(() => {
    if (!ready) return;
    const anchor = ANCHORS[active as string];
    if (!anchor) return;
    const id = setTimeout(() => {
      iframe.current?.contentWindow?.postMessage({ type: "nn-scroll", anchor }, window.location.origin);
    }, 200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ready]);

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

  const activeLabel = SECTIONS.find((s) => s.key === active)?.label ?? "Section";

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#EFEFF1]" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* top bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white border-b border-black/[0.08]">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/admin" className="rounded-full bg-[#F1F1F3] hover:bg-[#E6E6E9] px-3.5 py-2 text-[12px] text-[#0A0A0A]/70 transition-colors shrink-0">← Exit</Link>
          <span className="text-[13px] text-black/40 truncate">Editor <span className="text-black/25 px-1">/</span> <span className="text-[#0A0A0A] font-medium">{activeLabel}</span></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-black/55">
            {status === "saving" && "Publishing…"}
            {status === "saved" && "Published ✓"}
            {status === "error" && "Save failed — is the database connected?"}
          </span>
          <button onClick={save} disabled={status === "saving"} className="rounded-full bg-[#0A0A0A] text-white px-6 py-2.5 text-[12px] tracking-[0.12em] uppercase font-medium hover:opacity-80 transition-opacity disabled:opacity-50">
            Save &amp; Publish
          </button>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* section nav rail */}
        <nav className="w-[190px] shrink-0 border-r border-black/[0.08] bg-white overflow-y-auto py-3 px-2.5">
          <p className="px-2.5 pb-2 text-[10px] tracking-[0.16em] uppercase text-black/35">Sections</p>
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`block w-full text-left px-2.5 py-2 rounded-lg text-[13px] transition-colors ${active === s.key ? "bg-[#0A0A0A] text-white" : "text-[#0A0A0A]/70 hover:bg-black/[0.05]"}`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* document-style editor */}
        <div className="w-[480px] shrink-0 overflow-y-auto p-6 text-[#0A0A0A] border-r border-black/[0.08]">
          <div className="mx-auto max-w-[420px]">
            <div className="mb-5">
              <h1 className="text-[22px] font-semibold tracking-tight text-[#0A0A0A]">{activeLabel}</h1>
              <p className="text-[12.5px] text-black/45 mt-1">Edit the fields below. Use the ✦ button on any text to rewrite it with AI. Changes preview live on the right.</p>
            </div>
            <div className="rounded-2xl bg-white shadow-sm border border-black/[0.06] p-5">
              {active === "notes" ? (
                <NotesEditor value={content.notes} onChange={(n: Notes) => setContent((c) => ({ ...c, notes: n }))} />
              ) : (
                <Field k={active} value={content[active]} onChange={(v) => setContent((c) => ({ ...c, [active]: v }))} />
              )}
            </div>
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
