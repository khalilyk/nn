"use client";

import { useState } from "react";
import Field from "./Field";
import type { SiteContent } from "@/lib/content/types";

export default function SectionEditor({
  initial,
  sectionKey,
  label,
}: {
  initial: SiteContent;
  sectionKey: keyof SiteContent;
  label: string;
}) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

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
    <div className="pb-28">
      <h1 className="text-[22px] font-semibold text-[#0A0A0A] mb-1">{label}</h1>
      <p className="text-[13px] text-[#0A0A0A]/50 mb-6">Edit this section, then Publish.</p>

      <div className="rounded-3xl bg-white shadow-sm p-5 md:p-7">
        <Field k={sectionKey} value={content[sectionKey]} onChange={(v) => setContent((c) => ({ ...c, [sectionKey]: v }))} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-t border-black/10 px-6 py-3 flex items-center justify-end gap-4">
        <span className="text-[13px] text-black/55">
          {status === "saving" && "Publishing…"}
          {status === "saved" && "Published ✓"}
          {status === "error" && "Save failed — is the database connected?"}
        </span>
        <button
          onClick={save}
          disabled={status === "saving"}
          className="rounded-full bg-[#1C1C1C] text-white px-7 py-2.5 text-[12px] tracking-[0.15em] uppercase font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
