import InvoiceSettingsEditor from "@/components/admin/InvoiceSettingsEditor";

export const dynamic = "force-dynamic";

export default function CompanyPage() {
  return (
    <InvoiceSettingsEditor
      title="Company profile"
      subtitle="Your business identity — name, contact, ABN, logo, bank details and terms. Read by invoices and proposals."
    />
  );
}
