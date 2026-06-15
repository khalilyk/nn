"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS } from "@/lib/content/sections";

export default function AdminSidebar() {
  const path = usePathname();
  const item = (href: string, label: string) => {
    const active = href === "/admin" ? path === "/admin" : path === href;
    return (
      <Link
        key={href}
        href={href}
        className={`block rounded-xl px-4 py-2.5 text-[13px] transition-colors ${
          active ? "bg-[#1C1C1C] text-white" : "text-[#0A0A0A]/65 hover:bg-white/70"
        }`}
      >
        {label}
      </Link>
    );
  };
  return (
    <nav className="rounded-3xl bg-white/40 p-2.5 space-y-1 self-start sticky top-4">
      {item("/admin", "Dashboard")}
      <div className="px-4 pt-3 pb-1 text-[10px] tracking-[0.2em] uppercase text-[#0A0A0A]/35">Content</div>
      {SECTIONS.map((s) => item(`/admin/${s.key}`, s.label))}
      <div className="px-4 pt-3 pb-1 text-[10px] tracking-[0.2em] uppercase text-[#0A0A0A]/35">Insights</div>
      {item("/admin/submissions", "Submissions")}
      {item("/admin/analytics", "Analytics")}
    </nav>
  );
}
