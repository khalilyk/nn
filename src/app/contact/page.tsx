"use client";

import { useEffect, useRef, useState } from "react";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const GREEN = "#C7F000";

const pills = [
  { t: "Say hi", x: "16%", y: "20%", r: -8 },
  { t: "Reach out", x: "70%", y: "13%", r: 7 },
  { t: "Let's talk", x: "12%", y: "44%", r: 5 },
  { t: "No brief too big", x: "74%", y: "34%", r: -6 },
  { t: "Quack", x: "52%", y: "22%", r: -4 },
  { t: "Hello", x: "82%", y: "50%", r: 9 },
];

function Eye() {
  const eye = useRef<HTMLDivElement>(null);
  const pupil = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = eye.current, p = pupil.current;
      if (!el || !p) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const ang = Math.atan2(e.clientY - cy, e.clientX - cx);
      const max = r.width * 0.22;
      p.style.transform = `translate(${Math.cos(ang) * max}px, ${Math.sin(ang) * max * 1.3}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div ref={eye} className="relative bg-white rounded-[50%]" style={{ width: "clamp(90px, 13vw, 170px)", height: "clamp(150px, 22vw, 290px)" }}>
      <div ref={pupil} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0A0A0A]" style={{ width: "38%", height: "23%", transition: "transform 0.08s linear" }} />
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
    <main className="relative bg-[#EFEDE6] text-[#0A0A0A] overflow-hidden">
      <Cursor />
      <Grain />
      <SiteNav />

      {/* HERO */}
      <section className="relative h-[100vh] min-h-[680px] overflow-hidden">
        {/* scattered pills */}
        {pills.map((p) => (
          <span
            key={p.t}
            className="absolute z-20 font-sans font-bold uppercase text-[#0A0A0A] rounded-full px-4 py-2 text-[11px] md:text-[13px] tracking-[0.04em] whitespace-nowrap shadow-[0_6px_16px_-6px_rgba(0,0,0,0.4)] hover:animate-[pill-wobble_1.6s_ease-in-out_infinite]"
            style={{ left: p.x, top: p.y, transform: `rotate(${p.r}deg)`, background: GREEN, ["--r" as string]: `${p.r}deg` } as React.CSSProperties}
          >
            {p.t}
          </span>
        ))}

        {/* headline */}
        <h1 className="relative z-10 text-center font-editorial leading-[0.92] pt-28 md:pt-36 px-6" style={{ fontSize: "clamp(2.6rem, 9vw, 7.5rem)" }}>
          Ready to create<br />something unforgettable?
        </h1>

        {/* big creature */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%] z-[15]"
          style={{ width: "min(150vw, 1500px)", height: "min(150vw, 1500px)", top: "46%", background: "#0A0A0A" }}
        />
        {/* eyes */}
        <div className="absolute left-1/2 -translate-x-1/2 z-20 flex gap-[clamp(10px,2vw,28px)]" style={{ top: "52%" }}>
          <Eye />
          <Eye />
        </div>

        {/* scroll cue */}
        <a href="#write" className="absolute bottom-7 left-8 md:left-16 z-20 w-10 h-10 rounded-full bg-[#0A0A0A] text-[#EFEDE6] flex items-center justify-center" data-cursor="tap">↓</a>
      </section>

      {/* WRITE TO US */}
      <section id="write" className="relative" style={{ background: GREEN }}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 px-8 md:px-16 py-20 md:py-28">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-2 font-bold">Write to us</p>
            <a href="mailto:hello@thisisnn.com" className="text-[13px] tracking-[0.08em] uppercase hover:opacity-60 transition-opacity">hello@thisisnn.com</a>
          </div>
          <p className="font-editorial leading-[1.15]" style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}>
            Got an idea? A dream? A half-baked concept scribbled on a napkin? We&apos;re into that. Whether you&apos;re building from scratch or looking to shake things up, drop us a message. We&apos;re here for bold moves, real conversations, and doing things differently, one unforgettable brand at a time.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="px-8 md:px-16 py-20 md:py-28 max-w-3xl mx-auto">
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
            className="self-start mt-2 rounded-full px-9 py-4 text-[11px] tracking-[0.2em] uppercase font-bold text-[#0A0A0A] hover:scale-[1.04] transition-transform"
            style={{ background: GREEN }}
          >
            {sent ? "Opening your mail…" : "Send it"}
          </button>
        </form>
      </section>

      <SiteFooter />
    </main>
  );
}
