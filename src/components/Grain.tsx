"use client";

/* Fixed film-grain + vignette overlay. Pointer-events none. */
export default function Grain() {
  return (
    <>
      {/* Grain */}
      <div
        aria-hidden
        className="fixed inset-0 z-[150] pointer-events-none"
        style={{
          opacity: 0.06,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="fixed inset-0 z-[149] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.28) 100%)",
        }}
      />
    </>
  );
}
