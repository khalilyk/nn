"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

const pos = [
  { rot: -6, z: 1, top: "10%", left: "-8%" },
  { rot: 4, z: 2, top: "2%", left: "11%" },
  { rot: -3, z: 3, top: "14%", left: "30%" },
  { rot: 5, z: 3, top: "0%", left: "49%" },
  { rot: -4, z: 2, top: "12%", left: "68%" },
  { rot: 6, z: 1, top: "4%", left: "87%" },
];

export default function OverlapImages({ images }: { images?: string[] }) {
  const gallery = (images && images.length ? images : DEFAULT_CONTENT.menu.gallery!).filter(Boolean);
  // build rotating sets of 6, wrapping the gallery so each slot is filled
  const sets: string[][] = gallery.length <= 6
    ? [Array.from({ length: 6 }, (_, i) => gallery[i % gallery.length])]
    : Array.from({ length: Math.ceil(gallery.length / 6) }, (_, s) =>
        Array.from({ length: 6 }, (_, i) => gallery[(s * 6 + i) % gallery.length]));

  const [si, setSi] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sets.length < 2) return;
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setSi((s) => (s + 1) % sets.length);
        setShow(true);
      }, 600);
    }, 30000);
    return () => clearInterval(id);
  }, [sets.length]);

  return (
    <div className="relative w-full" style={{ height: "clamp(260px, 38vw, 440px)" }}>
      {pos.map((p, i) => (
        <div
          key={i}
          className="absolute overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
          style={{
            height: "84%",
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
          <Image
            src={(sets[si] ?? sets[0])[i]}
            alt=""
            fill
            sizes="(max-width: 768px) 34vw, 20vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
