import InvoiceEditor from "@/components/admin/InvoiceEditor";

export const dynamic = "force-dynamic";

export default async function InvoiceEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <InvoiceEditor id={Number(id)} />;
}
