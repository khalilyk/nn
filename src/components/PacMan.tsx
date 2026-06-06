/* Black Pac-Man chasing a black ghost, looping left↔right at the very bottom. */
export default function PacMan() {
  return (
    <div className="relative w-full h-10 overflow-hidden mt-8">
      <div
        className="absolute bottom-0 left-0 flex items-end gap-4"
        style={{ animation: "pac-run 11s linear infinite" }}
      >
        {/* Pac-Man */}
        <div
          className="rounded-full"
          style={{
            width: 26,
            height: 26,
            background: "#0A0A0A",
            animation: "pac-chomp 0.35s linear infinite",
          }}
        />
        {/* Ghost — gap to Pac-Man varies for a real-chase feel */}
        <svg width="24" height="26" viewBox="0 0 24 26" aria-hidden style={{ animation: "ghost-gap 3.7s ease-in-out infinite" }}>
          <path
            d="M2 13a10 10 0 0 1 20 0v11l-3.3-2.2L15.3 24 12 21.8 8.7 24 5.3 21.8 2 24V13Z"
            fill="#0A0A0A"
          />
          <circle cx="8.5" cy="12" r="2.4" fill="#F3F1EC" />
          <circle cx="15.5" cy="12" r="2.4" fill="#F3F1EC" />
        </svg>
      </div>
    </div>
  );
}
