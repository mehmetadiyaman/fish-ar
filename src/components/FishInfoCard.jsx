import { useState } from "react";

/**
 * Minimal bilgi kartı — AR sahnesinde marker bulunduğunda gösterilir.
 * Ekranda çok yer kaplamaz, kapatılabilir, tekrar açılabilir.
 */
export default function FishInfoCard({ fish, visible }) {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (!visible) return null;

  // Dismissed state: sadece küçük bir "i" butonu göster
  if (dismissed) {
    return (
      <button
        id="fish-info-toggle"
        onClick={() => setDismissed(false)}
        className="absolute top-4 right-4 z-50 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 active:scale-90 transition-transform cursor-pointer"
        aria-label="Bilgi göster"
      >
        <span className="text-white/80 text-sm font-bold">i</span>
      </button>
    );
  }

  return (
    <div className="absolute top-4 right-4 z-50 max-w-[160px] select-none">
      <div className="relative bg-black/50 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
        {/* Header — always visible */}
        <button
          id="fish-info-card"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 w-full px-3 py-2 text-left cursor-pointer active:bg-white/5 transition-colors"
        >
          <span className="text-lg shrink-0">{fish.emoji}</span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-white truncate leading-tight">{fish.name}</p>
            <p className="text-[8px] text-gray-400 italic truncate leading-tight">{fish.scientificName}</p>
          </div>
          {/* Close/dismiss button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(true);
            }}
            className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-500 cursor-pointer"
            aria-label="Kapat"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </button>

        {/* Expandable detail — small stats */}
        {expanded && (
          <div className="px-3 pb-2.5 pt-0.5 border-t border-white/5">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
              <InfoStat label="Boyut" value={fish.size} />
              <InfoStat label="Ağırlık" value={fish.weight} />
              <InfoStat label="Derinlik" value={fish.depth} />
              <InfoStat label="Beslenme" value={fish.diet} />
            </div>

            {/* Habitat */}
            <div className="mt-1.5 flex items-center gap-1">
              <span className="text-[7px] text-gray-600 uppercase tracking-wider">Habitat</span>
              <span className="text-[9px] text-gray-400">{fish.habitat}</span>
            </div>

            {/* Description */}
            <p className="text-[8px] text-gray-500 leading-relaxed mt-1.5">
              {fish.description}
            </p>
          </div>
        )}
      </div>

      {/* Expand hint */}
      {!expanded && (
        <p className="text-[7px] text-white/30 text-center mt-1">dokunarak aç</p>
      )}
    </div>
  );
}

function InfoStat({ label, value }) {
  return (
    <div>
      <p className="text-[7px] text-gray-600 uppercase tracking-wider leading-none">{label}</p>
      <p className="text-[9px] text-gray-300 leading-tight">{value}</p>
    </div>
  );
}
