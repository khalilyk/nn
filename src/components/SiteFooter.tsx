"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import RotatingWord from "./RotatingWord";
import PacMan from "./PacMan";
import type { Footer } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

export default function SiteFooter({ footer = DEFAULT_CONTENT.footer }: { footer?: Footer }) {
  const [legal, setLegal] = useState<null | "privacy" | "terms">(null);
  const [mounted, setMounted] = useState(false);
  const doc = legal ? footer.legal[legal] : null;

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLegal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <footer id="footer" className="bg-[#F3F1EC] text-[#0A0A0A] px-8 md:px-16 pt-24 pb-10 md:pb-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-20 text-center md:text-left">
        <Reveal>
          <h2 className="font-editorial leading-[1.2] flex flex-col justify-center" style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", minHeight: "3.6em" }}>
            <span>to be not normal</span>
            <span>is to be <RotatingWord /></span>
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="space-y-1.5 text-center">
            <a href={`mailto:${footer.email}`} className="block text-[11px] tracking-[0.1em] uppercase hover:opacity-60 transition-opacity">{footer.email}</a>
            <a href={`tel:${footer.phone.replace(/[^+\d]/g, "")}`} className="block text-[11px] tracking-[0.1em] hover:opacity-60 transition-opacity">{footer.phone}</a>
            <div className="pt-4 flex items-center justify-center gap-6">
              {footer.socials.map((s) => {
                const ext = /^https?:\/\//.test(s.href);
                return (
                  <a key={s.label} href={s.href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="block text-[11px] tracking-[0.1em] uppercase hover:opacity-60 transition-opacity">{s.label}</a>
                );
              })}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/notnormal-nn-white.png" alt="Not Normal" className="mx-auto" style={{ width: "clamp(96px, 12vw, 150px)", filter: "brightness(0)" }} />
        </Reveal>
      </div>

      <div className="border-t border-[#0A0A0A]/15 pt-6 flex flex-col md:flex-row items-center md:justify-between gap-4 text-[9px] tracking-[0.2em] uppercase text-[#0A0A0A]/50">
        <span>© {new Date().getFullYear()} Not Normal</span>
        <span>{footer.locations}</span>
        <div className="flex gap-6">
          <button type="button" onClick={() => setLegal("privacy")} className="uppercase tracking-[0.2em] hover:text-[#0A0A0A] transition-colors">Privacy</button>
          <button type="button" onClick={() => setLegal("terms")} className="uppercase tracking-[0.2em] hover:text-[#0A0A0A] transition-colors">Terms</button>
        </div>
      </div>

      <div className="mt-10 mx-auto max-w-xl rounded-xl border border-[#0A0A0A]/15 px-6 py-5">
        <p className="text-center text-[9px] leading-relaxed tracking-[0.12em] uppercase text-[#0A0A0A]/40">
          {footer.landAck}
        </p>
      </div>

      <p className="mt-10 text-center text-[9px] tracking-[0.25em] uppercase text-[#0A0A0A]/35">
        {footer.trademark}
      </p>

      <PacMan />

      {/* Legal modal - toggles, with inner scroll. Portaled to body so it escapes the transformed panel. */}
      {mounted && createPortal(
        <AnimatePresence>
        {doc && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
          data-cursor="Close"
          onClick={() => setLegal(null)}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-[#0A0A0A]/60 backdrop-blur-sm" />
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl bg-[#F3F1EC] text-[#0A0A0A] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]"
            onClick={(e) => e.stopPropagation()}
            data-cursor=""
            initial={{ opacity: 0, y: 16, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.985 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between gap-6 px-7 md:px-10 pt-8 md:pt-10 pb-5 border-b border-[#0A0A0A]/10">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/45 mb-3">Not Normal</p>
                <h3 className="font-editorial leading-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>{doc.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setLegal(null)}
                aria-label="Close"
                data-cursor="Close"
                className="shrink-0 w-9 h-9 rounded-full border border-[#0A0A0A]/25 flex items-center justify-center text-sm hover:bg-[#0A0A0A] hover:text-[#F3F1EC] transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto px-7 md:px-10 py-7 md:py-8 space-y-4 text-[13px] md:text-[14px] leading-relaxed text-[#0A0A0A]/70">
              {doc.body.map((p, i) => <p key={i}>{p}</p>)}
              <p className="pt-2 text-[10px] tracking-[0.2em] uppercase text-[#0A0A0A]/40">Last updated June 2026</p>
            </div>
          </motion.div>
        </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </footer>
  );
}
