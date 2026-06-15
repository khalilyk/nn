"use client";

import { useState } from "react";
import Field from "./Field";
import type { SiteContent } from "@/lib/content/types";

const SECTIONS: { key: keyof SiteContent; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "menu", label: "Menu" },
  { key: "about", label: "About" },
  { key: "projects", label: "Projects" },
  { key: "testimonials", label: "Testimonials" },
  { key: "notes", label: "Notes" },
  { key: "contact", label: "Contact" },
  { key: "nav", label: "Navigation" },
  { key: "footer", label: "Footer" },
];

export default function ContentEditor({
  initial,
  greeting,
  stats,
}: {
  initial: SiteContent;
  greeting: string;
  stats: { label: string; value: number }[];
}) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [active, setActive] = useState<keyof SiteContent>("hero");
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
      {/* greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4 pt-2 pb-7">
        <h1 className="text-[#0A0A0A]" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
          {greeting}, <span className="text-[#0A0A0A]/45">Nixtio</span>
        </h1>
        <p className="text-[13px] text-[#0A0A0A]/50">Edit your site, then hit Publish.</p>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
        {stats.map((s, i) => (
          <div key={s.label} className={`rounded-2xl p-4 ${i === 1 ? "bg-[#F4C84B]" : "bg-white/70"}`}>
            <div className="text-[28px] font-semibold leading-none text-[#0A0A0A]">{s.value}</div>
            <div className="mt-2 text-[11px] tracking-[0.12em] uppercase text-[#0A0A0A]/55">{s.label}</div>
          </div>
        ))}
      </div>

      {/* section tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`rounded-full px-4 py-2 text-[13px] transition-colors ${
              active === s.key ? "bg-[#1C1C1C] text-white" : "bg-white/60 text-[#0A0A0A]/70 hover:bg-white"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* editor card */}
      <div className="rounded-3xl bg-white/70 p-5 md:p-7">
        <h2 className="text-[15px] font-semibold mb-5 text-[#0A0A0A]">
          {SECTIONS.find((s) => s.key === active)?.label}
        </h2>
        <Field k={active} value={content[active]} onChange={(v) => update(active, v)} />
      </div>

      {/* sticky publish bar */}
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
