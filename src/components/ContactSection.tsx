"use client";

import { useEffect, useRef, useState } from "react";

/* BE@RBRICK figure with an eye that follows the cursor (auto-detected eye box). */
function Bear() {
  const eye = useRef<HTMLDivElement>(null);
  const pupil = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ cx: 0.537, cy: 0.291, w: 0.12, h: 0.07 });

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
        let minx = W, maxx = 0, miny = H, maxy = 0;
        for (let i = 0; i < best.length; i += 2) {
          const a = best[i], b = best[i + 1];
          if (a < minx) minx = a; if (a > maxx) maxx = a;
          if (b < miny) miny = b; if (b > maxy) maxy = b;
        }
        const w = (maxx - minx) / W;
        setBox({ cx: (minx + maxx) / 2 / W + w * 0.12, cy: (miny + maxy) / 2 / H, w, h: (maxy - miny) / H });
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
      p.style.transform = `translate(${Math.cos(ang) * r.width * 0.28}px, ${Math.sin(ang) * r.height * 0.2}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="relative" style={{ width: "clamp(240px, 32vw, 400px)", aspectRatio: "1023 / 1537" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/bb-nn.png" alt="" draggable={false} className="absolute inset-0 w-full h-full object-contain" />
      <div
        ref={eye}
        className="absolute"
        style={{ left: `${box.cx * 100}%`, top: `${box.cy * 100}%`, width: `${box.w * 100}%`, height: `${box.h * 100}%`, transform: "translate(calc(-50% - 12px), -50%)" }}
      >
        <div ref={pupil} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0A0A0A]" style={{ height: "58%", aspectRatio: "1", transition: "transform 0.08s linear" }} />
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [coffee, setCoffee] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const sent = status === "sent";

  const coffees = ["Espresso", "Cappuccino", "Long black", "Decaf", "I don't drink"];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, coffee }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
      setName(""); setEmail(""); setMessage(""); setCoffee("");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full bg-transparent border-b border-[#F3F1EC]/30 py-3 text-[#F3F1EC] placeholder-[#F3F1EC]/35 outline-none focus:border-[#F3F1EC] transition-colors";

  return (
    <section id="contact" className="relative scroll-mt-20 bg-white text-[#0A0A0A] overflow-hidden">
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-[10%] z-[2] flex justify-center pointer-events-none select-none">
          <span className="font-display uppercase leading-none whitespace-nowrap text-[#0A0A0A]/[0.045]" style={{ fontSize: "clamp(5rem, 23vw, 22rem)" }}>
            Say Hello
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 md:pt-32">
          <h2 className="font-display uppercase leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.2rem, 6.5vw, 4.6rem)" }}>Ready to create<br />something unforgettable?</h2>
          <p className="text-center text-[11px] md:text-[13px] tracking-[0.1em] text-[#0A0A0A]/65 mt-6 max-w-2xl leading-relaxed normal-case">
            Got an idea? A dream? A half-baked concept scribbled on a napkin? We&apos;re into that. Whether you&apos;re building from scratch or looking to shake things up, drop us a message. We&apos;re here for bold moves, real conversations, and doing things differently, one unforgettable brand at a time.
          </p>
        </div>

        <div className="relative z-[1] flex justify-center mt-6">
          <Bear />
        </div>

        <div className="relative z-20 -mt-[clamp(40px,7vw,90px)] bg-[#0A0A0A] text-[#F3F1EC] px-8 md:px-16 py-14 md:py-20" data-cursor-color="#F3F1EC">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* LEFT — find us + details */}
            <div className="text-center md:text-left md:sticky md:top-28">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#F3F1EC]/60 mb-8 inline-flex items-center gap-3">
                <span className="w-8 h-px bg-[#F3F1EC]/40" /> Contact Us
              </p>
              <h3 className="font-display uppercase leading-[0.98] tracking-tight" style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}>
                You&apos;ll find us somewhere between Sydney, Dubai &amp; Beirut
              </h3>
              <div className="mt-12">
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#F3F1EC]/40 mb-3">Slide into our inbox</p>
                <a href="mailto:hello@thisisnn.com" data-cursor="Say hi" className="group font-editorial inline-flex items-center gap-2 hover:opacity-70 transition-opacity" style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)" }}>
                  hello@thisisnn.com
                  <span aria-hidden className="text-[#FF2EC4] group-hover:-translate-x-1 transition-transform">{"↖︎"}</span>
                </a>
              </div>
              <div className="mt-8">
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#FF2EC4] mb-3">[ Just don&apos;t leave a missed call ]</p>
                <a href="tel:+610433714701" data-cursor="Ring ring" className="font-editorial inline-block hover:opacity-70 transition-opacity" style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)" }}>
                  +61 0433 714 701
                </a>
              </div>
            </div>

            {/* RIGHT — the form */}
            <div id="contact-form" className="text-center md:text-left">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#F3F1EC]/40 mb-3">Or fill the form</p>
              <h3 className="font-display uppercase leading-[0.95] tracking-tight mb-10" style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.6rem)" }}>Wanna start something?</h3>
            <form onSubmit={submit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <label className="block text-[9px] tracking-[0.25em] uppercase text-[#F3F1EC]/50 mb-2">Your name</label>
                  <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Tony Stark" required />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.25em] uppercase text-[#F3F1EC]/50 mb-2">Email</label>
                  <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@you.com" required />
                </div>
              </div>
              <div className="text-left">
                <label className="block text-[9px] tracking-[0.25em] uppercase text-[#F3F1EC]/50 mb-2">Message</label>
                <textarea className={`${field} resize-none`} rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us what you're building…" required />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.25em] uppercase text-[#F3F1EC]/50 mb-3">How do you take your coffee?</label>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {coffees.map((c) => {
                    const on = coffee === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCoffee(on ? "" : c)}
                        className={`rounded-full border px-4 py-2 text-[11px] tracking-[0.08em] transition-colors ${
                          on ? "border-[#F3F1EC] bg-[#F3F1EC] text-[#0A0A0A]" : "border-[#F3F1EC]/25 text-[#F3F1EC]/70 hover:border-[#F3F1EC]"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
              <button
                type="submit"
                data-cursor="Send"
                disabled={status === "sending" || sent}
                className="group relative w-full overflow-hidden rounded-full border border-[#F3F1EC] py-4 mt-2 disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-[#F3F1EC] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                <span className="relative z-10 text-[11px] tracking-[0.2em] uppercase font-bold text-[#F3F1EC] group-hover:text-[#0A0A0A] transition-colors duration-500">
                  {status === "sending" ? "Sending…" : sent ? "Got it, talk soon ✦" : "Send it"}
                </span>
              </button>
              {status === "error" && (
                <p className="text-[11px] tracking-[0.05em] text-[#FF2EC4] text-center">
                  Something went wrong. Email us directly at hello@thisisnn.com.
                </p>
              )}
            </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
