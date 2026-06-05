"use client";

import { useEffect, useState } from "react";

/* Crossfading hospitality backgrounds (barista, cafe, waiter, sushi chef).
   Soft fade + slow Ken-Burns drift between scenes.

   To use real video instead: drop files in /public/videos and swap the
   `scenes` entries to { type: "video", src: "/videos/barista.mp4" }. */
type Scene = { type: "image" | "video"; src: string; pos?: string };

const scenes: Scene[] = [
  { type: "image", src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80", pos: "center 40%" }, // barista / coffee
  { type: "image", src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80", pos: "center 45%" }, // cafe hustle
  { type: "image", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80", pos: "center 55%" }, // waiters / dining room
  { type: "image", src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1600&q=80", pos: "center center" }, // sushi chef
];

export default function HeroMedia({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % scenes.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {scenes.map((s, i) => {
        const on = i === active;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: on ? 1 : 0,
              transition: "opacity 1.6s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {s.type === "video" ? (
              <video
                src={s.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{
                  transform: on ? "scale(1.12)" : "scale(1.05)",
                  transition: "transform 6s ease-out",
                }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={s.src}
                alt=""
                className="w-full h-full object-cover"
                style={{
                  objectPosition: s.pos,
                  transform: on ? "scale(1.12)" : "scale(1.05)",
                  transition: "transform 6s ease-out",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
