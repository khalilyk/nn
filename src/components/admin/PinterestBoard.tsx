import { getMoodboardPins, pickRandom } from "@/lib/pinterest";
import MoodboardGrid from "./MoodboardGrid";

/* Full-width moodboard: 6 random pins from the board, re-rolled on every load
   (dashboard is force-dynamic + the fetch is no-store). */
export default async function PinterestBoard({
  board,
  href,
}: {
  board: string;   // e.g. "khalilyk/not-normal"
  href: string;    // public board URL
}) {
  const all = await getMoodboardPins(board);
  const pins = pickRandom(all, 6);

  return (
    <div className="rounded-3xl bg-white shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[13px] font-semibold text-[#0A0A0A]">Pinterest · Moodboard</h2>
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-[12px] text-black/45 hover:text-black transition-colors">Open board ↗</a>
      </div>

      {pins.length === 0 ? (
        <p className="text-[12px] text-black/40">Couldn’t load the board right now — open it directly above.</p>
      ) : (
        <MoodboardGrid pins={pins} />
      )}
    </div>
  );
}
