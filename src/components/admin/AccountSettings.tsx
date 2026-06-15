"use client";

import { useEffect, useState } from "react";

export default function AccountSettings() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/account", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setEmail(d.email || ""))
      .catch(() => {});
  }, []);

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
      <h1 className="text-[22px] font-semibold text-[#0A0A0A] mb-1">Account</h1>
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
    </div>
  );
}
