"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <Link href="/" className="text-sm font-medium tracking-[0.2em] uppercase select-none">
        NN
      </Link>

      {/* Desktop */}
      <ul className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`text-xs tracking-widest uppercase transition-opacity ${
                pathname === l.href ? "opacity-100" : "opacity-40 hover:opacity-100"
              }`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#0a0a0a] border-t border-white/10 px-6 py-8 flex flex-col gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-2xl font-medium tracking-tight transition-opacity ${
                pathname === l.href ? "opacity-100" : "opacity-40"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
