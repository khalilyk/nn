"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SlidePreview from "./SlidePreview";
import RichTextEditor from "./RichTextEditor";
import type { Proposal, ProposalKind, Slide, SlideLayout, SlideStyle } from "@/lib/proposal/types";
import { KIND_LABELS, LAYOUT_LABELS, FONT_LABELS } from "@/lib/proposal/types";
import { blankSlide, templateFor } from "@/lib/proposal/templates";

const input = "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[13px] text-[#0A0A0A]";
const lab = "block text-[11px] tracking-[0.12em] uppercase text-black/45 mb-1";
const KINDS: ProposalKind[] = ["website", "branding", "social", "mix"];
const LAYOUTS: SlideLayout[] = ["cover", "rich", "closing"];
const uid = () => (globalThis.crypto?.randomUUID?.() ?? `s-${Date.now()}-${Math.round(Math.random() * 1e6)}`);

export default function ProposalEditor({ id }: { id: number }) {
  const router = useRouter();
  const [p, setP] = useState<Proposal | null>(null);
  const [sel, setSel] = useState(0);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [sendOpen, setSendOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/proposals/${id}`, { cache: "no-store" }).then(async (r) => { if (r.ok) setP(await r.json()); });
  }, [id]);

  if (!p) return <p className="text-[13px] text-black/40">Loading…</p>;

  const slides = p.slides;
  const cur = slides[Math.min(sel, slides.length - 1)];
  const setSlides = (next: Slide[]) => setP({ ...p, slides: next });
  const patchSlide = (patch: Partial<Slide>) => setSlides(slides.map((s, i) => (i === sel ? ({ ...s, ...patch } as Slide) : s)));

  const move = (i: number, d: number) => {
    const j = i + d; if (j < 0 || j >= slides.length) return;
    const next = [...slides]; [next[i], next[j]] = [next[j], next[i]]; setSlides(next); setSel(j);
  };
  const dup = (i: number) => { const next = [...slides]; next.splice(i + 1, 0, { ...slides[i], id: uid() }); setSlides(next); setSel(i + 1); };
  const del = (i: number) => { if (slides.length <= 1) return; setSlides(slides.filter((_, j) => j !== i)); setSel(Math.max(0, i - 1)); };
  const add = (layout: SlideLayout) => { const next = [...slides]; next.splice(sel + 1, 0, blankSlide(layout, uid())); setSlides(next); setSel(sel + 1); setAddOpen(false); };

  const save = async () => {
    setSaving(true);
    await fetch(`/api/admin/proposals/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
    setSaving(false); setSavedAt(new Date().toLocaleTimeString());
  };
  const remove = async () => { if (!confirm("Delete this proposal?")) return; await fetch(`/api/admin/proposals/${id}`, { method: "DELETE" }); router.push("/admin/proposals"); };
  const reseed = () => { if (!confirm(`Replace all slides with the ${KIND_LABELS[p.kind]} template? Your edits will be lost.`)) return; setSlides(templateFor(p.kind).map((s) => ({ ...s, id: uid() }))); setSel(0); };

  const uploadImage = async (file: File) => {
    const fd = new FormData(); fd.append("file", file);
    const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (r.ok) { const { url } = await r.json(); patchSlide({ image: url } as Partial<Slide>); }
  };

  return (
    <div className="pb-16">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <button onClick={() => router.push("/admin/proposals")} className="text-[12px] text-black/45 hover:text-black mb-1">← All proposals</button>
          <input className="block text-[20px] font-semibold text-[#0A0A0A] bg-transparent outline-none" value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {savedAt && <span className="text-[11px] text-black/35">saved {savedAt}</span>}
          <a href={`/api/admin/proposals/${id}/pdf`} className="rounded-full bg-white shadow-sm hover:shadow-md px-4 py-2 text-[12px] text-[#0A0A0A]/80">Download</a>
          <button onClick={() => setSendOpen(true)} className="rounded-full bg-white shadow-sm hover:shadow-md px-4 py-2 text-[12px] text-[#0A0A0A]/80">Email…</button>
          <button onClick={remove} className="rounded-full bg-white shadow-sm hover:shadow-md px-4 py-2 text-[12px] text-[#c0392b]/80">Delete</button>
          <button onClick={save} disabled={saving} className="rounded-full bg-[#0A0A0A] text-white text-[12px] px-5 py-2 hover:opacity-80 disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
        </div>
      </div>

      {/* deck settings */}
      <div className="rounded-2xl bg-white shadow-sm p-4 mb-4 grid grid-cols-2 md:grid-cols-5 gap-3">
        <div>
          <label className={lab}>This proposal is for</label>
          <select className={input} value={p.kind} onChange={(e) => setP({ ...p, kind: e.target.value as ProposalKind })}>
            {KINDS.map((k) => <option key={k} value={k}>{KIND_LABELS[k]}</option>)}
          </select>
        </div>
        <div><label className={lab}>Client tag (edge)</label><input className={input} value={p.clientTag} onChange={(e) => setP({ ...p, clientTag: e.target.value })} placeholder="EBS" /></div>
        <div><label className={lab}>Client name</label><input className={input} value={p.client.name} onChange={(e) => setP({ ...p, client: { ...p.client, name: e.target.value } })} /></div>
        <div><label className={lab}>Client email</label><input className={input} value={p.client.email} onChange={(e) => setP({ ...p, client: { ...p.client, email: e.target.value } })} /></div>
        <div className="flex items-end"><button onClick={reseed} className="rounded-lg border border-black/10 px-3 py-2 text-[12px] text-black/60 hover:bg-black/[0.04] w-full">Reset to {KIND_LABELS[p.kind]} template</button></div>
      </div>

      <div className="flex gap-4">
        {/* thumbnail rail */}
        <div className="w-[150px] shrink-0 space-y-2 max-h-[80vh] overflow-y-auto pr-1">
          {slides.map((sl, i) => (
            <div key={sl.id} className={`rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${i === sel ? "border-[#0A0A0A]" : "border-transparent hover:border-black/20"}`} onClick={() => setSel(i)}>
              <div className="relative">
                <SlidePreview slide={sl} clientTag={p.clientTag} page={i + 1} />
                <span className="absolute top-1 left-1 text-[9px] bg-black/70 text-white rounded px-1">{i + 1}</span>
              </div>
            </div>
          ))}
          <button onClick={() => setAddOpen((o) => !o)} className="w-full rounded-lg border border-dashed border-black/20 py-2 text-[12px] text-black/50 hover:bg-black/[0.03]">+ Add slide</button>
          {addOpen && (
            <div className="rounded-lg bg-white shadow-sm p-1.5 space-y-1">
              {LAYOUTS.map((l) => <button key={l} onClick={() => add(l)} className="block w-full text-left text-[12px] px-2 py-1.5 rounded hover:bg-black/[0.05]">{LAYOUT_LABELS[l]}</button>)}
            </div>
          )}
        </div>

        {/* canvas + inspector */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="rounded-2xl bg-white shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-black/45">Slide {sel + 1} · {LAYOUT_LABELS[cur.layout]}</span>
              <div className="flex gap-1.5">
                <button onClick={() => move(sel, -1)} className="text-black/40 hover:text-black text-xs px-1">▲</button>
                <button onClick={() => move(sel, 1)} className="text-black/40 hover:text-black text-xs px-1">▼</button>
                <button onClick={() => dup(sel)} className="text-[12px] text-black/50 hover:text-black px-1">Duplicate</button>
                <button onClick={() => del(sel)} className="text-[12px] text-black/40 hover:text-[#c0392b] px-1">Delete</button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-inner border border-black/5">
              <SlidePreview slide={cur} clientTag={p.clientTag} page={sel + 1} />
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm p-5 space-y-3">
            <h3 className="text-[13px] font-semibold text-[#0A0A0A]">Edit slide</h3>
            <Inspector slide={cur} patch={patchSlide} onUpload={uploadImage} />
          </div>

          <DesignPanel slide={cur} patch={patchSlide} />
        </div>
      </div>

      {sendOpen && <SendModal proposal={p} onClose={() => setSendOpen(false)} />}
    </div>
  );
}

const SWATCHES = ["#FFFFFF", "#F3F1EC", "#0A0A0A", "#111827", "#D7F23A", "#BFE3FF", "#FF2EC4", "#1f9d55"];

function DesignPanel({ slide, patch }: { slide: Slide; patch: (p: Partial<Slide>) => void }) {
  const st = slide.style || {};
  const setStyle = (s: Partial<SlideStyle>) => patch({ style: { ...st, ...s } } as Partial<Slide>);
  const Swatches = ({ value, onPick }: { value?: string; onPick: (c: string) => void }) => (
    <div className="flex items-center gap-1.5 flex-wrap">
      {SWATCHES.map((c) => (
        <button key={c} onClick={() => onPick(c)} title={c} className={`w-6 h-6 rounded-full border ${value === c ? "ring-2 ring-[#0A0A0A] ring-offset-1" : "border-black/15"}`} style={{ background: c }} />
      ))}
      <input type="color" value={value || "#000000"} onChange={(e) => onPick(e.target.value)} className="w-6 h-6 rounded-full overflow-hidden cursor-pointer border border-black/15 p-0" title="Custom colour" />
    </div>
  );
  const Seg = ({ options, value, onPick }: { options: { v: string; label: string }[]; value: string; onPick: (v: string) => void }) => (
    <div className="inline-flex rounded-lg border border-black/10 overflow-hidden">
      {options.map((o) => (
        <button key={o.v} onClick={() => onPick(o.v)} className={`px-3 py-1.5 text-[12px] ${value === o.v ? "bg-[#0A0A0A] text-white" : "text-black/60 hover:bg-black/[0.04]"}`}>{o.label}</button>
      ))}
    </div>
  );

  return (
    <div className="rounded-2xl bg-white shadow-sm p-5 space-y-4">
      <h3 className="text-[13px] font-semibold text-[#0A0A0A]">Design</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className={lab}>Font</label>
          <Seg value={st.font || "mono"} onPick={(v) => setStyle({ font: v as SlideStyle["font"] })}
            options={(["mono", "sans", "serif"] as const).map((f) => ({ v: f, label: FONT_LABELS[f] }))} />
        </div>
        <div className="space-y-2">
          <label className={lab}>Text size</label>
          <Seg value={st.size || "m"} onPick={(v) => setStyle({ size: v as SlideStyle["size"] })}
            options={[{ v: "s", label: "S" }, { v: "m", label: "M" }, { v: "l", label: "L" }]} />
        </div>
        <div className="space-y-2">
          <label className={lab}>Alignment</label>
          <Seg value={st.align || "left"} onPick={(v) => setStyle({ align: v as SlideStyle["align"] })}
            options={[{ v: "left", label: "Left" }, { v: "center", label: "Center" }]} />
        </div>
      </div>
      <div className="space-y-2">
        <label className={lab}>Background</label>
        <Swatches value={st.bg} onPick={(c) => setStyle({ bg: c })} />
      </div>
      <div className="space-y-2">
        <label className={lab}>Text colour</label>
        <Swatches value={st.fg} onPick={(c) => setStyle({ fg: c })} />
      </div>
      <button onClick={() => patch({ style: undefined } as Partial<Slide>)} className="text-[12px] text-black/45 hover:text-black">Reset design to default</button>
    </div>
  );
}

function Inspector({ slide, patch, onUpload }: { slide: Slide; patch: (p: Partial<Slide>) => void; onUpload: (f: File) => void }) {
  const ImageField = () => (
    <div>
      <label className={lab}>Image</label>
      <div className="flex items-center gap-3">
        {"image" in slide && slide.image && <img src={slide.image} alt="" className="h-12 w-20 object-cover rounded" />}
        <label className="rounded-full bg-black/[0.05] hover:bg-black/[0.08] px-3 py-1.5 text-[12px] cursor-pointer">Upload<input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} /></label>
        {"image" in slide && slide.image && <button onClick={() => patch({ image: "" } as Partial<Slide>)} className="text-[12px] text-black/40 hover:text-[#c0392b]">Remove</button>}
      </div>
    </div>
  );

  if (slide.layout === "cover") return (
    <>
      <ImageField />
      <div><label className={lab}>Eyebrow</label><input className={input} value={slide.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} /></div>
      <div><label className={lab}>Title (bold)</label><input className={input} value={slide.titleStrong} onChange={(e) => patch({ titleStrong: e.target.value })} /></div>
      <div><label className={lab}>Sub-line</label><input className={input} value={slide.titleRest} onChange={(e) => patch({ titleRest: e.target.value })} /></div>
    </>
  );

  if (slide.layout === "closing") return (
    <>
      <div><label className={lab}>Top label</label><input className={input} value={slide.topLabel} onChange={(e) => patch({ topLabel: e.target.value })} /></div>
      <div><label className={lab}>Email</label><input className={input} value={slide.email} onChange={(e) => patch({ email: e.target.value })} /></div>
      <div><label className={lab}>Side label</label><input className={input} value={slide.sideLabel} onChange={(e) => patch({ sideLabel: e.target.value })} /></div>
    </>
  );

  // rich
  return (
    <>
      <ImageField />
      <div>
        <label className={lab}>Content</label>
        <RichTextEditor value={slide.html} onChange={(html) => patch({ html } as Partial<Slide>)} />
      </div>
    </>
  );
}

function SendModal({ proposal, onClose }: { proposal: Proposal; onClose: () => void }) {
  const [to, setTo] = useState(proposal.client.email || "");
  const [subject, setSubject] = useState(`${proposal.title} — Not Normal`);
  const [message, setMessage] = useState(`Hi ${proposal.client.name || "there"},\n\nPlease find attached our ${proposal.title.toLowerCase()}.\n\nLooking forward to your thoughts.\n\nNot Normal`);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  const send = async () => {
    setSending(true); setErr("");
    const r = await fetch(`/api/admin/proposals/${proposal.id}/send`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to, subject, message }) });
    setSending(false);
    if (r.ok) { alert("Sent!"); onClose(); } else { const d = await r.json().catch(() => ({})); setErr(d.error || "Failed to send."); }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-[16px] font-semibold text-[#0A0A0A] mb-1">Email proposal</h2>
        <p className="text-[11px] text-black/45 mb-4">PDF attached automatically.</p>
        <div className="space-y-3">
          <div><label className={lab}>To</label><input className={input} value={to} onChange={(e) => setTo(e.target.value)} /></div>
          <div><label className={lab}>Subject</label><input className={input} value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
          <div><label className={lab}>Message</label><textarea className={`${input} resize-y`} rows={7} value={message} onChange={(e) => setMessage(e.target.value)} /></div>
          {err && <p className="text-[12px] text-[#c0392b]">{err}</p>}
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="rounded-full px-4 py-2 text-[12px] text-black/55 hover:text-black">Cancel</button>
          <button onClick={send} disabled={sending || !to} className="rounded-full bg-[#0A0A0A] text-white text-[12px] px-5 py-2 hover:opacity-80 disabled:opacity-50">{sending ? "Sending…" : "Send"}</button>
        </div>
      </div>
    </div>
  );
}
