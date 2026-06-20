"use client";

import { useRef, useState } from "react";

/* Hero background — single looping, muted, full-bleed video (nn-header).
   Smoothness:
   - poster paints instantly, video fades in over it once it can play (no pop)
   - WebM (small) with MP4 fallback
   - muted + playsInline so it autoplays on desktop AND mobile (iOS)
   - a very slow, continuous zoom adds life without any visible loop seam */
export default function HeroMedia({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#0A0A0A] ${className}`}>
      {/* poster underlay — instant paint, fades out as the video comes in */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/nn-header-poster.jpg')",
          opacity: ready ? 0 : 1,
          transition: "opacity 1.2s ease",
        }}
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/nn-header-poster.jpg"
        onCanPlay={() => setReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 1.2s ease",
          animation: "nn-hero-zoom 28s ease-in-out infinite alternate",
          willChange: "transform, opacity",
        }}
      >
        <source src="/nn-header-bg.webm" type="video/webm" />
        <source src="/nn-header-bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
