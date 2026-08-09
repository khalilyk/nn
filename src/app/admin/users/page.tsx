import { getAccount } from "@/lib/auth/account";
import { listMembers } from "@/lib/team/store";
import TeamManager from "@/components/admin/TeamManager";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const [acct, members] = await Promise.all([getAccount().catch(() => null), listMembers()]);
  return <TeamManager ownerEmail={acct?.email ?? ""} initialMembers={members} />;
}
