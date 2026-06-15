"use client";

import type { Invoice, InvoiceSettings } from "@/lib/invoice/types";
import { computeTotals, lineAmount, money } from "@/lib/invoice/types";

/** Live HTML mirror of the generated PDF (Boring-Studios black style). */
export default function InvoicePreview({ inv, cfg }: { inv: Invoice; cfg: InvoiceSettings }) {
  const t = computeTotals(inv);
  const heading = inv.docType === "quote" ? "QUOTE" : "INVOICE";

  return (
    <div className="bg-[#0A0A0A] text-white rounded-xl mx-auto w-full" style={{ maxWidth: 720, aspectRatio: "1 / 1.414", padding: "5%" }}>
      <div className="h-full flex flex-col" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
        <div className="font-bold tracking-tight" style={{ fontSize: "min(5vw, 34px)", marginBottom: "8%" }}>[{cfg.companyName}]</div>

        <div className="flex items-start justify-between" style={{ marginBottom: "6%" }}>
          <div className="flex gap-8">
            <div className="space-y-0.5 text-[11px]">
              <div>[{inv.issueDate || "Date"}]</div>
              <div>[{inv.client.name || "Client Name"}]</div>
            </div>
            <div className="space-y-0.5 text-[11px]">
              <div>[{inv.number}]</div>
              <div>[{inv.subject || "Subject line"}]</div>
            </div>
          </div>
          <div className="font-bold" style={{ fontSize: "min(3.6vw, 26px)" }}>{heading}</div>
        </div>

        {/* line items */}
        <div className="space-y-3">
          {inv.items.map((it, i) => (
            <div key={i} className="flex items-start text-[11px]">
              <div className="flex-1">
                <div className="font-bold text-[12px]">{it.description || "Item"}</div>
                {it.subItems.filter(Boolean).map((s, j) => <div key={j} className="ml-3 mt-0.5">{s}</div>)}
              </div>
              <div className="w-14 text-right">{it.qty}</div>
              <div className="w-16 text-right">{money(it.rate)}</div>
              <div className="w-16 text-right">{money(it.discount)}</div>
              <div className="w-16 text-right">{money(lineAmount(it))}</div>
            </div>
          ))}
        </div>

        {/* totals */}
        <div className="mt-8 flex flex-col items-end">
          <div className="w-56 space-y-1 text-[11px]">
            <Row l="SUB TOTAL:" v={money(t.subtotal)} b />
            <Row l={`TAX (${inv.taxLabel}):`} v={money(t.tax)} b />
            <Row l="TOTAL:" v={money(t.subtotal + t.tax)} b />
            <Row l="DISCOUNT" v={money(t.discount)} b />
            <div className="flex justify-between font-bold text-[13px] pt-2">
              <span>BALANCE DUE ({inv.currency}) :</span><span>{money(t.total)}</span>
            </div>
          </div>
        </div>

        {/* payment + terms */}
        <div className="mt-auto pt-6">
          <div className="flex gap-6 mb-5">
            <div style={{ width: "45%" }}>
              <div className="font-bold" style={{ fontSize: "min(3vw, 22px)" }}>PAYMENT</div>
              <div className="text-[9px] text-white/45 mb-2 mt-1">[INV NO. {inv.number.replace("#", "")}]</div>
              <div className="text-[10px] mb-1">[{cfg.bankName.toUpperCase()}]</div>
              <div className="text-[10px]">[{cfg.accName.toUpperCase()}]</div>
              <div className="text-[10px]">BSB: {cfg.bsb}</div>
              <div className="text-[10px]">ACC NO. {cfg.accNumber}</div>
              <div className="text-[9px] text-white/45 mt-2">[TERMS: {cfg.paymentTermsDays} DAYS FROM ISSUE DATE]</div>
            </div>
            <div className="flex-1">
              <div className="text-[8px] font-bold mb-1">TERMS &amp; CONDITIONS:</div>
              <div className="text-[7px] text-white/45 leading-relaxed whitespace-pre-line">{cfg.terms}</div>
            </div>
          </div>
          <div className="flex justify-between border-t border-white/20 pt-2 text-[8px] text-white/45">
            <div><div>[{cfg.companyName}]</div><div>[{cfg.addressLine1}]</div></div>
            <div><div>[{cfg.addressLine2}]</div></div>
            <div><div>[TAX NUMBER/ABN]</div><div>[{cfg.abn}]</div></div>
            <div><div>[{cfg.email}]</div><div>[{cfg.phone}]</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ l, v, b }: { l: string; v: string; b?: boolean }) {
  return <div className={`flex justify-between ${b ? "font-bold" : ""}`}><span>{l}</span><span>{v}</span></div>;
}
