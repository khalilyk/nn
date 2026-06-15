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
    ...SECTIONS.map((s) => ({ href: `/admin/${s.key}`, key: s.key, label: s.label })),
    { href: "/admin/submissions", key: "submissions", label: "Submissions" },
    { href: "/admin/analytics", key: "analytics", label: "Analytics" },
  ];

  return (
    <nav className="flex md:flex-col items-center gap-1.5 rounded-[26px] bg-white p-2.5 shadow-sm self-start md:sticky md:top-5 overflow-x-auto">
      {/* brand tile */}
      <div className="grid place-items-center w-11 h-11 rounded-2xl bg-[#2D6BFF] text-white shrink-0 mb-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/notnormal-iconoutline.png" alt="" className="h-5 w-auto" style={{ filter: "invert(1)" }} />
      </div>
      {links.map((l) => {
        const active = l.href === "/admin" ? path === "/admin" : path === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            title={l.label}
            className={`group relative grid place-items-center w-11 h-11 rounded-2xl shrink-0 transition-colors ${
              active ? "bg-[#0A0A0A]" : "hover:bg-black/[0.05]"
            }`}
          >
            <Icon d={ICONS[l.key] || ICONS.dashboard} active={active} />
            <span className="pointer-events-none absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#0A0A0A] text-white text-[11px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 hidden md:block">
              {l.label}
            </span>
          </Link>
        );
      })}
      <span className="grid place-items-center w-11 h-11 rounded-full bg-[#E8E8EA] text-[#0A0A0A] text-[13px] font-bold shrink-0 md:mt-2">K</span>
    </nav>
  );
}
