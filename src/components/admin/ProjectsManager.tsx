"use client";

import { useState } from "react";
import type { SiteContent, Project } from "@/lib/content/types";
import { slugify } from "@/lib/slug";
import { PageHeader, Button, Card, Badge } from "./ui";

const BLANK: Project = { name: "New project", sub: "", city: "", year: String(new Date().getFullYear()), cat: "Branding", desc: "", img: "", images: [] };

async function uploadFile(file: File): Promise<string | null> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json().catch(() => ({}));
  return data.url || null;
}

/** Small image tile with remove + optional set-as-cover. */
function Thumb({ src, onRemove, onCover, isCover }: { src: string; onRemove: () => void; onCover?: () => void; isCover?: boolean }) {
  return (
    <div className="relative group w-full aspect-square rounded-xl overflow-hidden border border-black/10 bg-black/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="w-full h-full object-cover" />
      {isCover && <span className="absolute top-1 left-1"><Badge tone="ink">Cover</Badge></span>}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
        {onCover && !isCover && <button onClick={onCover} className="rounded-full bg-white/90 text-black text-[10px] px-2 py-1 hover:bg-white">Cover</button>}
        <button onClick={onRemove} className="rounded-full bg-white/90 text-[#C0392B] text-[10px] px-2 py-1 hover:bg-white">Remove</button>
      </div>
    </div>
  );
}

export default function ProjectsManager({ content }: { content: SiteContent }) {
  const [projects, setProjects] = useState<Project[]>(content.projects);
  const [sel, setSel] = useState(0);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [busy, setBusy] = useState(false);

  const p = projects[sel];

  const commit = (next: Project[]) => { setProjects(next); setDirty(true); setStatus("idle"); };
  const patch = <K extends keyof Project>(key: K, val: Project[K]) => {
    const n = [...projects]; n[sel] = { ...n[sel], [key]: val }; commit(n);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= projects.length) return;
    const n = [...projects];
    [n[i], n[j]] = [n[j], n[i]];
    commit(n);
    setSel(j);
  };
  const addProject = () => { const n = [...projects, { ...BLANK }]; commit(n); setSel(n.length - 1); };
  const removeProject = (i: number) => {
    if (!confirm(`Delete "${projects[i].name}"? This can't be undone once saved.`)) return;
    const n = projects.filter((_, k) => k !== i); commit(n);
    setSel(Math.max(0, Math.min(sel, n.length - 1)));
  };

  const addImages = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    const urls: string[] = [];
    for (const f of Array.from(files)) { const u = await uploadFile(f); if (u) urls.push(u); }
    setBusy(false);
    if (!urls.length) return;
    const imgs = [...(p.images || []), ...urls];
    const n = [...projects]; n[sel] = { ...n[sel], images: imgs, img: n[sel].img || imgs[0] }; commit(n);
  };
  const removeImage = (idx: number) => {
    const imgs = (p.images || []).filter((_, k) => k !== idx);
    const n = [...projects]; n[sel] = { ...n[sel], images: imgs, img: p.img && !imgs.includes(p.img) ? (imgs[0] || "") : n[sel].img }; commit(n);
  };
  const setCover = (src: string) => patch("img", src);

  const save = async () => {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...content, projects }),
      });
      if (!res.ok) throw new Error();
      setStatus("saved"); setDirty(false);
    } catch { setStatus("error"); }
  };

  const field = "w-full bg-white border border-black/10 rounded-xl px-3 py-2 text-[13px] outline-none focus:border-black/40 transition-colors";

  return (
    <div className="pb-10">
      <PageHeader title="Projects" subtitle={`${projects.length} projects · reorder, edit and manage galleries`}>
        <Button href="/main#s04" target="_blank" variant="ghost">View on site ↗</Button>
        <Button onClick={save} disabled={!dirty || status === "saving"}>
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓" : dirty ? "Save changes" : "Saved"}
        </Button>
      </PageHeader>
      {status === "error" && <p className="mb-3 text-[12px] text-[#C0392B]">Save failed — check the connection and try again.</p>}

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-3">
        {/* project list */}
        <Card pad={false} className="p-2.5 h-max">
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="text-[11px] tracking-[0.12em] uppercase text-black/40">Order</span>
            <button onClick={addProject} className="text-[12px] text-[#0A0A0A] hover:opacity-60">+ Add</button>
          </div>
          <div className="space-y-1">
            {projects.map((pr, i) => (
              <div key={i} className={`flex items-center gap-2 rounded-xl px-2 py-2 ${i === sel ? "bg-[#0A0A0A] text-white" : "hover:bg-black/[0.04]"}`}>
                <div className="flex flex-col">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className={`leading-none text-[10px] disabled:opacity-20 ${i === sel ? "text-white/70" : "text-black/40"} hover:opacity-100`}>▲</button>
                  <button onClick={() => move(i, 1)} disabled={i === projects.length - 1} className={`leading-none text-[10px] disabled:opacity-20 ${i === sel ? "text-white/70" : "text-black/40"} hover:opacity-100`}>▼</button>
                </div>
                <button onClick={() => setSel(i)} className="flex items-center gap-2.5 flex-1 min-w-0 text-left">
                  <span className="w-9 h-9 rounded-lg overflow-hidden bg-black/10 shrink-0 grid place-items-center">
                    {pr.img
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={pr.img} alt="" className="w-full h-full object-cover" />
                      : <span className={`text-[10px] ${i === sel ? "text-white/40" : "text-black/30"}`}>{i + 1}</span>}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] truncate">{pr.name}</span>
                    <span className={`block text-[10px] truncate ${i === sel ? "text-white/50" : "text-black/40"}`}>{pr.cat}{pr.city ? ` · ${pr.city}` : ""}</span>
                  </span>
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* editor */}
        {p ? (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[13px] font-semibold">Edit project</h2>
              <div className="flex items-center gap-3">
                <a href={`/projects/${slugify(p.name)}`} target="_blank" rel="noreferrer" className="text-[12px] text-black/45 hover:text-black">/projects/{slugify(p.name)} ↗</a>
                <button onClick={() => removeProject(sel)} className="text-[12px] text-[#C0392B] hover:opacity-70">Delete</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <label className="block"><span className="block text-[11px] text-black/50 mb-1">Name</span><input className={field} value={p.name} onChange={(e) => patch("name", e.target.value)} /></label>
              <label className="block"><span className="block text-[11px] text-black/50 mb-1">Subtitle</span><input className={field} value={p.sub} onChange={(e) => patch("sub", e.target.value)} /></label>
              <label className="block"><span className="block text-[11px] text-black/50 mb-1">Category</span><input className={field} value={p.cat} onChange={(e) => patch("cat", e.target.value)} /></label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block"><span className="block text-[11px] text-black/50 mb-1">City</span><input className={field} value={p.city} onChange={(e) => patch("city", e.target.value)} /></label>
                <label className="block"><span className="block text-[11px] text-black/50 mb-1">Year</span><input className={field} value={p.year} onChange={(e) => patch("year", e.target.value)} /></label>
              </div>
            </div>

            <label className="block mb-4"><span className="block text-[11px] text-black/50 mb-1">Story</span>
              <textarea className={`${field} resize-y leading-relaxed`} rows={7} value={p.desc} onChange={(e) => patch("desc", e.target.value)} placeholder="Double line breaks separate paragraphs." />
            </label>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] tracking-[0.12em] uppercase text-black/40">Gallery ({p.images?.length || 0})</span>
              <label className="text-[12px] text-[#0A0A0A] hover:opacity-60 cursor-pointer">
                {busy ? "Uploading…" : "+ Add images"}
                <input type="file" accept="image/*" multiple hidden onChange={(e) => addImages(e.target.files)} />
              </label>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {(p.images || []).map((src, i) => (
                <Thumb key={src + i} src={src} isCover={src === p.img} onCover={() => setCover(src)} onRemove={() => removeImage(i)} />
              ))}
              {(!p.images || p.images.length === 0) && <p className="text-[12px] text-black/40 col-span-full py-3">No images yet. Upload some — the first becomes the cover.</p>}
            </div>
          </Card>
        ) : (
          <Card><p className="text-[13px] text-black/45">No projects yet. Click “+ Add” to create one.</p></Card>
        )}
      </div>
    </div>
  );
}
