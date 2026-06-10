"use client";

import { useEffect, useRef, useState } from "react";

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

const MAX_SUB = 6;

/* Live radial mindmap with a zoom transition: click a branch and the camera
   zooms into its own "planet" system; click out and it zooms back to main. */
export default function ServiceMindmap({ dark = false }: { dark?: boolean }) {
  const stroke = dark ? "#F3F1EC" : "#0A0A0A";
  const hubCls = dark ? "bg-[#F3F1EC] text-[#0A0A0A]" : "bg-[#0A0A0A] text-[#F3F1EC]";
  const labelCls = dark
    ? "border-[#F3F1EC]/30 bg-[#0A0A0A] text-[#F3F1EC] group-hover:bg-[#F3F1EC] group-hover:text-[#0A0A0A] group-hover:border-[#F3F1EC]"
    : "border-[#0A0A0A]/25 bg-[#F3F1EC] text-[#0A0A0A] group-hover:bg-[#0A0A0A] group-hover:text-[#F3F1EC] group-hover:border-[#0A0A0A]";
  const subCls = dark ? "border-[#F3F1EC]/25 bg-[#0A0A0A] text-[#F3F1EC]" : "border-[#0A0A0A]/20 bg-[#F3F1EC] text-[#0A0A0A]";
  const hintCls = dark ? "text-[#F3F1EC]/40" : "text-[#0A0A0A]/35";
  const wrap = useRef<HTMLDivElement>(null);
  const mainNodes = useRef<(HTMLDivElement | null)[]>([]);
  const mainLines = useRef<(SVGLineElement | null)[]>([]);
  const subNodes = useRef<(HTMLDivElement | null)[]>([]);
  const subLines = useRef<(SVGLineElement | null)[]>([]);
  const streak = dark ? "#F3F1EC" : "#0A0A0A";
  const [active, setActive] = useState<number | null>(null);
  const [warp, setWarp] = useState(0);
  const activeRef = useRef<number | null>(null);
  activeRef.current = active;
  const nowRef = useRef(0);
  const growStart = useRef(0);

  const expand = (i: number) => { growStart.current = nowRef.current; setWarp((w) => w + 1); setActive(i); };
  const collapse = () => { setWarp((w) => w + 1); setActive(null); };

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
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
    const place = (
      node: HTMLDivElement | null,
      line: SVGLineElement | null,
      ang: number, rx: number, ry: number, ring: number,
      cx: number, cy: number, depth: number, phase: number, time: number, grow: number,
    ) => {
      const idleX = Math.sin(time * 0.6 + phase) * 4 * grow;
      const idleY = Math.cos(time * 0.5 + phase) * 4 * grow;
      const px = cx + Math.cos(ang) * rx * ring * grow + mx * 24 * depth * grow + idleX;
      const py = cy + Math.sin(ang) * ry * ring * grow + my * 24 * depth * grow + idleY;
      if (node) {
        node.style.transform = `translate(-50%,-50%) translate(${px}px,${py}px)`;
        node.style.opacity = String(grow);
      }
      if (line) {
        line.setAttribute("x1", String(cx + mx * 14));
        line.setAttribute("y1", String(cy + my * 14));
        line.setAttribute("x2", String(px));
        line.setAttribute("y2", String(py));
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      nowRef.current = t;
      if (!start) start = t;
      mx += (tmx - mx) * 0.07;
      my += (tmy - my) * 0.07;
      const r = el.getBoundingClientRect();
      const cx = r.width / 2;
      const cy = r.height / 2;
      const time = (t - start) / 1000;
      const rx = Math.min(r.width * 0.43, 480);
      const ry = r.height * 0.4;

      // main map — always live
      for (let i = 0; i < BRANCHES.length; i++) {
        const ang = (i / BRANCHES.length) * Math.PI * 2 - Math.PI / 2;
        place(mainNodes.current[i], mainLines.current[i], ang, rx, ry, i % 2 === 0 ? 1 : 0.66, cx, cy, 0.5 + (i % 3) * 0.3, i * 1.7, time, 1);
      }

      // detail map — only the active branch
      const a = activeRef.current;
      if (a !== null) {
        const count = BRANCHES[a].items.length;
        const grow = easeOut(Math.min((t - growStart.current) / 520, 1));
        for (let i = 0; i < count; i++) {
          const ang = (i / count) * Math.PI * 2 - Math.PI / 2;
          place(subNodes.current[i], subLines.current[i], ang, rx * 0.92, ry * 0.92, i % 2 === 0 ? 1 : 0.7, cx, cy, 0.5 + (i % 3) * 0.3, i * 1.7, time, grow);
        }
        for (let i = count; i < MAX_SUB; i++) {
          const ln = subLines.current[i];
          if (ln) ln.style.opacity = "0";
        }
      }
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const branch = active !== null ? BRANCHES[active] : null;
  const EASE = "transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.7,0,0.3,1)]";

  return (
    <div
      ref={wrap}
      data-cursor={active === null ? "Explore" : "Back"}
      onClick={() => collapse()}
      className="relative w-full overflow-hidden select-none"
      style={{ height: "clamp(520px, 72vh, 680px)" }}
    >
      {/* hyperspace warp streaks on every zoom */}
      <div key={warp} className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center">
        {warp > 0 &&
          Array.from({ length: 36 }).map((_, i) => (
            <span
              key={i}
              className="warp-streak absolute left-1/2 top-1/2 h-px w-[55%]"
              style={{ ["--ang" as string]: `${(i / 36) * 360}deg`, transformOrigin: "left center", background: `linear-gradient(90deg, transparent, ${streak})` }}
            />
          ))}
      </div>
      {/* MAIN SCENE */}
      <div
        className={`absolute inset-0 origin-center ${EASE} ${active === null ? "" : "pointer-events-none"}`}
        style={{ transform: active === null ? "scale(1)" : "scale(1.6)", opacity: active === null ? 1 : 0 }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          {BRANCHES.map((_, i) => (
            <line key={i} ref={(e) => { mainLines.current[i] = e; }} stroke={stroke} strokeOpacity="0.2" strokeWidth="1" />
          ))}
        </svg>
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full ${hubCls} flex items-center justify-center text-center px-5`} style={{ width: "clamp(130px,15vw,180px)", height: "clamp(130px,15vw,180px)" }}>
          <span className="font-display uppercase leading-[0.95] tracking-tight" style={{ fontSize: "clamp(0.85rem,1.3vw,1.1rem)" }}>Your<br />concept</span>
        </div>
        {BRANCHES.map((b, i) => (
          <div
            key={b.label}
            ref={(e) => { mainNodes.current[i] = e; }}
            onClick={(e) => { e.stopPropagation(); expand(i); }}
            className="group absolute left-0 top-0 z-20 cursor-pointer"
            style={{ transform: "translate(-50%,-50%)" }}
          >
            <div className={`whitespace-nowrap rounded-full border ${labelCls} px-5 py-2.5 text-[12px] md:text-[13px] tracking-[0.04em] text-center group-hover:scale-105 transition-[background-color,color,border-color,scale] duration-300`}>
              {b.label}
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL SCENE (the branch's planet) */}
      <div
        className={`absolute inset-0 origin-center ${EASE} ${active !== null ? "" : "pointer-events-none"}`}
        style={{ transform: active !== null ? "scale(1)" : "scale(0.55)", opacity: active !== null ? 1 : 0 }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          {Array.from({ length: MAX_SUB }).map((_, i) => (
            <line key={i} ref={(e) => { subLines.current[i] = e; }} stroke={stroke} strokeOpacity="0.2" strokeWidth="1" />
          ))}
        </svg>
        {/* planet */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full ${hubCls} flex items-center justify-center text-center px-5`} style={{ width: "clamp(150px,17vw,210px)", height: "clamp(150px,17vw,210px)" }}>
          <span className="font-display uppercase leading-[0.95] tracking-tight" style={{ fontSize: "clamp(0.9rem,1.5vw,1.3rem)" }}>{branch?.label}</span>
        </div>
        {branch?.items.map((it, i) => (
          <div
            key={it}
            ref={(e) => { subNodes.current[i] = e; }}
            className={`absolute left-0 top-0 z-20 whitespace-nowrap rounded-full border ${subCls} px-4 py-2 text-[11px] md:text-[12px] tracking-[0.04em] text-center`}
            style={{ transform: "translate(-50%,-50%)", opacity: 0 }}
          >
            {it}
          </div>
        ))}
        {branch && (
          <p className={`absolute left-1/2 bottom-1 -translate-x-1/2 z-30 text-[9px] tracking-[0.3em] uppercase ${hintCls} pointer-events-none`}>
            Click anywhere to zoom out
          </p>
        )}
      </div>
    </div>
  );
}
