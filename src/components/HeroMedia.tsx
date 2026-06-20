"use client";

/* Hero background — single looping, muted, full-bleed video (nn-header).
   WebM first (smaller), MP4 fallback. Poster paints instantly before play.
   Plays on desktop and mobile (muted + playsInline satisfies iOS autoplay). */
export default function HeroMedia({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/nn-header-poster.jpg"
        className="w-full h-full object-cover"
      >
        <source src="/nn-header-bg.webm" type="video/webm" />
        <source src="/nn-header-bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
