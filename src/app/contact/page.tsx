"use client";

import { useState } from "react";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `New enquiry from ${name || "the website"}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:hello@thisisnn.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full bg-transparent border-b border-[#F3F1EC]/20 py-3 text-[#F3F1EC] placeholder-[#F3F1EC]/30 outline-none focus:border-[#F3F1EC]/60 transition-colors";

  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-[#F3F1EC] overflow-hidden">
      <Cursor />
      <Grain />

      {/* header */}
      <header className="flex items-center justify-between px-8 md:px-16 py-6 md:py-8">
        <a href="/" aria-label="Not Normal, home" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/notnormal-logoblack.png" alt="Not Normal" className="h-3.5 md:h-4 w-auto" style={{ filter: "invert(1)" }} />
        </a>
        <a href="/" data-cursor="Back" className="text-[10px] tracking-[0.22em] uppercase text-[#F3F1EC]/70 hover:text-[#F3F1EC] transition-colors">
          ← Home
        </a>
      </header>

      <div className="px-8 md:px-16 pt-16 md:pt-24 pb-24 max-w-6xl mx-auto">
        {/* hero */}
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#B9B5AE]/60 mb-6">Contact</p>
        <h1 className="font-editorial leading-[1.05] mb-6 max-w-3xl" style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}>
          Let&apos;s make something nobody forgets.
        </h1>
        <p className="text-[#B9B5AE] leading-relaxed max-w-xl mb-16" style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}>
          Tell us about your venue, your brand, or the idea keeping you up at night. We read every message, and reply to the ones we can help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* form */}
          <form onSubmit={submit} className="flex flex-col gap-8">
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE]/60 mb-2">Your name</label>
              <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Appleseed" required />
            </div>
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE]/60 mb-2">Email</label>
              <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@venue.com" required />
            </div>
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE]/60 mb-2">Message</label>
              <textarea className={`${field} resize-none`} rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us what you're building…" required />
            </div>
            <button
              type="submit"
              data-cursor="Send"
              className="self-start mt-2 inline-flex items-center gap-3 rounded-full border border-[#F3F1EC]/40 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase hover:bg-[#F3F1EC] hover:text-[#0A0A0A] transition-colors"
            >
              {sent ? "Opening your mail…" : "Send it"}
            </button>
          </form>

          {/* details */}
          <div className="flex flex-col gap-12">
            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE]/60 mb-4">Direct</p>
              <a href="mailto:hello@thisisnn.com" className="block font-editorial hover:opacity-60 transition-opacity" style={{ fontSize: "clamp(1.3rem, 2.4vw, 2rem)" }}>hello@thisisnn.com</a>
              <a href="tel:+971501234567" className="block text-[#B9B5AE] mt-2 hover:text-[#F3F1EC] transition-colors">+971 50 123 4567</a>
            </div>

            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE]/60 mb-4">Social</p>
              <div className="flex flex-col gap-2">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity">Instagram</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity">LinkedIn</a>
              </div>
            </div>

            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE]/60 mb-4">Studios</p>
              <p className="font-editorial" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>Sydney · Dubai · Beirut</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80] shadow-[0_0_8px_2px_rgba(74,222,128,0.7)]" />
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase text-[#4ADE80]">2 spots left this month</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="px-8 md:px-16 py-8 border-t border-[#F3F1EC]/10 text-[9px] tracking-[0.2em] uppercase text-[#F3F1EC]/40 text-center">
        Nobody Remembers Normal.™
      </footer>
    </main>
  );
}
