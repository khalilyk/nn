"use client";

import { useState } from "react";

const items = [
  { course: "Amuse Bouché", title: "Branding & Identity", body: "A brand isn't just a name or a logo — it's the foundation of everything. We craft distinct identities that connect, from mission and values to visual and verbal worlds.", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" },
  { course: "Appetizers", title: "Social & Storytelling", body: "Great hospitality brands don't just sell — they tell stories. We create content from stunning visuals to scroll-stopping social and dynamic campaigns.", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80" },
  { course: "Mains", title: "Experience & Innovation", body: "Beyond branding, we perfect the experience. From menu R&D to staff training, we shape every touchpoint of the guest journey.", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80" },
  { course: "Desserts", title: "Visual Production", body: "A brand needs to be seen, felt and experienced. We translate strategy into reality with striking design, print and digital execution.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80" },
];

export default function MenuPanels() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-2" style={{ height: "clamp(380px, 56vh, 560px)" }}>
      {items.map((it, i) => {
        const on = active === i;
        return (
          <div
            key={i}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className="relative overflow-hidden rounded-2xl cursor-pointer min-w-0 min-h-0"
            style={{
              flexGrow: on ? 3.4 : 1,
              flexBasis: 0,
              transition: "flex-grow 0.7s cubic-bezier(0.16,1,0.3,1)",
              background: "#141414",
            }}
          >
            {/* image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
              style={{ backgroundImage: `url('${it.img}')`, opacity: on ? 0.55 : 0 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

            {/* collapsed vertical label */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: on ? 0 : 1 }}
            >
              <span
                className="font-display text-[#F3F1EC]/70 tracking-wide whitespace-nowrap text-lg md:text-base"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {it.title}
              </span>
            </div>

            {/* active content */}
            <div
              className="absolute inset-0 p-7 md:p-8 flex flex-col justify-end transition-opacity duration-500"
              style={{ opacity: on ? 1 : 0 }}
            >
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#B9B5AE]/70 mb-3">{it.course}</p>
              <h3 className="font-editorial text-[#F3F1EC] leading-[1.1] mb-4" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.4rem)" }}>
                {it.title}
              </h3>
              <p className="text-[13px] text-[#B9B5AE] leading-relaxed max-w-md">{it.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
