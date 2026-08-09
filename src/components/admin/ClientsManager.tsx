"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Client } from "@/lib/invoice/types";

const input = "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[13px] text-[#0A0A0A]";
const lab = "block text-[11px] tracking-[0.12em] uppercase text-black/45 mb-1";
const empty: Partial<Client> = { name: "", company: "", email: "", phone: "", address: "", abn: "", notes: "" };

export default function ClientsManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Client> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/clients", { cache: "no-store" });
    setClients(r.ok ? await r.json() : []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing.id;
    await fetch(isNew ? "/api/admin/clients" : `/api/admin/clients/${editing.id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setSaving(false);
    setEditing(null);
    load();
  };

  const del = async (id: number) => {
    if (!confirm("Delete this client?")) return;
    await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="pb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#0A0A0A] mb-1">Clients</h1>
          <p className="text-[13px] text-[#0A0A0A]/50">Your CRM — contacts you invoice.</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="rounded-full bg-[#0A0A0A] text-white text-[12px] px-4 py-2 hover:opacity-80 transition-opacity">+ New client</button>
      </div>

      {loading ? (
        <p className="text-[13px] text-black/40">Loading…</p>
      ) : clients.length === 0 ? (
        <div className="rounded-3xl bg-white shadow-sm p-8 text-center text-[13px] text-black/45">No clients yet. Add your first one.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {clients.map((c) => (
            <div key={c.id} className="rounded-2xl bg-white shadow-sm p-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[14px] font-semibold text-[#0A0A0A] truncate">{c.name}</div>
                {c.company && <div className="text-[12px] text-black/50 truncate">{c.company}</div>}
                {c.email && <div className="text-[12px] text-black/50 truncate">{c.email}</div>}
                {c.phone && <div className="text-[12px] text-black/40">{c.phone}</div>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(c)} className="text-[12px] text-black/55 hover:text-black">Edit</button>
                <button onClick={() => del(c.id)} className="text-[12px] text-black/40 hover:text-[#c0392b]">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
      {editing && (
        <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setEditing(null)}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <div className="absolute inset-0 bg-black/40" />
          <motion.div className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.98 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
            <h2 className="text-[16px] font-semibold text-[#0A0A0A] mb-4">{editing.id ? "Edit client" : "New client"}</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className={lab}>Name</label><input className={input} value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
                <div><label className={lab}>Company</label><input className={input} value={editing.company || ""} onChange={(e) => setEditing({ ...editing, company: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={lab}>Email</label><input className={input} value={editing.email || ""} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></div>
                <div><label className={lab}>Phone</label><input className={input} value={editing.phone || ""} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} /></div>
              </div>
              <div><label className={lab}>Address</label><textarea className={`${input} resize-y`} rows={2} value={editing.address || ""} onChange={(e) => setEditing({ ...editing, address: e.target.value })} /></div>
              <div><label className={lab}>ABN / Tax number</label><input className={input} value={editing.abn || ""} onChange={(e) => setEditing({ ...editing, abn: e.target.value })} /></div>
              <div><label className={lab}>Notes</label><textarea className={`${input} resize-y`} rows={2} value={editing.notes || ""} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} /></div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setEditing(null)} className="rounded-full px-4 py-2 text-[12px] text-black/55 hover:text-black">Cancel</button>
              <button onClick={save} disabled={saving} className="rounded-full bg-[#0A0A0A] text-white text-[12px] px-5 py-2 hover:opacity-80 disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
