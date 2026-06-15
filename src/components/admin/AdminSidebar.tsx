"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS } from "@/lib/content/sections";

const ICONS: Record<string, string> = {
  dashboard: "M3 11.5 12 4l9 7.5M5 10v10h14V10",
  hero: "M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z",
  menu: "M4 6h16M4 12h16M4 18h16",
  about: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20c0-3.5 3-6 7-6s7 2.5 7 6",
  projects: "M4 5h16v14H4zM4 15l4-4 4 4 3-3 5 5",
  testimonials: "M5 5h14v9H9l-4 4z",
  notes: "M5 4h9l5 5v11H5zM14 4v5h5",
  contact: "M4 6h16v12H4zM4 7l8 6 8-6",
  nav: "M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5",
  footer: "M4 5h16v14H4zM4 15h16",
  submissions: "M4 6h16v12H4zM4 12h5l2 3h2l2-3h5",
  analytics: "M5 19V9M10 19V5M15 19v-7M20 19v-11",
  media: "M4 6h16v12H4zM4 16l5-5 4 4 3-3 4 4M9.5 9a1.2 1.2 0 1 1 0-.01",
  preview: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
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
  const links: { href: string; key: string; label: string }[] = [
    { href: "/admin", key: "dashboard", label: "Dashboard" },
    { href: "/admin/preview", key: "preview", label: "Live editor" },
    ...SECTIONS.map((s) => ({ href: `/admin/${s.key}`, key: s.key, label: s.label })),
    { href: "/admin/media", key: "media", label: "Media" },
    { href: "/admin/submissions", key: "submissions", label: "Submissions" },
    { href: "/admin/analytics", key: "analytics", label: "Analytics" },
  ];

  return (
    <nav className="group flex md:flex-col gap-1.5 rounded-[26px] bg-white p-2.5 shadow-sm self-start md:sticky md:top-5 overflow-x-auto md:overflow-hidden md:w-[64px] md:hover:w-[212px] transition-[width] duration-300 ease-out">
      {links.map((l) => {
        const active = l.href === "/admin" ? path === "/admin" : path === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            title={l.label}
            className={`group/item flex items-center gap-3 h-11 rounded-2xl shrink-0 transition-colors ${
              active ? "bg-[#0A0A0A]" : "hover:bg-black/[0.05]"
            }`}
          >
            <span className="grid place-items-center w-11 h-11 shrink-0">
              <Icon d={ICONS[l.key] || ICONS.dashboard} active={active} />
            </span>
            <span className={`hidden md:block text-[13px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${active ? "text-white" : "text-[#0A0A0A]/75"}`}>
              {l.label}
            </span>
          </Link>
        );
      })}

      <Link href="/admin/settings" title="Account settings" className={`group/item flex items-center gap-3 h-11 rounded-2xl shrink-0 md:mt-2 transition-colors ${path === "/admin/settings" ? "bg-[#0A0A0A]" : "hover:bg-black/[0.05]"}`}>
        <span className={`grid place-items-center w-11 h-11 rounded-full shrink-0 text-[13px] font-bold ${path === "/admin/settings" ? "bg-white text-[#0A0A0A]" : "bg-[#E8E8EA] text-[#0A0A0A]"}`}>K</span>
        <span className={`hidden md:block text-[13px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${path === "/admin/settings" ? "text-white" : "text-[#0A0A0A]/60"}`}>Khalil</span>
      </Link>
    </nav>
  );
}
