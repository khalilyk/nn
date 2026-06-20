"use client";

import { useMemo, useState } from "react";
import type { SiteContent, Seo } from "@/lib/content/types";

type Status = "good" | "warn" | "todo";
const DOT: Record<Status, string> = { good: "bg-[#1f9d55]", warn: "bg-[#E0A800]", todo: "bg-[#c0392b]" };
const LABEL: Record<Status, string> = { good: "Good", warn: "Improve", todo: "To do" };

function Counter({ value, min, max }: { value: number; min: number; max: number }) {
  const status: Status = value === 0 ? "todo" : value < min || value > max ? "warn" : "good";
  return (
    <span className={`text-[11px] tabular-nums ${status === "good" ? "text-[#1f9d55]" : status === "warn" ? "text-[#E0A800]" : "text-black/40"}`}>
      {value}/{max}
    </span>
  );
}

// Best-practice recommendations for a hospitality branding studio
const REC = {
  title: "Hospitality Branding Studio — Not Normal | Sydney & Dubai",
  description:
    "Hospitality branding & marketing studio crafting restaurant and café brands that refuse to blend in. Strategy, identity & content — Sydney, Dubai, Beirut.",
  keywords:
    "hospitality branding, restaurant branding, café branding, brand strategy, brand identity, marketing studio, Sydney, Dubai, Beirut",
};

function Suggestion({ rec, current, onApply }: { rec: string; current: string; onApply: () => void }) {
  if (current.trim() === rec.trim()) return null;
  return (
    <div className="mt-2 flex items-start gap-2 rounded-lg bg-[#F4F7FF] border border-[#2D6BFF]/15 px-3 py-2">
      <span className="text-[12px] shrink-0">💡</span>
      <p className="text-[11px] leading-relaxed text-[#0A0A0A]/70 flex-1 min-w-0">
        <span className="font-medium text-[#2D6BFF]">Recommended</span> ({rec.trim().length} chars): {rec}
      </p>
      <button onClick={onApply} className="shrink-0 text-[10px] tracking-wide uppercase rounded-full bg-[#2D6BFF] text-white px-2.5 py-1 hover:opacity-85 transition-opacity">Apply</button>
    </div>
  );
}

export default function SeoEditor({ content }: { content: SiteContent }) {
  const [seo, setSeo] = useState<Seo>(content.seo);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const set = (k: keyof Seo, v: string) => { setSeo((s) => ({ ...s, [k]: v })); setSaved(false); };

  const uploadOg = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData(); fd.append("file", file);
      const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const d = await r.json();
      if (d.url) set("ogImage", d.url);
    } finally { setUploading(false); }
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...content, seo }),
      });
      if (res.ok) { setSaved(true); }
    } finally { setSaving(false); }
  };

  const checklist = useMemo<{ label: string; status: Status; tip: string }[]>(() => {
    const t = seo.title.trim().length;
    const d = seo.description.trim().length;
    return [
      { label: "Page title", status: t === 0 ? "todo" : t < 30 || t > 60 ? "warn" : "good", tip: "Aim for 30–60 characters so it isn't truncated in search results." },
      { label: "Meta description", status: d === 0 ? "todo" : d < 70 || d > 160 ? "warn" : "good", tip: "Aim for 70–160 characters — a compelling summary with a hook." },
      { label: "Keywords", status: seo.keywords.trim() ? "good" : "warn", tip: "Comma-separated terms you want to rank for. Minor ranking signal but useful internally." },
      { label: "Social share image (OG)", status: seo.ogImage.trim() ? "good" : "todo", tip: "Shown when the link is shared on social/Slack. 1200×630 recommended." },
      { label: "Favicon", status: "good", tip: "The NN smiley is set as the site favicon." },
      { label: "Sitemap (/sitemap.xml)", status: "good", tip: "Generated automatically and referenced from robots.txt." },
      { label: "robots.txt", status: "good", tip: "Allows crawling of the public site; blocks /admin, /api, /login." },
      { label: "Canonical URL", status: "good", tip: "Set to the homepage to avoid duplicate-content issues." },
    ];
  }, [seo]);

  const todo = checklist.filter((c) => c.status !== "good").length;

  return (
    <div className="space-y-3">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[#0A0A0A]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>SEO</h1>
          <p className="text-[12px] text-black/45 mt-1">Edit how the site appears in search & social, and track what still needs attention.</p>
        </div>
        <button onClick={save} disabled={saving} className="rounded-full bg-[#0A0A0A] text-white px-5 py-2.5 text-[12px] tracking-[0.12em] uppercase hover:opacity-80 transition-opacity disabled:opacity-50">
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save & publish"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* editor */}
        <div className="rounded-3xl bg-white shadow-sm p-5 space-y-5">
          <label className="block">
            <span className="flex items-center justify-between mb-1.5"><span className="text-[10px] tracking-[0.16em] uppercase text-black/40">Page title</span><Counter value={seo.title.trim().length} min={30} max={60} /></span>
            <input value={seo.title} onChange={(e) => set("title", e.target.value)} className="w-full bg-transparent border-b border-black/15 pb-2 text-[15px] text-[#0A0A0A] outline-none focus:border-black/50 transition-colors" />
            <Suggestion rec={REC.title} current={seo.title} onApply={() => set("title", REC.title)} />
          </label>
          <label className="block">
            <span className="flex items-center justify-between mb-1.5"><span className="text-[10px] tracking-[0.16em] uppercase text-black/40">Meta description</span><Counter value={seo.description.trim().length} min={70} max={160} /></span>
            <textarea value={seo.description} onChange={(e) => set("description", e.target.value)} rows={3} className="w-full bg-transparent border-b border-black/15 pb-2 text-[14px] leading-relaxed text-[#0A0A0A] outline-none focus:border-black/50 transition-colors resize-none" />
            <Suggestion rec={REC.description} current={seo.description} onApply={() => set("description", REC.description)} />
          </label>
          <label className="block">
            <span className="block text-[10px] tracking-[0.16em] uppercase text-black/40 mb-1.5">Keywords</span>
            <input value={seo.keywords} onChange={(e) => set("keywords", e.target.value)} placeholder="comma, separated, terms" className="w-full bg-transparent border-b border-black/15 pb-2 text-[14px] text-[#0A0A0A] outline-none focus:border-black/50 transition-colors" />
            <Suggestion rec={REC.keywords} current={seo.keywords} onApply={() => set("keywords", REC.keywords)} />
          </label>

          {/* OG image — upload or paste a URL */}
          <div>
            <span className="block text-[10px] tracking-[0.16em] uppercase text-black/40 mb-1.5">Social share image (OG)</span>
            <div className="flex items-start gap-3">
              <label className="group/og relative block w-28 h-[59px] shrink-0 rounded-lg overflow-hidden border border-black/10 bg-black/[0.02] cursor-pointer">
                {seo.ogImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={seo.ogImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="absolute inset-0 grid place-items-center text-[10px] text-black/40">No image</span>
                )}
                <span className="absolute inset-0 grid place-items-center bg-black/45 text-white text-[10px] opacity-0 group-hover/og:opacity-100 transition-opacity">{uploading ? "Uploading…" : "Upload"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadOg(e.target.files[0])} />
              </label>
              <div className="flex-1 min-w-0">
                <input value={seo.ogImage} onChange={(e) => set("ogImage", e.target.value)} placeholder="/nn-header-poster.jpg or click to upload" className="w-full bg-transparent border-b border-black/15 pb-2 text-[13px] text-[#0A0A0A] outline-none focus:border-black/50 transition-colors" />
                <p className="text-[10px] text-black/40 mt-1.5">Recommended 1200×630. Click the thumbnail to upload.</p>
              </div>
            </div>
          </div>

          {/* SERP preview */}
          <div className="pt-1">
            <span className="block text-[10px] tracking-[0.16em] uppercase text-black/40 mb-2">Search preview</span>
            <div className="rounded-xl border border-black/10 p-4 bg-[#fbfbfb]">
              <div className="text-[12px] text-[#1a0dab]/90">thisisnn.com</div>
              <div className="text-[18px] text-[#1a0dab] leading-snug truncate">{seo.title || "Page title"}</div>
              <div className="text-[13px] text-[#4d5156] leading-snug line-clamp-2">{seo.description || "Your meta description appears here."}</div>
            </div>
          </div>
        </div>

        {/* checklist */}
        <div className="rounded-3xl bg-white shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-semibold text-[#0A0A0A]">Checklist</h2>
            <span className="text-[12px] text-black/45">{todo === 0 ? "All clear 🎉" : `${todo} need${todo === 1 ? "s" : ""} attention`}</span>
          </div>
          <ul className="space-y-3">
            {checklist.map((c) => (
              <li key={c.label} className="flex items-start gap-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${DOT[c.status]}`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-[#0A0A0A]">{c.label}</span>
                    <span className={`text-[10px] uppercase tracking-wide ${c.status === "good" ? "text-[#1f9d55]" : c.status === "warn" ? "text-[#E0A800]" : "text-[#c0392b]"}`}>{LABEL[c.status]}</span>
                  </div>
                  <p className="text-[11px] text-black/45 leading-relaxed">{c.tip}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
