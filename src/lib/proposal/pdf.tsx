import React from "react";
import { Document, Page, Text, View, Image, renderToBuffer } from "@react-pdf/renderer";
import type { Proposal, Slide } from "./types";
import { resolveStyle } from "./types";

const PDF_FONT: Record<string, string> = { mono: "Courier", sans: "Helvetica", serif: "Times-Roman" };

/** Build the per-slide style tokens from its design overrides. */
function tokens(slide: Slide) {
  const r = resolveStyle(slide.style);
  const font = PDF_FONT[r.font];
  const dim = r.dark ? "rgba(255,255,255,0.5)" : "#8A8A8A";
  const rule = r.dark ? "rgba(255,255,255,0.25)" : "#DDDDDD";
  const z = (n: number) => n * r.scale;
  return { ...r, font, dim, rule, z };
}

function Chrome({ tag, page, smiley, t }: { tag: string; page: number; smiley?: string; t: ReturnType<typeof tokens> }) {
  return (
    <>
      <View style={{ position: "absolute", right: 42, top: 30, bottom: 30, width: 0.7, backgroundColor: t.rule }} />
      {tag ? <Text style={{ position: "absolute", right: 18, top: 40, fontSize: 8, color: t.fg, transform: "rotate(90deg)", transformOrigin: "right top", fontFamily: t.font }}>{tag}</Text> : null}
      {smiley && !t.dark ? <Image src={smiley} style={{ position: "absolute", right: 13, top: "47%", width: 15, height: 15 }} /> : null}
      <Text style={{ position: "absolute", right: 18, bottom: 40, fontSize: 8, color: t.dim, transform: "rotate(90deg)", transformOrigin: "right bottom", fontFamily: t.font }}>nobody remembers normal</Text>
      <Text style={{ position: "absolute", left: 26, bottom: 26, fontSize: 9, color: t.dim, fontFamily: t.font }}>{page}</Text>
    </>
  );
}

function Img({ src, dark }: { src?: string; dark: boolean }) {
  const img = { width: "100%", height: "100%", objectFit: "cover" as const };
  return src ? <Image src={src} style={img} /> : <View style={{ width: "100%", height: "100%", backgroundColor: dark ? "rgba(255,255,255,0.12)" : "#ECECEC" }} />;
}

function SlidePage({ slide, tag, n, wordmark, smiley }: { slide: Slide; tag: string; n: number; wordmark?: string; smiley?: string }) {
  const t = tokens(slide);
  const page = { backgroundColor: t.bg, color: t.fg, fontFamily: t.font, fontSize: t.z(9), paddingVertical: 34, paddingHorizontal: 40 };
  const heading = { fontSize: t.z(10), fontWeight: "bold" as const, letterSpacing: 0.5, marginBottom: t.z(12), color: t.fg, textAlign: t.align };
  const para = { fontSize: t.z(9), lineHeight: 1.7, marginBottom: t.z(8), color: t.fg, textAlign: t.align };
  const chrome = <Chrome tag={tag} page={n} smiley={smiley} t={t} />;
  const Paras = ({ body }: { body: string }) => <>{body.split("\n\n").map((p, i) => <Text key={i} style={para}>{p}</Text>)}</>;

  if (slide.layout === "cover") {
    return (
      <Page size="A4" orientation="landscape" wrap={false} style={page}>
        <View style={{ flexDirection: "row", height: "100%", gap: 24 }}>
          <View style={{ width: "62%" }}><Img src={slide.image} dark={t.dark} /></View>
          <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 6 }}>
            <Text style={{ fontSize: t.z(9) }}>{slide.eyebrow}</Text>
            <Text style={{ fontSize: t.z(11), fontWeight: "bold", marginVertical: 2 }}>{slide.titleStrong}</Text>
            <Text style={{ fontSize: t.z(9) }}>{slide.titleRest}</Text>
          </View>
        </View>
        <Text style={{ position: "absolute", right: 18, top: 40, fontSize: 8, color: t.dim, transform: "rotate(90deg)", transformOrigin: "right top" }}>2026 © not normal</Text>
      </Page>
    );
  }

  if (slide.layout === "closing") {
    return (
      <Page size="A4" orientation="landscape" wrap={false} style={page}>
        <Text style={{ position: "absolute", top: 34, left: 0, right: 0, textAlign: "center", fontSize: t.z(9) }}>{slide.topLabel}</Text>
        <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
          {wordmark ? <Image src={wordmark} style={{ width: 320 }} /> : <Text style={{ fontSize: t.z(30), fontWeight: "bold" }}>NOT NORMAL</Text>}
        </View>
        <Text style={{ position: "absolute", bottom: 26, left: 0, right: 0, textAlign: "center", fontSize: t.z(9), color: t.dim }}>nobody remembers normal</Text>
        <Text style={{ position: "absolute", left: 22, top: "44%", fontSize: 8, transform: "rotate(90deg)", transformOrigin: "left top" }}>{slide.email}</Text>
        <Text style={{ position: "absolute", right: 22, top: "42%", fontSize: 8, transform: "rotate(90deg)", transformOrigin: "right top" }}>{slide.sideLabel}</Text>
      </Page>
    );
  }

  if (slide.layout === "statement") {
    return (
      <Page size="A4" orientation="landscape" wrap={false} style={page}>
        <View style={{ width: t.align === "center" ? "100%" : "55%", height: "100%", justifyContent: "center" }}>
          <Text style={heading}>{slide.heading}</Text>
          <Paras body={slide.body} />
        </View>
        {chrome}
      </Page>
    );
  }

  // imageText / imageSections
  const secTitle = { fontSize: t.z(9), fontWeight: "bold" as const, marginTop: t.z(12), marginBottom: t.z(6), color: t.fg };
  const secIntro = { fontSize: t.z(9), lineHeight: 1.6, marginBottom: t.z(6), color: t.fg };
  return (
    <Page size="A4" orientation="landscape" wrap={false} style={page}>
      <View style={{ flexDirection: "row", gap: 24, height: "100%" }}>
        <View style={{ width: "46%" }}><Img src={slide.image} dark={t.dark} /></View>
        <View style={{ flex: 1, paddingRight: 30, justifyContent: "center" }}>
          {slide.layout === "imageText" ? (
            <>
              <Text style={heading}>{slide.heading}</Text>
              <Paras body={slide.body} />
            </>
          ) : (
            <>
              <Text style={heading}>{slide.heading}</Text>
              {slide.sections.map((sec, i) => (
                <View key={i}>
                  <Text style={secTitle}>{sec.title}</Text>
                  {sec.intro ? <Text style={secIntro}>{sec.intro}</Text> : null}
                  {sec.bullets.map((b, j) => (
                    <View key={j} style={{ flexDirection: "row", marginBottom: t.z(3), paddingLeft: 10 }}>
                      <Text style={{ width: 12, fontSize: t.z(9), color: t.fg }}>●</Text>
                      <Text style={{ flex: 1, fontSize: t.z(9), lineHeight: 1.5, color: t.fg }}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </>
          )}
        </View>
      </View>
      {chrome}
    </Page>
  );
}

export function ProposalDoc({ proposal, wordmark, smiley }: { proposal: Proposal; wordmark?: string; smiley?: string }) {
  return (
    <Document>
      {proposal.slides.map((slide, i) => (
        <SlidePage key={slide.id} slide={slide} tag={proposal.clientTag} n={i + 1} wordmark={wordmark} smiley={smiley} />
      ))}
    </Document>
  );
}

export async function renderProposalPdf(proposal: Proposal, wordmark?: string, smiley?: string): Promise<Buffer> {
  return renderToBuffer(<ProposalDoc proposal={proposal} wordmark={wordmark} smiley={smiley} />);
}
