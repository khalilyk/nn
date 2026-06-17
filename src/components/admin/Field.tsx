"use client";

import { useState } from "react";
import AiTextField from "./AiTextField";

type Json = unknown;

const labelize = (k: string) =>
  k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).replace(/_/g, " ");

const isColor = (v: string) => /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v.trim());
const isImageKey = (k: string) => /^(img|image|photo|src|logo|avatar)$/i.test(k);

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

function emptyLike(sample: Json): Json {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return sample.length ? [clone(sample[0])] : [];
  if (sample && typeof sample === "object") {
    const out: Record<string, Json> = {};
    for (const [k, val] of Object.entries(sample)) out[k] = emptyLike(val);
    return out;
  }
  return "";
}

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const upload = async (file: File) => {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="flex items-center gap-3">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="w-14 h-14 object-cover rounded-md border border-black/10 shrink-0" />
      ) : (
        <div className="w-14 h-14 rounded-md border border-dashed border-black/20 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-black/10 rounded-lg px-2 py-1.5 text-[13px]"
          placeholder="image URL"
        />
        <label className="mt-1 inline-block text-[11px] text-black/50 cursor-pointer hover:text-black">
          {busy ? "Uploading…" : "Upload new"}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        </label>
      </div>
    </div>
  );
}

export default function Field({
  k,
  value,
  onChange,
  depth = 0,
}: {
  k: string;
  value: Json;
  onChange: (v: Json) => void;
  depth?: number;
}) {
  // string
  if (typeof value === "string") {
    if (isImageKey(k)) return <ImageField value={value} onChange={onChange} />;
    if (isColor(value)) {
      return (
        <div className="flex items-center gap-2">
          <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-9 h-9 rounded border border-black/15 bg-white p-0.5 cursor-pointer" />
          <input value={value} onChange={(e) => onChange(e.target.value)} className="w-28 bg-white border border-black/10 rounded-lg px-2 py-1.5 text-[13px] font-mono" />
        </div>
      );
    }
    const long = value.length > 70 || value.includes("\n");
    return <AiTextField value={value} onChange={(v) => onChange(v)} multiline={long} rows={long ? 4 : 1} />;
  }

  // number
  if (typeof value === "number") {
    return <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-28 bg-white border border-black/10 rounded-lg px-2.5 py-1.5 text-[13px]" />;
  }

  // boolean
  if (typeof value === "boolean") {
    return <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4" />;
  }

  // array
  if (Array.isArray(value)) {
    const arr = value as Json[];
    const set = (i: number, v: Json) => { const next = [...arr]; next[i] = v; onChange(next); };
    const remove = (i: number) => onChange(arr.filter((_, j) => j !== i));
    const move = (i: number, d: number) => {
      const j = i + d;
      if (j < 0 || j >= arr.length) return;
      const next = [...arr];
      [next[i], next[j]] = [next[j], next[i]];
      onChange(next);
    };
    const add = () => onChange([...arr, arr.length ? emptyLike(arr[0]) : ""]);
    return (
      <div className="space-y-2">
        {arr.map((item, i) => (
          <div key={i} className="flex gap-2 items-start rounded-lg border border-black/10 bg-black/[0.02] p-2">
            <div className="flex flex-col gap-1 pt-1">
              <button onClick={() => move(i, -1)} className="text-black/40 hover:text-black text-xs leading-none" title="Up">▲</button>
              <button onClick={() => move(i, 1)} className="text-black/40 hover:text-black text-xs leading-none" title="Down">▼</button>
            </div>
            <div className="flex-1 min-w-0">
              <Field k={k} value={item} onChange={(v) => set(i, v)} depth={depth + 1} />
            </div>
            <button onClick={() => remove(i)} className="text-black/40 hover:text-[#c0392b] text-sm shrink-0" title="Remove">✕</button>
          </div>
        ))}
        <button onClick={add} className="text-[12px] tracking-wide uppercase border border-black/20 rounded-full px-3 py-1 hover:bg-black hover:text-white transition-colors">+ Add</button>
      </div>
    );
  }

  // object
  if (value && typeof value === "object") {
    const obj = value as Record<string, Json>;
    const top = depth === 0;
    return (
      <div className={top ? "space-y-5" : "space-y-3 rounded-xl border border-black/10 bg-black/[0.015] p-3"}>
        {Object.entries(obj).map(([key, v]) => (
          <div key={key}>
            <label className="block text-[11px] tracking-[0.12em] uppercase text-black/45 mb-1.5">{labelize(key)}</label>
            <Field k={key} value={v} onChange={(nv) => onChange({ ...obj, [key]: nv })} depth={depth + 1} />
          </div>
        ))}
      </div>
    );
  }

  return null;
}
