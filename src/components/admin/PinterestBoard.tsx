"use client";

import { useEffect } from "react";

/* Embeds a Pinterest board using Pinterest's official pinit.js widget.
   The script scans for [data-pin-do] anchors and replaces them with the
   live board grid. We call PinUtils.build() after mount so it works inside
   the client-rendered admin (the script's auto-build only runs once on load). */
declare global {
  interface Window {
    PinUtils?: { build: () => void };
  }
}

export default function PinterestBoard({
  href,
  width = 345,
  scaleWidth = 80,
  scaleHeight = 360,
}: {
  href: string;
  width?: number;
  scaleWidth?: number;
  scaleHeight?: number;
}) {
  useEffect(() => {
    const build = () => window.PinUtils?.build?.();
    if (window.PinUtils) { build(); return; }
    const existing = document.getElementById("pinit-js") as HTMLScriptElement | null;
    if (existing) { existing.addEventListener("load", build); return () => existing.removeEventListener("load", build); }
    const s = document.createElement("script");
    s.id = "pinit-js";
    s.src = "https://assets.pinterest.com/js/pinit.js";
    s.async = true;
    s.defer = true;
    s.onload = build;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="rounded-3xl bg-white shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[13px] font-semibold text-[#0A0A0A]">Pinterest · Moodboard</h2>
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-[12px] text-black/45 hover:text-black transition-colors">Open board ↗</a>
      </div>
      <div className="overflow-x-auto">
        {/* pinit.js replaces this anchor with the board grid */}
        <a
          data-pin-do="embedBoard"
          data-pin-board-width={width}
          data-pin-scale-width={scaleWidth}
          data-pin-scale-height={scaleHeight}
          href={href}
        >
          {/* fallback shown if the board is private or the widget can't load */}
          <span className="text-[12px] text-black/40">Loading board… if nothing appears, the board may be private — open it directly above.</span>
        </a>
      </div>
    </div>
  );
}
