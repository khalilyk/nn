"use client";

import { useEffect, useState } from "react";

export default function Greeting() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const h = new Date().getHours();
    const g = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    setGreeting(g);
  }, []);

  return (
    <p
      className="font-editorial italic text-[#0A0A0A]/45 mb-5"
      style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", minHeight: "1.2em" }}
    >
      {greeting}
      {greeting && ", friend,"}
    </p>
  );
}
