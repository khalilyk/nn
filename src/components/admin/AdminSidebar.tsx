"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SECTIONS } from "@/lib/content/sections";

const ICONS: Record<string, string> = {
  dashboard: "M3 11.5 12 4l9 7.5M5 10v10h14V10",
  sections: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  hero: "M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z",
  menu: "M4 6h16M4 12h16M4 18h16",
  about: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20c0-3.5 3-6 7-6s7 2.5 7 6",
  projects: "M4 5h16v14H4zM4 15l4-4 4 4 3-3 5 5",
  testimonials: "M5 5h14v9H9l-4 4z",
  notes: "M5 4h9l5 5v11H5zM14 4v5h5",
  contact: "M4 6h16v12H4zM4 7l8 6 8-6",
  nav: "M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5",
  footer: "M4 5h16v14H4zM4 15h16",
  media: "M4 6h16v12H4zM4 16l5-5 4 4 3-3 4 4M9.5 9a1.2 1.2 0 1 1 0-.01",
  submissions: "M4 6h16v12H4zM4 12h5l2 3h2l2-3h5",
  analytics: "M5 19V9M10 19V5M15 19v-7M20 19v-11",
  seo: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l4 4",
  invoices: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h4",
  clients: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 2.7-5 6-5s6 2 6 5M17 7a2.5 2.5 0 1 1 0 5M19 20c0-2-1-3.6-2.5-4.4",
  proposals: "M4 4h16v16H4zM4 9h16M8 4v5M8 13h8M8 16h5",
};

function Icon({ d, active }: { d: string; active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#0A0A0A"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export default function AdminSidebar() {
  const path = usePathname();
  const onSection = SECTIONS.some((s) => path === `/admin/${s.key}`);
  const [open, setOpen] = useState(onSection);

  const Item = ({ href, k, label, indent }: { href: string; k: string; label: string; indent?: boolean }) => {
    const active = href === "/admin" ? path === "/admin" : path === href;
    return (
      <Link
        href={href}
        title={label}
        className={`flex items-center gap-3 h-11 rounded-2xl shrink-0 transition-colors ${active ? "bg-[#0A0A0A]" : "hover:bg-black/[0.05]"}`}
      >
        <span className="grid place-items-center w-11 h-11 shrink-0" style={indent ? { transform: "scale(0.82)" } : undefined}>
          <Icon d={ICONS[k] || ICONS.dashboard} active={active} />
        </span>
        <span className={`hidden md:block text-[13px] whitespace-nowrap ${active ? "text-white" : "text-[#0A0A0A]/75"} ${indent ? "font-normal" : ""}`}>
          {label}
        </span>
      </Link>
    );
  };

  return (
    <div className="flex md:flex-col gap-3 md:w-[200px] md:h-full md:overflow-y-auto shrink-0">
      <nav className="flex md:flex-col gap-1.5 rounded-[26px] bg-white p-2.5 shadow-sm overflow-x-auto">
        <Item href="/admin" k="dashboard" label="Dashboard" />

        {/* Sections toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          title="Sections"
          className={`flex items-center gap-3 h-11 rounded-2xl shrink-0 transition-colors ${onSection ? "bg-black/[0.06]" : "hover:bg-black/[0.05]"}`}
        >
          <span className="grid place-items-center w-11 h-11 shrink-0">
            <Icon d={ICONS.sections} active={false} />
          </span>
          <span className="hidden md:flex items-center justify-between flex-1 pr-3">
            <span className="text-[13px] text-[#0A0A0A]/75">Sections</span>
            <span className="text-[10px] text-[#0A0A0A]/40">{open ? "▾" : "▸"}</span>
          </span>
        </button>

        {open && SECTIONS.map((s) => <Item key={s.key} href={`/admin/${s.key}`} k={s.key} label={s.label} indent />)}

        <Item href="/admin/media" k="media" label="Media" />
        <Item href="/admin/submissions" k="submissions" label="Submissions" />
        <Item href="/admin/analytics" k="analytics" label="Analytics" />
        <Item href="/admin/seo" k="seo" label="SEO" />
      </nav>

      {/* Business: invoicing + CRM, in its own box */}
      <nav className="flex md:flex-col gap-1.5 rounded-[26px] bg-white p-2.5 shadow-sm overflow-x-auto">
        <span className="hidden md:block text-[10px] tracking-[0.14em] uppercase text-[#0A0A0A]/35 px-3 pt-1 pb-0.5">Business</span>
        <Item href="/admin/invoices" k="invoices" label="Invoices" />
        <Item href="/admin/clients" k="clients" label="Clients" />
      </nav>

      {/* Proposals, in its own box */}
      <nav className="flex md:flex-col gap-1.5 rounded-[26px] bg-white p-2.5 shadow-sm overflow-x-auto">
        <Item href="/admin/proposals" k="proposals" label="Proposals" />
      </nav>

      {/* Account, in its own box at the bottom */}
      <nav className="flex md:flex-col gap-1.5 rounded-[26px] bg-white p-2.5 shadow-sm overflow-x-auto md:mt-auto">
        <Link href="/admin/settings" title="Account settings" className={`flex items-center gap-3 h-11 rounded-2xl shrink-0 transition-colors ${path === "/admin/settings" ? "bg-[#0A0A0A]" : "hover:bg-black/[0.05]"}`}>
          <span className={`grid place-items-center w-11 h-11 rounded-full shrink-0 text-[13px] font-bold ${path === "/admin/settings" ? "bg-white text-[#0A0A0A]" : "bg-[#E8E8EA] text-[#0A0A0A]"}`}>K</span>
          <span className={`hidden md:block text-[13px] whitespace-nowrap ${path === "/admin/settings" ? "text-white" : "text-[#0A0A0A]/60"}`}>Account</span>
        </Link>
      </nav>
    </div>
  );
}
