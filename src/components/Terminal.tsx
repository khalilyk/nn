"use client";

import { useEffect, useRef, useState } from "react";

/* ───────────────── NORM — Not Normal Intelligence ─────────────────
   An interactive concierge. Stays asleep until the user says hi and
   introduces themselves, then chats about marketing, hospitality,
   food & social media across Australia and the Middle East. */

type Msg = { who: "norm" | "you" | "sys"; text: string };

const pick = (arr: string[], seed: number) => arr[seed % arr.length];

/* ── Topic responses ── */
function route(input: string, name: string, seed: number, headlines: string[]): string {
  const t = input.toLowerCase();
  const you = name ? name : "friend";

  if (/\b(bye|goodbye|cheers|thanks|thank you|ciao)\b/.test(t))
    return pick([
      `Anytime, ${you}. Go make something worth remembering.`,
      `Pleasure, ${you}. Nobody remembers normal — so don't be.`,
    ], seed);

  if (/\b(help|topics?|what can you|options|menu)\b/.test(t))
    return "I think in five lanes: marketing, hospitality, food, social media — across Australia and the Middle East. Ask me anything, or say 'latest' for fresh headlines.";

  if (/\b(latest|news|trend|trending|headline)\b/.test(t)) {
    if (headlines.length) return `Hot off the wire: "${pick(headlines, seed)}"`;
    return "Wire's quiet right now — but the signal is constant: experiences beat advertising. Build a room people can't stop describing.";
  }

  if (/\b(social|instagram|tiktok|reel|reels|content|post|posting)\b/.test(t))
    return pick([
      `Stop posting food, ${you} — post a world. The venues winning on socials in Sydney and Dubai sell a feeling people want to be seen inside.`,
      "Short-form drives ~71% of new-guest discovery. One ownable ritual filmed well beats fifty plated close-ups.",
      "Algorithm tip: consistency of point-of-view > frequency. Pick a worldview and repeat it until people can finish your sentence.",
    ], seed);

  if (/\b(market|marketing|advertis|campaign|promo|ads?)\b/.test(t))
    return pick([
      "Attention is the only currency; memory is the product. Spend on moments guests retell, not on discounts that erode the brand.",
      `${you}, the best marketing in hospitality never looks like marketing. It looks like a place worth talking about.`,
      "Skip 'more reach'. Engineer recall. A specific brand to 10,000 people beats a safe one to a million.",
    ], seed);

  if (/\b(hospitalit|guest|service|experience|loyalty|repeat)\b/.test(t))
    return pick([
      "Hospitality starts before hello — the DM, the confirmation, the door. By the time they sit, you've already won or lost.",
      "Loyalty that feels like belonging outperforms points 3:1. Design the goodbye as carefully as the welcome.",
      `Guests recall how you made them feel ~6× more than what they ate, ${you}. Engineer the peak and the ending.`,
    ], seed);

  if (/\b(food|menu|dish|chef|cuisine|plate|drink|cocktail|wine)\b/.test(t))
    return pick([
      "Your menu is the most-read marketing document you own. Make it read like a story, not a spreadsheet.",
      "Signature beats broad. One dish people travel for is worth more than forty they forget.",
      `Trends to watch, ${you}: hyper-regional sourcing, theatrical service, and lower-ABV cocktails that still feel like an occasion.`,
    ], seed);

  if (/\b(australia|sydney|melbourne|aussie|oz|surry|bondi)\b/.test(t))
    return pick([
      "Australia rewards understatement done immaculately — Sydney diners smell try-hard instantly. Earn the cool, never claim it.",
      "AU market: cafe culture set the global bar. The edge now is narrative — why you exist, not just how good the coffee is.",
    ], seed);

  if (/\b(dubai|abu dhabi|middle east|uae|beirut|saudi|riyadh|qatar|doha|gcc)\b/.test(t))
    return pick([
      "The Middle East rewards spectacle with substance. Dubai guests have seen everything — surprise them with meaning, not just marble.",
      "ME market: F&B is fiercely competitive and design-led. Concept clarity and a defensible point of view win the long game.",
    ], seed);

  if (/\b(brand|branding|logo|identity|name|naming)\b/.test(t))
    return pick([
      "A logo is 1% of a brand; the other 99% is 10,000 consistent experiences. Build the system, then defend it.",
      `${you}, give the brand a worldview and a backbone. Specific is brave — and brave is memorable.`,
    ], seed);

  if (/\b(who are you|what are you|your name|norm)\b/.test(t))
    return "I'm NORM — Not Normal's in-house intelligence. I obsess over hospitality brands across Australia and the Middle East so you don't have to.";

  // default — steer back, stay in character
  return pick([
    `Tell me more, ${you} — are we talking marketing, social, food, or a specific market like Sydney or Dubai?`,
    "I can riff on that through a hospitality lens. Want the marketing angle, the guest-experience angle, or the social one?",
    "Interesting. Frame it for me as a venue problem and I'll get sharp.",
  ], seed);
}

const colour: Record<Msg["who"], string> = {
  norm: "#9FE6B0",
  you: "#E8E2C0",
  sys: "#6B7A8F",
};

export default function Terminal() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { who: "sys", text: "NORM is asleep. Say hi and introduce yourself to wake it. (e.g. \"hi, I'm Sam\")" },
  ]);
  const [phase, setPhase] = useState<"asleep" | "awaitingName" | "chatting">("asleep");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const [typingLine, setTypingLine] = useState("");
  const seed = useRef(0);
  const headlines = useRef<string[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // best-effort live headlines
  useEffect(() => {
    ["https://www.hospitalitynet.org/rss/4.rss", "https://www.thedrum.com/rss.xml"].forEach((feed) => {
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}&count=8`)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          const items: string[] = (d?.items || []).map((it: { title?: string }) => (it.title || "").trim()).filter(Boolean);
          if (items.length) headlines.current.push(...items);
        })
        .catch(() => {});
    });
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typingLine, thinking]);

  const extractName = (raw: string): string => {
    const m = raw.match(/(?:i'?m|my name is|this is|name'?s|it'?s)\s+([a-z]+)/i);
    if (m) return m[1][0].toUpperCase() + m[1].slice(1).toLowerCase();
    return "";
  };

  const isGreeting = (raw: string) => /\b(hi|hey|hello|yo|hiya|g'?day|sup|howdy|salaam|salam|marhaba|ahlan)\b/i.test(raw);

  // Stream NORM's reply char-by-char
  const sayNorm = (text: string) => {
    setThinking(true);
    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      setThinking(false);
      let i = 0;
      const step = () => {
        i += 1;
        setTypingLine(text.slice(0, i));
        if (i < text.length) {
          setTimeout(step, 12 + Math.random() * 18);
        } else {
          setMsgs((m) => [...m, { who: "norm", text }]);
          setTypingLine("");
        }
      };
      step();
    }, delay);
  };

  const submit = () => {
    const raw = value.trim();
    if (!raw || thinking || typingLine) return;
    setValue("");
    setMsgs((m) => [...m, { who: "you", text: raw }]);
    seed.current += 1;
    const s = seed.current;

    if (phase === "asleep") {
      if (isGreeting(raw)) {
        const n = extractName(raw);
        if (n) {
          setName(n);
          setPhase("chatting");
          sayNorm(`Well, hello ${n}. NORM here — Not Normal's intelligence. I live for hospitality, marketing, food and social across Australia and the Middle East. What's on your mind?`);
        } else {
          setPhase("awaitingName");
          sayNorm("Ah, a voice. I'm NORM. And you are…?");
        }
      } else {
        setMsgs((m) => [...m, { who: "sys", text: "…NORM is still asleep. Say hi to begin." }]);
      }
      return;
    }

    if (phase === "awaitingName") {
      const n = extractName(raw) || raw.split(/\s+/)[0].replace(/[^a-zA-Z]/g, "");
      const clean = n ? n[0].toUpperCase() + n.slice(1).toLowerCase() : "friend";
      setName(clean);
      setPhase("chatting");
      sayNorm(`Good to meet you, ${clean}. Ask me anything about marketing, hospitality, food or social — Sydney to Dubai. Or say 'topics'.`);
      return;
    }

    sayNorm(route(raw, name, s, headlines.current));
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl" style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8" style={{ background: "#111" }}>
        <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
        <span className="ml-3 text-[10px] tracking-[0.2em] uppercase text-white/30 font-mono">norm — not-normal intelligence</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${phase === "chatting" ? "bg-[#28C840]" : "bg-white/20"}`} />
          <span className="text-[9px] tracking-[0.2em] uppercase text-white/30 font-mono">{phase === "chatting" ? "online" : "idle"}</span>
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
        className="px-5 py-5 font-mono text-[12px] md:text-[13px] leading-relaxed overflow-y-auto cursor-text"
        style={{ height: "clamp(300px, 44vh, 440px)" }}
      >
        {msgs.map((m, i) => (
          <div key={i} className="mb-2" style={{ color: colour[m.who], whiteSpace: "pre-wrap" }}>
            {m.who === "norm" && <span className="opacity-50">norm&gt; </span>}
            {m.who === "you" && <span className="opacity-50">you&gt; </span>}
            {m.text}
          </div>
        ))}
        {thinking && (
          <div className="mb-2" style={{ color: colour.norm }}>
            <span className="opacity-50">norm&gt; </span>
            <span className="inline-flex gap-1 align-middle">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "120ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "240ms" }} />
            </span>
          </div>
        )}
        {typingLine && (
          <div className="mb-2" style={{ color: colour.norm, whiteSpace: "pre-wrap" }}>
            <span className="opacity-50">norm&gt; </span>
            {typingLine}
            <span className="inline-block w-2 h-[1em] ml-0.5 align-middle animate-pulse" style={{ background: "#9FE6B0" }} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-5 py-3 border-t border-white/8 font-mono text-[12px] md:text-[13px]" style={{ background: "#0C0C0C" }}>
        <span style={{ color: "#E8E2C0" }} className="opacity-60 select-none">{(name || "you").toLowerCase()}@studio:~$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          placeholder={phase === "asleep" ? "say hi to begin…" : "type a message…"}
          className="flex-1 bg-transparent outline-none text-[#F3F1EC] placeholder-white/20"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
