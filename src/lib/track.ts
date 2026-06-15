/** Fire-and-forget analytics event (client-side). Safe no-op on failure. */
export function track(type: string, label?: string) {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({ type, label, path: window.location.pathname });
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon?.("/api/track", blob)) return;
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
  } catch {
    /* ignore */
  }
}
