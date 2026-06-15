import type { Proposal } from "./types";
import { slideMarkup, RICH_CSS } from "./markup";

/** Full standalone HTML document for the deck — identical markup to the live preview. */
export function buildProposalHtml(proposal: Proposal, origin: string): string {
  const pages = proposal.slides
    .map((s, i) => `<div class="page">${slideMarkup(s, proposal.clientTag, i + 1)}</div>`)
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><base href="${origin}/">
<style>
  @page { size: A4 landscape; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { width: 297mm; height: 209.9mm; overflow: hidden; position: relative; page-break-after: always; }
  .page:last-child { page-break-after: auto; }
  .page > div { height: 100%; }
  ${RICH_CSS}
</style></head><body>${pages}</body></html>`;
}

async function launch() {
  const onServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  const puppeteer = (await import("puppeteer-core")).default;
  if (onServerless) {
    const chromium = (await import("@sparticuz/chromium")).default;
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  const executablePath =
    process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  return puppeteer.launch({ executablePath, headless: true });
}

export async function renderProposalPdf(proposal: Proposal, origin: string): Promise<Buffer> {
  const html = buildProposalHtml(proposal, origin);
  const browser = await launch();
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(async () => { try { await (document as Document).fonts.ready; } catch { /* noop */ } });
    const pdf = await page.pdf({
      printBackground: true,
      landscape: true,
      format: "A4",
      preferCSSPageSize: true,
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
