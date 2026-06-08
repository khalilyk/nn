"use client";

import Reveal from "./Reveal";
import RotatingWord from "./RotatingWord";
import PacMan from "./PacMan";

export default function SiteFooter() {
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
          <a href="#" className="hover:text-[#0A0A0A] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#0A0A0A] transition-colors">Terms</a>
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
    </footer>
  );
}
