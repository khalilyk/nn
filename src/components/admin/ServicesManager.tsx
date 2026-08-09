"use client";

import { useEffect, useState } from "react";
import { DEFAULT_CATALOG, type ServicesCatalog, type CatalogCategory, type CatalogItem } from "@/lib/services/types";
import { PageHeader, Card, Button, EmptyState } from "./ui";

const uid = () => `x-${Math.random().toString(36).slice(2, 9)}`;

function moved<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const c = [...arr];
  [c[i], c[j]] = [c[j], c[i]];
  return c;
}

const field = "bg-white border border-black/10 rounded-lg px-2.5 py-1.5 text-[13px] outline-none focus:border-black/40 transition-colors";
const rowBtn = "grid h-6 w-6 place-items-center rounded border border-black/15 text-[11px] text-black/50 hover:border-black hover:text-black disabled:opacity-25 disabled:hover:border-black/15 disabled:hover:text-black/50";

export default function ServicesManager() {
  const [catalog, setCatalog] = useState<ServicesCatalog>([]);
  const [loaded, setLoaded] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    fetch("/api/admin/services", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: ServicesCatalog) => setCatalog(Array.isArray(d) && d.length ? d : DEFAULT_CATALOG))
      .catch(() => setCatalog(DEFAULT_CATALOG))
      .finally(() => setLoaded(true));
  }, []);

  const mutate = (fn: (c: ServicesCatalog) => ServicesCatalog) => { setCatalog(fn); setDirty(true); setStatus("idle"); };
  const inCat = (id: string, fn: (c: CatalogCategory) => CatalogCategory) => mutate((c) => c.map((x) => (x.id === id ? fn(x) : x)));
  const inItem = (catId: string, itId: string, fn: (i: CatalogItem) => CatalogItem) =>
    inCat(catId, (c) => ({ ...c, items: c.items.map((i) => (i.id === itId ? fn(i) : i)) }));

  const totalItems = catalog.reduce((n, c) => n + c.items.length, 0);

  const save = async () => {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/services", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(catalog) });
      if (!res.ok) throw new Error();
      setStatus("saved"); setDirty(false);
    } catch { setStatus("error"); }
  };

  if (!loaded) return <div className="text-[13px] text-black/40 py-10">Loading catalog…</div>;

  return (
    <div className="pb-10">
      <PageHeader title="Services" subtitle={`${catalog.length} categories · ${totalItems} offerings — the catalog proposals price from`}>
        <Button onClick={() => mutate((c) => [...c, { id: uid(), name: "New category", items: [] }])} variant="ghost">+ Category</Button>
        <Button onClick={save} disabled={!dirty || status === "saving"}>
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓" : dirty ? "Save changes" : "Saved"}
        </Button>
      </PageHeader>
      {status === "error" && <p className="mb-3 text-[12px] text-[#C0392B]">Save failed — has the services_catalog table been migrated?</p>}

      <div className="space-y-3">
        {catalog.map((c, ci) => (
          <Card key={c.id}>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex flex-col gap-0.5">
                <button className={rowBtn} onClick={() => mutate((x) => moved(x, ci, -1))} disabled={ci === 0}>▲</button>
                <button className={rowBtn} onClick={() => mutate((x) => moved(x, ci, 1))} disabled={ci === catalog.length - 1}>▼</button>
              </div>
              <input className={`${field} flex-1 text-[15px] font-semibold`} value={c.name} onChange={(e) => inCat(c.id, (x) => ({ ...x, name: e.target.value }))} />
              <span className="text-[11px] text-black/35">{c.items.length}</span>
              <button className="text-[12px] text-[#C0392B] hover:opacity-70" onClick={() => { if (!c.items.length || confirm(`Remove “${c.name}” and its ${c.items.length} items?`)) mutate((x) => x.filter((k) => k.id !== c.id)); }}>Delete</button>
            </div>

            {/* column labels */}
            <div className="hidden sm:flex items-center gap-2 px-9 pb-1 text-[10px] tracking-[0.12em] uppercase text-black/35">
              <span className="flex-1">Offering</span>
              <span className="w-40">Description (optional)</span>
              <span className="w-24 text-right">Rate (AUD)</span>
              <span className="w-10" />
            </div>

            <div className="space-y-1.5">
              {c.items.map((it, ii) => (
                <div key={it.id} className="flex items-center gap-2">
                  <div className="flex flex-col gap-0.5">
                    <button className={rowBtn} onClick={() => inCat(c.id, (x) => ({ ...x, items: moved(x.items, ii, -1) }))} disabled={ii === 0}>▲</button>
                    <button className={rowBtn} onClick={() => inCat(c.id, (x) => ({ ...x, items: moved(x.items, ii, 1) }))} disabled={ii === c.items.length - 1}>▼</button>
                  </div>
                  <input className={`${field} flex-1`} value={it.name} onChange={(e) => inItem(c.id, it.id, (i) => ({ ...i, name: e.target.value }))} placeholder="Offering name" />
                  <input className={`${field} w-40`} value={it.description || ""} onChange={(e) => inItem(c.id, it.id, (i) => ({ ...i, description: e.target.value }))} placeholder="—" />
                  <div className="relative w-24">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[12px] text-black/35">$</span>
                    <input type="number" min={0} className={`${field} w-full pl-5 text-right`} value={it.rate || 0} onChange={(e) => inItem(c.id, it.id, (i) => ({ ...i, rate: Number(e.target.value) || 0 }))} />
                  </div>
                  <button className="w-10 text-[12px] text-[#C0392B] hover:opacity-70" onClick={() => inCat(c.id, (x) => ({ ...x, items: x.items.filter((k) => k.id !== it.id) }))}>✕</button>
                </div>
              ))}
              {c.items.length === 0 && <EmptyState>No offerings yet.</EmptyState>}
            </div>

            <button className="mt-3 text-[12px] text-[#0A0A0A] hover:opacity-60" onClick={() => inCat(c.id, (x) => ({ ...x, items: [...x.items, { id: uid(), name: "New offering", rate: 0 }] }))}>+ Add offering</button>
          </Card>
        ))}
      </div>
    </div>
  );
}
