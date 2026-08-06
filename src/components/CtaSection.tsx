"use client";

import { useState } from "react";

/**
 * Full-bleed "talk to us" call-to-action, shown above the footer on every page
 * except the homepage. Dark ground, oversized display headline with a lavender
 * final line, and a pill that copies the studio email to the clipboard.
 */
export default function CtaSection({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // clipboard unavailable (insecure context / denied) — fall back to a mailto
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-[#F3F1EC] px-8 md:px-16 py-20 md:py-32">
      <div className="max-w-6xl">
        <h2 className="font-display uppercase leading-[0.92] tracking-tight" style={{ fontSize: "clamp(2.8rem, 10vw, 8.5rem)" }}>
          <span className="block">Your idea</span>
          <span className="block">Deserves better.</span>
          <span className="flex flex-wrap items-center gap-x-8 gap-y-6">
            <span className="text-[#C9C6F5]">Talk to us!</span>
            <button
              type="button"
              onClick={copy}
              aria-label={`Copy email address ${email}`}
              className="normal-case tracking-normal font-sans rounded-full bg-[#C9C6F5] text-[#0A0A0A] px-9 py-6 md:px-11 md:py-8 text-sm md:text-base leading-tight text-center transition-[transform,background-color] duration-300 hover:bg-[#d7d4fa] hover:-translate-y-0.5"
            >
              {copied ? (
                <>Copied!</>
              ) : (
                <>
                  Click to copy
                  <br />
                  email address
                </>
              )}
            </button>
          </span>
        </h2>

        {/* underline beneath the headline */}
        <div className="mt-8 md:mt-10 h-px w-full max-w-[38rem] bg-[#F3F1EC]/70" />
      </div>
    </section>
  );
}
