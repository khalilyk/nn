"use client";

import { useState } from "react";

const files = [
  { name: "nn-logo-black.svg", type: "SVG", size: "12 KB", cat: "Logos", date: "1 Jun 2025" },
  { name: "nn-logo-green.svg", type: "SVG", size: "12 KB", cat: "Logos", date: "1 Jun 2025" },
  { name: "3fils-hero.jpg", type: "Image", size: "2.4 MB", cat: "Projects", date: "28 May 2025" },
  { name: "revolver-brandbook.pdf", type: "PDF", size: "18 MB", cat: "Documents", date: "20 May 2025" },
  { name: "nn-proposal-template.pdf", type: "PDF", size: "4.2 MB", cat: "Templates", date: "15 May 2025" },
  { name: "maison-dali-gallery-01.jpg", type: "Image", size: "3.1 MB", cat: "Projects", date: "10 May 2025" },
  { name: "nn-brand-guidelines.pdf", type: "PDF", size: "22 MB", cat: "Documents", date: "1 Apr 2025" },
  { name: "piehaus-launch-reel.mp4", type: "Video", size: "145 MB", cat: "Projects", date: "15 Mar 2025" },
];

const typeColors: Record<string, string> = {
  SVG: "#D4FF38",
  Image: "#60a5fa",
  PDF: "#f59e0b",
  Video: "#c084fc",
  Document: "#4ade80",
};

const cats = ["All", "Logos", "Projects", "Documents", "Templates", "Brand Assets"];

export default function Media() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? files : files.filter((f) => f.cat === cat);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-white/80 mb-1">MEDIA LIBRARY</h1>
          <p className="text-[10px] tracking-widest uppercase text-white/25">{files.length} files</p>
        </div>
        <button className="text-[9px] tracking-widest uppercase border border-[#D4FF38] text-[#D4FF38] px-5 py-2.5 hover:bg-[#D4FF38] hover:text-[#080808] transition-colors">
          + Upload Files
        </button>
      </div>

      <div className="flex gap-3 flex-wrap">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`text-[9px] tracking-widest uppercase px-3 py-1.5 border transition-colors ${
              cat === c ? "border-[#D4FF38] text-[#D4FF38]" : "border-white/10 text-white/30 hover:text-white/60"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Upload zone */}
      <div className="border-2 border-dashed border-white/10 rounded p-8 text-center hover:border-[#D4FF38]/30 transition-colors cursor-pointer">
        <p className="text-[10px] tracking-widest uppercase text-white/20">Drop files here or click to upload</p>
        <p className="text-[9px] text-white/15 mt-2">Images, PDFs, Videos, SVGs supported</p>
      </div>

      <div className="bg-[#141414] border border-white/5 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Name", "Type", "Size", "Category", "Uploaded", ""].map((h) => (
                <th key={h} className="text-left text-[9px] tracking-widest uppercase text-white/25 px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.name} className="border-b border-white/5 last:border-0 hover:bg-white/2 group transition-colors">
                <td className="px-5 py-4 text-sm text-white/60">{f.name}</td>
                <td className="px-5 py-4">
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: typeColors[f.type] }}>{f.type}</span>
                </td>
                <td className="px-5 py-4 text-xs text-white/30">{f.size}</td>
                <td className="px-5 py-4 text-xs text-white/30">{f.cat}</td>
                <td className="px-5 py-4 text-xs text-white/30">{f.date}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[9px] tracking-widest uppercase text-white/30 hover:text-[#D4FF38]">View</button>
                    <button className="text-[9px] tracking-widest uppercase text-white/30 hover:text-white/60">↓</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
