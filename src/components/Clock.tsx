"use client";

import { useEffect, useState } from "react";

/** Live local date/time stamp. Ticks every second in "time" mode; refreshes
 *  each minute in "date" mode. Renders nothing until mounted to avoid a
 *  hydration mismatch. */
export default function Clock({ className = "", mode = "time" }: { className?: string; mode?: "time" | "date" }) {
  const [val, setVal] = useState<string>("");

  useEffect(() => {
    const fmt = () =>
      mode === "date"
        ? new Date().toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" })
        : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    setVal(fmt());
    const id = setInterval(() => setVal(fmt()), mode === "date" ? 60000 : 1000);
    return () => clearInterval(id);
  }, [mode]);

  return (
    <span className={className} suppressHydrationWarning>
      {val}
    </span>
  );
}
