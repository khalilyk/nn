"use client";

import { useEffect, useRef } from "react";

const BRANCHES: { label: string; items: string[] }[] = [
  { label: "Brand foundations", items: ["Brand strategy", "Positioning", "Naming", "Brand story", "Vision & values", "Customer personas"] },
  { label: "Identity systems", items: ["Logo design", "Visual identity", "Brand guidelines", "Typography", "Colour systems", "Brand assets"] },
  { label: "Menu development", items: ["Menu strategy", "Engineering & pricing", "Menu design", "F&B concepts", "Signature products", "Seasonal rollouts"] },
  { label: "Campaign direction", items: ["Launch campaigns", "Promotions", "Influencer strategy", "PR alignment", "Photography direction", "Creative concepts"] },
  { label: "Packaging", items: ["Takeaway packaging", "Retail products", "Merchandise", "Supplier sourcing", "Production management", "Sustainability review"] },
  { label: "Content creation", items: ["Photography", "Videography", "Social media content", "Copywriting", "Reels & short form", "Content calendars"] },
  { label: "Digital strategy", items: ["Website design", "SEO", "Email marketing", "CRM & loyalty", "Online ordering", "Analytics & reporting"] },
  { label: "On-ground activations", items: ["Venue launches", "Pop-ups", "Collaborations", "Events", "Partnerships", "Guest experiences"] },
  { label: "Guest experience", items: ["Service design", "Customer journey", "Staff touchpoints", "Loyalty programs"] },
  { label: "Growth strategy", items: ["Customer acquisition", "Retention", "Partnerships", "Expansion planning"] },
  { label: "Operations support", items: ["SOP development", "Staff training", "Internal branding", "Recruitment campaigns"] },
];

/* Live radial mindmap — branches orbit a central hub, drift gently and
   parallax toward the cursor. Hovering a branch freezes the motion and
   reveals its sub-items. */
export default function ServiceMindmap() {
  const wrap = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const frozen = useRef(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const n = BRANCHES.length;
    const meta = BRANCHES.map((_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      return { ax: Math.cos(a), ay: Math.sin(a), depth: 0.5 + (i % 3) * 0.3, phase: i * 1.7 };
    });

    let tmx = 0, tmy = 0, mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tmx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      tmy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => { tmx = 0; tmy = 0; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    let raf = 0;
    let start = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (frozen.current) return; // hold positions so the open panel is readable
      if (!start) start = t;
      mx += (tmx - mx) * 0.07;
      my += (tmy - my) * 0.07;
      const r = el.getBoundingClientRect();
      const cx = r.width / 2;
      const cy = r.height / 2;
      const radius = Math.min(r.width, r.height) * 0.36;
      const time = (t - start) / 1000;
      meta.forEach((m, i) => {
        const idleX = Math.sin(time * 0.6 + m.phase) * 9;
        const idleY = Math.cos(time * 0.5 + m.phase) * 9;
        const px = cx + m.ax * radius + mx * 46 * m.depth + idleX;
        const py = cy + m.ay * radius + my * 46 * m.depth + idleY;
        const node = nodes.current[i];
        if (node) node.style.transform = `translate(-50%,-50%) translate(${px}px,${py}px)`;
        const ln = lines.current[i];
        if (ln) {
          ln.setAttribute("x1", String(cx + mx * 14));
          ln.setAttribute("y1", String(cy + my * 14));
          ln.setAttribute("x2", String(px));
          ln.setAttribute("y2", String(py));
        }
      });
      return;
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrap} data-cursor="Explore" className="relative w-full" style={{ height: "clamp(520px, 72vh, 680px)" }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        {BRANCHES.map((_, i) => (
          <line key={i} ref={(e) => { lines.current[i] = e; }} stroke="#0A0A0A" strokeOpacity="0.2" strokeWidth="1" />
        ))}
      </svg>

      {/* central hub */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-[#0A0A0A] text-[#F3F1EC] flex items-center justify-center text-center"
        style={{ width: "clamp(120px,13vw,160px)", height: "clamp(120px,13vw,160px)" }}
      >
        <span className="font-display uppercase leading-[0.92] tracking-tight" style={{ fontSize: "clamp(0.9rem,1.4vw,1.15rem)" }}>
          Your<br />concept
        </span>
      </div>

      {/* orbiting branch nodes */}
      {BRANCHES.map((b, i) => {
        const a = (i / BRANCHES.length) * Math.PI * 2 - Math.PI / 2;
        const openUp = Math.sin(a) > 0.25; // lower-half nodes open their panel upward
        return (
          <div
            key={b.label}
            ref={(e) => { nodes.current[i] = e; }}
            onMouseEnter={() => { frozen.current = true; }}
            onMouseLeave={() => { frozen.current = false; }}
            className="group absolute left-0 top-0 z-20 hover:z-40"
            style={{ transform: "translate(-50%,-50%)" }}
          >
            <div className="whitespace-nowrap rounded-full border border-[#0A0A0A]/25 bg-[#F3F1EC] px-5 py-2.5 text-[12px] md:text-[13px] tracking-[0.04em] text-center group-hover:bg-[#0A0A0A] group-hover:text-[#F3F1EC] group-hover:border-[#0A0A0A] group-hover:scale-105 transition-[background-color,color,border-color,scale] duration-300">
              {b.label}
            </div>
            {/* sub-items panel */}
            <div
              className={`pointer-events-none absolute left-1/2 -translate-x-1/2 w-48 rounded-2xl border border-[#0A0A0A]/10 bg-[#F3F1EC] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] p-4 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ${openUp ? "bottom-full mb-3" : "top-full mt-3"}`}
            >
              <ul className="space-y-1.5 text-left">
                {b.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-[11px] leading-snug text-[#0A0A0A]/60">
                    <span className="text-[#81D742]">✦</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
