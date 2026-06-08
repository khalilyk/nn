"use client";

import { useEffect, useRef, useState } from "react";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* BE@RBRICK figure (image) with a single eye that follows the cursor. */
function Bear() {
  const eye = useRef<HTMLDivElement>(null);
  const pupil = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = eye.current, p = pupil.current;
      if (!el || !p) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const ang = Math.atan2(e.clientY - cy, e.clientX - cx);
      const maxX = r.width * 0.32;
      const maxY = r.height * 0.3;
      p.style.transform = `translate(${Math.cos(ang) * maxX}px, ${Math.sin(ang) * maxY}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="relative" style={{ width: "clamp(240px, 32vw, 400px)", aspectRatio: "1023 / 1537" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/bb-nn.png" alt="" draggable={false} className="absolute inset-0 w-full h-full object-contain" />
      {/* moving iris on the figure's own eye (no white circle) */}
      <div ref={eye} className="absolute" style={{ left: "calc(40% + 6px)", top: "24%", width: "15.5%", aspectRatio: "0.88" }}>
        <div ref={pupil} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0A0A0A]" style={{ width: "34%", height: "34%", transition: "transform 0.08s linear" }} />
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `New enquiry from ${name || "the website"}`;
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:hello@thisisnn.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full bg-transparent border-b border-[#0A0A0A]/30 py-3 text-[#0A0A0A] placeholder-[#0A0A0A]/35 outline-none focus:border-[#0A0A0A] transition-colors";

  return (
    <main className="relative bg-white text-[#0A0A0A] overflow-hidden">
      <Cursor />
      <Grain />
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* giant faint background word */}
        <div aria-hidden className="absolute inset-x-0 top-[10%] z-[2] flex justify-center pointer-events-none select-none">
          <span className="font-display uppercase leading-none whitespace-nowrap text-[#0A0A0A]/[0.045]" style={{ fontSize: "clamp(5rem, 23vw, 22rem)" }}>
            Say Hello
          </span>
        </div>

        {/* centered intro */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28 md:pt-36">
          <h1 className="font-display uppercase leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.2rem, 6.5vw, 4.6rem)" }}>Ready to create<br />something unforgettable?</h1>
          <p className="text-center text-[11px] md:text-[13px] tracking-[0.1em] text-[#0A0A0A]/65 mt-6 max-w-2xl leading-relaxed normal-case">
            Got an idea? A dream? A half-baked concept scribbled on a napkin? We&apos;re into that. Whether you&apos;re building from scratch or looking to shake things up, drop us a message. We&apos;re here for bold moves, real conversations, and doing things differently, one unforgettable brand at a time.
          </p>
        </div>

        {/* peeking one-eyed bear */}
        <div className="relative z-[1] flex justify-center mt-6">
          <Bear />
        </div>

        {/* two black panels (peek over the character) */}
        <div className="relative z-20 -mt-[clamp(40px,7vw,90px)] grid grid-cols-1 md:grid-cols-2 bg-[#0A0A0A] text-[#F3F1EC]">
          <a href="#form" className="group p-10 md:p-16 md:border-r border-[#F3F1EC]/12">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#F3F1EC]/60 mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-[#F3F1EC]/40" /> Contact Us
            </p>
            <h2 className="font-display uppercase leading-[0.95] tracking-tight mb-5" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
              Do you have<br />something to tell us?
            </h2>
            <p className="text-[13px] text-[#B9B5AE] leading-relaxed max-w-sm">Leave your message and we will get in touch with you soon.</p>
            <span className="inline-flex items-center gap-2 mt-8 text-[10px] tracking-[0.22em] uppercase text-[#F3F1EC] group-hover:gap-3 transition-all">Start <span aria-hidden>→</span></span>
          </a>
          <a href="#form" className="group p-10 md:p-16 border-t md:border-t-0 border-[#F3F1EC]/12">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#F3F1EC]/60 mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-[#F3F1EC]/40" /> Join Our Family
            </p>
            <h2 className="font-display uppercase leading-[0.95] tracking-tight mb-5" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
              Work<br />with us
            </h2>
            <p className="text-[13px] text-[#B9B5AE] leading-relaxed max-w-sm">We&apos;re looking for passionate, creative people who love what they do. If that&apos;s you, fill out the form and we&apos;ll be in touch.</p>
            <span className="inline-flex items-center gap-2 mt-8 text-[10px] tracking-[0.22em] uppercase text-[#F3F1EC] group-hover:gap-3 transition-all">Apply <span aria-hidden>→</span></span>
          </a>
        </div>
      </section>

      {/* FORM */}
      <section id="form" className="px-8 md:px-16 py-20 md:py-28 max-w-3xl mx-auto">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-3">The Form</p>
        <h2 className="font-display uppercase leading-[0.95] tracking-tight mb-12" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>Tell us everything</h2>
        <form onSubmit={submit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-[#0A0A0A]/50 mb-2">Your name</label>
              <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Appleseed" required />
            </div>
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-[#0A0A0A]/50 mb-2">Email</label>
              <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@venue.com" required />
            </div>
          </div>
          <div>
            <label className="block text-[9px] tracking-[0.25em] uppercase text-[#0A0A0A]/50 mb-2">Message</label>
            <textarea className={`${field} resize-none`} rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us what you're building…" required />
          </div>
          <button
            type="submit"
            data-cursor="Send"
            className="group relative w-full overflow-hidden rounded-full border border-[#0A0A0A] py-4 mt-2"
          >
            <span className="absolute inset-0 bg-[#0A0A0A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            <span className="relative z-10 text-[11px] tracking-[0.2em] uppercase font-bold text-[#0A0A0A] group-hover:text-[#EFEDE6] transition-colors duration-500">
              {sent ? "Opening your mail…" : "Send it"}
            </span>
          </button>
        </form>
      </section>

      <SiteFooter />
    </main>
  );
}
