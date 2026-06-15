import type { InvoiceSettings, Invoice } from "./types";

export const DEFAULT_SETTINGS: InvoiceSettings = {
  companyName: "NOT NORMAL",
  addressLine1: "100 Studio Street",
  addressLine2: "Sydney NSW 2000",
  email: "hello@thisisnn.com",
  phone: "+61 000 000 000",
  abn: "00 000 000 000",
  logoUrl: "/notnormal-logowhite.png",
  bankName: "Bank Transfer",
  bsb: "000 000",
  accName: "Not Normal Pty Ltd",
  accNumber: "000 000 000",
  currency: "AUD",
  taxLabel: "GST 10%",
  taxRate: 10,
  paymentTermsDays: 7,
  terms:
    "1. This invoice only covers the services provided by Not Normal and does not include any print or production costs.\n2. The client agrees to pay a 50% deposit upfront before work commences. Work will not commence until the deposit has been paid via bank transfer.\n3. The remaining balance of the agreed quote must be paid within 7 days after completion and delivery of the work.\n4. Late payments may be subject to interest charges. By accepting this invoice, you agree to these terms and conditions.",
  emailSubject: "Invoice {{number}} from Not Normal",
  emailBody:
    "Hi {{client}},\n\nPlease find attached invoice {{number}} for {{subject}}, totalling {{total}}.\n\nPayment is due by {{due}}. Bank details are on the invoice.\n\nThank you,\nNot Normal",
};

/** A fresh blank invoice (pre-fill from settings before saving). */
export function blankInvoice(seq: number, s: InvoiceSettings): Omit<Invoice, "id" | "createdAt" | "updatedAt"> {
  return {
    number: `#${String(seq).padStart(6, "0")}`,
    docType: "invoice",
    status: "draft",
    clientId: null,
    client: { name: "", company: "", email: "", address: "", abn: "" },
    subject: "",
    issueDate: "",
    dueDate: "",
    items: [{ description: "Project Item One", subItems: [], qty: 1, rate: 0, discount: 0 }],
    taxRate: s.taxRate,
    taxLabel: s.taxLabel,
    discount: 0,
    currency: s.currency,
    notes: "",
    isTemplate: false,
    recurInterval: null,
  };
}
