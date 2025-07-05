export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-netflix-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 animate-fadeIn">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-netflix-red border-t-transparent"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-netflix-red opacity-20"></div>
        </div>
        <div className="text-center">
          <p className="text-white text-xl font-medium">Loading movies...</p>
          <p className="text-gray-400 text-sm mt-2">Getting the best content for you</p>
        </div>
      </div>
    </div>
  )
}
