"use client";

import { useState } from "react";
import Field from "./Field";
import type { SiteContent } from "@/lib/content/types";

const SECTIONS: { key: keyof SiteContent; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "menu", label: "Menu / Services" },
  { key: "about", label: "About / Founder" },
  { key: "projects", label: "Projects (Works)" },
  { key: "testimonials", label: "Testimonials" },
  { key: "notes", label: "Notes" },
  { key: "contact", label: "Contact" },
  { key: "nav", label: "Navigation" },
  { key: "footer", label: "Footer & Legal" },
];

export default function ContentEditor({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [open, setOpen] = useState<string | null>("hero");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const update = (key: keyof SiteContent, value: unknown) =>
    setContent((c) => ({ ...c, [key]: value }));

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
    <div className="pb-32">
      {SECTIONS.map(({ key, label }) => {
        const isOpen = open === key;
        return (
          <div key={key} className="border-b border-black/10">
            <button
              onClick={() => setOpen(isOpen ? null : key)}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <span className="font-medium text-[15px]">{label}</span>
              <span className="text-black/40">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen && (
              <div className="pb-6">
                <Field k={key} value={content[key]} onChange={(v) => update(key, v)} />
              </div>
            )}
          </div>
        );
      })}

      {/* sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-black/10 px-6 py-3 flex items-center justify-end gap-4">
        <span className="text-[13px] text-black/50">
          {status === "saving" && "Saving…"}
          {status === "saved" && "Published ✓"}
          {status === "error" && "Save failed — is the database connected?"}
        </span>
        <button
          onClick={save}
          disabled={status === "saving"}
          className="rounded-full bg-black text-white px-6 py-2.5 text-[12px] tracking-[0.15em] uppercase font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
