"use client";

import { useEffect, useState } from "react";

type Blob = { url: string; pathname: string; size: number; uploadedAt: string };

const fmtSize = (n: number) => (n > 1e6 ? `${(n / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

export default function MediaManager() {
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media", { cache: "no-store" });
      const data = await res.json();
      setBlobs(data.blobs || []);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        await fetch("/api/admin/upload", { method: "POST", body: fd });
      }
      await load();
    } finally {
      setUploading(false);
    }
  };

  const remove = async (url: string) => {
    if (!confirm("Remove this image? Anything still using it will break.")) return;
    setBlobs((b) => b.filter((x) => x.url !== url));
    await fetch("/api/admin/media", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) });
  };

  const copy = (url: string) => {
    navigator.clipboard?.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="pb-10">
      <h1 className="text-[22px] font-semibold text-[#0A0A0A] mb-1">Media</h1>
      <p className="text-[13px] text-[#0A0A0A]/50 mb-6">Uploaded images. Copy a URL to use it in any section, or remove what you don’t need.</p>

      {/* upload */}
      <label className="block rounded-3xl bg-white shadow-sm border-2 border-dashed border-black/10 p-8 text-center cursor-pointer hover:border-black/25 transition-colors mb-6">
        <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => upload(e.target.files)} />
        <div className="text-[14px] font-medium text-[#0A0A0A]">{uploading ? "Uploading…" : "Click to upload images"}</div>
        <div className="text-[12px] text-[#0A0A0A]/45 mt-1">PNG, JPG, WebP — stored in your Blob library</div>
      </label>

      {loading ? (
        <p className="text-[13px] text-[#0A0A0A]/50">Loading…</p>
      ) : blobs.length === 0 ? (
        <p className="text-[13px] text-[#0A0A0A]/50">No uploads yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {blobs.map((b) => (
            <div key={b.url} className="rounded-2xl bg-white shadow-sm overflow-hidden group">
              <div className="relative aspect-[4/3] bg-[#F1F1F3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.url} alt={b.pathname} className="absolute inset-0 w-full h-full object-cover" />
                <button
                  onClick={() => remove(b.url)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-[#0A0A0A] grid place-items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#c0392b] hover:text-white"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
              <div className="p-2.5">
                <div className="text-[11px] text-[#0A0A0A]/70 truncate" title={b.pathname}>{b.pathname}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-[#0A0A0A]/40">{fmtSize(b.size)}</span>
                  <button onClick={() => copy(b.url)} className="text-[11px] text-[#2D6BFF] hover:underline">{copied === b.url ? "Copied!" : "Copy URL"}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
