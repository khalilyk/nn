"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SectionDocument from "./SectionDocument";
import NotesEditor from "./NotesEditor";
import MenuEditor from "./MenuEditor";
import { SECTIONS } from "@/lib/content/sections";
import type { SiteContent, Notes, Menu } from "@/lib/content/types";

export default function LiveEditor({ initial, initialSection = "hero" }: { initial: SiteContent; initialSection?: keyof SiteContent }) {
  // content history (for undo / redo)
  const [history, setHistory] = useState<SiteContent[]>([initial]);
  const [hi, setHi] = useState(0);
  const content = history[hi];
  const update = (next: SiteContent) => {
    setHistory((h) => [...h.slice(0, hi + 1), next]);
    setHi((i) => i + 1);
  };
  const patch = (key: keyof SiteContent, v: SiteContent[keyof SiteContent]) => update({ ...content, [key]: v });
  const undo = () => setHi((i) => Math.max(0, i - 1));
  const redo = () => setHi((i) => Math.min(history.length - 1, i + 1));
  const canUndo = hi > 0;
  const canRedo = hi < history.length - 1;

  const [active, setActive] = useState<keyof SiteContent>(initialSection);
  const [navOpen, setNavOpen] = useState(true);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [editorW, setEditorW] = useState(520);
  const editorCol = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current || !editorCol.current) return;
      const left = editorCol.current.getBoundingClientRect().left;
      const w = Math.min(Math.max(e.clientX - left, 340), window.innerWidth - 360);
      setEditorW(w);
    };
    const up = () => { dragging.current = false; document.body.style.userSelect = ""; };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, []);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [ready, setReady] = useState(false);
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === "nn-preview-ready") setReady(true);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => {
      iframe.current?.contentWindow?.postMessage({ type: "nn-preview", content }, window.location.origin);
    }, 120);
    return () => clearTimeout(id);
  }, [content, ready]);

  const ANCHORS: Record<string, string> = {
    hero: "#top", menu: "#s02", about: "#about", projects: "#s04",
    notes: "#journal", contact: "#contact", footer: "#footer", nav: "#top",
  };
  useEffect(() => {
    if (!ready) return;
    const anchor = ANCHORS[active as string];
    if (!anchor) return;
    const id = setTimeout(() => {
      iframe.current?.contentWindow?.postMessage({ type: "nn-scroll", anchor }, window.location.origin);
    }, 200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ready]);

  const save = async () => {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
      setStatus(res.ok ? "saved" : "error");
      if (res.ok) setTimeout(() => setStatus("idle"), 2500);
    } catch { setStatus("error"); }
  };

  const activeLabel = SECTIONS.find((s) => s.key === active)?.label ?? "Section";

  const IconBtn = ({ onClick, disabled, title, children }: { onClick?: () => void; disabled?: boolean; title: string; children: React.ReactNode }) => (
    <button onClick={onClick} disabled={disabled} title={title} className="grid place-items-center w-9 h-9 rounded-full bg-white border border-black/[0.08] text-[#0A0A0A]/70 hover:bg-black/[0.04] disabled:opacity-30 transition-colors">
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#EFEFF1]" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* top bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white border-b border-black/[0.08]">
        <div className="flex items-center gap-2 min-w-0">
          <button onClick={() => setNavOpen((o) => !o)} title={navOpen ? "Hide sections" : "Show sections"} className="grid place-items-center w-9 h-9 rounded-full bg-[#F1F1F3] hover:bg-[#E6E6E9] text-[#0A0A0A]/70 transition-colors shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <Link href="/admin" className="rounded-full bg-[#F1F1F3] hover:bg-[#E6E6E9] px-3.5 py-2 text-[12px] text-[#0A0A0A]/70 transition-colors shrink-0">← Exit</Link>
          <span className="text-[13px] text-black/40 truncate">Editor <span className="text-black/25 px-1">/</span> <span className="text-[#0A0A0A] font-medium">{activeLabel}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <IconBtn onClick={undo} disabled={!canUndo} title="Undo">↺</IconBtn>
          <IconBtn onClick={redo} disabled={!canRedo} title="Redo">↻</IconBtn>
          <span className="hidden sm:block text-[12px] text-black/55 px-1">
            {status === "saving" && "Publishing…"}
            {status === "saved" && "Published ✓"}
            {status === "error" && "Save failed — DB connected?"}
          </span>
          <button onClick={save} disabled={status === "saving"} className="rounded-full bg-[#0A0A0A] text-white px-5 py-2.5 text-[12px] tracking-[0.12em] uppercase font-medium hover:opacity-80 transition-opacity disabled:opacity-50">
            Save &amp; Publish
          </button>
          <span className="grid place-items-center w-9 h-9 rounded-full bg-[#E8E8EA] text-[12px] font-bold text-[#0A0A0A]">K</span>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* section nav rail */}
        <nav className={`${navOpen ? "w-[180px]" : "w-0 px-0 border-0"} shrink-0 border-r border-black/[0.08] bg-white overflow-hidden transition-[width] duration-200 py-3`}>
          <div className="w-[180px] px-2.5 overflow-y-auto h-full">
          <p className="px-2.5 pb-2 text-[10px] tracking-[0.16em] uppercase text-black/35">Sections</p>
          {SECTIONS.map((s) => (
            <button key={s.key} onClick={() => setActive(s.key)} className={`block w-full text-left px-2.5 py-2 rounded-lg text-[13px] transition-colors ${active === s.key ? "bg-[#0A0A0A] text-white" : "text-[#0A0A0A]/70 hover:bg-black/[0.05]"}`}>
              {s.label}
            </button>
          ))}
          </div>
        </nav>

        {/* type-into document */}
        <div ref={editorCol} className="shrink-0 overflow-y-auto bg-[#EFEFF1] py-8 px-6" style={{ width: editorW }}>
          <div className="mx-auto w-full max-w-[460px] rounded-2xl bg-white shadow-sm border border-black/[0.06] px-8 py-9">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#FF2EC4] mb-2">{activeLabel}</p>
            {active === "notes" ? (
              <NotesEditor value={content.notes} onChange={(n: Notes) => patch("notes", n)} />
            ) : active === "menu" ? (
              <MenuEditor value={content.menu} onChange={(m: Menu) => patch("menu", m)} />
            ) : (
              <SectionDocument sectionKey={active} value={content[active]} onChange={(v) => patch(active, v as SiteContent[keyof SiteContent])} />
            )}
          </div>
        </div>

        {/* drag handle */}
        <div
          onPointerDown={(e) => { dragging.current = true; document.body.style.userSelect = "none"; e.preventDefault(); }}
          title="Drag to resize"
          className="group/resize relative w-1.5 shrink-0 cursor-col-resize bg-black/[0.08] hover:bg-[#0A0A0A]/30 transition-colors"
        >
          <span className="absolute inset-y-0 -left-1.5 -right-1.5" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-1 rounded-full bg-black/20 group-hover/resize:bg-white/70" />
        </div>

        {/* live preview */}
        <div className="flex-1 min-w-0 bg-[#D9DBDD] flex flex-col">
          <div className="flex items-center justify-center gap-1 py-2.5 shrink-0">
            <div className="inline-flex rounded-full bg-white shadow-sm p-0.5">
              <button onClick={() => setDevice("desktop")} title="Desktop" className={`gap-1 px-2.5 py-0.5 rounded-full text-[11px] flex items-center transition-colors ${device === "desktop" ? "bg-[#0A0A0A] text-white" : "text-black/55 hover:bg-black/[0.04]"}`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4" /></svg>
                Desktop
              </button>
              <button onClick={() => setDevice("mobile")} title="Mobile" className={`gap-1 px-2.5 py-0.5 rounded-full text-[11px] flex items-center transition-colors ${device === "mobile" ? "bg-[#0A0A0A] text-white" : "text-black/55 hover:bg-black/[0.04]"}`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M11 18h2" /></svg>
                Mobile
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0 px-4 pb-4 grid place-items-center overflow-hidden">
            <iframe ref={iframe} src="/?preview=1" className="h-full rounded-xl bg-white shadow-lg border border-black/10 transition-[width,max-width] duration-300" style={{ width: device === "mobile" ? 390 : "100%", maxWidth: "100%" }} title="Live preview" />
          </div>
        </div>
      </div>
    </div>
  );
}
