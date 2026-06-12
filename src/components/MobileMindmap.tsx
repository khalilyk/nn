"use client";

import { useState } from "react";
import { BRANCHES } from "./ServiceMindmap";

/* Touch-friendly version of the mindmap: tap a branch to reveal its sub-services. */
export default function MobileMindmap() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2.5">
      {BRANCHES.map((b, i) => {
        const isOpen = open === i;
        return (
          <div
            key={b.label}
            className={`rounded-3xl border transition-colors duration-300 ${isOpen ? "border-[#0A0A0A] bg-[#0A0A0A] text-[#F3F1EC]" : "border-[#0A0A0A]/20 bg-[#F3F1EC] text-[#0A0A0A]"}`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-sans tracking-[0.02em] leading-none" style={{ fontSize: "clamp(0.95rem, 4.2vw, 1.15rem)" }}>{b.label}</span>
              <span
                className="shrink-0 text-xl leading-none transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <div className="flex flex-wrap gap-2 px-5 pb-5 pt-0.5">
                  {b.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full border border-[#F3F1EC]/30 px-3.5 py-1.5 text-[12px] tracking-[0.03em]"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
