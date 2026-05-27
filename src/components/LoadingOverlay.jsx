export default function LoadingOverlay({ progress, fishName }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm text-white select-none">
      {/* Spinner */}
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-400 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
      </div>

      {/* Text */}
      <p className="text-base font-medium mb-1">
        {fishName || "3D Model"} Yükleniyor
      </p>
      <p className="text-xs text-gray-500 mb-4">Lütfen bekleyin…</p>

      {/* Progress bar */}
      <div className="w-48 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">{Math.round(progress)}%</p>
    </div>
  );
}
