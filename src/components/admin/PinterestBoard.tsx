import { getMoodboardPins, pickRandom } from "@/lib/pinterest";

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
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
          {pins.map((p) => (
            <a
              key={p.id}
              href={`https://www.pinterest.com/pin/${p.id}/`}
              target="_blank"
              rel="noopener noreferrer"
              title="Open on Pinterest"
              className="group relative block aspect-[3/4] overflow-hidden rounded-xl"
              style={{ backgroundColor: p.color }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
