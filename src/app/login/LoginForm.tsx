"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { startAuthentication } from "@simplewebauthn/browser";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pkBusy, setPkBusy] = useState(false);
  const [pkErr, setPkErr] = useState("");
  // computed on mount to avoid a hydration mismatch on the time-based greeting
  const [greeting, setGreeting] = useState("Welcome back");
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 5 ? "Burning the midnight oil" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
  }, []);

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
    <form onSubmit={submit} className="w-full max-w-md">
      <h1 className="leading-[1.05]" style={{ fontSize: "clamp(2.2rem, 4.4vw, 3.2rem)", fontWeight: 400 }}>{greeting}.</h1>
      <p className="mt-2 mb-11 text-[13px] text-white/45">Sign in to the Not Normal studio.</p>

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

      <button
        type="button"
        onClick={passkeyLogin}
        disabled={pkBusy}
        className="mt-7 w-full flex items-center justify-center gap-2.5 rounded-full border border-white/25 py-3 text-[12px] tracking-[0.1em] uppercase text-white/80 hover:bg-white/5 transition-colors disabled:opacity-60"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="8" r="4" /><path d="M10.5 12a6 6 0 0 0-6 6M16 12l4 4m0-4-4 4M19 11a3 3 0 1 0-6 0v0" /></svg>
        {pkBusy ? "Waiting…" : "Sign in with a passkey"}
      </button>

      <div className="flex justify-end mt-10 md:mt-12">
        <button type="submit" disabled={busy} className="grid place-items-center w-24 h-24 rounded-full bg-white text-black text-[11px] tracking-[0.15em] uppercase font-medium hover:scale-105 active:scale-95 transition-transform disabled:opacity-60">
          {busy ? "…" : "Sign in"}
        </button>
      </div>
    </form>
  );
}
