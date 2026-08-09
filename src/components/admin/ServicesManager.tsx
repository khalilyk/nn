"use client";

import { useEffect, useState } from "react";
import { DEFAULT_CATALOG, type ServicesCatalog, type ServiceCategory, type ServiceDef, type ServiceLineItem } from "@/lib/services/types";
import { PageHeader, Button } from "./ui";

const uid = () => `x-${Math.random().toString(36).slice(2, 9)}`;

function moved<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const c = [...arr];
  [c[i], c[j]] = [c[j], c[i]];
  return c;
}

const iconBtn = "grid h-6 w-6 place-items-center rounded border border-[#14151A]/20 text-[11px] text-[#14151A]/50 hover:border-[#14151A] hover:text-[#14151A] disabled:opacity-25 disabled:hover:border-[#14151A]/20 disabled:hover:text-[#14151A]/50";
const bare = "w-full rounded border border-transparent bg-transparent px-1 py-0.5 outline-none hover:border-[#14151A]/15 focus:border-[#14151A]/40 focus:bg-white transition-colors";

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
  const inCat = (id: string, fn: (c: ServiceCategory) => ServiceCategory) => mutate((c) => c.map((x) => (x.id === id ? fn(x) : x)));
  const inSvc = (catId: string, svcId: string, fn: (s: ServiceDef) => ServiceDef) =>
    inCat(catId, (c) => ({ ...c, services: c.services.map((s) => (s.id === svcId ? fn(s) : s)) }));

  const updateCategory = (id: string, name: string) => inCat(id, (c) => ({ ...c, name }));
  const moveCategory = (i: number, dir: -1 | 1) => mutate((c) => moved(c, i, dir));
  const addCategory = () => mutate((c) => [...c, { id: uid(), name: "New category", services: [] }]);
  const removeCategory = (id: string) => {
    const c = catalog.find((x) => x.id === id);
    if (c && c.services.length && !confirm(`Remove “${c.name}” and its ${c.services.length} service(s)?`)) return;
    mutate((cat) => cat.filter((x) => x.id !== id));
  };
  const renameService = (catId: string, svcId: string, name: string) => inSvc(catId, svcId, (s) => ({ ...s, name }));
  const moveService = (catId: string, i: number, dir: -1 | 1) => inCat(catId, (c) => ({ ...c, services: moved(c.services, i, dir) }));
  const addService = (catId: string) => inCat(catId, (c) => ({ ...c, services: [...c.services, { id: uid(), name: "New service", items: [] }] }));
  const removeService = (catId: string, svcId: string) => inCat(catId, (c) => ({ ...c, services: c.services.filter((s) => s.id !== svcId) }));
  const updateItem = (catId: string, svcId: string, itId: string, patch: Partial<ServiceLineItem>) =>
    inSvc(catId, svcId, (s) => ({ ...s, items: s.items.map((i) => (i.id === itId ? { ...i, ...patch } : i)) }));
  const moveItem = (catId: string, svcId: string, i: number, dir: -1 | 1) => inSvc(catId, svcId, (s) => ({ ...s, items: moved(s.items, i, dir) }));
  const addItem = (catId: string, svcId: string) => inSvc(catId, svcId, (s) => ({ ...s, items: [...s.items, { id: uid(), name: "New item", rate: 0, description: "" }] }));
  const removeItem = (catId: string, svcId: string, itId: string) => inSvc(catId, svcId, (s) => ({ ...s, items: s.items.filter((i) => i.id !== itId) }));

  const save = async () => {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/services", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(catalog) });
      if (!res.ok) throw new Error();
      setStatus("saved"); setDirty(false);
    } catch { setStatus("error"); }
  };

  if (!loaded) return <div className="text-[13px] text-[#14151A]/40 py-10">Loading catalog…</div>;

  return (
    <div className="pb-10">
      <PageHeader title="Services" subtitle="Everything Not Normal offers, grouped by category. Add, reorder and price services and their line items (ex-GST). These rates flow into proposals & invoices.">
        <Button onClick={save} disabled={!dirty || status === "saving"}>
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓" : dirty ? "Save changes" : "Saved"}
        </Button>
      </PageHeader>
      {status === "error" && <p className="mb-3 text-[12px] text-[#C0392B]">Save failed — has the services_catalog table been migrated?</p>}

      <div className="space-y-4">
        {catalog.map((cat, ci) => {
          const itemCount = cat.services.reduce((n, s) => n + s.items.length, 0);
          return (
            <div key={cat.id} className="overflow-hidden rounded-2xl border border-[#14151A]/[0.1] bg-white">
              <div className="flex items-center gap-2.5 border-b border-[#14151A]/[0.08] bg-[#14151A]/[0.03] px-4 py-3">
                <span className="h-5 w-1 shrink-0 rounded-full bg-[#14151A]" aria-hidden />
                <input value={cat.name} onChange={(e) => updateCategory(cat.id, e.target.value)} className={`${bare} min-w-0 flex-1 text-[13px] font-bold uppercase tracking-[0.16em]`} />
                <span className="hidden shrink-0 text-[12px] text-[#14151A]/45 sm:inline">{cat.services.length} service{cat.services.length === 1 ? "" : "s"} · {itemCount} item{itemCount === 1 ? "" : "s"}</span>
                <button onClick={() => moveCategory(ci, -1)} disabled={ci === 0} className={iconBtn}>▲</button>
                <button onClick={() => moveCategory(ci, 1)} disabled={ci === catalog.length - 1} className={iconBtn}>▼</button>
                <button onClick={() => removeCategory(cat.id)} className={`${iconBtn} hover:border-[#C0392B] hover:text-[#C0392B]`}>✕</button>
              </div>

              <div className="p-3 sm:p-4">
                {cat.services.length === 0 && <p className="px-1 py-1.5 text-[12px] text-[#14151A]/40">No services yet.</p>}
                <div className="grid items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {cat.services.map((s, si) => (
                    <div key={s.id} className="group/svc flex flex-col rounded-xl border border-[#14151A]/[0.1] bg-white p-3">
                      <div className="flex items-center gap-1.5">
                        <input value={s.name} onChange={(e) => renameService(cat.id, s.id, e.target.value)} className={`${bare} min-w-0 flex-1 text-[13px] font-semibold`} />
                        <span className="hidden shrink-0 rounded-full bg-[#14151A]/[0.06] px-2 py-0.5 text-[11px] text-[#14151A]/50 sm:inline">{s.items.length}</span>
                        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover/svc:opacity-100 focus-within:opacity-100">
                          <button onClick={() => moveService(cat.id, si, -1)} disabled={si === 0} className={iconBtn}>▲</button>
                          <button onClick={() => moveService(cat.id, si, 1)} disabled={si === cat.services.length - 1} className={iconBtn}>▼</button>
                          <button onClick={() => removeService(cat.id, s.id)} className={`${iconBtn} hover:border-[#C0392B] hover:text-[#C0392B]`}>✕</button>
                        </div>
                      </div>

                      <div className="mt-2 space-y-0.5 border-t border-[#14151A]/[0.08] pt-2">
                        {s.items.map((it, ii) => (
                          <div key={it.id} className="group/item rounded-md px-1.5 py-1 hover:bg-[#14151A]/[0.02]">
                            <input value={it.name} onChange={(e) => updateItem(cat.id, s.id, it.id, { name: e.target.value })} placeholder="Item name" className={`${bare} text-[13px] font-medium`} />
                            <div className="mt-0.5 flex items-center gap-2">
                              <div className="flex shrink-0 items-center rounded border border-transparent px-1 text-[13px] hover:border-[#14151A]/15 focus-within:border-[#14151A]/40 focus-within:bg-white">
                                <span className="text-[#14151A]/40">$</span>
                                <input type="number" min={0} value={it.rate || ""} onChange={(e) => updateItem(cat.id, s.id, it.id, { rate: parseFloat(e.target.value) || 0 })} placeholder="0" className="w-16 bg-transparent px-0.5 py-0.5 text-right outline-none" />
                              </div>
                              <div className="ml-auto flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover/item:opacity-100 focus-within:opacity-100">
                                <button onClick={() => moveItem(cat.id, s.id, ii, -1)} disabled={ii === 0} className={iconBtn}>▲</button>
                                <button onClick={() => moveItem(cat.id, s.id, ii, 1)} disabled={ii === s.items.length - 1} className={iconBtn}>▼</button>
                                <button onClick={() => removeItem(cat.id, s.id, it.id)} className={`${iconBtn} hover:border-[#C0392B] hover:text-[#C0392B]`}>✕</button>
                              </div>
                            </div>
                            <input value={it.description || ""} onChange={(e) => updateItem(cat.id, s.id, it.id, { description: e.target.value })} placeholder="Description (shown in proposals)" className={`${bare} text-[12px] leading-relaxed text-[#14151A]/55`} />
                          </div>
                        ))}
                        <button onClick={() => addItem(cat.id, s.id)} className="ml-1.5 mt-1 text-[12px] font-medium text-[#14151A]/60 hover:text-[#14151A] hover:underline">+ Add item</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => addService(cat.id)} className="mt-3 w-full rounded-xl border border-dashed border-[#14151A]/20 px-3 py-2.5 text-left text-[12px] font-medium text-[#14151A]/60 hover:border-[#14151A]/40 hover:bg-[#14151A]/[0.02] hover:text-[#14151A]">
                  + Add service to {cat.name || "category"}
                </button>
              </div>
            </div>
          );
        })}
        <button onClick={addCategory} className="w-full rounded-2xl border border-dashed border-[#14151A]/25 px-4 py-3 text-[12px] font-medium text-[#14151A]/60 hover:border-[#14151A]/50 hover:bg-[#14151A]/[0.02] hover:text-[#14151A]">
          + Add category
        </button>
      </div>
    </div>
  );
}
