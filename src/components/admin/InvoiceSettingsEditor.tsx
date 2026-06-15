"use client";

import { useEffect, useState } from "react";
import type { InvoiceSettings } from "@/lib/invoice/types";

const input = "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[13px] text-[#0A0A0A]";
const lab = "block text-[11px] tracking-[0.12em] uppercase text-black/45 mb-1";
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-3xl bg-white shadow-sm p-5 space-y-3">
    <h3 className="text-[13px] font-semibold text-[#0A0A0A]">{title}</h3>
    {children}
  </div>
);

export default function InvoiceSettingsEditor() {
  const [s, setS] = useState<InvoiceSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/invoice-settings", { cache: "no-store" }).then(async (r) => { if (r.ok) setS(await r.json()); });
  }, []);

  if (!s) return <p className="text-[13px] text-black/40">Loading…</p>;
  const set = (patch: Partial<InvoiceSettings>) => setS({ ...s, ...patch });

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/invoice-settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s) });
    setSaving(false);
    setSavedAt(new Date().toLocaleTimeString());
  };

  const uploadLogo = async (file: File) => {
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setUploading(false);
    if (r.ok) { const { url } = await r.json(); set({ logoUrl: url }); }
  };

  return (
    <div className="pb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-semibold text-[#0A0A0A] mb-1">Invoice settings</h1>
          <p className="text-[13px] text-[#0A0A0A]/50">Company info, bank details, tax and terms printed on every invoice.</p>
        </div>
        <div className="flex items-center gap-2">
          {savedAt && <span className="text-[11px] text-black/35">saved {savedAt}</span>}
          <button onClick={save} disabled={saving} className="rounded-full bg-[#0A0A0A] text-white text-[12px] px-5 py-2 hover:opacity-80 disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Company">
          <div><label className={lab}>Company name</label><input className={input} value={s.companyName} onChange={(e) => set({ companyName: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lab}>Address line 1</label><input className={input} value={s.addressLine1} onChange={(e) => set({ addressLine1: e.target.value })} /></div>
            <div><label className={lab}>Address line 2</label><input className={input} value={s.addressLine2} onChange={(e) => set({ addressLine2: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lab}>Email</label><input className={input} value={s.email} onChange={(e) => set({ email: e.target.value })} /></div>
            <div><label className={lab}>Phone</label><input className={input} value={s.phone} onChange={(e) => set({ phone: e.target.value })} /></div>
          </div>
          <div><label className={lab}>ABN / Tax number</label><input className={input} value={s.abn} onChange={(e) => set({ abn: e.target.value })} /></div>
          <div>
            <label className={lab}>Logo</label>
            <div className="flex items-center gap-3">
              {s.logoUrl && <span className="rounded-lg bg-[#0A0A0A] p-2"><img src={s.logoUrl} alt="logo" className="h-5 w-auto" style={{ filter: "invert(1)" }} /></span>}
              <label className="rounded-full bg-black/[0.05] hover:bg-black/[0.08] px-3 py-1.5 text-[12px] cursor-pointer">
                {uploading ? "Uploading…" : "Upload"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadLogo(e.target.files[0])} />
              </label>
            </div>
          </div>
        </Card>

        <Card title="Payment / bank">
          <div><label className={lab}>Method label</label><input className={input} value={s.bankName} onChange={(e) => set({ bankName: e.target.value })} /></div>
          <div><label className={lab}>Account name</label><input className={input} value={s.accName} onChange={(e) => set({ accName: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lab}>BSB</label><input className={input} value={s.bsb} onChange={(e) => set({ bsb: e.target.value })} /></div>
            <div><label className={lab}>Account number</label><input className={input} value={s.accNumber} onChange={(e) => set({ accNumber: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className={lab}>Currency</label><input className={input} value={s.currency} onChange={(e) => set({ currency: e.target.value })} /></div>
            <div><label className={lab}>Tax label</label><input className={input} value={s.taxLabel} onChange={(e) => set({ taxLabel: e.target.value })} /></div>
            <div><label className={lab}>Tax rate %</label><input type="number" className={input} value={s.taxRate} onChange={(e) => set({ taxRate: Number(e.target.value) })} /></div>
          </div>
          <div><label className={lab}>Payment terms (days)</label><input type="number" className={input} value={s.paymentTermsDays} onChange={(e) => set({ paymentTermsDays: Number(e.target.value) })} /></div>
        </Card>

        <Card title="Terms & conditions">
          <textarea className={`${input} resize-y leading-relaxed`} rows={10} value={s.terms} onChange={(e) => set({ terms: e.target.value })} />
        </Card>

        <Card title="Default email">
          <div><label className={lab}>Subject</label><input className={input} value={s.emailSubject} onChange={(e) => set({ emailSubject: e.target.value })} /></div>
          <div><label className={lab}>Body</label><textarea className={`${input} resize-y leading-relaxed`} rows={8} value={s.emailBody} onChange={(e) => set({ emailBody: e.target.value })} /></div>
          <p className="text-[11px] text-black/40">Placeholders: {"{{client}} {{number}} {{subject}} {{total}} {{due}} {{company}}"}</p>
        </Card>
      </div>
    </div>
  );
}
