"use client";

import { useEffect, useRef, useState } from "react";

/* Endless self-talking agent log about hospitality / marketing / branding */
const openers = [
  "scanning hospitality signals",
  "fetching latest industry trends",
  "analysing guest sentiment",
  "monitoring social conversations",
  "indexing menu-engineering data",
  "crawling design & culture feeds",
  "benchmarking brand recall",
  "listening to the floor",
];

const findings = [
  "experiential dining up 34% YoY across premium venues",
  "guests recall feeling 6.2× more than food itself",
  "venues with a point of view see 2.1× repeat visits",
  "short-form video drives 71% of new-guest discovery",
  "loyalty that feels like belonging outperforms points 3:1",
  "the menu is the most-read marketing doc a venue owns",
  "staff storytelling lifts average spend by 18%",
  "consistency across touchpoints raises trust by 40%",
  "scarcity + ritual beats discount-led promotion",
  "first impression forms before the guest says hello",
];

const recs = [
  "turn the menu into a narrative, not a list",
  "design the goodbye as carefully as the welcome",
  "give the brand a worldview, then defend it",
  "build rituals worth photographing",
  "train the team to be the brand, not wear it",
  "stop chasing followers — engineer memory",
  "make every touchpoint feel considered",
  "trade safe for specific; specific is brave",
];

const topics = ["BRANDING", "MARKETING", "GUEST XP", "CULTURE", "STRATEGY", "LOYALTY"];

function rand<T>(arr: T[], seed: number) {
  return arr[seed % arr.length];
}

type Line = { kind: "cmd" | "fetch" | "insight" | "rec" | "blank"; text: string };

function buildLine(i: number): Line {
  const m = i % 5;
  if (m === 0) return { kind: "cmd", text: `nn@studio:~$ ${rand(openers, i * 7)} —— [${rand(topics, i * 3)}]` };
  if (m === 1) return { kind: "fetch", text: `↳ querying sources ........ ok (${120 + ((i * 37) % 800)}ms)` };
  if (m === 2) return { kind: "insight", text: `◆ insight: ${rand(findings, i * 11)}` };
  if (m === 3) return { kind: "rec", text: `➜ recommend: ${rand(recs, i * 13)}` };
  return { kind: "blank", text: "" };
}

const colour: Record<Line["kind"], string> = {
  cmd: "#E8E2C0",
  fetch: "#6B7A8F",
  insight: "#9FE6B0",
  rec: "#E6C84A",
  blank: "#000",
};

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const counter = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headlines = useRef<string[]>([]);
  const hIdx = useRef(0);

  // Best-effort: pull genuine latest hospitality / marketing headlines (silent fallback)
  useEffect(() => {
    const feeds = [
      "https://www.hospitalitynet.org/rss/4.rss",
      "https://www.thedrum.com/rss.xml",
    ];
    feeds.forEach((feed) => {
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}&count=8`)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          const items: string[] = (d?.items || [])
            .map((it: { title?: string }) => (it.title || "").trim())
            .filter(Boolean);
          if (items.length) headlines.current.push(...items);
        })
        .catch(() => {});
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    let charTimer: ReturnType<typeof setTimeout>;
    let lineTimer: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (cancelled) return;
      let line = buildLine(counter.current);
      // Every 5th insight slot, surface a real headline if we have one
      if (line.kind === "insight" && headlines.current.length) {
        const h = headlines.current[hIdx.current % headlines.current.length];
        hIdx.current += 1;
        line = { kind: "insight", text: `◆ latest: ${h}` };
      }
      counter.current += 1;

      if (line.kind === "blank") {
        setLines((prev) => [...prev.slice(-13), line]);
        lineTimer = setTimeout(typeNext, 350);
        return;
      }

      let pos = 0;
      const step = () => {
        if (cancelled) return;
        pos += 1;
        setTyping(line.text.slice(0, pos));
        if (pos < line.text.length) {
          charTimer = setTimeout(step, 14 + Math.random() * 22);
        } else {
          setLines((prev) => [...prev.slice(-13), line]);
          setTyping("");
          lineTimer = setTimeout(typeNext, 550 + Math.random() * 500);
        }
      };
      step();
    };

    typeNext();
    return () => {
      cancelled = true;
      clearTimeout(charTimer);
      clearTimeout(lineTimer);
    };
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, typing]);

  const typingKind = buildLine(counter.current % 5 === 0 ? counter.current : counter.current).kind;

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl" style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8" style={{ background: "#111" }}>
        <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
        <span className="ml-3 text-[10px] tracking-[0.2em] uppercase text-white/30 font-mono">
          not-normal — intelligence.sh
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="px-5 py-5 font-mono text-[12px] md:text-[13px] leading-relaxed overflow-hidden"
        style={{ height: "clamp(280px, 42vh, 420px)" }}
      >
        {lines.map((l, i) => (
          <div key={i} style={{ color: colour[l.kind], minHeight: "1.4em", whiteSpace: "pre-wrap" }}>
            {l.text}
          </div>
        ))}
        {typing && (
          <div style={{ color: colour[typingKind], whiteSpace: "pre-wrap" }}>
            {typing}
            <span className="inline-block w-2 h-[1em] ml-0.5 align-middle animate-pulse" style={{ background: "#9FE6B0" }} />
          </div>
        )}
      </div>
    </div>
  );
}
