"use client";

const imgs = [
  { src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80", rot: -5, z: 1, top: "8%" },   // plating / experience
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80", rot: 3, z: 2, top: "0%" },     // restaurant / branding
  { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80", rot: -3, z: 3, top: "12%" },   // bar / content
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80", rot: 5, z: 2, top: "4%" },     // dining / social
];

/* 3–4 images that overlap each other, related to what we do. */
export default function OverlapImages() {
  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: 760, height: "clamp(260px, 38vw, 440px)" }}>
      {imgs.map((im, i) => (
        <div
          key={i}
          className="absolute overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
          style={{
            width: "34%",
            aspectRatio: "3 / 4",
            top: im.top,
            left: `${i * 22}%`,
            zIndex: im.z,
            transform: `rotate(${im.rot}deg)`,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.zIndex = "10"; e.currentTarget.style.transform = `rotate(0deg) scale(1.04)`; }}
          onMouseLeave={(e) => { e.currentTarget.style.zIndex = String(im.z); e.currentTarget.style.transform = `rotate(${im.rot}deg)`; }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={im.src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
