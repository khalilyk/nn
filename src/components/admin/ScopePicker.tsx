"use client";

import { useEffect, useMemo, useState } from "react";
import type { ServicesCatalog } from "@/lib/services/types";
import { money } from "@/lib/invoice/types";

/** Modal that lets you pick offerings from the Services catalog and insert a
 *  formatted "Scope & Investment" slide (rich HTML) into a proposal. */
export default function ScopePicker({ onInsert, onClose }: { onInsert: (html: string) => void; onClose: () => void }) {
  const [catalog, setCatalog] = useState<ServicesCatalog>([]);
  const [loaded, setLoaded] = useState(false);
  const [sel, setSel] = useState<Record<string, boolean>>({});
  const [showPrices, setShowPrices] = useState(true);

  useEffect(() => {
    fetch("/api/admin/services", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: ServicesCatalog) => setCatalog(Array.isArray(d) ? d : []))
      .catch(() => setCatalog([]))
      .finally(() => setLoaded(true));
  }, []);

  const chosen = useMemo(
    () => catalog.flatMap((c) => c.services.flatMap((s) => s.items.filter((i) => sel[i.id]).map((i) => ({ ...i, cat: c.name })))),
    [catalog, sel]
  );
  const total = chosen.reduce((n, i) => n + (i.rate || 0), 0);

  const insert = () => {
    if (!chosen.length) return;
    const byCat = new Map<string, typeof chosen>();
    for (const i of chosen) byCat.set(i.cat, [...(byCat.get(i.cat) || []), i]);
    let html = "<h3>SCOPE &amp; INVESTMENT</h3>";
    for (const [catName, items] of byCat) {
      html += `<p><strong>${catName.toUpperCase()}</strong></p><ul>`;
      html += items
        .map((i) => {
          const price = showPrices && i.rate ? ` — ${money(i.rate)}` : "";
          const desc = i.description ? `: ${i.description}` : "";
          return `<li>${i.name}${desc}${price}</li>`;
        })
        .join("");
      html += "</ul>";
    }
    if (showPrices && total > 0) html += `<p><strong>TOTAL INVESTMENT</strong><br/>${money(total)} AUD</p>`;
    onInsert(html);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/40 grid place-items-center p-4" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-white shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
          <div>
            <h3 className="text-[15px] font-semibold text-[#0A0A0A]">Scope from services</h3>
            <p className="text-[12px] text-black/45">Pick offerings — they become a formatted scope slide.</p>
          </div>
          <button onClick={onClose} className="text-black/40 hover:text-black text-lg leading-none">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {!loaded ? (
            <p className="text-[13px] text-black/40">Loading catalog…</p>
          ) : catalog.length === 0 ? (
            <p className="text-[13px] text-black/40">No services yet. Build your catalog under Services first.</p>
          ) : (
            catalog.map((c) => (
              <div key={c.id}>
                <p className="text-[11px] tracking-[0.12em] uppercase text-black/40 mb-1.5">{c.name}</p>
                <div className="space-y-2">
                  {c.services.map((s) => (
                    <div key={s.id}>
                      <p className="text-[11px] font-medium text-black/55 mb-1">{s.name}</p>
                      <div className="grid sm:grid-cols-2 gap-1">
                        {s.items.map((i) => (
                          <label key={i.id} className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 cursor-pointer border transition-colors ${sel[i.id] ? "border-[#0A0A0A] bg-black/[0.03]" : "border-black/10 hover:border-black/25"}`}>
                            <input type="checkbox" checked={!!sel[i.id]} onChange={() => setSel((v) => ({ ...v, [i.id]: !v[i.id] }))} className="accent-[#0A0A0A]" />
                            <span className="text-[13px] text-[#0A0A0A] flex-1 min-w-0 truncate">{i.name}</span>
                            {i.rate > 0 && <span className="text-[12px] text-black/45 shrink-0">{money(i.rate)}</span>}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-black/[0.06]">
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-[12px] text-black/60 cursor-pointer">
              <input type="checkbox" checked={showPrices} onChange={(e) => setShowPrices(e.target.checked)} className="accent-[#0A0A0A]" /> Include pricing
            </label>
            <span className="text-[12px] text-black/45">{chosen.length} selected{showPrices && total > 0 ? ` · ${money(total)}` : ""}</span>
          </div>
          <button onClick={insert} disabled={!chosen.length} className="rounded-full bg-[#0A0A0A] text-white px-5 py-2.5 text-[12px] tracking-[0.08em] uppercase hover:opacity-80 disabled:opacity-40 transition-opacity">Insert scope slide</button>
        </div>
      </div>
    </div>
  );
}
