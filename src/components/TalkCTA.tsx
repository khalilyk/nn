"use client";

import { useState } from "react";
import type { Footer } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

const SERVICES = ["Branding & Identity", "Web Design & Development", "Print & Production", "PR & Brand Visibility", "Something else"];

/** "Ready? Let's talk" CTA — heading left, minimal form right, on a black card. */
export default function TalkCTA({ footer = DEFAULT_CONTENT.footer }: { footer?: Footer }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = `${String(fd.get("first") || "").trim()} ${String(fd.get("last") || "").trim()}`.trim();
    const email = String(fd.get("email") || "").trim();
    const service = String(fd.get("service") || "").trim();
    const desc = String(fd.get("message") || "").trim();
    const message = [desc || "Requested a callback via the site.", service && `Service: ${service}`].filter(Boolean).join("\n\n");
    if (!name || !email) { setErr("Please add your name and email."); setStatus("error"); return; }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok || /not configured/i.test(j.error || "")) { setStatus("done"); return; }
      setErr(j.error || "Something went wrong."); setStatus("error");
    } catch {
      setErr("Network error — please try again."); setStatus("error");
    }
  }

  const field = "w-full bg-transparent border-b border-white/25 py-2.5 text-[15px] placeholder:text-white/35 outline-none focus:border-white transition-colors";
  const label = "block text-[11px] tracking-[0.14em] uppercase text-white/50 mb-2";

  return (
    <section className="relative bg-[#F3F1EC] px-5 sm:px-8 md:px-16 py-16 md:py-24">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] bg-[#0A0A0A] text-[#F3F1EC] p-8 md:p-14 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* heading */}
          <div className="flex flex-col justify-between gap-10 h-full">
            <h2 className="font-sans font-bold leading-[0.92] tracking-tight" style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.75rem)" }}>
              Ready?
              <br />
              Let&apos;s talk
            </h2>
            <div className="hidden md:block space-y-4">
              <a href={`mailto:${footer.email}`} className="inline-block text-[13px] tracking-[0.06em] border-b border-white/40 pb-1 hover:border-white transition-colors">
                {footer.email}
              </a>
              <p className="text-[10px] tracking-[0.22em] uppercase text-white/40">{footer.locations}</p>
            </div>
          </div>

          {/* form */}
          {status === "done" ? (
            <div className="flex min-h-[16rem] flex-col justify-center">
              <p className="font-sans font-bold uppercase tracking-tight text-[#4ADE80]" style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)" }}>Thank you.</p>
              <p className="mt-3 text-[13px] text-white/60 max-w-xs">Your details are in — we&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-7">
              <div>
                <span className={label}>Name (required)</span>
                <div className="grid grid-cols-2 gap-5">
                  <input name="first" placeholder="First name" autoComplete="given-name" className={field} />
                  <input name="last" placeholder="Last name" autoComplete="family-name" className={field} />
                </div>
              </div>
              <div>
                <span className={label}>Service</span>
                <select name="service" defaultValue="" className={`${field} appearance-none cursor-pointer text-white/80 [&>option]:text-black`}>
                  <option value="" disabled className="text-black">Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="text-black">{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <span className={label}>Email (required)</span>
                <input name="email" type="email" placeholder="you@studio.com" autoComplete="email" className={field} />
              </div>
              <div>
                <span className={label}>Project description</span>
                <textarea name="message" rows={2} placeholder="Tell us what you're building" className={`${field} resize-none`} />
              </div>
              {status === "error" && <p className="text-[12px] text-[#ff6b6b]">{err}</p>}
              <button
                type="submit"
                disabled={status === "sending"}
                className="group self-start inline-flex items-center gap-3 rounded-full bg-[#F3F1EC] text-[#0A0A0A] px-8 py-3.5 text-[11px] tracking-[0.18em] uppercase font-bold transition-colors hover:bg-[#4ADE80] disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Submit"}
                <span className="transition-transform group-hover:translate-x-0.5">&#8594;</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
