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
      const max = r.width * 0.26;
      p.style.transform = `translate(${Math.cos(ang) * max}px, ${Math.sin(ang) * max}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div ref={eye} className="relative bg-white rounded-full" style={{ width: "clamp(110px, 15vw, 210px)", height: "clamp(110px, 15vw, 210px)" }}>
      <div ref={pupil} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0A0A0A]" style={{ width: "38%", height: "38%", transition: "transform 0.08s linear" }} />
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
            className="absolute z-20 font-sans font-bold uppercase text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-2xl px-4 py-2 text-[11px] md:text-[13px] tracking-[0.04em] whitespace-nowrap shadow-[0_6px_16px_-6px_rgba(0,0,0,0.4)] hover:animate-[pill-wobble_1.6s_ease-in-out_infinite]"
            style={{ left: p.x, top: p.y, transform: `rotate(${p.r}deg)`, background: GREEN, ["--r" as string]: `${p.r}deg` } as React.CSSProperties}
          >
            {p.t}
            {/* speech-bubble tail, black border behind + green fill on top */}
            <span
              className="absolute top-full left-5 w-0 h-0"
              style={{ borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "13px solid #0A0A0A" }}
            />
            <span
              className="absolute left-[23px] w-0 h-0"
              style={{ top: "calc(100% - 3px)", borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `9px solid ${GREEN}` }}
            />
          </span>
        ))}

        {/* headline */}
        <h1 className="relative z-10 text-center font-editorial leading-[0.92] pt-28 md:pt-36 px-6" style={{ fontSize: "clamp(2.6rem, 9vw, 7.5rem)" }}>
          Ready to create<br />something unforgettable?
        </h1>

        {/* raised arm, behind the head on the left */}
        <svg
          className="absolute z-[14] pointer-events-none"
          viewBox="0 0 100 170"
          aria-hidden
          style={{ left: "15%", top: "30%", width: "clamp(90px, 12vw, 170px)", transform: "rotate(-18deg)" }}
          fill="#0A0A0A"
        >
          {/* forearm */}
          <rect x="32" y="78" width="40" height="92" rx="20" />
          {/* palm */}
          <rect x="24" y="52" width="54" height="48" rx="22" />
          {/* fingers */}
          <rect x="27" y="18" width="12" height="48" rx="6" transform="rotate(-9 33 42)" />
          <rect x="41" y="10" width="12" height="56" rx="6" transform="rotate(-2 47 38)" />
          <rect x="55" y="12" width="12" height="54" rx="6" transform="rotate(5 61 39)" />
          <rect x="68" y="20" width="12" height="46" rx="6" transform="rotate(12 74 43)" />
          {/* thumb */}
          <rect x="74" y="50" width="12" height="34" rx="6" transform="rotate(40 80 67)" />
        </svg>

        {/* big creature, rounded square at 75% width */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-[15]"
          style={{ width: "75vw", height: "75vw", top: "40%", background: "#0A0A0A", borderRadius: "clamp(28px, 5vw, 70px)" }}
        />
        {/* eyes */}
        <div className="absolute left-1/2 -translate-x-1/2 z-20 flex gap-[clamp(10px,2vw,28px)]" style={{ top: "52%" }}>
          <Eye />
          <Eye />
        </div>

        {/* scroll cue */}
        <a href="#write" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-white text-[#0A0A0A] flex items-center justify-center shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)]" data-cursor="tap">↓</a>
      </section>

      {/* INVITE COPY */}
      <section id="write" className="relative bg-[#0A0A0A] text-[#EFEDE6]">
        <div className="px-8 md:px-16 py-20 md:py-28 flex justify-center">
          <p className="font-editorial leading-[1.3] text-center max-w-3xl mx-auto" style={{ fontSize: "clamp(0.95rem, 2vw, 1.5rem)" }}>
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
