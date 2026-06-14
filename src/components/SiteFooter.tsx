"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Reveal from "./Reveal";
import RotatingWord from "./RotatingWord";
import PacMan from "./PacMan";

const LEGAL: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "Not Normal (“we”, “us”) respects your privacy. This policy explains what we collect, why, and how we look after it.",
      "What we collect. When you reach out through our contact form or by email, we collect the details you choose to share — typically your name, email, phone number and a description of your project. We don’t collect anything you don’t hand us.",
      "How we use it. We use your information solely to respond to your enquiry, scope potential work, and stay in touch about your project. We do not sell, rent or trade your data to anyone.",
      "Storage. Your details are stored securely and kept only as long as needed to serve your enquiry or meet our legal obligations.",
      "Third parties. We rely on a small number of trusted providers (for email and hosting) who process data on our behalf under their own safeguards. We never share more than necessary.",
      "Your rights. You can ask us at any time to see, correct or delete the information we hold about you — just email hello@thisisnn.com.",
      "Updates. We may revise this policy from time to time. The latest version always lives here.",
    ],
  },
  terms: {
    title: "Terms of Use",
    body: [
      "By using this website you agree to the terms below. If you don’t agree, please don’t use the site.",
      "Our content. All copy, design, imagery and brand work on this site belongs to Not Normal unless stated otherwise. You’re welcome to view and share it, but not to copy, reproduce or repurpose it without our written permission.",
      "Your enquiry. Sending an enquiry doesn’t create a contract or guarantee that we’ll take on your project. Any engagement is confirmed separately in a signed proposal or agreement.",
      "No warranty. The site is provided “as is”. While we keep it accurate and current, we make no guarantees that it’ll be error-free or always available.",
      "Liability. To the extent permitted by law, Not Normal isn’t liable for any loss arising from your use of this site or reliance on its content.",
      "External links. Where we link out to other sites, we’re not responsible for their content or practices.",
      "Governing law. These terms are governed by the laws of New South Wales, Australia.",
    ],
  },
};

export default function SiteFooter() {
  const [legal, setLegal] = useState<null | "privacy" | "terms">(null);
  const [mounted, setMounted] = useState(false);
  const doc = legal ? LEGAL[legal] : null;

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
          <h2 className="font-editorial leading-[1.2]" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)" }}>
            to be not normal<br />is to be <RotatingWord />
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="space-y-1.5 text-center">
            <a href="mailto:hello@thisisnn.com" className="block text-[11px] tracking-[0.1em] uppercase hover:opacity-60 transition-opacity">hello@thisisnn.com</a>
            <a href="tel:+61433714701" className="block text-[11px] tracking-[0.1em] hover:opacity-60 transition-opacity">+61 433 714 701</a>
            <div className="pt-4 flex items-center justify-center gap-6">
              <a href="#" className="block text-[11px] tracking-[0.1em] uppercase hover:opacity-60 transition-opacity">Instagram</a>
              <a href="#" className="block text-[11px] tracking-[0.1em] uppercase hover:opacity-60 transition-opacity">LinkedIn</a>
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
        <span>Sydney, Dubai, Beirut</span>
        <div className="flex gap-6">
          <button type="button" onClick={() => setLegal("privacy")} className="uppercase tracking-[0.2em] hover:text-[#0A0A0A] transition-colors">Privacy</button>
          <button type="button" onClick={() => setLegal("terms")} className="uppercase tracking-[0.2em] hover:text-[#0A0A0A] transition-colors">Terms</button>
        </div>
      </div>

      <div className="mt-10 mx-auto max-w-xl rounded-xl border border-[#0A0A0A]/15 px-6 py-5">
        <p className="text-center text-[9px] leading-relaxed tracking-[0.12em] uppercase text-[#0A0A0A]/40">
          We acknowledge the Gadigal, the traditional custodians of the Country on which Not Normal and its brands stands.
        </p>
      </div>

      <p className="mt-10 text-center text-[9px] tracking-[0.25em] uppercase text-[#0A0A0A]/35">
        Nobody Remembers Normal.™
      </p>

      <PacMan />

      {/* Legal modal — toggles, with inner scroll. Portaled to body so it escapes the transformed panel. */}
      {mounted && doc && createPortal(
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
          data-cursor="Close"
          onClick={() => setLegal(null)}
        >
          <div className="absolute inset-0 bg-[#0A0A0A]/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl bg-[#F3F1EC] text-[#0A0A0A] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]"
            onClick={(e) => e.stopPropagation()}
            data-cursor=""
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
                className="shrink-0 w-9 h-9 rounded-full border border-[#0A0A0A]/25 flex items-center justify-center text-sm hover:bg-[#0A0A0A] hover:text-[#F3F1EC] transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto px-7 md:px-10 py-7 md:py-8 space-y-4 text-[13px] md:text-[14px] leading-relaxed text-[#0A0A0A]/70">
              {doc.body.map((p, i) => <p key={i}>{p}</p>)}
              <p className="pt-2 text-[10px] tracking-[0.2em] uppercase text-[#0A0A0A]/40">Last updated June 2026</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </footer>
  );
}
