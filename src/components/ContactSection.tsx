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

/* Compact interactive city codes — types out the full name on hover. */
const CITIES = [
  { code: "SYD", name: "SYDNEY", line: "Where we're based, and where we build." },
  { code: "DXB", name: "DUBAI", line: "Where we cut our teeth on some of the region's most awarded concepts." },
  { code: "BEY", name: "BEIRUT", line: "Where hospitality isn't a business, it's a way of life." },
];

function CityCode({ code, name, active, onEnter }: { code: string; name: string; active: boolean; onEnter: () => void }) {
  const [text, setText] = useState(code);
  const [hovered, setHovered] = useState(false);
  const cur = useRef(code);
  useEffect(() => {
    const target = hovered ? name : code;
    let cancelled = false;
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      if (cancelled) return;
      const c = cur.current;
      if (c === target) return;
      const next = !target.startsWith(c) ? c.slice(0, -1) : target.slice(0, c.length + 1);
      cur.current = next;
      setText(next || " ");
      t = setTimeout(step, 32);
    };
    step();
    return () => { cancelled = true; clearTimeout(t); };
  }, [hovered, code, name]);
  return (
    <button
      onMouseEnter={() => { setHovered(true); onEnter(); }}
      onMouseLeave={() => setHovered(false)}
      className="font-display leading-[0.95] transition-colors duration-500 whitespace-nowrap"
      style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)", color: active ? "#F3F1EC" : "rgba(243,241,236,0.28)" }}
    >
      {text}
    </button>
  );
}

function CityCodes() {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 justify-center md:justify-start">
        {CITIES.map((c, i) => (
          <CityCode key={c.code} code={c.code} name={c.name} active={active === i} onEnter={() => setActive(i)} />
        ))}
      </div>
      <div className="relative h-9 mt-3 max-w-md mx-auto md:mx-0">
        {CITIES.map((c, i) => (
          <p
            key={c.code}
            className="absolute inset-x-0 top-0 text-[#B9B5AE] text-xs md:text-[13px] leading-relaxed transition-all duration-500 text-center md:text-left"
            style={{ opacity: active === i ? 1 : 0, transform: active === i ? "translateY(0)" : "translateY(8px)" }}
          >
            {c.line}
          </p>
        ))}
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
    "w-full bg-transparent border-b border-[#0A0A0A]/30 py-3 text-[#0A0A0A] placeholder-[#0A0A0A]/35 outline-none focus:border-[#0A0A0A] transition-colors";

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

        <div className="relative z-20 -mt-[clamp(40px,7vw,90px)] bg-[#0A0A0A] text-[#F3F1EC] px-8 md:px-16 pt-28 md:pt-44 pb-16 md:pb-24 overflow-hidden" data-cursor-color="#F3F1EC">
          {/* rotating dotted-sphere background for the whole block */}
          <div className="absolute inset-0 z-0 flex items-start justify-center pointer-events-none">
            <img src="/dotted-sphere.svg" alt="" className="animate-[spin-slow_90s_linear_infinite] mt-[6vh]" style={{ width: "clamp(500px, 72vw, 1000px)", opacity: 0.1 }} />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* LEFT — details */}
            <div className="relative text-center md:text-left">
              <div className="relative">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#F3F1EC]/60 mb-6 inline-flex items-center gap-3">
                  <span className="w-8 h-px bg-[#F3F1EC]/40" /> Contact Us
                </p>
                <h3 className="font-editorial leading-[1.1] max-w-md mx-auto md:mx-0" style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)" }}>
                  Not every project is for us.
                </h3>
                <div className="mt-5 space-y-4 text-[#F3F1EC]/65 leading-relaxed max-w-md mx-auto md:mx-0" style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}>
                  <p>We keep our client roster intentionally small, allowing us to stay hands-on from strategy through to execution. That means availability is limited, and most months fill quickly.</p>
                  <p>If you&apos;re serious about building something memorable, <span className="text-[#F3F1EC]">let&apos;s talk.</span></p>
                </div>

                {/* interactive city codes */}
                <CityCodes />

                {/* contact detail cards */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <a href="mailto:hello@thisisnn.com" data-cursor="Say hi" className="group relative rounded-2xl border border-[#F3F1EC]/15 bg-[#F3F1EC]/[0.03] p-5 md:p-6 hover:border-[#FF2EC4]/60 hover:bg-[#F3F1EC]/[0.06] transition-colors">
                    <span aria-hidden className="absolute top-4 right-4 text-[#F3F1EC]/40 group-hover:text-[#FF2EC4] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all">↗</span>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#F3F1EC]/40 mb-2">Email</p>
                    <p className="font-editorial leading-tight break-all group-hover:text-[#FF2EC4] transition-colors" style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)" }}>hello@thisisnn.com</p>
                  </a>
                  <a href="tel:+61433714701" data-cursor="Ring ring" className="group relative rounded-2xl border border-[#F3F1EC]/15 bg-[#F3F1EC]/[0.03] p-5 md:p-6 hover:border-[#FF2EC4]/60 hover:bg-[#F3F1EC]/[0.06] transition-colors">
                    <span aria-hidden className="absolute top-4 right-4 text-[#F3F1EC]/40 group-hover:text-[#FF2EC4] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all">↗</span>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#F3F1EC]/40 mb-2">Phone</p>
                    <p className="font-editorial leading-tight group-hover:text-[#FF2EC4] transition-colors" style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)" }}>+61 433 714 701</p>
                  </a>
                </div>

              </div>
            </div>

            {/* RIGHT — the form, as a light card */}
            <div id="contact-form" className="text-center md:text-left bg-[#F3F1EC] text-[#0A0A0A] rounded-3xl p-7 md:p-10 shadow-[0_34px_80px_-34px_rgba(0,0,0,0.7)]">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-3">Or fill the form</p>
              <h3 className="font-display uppercase leading-[0.95] tracking-tight mb-10" style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.6rem)" }}>Wanna start something?</h3>
            <form onSubmit={submit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <label className="block text-[9px] tracking-[0.25em] uppercase text-[#0A0A0A]/50 mb-2">Your name</label>
                  <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Tony Stark" required />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.25em] uppercase text-[#0A0A0A]/50 mb-2">Email</label>
                  <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@you.com" required />
                </div>
              </div>
              <div className="text-left">
                <label className="block text-[9px] tracking-[0.25em] uppercase text-[#0A0A0A]/50 mb-2">Message</label>
                <textarea className={`${field} resize-none`} rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us what you're building…" required />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.25em] uppercase text-[#0A0A0A]/50 mb-3">How do you take your coffee?</label>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {coffees.map((c) => {
                    const on = coffee === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCoffee(on ? "" : c)}
                        className={`rounded-full border px-4 py-2 text-[11px] tracking-[0.08em] transition-colors ${
                          on ? "border-[#0A0A0A] bg-[#0A0A0A] text-[#EFEDE6]" : "border-[#0A0A0A]/25 text-[#0A0A0A]/70 hover:border-[#0A0A0A]"
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
                className="group relative w-full overflow-hidden rounded-full border border-[#0A0A0A] py-4 mt-2 disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-[#0A0A0A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                <span className="relative z-10 text-[11px] tracking-[0.2em] uppercase font-bold text-[#0A0A0A] group-hover:text-[#EFEDE6] transition-colors duration-500">
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
