"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";
import { track } from "@/lib/track";

export default function FeaturedCarousel({ projects = DEFAULT_CONTENT.projects }: { projects?: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [gi, setGi] = useState(0);
  const [mounted, setMounted] = useState(false);
  const STEP = 4;
  const [visible, setVisible] = useState(STEP);

  useEffect(() => setMounted(true), []);
  useEffect(() => { setGi(0); }, [open]);

  // drag/swipe on the gallery
  const galStart = useRef<number | null>(null);
  const galLen = useRef(1);
  const onGalDown = (e: React.PointerEvent) => { galStart.current = e.clientX; };
  const onGalUp = (e: React.PointerEvent) => {
    if (galStart.current === null) return;
    const dx = e.clientX - galStart.current;
    galStart.current = null;
    const len = Math.max(1, galLen.current);
    if (dx < -45) setGi((g) => (g + 1) % len);
    else if (dx > 45) setGi((g) => (g - 1 + len) % len);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const doc = open !== null ? projects[open] : null;

  return (
    <div className="w-full select-none text-[#F3F1EC]">
      {/* all projects, stacked down the page */}
      <div className="flex flex-col gap-20 md:gap-28">
        {projects.slice(0, visible).map((pr, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={pr.name} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-stretch">
              {/* image + overlaid name */}
              <div
                onClick={() => { setOpen(i); track("project_open", pr.name); }}
                data-cursor="Open"
                className={`md:col-span-7 relative aspect-[16/10] md:aspect-auto md:min-h-[480px] w-full overflow-hidden bg-[#0A0A0A] cursor-pointer group border border-white/80 ${flip ? "md:order-2" : ""}`}
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" style={{ backgroundImage: `url('${pr.images?.[0] ?? pr.img}')` }} />
                <h3
                  className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 text-white font-sans font-bold tracking-tight leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3.6rem)" }}
                >
                  {pr.name}
                </h3>
              </div>

              {/* caption */}
              <div className={`md:col-span-5 flex flex-col justify-center px-2 md:px-12 ${flip ? "md:order-1" : ""}`}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3F1EC]/45 mb-4">
                  {String(i + 1).padStart(2, "0")} · {pr.cat} · {pr.city} · {pr.year}
                </p>
                <p className="font-sans leading-snug" style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)" }}>
                  {pr.name}<br />
                  <span className="text-[#F3F1EC]/60">{pr.sub}</span>
                </p>
                <button
                  onClick={() => { setOpen(i); track("project_open", pr.name); }}
                  data-cursor="Open"
                  className="mt-6 self-start inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase border-b border-[#F3F1EC] pb-1 hover:opacity-60 transition-opacity"
                >
                  View Project <span>→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {visible < projects.length && (
        <div className="mt-16 md:mt-20 flex justify-center">
          <button
            onClick={() => setVisible((v) => Math.min(v + STEP, projects.length))}
            data-cursor="More"
            className="group inline-flex items-center gap-4 rounded-full border border-[#F3F1EC]/30 px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-[#F3F1EC] hover:text-[#0A0A0A] transition-colors"
          >
            Load more <span aria-hidden>→</span>
          </button>
        </div>
      )}

      {/* project popup - portaled to body to escape the transformed panel */}
      {mounted && createPortal(
        <AnimatePresence>
        {doc && (
        <motion.div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8" data-cursor="Close" onClick={() => setOpen(null)}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <div className="absolute inset-0 bg-[#0A0A0A]/70 backdrop-blur-sm" />
          <motion.div
            className="relative w-full max-w-4xl max-h-[88vh] flex flex-col md:grid md:grid-cols-2 overflow-y-auto md:overflow-hidden overscroll-contain rounded-3xl bg-[#F3F1EC] text-[#0A0A0A] shadow-[0_50px_140px_-40px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
            data-cursor-color="#0A0A0A"
            initial={{ opacity: 0, y: 16, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.985 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* image carousel */}
            {(() => {
              const gallery = (doc.images && doc.images.length ? doc.images : [doc.img]).filter(Boolean);
              galLen.current = gallery.length;
              const body = [
                doc.desc,
                `Working across ${doc.city}, we shaped every touchpoint, identity, environment and content, into one coherent story that feels unmistakably ${doc.name}.`,
                `The result: a ${doc.cat.toLowerCase()}-led brand that earns attention, drives footfall and keeps people coming back. Not normal, by design.`,
              ];
              return (
                <>
                  <div className="relative shrink-0 aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden bg-[#0A0A0A] cursor-grab active:cursor-grabbing" data-cursor="grab" onPointerDown={onGalDown} onPointerUp={onGalUp} style={{ touchAction: "pan-y" }}>
                    {gallery.map((src, i) => (
                      <div
                        key={src + i}
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                        style={{ backgroundImage: `url('${src}')`, opacity: i === gi ? 1 : 0 }}
                      />
                    ))}
                    <button onClick={() => setGi((g) => (g - 1 + gallery.length) % gallery.length)} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-white/40 bg-[#0A0A0A]/30 backdrop-blur-sm flex items-center justify-center text-sm text-white hover:bg-white hover:text-[#0A0A0A] transition-colors">←</button>
                    <button onClick={() => setGi((g) => (g + 1) % gallery.length)} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-white/40 bg-[#0A0A0A]/30 backdrop-blur-sm flex items-center justify-center text-sm text-white hover:bg-white hover:text-[#0A0A0A] transition-colors">→</button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                      {gallery.map((_, i) => (
                        <button key={i} onClick={() => setGi(i)} aria-label={`Image ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === gi ? "w-5 bg-white" : "w-1.5 bg-white/50"}`} />
                      ))}
                    </div>
                  </div>
                  {/* details */}
                  <div className="flex flex-col p-7 md:p-10 md:overflow-y-auto md:max-h-[88vh]">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-4">{doc.cat} · {doc.city} · {doc.year}</p>
                    <h3 className="font-sans font-bold tracking-tight leading-none mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{doc.name}</h3>
                    <p className="font-editorial italic text-[#0A0A0A]/60 mb-6" style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)" }}>{doc.sub}</p>
                    <div className="space-y-4 text-[14px] leading-relaxed text-[#0A0A0A]/70">
                      {body.map((para, i) => <p key={i}>{para}</p>)}
                    </div>
                  </div>
                </>
              );
            })()}
            {/* close */}
            <button
              onClick={() => setOpen(null)}
              aria-label="Close"
              data-cursor="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-[#0A0A0A]/30 bg-[#F3F1EC]/70 backdrop-blur-sm flex items-center justify-center text-sm hover:bg-[#0A0A0A] hover:text-[#F3F1EC] transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
