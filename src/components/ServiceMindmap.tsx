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

/* Live radial mindmap. Branches orbit a hub, drifting + parallaxing toward the
   cursor. Click a branch to expand it into its sub-points; click out to return. */
export default function ServiceMindmap() {
  const wrap = useRef<HTMLDivElement>(null);
  const branchRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  activeRef.current = active;
  const nowRef = useRef(0);
  const growStart = useRef(0);
  const origin = useRef({ x: 0, y: 0 });

  const expand = (i: number) => {
    const wrapEl = wrap.current;
    const node = branchRefs.current[i];
    if (wrapEl && node) {
      const wr = wrapEl.getBoundingClientRect();
      const nr = node.getBoundingClientRect();
      origin.current = { x: nr.left + nr.width / 2 - wr.left, y: nr.top + nr.height / 2 - wr.top };
    }
    growStart.current = nowRef.current;
    setActive(i);
  };

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let tmx = 0, tmy = 0, mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tmx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      tmy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => { tmx = 0; tmy = 0; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

    let raf = 0;
    let start = 0;
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
      const a = activeRef.current;
      const count = a === null ? BRANCHES.length : BRANCHES[a].items.length;
      // elliptical orbit — wide horizontally (uses the room) so labels don't collide
      const rx = Math.min(r.width * 0.43, 480) * (a === null ? 1 : 0.9);
      const ry = r.height * (a === null ? 0.4 : 0.38);
      const refs = a === null ? branchRefs.current : subRefs.current;
      // grow factor: 1 on the main map, ramps 0→1 when a branch expands
      const grow = a === null ? 1 : easeOut(Math.min((t - growStart.current) / 520, 1));
      for (let i = 0; i < count; i++) {
        const ang = (i / count) * Math.PI * 2 - Math.PI / 2;
        const depth = 0.5 + (i % 3) * 0.3;
        const phase = i * 1.7;
        // alternate nodes onto an inner ring so neighbours never overlap
        const ring = i % 2 === 0 ? 1 : 0.66;
        const idleX = Math.sin(time * 0.6 + phase) * 4 * grow;
        const idleY = Math.cos(time * 0.5 + phase) * 4 * grow;
        // final resting (orbit) position
        const targetX = cx + Math.cos(ang) * rx * ring + mx * 26 * depth + idleX;
        const targetY = cy + Math.sin(ang) * ry * ring + my * 26 * depth + idleY;
        // expand out FROM the clicked label's spot (origin) when a branch opens
        const ox = a === null ? cx : origin.current.x;
        const oy = a === null ? cy : origin.current.y;
        const px = ox + (targetX - ox) * grow;
        const py = oy + (targetY - oy) * grow;
        const node = refs[i];
        if (node) {
          const sc = a === null ? 1 : 0.45 + 0.55 * grow;
          node.style.transform = `translate(-50%,-50%) translate(${px}px,${py}px) scale(${sc})`;
          if (a !== null) node.style.opacity = String(grow);
        }
        const ln = lineRefs.current[i];
        if (ln) {
          ln.setAttribute("x1", String(cx + mx * 14));
          ln.setAttribute("y1", String(cy + my * 14));
          ln.setAttribute("x2", String(px));
          ln.setAttribute("y2", String(py));
          ln.style.opacity = "1";
        }
      }
      for (let i = count; i < lineRefs.current.length; i++) {
        const ln = lineRefs.current[i];
        if (ln) ln.style.opacity = "0";
      }
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const activeBranch = active === null ? null : BRANCHES[active];

  return (
    <div
      ref={wrap}
      data-cursor={active === null ? "Explore" : "Back"}
      onClick={() => setActive(null)}
      className="relative w-full select-none"
      style={{ height: "clamp(520px, 72vh, 680px)" }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        {BRANCHES.map((_, i) => (
          <line key={i} ref={(e) => { lineRefs.current[i] = e; }} stroke="#0A0A0A" strokeOpacity="0.2" strokeWidth="1" />
        ))}
      </svg>

      {/* central hub — also returns to the main map */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setActive(null); }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-[#0A0A0A] text-[#F3F1EC] flex items-center justify-center text-center px-5 transition-[width,height] duration-300"
        style={{ width: "clamp(130px,15vw,180px)", height: "clamp(130px,15vw,180px)" }}
      >
        <span className="font-display uppercase leading-[0.95] tracking-tight" style={{ fontSize: "clamp(0.85rem,1.3vw,1.1rem)" }}>
          {activeBranch ? activeBranch.label : <>Your<br />concept</>}
        </span>
      </button>

      {/* branch nodes (main map) */}
      {BRANCHES.map((b, i) => (
        <div
          key={b.label}
          ref={(e) => { branchRefs.current[i] = e; }}
          onClick={(e) => { e.stopPropagation(); expand(i); }}
          className={`group absolute left-0 top-0 z-20 cursor-pointer transition-opacity duration-300 ${active === null ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <div className="whitespace-nowrap rounded-full border border-[#0A0A0A]/25 bg-[#F3F1EC] px-5 py-2.5 text-[12px] md:text-[13px] tracking-[0.04em] text-center group-hover:bg-[#0A0A0A] group-hover:text-[#F3F1EC] group-hover:border-[#0A0A0A] group-hover:scale-105 transition-[background-color,color,border-color,scale] duration-300">
            {b.label}
          </div>
        </div>
      ))}

      {/* sub-item nodes (expanded branch) */}
      {activeBranch &&
        activeBranch.items.map((it, i) => (
          <div
            key={it}
            ref={(e) => { subRefs.current[i] = e; }}
            className="absolute left-0 top-0 z-20 whitespace-nowrap rounded-full border border-[#0A0A0A]/20 bg-[#F3F1EC] px-4 py-2 text-[11px] md:text-[12px] tracking-[0.04em] text-center"
            style={{ transform: "translate(-50%,-50%)", opacity: 0 }}
          >
            {it}
          </div>
        ))}

      {activeBranch && (
        <p className="absolute left-1/2 bottom-1 -translate-x-1/2 z-30 text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/35 pointer-events-none">
          Click anywhere to go back
        </p>
      )}
    </div>
  );
}
