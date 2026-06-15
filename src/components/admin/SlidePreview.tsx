"use client";

import type { Slide } from "@/lib/proposal/types";
import { slideMarkup, RICH_CSS } from "@/lib/proposal/markup";

/** Live preview of one slide — identical markup to the PDF renderer. */
export default function SlidePreview({ slide, clientTag, page }: { slide: Slide; clientTag: string; page: number }) {
  return (
    <>
      <style>{RICH_CSS}</style>
      <div dangerouslySetInnerHTML={{ __html: slideMarkup(slide, clientTag, page) }} />
    </>
  );
}
