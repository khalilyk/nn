"use client";

import { useEffect, useState } from "react";

const A = "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80";
const B = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80";
const C = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80";
const D = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80";
const E = "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=900&q=80";
const F = "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80";
const G = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80";
const H = "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80";
const I = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80";

/* Overlapping work imagery, spills past both edges, rotates sets every 30s. */
const sets: string[][] = [
  [A, B, E, D, G, H],
  [I, F, C, A, B, D],
  [G, F, C, H, E, A],
];

const pos = [
  { rot: -6, z: 1, top: "10%", left: "-8%" },
  { rot: 4, z: 2, top: "2%", left: "11%" },
  { rot: -3, z: 3, top: "14%", left: "30%" },
  { rot: 5, z: 3, top: "0%", left: "49%" },
  { rot: -4, z: 2, top: "12%", left: "68%" },
  { rot: 6, z: 1, top: "4%", left: "87%" },
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
    <div className="relative w-full" style={{ height: "clamp(260px, 38vw, 440px)" }}>
      {pos.map((p, i) => (
        <div
          key={i}
          className="absolute overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
          style={{
            width: "21%",
            aspectRatio: "3 / 4",
            top: p.top,
            left: p.left,
            zIndex: p.z,
            transform: `rotate(${p.rot}deg)`,
            opacity: show ? 1 : 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.zIndex = "10"; e.currentTarget.style.transform = `rotate(0deg) scale(1.05)`; }}
          onMouseLeave={(e) => { e.currentTarget.style.zIndex = String(p.z); e.currentTarget.style.transform = `rotate(${p.rot}deg)`; }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sets[si][i]} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
