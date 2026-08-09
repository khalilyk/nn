"use client";

import { useState } from "react";
import type { TeamMember } from "@/lib/team/store";
import { PageHeader, Card, Button, Badge, Avatar, EmptyState } from "./ui";

const ROLES = ["admin", "editor"];

export default function TeamManager({ ownerEmail, initialMembers }: { ownerEmail: string; initialMembers: TeamMember[] }) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");
  const [adding, setAdding] = useState(false);
  const [err, setErr] = useState("");

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setAdding(true); setErr("");
    try {
      const res = await fetch("/api/admin/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, role, status: "invited" }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "failed");
      setMembers((m) => [data, ...m]);
      setName(""); setEmail(""); setRole("editor");
    } catch (e) { setErr(e instanceof Error ? e.message : "Could not add member."); }
    finally { setAdding(false); }
  };

  const patch = async (id: number, body: Partial<TeamMember>) => {
    setMembers((m) => m.map((x) => (x.id === id ? { ...x, ...body } : x)));
    await fetch(`/api/admin/team/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  };

  const remove = async (id: number, name: string) => {
    if (!confirm(`Remove ${name} from the team?`)) return;
    setMembers((m) => m.filter((x) => x.id !== id));
    await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
  };

  const field = "bg-white border border-black/10 rounded-xl px-3 py-2 text-[13px] outline-none focus:border-black/40 transition-colors";

  return (
    <div className="pb-10">
      <PageHeader title="Users & Team" subtitle="Who has access to the studio. Roles are advisory for now — sign-in is a shared login.">
        <Button href="/admin/settings" variant="ghost">Account & passkeys →</Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3">
        {/* member list */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-semibold">Members</h2>
            <span className="text-[12px] text-black/40">{members.length + 1} total</span>
          </div>

          {/* owner row */}
          <div className="flex items-center gap-3 py-2.5 border-b border-black/[0.06]">
            <Avatar name={ownerEmail || "K"} size={38} />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-[#0A0A0A] truncate">{ownerEmail || "Studio owner"} <span className="text-black/40 font-normal">· you</span></div>
              <div className="text-[11px] text-black/45">Full access to everything</div>
            </div>
            <Badge tone="ink">Owner</Badge>
          </div>

          {members.length === 0 ? (
            <div className="pt-4"><EmptyState>No teammates yet. Invite one on the right.</EmptyState></div>
          ) : (
            <div className="divide-y divide-black/[0.06]">
              {members.map((m) => (
                <div key={m.id} className="flex items-center gap-3 py-2.5">
                  <Avatar name={m.name} size={38} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium text-[#0A0A0A] truncate">{m.name}</div>
                    <div className="text-[11px] text-black/45 truncate">{m.email || "no email"}</div>
                  </div>
                  {m.status === "invited" && <Badge tone="amber">Invited</Badge>}
                  <select value={m.role} onChange={(e) => patch(m.id, { role: e.target.value })} className={`${field} py-1.5 cursor-pointer`}>
                    {ROLES.map((r) => <option key={r} value={r}>{r[0].toUpperCase() + r.slice(1)}</option>)}
                  </select>
                  <button onClick={() => remove(m.id, m.name)} className="text-[12px] text-[#C0392B] hover:opacity-70 shrink-0">Remove</button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* invite form */}
        <Card className="h-max">
          <h2 className="text-[13px] font-semibold mb-4">Invite a teammate</h2>
          <form onSubmit={add} className="space-y-3">
            <label className="block"><span className="block text-[11px] text-black/50 mb-1">Name</span><input className={`${field} w-full`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" required /></label>
            <label className="block"><span className="block text-[11px] text-black/50 mb-1">Email</span><input className={`${field} w-full`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@studio.com" /></label>
            <label className="block"><span className="block text-[11px] text-black/50 mb-1">Role</span>
              <select className={`${field} w-full cursor-pointer`} value={role} onChange={(e) => setRole(e.target.value)}>
                {ROLES.map((r) => <option key={r} value={r}>{r[0].toUpperCase() + r.slice(1)}</option>)}
              </select>
            </label>
            {err && <p className="text-[12px] text-[#C0392B]">{err}</p>}
            <Button type="submit" disabled={adding} className="w-full justify-center">{adding ? "Adding…" : "Add member"}</Button>
          </form>
          <p className="mt-4 text-[11px] leading-relaxed text-black/40">Members appear in the directory. Individual logins and enforced permissions are a future upgrade — today the studio uses one shared password + passkeys.</p>
        </Card>
      </div>
    </div>
  );
}
