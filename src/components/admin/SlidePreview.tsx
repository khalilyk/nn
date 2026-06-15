"use client";

import type { Slide } from "@/lib/proposal/types";
import { resolveStyle } from "@/lib/proposal/types";

const FONT_STACK: Record<string, string> = {
  mono: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  sans: "Helvetica, Arial, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
};

/** HTML mirror of one PDF slide. Scales to its container via cqw units. */
export default function SlidePreview({ slide, clientTag, page }: { slide: Slide; clientTag: string; page: number }) {
  const r = resolveStyle(slide.style);
  const dimC = r.dark ? "rgba(255,255,255,0.55)" : "#9A9A9A";
  const ruleC = r.dark ? "rgba(255,255,255,0.25)" : "#DDDDDD";

  return (
    <div
      style={{ containerType: "inline-size", aspectRatio: "1.414 / 1", background: r.bg, color: r.fg, position: "relative", overflow: "hidden", fontFamily: FONT_STACK[r.font], width: "100%" }}
    >
      {/* chrome */}
      {slide.layout !== "cover" && slide.layout !== "closing" && (
        <>
          <span style={{ position: "absolute", right: "3.1cqw", top: "2.2cqw", bottom: "2.2cqw", width: 1, background: ruleC }} />
          {clientTag && <span style={{ ...edge("top"), color: r.fg }}>{clientTag}</span>}
          <img src="/notnormal-iconoutline.png" alt="" style={{ position: "absolute", right: "0.9cqw", top: "47%", width: "1.5cqw", height: "1.5cqw", filter: r.dark ? "invert(1)" : "none" }} />
          <span style={{ ...edge("bottom"), color: dimC }}>nobody remembers normal</span>
          <span style={{ position: "absolute", left: "2.4cqw", bottom: "2.4cqw", fontSize: "1.1cqw", color: dimC }}>{page}</span>
        </>
      )}

      <Body slide={slide} scale={r.scale} align={r.align} dim={dimC} dark={r.dark} />
    </div>
  );
}

function edge(side: "top" | "bottom"): React.CSSProperties {
  return {
    position: "absolute", right: "1.6cqw", [side]: "3.6cqw", fontSize: "1.0cqw",
    writingMode: "vertical-rl", letterSpacing: "0.1em",
  } as React.CSSProperties;
}

function Body({ slide, scale, align, dim, dark }: { slide: Slide; scale: number; align: string; dim: string; dark: boolean }) {
  const z = (n: number) => `${(n * scale).toFixed(2)}cqw`;
  const pad: React.CSSProperties = { position: "absolute", inset: 0, padding: "3.4cqw 4cqw", textAlign: align as React.CSSProperties["textAlign"] };
  const Paras = ({ body, size = 1.15 }: { body: string; size?: number }) =>
    <>{body.split("\n\n").map((p, i) => <p key={i} style={{ fontSize: z(size), lineHeight: 1.7, marginBottom: z(0.8) }}>{p}</p>)}</>;
  const placeholderBg = dark ? "rgba(255,255,255,0.12)" : "#ECECEC";
  const Placeholder = () => <div style={{ width: "100%", height: "100%", background: placeholderBg, display: "grid", placeItems: "center", color: dim, fontSize: z(1) }}>image</div>;
  const imgStyle: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };

  if (slide.layout === "cover") {
    return (
      <div style={{ ...pad, display: "flex", gap: "2.4cqw", textAlign: "left" }}>
        <div style={{ width: "62%" }}>{slide.image ? <img src={slide.image} alt="" style={imgStyle} /> : <Placeholder />}</div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "0.5cqw" }}>
          <div style={{ fontSize: z(1.1) }}>{slide.eyebrow}</div>
          <div style={{ fontSize: z(1.4), fontWeight: 700, margin: "0.3cqw 0" }}>{slide.titleStrong}</div>
          <div style={{ fontSize: z(1.1) }}>{slide.titleRest}</div>
        </div>
        <span style={{ position: "absolute", right: "1.6cqw", top: "3.6cqw", fontSize: z(1), writingMode: "vertical-rl", color: dim }}>2026 © not normal</span>
      </div>
    );
  }

  if (slide.layout === "closing") {
    return (
      <div style={{ ...pad, display: "grid", placeItems: "center" }}>
        <span style={{ position: "absolute", top: "3.4cqw", left: 0, right: 0, textAlign: "center", fontSize: z(1.15) }}>{slide.topLabel}</span>
        <img src="/notnormal-logoblack.png" alt="Not Normal" style={{ width: "42%", filter: dark ? "invert(1)" : "none" }} />
        <span style={{ position: "absolute", bottom: "2.6cqw", left: 0, right: 0, textAlign: "center", fontSize: z(1.1), color: dim }}>nobody remembers normal</span>
        <span style={{ position: "absolute", left: "2.4cqw", top: "42%", fontSize: z(1), writingMode: "vertical-rl" }}>{slide.email}</span>
        <span style={{ position: "absolute", right: "2.4cqw", top: "40%", fontSize: z(1), writingMode: "vertical-rl" }}>{slide.sideLabel}</span>
      </div>
    );
  }

  if (slide.layout === "statement") {
    return (
      <div style={{ ...pad, display: "flex", alignItems: "center" }}>
        <div style={{ width: align === "center" ? "100%" : "56%" }}>
          <div style={{ fontSize: z(1.3), fontWeight: 700, marginBottom: z(1.2) }}>{slide.heading}</div>
          <Paras body={slide.body} />
        </div>
      </div>
    );
  }

  // imageText / imageSections
  return (
    <div style={{ ...pad, display: "flex", gap: "2.4cqw", textAlign: "left" }}>
      <div style={{ width: "46%" }}>{slide.image ? <img src={slide.image} alt="" style={imgStyle} /> : <Placeholder />}</div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: "3cqw", textAlign: align as React.CSSProperties["textAlign"] }}>
        <div style={{ fontSize: z(1.3), fontWeight: 700, marginBottom: z(1.2) }}>{slide.heading}</div>
        {slide.layout === "imageText"
          ? <Paras body={slide.body} />
          : slide.sections.map((sec, i) => (
              <div key={i}>
                <div style={{ fontSize: z(1.15), fontWeight: 700, marginTop: z(1.2), marginBottom: z(0.6) }}>{sec.title}</div>
                {sec.intro && <p style={{ fontSize: z(1.1), lineHeight: 1.6, marginBottom: z(0.5) }}>{sec.intro}</p>}
                {sec.bullets.map((b, j) => (
                  <div key={j} style={{ display: "flex", justifyContent: align === "center" ? "center" : "flex-start", paddingLeft: align === "center" ? 0 : "1cqw", marginBottom: z(0.3) }}>
                    <span style={{ width: z(1.4), fontSize: z(1.05) }}>●</span>
                    <span style={{ fontSize: z(1.05), lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
            ))}
      </div>
    </div>
  );
}
