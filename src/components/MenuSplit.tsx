"use client";

import { useState } from "react";

type Course = {
  course: string;
  title: string;
  intro?: string[];
  items: string[];
};

const COURSES: Course[] = [
  {
    course: "The Amuse Bouche",
    title: "Branding & Identity",
    items: [
      "Naming & Tagline Development",
      "Brand Strategy & Positioning",
      "Logo & Identity Design",
      "Visual Identity Systems",
      "Tone of Voice & Messaging",
      "Brand Guidelines",
      "Menu Design",
      "Packaging Concepts",
    ],
  },
  {
    course: "The Appetizers",
    title: "Web Design & Development",
    items: [
      "Website Design",
      "Website Development",
      "UX & User Journey Mapping",
      "Mobile Optimisation",
      "Booking & Reservation Integrations",
      "E-Commerce Solutions",
      "SEO Foundations",
      "Website Management & Updates",
    ],
  },
  {
    course: "The Mains",
    title: "Print & Production",
    items: [
      "Signage & Environmental Graphics",
      "Packaging Production",
      "Menus & Printed Collateral",
      "Uniform Design & Manufacture",
      "Promotional Merchandise",
      "Exhibition & Event Displays",
      "Large Format Printing",
    ],
  },
  {
    course: "The Desserts",
    title: "PR & Brand Visibility",
    intro: [
      "A great brand deserves to be discovered — through storytelling, media relationships, content and collaborations that put it in front of the right audience.",
    ],
    items: [
      "Public Relations (PR)",
      "Media Outreach & Press Releases",
      "Launch Strategies & Campaigns",
      "Influencer & Ambassador Partnerships",
      "Social Media Strategy",
      "Content Creation",
      "Photography & Videography",
      "Community Management",
    ],
  },
];

const PALETTE = [
  { bg: "#EFE7D6", fg: "#0A0A0A" },
  { bg: "#E4DAF6", fg: "#0A0A0A" },
  { bg: "#C9A227", fg: "#0A0A0A" },
  { bg: "#FF6A3D", fg: "#0A0A0A" },
  { bg: "#F2EBA0", fg: "#0A0A0A" },
  { bg: "#BFE3C6", fg: "#0A0A0A" },
  { bg: "#F7C8DD", fg: "#0A0A0A" },
  { bg: "#BCD6F5", fg: "#0A0A0A" },
];

// scatter positions (desktop) — top/left in %, slight rotation
const SCATTER = [
  { top: "14%", left: "34%", rot: -3 },
  { top: "30%", left: "16%", rot: 2 },
  { top: "44%", left: "42%", rot: -2 },
  { top: "40%", left: "70%", rot: 3 },
  { top: "56%", left: "22%", rot: -2 },
  { top: "60%", left: "52%", rot: 2 },
  { top: "24%", left: "60%", rot: -1 },
  { top: "70%", left: "38%", rot: 3 },
];

export default function MenuSplit() {
  const [active, setActive] = useState(0);
  const cur = COURSES[active];

  return (
    <div className="overflow-hidden">
      <div className="py-4 md:py-6">
        {/* heading */}
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-6 text-center">The Menu, What We Do</p>
        <h3 className="font-editorial leading-[1.05] max-w-3xl mx-auto text-center mb-12 md:mb-16 text-[#0A0A0A]" style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}>
          Four ways we make brands <span className="italic">unforgettable</span>.
        </h3>

        {/* layered list + scattered pills */}
        <div className="relative">
          <ul className="relative z-10">
            {COURSES.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.title}>
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    data-cursor="View"
                    className="group w-full text-center flex flex-col items-center py-1.5 md:py-2"
                  >
                    <span className="flex flex-col items-center">
                      <span className={`block text-[8px] md:text-[9px] tracking-[0.3em] uppercase mb-1 transition-colors duration-300 ${on ? "text-[#FF2EC4]" : "text-[#0A0A0A]/25"}`}>
                        [ {c.course} ]
                      </span>
                      <span
                        className={`font-editorial leading-[0.92] transition-colors duration-300 ${on ? "text-[#0A0A0A]" : "text-[#0A0A0A]/25 group-hover:text-[#0A0A0A]/45"}`}
                        style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}
                      >
                        {c.title}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* scattered pills (desktop overlay) */}
          <div className="hidden md:block pointer-events-none absolute inset-0 z-20">
            {cur.items.map((it, i) => {
              const pos = SCATTER[i % SCATTER.length];
              const col = PALETTE[i % PALETTE.length];
              return (
                <span
                  key={it}
                  className="absolute whitespace-nowrap rounded-md px-5 py-2.5 text-[13px] font-medium shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] animate-[fadeUp_0.45s_ease] will-change-transform"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: `rotate(${pos.rot}deg)`,
                    background: col.bg,
                    color: col.fg,
                    animationDelay: `${i * 0.04}s`,
                  }}
                >
                  {it}
                </span>
              );
            })}
          </div>
        </div>

        {/* mobile: active services as wrapped pills */}
        <div className="md:hidden mt-8">
          {cur.intro && <p className="text-[#0A0A0A]/60 text-sm leading-relaxed mb-5">{cur.intro[0]}</p>}
          <div className="flex flex-wrap gap-2.5">
            {cur.items.map((it, i) => {
              const col = PALETTE[i % PALETTE.length];
              return (
                <span key={it} className="rounded-md px-4 py-2 text-[12px] font-medium" style={{ background: col.bg, color: col.fg }}>
                  {it}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
