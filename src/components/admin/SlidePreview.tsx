"use client";

import type { Slide } from "@/lib/proposal/types";

/** HTML mirror of one PDF slide. Scales to its container via cqw units. */
export default function SlidePreview({ slide, clientTag, page }: { slide: Slide; clientTag: string; page: number }) {
  return (
    <div
      style={{ containerType: "inline-size", aspectRatio: "1.414 / 1", background: "#fff", color: "#0A0A0A", position: "relative", overflow: "hidden", fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace", width: "100%" }}
    >
      {/* chrome */}
      {slide.layout !== "cover" && slide.layout !== "closing" && (
        <>
          {clientTag && <span style={edge("top")}>{clientTag}</span>}
          <span style={{ ...edge("bottom"), color: "#9A9A9A" }}>nobody remembers normal</span>
          <span style={{ position: "absolute", left: "2.4cqw", bottom: "2.4cqw", fontSize: "1.1cqw", color: "#9A9A9A" }}>{page}</span>
        </>
      )}

      <Body slide={slide} />
    </div>
  );
}

function edge(side: "top" | "bottom"): React.CSSProperties {
  return {
    position: "absolute", right: "1.6cqw", [side]: "3.6cqw", fontSize: "1.0cqw",
    writingMode: "vertical-rl", letterSpacing: "0.1em",
  } as React.CSSProperties;
}

function Paras({ body, size = 1.15 }: { body: string; size?: number }) {
  return <>{body.split("\n\n").map((p, i) => <p key={i} style={{ fontSize: `${size}cqw`, lineHeight: 1.7, marginBottom: "0.8cqw" }}>{p}</p>)}</>;
}

function Body({ slide }: { slide: Slide }) {
  const pad: React.CSSProperties = { position: "absolute", inset: 0, padding: "3.4cqw 4cqw" };

  if (slide.layout === "cover") {
    return (
      <div style={{ ...pad, display: "flex", gap: "2.4cqw" }}>
        <div style={{ width: "62%" }}>{slide.image ? <img src={slide.image} alt="" style={imgStyle} /> : <Placeholder />}</div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "0.5cqw" }}>
          <div style={{ fontSize: "1.1cqw" }}>{slide.eyebrow}</div>
          <div style={{ fontSize: "1.4cqw", fontWeight: 700, margin: "0.3cqw 0" }}>{slide.titleStrong}</div>
          <div style={{ fontSize: "1.1cqw" }}>{slide.titleRest}</div>
        </div>
        <span style={{ position: "absolute", right: "1.6cqw", top: "3.6cqw", fontSize: "1cqw", writingMode: "vertical-rl" }}>2026 © not normal</span>
      </div>
    );
  }

  if (slide.layout === "closing") {
    return (
      <div style={{ ...pad, display: "grid", placeItems: "center" }}>
        <span style={{ position: "absolute", top: "3.4cqw", left: 0, right: 0, textAlign: "center", fontSize: "1.15cqw" }}>{slide.topLabel}</span>
        <img src="/notnormal-logoblack.png" alt="Not Normal" style={{ width: "42%" }} />
        <span style={{ position: "absolute", bottom: "2.6cqw", left: 0, right: 0, textAlign: "center", fontSize: "1.1cqw", color: "#9A9A9A" }}>nobody remembers normal</span>
        <span style={{ position: "absolute", left: "2.4cqw", top: "42%", fontSize: "1cqw", writingMode: "vertical-rl" }}>{slide.email}</span>
        <span style={{ position: "absolute", right: "2.4cqw", top: "40%", fontSize: "1cqw", writingMode: "vertical-rl" }}>{slide.sideLabel}</span>
      </div>
    );
  }

  if (slide.layout === "statement") {
    return (
      <div style={{ ...pad, display: "flex", alignItems: "center" }}>
        <div style={{ width: "56%" }}>
          <div style={{ fontSize: "1.3cqw", fontWeight: 700, marginBottom: "1.2cqw" }}>{slide.heading}</div>
          <Paras body={slide.body} />
        </div>
      </div>
    );
  }

  // imageText / imageSections
  return (
    <div style={{ ...pad, display: "flex", gap: "2.4cqw" }}>
      <div style={{ width: "46%" }}>{slide.image ? <img src={slide.image} alt="" style={imgStyle} /> : <Placeholder />}</div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: "3cqw" }}>
        <div style={{ fontSize: "1.3cqw", fontWeight: 700, marginBottom: "1.2cqw" }}>{slide.heading}</div>
        {slide.layout === "imageText"
          ? <Paras body={slide.body} />
          : slide.sections.map((sec, i) => (
              <div key={i}>
                <div style={{ fontSize: "1.15cqw", fontWeight: 700, marginTop: "1.2cqw", marginBottom: "0.6cqw" }}>{sec.title}</div>
                {sec.intro && <p style={{ fontSize: "1.1cqw", lineHeight: 1.6, marginBottom: "0.5cqw" }}>{sec.intro}</p>}
                {sec.bullets.map((b, j) => (
                  <div key={j} style={{ display: "flex", paddingLeft: "1cqw", marginBottom: "0.3cqw" }}>
                    <span style={{ width: "1.4cqw", fontSize: "1.05cqw" }}>●</span>
                    <span style={{ flex: 1, fontSize: "1.05cqw", lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
            ))}
      </div>
    </div>
  );
}

const imgStyle: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };
function Placeholder() {
  return <div style={{ width: "100%", height: "100%", background: "#ECECEC", display: "grid", placeItems: "center", color: "#B0B0B0", fontSize: "1cqw" }}>image</div>;
}
