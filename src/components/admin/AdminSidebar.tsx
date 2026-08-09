"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SECTIONS } from "@/lib/content/sections";

/**
 * Admin sidebar — bric-style floating dark panel: centred logo, a filled
 * Dashboard button, then grouped nav boxes (Website / Workspace / Company /
 * Backend) with View site + Log out pinned to the bottom. NN palette + routes.
 */
export default function AdminSidebar() {
  const path = usePathname();
  const onSection = SECTIONS.some((s) => path === `/admin/${s.key}`);
  const [open, setOpen] = useState(onSection);

  const cls = (active: boolean, indent = false) =>
    `flex w-full items-center justify-between gap-2 rounded-lg py-2 text-left text-[12.5px] transition-colors ${indent ? "pl-6 pr-2.5" : "px-2.5"} ${
      active ? "bg-white/[0.12] text-white font-medium" : "text-white/55 hover:bg-white/[0.06] hover:text-white/90"
    }`;

  const Nav = ({ href, label, indent }: { href: string; label: string; indent?: boolean }) => {
    const active = href === "/admin" ? path === "/admin" : path === href;
    return <Link href={href} className={cls(active, indent)}>{label}</Link>;
  };

  const Group = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="rounded-xl bg-white/[0.04] p-1.5">
      <p className="px-2 pb-1 pt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">{label}</p>
      {children}
    </div>
  );

  return (
    <aside className="md:w-[212px] shrink-0 md:h-full">
      <div className="flex flex-col h-full rounded-2xl bg-[#14151A] p-2.5 md:overflow-hidden">
        {/* logo — centred, same wordmark as the site header */}
        <div className="flex justify-center py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/notnormal-logoblack.png" alt="Not Normal" className="h-5 w-auto" style={{ filter: "invert(1)" }} />
        </div>

        <nav className="flex-1 space-y-2.5 overflow-y-auto px-0.5 min-h-0">
          {/* Dashboard — prominent filled button */}
          <Link
            href="/admin"
            className={`flex w-full items-center justify-between rounded-lg bg-white px-3 py-2.5 text-[13px] font-semibold text-[#14151A] transition-all hover:bg-white/90 active:scale-[0.98] ${path === "/admin" ? "ring-2 ring-white/25" : ""}`}
          >
            Dashboard
          </Link>

          <Group label="Website">
            <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className={cls(false)}>
              <span>Sections</span>
              <span className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`} aria-hidden>›</span>
            </button>
            {open && SECTIONS.filter((s) => s.key !== "projects").map((s) => <Nav key={s.key} href={`/admin/${s.key}`} label={s.label} indent />)}
            <Nav href="/admin/projects" label="Projects" />
            <Nav href="/admin/media" label="Media library" />
            <Nav href="/admin/analytics" label="Analytics" />
            <Nav href="/admin/seo" label="SEO" />
          </Group>

          <Group label="Workspace">
            <Nav href="/admin/submissions" label="Enquiries" />
            <Nav href="/admin/proposals" label="Proposals" />
          </Group>

          <Group label="Company">
            <Nav href="/admin/company" label="Company" />
            <Nav href="/admin/services" label="Services & pricing" />
            <Nav href="/admin/invoices" label="Invoices" />
            <Nav href="/admin/clients" label="Clients" />
          </Group>

          <Group label="Backend">
            <Nav href="/admin/users" label="Users & account" />
            <Nav href="/admin/history" label="History" />
          </Group>
        </nav>

        <div className="space-y-0.5 px-0.5 pt-2">
          <a href="/" target="_blank" className={cls(false)}>View site ↗</a>
          <form action="/api/admin/logout" method="post">
            <button className={`${cls(false)} w-full`}>Log out</button>
          </form>
        </div>
      </div>
    </aside>
  );
}
