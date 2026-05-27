export default function StartScreen({ fishList, onSelectFish }) {
  return (
    <div className="relative flex flex-col w-full h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white select-none overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-48 h-48 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-56 h-56 bg-blue-500/8 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      {/* Fixed header */}
      <div className="relative z-10 shrink-0 pt-12 pb-4 px-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            YM <span className="text-cyan-400">AR</span>
          </h1>
        </div>
        <p className="text-gray-500 text-xs">
          Deniz canlısını seçin · Görsele kamerayı tutun
        </p>
      </div>

      {/* Scrollable fish grid */}
      <div className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-4 pb-6"
           style={{ WebkitOverflowScrolling: "touch" }}>
        <div className="grid grid-cols-2 gap-2.5 max-w-sm mx-auto">
          {fishList.map((fish, i) => (
            <button
              key={fish.id}
              id={`fish-select-${fish.id}`}
              onClick={() => onSelectFish(fish)}
              className={`relative flex flex-col items-center gap-1.5 p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] text-center active:scale-[0.96] active:bg-white/10 transition-all duration-150 cursor-pointer group`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Emoji icon with unique color gradient */}
              <span className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${fish.color} text-2xl shrink-0 group-active:scale-90 transition-transform`}>
                {fish.emoji}
              </span>

              {/* Fish name */}
              <p className="text-[13px] font-semibold text-white/90 leading-tight mt-0.5">
                {fish.name}
              </p>

              {/* Scientific name */}
              <p className="text-[9px] text-gray-500 italic leading-tight truncate w-full">
                {fish.scientificName}
              </p>

              {/* Subtle size badge */}
              <span className="text-[8px] text-gray-600 bg-white/5 px-2 py-0.5 rounded-full mt-0.5">
                {fish.size}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Fixed footer */}
      <div className="relative z-10 shrink-0 pb-6 pt-2 text-center">
        <p className="text-[9px] text-gray-700">
          {fishList.length} tür · iPhone Safari · Chrome · Android
        </p>
      </div>
    </div>
  );
}
