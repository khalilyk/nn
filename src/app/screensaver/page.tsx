"use client";

import { useEffect, useState, useCallback, useRef } from "react";


const STOIC_QUOTES = [
  { text: "You have power over your mind, not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "The obstacle is the way.", author: "Marcus Aurelius" },
  { text: "He who fears death will never do anything worthy of a man who is alive.", author: "Seneca" },
  { text: "Waste no more time arguing what a good man should be. Be one.", author: "Marcus Aurelius" },
  { text: "Make the best use of what is in your power, and take the rest as it happens.", author: "Epictetus" },
  { text: "He suffers more than necessary, who suffers before it is necessary.", author: "Seneca" },
  { text: "Confine yourself to the present.", author: "Marcus Aurelius" },
  { text: "Begin at once to live, and count each separate day as a separate life.", author: "Seneca" },
  { text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.", author: "Marcus Aurelius" },
  { text: "We suffer more in imagination than in reality.", author: "Seneca" },
  { text: "First say to yourself what you would be; and then do what you have to do.", author: "Epictetus" },
  { text: "The whole future lies in uncertainty: live immediately.", author: "Seneca" },
  { text: "Amor fati: love your fate, which is in fact your life.", author: "Nietzsche" },
  { text: "Perfection of character is this: to live each day as if it were your last.", author: "Marcus Aurelius" },
  { text: "If it is not right, do not do it; if it is not true, do not say it.", author: "Marcus Aurelius" },
  { text: "Luck is what happens when preparation meets opportunity.", author: "Seneca" },
];

const CATEGORIES = ["All", "Paintings", "Drawings", "Photographs", "Antiquities"];

type Artwork = {
  id: string;
  label: string;
  imageUrl: string;
};

// ── Bell sound via Web Audio API ──────────────────────────────────────────────
function playBell(ctx: AudioContext) {
  const frequencies = [880, 1108, 1318, 1760];
  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.98, ctx.currentTime + 3);
    const vol = 0.6 / (i + 1);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4);
    osc.start(ctx.currentTime + i * 0.02);
    osc.stop(ctx.currentTime + 4);
  });
}

function ringAlarm(ctx: AudioContext) {
  // Ring 3 times
  for (let r = 0; r < 3; r++) {
    const delay = r * 1.2;
    const frequencies = [880, 1108, 1318, 1760];
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, ctx.currentTime + delay + 1);
      const vol = 0.7 / (i + 1);
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 1.1);
      osc.start(ctx.currentTime + delay + i * 0.015);
      osc.stop(ctx.currentTime + delay + 1.2);
    });
  }
}

// ── Timer component ───────────────────────────────────────────────────────────
function Timer() {
  const [totalSeconds, setTotalSeconds] = useState(25 * 60); // 25 min default
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [editing, setEditing] = useState<"h" | "m" | "s" | null>(null);
  const [editBuffer, setEditBuffer] = useState("");
  const [alarming, setAlarming] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  };

  // Tick
  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          setAlarming(true);
          ringAlarm(getAudioCtx());
          setTimeout(() => setAlarming(false), 4000);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [running]);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  const handleSegmentClick = (seg: "h" | "m" | "s") => {
    if (running) { setRunning(false); return; }
    setEditing(seg);
    setEditBuffer("");
  };

  const commitEdit = useCallback((seg: "h" | "m" | "s", buf: string) => {
    const val = Math.max(0, parseInt(buf || "0", 10));
    let h = hours, m = minutes, s = seconds;
    if (seg === "h") h = Math.min(99, val);
    if (seg === "m") m = Math.min(59, val);
    if (seg === "s") s = Math.min(59, val);
    const newTotal = h * 3600 + m * 60 + s;
    setTotalSeconds(newTotal);
    setRemaining(newTotal);
    setEditing(null);
    setEditBuffer("");
  }, [hours, minutes, seconds]);

  useEffect(() => {
    if (editing === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        setEditBuffer((b) => {
          const next = (b + e.key).slice(-2);
          return next;
        });
      } else if (e.key === "Backspace") {
        setEditBuffer((b) => b.slice(0, -1));
      } else if (e.key === "Enter" || e.key === "Tab") {
        commitEdit(editing, editBuffer);
      } else if (e.key === "Escape") {
        setEditing(null);
        setEditBuffer("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing, editBuffer, commitEdit]);

  // Scroll to adjust
  const handleWheel = (seg: "h" | "m" | "s", e: React.WheelEvent) => {
    if (running) return;
    e.preventDefault();
    const dir = e.deltaY < 0 ? 1 : -1;
    setRemaining((r) => {
      let h = Math.floor(r / 3600);
      let m = Math.floor((r % 3600) / 60);
      let s = r % 60;
      if (seg === "h") h = Math.min(99, Math.max(0, h + dir));
      if (seg === "m") m = Math.min(59, Math.max(0, m + dir));
      if (seg === "s") s = Math.min(59, Math.max(0, s + dir));
      const next = h * 3600 + m * 60 + s;
      setTotalSeconds(next);
      return next;
    });
  };

  const reset = () => {
    setRunning(false);
    setRemaining(totalSeconds);
    setAlarming(false);
  };

  const toggleRun = () => {
    if (remaining === 0) { reset(); return; }
    // Unlock audio on first interaction
    getAudioCtx().resume();
    setRunning((r) => !r);
  };

  const displayH = editing === "h" ? editBuffer.padStart(2, "0") : pad(hours);
  const displayM = editing === "m" ? editBuffer.padStart(2, "0") : pad(minutes);
  const displayS = editing === "s" ? editBuffer.padStart(2, "0") : pad(seconds);

  const progress = totalSeconds > 0 ? remaining / totalSeconds : 0;
  const isLow = remaining <= 60 && running;

  const numColor = alarming ? "#ff4444" : isLow ? "#ff8c42" : "white";
  const canEdit = !running;

  const adjust = (seg: "h" | "m" | "s", dir: 1 | -1) => {
    if (running) return;
    setRemaining((r) => {
      let h = Math.floor(r / 3600);
      let m = Math.floor((r % 3600) / 60);
      let s = r % 60;
      if (seg === "h") h = Math.min(99, Math.max(0, h + dir));
      if (seg === "m") m = Math.min(59, Math.max(0, m + dir));
      if (seg === "s") s = Math.min(59, Math.max(0, s + dir));
      const next = h * 3600 + m * 60 + s;
      setTotalSeconds(next);
      return next;
    });
  };

  const ArrowBtn = ({ seg, dir }: { seg: "h" | "m" | "s"; dir: 1 | -1 }) => (
    <button
      onClick={() => adjust(seg, dir)}
      className="flex items-center justify-center hover:text-white transition-colors duration-150"
      style={{ width: "100%", height: "2rem", cursor: canEdit ? "pointer" : "default", color: "rgba(255,255,255,0.45)" }}
      tabIndex={-1}
    >
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <path
          d={dir === 1 ? "M1 10L10 2L19 10" : "M1 2L10 10L19 2"}
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  const Segment = ({ seg, display }: { seg: "h" | "m" | "s"; display: string }) => (
    <div className="flex flex-col items-center">
      <ArrowBtn seg={seg} dir={1} />
      <span
        onClick={() => handleSegmentClick(seg)}
        onWheel={(e) => handleWheel(seg, e)}
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          color: numColor,
          borderBottom: editing === seg ? "2px solid rgba(255,255,255,0.6)" : "2px solid transparent",
          cursor: canEdit ? "text" : "default",
          transition: "color 0.3s",
          lineHeight: 1,
        }}
      >
        {display}
      </span>
      <ArrowBtn seg={seg} dir={-1} />
    </div>
  );

  const Colon = () => (
    <span
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: "rgba(255,255,255,0.4)",
        lineHeight: 1,
        marginTop: "2rem", // offset to align with digit baseline
      }}
    >:
    </span>
  );

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 select-none">
      {/* Timer display with arrows */}
      <div
        className="flex items-center tabular-nums gap-0"
        style={{
          fontSize: "clamp(4rem, 15vw, 14rem)",
          textShadow: "0 0 60px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.9)",
          letterSpacing: "-0.02em",
          fontWeight: 300,
        }}
      >
        {hours > 0 && (
          <>
            <Segment seg="h" display={displayH} />
            <Colon />
          </>
        )}
        <Segment seg="m" display={displayM} />
        <Colon />
        <Segment seg="s" display={displayS} />
      </div>

      {/* Thin progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
        <div
          className="h-full bg-white/40 transition-all duration-1000 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-5 mt-8">
        {/* START / PAUSE / RESET - prominent */}
        <button
          onClick={toggleRun}
          className="transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: "12px",
            letterSpacing: "0.25em",
            padding: "10px 28px",
            background: running ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.9)",
            color: running ? "rgba(255,255,255,0.9)" : "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          {running ? "PAUSE" : remaining === 0 ? "RESET" : "START"}
        </button>

        {!running && remaining !== totalSeconds && remaining > 0 && (
          <button
            onClick={reset}
            className="text-white/30 hover:text-white/70 transition-colors duration-200"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "11px", letterSpacing: "0.2em" }}
          >
            RESET
          </button>
        )}
      </div>

      {editing !== null && (
        <p
          className="mt-4 text-white/35"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "10px", letterSpacing: "0.15em" }}
        >
          TYPE · ENTER TO CONFIRM · ESC TO CANCEL
        </p>
      )}
    </div>
  );
}

// ── Main screensaver ──────────────────────────────────────────────────────────
export default function Screensaver() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);
  const [category, setCategory] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * STOIC_QUOTES.length));
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setQuoteIndex((i) => (i + 1) % STOIC_QUOTES.length);
        setQuoteFade(true);
      }, 800);
    }, 20000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = category === "All" ? "/api/getty" : `/api/getty?category=${category}`;
    fetch(url)
      .then((r) => r.json())
      .then((data: Artwork[]) => {
        if (!data.length) { setError("No artworks found"); return; }
        setArtworks(data);
        setCurrentIndex(0);
        setNextIndex(1);
        setLoading(false);
      })
      .catch(() => setError("Failed to load artworks"));
  }, [category]);

  const advance = useCallback(() => {
    if (artworks.length < 2 || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % artworks.length);
      setNextIndex((i) => (i + 2) % artworks.length);
      setTransitioning(false);
    }, 1500);
  }, [artworks.length, transitioning]);

  useEffect(() => {
    if (!artworks.length) return;
    const id = setInterval(advance, 60000);
    return () => clearInterval(id);
  }, [artworks.length, advance]);

  const current = artworks[currentIndex];
  const next = artworks[nextIndex];

  return (
    <div
      className="fixed inset-0 bg-black overflow-hidden"
      style={{ cursor: "default" }}
      onClick={() => setDropdownOpen(false)}
    >
      {/* Background images */}
      {!loading && current && (
        <>
          <div
            className="absolute inset-0 bg-center bg-cover transition-opacity duration-[1500ms] ease-in-out"
            style={{ backgroundImage: `url(${current.imageUrl})`, opacity: transitioning ? 0 : 1 }}
          />
          {next && (
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${next.imageUrl})` }}
            />
          )}
        </>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Not Normal icon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/notnormal-iconoutline.png"
        alt="Not Normal"
        className="absolute top-8 left-8 z-10 pointer-events-none select-none"
        style={{ height: "2.5rem", width: "auto", filter: "invert(1)", opacity: 0.7 }}
      />

      {/* Category dropdown */}
      <div className="absolute top-8 right-8 z-20" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors duration-200"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "10px", letterSpacing: "0.15em" }}
        >
          <span className="uppercase">{category}</span>
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none"
            className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
            <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {dropdownOpen && (
          <div
            className="absolute right-0 mt-3 py-1 min-w-[130px]"
            style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setDropdownOpen(false); }}
                className="w-full text-left px-4 py-2 transition-colors duration-150 hover:bg-white/10"
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: cat === category ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      <Timer />

      {/* Loading / error */}
      {loading && (
        <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
          <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>
            LOADING COLLECTION…
          </span>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
          <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{error}</span>
        </div>
      )}

      {/* Stoic quote */}
      <div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none text-center transition-opacity duration-[800ms] w-full"
        style={{ opacity: quoteFade ? 1 : 0, padding: "0 clamp(1.5rem, 8vw, 5rem)" }}
      >
        <p className="text-white/60 leading-relaxed italic" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(11px, 2.5vw, 14px)" }}>
          &ldquo;{STOIC_QUOTES[quoteIndex].text}&rdquo;
        </p>
        <p className="text-white/30 mt-2 tracking-widest uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "10px" }}>
          {STOIC_QUOTES[quoteIndex].author}
        </p>
      </div>

      {/* Artwork label */}
      {!loading && current && (
        <div className="absolute bottom-5 left-4 right-20 z-10 pointer-events-none select-none overflow-hidden">
          <p
            className="text-white/50 tracking-widest uppercase truncate"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "clamp(8px, 2vw, 11px)" }}
          >
            {current.label.replace(/\s*\(.*?\)\s*$/, "")}
          </p>
          <p className="text-white/25 mt-0.5" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "10px" }}>
            Getty Museum Collection
          </p>
        </div>
      )}

      {/* Progress dots */}
      {!loading && (
        <div className="absolute bottom-6 right-4 z-10 flex gap-1.5 pointer-events-none">
          {artworks.map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full transition-all duration-500"
              style={{ background: i === currentIndex ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
