"use client";

import { useState } from "react";
import type { Menu, Course, Swatch } from "@/lib/content/types";

const lab = "block text-[10px] tracking-[0.16em] uppercase text-black/35 mb-1.5";
const bare = "w-full bg-transparent border-0 outline-none";

/** Menu editor where each pill carries its own colour inline (palette lives with the text). */
export default function MenuEditor({ value, onChange }: { value: Menu; onChange: (v: Menu) => void }) {
  const { courses, palette } = value;
  const [editing, setEditing] = useState<number | null>(null); // global pill index whose colour popover is open

  const startIndex = (ci: number) => courses.slice(0, ci).reduce((n, c) => n + c.items.length, 0);
  const swatchFor = (gi: number): Swatch => palette[gi % palette.length] || { bg: "#EFE7D6", fg: "#0A0A0A" };

  const setCourse = (ci: number, patch: Partial<Course>) =>
    onChange({ ...value, courses: courses.map((c, i) => (i === ci ? { ...c, ...patch } : c)) });

  const setItem = (ci: number, ii: number, text: string) =>
    setCourse(ci, { items: courses[ci].items.map((it, j) => (j === ii ? text : it)) });
  const addItem = (ci: number) => setCourse(ci, { items: [...courses[ci].items, "New service"] });
  const removeItem = (ci: number, ii: number) => setCourse(ci, { items: courses[ci].items.filter((_, j) => j !== ii) });

  // editing a pill colour writes to the palette slot it cycles to
  const setColor = (gi: number, patch: Partial<Swatch>) => {
    const idx = gi % palette.length;
    onChange({ ...value, palette: palette.map((s, i) => (i === idx ? { ...s, ...patch } : s)) });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={lab}>Eyebrow</label>
        <input className={`${bare} text-[15px] text-[#0A0A0A]/85`} value={value.eyebrow} onChange={(e) => onChange({ ...value, eyebrow: e.target.value })} />
      </div>
      <div>
        <label className={lab}>Heading</label>
        <input className={`${bare} text-[22px] font-semibold leading-tight tracking-tight text-[#0A0A0A]`} value={value.heading} onChange={(e) => onChange({ ...value, heading: e.target.value })} />
      </div>

      {courses.map((c, ci) => (
        <div key={ci} className="rounded-xl border border-black/[0.07] bg-black/[0.015] p-4 space-y-3">
          <input className={`${bare} text-[10px] tracking-[0.18em] uppercase text-[#FF2EC4]`} value={c.course} onChange={(e) => setCourse(ci, { course: e.target.value })} />
          <input className={`${bare} text-[18px] font-semibold leading-tight text-[#0A0A0A]`} value={c.title} onChange={(e) => setCourse(ci, { title: e.target.value })} />
          {c.intro && c.intro[0] !== undefined && (
            <textarea className={`${bare} text-[13px] text-black/60 leading-relaxed resize-none`} style={{ fieldSizing: "content" } as React.CSSProperties} value={c.intro[0]} onChange={(e) => setCourse(ci, { intro: [e.target.value, ...(c.intro!.slice(1))] })} />
          )}

          {/* pills with inline colour */}
          <div className="flex flex-wrap gap-2 pt-1">
            {c.items.map((it, ii) => {
              const gi = startIndex(ci) + ii;
              const sw = swatchFor(gi);
              return (
                <span key={ii} className="group/pill relative inline-flex items-center rounded-md pl-2.5 pr-1 py-1.5 text-[12px] font-medium" style={{ background: sw.bg, color: sw.fg }}>
                  <input
                    value={it}
                    onChange={(e) => setItem(ci, ii, e.target.value)}
                    className="bg-transparent border-0 outline-none"
                    style={{ color: sw.fg, width: `${Math.max(4, it.length)}ch` }}
                  />
                  <button onClick={() => setEditing(editing === gi ? null : gi)} title="Colour" className="ml-1 w-4 h-4 rounded-full border border-black/20 shrink-0" style={{ background: sw.bg, boxShadow: `inset 0 0 0 2px ${sw.fg}` }} />
                  <button onClick={() => removeItem(ci, ii)} title="Remove" className="ml-0.5 opacity-0 group-hover/pill:opacity-100 text-current/70 hover:text-[#c0392b] text-xs px-1">✕</button>

                  {editing === gi && (
                    <span className="absolute top-full left-0 mt-1.5 z-10 flex items-center gap-3 rounded-lg bg-white shadow-lg border border-black/10 px-3 py-2">
                      <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-black/45">Bg<input type="color" value={sw.bg} onChange={(e) => setColor(gi, { bg: e.target.value })} className="w-6 h-6 rounded border border-black/15 p-0.5 cursor-pointer" /></label>
                      <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-black/45">Text<input type="color" value={sw.fg} onChange={(e) => setColor(gi, { fg: e.target.value })} className="w-6 h-6 rounded border border-black/15 p-0.5 cursor-pointer" /></label>
                      <button onClick={() => setEditing(null)} className="text-black/40 hover:text-black text-sm">✕</button>
                    </span>
                  )}
                </span>
              );
            })}
            <button onClick={() => addItem(ci)} className="rounded-md border border-dashed border-black/20 px-3 py-1.5 text-[12px] text-black/50 hover:bg-black/[0.03]">+ Service</button>
          </div>
        </div>
      ))}
      <p className="text-[11px] text-black/40 leading-relaxed">Tip: pill colours cycle through a shared palette, so editing one colour also updates pills that reuse it.</p>
    </div>
  );
}
