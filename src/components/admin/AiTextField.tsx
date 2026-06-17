"use client";

import { useEffect, useRef, useState } from "react";

const ACTIONS: { key: string; label: string; icon: string }[] = [
  { key: "grammar", label: "Fix grammar", icon: "✓" },
  { key: "positive", label: "Rewrite in positive tone", icon: "☺" },
  { key: "punchier", label: "Make it punchier", icon: "✦" },
  { key: "shorten", label: "Make it shorter", icon: "↧" },
];

/** Textarea/input with an AI "Rewrite" menu that rewrites the whole field. */
export default function AiTextField({
  value,
  onChange,
  multiline = true,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const run = async (action: string) => {
    setBusy(action); setErr(null); setOpen(false);
    try {
      const res = await fetch("/api/admin/ai/rewrite", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value, action }),
      });
      const data = await res.json();
      if (res.ok && data.text) onChange(data.text);
      else setErr(data.error || "Rewrite failed.");
    } catch {
      setErr("Rewrite failed.");
    } finally {
      setBusy(null);
    }
  };

  const field = "w-full bg-white border border-black/10 rounded-lg px-2.5 py-2 text-[13px] leading-relaxed";

  return (
    <div ref={wrap} className="relative">
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={`${field} resize-y pr-9`} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={`${field} pr-9`} />
      )}

      {/* AI trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={!!busy}
        title="Rewrite with AI"
        className="absolute right-1.5 top-1.5 grid place-items-center w-6 h-6 rounded-md text-[12px] text-[#6D28D9] hover:bg-[#6D28D9]/10 disabled:opacity-50"
      >
        {busy ? <span className="inline-block w-3 h-3 border-2 border-[#6D28D9]/30 border-t-[#6D28D9] rounded-full animate-spin" /> : "✦"}
      </button>

      {open && (
        <div className="absolute right-1.5 top-9 z-20 w-56 rounded-xl bg-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] border border-black/10 p-1.5">
          <p className="px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-black/40">Rewrite · AI</p>
          {ACTIONS.map((a) => (
            <button key={a.key} type="button" onClick={() => run(a.key)} className="flex items-center gap-2.5 w-full text-left px-2 py-2 rounded-lg text-[13px] text-[#0A0A0A] hover:bg-black/[0.05]">
              <span className="w-4 text-center text-[#6D28D9]">{a.icon}</span>{a.label}
            </button>
          ))}
        </div>
      )}

      {err && <p className="mt-1 text-[11px] text-[#c0392b]">{err}</p>}
    </div>
  );
}
