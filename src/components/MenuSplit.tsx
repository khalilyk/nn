"use client";

import { useState } from "react";
import MenuLink from "./MenuLink";

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
      "A great brand deserves to be discovered. We help businesses earn attention through strategic storytelling, media relationships, content creation and meaningful collaborations that put brands in front of the right audience.",
      "Whether launching a new venue, promoting a campaign or building long-term awareness, we create visibility that feels authentic and drives real impact.",
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

export default function MenuSplit() {
  const [active, setActive] = useState(0);
  const cur = COURSES[active];

  return (
    <div>
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-6">The Menu, What We Do</p>
      <h3 className="font-editorial leading-[1.05] max-w-3xl" style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}>
        Four ways we make brands <span className="italic">unforgettable</span>.
      </h3>

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        {/* LEFT — the courses */}
        <div className="md:col-span-5 md:sticky md:top-28">
          <ul>
            {COURSES.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.title} className="border-b border-[#0A0A0A]/15 first:border-t">
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    data-cursor="View"
                    className="group w-full text-left py-5 md:py-6 flex items-baseline gap-4"
                  >
                    <span
                      className={`font-display tracking-tight shrink-0 transition-colors duration-300 ${on ? "text-[#FF2EC4]" : "text-[#0A0A0A]/30"}`}
                      style={{ fontSize: "0.95rem" }}
                    >
                      0{i + 1}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[8px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-2">
                        [ {c.course} ]
                      </span>
                      <span
                        className={`font-editorial leading-[1.05] transition-all duration-300 ${on ? "text-[#0A0A0A] translate-x-1" : "text-[#0A0A0A]/45"} inline-block`}
                        style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)" }}
                      >
                        {c.title}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 self-center transition-all duration-300 ${on ? "opacity-100 translate-x-0 text-[#FF2EC4]" : "opacity-0 -translate-x-2"}`}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT — the selected course's list */}
        <div className="md:col-span-7" key={active}>
          <div className="animate-[fadeUp_0.5s_ease]">
            <span className="block text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-3">
              [ {cur.course} ]
            </span>
            <h4 className="font-editorial leading-[1.05] mb-7" style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)" }}>
              {cur.title}
            </h4>

            {cur.intro && (
              <div className="space-y-4 text-[#0A0A0A]/65 leading-relaxed max-w-xl mb-8" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}>
                {cur.intro.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            )}

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0">
              {cur.items.map((it) => (
                <li
                  key={it}
                  className="flex items-baseline gap-3 border-b border-[#0A0A0A]/10 py-3 text-[#0A0A0A]/80"
                  style={{ fontSize: "clamp(0.9rem, 1.15vw, 1rem)" }}
                >
                  <span className="text-[#FF2EC4] text-xs">✦</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <MenuLink />
      </div>
    </div>
  );
}
