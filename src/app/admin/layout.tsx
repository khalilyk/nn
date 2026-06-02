"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/projects", label: "Projects", icon: "◫" },
  { href: "/admin/clients", label: "Clients", icon: "◉" },
  { href: "/admin/proposals", label: "Proposals", icon: "◧" },
  { href: "/admin/invoices", label: "Invoices", icon: "◪" },
  { href: "/admin/journal", label: "Journal", icon: "◈" },
  { href: "/admin/media", label: "Media", icon: "◰" },
  { href: "/admin/reports", label: "Reports", icon: "◪" },
  { href: "/admin/mockups", label: "Mockups", icon: "◳" },
  { href: "/admin/notifications", label: "Notifications", icon: "◉" },
  { href: "/admin/settings", label: "Settings", icon: "⊙" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-60"} flex-shrink-0 border-r border-white/5 flex flex-col transition-all duration-300`}>
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          {!collapsed && (
            <Link href="/" className="font-display text-xs tracking-[0.2em] text-[#D4FF38]">NN ADMIN</Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-white/20 hover:text-white/60 transition-colors text-xs ml-auto">
            {collapsed ? "›" : "‹"}
          </button>
        </div>
        <nav className="flex-1 py-4">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-3 text-xs transition-colors ${
                  active ? "text-[#D4FF38] bg-[#D4FF38]/5" : "text-white/30 hover:text-white/70"
                }`}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && <span className="tracking-widest uppercase">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-5 border-t border-white/5">
          <Link href="/" className={`text-[9px] tracking-widest uppercase text-white/20 hover:text-white/50 transition-colors ${collapsed ? "hidden" : ""}`}>
            ← View Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Top bar */}
        <header className="border-b border-white/5 px-8 py-4 flex items-center justify-between shrink-0">
          <p className="text-[10px] tracking-widest uppercase text-white/30">
            {nav.find((n) => n.href === pathname)?.label || "Admin"}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-widest uppercase text-white/20">Admin</span>
            <div className="w-7 h-7 rounded-full bg-[#D4FF38]/20 flex items-center justify-center">
              <span className="text-[9px] text-[#D4FF38] font-bold">NN</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
