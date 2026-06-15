"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
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

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F3F1EC] flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]/45 mb-3">Not Normal</p>
        <h1 className="font-display uppercase tracking-tight leading-none mb-8" style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}>
          Admin
        </h1>
        <label className="block text-[9px] tracking-[0.25em] uppercase text-[#F3F1EC]/50 mb-2">Password</label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border-b border-[#F3F1EC]/30 py-3 outline-none focus:border-[#F3F1EC] transition-colors"
          placeholder="••••••••"
        />
        {err && <p className="mt-3 text-[12px] text-[#FF2EC4]">Wrong password.</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-8 w-full rounded-full border border-[#F3F1EC] py-3.5 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-[#F3F1EC] hover:text-[#0A0A0A] transition-colors disabled:opacity-50"
        >
          {busy ? "…" : "Enter"}
        </button>
      </form>
    </main>
  );
}
