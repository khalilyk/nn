"use client";

import { useEffect, useState } from "react";

type Version = { id: number; updatedAt: string };

function relative(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d} day${d === 1 ? "" : "s"} ago`;
  const w = Math.round(d / 7);
  return `${w} week${w === 1 ? "" : "s"} ago`;
}

function fullDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

export default function HistoryView() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  const load = () =>
    fetch("/api/admin/content/history", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setVersions(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const restore = async (id: number) => {
    setBusyId(id);
    setMsg("");
    try {
      const res = await fetch("/api/admin/content/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) { setMsg("Restored — the live site now shows that version."); setConfirmId(null); await load(); }
      else setMsg("Restore failed.");
    } finally { setBusyId(null); }
  };

  return (
    <div className="pb-10 max-w-2xl">
      <h1 className="text-[22px] font-semibold text-[#0A0A0A] mb-1">History</h1>
      <p className="text-[13px] text-[#0A0A0A]/50 mb-6">Every save is a snapshot. Restore any earlier version — it re-publishes as a new entry, so you can always roll back again.</p>

      {msg && <p className="text-[13px] text-[#1f9d55] mb-4">{msg}</p>}

      <div className="rounded-3xl bg-white shadow-sm p-3 md:p-4">
        {loading ? (
          <p className="text-[13px] text-black/40 p-4">Loading…</p>
        ) : versions.length === 0 ? (
          <p className="text-[13px] text-black/40 p-4">No saved versions yet.</p>
        ) : (
          <ul>
            {versions.map((v, i) => {
              const isCurrent = i === 0;
              return (
                <li key={v.id} className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-black/[0.02]">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${isCurrent ? "bg-[#1f9d55]" : "bg-black/20"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] text-[#0A0A0A] flex items-center gap-2">
                      {fullDate(v.updatedAt)}
                      {isCurrent && <span className="text-[10px] uppercase tracking-wide text-[#1f9d55]">Live now</span>}
                    </div>
                    <div className="text-[11px] text-black/40">{relative(v.updatedAt)} · v{v.id}</div>
                  </div>
                  {isCurrent ? (
                    <span className="text-[12px] text-black/30 px-3">Current</span>
                  ) : confirmId === v.id ? (
                    <span className="flex items-center gap-2">
                      <button onClick={() => restore(v.id)} disabled={busyId === v.id} className="text-[12px] rounded-full bg-[#0A0A0A] text-white px-3.5 py-1.5 hover:opacity-80 disabled:opacity-50">
                        {busyId === v.id ? "Restoring…" : "Confirm restore"}
                      </button>
                      <button onClick={() => setConfirmId(null)} className="text-[12px] text-black/45 hover:text-black px-1">Cancel</button>
                    </span>
                  ) : (
                    <button onClick={() => setConfirmId(v.id)} className="text-[12px] rounded-full border border-black/15 px-3.5 py-1.5 text-[#0A0A0A] hover:bg-black/[0.04] transition-colors">Restore</button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
