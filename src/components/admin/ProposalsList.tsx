"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Proposal, ProposalKind } from "@/lib/proposal/types";
import { KIND_LABELS } from "@/lib/proposal/types";

const KINDS: ProposalKind[] = ["website", "branding", "social", "mix"];

export default function ProposalsList() {
  const router = useRouter();
  const [items, setItems] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [pick, setPick] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/proposals", { cache: "no-store" });
    setItems(r.ok ? await r.json() : []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const create = async (kind: ProposalKind) => {
    setBusy(true);
    const r = await fetch("/api/admin/proposals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind }) });
    setBusy(false); setPick(false);
    if (r.ok) { const p = await r.json(); router.push(`/admin/proposals/${p.id}`); }
  };

  return (
    <div className="pb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-semibold text-[#0A0A0A] mb-1">Proposals</h1>
          <p className="text-[13px] text-[#0A0A0A]/50">Build branded proposal decks, edit slides, export PDF and email.</p>
        </div>
        <div className="relative">
          <button onClick={() => setPick((o) => !o)} disabled={busy} className="rounded-full bg-[#0A0A0A] text-white text-[12px] px-4 py-2 hover:opacity-80 disabled:opacity-50">+ New proposal</button>
          {pick && (
            <div className="absolute right-0 mt-2 z-10 rounded-xl bg-white shadow-lg p-1.5 w-52">
              <p className="text-[10px] uppercase tracking-wide text-black/40 px-2 py-1">What is it for?</p>
              {KINDS.map((k) => <button key={k} onClick={() => create(k)} className="block w-full text-left text-[13px] px-2 py-2 rounded hover:bg-black/[0.05]">{KIND_LABELS[k]}</button>)}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <p className="text-[13px] text-black/40">Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-3xl bg-white shadow-sm p-8 text-center text-[13px] text-black/45">No proposals yet. Create your first one.</div>
      ) : (
        <div className="space-y-2">
          {items.map((p) => (
            <Link key={p.id} href={`/admin/proposals/${p.id}`} className="flex items-center gap-3 rounded-2xl bg-white shadow-sm px-4 py-3 hover:shadow-md transition-shadow">
              <span className="text-[13px] font-semibold text-[#0A0A0A] flex-1 min-w-0 truncate">{p.title}</span>
              <span className="text-[11px] uppercase tracking-wide text-black/40">{KINDS.includes(p.kind) ? KIND_LABELS[p.kind] : p.kind}</span>
              <span className="text-[11px] text-black/40 w-16 text-right">{p.slides.length} slides</span>
              {p.client.name && <span className="text-[12px] text-black/50 hidden sm:block w-32 truncate text-right">{p.client.name}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
