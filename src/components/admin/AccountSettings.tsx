"use client";

import { useEffect, useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";

type Passkey = { id: number; label: string };

export default function AccountSettings() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState("");

  const [passkeys, setPasskeys] = useState<Passkey[]>([]);
  const [pkBusy, setPkBusy] = useState(false);
  const [pkMsg, setPkMsg] = useState("");

  const loadPasskeys = () =>
    fetch("/api/admin/passkey", { cache: "no-store" }).then((r) => r.json()).then(setPasskeys).catch(() => {});

  useEffect(() => {
    fetch("/api/admin/account", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setEmail(d.email || ""))
      .catch(() => {});
    loadPasskeys();
  }, []);

  const addPasskey = async () => {
    setPkMsg("");
    setPkBusy(true);
    try {
      const optRes = await fetch("/api/admin/passkey/register/options", { method: "POST" });
      if (!optRes.ok) throw new Error();
      const optionsJSON = await optRes.json();
      const att = await startRegistration({ optionsJSON });
      const label = `${navigator.platform || "Device"} · ${new Date().toLocaleDateString()}`;
      const verifyRes = await fetch("/api/admin/passkey/register/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...att, label }),
      });
      if (verifyRes.ok) { setPkMsg("Passkey added ✓"); await loadPasskeys(); }
      else setPkMsg("Could not add passkey.");
    } catch {
      setPkMsg("Passkey setup cancelled or unsupported.");
    } finally {
      setPkBusy(false);
    }
  };

  const removePasskey = async (id: number) => {
    await fetch(`/api/admin/passkey/${id}`, { method: "DELETE" });
    await loadPasskeys();
  };

  const save = async () => {
    setError("");
    if (password && password !== confirm) { setError("Passwords don't match."); return; }
    setStatus("saving");
    const res = await fetch("/api/admin/account", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: password || undefined }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setStatus("saved");
      setPassword(""); setConfirm("");
      setTimeout(() => setStatus("idle"), 2500);
    } else {
      setStatus("idle");
      setError(data.error || "Save failed.");
    }
  };

  const input = "w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-[14px] text-[#0A0A0A]";

  return (
    <div className="pb-10 max-w-md">
      <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#0A0A0A] mb-1">Account</h1>
      <p className="text-[13px] text-[#0A0A0A]/50 mb-6">Update your login email and password.</p>

      <div className="rounded-3xl bg-white shadow-sm p-5 md:p-7 space-y-5">
        <div>
          <label className="block text-[11px] tracking-[0.12em] uppercase text-black/45 mb-1.5">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-[11px] tracking-[0.12em] uppercase text-black/45 mb-1.5">New password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} placeholder="Leave blank to keep current" />
        </div>
        <div>
          <label className="block text-[11px] tracking-[0.12em] uppercase text-black/45 mb-1.5">Confirm password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={input} placeholder="Re-enter new password" />
        </div>

        {error && <p className="text-[13px] text-[#c0392b]">{error}</p>}

        <button onClick={save} disabled={status === "saving"} className="rounded-full bg-[#0A0A0A] text-white px-6 py-2.5 text-[12px] tracking-[0.15em] uppercase font-medium hover:opacity-80 transition-opacity disabled:opacity-50">
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓" : "Save changes"}
        </button>
      </div>

      {/* Passkeys */}
      <div className="rounded-3xl bg-white shadow-sm p-5 md:p-7 mt-3">
        <h2 className="text-[15px] font-semibold text-[#0A0A0A]">Passkeys</h2>
        <p className="text-[12px] text-[#0A0A0A]/50 mt-1 mb-4">Sign in with Touch ID, Windows Hello, or a Google passkey — no password needed.</p>

        {passkeys.length > 0 && (
          <ul className="space-y-2 mb-4">
            {passkeys.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-xl border border-black/10 px-3.5 py-2.5">
                <span className="flex items-center gap-2.5 text-[13px] text-[#0A0A0A]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="8" r="4" /><path d="M10.5 12a6 6 0 0 0-6 6M16 12l4 4m0-4-4 4M19 11a3 3 0 1 0-6 0" /></svg>
                  {p.label}
                </span>
                <button onClick={() => removePasskey(p.id)} className="text-[12px] text-black/40 hover:text-[#c0392b] transition-colors">Remove</button>
              </li>
            ))}
          </ul>
        )}

        {pkMsg && <p className="text-[12px] text-[#0A0A0A]/55 mb-3">{pkMsg}</p>}

        <button onClick={addPasskey} disabled={pkBusy} className="rounded-full border border-[#0A0A0A] text-[#0A0A0A] px-5 py-2.5 text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#0A0A0A] hover:text-white transition-colors disabled:opacity-50">
          {pkBusy ? "Waiting…" : "+ Add a passkey"}
        </button>
      </div>
    </div>
  );
}
