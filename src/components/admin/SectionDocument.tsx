"use client";

import { useState } from "react";
import AiTextField from "./AiTextField";

type Json = unknown;

const labelize = (k: string) =>
  k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).replace(/_/g, " ");
const isColor = (v: string) => /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v.trim());
const isImageKey = (k: string) => /^(img|image|photo|src|logo|avatar)$/i.test(k);
const isTitleKey = (k: string) => /^(heading|title|headline|name)$/i.test(k);
const isEyebrowKey = (k: string) => /^(eyebrow|kicker|label|course|cat|category)$/i.test(k);
const isQuoteKey = (k: string) => /^(q|quote)$/i.test(k);

function clone<T>(v: T): T { return JSON.parse(JSON.stringify(v)); }
function emptyLike(s: Json): Json {
  if (typeof s === "string") return "";
  if (typeof s === "number") return 0;
  if (typeof s === "boolean") return false;
  if (Array.isArray(s)) return s.length ? [clone(s[0])] : [];
  if (s && typeof s === "object") { const o: Record<string, Json> = {}; for (const [k, v] of Object.entries(s)) o[k] = emptyLike(v); return o; }
  return "";
}

function DocImage({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const upload = async (file: File) => {
    setBusy(true);
    try {
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } finally { setBusy(false); }
  };
  return (
    <label className="group/img relative block rounded-xl overflow-hidden cursor-pointer border border-black/10 bg-black/[0.02] aspect-[16/9] max-w-sm">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="w-full h-full object-cover" />
      ) : (
        <span className="absolute inset-0 grid place-items-center text-[12px] text-black/40">No image</span>
      )}
      <span className="absolute inset-0 grid place-items-center bg-black/40 text-white text-[12px] opacity-0 group-hover/img:opacity-100 transition-opacity">{busy ? "Uploading…" : "Click to replace"}</span>
      <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
    </label>
  );
}

function textClassFor(k: string) {
  if (isTitleKey(k)) return "text-[24px] font-semibold leading-tight tracking-tight text-[#0A0A0A]";
  if (isEyebrowKey(k)) return "text-[11px] uppercase tracking-[0.2em] text-black/45 font-medium";
  if (isQuoteKey(k)) return "text-[18px] leading-snug italic text-[#0A0A0A]";
  return "text-[15px] leading-relaxed text-[#0A0A0A]/85";
}

function DocField({ k, value, onChange, depth }: { k: string; value: Json; onChange: (v: Json) => void; depth: number }) {
  if (typeof value === "string") {
    if (isImageKey(k)) return <DocImage value={value} onChange={onChange} />;
    if (isColor(value)) {
      return (
        <div className="flex items-center gap-2">
          <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-7 h-7 rounded border border-black/15 bg-white p-0.5 cursor-pointer" />
          <span className="text-[12px] font-mono text-black/55">{value}</span>
        </div>
      );
    }
    const long = isTitleKey(k) ? false : value.length > 60 || value.includes("\n");
    return <AiTextField bare value={value} onChange={(v) => onChange(v)} multiline={long || isQuoteKey(k)} textClass={textClassFor(k)} />;
  }

  if (typeof value === "number")
    return <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-24 bg-transparent border-b border-black/15 text-[14px] py-0.5 outline-none focus:border-black/40" />;

  if (typeof value === "boolean")
    return <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4 accent-[#0A0A0A]" />;

  if (Array.isArray(value)) {
    const arr = value as Json[];
    const set = (i: number, v: Json) => { const n = [...arr]; n[i] = v; onChange(n); };
    const remove = (i: number) => onChange(arr.filter((_, j) => j !== i));
    const move = (i: number, d: number) => { const j = i + d; if (j < 0 || j >= arr.length) return; const n = [...arr]; [n[i], n[j]] = [n[j], n[i]]; onChange(n); };
    const add = () => onChange([...arr, arr.length ? emptyLike(arr[0]) : ""]);
    const simple = arr.every((it) => typeof it === "string");
    return (
      <div className={simple ? "space-y-1.5" : "space-y-4"}>
        {arr.map((item, i) => (
          <div key={i} className={`group/item relative ${simple ? "flex items-center gap-2" : "rounded-xl border border-black/[0.07] bg-black/[0.015] p-4"}`}>
            {!simple && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.16em] text-black/35">{labelize(k.replace(/s$/, ""))} {i + 1}</span>
                <div className="flex items-center gap-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <button onClick={() => move(i, -1)} className="text-black/35 hover:text-black text-xs">▲</button>
                  <button onClick={() => move(i, 1)} className="text-black/35 hover:text-black text-xs">▼</button>
                  <button onClick={() => remove(i)} className="text-black/35 hover:text-[#c0392b] text-sm">✕</button>
                </div>
              </div>
            )}
            {simple && <span className="text-black/25 text-xs">•</span>}
            <div className="flex-1 min-w-0">
              <DocField k={k} value={item} onChange={(v) => set(i, v)} depth={depth + 1} />
            </div>
            {simple && <button onClick={() => remove(i)} className="text-black/25 hover:text-[#c0392b] text-sm opacity-0 group-hover/item:opacity-100">✕</button>}
          </div>
        ))}
        <button onClick={add} className="text-[12px] text-black/45 hover:text-black inline-flex items-center gap-1">+ Add {labelize(k.replace(/s$/, "")).toLowerCase()}</button>
      </div>
    );
  }

  if (value && typeof value === "object") {
    const obj = value as Record<string, Json>;
    const entries = Object.entries(obj);
    // float the title-ish field to the top, rendered big without a label
    return (
      <div className="space-y-5">
        {entries.map(([key, v]) => {
          const titleish = depth === 0 && isTitleKey(key);
          return (
            <div key={key}>
              {!titleish && <label className="block text-[10px] tracking-[0.16em] uppercase text-black/35 mb-1.5">{labelize(key)}</label>}
              <DocField k={key} value={v} onChange={(nv) => onChange({ ...obj, [key]: nv })} depth={depth + 1} />
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}

export default function SectionDocument({ sectionKey, value, onChange }: { sectionKey: string; value: Json; onChange: (v: Json) => void }) {
  return <DocField k={sectionKey} value={value} onChange={onChange} depth={0} />;
}
