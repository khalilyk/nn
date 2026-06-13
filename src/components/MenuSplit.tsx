"use client";

import { useRef, useState } from "react";
import MenuLink from "./MenuLink";

const SERVICES = [
  { no: "01", title: "Branding & Identity", body: "Strategy, positioning and visual identities that stand apart.", minH: "16.5rem" },
  { no: "02", title: "Web Design & Development", body: "Digital experiences built to engage, convert and grow.", minH: "13rem" },
  { no: "03", title: "Print & Production", body: "Physical touchpoints that bring brands into the real world.", minH: "13rem" },
  { no: "04", title: "PR & Brand Visibility", body: "Stories, campaigns and collaborations that create attention and momentum.", minH: "16.5rem" },
];

function LiquidCard({ no, title, body, minH, delay }: { no: string; title: string; body: string; minH: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [o, setO] = useState({ x: "50%", y: "100%" });

  const setOrigin = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setO({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px` });
  };

  return (
    <div
      ref={ref}
      data-cursor="View"
      onPointerEnter={(e) => { setOrigin(e); setHover(true); }}
      onPointerLeave={(e) => { setOrigin(e); setHover(false); }}
      className="liquid-card group relative overflow-hidden mb-5 break-inside-avoid border border-[#0A0A0A]/15 bg-white/50 px-7 py-8 cursor-pointer"
      style={{ minHeight: minH, animationDelay: `${delay}s` }}
    >
      {/* ink fill that grows from the cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute rounded-full bg-[#0A0A0A] transition-transform duration-[650ms] ease-[cubic-bezier(0.7,0,0.3,1)]"
        style={{ left: o.x, top: o.y, width: "300%", height: "300%", transform: `translate(-50%,-50%) scale(${hover ? 1 : 0})` }}
      />
      <div className={`relative z-10 transition-colors duration-500 ${hover ? "text-[#F3F1EC]" : "text-[#0A0A0A]"}`}>
        <span className={`font-display tracking-tight transition-colors duration-500 ${hover ? "text-[#81D742]" : "text-[#FF2EC4]"}`} style={{ fontSize: "0.95rem" }}>
          {no}
        </span>
        <h4 className="font-editorial leading-[1.05] mt-3 mb-3" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.1rem)" }}>
          {title}
        </h4>
        <p className="leading-relaxed opacity-80" style={{ fontSize: "clamp(0.95rem, 1.25vw, 1.05rem)" }}>
          {body}
        </p>
      </div>
    </div>
  );
}

export default function MenuSplit() {
  return (
    <div>
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-6">The Menu, What We Do</p>
      <h3 className="font-editorial leading-[1.05] max-w-3xl" style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}>
        Four ways we make brands <span className="italic">unforgettable</span>.
      </h3>

      <div className="mt-12 md:mt-14 columns-1 md:columns-2 gap-5">
        {SERVICES.map((s, i) => (
          <LiquidCard key={s.no} {...s} delay={i * -3.5} />
        ))}
      </div>

      <div className="mt-12">
        <MenuLink />
      </div>
    </div>
  );
}
