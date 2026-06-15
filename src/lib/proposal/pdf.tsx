import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, renderToBuffer } from "@react-pdf/renderer";
import type { Proposal, Slide } from "./types";

// Monospace, white pages — the "nobody remembers normal" deck style.
const INK = "#0A0A0A";
const DIM = "#8A8A8A";

const s = StyleSheet.create({
  page: { backgroundColor: "#FFFFFF", color: INK, fontFamily: "Courier", fontSize: 9, paddingVertical: 34, paddingHorizontal: 40 },
  // right edge vertical labels
  edgeTag: { position: "absolute", right: 18, top: 40, fontSize: 8, color: INK, transform: "rotate(90deg)", transformOrigin: "right top" },
  edgeFoot: { position: "absolute", right: 18, bottom: 40, fontSize: 8, color: DIM, transform: "rotate(90deg)", transformOrigin: "right bottom" },
  pageNo: { position: "absolute", left: 26, bottom: 26, fontSize: 9, color: DIM },
  // columns
  twoCol: { flexDirection: "row", gap: 24, height: "100%" },
  imgCol: { width: "46%" },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  imgPlaceholder: { width: "100%", height: "100%", backgroundColor: "#ECECEC" },
  textCol: { flex: 1, paddingRight: 30, justifyContent: "center" },
  heading: { fontSize: 10, fontWeight: "bold", letterSpacing: 0.5, marginBottom: 12 },
  para: { fontSize: 9, lineHeight: 1.7, marginBottom: 8 },
  // sections
  secTitle: { fontSize: 9, fontWeight: "bold", marginTop: 12, marginBottom: 6 },
  secIntro: { fontSize: 9, lineHeight: 1.6, marginBottom: 6 },
  bulletRow: { flexDirection: "row", marginBottom: 3, paddingLeft: 10 },
  bulletDot: { width: 12, fontSize: 9 },
  bulletTxt: { flex: 1, fontSize: 9, lineHeight: 1.5 },
  // cover / closing
  coverWrap: { flexDirection: "row", height: "100%", gap: 24 },
  coverImg: { width: "62%" },
  coverText: { flex: 1, justifyContent: "flex-end", paddingBottom: 6 },
  brandBig: { fontSize: 30, fontWeight: "bold", letterSpacing: -1 },
  centerWrap: { height: "100%", alignItems: "center", justifyContent: "center" },
  topLabel: { position: "absolute", top: 34, left: 0, right: 0, textAlign: "center", fontSize: 9 },
  botLabel: { position: "absolute", bottom: 26, left: 0, right: 0, textAlign: "center", fontSize: 9, color: DIM },
});

function Chrome({ tag, page }: { tag: string; page: number }) {
  return (
    <>
      {tag ? <Text style={s.edgeTag}>{tag}</Text> : null}
      <Text style={s.edgeFoot}>nobody remembers normal</Text>
      <Text style={s.pageNo}>{page}</Text>
    </>
  );
}

function Img({ src }: { src?: string }) {
  return src ? <Image src={src} style={s.img} /> : <View style={s.imgPlaceholder} />;
}

function Paras({ body }: { body: string }) {
  return <>{body.split("\n\n").map((p, i) => <Text key={i} style={s.para}>{p}</Text>)}</>;
}

function SlidePage({ slide, tag, n, wordmark }: { slide: Slide; tag: string; n: number; wordmark?: string }) {
  const chrome = <Chrome tag={tag} page={n} />;

  if (slide.layout === "cover") {
    return (
      <Page size="A4" orientation="landscape" wrap={false} style={s.page}>
        <View style={s.coverWrap}>
          <View style={s.coverImg}><Img src={slide.image} /></View>
          <View style={s.coverText}>
            <Text style={{ fontSize: 9 }}>{slide.eyebrow}</Text>
            <Text style={{ fontSize: 11, fontWeight: "bold", marginVertical: 2 }}>{slide.titleStrong}</Text>
            <Text style={{ fontSize: 9 }}>{slide.titleRest}</Text>
          </View>
        </View>
        {chrome}
      </Page>
    );
  }

  if (slide.layout === "closing") {
    return (
      <Page size="A4" orientation="landscape" wrap={false} style={s.page}>
        <Text style={s.topLabel}>{slide.topLabel}</Text>
        <View style={s.centerWrap}>
          {wordmark ? <Image src={wordmark} style={{ width: 320 }} /> : <Text style={s.brandBig}>NOT NORMAL</Text>}
        </View>
        <Text style={s.botLabel}>nobody remembers normal</Text>
        <Text style={{ position: "absolute", left: 22, top: "44%", fontSize: 8, transform: "rotate(90deg)", transformOrigin: "left top" }}>{slide.email}</Text>
        <Text style={{ position: "absolute", right: 22, top: "42%", fontSize: 8, transform: "rotate(90deg)", transformOrigin: "right top" }}>{slide.sideLabel}</Text>
      </Page>
    );
  }

  if (slide.layout === "statement") {
    return (
      <Page size="A4" orientation="landscape" wrap={false} style={s.page}>
        <View style={{ width: "55%", height: "100%", justifyContent: "center" }}>
          <Text style={s.heading}>{slide.heading}</Text>
          <Paras body={slide.body} />
        </View>
        {chrome}
      </Page>
    );
  }

  // imageText / imageSections
  return (
    <Page size="A4" orientation="landscape" wrap={false} style={s.page}>
      <View style={s.twoCol}>
        <View style={s.imgCol}><Img src={slide.image} /></View>
        <View style={s.textCol}>
          {slide.layout === "imageText" ? (
            <>
              <Text style={s.heading}>{slide.heading}</Text>
              <Paras body={slide.body} />
            </>
          ) : (
            <>
              <Text style={s.heading}>{slide.heading}</Text>
              {slide.sections.map((sec, i) => (
                <View key={i}>
                  <Text style={s.secTitle}>{sec.title}</Text>
                  {sec.intro ? <Text style={s.secIntro}>{sec.intro}</Text> : null}
                  {sec.bullets.map((b, j) => (
                    <View key={j} style={s.bulletRow}><Text style={s.bulletDot}>●</Text><Text style={s.bulletTxt}>{b}</Text></View>
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

export function ProposalDoc({ proposal, wordmark }: { proposal: Proposal; wordmark?: string }) {
  return (
    <Document>
      {proposal.slides.map((slide, i) => (
        <SlidePage key={slide.id} slide={slide} tag={proposal.clientTag} n={i + 1} wordmark={wordmark} />
      ))}
    </Document>
  );
}

export async function renderProposalPdf(proposal: Proposal, wordmark?: string): Promise<Buffer> {
  return renderToBuffer(<ProposalDoc proposal={proposal} wordmark={wordmark} />);
}
