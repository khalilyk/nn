"use client";

import { useEffect, useState } from "react";

/* Overlapping work imagery that rotates through sets every 30s.
   Swap these URLs for real logos / uniforms / menus / packaging shots. */
const sets: { label: string; imgs: string[] }[] = [
  {
    label: "Identity",
    imgs: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    label: "Uniforms & Merch",
    imgs: [
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    label: "Menus & Print",
    imgs: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
    ],
  },
];

const pos = [
  { rot: -5, z: 1, top: "8%", left: "0%" },
  { rot: 3, z: 2, top: "0%", left: "22%" },
  { rot: -3, z: 3, top: "12%", left: "44%" },
  { rot: 5, z: 2, top: "4%", left: "66%" },
];

export default function OverlapImages() {
  const [si, setSi] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setSi((s) => (s + 1) % sets.length);
        setShow(true);
      }, 600);
    }, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: 760, height: "clamp(260px, 38vw, 440px)" }}>
      <p className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/40">
        {sets[si].label}
      </p>
      {pos.map((p, i) => (
        <div
          key={i}
          className="absolute overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
          style={{
            width: "34%",
            aspectRatio: "3 / 4",
            top: p.top,
            left: p.left,
            zIndex: p.z,
            transform: `rotate(${p.rot}deg)`,
            opacity: show ? 1 : 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.zIndex = "10"; e.currentTarget.style.transform = `rotate(0deg) scale(1.04)`; }}
          onMouseLeave={(e) => { e.currentTarget.style.zIndex = String(p.z); e.currentTarget.style.transform = `rotate(${p.rot}deg)`; }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sets[si].imgs[i]} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
