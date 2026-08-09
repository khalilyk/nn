"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Invoice } from "@/lib/invoice/types";
import { computeTotals, money } from "@/lib/invoice/types";

const STATUS_COLOR: Record<string, string> = {
  draft: "bg-black/10 text-black/60",
  sent: "bg-[#2D6BFF]/15 text-[#2D6BFF]",
  paid: "bg-[#1f9d55]/15 text-[#1f9d55]",
  overdue: "bg-[#c0392b]/15 text-[#c0392b]",
};

export default function InvoicesList() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/invoices", { cache: "no-store" });
    setInvoices(r.ok ? await r.json() : []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const create = async (docType: "invoice" | "quote") => {
    setCreating(true);
    const r = await fetch("/api/admin/invoices", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ docType }),
    });
    setCreating(false);
    if (r.ok) { const inv = await r.json(); router.push(`/admin/invoices/${inv.id}`); }
  };

  const templates = invoices.filter((i) => i.isTemplate);
  const docs = invoices.filter((i) => !i.isTemplate);

  const Row = ({ inv }: { inv: Invoice }) => {
    const t = computeTotals(inv);
    return (
      <Link href={`/admin/invoices/${inv.id}`} className="flex items-center gap-3 rounded-2xl bg-white shadow-sm px-4 py-3 hover:shadow-md transition-shadow">
        <span className="text-[13px] font-semibold text-[#0A0A0A] w-20 shrink-0">{inv.number}</span>
        <span className="text-[13px] text-black/70 flex-1 min-w-0 truncate">{inv.client.name || "—"}{inv.subject ? ` · ${inv.subject}` : ""}</span>
        <span className="text-[11px] text-black/40 hidden sm:block w-24">{inv.issueDate || "no date"}</span>
        <span className="text-[13px] font-semibold text-[#0A0A0A] w-28 text-right">{money(t.total)} {inv.currency}</span>
        {inv.recurInterval && <span className="text-[10px] uppercase tracking-wide text-black/40 hidden md:block">↻ {inv.recurInterval}</span>}
        <span className={`text-[10px] uppercase tracking-wide px-2 py-1 rounded-full ${STATUS_COLOR[inv.status] || ""}`}>{inv.isTemplate ? "template" : inv.status}</span>
      </Link>
    );
  };

  return (
    <div className="pb-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#0A0A0A] mb-1">Invoices &amp; quotes</h1>
          <p className="text-[13px] text-[#0A0A0A]/50">Create, edit, download and email documents.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/invoices/settings" className="rounded-full bg-white shadow-sm hover:shadow-md px-4 py-2 text-[12px] text-[#0A0A0A]/80 transition-shadow">Settings</Link>
          <button onClick={() => create("quote")} disabled={creating} className="rounded-full bg-white shadow-sm hover:shadow-md px-4 py-2 text-[12px] text-[#0A0A0A]/80 disabled:opacity-50">+ Quote</button>
          <button onClick={() => create("invoice")} disabled={creating} className="rounded-full bg-[#0A0A0A] text-white text-[12px] px-4 py-2 hover:opacity-80 disabled:opacity-50">+ Invoice</button>
        </div>
      </div>

      {loading ? (
        <p className="text-[13px] text-black/40">Loading…</p>
      ) : docs.length === 0 && templates.length === 0 ? (
        <div className="rounded-3xl bg-white shadow-sm p-8 text-center text-[13px] text-black/45">No invoices yet. Create your first one.</div>
      ) : (
        <div className="space-y-2">
          {docs.map((inv) => <Row key={inv.id} inv={inv} />)}
          {templates.length > 0 && (
            <>
              <h2 className="text-[12px] font-semibold text-black/45 uppercase tracking-wide pt-5 pb-1">Recurring templates</h2>
              {templates.map((inv) => <Row key={inv.id} inv={inv} />)}
            </>
          )}
        </div>
      )}
    </div>
  );
}
