import ProposalEditor from "@/components/admin/ProposalEditor";

export const dynamic = "force-dynamic";

export default async function ProposalEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProposalEditor id={Number(id)} />;
}
