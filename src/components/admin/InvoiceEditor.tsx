"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Client, Invoice, InvoiceItem, InvoiceSettings, RecurInterval } from "@/lib/invoice/types";
import { computeTotals, lineAmount, money } from "@/lib/invoice/types";
import InvoicePreview from "./InvoicePreview";

const input = "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[13px] text-[#0A0A0A]";
const lab = "block text-[11px] tracking-[0.12em] uppercase text-black/45 mb-1";
const INTERVALS: RecurInterval[] = ["weekly", "fortnightly", "monthly", "quarterly", "yearly"];

export default function InvoiceEditor({ id }: { id: number }) {
  const router = useRouter();
  const [inv, setInv] = useState<Invoice | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [settings, setSettings] = useState<InvoiceSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [sendOpen, setSendOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const [i, c, s] = await Promise.all([
        fetch(`/api/admin/invoices/${id}`, { cache: "no-store" }),
        fetch("/api/admin/clients", { cache: "no-store" }),
        fetch("/api/admin/invoice-settings", { cache: "no-store" }),
      ]);
      if (i.ok) setInv(await i.json());
      if (c.ok) setClients(await c.json());
      if (s.ok) setSettings(await s.json());
    })();
  }, [id]);

  if (!inv) return <p className="text-[13px] text-black/40">Loading…</p>;

  const set = (patch: Partial<Invoice>) => setInv({ ...inv, ...patch });
  const setItem = (idx: number, patch: Partial<InvoiceItem>) =>
    set({ items: inv.items.map((it, j) => (j === idx ? { ...it, ...patch } : it)) });
  const addItem = () => set({ items: [...inv.items, { description: "New item", subItems: [], qty: 1, rate: 0, discount: 0 }] });
  const removeItem = (idx: number) => set({ items: inv.items.filter((_, j) => j !== idx) });
  const moveItem = (idx: number, d: number) => {
    const j = idx + d; if (j < 0 || j >= inv.items.length) return;
    const next = [...inv.items]; [next[idx], next[j]] = [next[j], next[idx]]; set({ items: next });
  };

  const pickClient = (cid: string) => {
    const c = clients.find((x) => String(x.id) === cid);
    if (!c) { set({ clientId: null }); return; }
    set({ clientId: c.id, client: { name: c.name, company: c.company, email: c.email, address: c.address, abn: c.abn } });
  };

  const save = async () => {
    setSaving(true);
    await fetch(`/api/admin/invoices/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(inv) });
    setSaving(false);
    setSavedAt(new Date().toLocaleTimeString());
  };
  const del = async () => {
    if (!confirm("Delete this document?")) return;
    await fetch(`/api/admin/invoices/${id}`, { method: "DELETE" });
    router.push("/admin/invoices");
  };

  const t = computeTotals(inv);
  const totalRow = (label: string, value: string, strong?: boolean) => (
    <div className="flex justify-between" style={{ width: 220 }}>
      <span className={strong ? "text-[12px] font-semibold text-[#0A0A0A]" : "text-[12px] text-black/50"}>{label}</span>
      <span className={strong ? "text-[12px] font-semibold text-[#0A0A0A]" : "text-[12px] text-[#0A0A0A]"}>{value}</span>
    </div>
  );

  return (
    <div className="pb-16">
      {/* header / actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <button onClick={() => router.push("/admin/invoices")} className="text-[12px] text-black/45 hover:text-black mb-1">← All invoices</button>
          <h1 className="text-[22px] font-semibold text-[#0A0A0A]">{inv.number} <span className="text-black/35 text-[15px] capitalize">{inv.docType}</span></h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {savedAt && <span className="text-[11px] text-black/35">saved {savedAt}</span>}
          <a href={`/api/admin/invoices/${id}/pdf`} className="rounded-full bg-white shadow-sm hover:shadow-md px-4 py-2 text-[12px] text-[#0A0A0A]/80">Download</a>
          <button onClick={() => setSendOpen(true)} className="rounded-full bg-white shadow-sm hover:shadow-md px-4 py-2 text-[12px] text-[#0A0A0A]/80">Email…</button>
          <button onClick={del} className="rounded-full bg-white shadow-sm hover:shadow-md px-4 py-2 text-[12px] text-[#c0392b]/80">Delete</button>
          <button onClick={save} disabled={saving} className="rounded-full bg-[#0A0A0A] text-white text-[12px] px-5 py-2 hover:opacity-80 disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* main column */}
        <div className="lg:col-span-2 space-y-4">
          {/* doc meta */}
          <div className="rounded-3xl bg-white shadow-sm p-5 grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className={lab}>Type</label>
              <select className={input} value={inv.docType} onChange={(e) => set({ docType: e.target.value as Invoice["docType"] })}>
                <option value="invoice">Invoice</option><option value="quote">Quote</option>
              </select>
            </div>
            <div>
              <label className={lab}>Status</label>
              <select className={input} value={inv.status} onChange={(e) => set({ status: e.target.value as Invoice["status"] })}>
                <option value="draft">Draft</option><option value="sent">Sent</option><option value="paid">Paid</option><option value="overdue">Overdue</option>
              </select>
            </div>
            <div><label className={lab}>Number</label><input className={input} value={inv.number} onChange={(e) => set({ number: e.target.value })} /></div>
            <div><label className={lab}>Issue date</label><input type="date" className={input} value={inv.issueDate} onChange={(e) => set({ issueDate: e.target.value })} /></div>
            <div><label className={lab}>Due date</label><input type="date" className={input} value={inv.dueDate} onChange={(e) => set({ dueDate: e.target.value })} /></div>
            <div><label className={lab}>Currency</label><input className={input} value={inv.currency} onChange={(e) => set({ currency: e.target.value })} /></div>
            <div className="col-span-2 md:col-span-3"><label className={lab}>Subject line</label><input className={input} value={inv.subject} onChange={(e) => set({ subject: e.target.value })} /></div>
          </div>

          {/* client */}
          <div className="rounded-3xl bg-white shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-semibold text-[#0A0A0A]">Bill to</h3>
              <select className="rounded-lg border border-black/10 bg-white px-2 py-1 text-[12px] text-[#0A0A0A]" value={inv.clientId ?? ""} onChange={(e) => pickClient(e.target.value)}>
                <option value="">— pick from CRM —</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}{c.company ? ` (${c.company})` : ""}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={lab}>Name</label><input className={input} value={inv.client.name} onChange={(e) => set({ client: { ...inv.client, name: e.target.value } })} /></div>
              <div><label className={lab}>Company</label><input className={input} value={inv.client.company} onChange={(e) => set({ client: { ...inv.client, company: e.target.value } })} /></div>
              <div><label className={lab}>Email</label><input className={input} value={inv.client.email} onChange={(e) => set({ client: { ...inv.client, email: e.target.value } })} /></div>
              <div><label className={lab}>ABN</label><input className={input} value={inv.client.abn} onChange={(e) => set({ client: { ...inv.client, abn: e.target.value } })} /></div>
              <div className="col-span-2"><label className={lab}>Address</label><input className={input} value={inv.client.address} onChange={(e) => set({ client: { ...inv.client, address: e.target.value } })} /></div>
            </div>
          </div>

          {/* line items */}
          <div className="rounded-3xl bg-white shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-semibold text-[#0A0A0A]">Line items</h3>
              <button onClick={addItem} className="rounded-full bg-[#0A0A0A] text-white text-[12px] px-3 py-1.5 hover:opacity-80">+ Item</button>
            </div>
            <div className="space-y-3">
              {inv.items.map((it, i) => (
                <div key={i} className="rounded-2xl border border-black/10 p-3">
                  <div className="flex items-start gap-2">
                    <div className="flex flex-col gap-1 pt-1">
                      <button onClick={() => moveItem(i, -1)} className="text-black/30 hover:text-black text-[10px]">▲</button>
                      <button onClick={() => moveItem(i, 1)} className="text-black/30 hover:text-black text-[10px]">▼</button>
                    </div>
                    <div className="flex-1 space-y-2">
                      <input className={input} value={it.description} onChange={(e) => setItem(i, { description: e.target.value })} placeholder="Description" />
                      {it.subItems.map((sub, j) => (
                        <div key={j} className="flex gap-2 pl-4">
                          <input className={input} value={sub} onChange={(e) => setItem(i, { subItems: it.subItems.map((x, k) => (k === j ? e.target.value : x)) })} placeholder="Sub item" />
                          <button onClick={() => setItem(i, { subItems: it.subItems.filter((_, k) => k !== j) })} className="text-black/30 hover:text-[#c0392b] text-sm px-1">✕</button>
                        </div>
                      ))}
                      <button onClick={() => setItem(i, { subItems: [...it.subItems, ""] })} className="text-[11px] text-black/45 hover:text-black pl-4">+ sub item</button>
                      <div className="grid grid-cols-4 gap-2">
                        <div><label className={lab}>Qty</label><input type="number" className={input} value={it.qty} onChange={(e) => setItem(i, { qty: Number(e.target.value) })} /></div>
                        <div><label className={lab}>Rate</label><input type="number" className={input} value={it.rate} onChange={(e) => setItem(i, { rate: Number(e.target.value) })} /></div>
                        <div><label className={lab}>Discount</label><input type="number" className={input} value={it.discount} onChange={(e) => setItem(i, { discount: Number(e.target.value) })} /></div>
                        <div><label className={lab}>Amount</label><div className="px-3 py-2 text-[13px] font-semibold text-[#0A0A0A]">{money(lineAmount(it))}</div></div>
                      </div>
                    </div>
                    <button onClick={() => removeItem(i)} className="text-black/30 hover:text-[#c0392b] text-sm pt-1">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white shadow-sm p-5">
            <label className={lab}>Notes</label>
            <textarea className={`${input} resize-y`} rows={2} value={inv.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="Optional note shown to the client" />
          </div>
        </div>

        {/* side column: totals + recurring */}
        <div className="space-y-4">
          <div className="rounded-3xl bg-white shadow-sm p-5 space-y-3">
            <h3 className="text-[13px] font-semibold text-[#0A0A0A]">Totals</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={lab}>Tax rate %</label><input type="number" className={input} value={inv.taxRate} onChange={(e) => set({ taxRate: Number(e.target.value) })} /></div>
              <div><label className={lab}>Tax label</label><input className={input} value={inv.taxLabel} onChange={(e) => set({ taxLabel: e.target.value })} /></div>
            </div>
            <div><label className={lab}>Invoice discount</label><input type="number" className={input} value={inv.discount} onChange={(e) => set({ discount: Number(e.target.value) })} /></div>
            <div className="border-t border-black/10 pt-3 space-y-1.5">
              {totalRow("Subtotal", money(t.subtotal))}
              {totalRow("Discount", money(t.discount))}
              {totalRow(`Tax (${inv.taxLabel})`, money(t.tax))}
              {totalRow(`Balance due (${inv.currency})`, money(t.total), true)}
            </div>
          </div>

          <div className="rounded-3xl bg-white shadow-sm p-5 space-y-3">
            <label className="flex items-center gap-2 text-[13px] text-[#0A0A0A] cursor-pointer select-none">
              <input type="checkbox" className="accent-black w-4 h-4" checked={inv.isTemplate} onChange={(e) => set({ isTemplate: e.target.checked, recurInterval: e.target.checked ? (inv.recurInterval || "monthly") : null })} />
              Recurring template
            </label>
            {inv.isTemplate && (
              <div>
                <label className={lab}>Repeats</label>
                <select className={input} value={inv.recurInterval ?? "monthly"} onChange={(e) => set({ recurInterval: e.target.value as RecurInterval })}>
                  {INTERVALS.map((iv) => <option key={iv} value={iv}>{iv}</option>)}
                </select>
                <p className="text-[11px] text-black/40 mt-2">Use “Duplicate to new invoice” to generate the next one when it’s due.</p>
                <button onClick={async () => {
                  const r = await fetch("/api/admin/invoices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...inv, id: undefined, isTemplate: false, recurInterval: null, status: "draft" }) });
                  if (r.ok) { const ni = await r.json(); router.push(`/admin/invoices/${ni.id}`); }
                }} className="mt-2 rounded-full bg-[#0A0A0A] text-white text-[12px] px-4 py-2 hover:opacity-80">Generate next invoice</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* live preview */}
      {settings && (
        <div className="mt-8">
          <h3 className="text-[12px] font-semibold text-black/45 uppercase tracking-wide mb-3">Live preview</h3>
          <InvoicePreview inv={inv} cfg={settings} />
        </div>
      )}

      {sendOpen && settings && <SendModal inv={inv} settings={settings} onClose={() => setSendOpen(false)} onSent={() => { setSendOpen(false); set({ status: inv.status === "draft" ? "sent" : inv.status }); }} />}
    </div>
  );
}

function SendModal({ inv, settings, onClose, onSent }: { inv: Invoice; settings: InvoiceSettings; onClose: () => void; onSent: () => void }) {
  const [to, setTo] = useState(inv.client.email || "");
  const [subject, setSubject] = useState(settings.emailSubject);
  const [message, setMessage] = useState(settings.emailBody);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  const send = async () => {
    setSending(true); setErr("");
    const r = await fetch(`/api/admin/invoices/${inv.id}/send`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to, subject, message }),
    });
    setSending(false);
    if (r.ok) { alert("Sent!"); onSent(); }
    else { const d = await r.json().catch(() => ({})); setErr(d.error || "Failed to send."); }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-[16px] font-semibold text-[#0A0A0A] mb-1">Email {inv.docType}</h2>
        <p className="text-[11px] text-black/45 mb-4">PDF attached automatically. Placeholders: {"{{client}} {{number}} {{subject}} {{total}} {{due}}"}.</p>
        <div className="space-y-3">
          <div><label className={lab}>To</label><input className={input} value={to} onChange={(e) => setTo(e.target.value)} placeholder="client@email.com" /></div>
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
