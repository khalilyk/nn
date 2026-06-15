// ── Invoicing + CRM types ──

export type Client = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string; // multi-line
  abn: string;
  notes: string;
  createdAt: string;
};

/** A line item, with optional named sub-items shown beneath it. */
export type InvoiceItem = {
  description: string;
  subItems: string[];
  qty: number;
  rate: number; // unit price
  discount: number; // absolute amount off this line
};

export type InvoiceDocType = "invoice" | "quote";
export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";
export type RecurInterval = "weekly" | "fortnightly" | "monthly" | "quarterly" | "yearly";

/** Company / payment details printed on every invoice. Single editable row. */
export type InvoiceSettings = {
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  email: string;
  phone: string;
  abn: string; // tax number / ABN
  logoUrl: string;
  // payment
  bankName: string;
  bsb: string;
  accName: string;
  accNumber: string;
  // defaults
  currency: string; // e.g. AUD
  taxLabel: string; // e.g. "GST 10%"
  taxRate: number; // percent, e.g. 10
  paymentTermsDays: number;
  terms: string; // long terms & conditions block
  emailSubject: string; // default email subject template
  emailBody: string; // default email body template
};

export type Invoice = {
  id: number;
  number: string; // e.g. "#001845"
  docType: InvoiceDocType;
  status: InvoiceStatus;
  clientId: number | null;
  // snapshot of client details at issue time (so edits to the client don't rewrite history)
  client: { name: string; company: string; email: string; address: string; abn: string };
  subject: string;
  issueDate: string; // ISO yyyy-mm-dd
  dueDate: string; // ISO yyyy-mm-dd
  items: InvoiceItem[];
  taxRate: number; // percent
  taxLabel: string;
  discount: number; // absolute amount off the whole invoice
  currency: string;
  notes: string;
  // recurring template
  isTemplate: boolean; // true = a reusable recurring template, not a real issued doc
  recurInterval: RecurInterval | null;
  createdAt: string;
  updatedAt: string;
};

// ── money helpers ──

export function lineAmount(it: InvoiceItem): number {
  return Math.max(0, it.qty * it.rate - (it.discount || 0));
}

export function computeTotals(inv: Pick<Invoice, "items" | "taxRate" | "discount">) {
  const subtotal = inv.items.reduce((s, it) => s + lineAmount(it), 0);
  const afterDiscount = Math.max(0, subtotal - (inv.discount || 0));
  const tax = afterDiscount * ((inv.taxRate || 0) / 100);
  const total = afterDiscount + tax;
  return { subtotal, discount: inv.discount || 0, tax, total };
}

export function money(n: number, currency = ""): string {
  const v = (Math.round(n * 100) / 100).toLocaleString("en-AU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return currency ? `${v}` : v;
}
