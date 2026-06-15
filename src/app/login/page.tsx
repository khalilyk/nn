"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(false);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) router.push("/admin");
    else setErr(true);
  };

  const field = "w-full bg-transparent border-b border-white/25 pb-2 text-[15px] text-white placeholder-white/30 outline-none focus:border-white transition-colors";

  return (
    <main className="admin-surface min-h-screen bg-black text-white flex flex-col md:flex-row" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* left brand panel */}
      <div className="relative flex-1 min-h-[34vh] md:min-h-screen overflow-hidden">
        {/* crosshair grid */}
        <span aria-hidden className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
        <span aria-hidden className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
        {/* brand */}
        <div className="absolute top-7 left-7 md:top-9 md:left-9 text-[15px] font-semibold tracking-tight">
          Not Normal<sup className="text-[9px] top-[-0.7em]">®</sup>
        </div>
        {/* starburst */}
        <div className="absolute inset-0 grid place-items-center">
          <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
              const r = (a * Math.PI) / 180;
              const x1 = 50 + Math.cos(r) * 14, y1 = 50 + Math.sin(r) * 14;
              const x2 = 50 + Math.cos(r) * 34, y2 = 50 + Math.sin(r) * 34;
              return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </svg>
        </div>
        {/* copyright */}
        <div className="absolute bottom-7 left-7 md:bottom-9 md:left-9 text-[11px] text-white/40">
          © Not Normal {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>

      {/* right form panel */}
      <div className="relative w-full md:w-[44%] bg-[#0E0E0E] flex flex-col justify-center px-7 md:px-14 py-16 md:py-0">
        <form onSubmit={submit} className="w-full max-w-md">
          <h1 className="leading-none mb-12" style={{ fontSize: "clamp(2.6rem, 5vw, 3.6rem)", fontWeight: 400 }}>Login</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] text-white/55 mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} placeholder="you@example.com" autoComplete="username" />
            </div>
            <div>
              <label className="block text-[11px] text-white/55 mb-2">Password</label>
              <div className="relative">
                <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`${field} pr-7`} placeholder="••••••••" autoFocus autoComplete="current-password" />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-0 bottom-2 text-white/40 hover:text-white text-sm" aria-label="Toggle password">{show ? "🙈" : "👁"}</button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-5 text-[12px] text-white/50">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" defaultChecked className="accent-white w-3.5 h-3.5" /> Remember me
            </label>
          </div>

          {err && <p className="mt-5 text-[13px] text-[#FF2EC4]">Wrong password.</p>}

          {/* circular sign in */}
          <div className="flex justify-end mt-12 md:mt-16">
            <button type="submit" disabled={busy} className="grid place-items-center w-24 h-24 rounded-full bg-white text-black text-[11px] tracking-[0.15em] uppercase font-medium hover:scale-105 active:scale-95 transition-transform disabled:opacity-60">
              {busy ? "…" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
