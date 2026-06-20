"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startAuthentication } from "@simplewebauthn/browser";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pkBusy, setPkBusy] = useState(false);
  const [pkErr, setPkErr] = useState("");

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

  const passkeyLogin = async () => {
    setPkErr("");
    setPkBusy(true);
    try {
      const optRes = await fetch("/api/admin/passkey/login/options", { method: "POST" });
      const optionsJSON = await optRes.json();
      const asseResp = await startAuthentication({ optionsJSON });
      const verifyRes = await fetch("/api/admin/passkey/login/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(asseResp),
      });
      if (verifyRes.ok) { router.push("/admin"); return; }
      setPkErr("Passkey not recognised.");
    } catch {
      setPkErr("Passkey sign-in cancelled or unavailable.");
    } finally {
      setPkBusy(false);
    }
  };

  const field = "w-full bg-transparent border-b border-white/25 pb-2 text-[15px] text-white placeholder-white/30 outline-none focus:border-white transition-colors";

  return (
    <main className="admin-surface login-surface min-h-screen bg-black text-white flex flex-col md:flex-row" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* left brand panel */}
      <div className="relative flex-1 min-h-[34vh] md:min-h-screen overflow-hidden">
        {/* crosshair grid */}
        <span aria-hidden className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
        <span aria-hidden className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
        {/* brand */}
        <div className="absolute top-7 left-7 md:top-9 md:left-9">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/notnormal-logoblack.png" alt="Not Normal" className="h-4 w-auto" style={{ filter: "invert(1)" }} />
        </div>
        {/* smiley (same mark as the nav) */}
        <div className="absolute inset-0 grid place-items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/notnormal-iconoutline.png" alt="Not Normal" className="w-[130px] h-auto" style={{ filter: "invert(1)" }} />
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

          <div>
            <label className="block text-[11px] text-white/55 mb-2">Password</label>
            <div className="relative">
              <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`${field} pr-7`} placeholder="••••••••" autoFocus autoComplete="current-password" />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-0 bottom-2 text-white/40 hover:text-white text-sm" aria-label="Toggle password">{show ? "🙈" : "👁"}</button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-5 text-[12px] text-white/50">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" defaultChecked className="accent-white w-3.5 h-3.5" /> Remember me
            </label>
          </div>

          {err && <p className="mt-5 text-[13px] text-[#FF2EC4]">Wrong password.</p>}
          {pkErr && <p className="mt-3 text-[13px] text-[#FF2EC4]">{pkErr}</p>}

          {/* passkey */}
          <button
            type="button"
            onClick={passkeyLogin}
            disabled={pkBusy}
            className="mt-7 w-full flex items-center justify-center gap-2.5 rounded-full border border-white/25 py-3 text-[12px] tracking-[0.1em] uppercase text-white/80 hover:bg-white/5 transition-colors disabled:opacity-60"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="8" r="4" /><path d="M10.5 12a6 6 0 0 0-6 6M16 12l4 4m0-4-4 4M19 11a3 3 0 1 0-6 0v0" /></svg>
            {pkBusy ? "Waiting…" : "Sign in with a passkey"}
          </button>

          {/* circular sign in */}
          <div className="flex justify-end mt-10 md:mt-12">
            <button type="submit" disabled={busy} className="grid place-items-center w-24 h-24 rounded-full bg-white text-black text-[11px] tracking-[0.15em] uppercase font-medium hover:scale-105 active:scale-95 transition-transform disabled:opacity-60">
              {busy ? "…" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
