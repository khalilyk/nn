import type { Slide } from "./types";
import { resolveStyle } from "./types";

const FONT_STACK: Record<string, string> = {
  mono: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  sans: "Helvetica, Arial, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
};

export function esc(s: string): string {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Convert legacy structured slides (imageText/imageSections/statement) to the new rich layout. */
export function normalizeSlide(s: unknown): Slide {
  const o = s as Record<string, unknown> & { layout?: string };
  if (!o || (o.layout === "cover" || o.layout === "closing" || o.layout === "rich")) return s as Slide;
  let html = "";
  if (typeof o.heading === "string" && o.heading) html += `<h3>${esc(o.heading)}</h3>`;
  if (o.layout === "imageSections" && Array.isArray(o.sections)) {
    for (const sec of o.sections as { title?: string; intro?: string; bullets?: string[] }[]) {
      if (sec.title) html += `<p><strong>${esc(sec.title)}</strong></p>`;
      if (sec.intro) html += `<p>${esc(sec.intro)}</p>`;
      if (Array.isArray(sec.bullets) && sec.bullets.length) html += `<ul>${sec.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`;
    }
  } else if (typeof o.body === "string") {
    html += o.body.split("\n\n").map((p) => `<p>${esc(p)}</p>`).join("");
  }
  return { id: String(o.id), style: o.style as Slide["style"], layout: "rich", image: (o.image as string) || "", html };
}

/** Styles for the rich (TinyMCE) HTML content — shared by preview and PDF. */
export const RICH_CSS = `
.pr-rich{font-size:calc(1.15cqw * var(--sc,1));line-height:1.7}
.pr-rich h1,.pr-rich h2,.pr-rich h3,.pr-rich h4{font-size:1.18em;font-weight:700;margin:0 0 .7em;letter-spacing:.02em}
.pr-rich p{margin:0 0 .75em}
.pr-rich ul,.pr-rich ol{margin:0 0 .75em;padding-left:1.3em}
.pr-rich ul{list-style:disc}.pr-rich ol{list-style:decimal}
.pr-rich li{margin:0 0 .35em}
.pr-rich strong,.pr-rich b{font-weight:700}
.pr-rich em,.pr-rich i{font-style:italic}
.pr-rich a{text-decoration:underline;color:inherit}
.pr-rich u{text-decoration:underline}
`;

/** Pure HTML for one slide. Used verbatim by the live preview and the PDF renderer. */
export function slideMarkup(slide: Slide, clientTag: string, page: number): string {
  const r = resolveStyle(slide.style);
  const dim = r.dark ? "rgba(255,255,255,0.55)" : "#9A9A9A";
  const rule = r.dark ? "rgba(255,255,255,0.25)" : "#DDDDDD";
  const inv = r.dark ? "filter:invert(1);" : "";
  const wrap = `container-type:inline-size;aspect-ratio:1.414/1;background:${r.bg};color:${r.fg};position:relative;overflow:hidden;font-family:${FONT_STACK[r.font]};width:100%;--sc:${r.scale}`;
  const pad = `position:absolute;inset:0;padding:3.4cqw 4cqw`;
  const f = (n: number) => `${(n * r.scale).toFixed(2)}cqw`;

  const smiley = `<img src="/notnormal-iconoutline.png" alt="" style="position:absolute;right:0.9cqw;top:47%;width:1.5cqw;height:1.5cqw;${inv}"/>`;
  const ruleEl = `<span style="position:absolute;right:3.1cqw;top:2.2cqw;bottom:2.2cqw;width:1px;background:${rule}"></span>`;
  const placeholder = `<div style="width:100%;height:100%;background:${r.dark ? "rgba(255,255,255,0.12)" : "#ECECEC"};display:grid;place-items:center;color:${dim};font-size:${f(1)}">image</div>`;
  const img = (src: string) => src ? `<img src="${esc(src)}" alt="" style="width:100%;height:100%;object-fit:cover"/>` : placeholder;

  let body = "";

  if (slide.layout === "cover") {
    body = `
      <div style="${pad};display:flex;gap:2.4cqw">
        <div style="width:62%">${img(slide.image)}</div>
        <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:0.5cqw">
          <div style="font-size:${f(1.1)}">${esc(slide.eyebrow)}</div>
          <div style="font-size:${f(1.4)};font-weight:700;margin:0.3cqw 0">${esc(slide.titleStrong)}</div>
          <div style="font-size:${f(1.1)}">${esc(slide.titleRest)}</div>
        </div>
        ${ruleEl}
        <span style="position:absolute;right:1.6cqw;top:3.6cqw;font-size:${f(1)};writing-mode:vertical-rl">2026 © not normal</span>
        ${smiley}
        <span style="position:absolute;right:1.6cqw;bottom:3.6cqw;font-size:${f(1)};writing-mode:vertical-rl;color:${dim}">nobody remembers normal</span>
      </div>`;
  } else if (slide.layout === "closing") {
    body = `
      <div style="${pad};display:grid;place-items:center">
        <span style="position:absolute;top:3.4cqw;left:0;right:0;text-align:center;font-size:${f(1.15)}">${esc(slide.topLabel)}</span>
        <img src="/notnormal-logoblack.png" alt="Not Normal" style="width:42%;${inv}"/>
        <span style="position:absolute;bottom:2.6cqw;left:0;right:0;text-align:center;font-size:${f(1.1)};color:${dim}">nobody remembers normal</span>
        <span style="position:absolute;left:2.4cqw;top:42%;font-size:${f(1)};writing-mode:vertical-rl">${esc(slide.email)}</span>
        <span style="position:absolute;right:2.4cqw;top:40%;font-size:${f(1)};writing-mode:vertical-rl">${esc(slide.sideLabel)}</span>
      </div>`;
  } else {
    // rich
    const hasImg = !!slide.image;
    const chrome = `
      ${ruleEl}
      ${clientTag ? `<span style="position:absolute;right:1.6cqw;top:3.6cqw;font-size:${f(1)};writing-mode:vertical-rl;letter-spacing:0.1em">${esc(clientTag)}</span>` : ""}
      ${smiley}
      <span style="position:absolute;right:1.6cqw;bottom:3.6cqw;font-size:${f(1)};writing-mode:vertical-rl;letter-spacing:0.1em;color:${dim}">nobody remembers normal</span>
      <span style="position:absolute;left:2.4cqw;bottom:2.4cqw;font-size:${f(1.1)};color:${dim}">${page}</span>`;
    body = `
      <div style="${pad};display:flex;gap:2.4cqw">
        ${hasImg ? `<div style="width:46%">${img(slide.image)}</div>` : ""}
        <div class="pr-rich" style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-right:3cqw">
          <div>${slide.html || ""}</div>
        </div>
      </div>
      ${chrome}`;
  }

  return `<div style="${wrap}">${body}</div>`;
}
