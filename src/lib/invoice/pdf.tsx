import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, renderToBuffer } from "@react-pdf/renderer";
import type { Invoice, InvoiceSettings } from "./types";
import { computeTotals, lineAmount, money } from "./types";

// Black invoice in the "Boring Studios" style — bold wordmark, dark page, mono-ish grid.
const C = { bg: "#0A0A0A", fg: "#FFFFFF", dim: "#9A9A9A", line: "#333333" };

const s = StyleSheet.create({
  page: { backgroundColor: C.bg, color: C.fg, padding: 40, fontSize: 9, fontFamily: "Helvetica" },
  brand: { fontSize: 34, fontFamily: "Helvetica-Bold", letterSpacing: -1, marginBottom: 56 },
  logo: { height: 40, marginBottom: 52, objectFit: "contain", alignSelf: "flex-start" },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 34 },
  metaBlock: { flexDirection: "row", gap: 36 },
  metaCol: { gap: 2 },
  small: { fontSize: 9, color: C.fg },
  dim: { fontSize: 8, color: C.dim },
  invoiceWord: { fontSize: 26, fontFamily: "Helvetica-Bold" },
  // line items
  thead: { flexDirection: "row", borderBottomWidth: 0, paddingBottom: 6 },
  row: { flexDirection: "row", marginBottom: 14 },
  cDesc: { flex: 1 },
  cNum: { width: 60, textAlign: "right" },
  itemTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  sub: { fontSize: 9, color: C.fg, marginLeft: 14, marginTop: 1 },
  // totals
  totals: { marginTop: 40, alignItems: "flex-end" },
  totalLine: { flexDirection: "row", justifyContent: "space-between", width: 240, marginBottom: 3 },
  totalLabel: { fontSize: 9, fontFamily: "Helvetica-Bold" },
  balance: { flexDirection: "row", justifyContent: "space-between", width: 240, marginTop: 10 },
  balanceLabel: { fontSize: 11, fontFamily: "Helvetica-Bold" },
  // payment footer
  payWrap: { marginTop: "auto", paddingTop: 26 },
  payTop: { flexDirection: "row", gap: 26, marginBottom: 22 },
  payHeading: { fontSize: 22, fontFamily: "Helvetica-Bold", marginBottom: 8 },
  termsCol: { flex: 1 },
  termsTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  terms: { fontSize: 7, color: C.dim, lineHeight: 1.5 },
  footerRow: { flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: C.line, paddingTop: 8 },
  footerCol: { gap: 1 },
});

function Totals({ inv }: { inv: Invoice }) {
  const t = computeTotals(inv);
  const cur = inv.currency;
  const L = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
    <View style={s.totalLine}>
      <Text style={bold ? s.totalLabel : s.dim}>{label}</Text>
      <Text style={bold ? s.totalLabel : s.small}>{value}</Text>
    </View>
  );
  return (
    <View style={s.totals}>
      <L label="SUB TOTAL:" value={money(t.subtotal)} bold />
      <L label={`TAX (${inv.taxLabel}):`} value={money(t.tax)} bold />
      <L label="TOTAL:" value={money(t.subtotal + t.tax)} bold />
      <L label="DISCOUNT" value={money(t.discount)} bold />
      <View style={s.balance}>
        <Text style={s.balanceLabel}>BALANCE DUE ({cur}) :</Text>
        <Text style={s.balanceLabel}>{money(t.total)}</Text>
      </View>
    </View>
  );
}

export function InvoiceDoc({ inv, cfg, logoSrc }: { inv: Invoice; cfg: InvoiceSettings; logoSrc?: string }) {
  const heading = inv.docType === "quote" ? "QUOTE" : "INVOICE";
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {logoSrc
          ? <Image src={logoSrc} style={s.logo} />
          : <Text style={s.brand}>[{cfg.companyName}]</Text>}

        <View style={s.topRow}>
          <View style={s.metaBlock}>
            <View style={s.metaCol}>
              <Text style={s.small}>[{inv.issueDate || "Date"}]</Text>
              <Text style={s.small}>[{inv.client.name || "Client Name"}]</Text>
            </View>
            <View style={s.metaCol}>
              <Text style={s.small}>[{inv.number}]</Text>
              <Text style={s.small}>[{inv.subject || "Subject line"}]</Text>
            </View>
          </View>
          <Text style={s.invoiceWord}>{heading}</Text>
        </View>

        {/* line items */}
        <View>
          {inv.items.map((it, i) => (
            <View key={i} style={s.row} wrap={false}>
              <View style={s.cDesc}>
                <Text style={s.itemTitle}>{it.description || "Item"}</Text>
                {it.subItems.filter(Boolean).map((sub, j) => (
                  <Text key={j} style={s.sub}>{sub}</Text>
                ))}
              </View>
              <Text style={[s.cNum, s.small]}>{it.qty}</Text>
              <Text style={[s.cNum, s.small]}>{money(it.rate)}</Text>
              <Text style={[s.cNum, s.small]}>{money(it.discount)}</Text>
              <Text style={[s.cNum, s.small]}>{money(lineAmount(it))}</Text>
            </View>
          ))}
        </View>

        <Totals inv={inv} />

        {/* payment + terms footer */}
        <View style={s.payWrap}>
          <View style={s.payTop}>
            <View style={{ width: 230 }}>
              <Text style={s.payHeading}>PAYMENT</Text>
              <Text style={[s.dim, { marginBottom: 8 }]}>[INV NO. {inv.number.replace("#", "")}]</Text>
              <Text style={[s.small, { marginBottom: 6 }]}>[{cfg.bankName.toUpperCase()}]</Text>
              <Text style={s.small}>[{cfg.accName.toUpperCase()}]</Text>
              <Text style={s.small}>BSB: {cfg.bsb}</Text>
              <Text style={s.small}>ACC NO. {cfg.accNumber}</Text>
              <Text style={[s.dim, { marginTop: 8 }]}>[TERMS: {cfg.paymentTermsDays} DAYS FROM ISSUE DATE]</Text>
            </View>
            <View style={s.termsCol}>
              <Text style={s.termsTitle}>TERMS &amp; CONDITIONS:</Text>
              <Text style={s.terms}>{cfg.terms}</Text>
            </View>
          </View>

          <View style={s.footerRow}>
            <View style={s.footerCol}>
              <Text style={s.dim}>[{cfg.companyName}]</Text>
              <Text style={s.dim}>[{cfg.addressLine1}]</Text>
            </View>
            <View style={s.footerCol}>
              <Text style={s.dim}>[{cfg.addressLine2}]</Text>
            </View>
            <View style={s.footerCol}>
              <Text style={s.dim}>[TAX NUMBER/ABN]</Text>
              <Text style={s.dim}>[{cfg.abn}]</Text>
            </View>
            <View style={s.footerCol}>
              <Text style={s.dim}>[{cfg.email}]</Text>
              <Text style={s.dim}>[{cfg.phone}]</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

/** Fetch a logo (absolute URL or site-relative path) and return a base64 data URI. */
export async function fetchLogoDataUri(logoUrl: string, origin: string): Promise<string | undefined> {
  if (!logoUrl) return undefined;
  try {
    const url = logoUrl.startsWith("http") ? logoUrl : `${origin}${logoUrl.startsWith("/") ? "" : "/"}${logoUrl}`;
    const res = await fetch(url);
    if (!res.ok) return undefined;
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = url.split(".").pop()?.toLowerCase();
    const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return undefined;
  }
}

export async function renderInvoicePdf(inv: Invoice, cfg: InvoiceSettings, logoSrc?: string): Promise<Buffer> {
  return renderToBuffer(<InvoiceDoc inv={inv} cfg={cfg} logoSrc={logoSrc} />);
}
