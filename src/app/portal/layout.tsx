"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/portal", label: "Dashboard" },
  { href: "/portal/projects", label: "Projects" },
  { href: "/portal/reports", label: "Reports" },
  { href: "/portal/proposals", label: "Proposals" },
  { href: "/portal/invoices", label: "Invoices" },
  { href: "/portal/files", label: "Files" },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      {/* Portal header */}
      <header className="border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-display text-xs tracking-[0.2em] text-[#E8E2D4]">NOT NORMAL</Link>
          <nav className="hidden md:flex gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[9px] tracking-widest uppercase transition-colors ${
                  pathname === item.href ? "text-[#D4FF38]" : "text-white/30 hover:text-white/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] tracking-widest uppercase text-white/30">Kinoya</span>
          <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="text-[9px] text-white/40">K</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-8 py-10">{children}</main>

      <footer className="border-t border-white/5 px-8 py-4">
        <p className="text-[9px] tracking-widest uppercase text-white/15">Not Normal Client Portal · Confidential</p>
      </footer>
    </div>
  );
}
