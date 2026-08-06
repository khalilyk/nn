"use client";

import { useEffect, useRef, useState } from "react";
import type { Menu } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

/**
 * The Menu as a split-screen "festival" layout (inspired by One Minimal
 * Festival), scrolling vertically: a sticky orange left panel showcases the
 * active service (image + caption + category rail); the right column scrolls
 * through the services, and whichever is centred becomes active.
 */
export default function MenuFestival({ menu = DEFAULT_CONTENT.menu }: { menu?: Menu }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const imgs = menu.gallery ?? [];

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const cur = menu.courses[active] ?? menu.courses[0];
  const short = (t: string) => t.split(/[ &]/)[0];

  return (
    <div className="grid md:grid-cols-2 bg-white">
      {/* ── LEFT · sticky colour panel ── */}
      <div className="relative md:sticky md:top-0 md:h-screen bg-[#FF5C1A] text-[#0A0A0A] overflow-hidden flex flex-col justify-between p-8 md:p-12">
        <div className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-bold">
          <span aria-hidden>✦</span> {menu.eyebrow}
        </div>

        {/* active image + caption */}
        <div className="flex flex-col items-center text-center py-8">
          <div className="relative w-[min(74%,360px)] aspect-square overflow-hidden bg-black/10">
            {imgs.map((src, i) => (
              <div
                key={src + i}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                style={{ backgroundImage: `url('${src}')`, opacity: i === active % Math.max(imgs.length, 1) ? 1 : 0 }}
              />
            ))}
          </div>
          <p className="mt-6 text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/70">{cur.course}</p>
          <p className="mt-1.5 font-sans font-bold uppercase tracking-tight text-[15px]">{cur.title}</p>
        </div>

        {/* bottom rail: locations + vertical categories */}
        <div className="flex items-end justify-between">
          <span className="text-[10px] tracking-[0.22em] uppercase font-bold" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            Sydney — Dubai — Beirut
          </span>
          <div className="flex gap-4">
            {menu.courses.map((c, i) => (
              <button
                key={c.title}
                onClick={() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                className={`text-[11px] tracking-[0.18em] uppercase font-bold transition-opacity ${i === active ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
                style={{ writingMode: "vertical-rl" }}
              >
                {short(c.title)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT · scrolling services ── */}
      <div className="bg-white text-[#0A0A0A]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#0A0A0A]/10 bg-white/90 backdrop-blur px-8 md:px-12 py-6">
          <p className="text-[12px] md:text-[13px] text-[#0A0A0A]/50">Choose a service →</p>
          <a href="/contact#contact-form" className="text-[12px] md:text-[13px] font-bold text-[#FF5C1A] border-b border-[#FF5C1A] pb-0.5 hover:opacity-70 transition-opacity">Let&apos;s talk!</a>
        </div>

        {menu.courses.map((c, i) => (
          <section
            key={c.title}
            data-i={i}
            ref={(el) => { refs.current[i] = el; }}
            className="flex min-h-[82vh] flex-col justify-center border-b border-[#0A0A0A]/10 px-8 md:px-12 py-16"
          >
            <p className="mb-4 text-[10px] tracking-[0.25em] uppercase text-[#0A0A0A]/40">
              {String(i + 1).padStart(2, "0")} — {c.course}
            </p>
            <h3
              className={`font-sans font-bold leading-[0.95] tracking-tight transition-colors duration-500 ${i === active ? "text-[#0A0A0A]" : "text-[#0A0A0A]/25"}`}
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
            >
              {c.title}
            </h3>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-[13px] leading-relaxed text-[#0A0A0A]/60 max-w-lg">
              {c.items.map((it) => (
                <li key={it} className="border-b border-[#0A0A0A]/8 py-1.5">{it}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
