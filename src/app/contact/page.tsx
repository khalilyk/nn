"use client";

import { useEffect, useRef, useState } from "react";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* BE@RBRICK figure (image) with a single eye that follows the cursor.
   The eye position/size is auto-detected from the image, so it stays
   aligned no matter which bb-nn.png is used. */
function Bear() {
  const eye = useRef<HTMLDivElement>(null);
  const pupil = useRef<HTMLDivElement>(null);
  // detected eye box as fractions of the image: [cx, cy, w, h]
  const [box, setBox] = useState({ cx: 0.537, cy: 0.291, w: 0.12, h: 0.07 });

  // Detect the white eye (a white island surrounded by the dark head)
  useEffect(() => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.src = "/bb-nn.png";
    im.onload = () => {
      const W = 220, H = Math.max(1, Math.round((220 * im.height) / im.width));
      const cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(im, 0, 0, W, H);
      let data: Uint8ClampedArray;
      try { data = ctx.getImageData(0, 0, W, H).data; } catch { return; }
      const isW = (x: number, y: number) => {
        const i = (y * W + x) * 4;
        return data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220;
      };
      const bg = new Uint8Array(W * H);
      const st: number[] = [];
      const push = (x: number, y: number) => { if (isW(x, y) && !bg[y * W + x]) { bg[y * W + x] = 1; st.push(x, y); } };
      for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); }
      for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
      while (st.length) {
        const y = st.pop()!, x = st.pop()!;
        push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
      }
      // largest non-bg white island in the top 45%
      const seen = new Uint8Array(W * H);
      let best: number[] | null = null;
      for (let y = 0; y < H * 0.45; y++) for (let x = 0; x < W; x++) {
        const k = y * W + x;
        if (isW(x, y) && !bg[k] && !seen[k]) {
          const q = [x, y]; seen[k] = 1; const pts: number[] = [];
          while (q.length) {
            const b = q.pop()!, a = q.pop()!; pts.push(a, b);
            const nb = [a + 1, b, a - 1, b, a, b + 1, a, b - 1];
            for (let n = 0; n < 8; n += 2) {
              const nx = nb[n], ny = nb[n + 1];
              if (nx >= 0 && nx < W && ny >= 0 && ny < H) {
                const kk = ny * W + nx;
                if (!seen[kk] && isW(nx, ny) && !bg[kk]) { seen[kk] = 1; q.push(nx, ny); }
              }
            }
          }
          if (pts.length > 40 && (!best || pts.length > best.length)) best = pts;
        }
      }
      if (best) {
        let sx = 0, sy = 0, minx = W, maxx = 0, miny = H, maxy = 0;
        for (let i = 0; i < best.length; i += 2) {
          const a = best[i], b = best[i + 1];
          sx += a; sy += b;
          if (a < minx) minx = a; if (a > maxx) maxx = a;
          if (b < miny) miny = b; if (b > maxy) maxy = b;
        }
        const n = best.length / 2;
        setBox({ cx: sx / n / W, cy: sy / n / H, w: (maxx - minx) / W, h: (maxy - miny) / H });
      }
    };
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = eye.current, p = pupil.current;
      if (!el || !p) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const ang = Math.atan2(e.clientY - cy, e.clientX - cx);
      const maxX = r.width * 0.3;
      const maxY = r.height * 0.2;
      p.style.transform = `translate(${Math.cos(ang) * maxX}px, ${Math.sin(ang) * maxY}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="relative" style={{ width: "clamp(240px, 32vw, 400px)", aspectRatio: "1023 / 1537" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/bb-nn.png" alt="" draggable={false} className="absolute inset-0 w-full h-full object-contain" />
      {/* moving iris, centred on the detected eye */}
      <div
        ref={eye}
        className="absolute"
        style={{ left: `${box.cx * 100}%`, top: `${box.cy * 100}%`, width: `${box.w * 100}%`, height: `${box.h * 100}%`, transform: "translate(-50%, -50%)" }}
      >
        <div ref={pupil} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0A0A0A]" style={{ height: "58%", aspectRatio: "1", transition: "transform 0.08s linear" }} />
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
        <a href="#form" className="group relative z-20 -mt-[clamp(40px,7vw,90px)] block bg-[#0A0A0A] text-[#F3F1EC] px-10 md:px-16 py-14 md:py-20">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#F3F1EC]/60 mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-[#F3F1EC]/40" /> Contact Us
          </p>
          <h2 className="font-display uppercase leading-[0.95] tracking-tight mb-5 max-w-3xl" style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)" }}>
            Do you have<br />something to tell us?
          </h2>
          <p className="text-[13px] md:text-[14px] text-[#B9B5AE] leading-relaxed max-w-xl">
            Leave your message and we&apos;ll get in touch. Whether you&apos;ve got a project, a half-baked idea, or want to join the family, we&apos;re listening.
          </p>
          <span className="inline-flex items-center gap-2 mt-8 text-[10px] tracking-[0.22em] uppercase text-[#F3F1EC] group-hover:gap-3 transition-all">Start <span aria-hidden>→</span></span>
        </a>
      </section>

      {/* FORM */}
      <section id="form" className="relative max-w-3xl mx-4 md:mx-auto my-12 md:my-20 px-8 md:px-14 py-14 md:py-16 rounded-3xl border border-[#0A0A0A]/15 bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)]">
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
