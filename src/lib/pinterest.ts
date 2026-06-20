/* Fetches a Pinterest board's pins via the public widget JSON endpoint
   (the same data source pinit.js uses). Server-side, never cached, so each
   dashboard load can show a fresh random selection. */

export type MoodPin = { id: string; img: string; color: string };

export async function getMoodboardPins(board: string): Promise<MoodPin[]> {
  try {
    const res = await fetch(`https://widgets.pinterest.com/v3/pidgets/boards/${board}/pins/`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const pins = (data?.data?.pins ?? []) as Array<Record<string, unknown>>;
    return pins
      .map((p) => {
        const imgs = (p.images ?? {}) as Record<string, { url?: string }>;
        const img = imgs["564x"]?.url || imgs["237x"]?.url || imgs["236x"]?.url || "";
        return { id: String(p.id ?? ""), img, color: String(p.dominant_color ?? "#E8E5DC") };
      })
      .filter((p) => p.img && p.id);
  } catch {
    return [];
  }
}

/** Fisher–Yates shuffle, then take n. */
export function pickRandom<T>(arr: T[], n: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}
