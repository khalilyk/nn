"use client";

import { useState } from "react";
import Link from "next/link";

export default function TheInside() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F1EC] flex flex-col items-center justify-center px-6 font-[var(--font-grotesk)]">
      <Link href="/" className="absolute top-6 left-6 md:left-10 font-display text-sm tracking-[0.2em]">
        NOT NORMAL<sup className="text-[8px] ml-0.5">™</sup>
      </Link>

      <div className="w-full max-w-sm">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/50 mb-4 text-center">The Inside</p>
        <h1 className="font-display text-center leading-none mb-12" style={{ fontSize: "clamp(2.5rem, 7vw, 4rem)" }}>
          MEMBERS ONLY
        </h1>

        <form
          onSubmit={(e) => { e.preventDefault(); setError(true); }}
          className="space-y-8"
        >
          {[
            { k: "email", label: "Email", type: "email", ph: "you@thisisnn.com" },
            { k: "password", label: "Password", type: "password", ph: "••••••••" },
          ].map((f) => (
            <div key={f.k}>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE]/50 mb-3">{f.label}</label>
              <input
                required
                type={f.type}
                value={form[f.k as keyof typeof form]}
                onChange={(e) => setForm((s) => ({ ...s, [f.k]: e.target.value }))}
                placeholder={f.ph}
                className="w-full bg-transparent border-b border-[#F3F1EC]/15 pb-3 text-sm placeholder-[#F3F1EC]/20 focus:border-[#F3F1EC]/60 outline-none transition-colors"
              />
            </div>
          ))}

          {error && (
            <p className="text-[10px] tracking-widest uppercase text-[#FF2EC4]">Access restricted, invite only.</p>
          )}

          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-full border border-[#F3F1EC] py-3.5 mt-2"
          >
            <span className="absolute inset-0 bg-[#F3F1EC] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            <span className="relative z-10 text-[10px] tracking-[0.28em] uppercase text-[#F3F1EC] group-hover:text-[#0A0A0A] transition-colors duration-500">
              Enter →
            </span>
          </button>
        </form>

        <Link href="/" className="block text-center text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE]/40 hover:text-[#F3F1EC] transition-colors mt-10">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
