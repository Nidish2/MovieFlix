"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Play, Plus, Check, Info, QrCode, Heart, ThumbsUp, ThumbsDown } from "lucide-react"
import { getImageUrl, getIMDBUrl } from "@/lib/tmdb"
import { useMovieContext } from "@/context/movie-context"
import { useState } from "react"
import { QRCodeModal } from "./qr-code-modal"
import { UserRatingModal } from "./user-rating-modal"

interface MovieCardProps {
  movie: any
  size?: "small" | "medium" | "large"
  showMatchPercentage?: boolean
}

export function MovieCard({ movie, size = "medium", showMatchPercentage = false }: MovieCardProps) {
  const { state, dispatch } = useMovieContext()
  const [showQR, setShowQR] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const isInList = state.myList.some((m) => m.id === movie.id)
  const userRating = state.userRatings[movie.id]
  const watchProgress = state.watchProgress[movie.id] || 0

  const handleToggleList = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Toggle list clicked for movie:", movie.title)

    if (isInList) {
      dispatch({ type: "REMOVE_FROM_LIST", payload: movie.id })
      console.log("Removed from list:", movie.title)
    } else {
      dispatch({ type: "ADD_TO_LIST", payload: movie })
      console.log("Added to list:", movie.title)
    }
  }

  const handleQRCode = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("QR Code clicked for:", movie.title)
    setShowQR(true)
  }

  const handleRating = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Rating clicked for:", movie.title)
    setShowRating(true)
  }

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Play clicked for:", movie.title)
    const newProgress = Math.min(watchProgress + 15, 100)
    dispatch({
      type: "UPDATE_WATCH_PROGRESS",
      payload: { movieId: movie.id, progress: newProgress },
    })
    alert(`Playing ${movie.title}! Progress: ${newProgress}%`)
  }

  const sizeClasses = {
    small: "w-32 h-48",
    medium: "w-48 h-72",
    large: "w-64 h-96",
  }

  return (
    <>
      <div
        className={`${sizeClasses[size]} group cursor-pointer transition-all duration-500 hover:scale-110 hover:z-20 relative movie-card`}
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-800 shadow-2xl hover:shadow-red-500/50 transition-all duration-500">
          <Image
            src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 128px, (max-width: 1200px) 192px, 256px"
          />

          {/* Watch Progress Bar */}
          {watchProgress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-600">
              <div
                className="h-full bg-netflix-red transition-all duration-300"
                style={{ width: `${watchProgress}%` }}
              />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

          {/* Content Overlay */}
          <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 drop-shadow-lg">{movie.title}</h3>

            <div className="flex items-center gap-1 mb-3">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-xs font-medium">{movie.vote_average?.toFixed(1)}</span>
              {userRating && (
                <>
                  <span className="text-gray-300 text-xs mx-1">•</span>
                  <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                  <span className="text-white text-xs">{userRating}/10</span>
                </>
              )}
              <span className="text-gray-300 text-xs ml-2">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : ""}
              </span>
            </div>

            {/* Match Percentage */}
            {showMatchPercentage && movie.matchPercentage && (
              <div className="mb-2">
                <span className="text-green-400 text-xs font-bold bg-green-400/20 px-2 py-1 rounded-full">
                  {movie.matchPercentage}% Match
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                className="bg-white text-black hover:bg-gray-200 h-8 w-8 rounded-full transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
                onClick={handlePlay}
                title="Play"
              >
                <Play className="h-3 w-3 fill-current" />
              </button>

              <button
                className="text-white hover:bg-white/20 h-8 w-8 border border-white/50 rounded-full transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
                onClick={handleToggleList}
                title={isInList ? "Remove from list" : "Add to list"}
              >
                {isInList ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              </button>

              <button
                className="text-white hover:bg-white/20 h-8 w-8 border border-white/50 rounded-full transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
                onClick={handleRating}
                title="Rate this movie"
              >
                {userRating ? <ThumbsUp className="h-3 w-3" /> : <ThumbsDown className="h-3 w-3" />}
              </button>

              <button
                className="text-white hover:bg-white/20 h-8 w-8 border border-white/50 rounded-full transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
                onClick={handleQRCode}
                title="QR Code"
              >
                <QrCode className="h-3 w-3" />
              </button>

              <Link href={`/movie/${movie.id}`}>
                <button
                  className="text-white hover:bg-white/20 h-8 w-8 border border-white/50 rounded-full transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
                  title="More info"
                >
                  <Info className="h-3 w-3" />
                </button>
              </Link>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-netflix-red text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 font-medium shadow-lg">
            ⭐ {movie.vote_average?.toFixed(1)}
          </div>

          {/* Top Badge */}
          {movie.vote_average > 8 && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold shadow-lg animate-pulse">
              TOP
            </div>
          )}

          {/* Match Badge */}
          {showMatchPercentage && movie.matchPercentage > 80 && (
            <div className="absolute top-8 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
              {movie.matchPercentage}%
            </div>
          )}
        </div>
      </div>

      <QRCodeModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        movie={movie}
        imdbUrl={getIMDBUrl(movie.imdb_id || `tt${movie.id}`)}
      />

      <UserRatingModal
        isOpen={showRating}
        onClose={() => setShowRating(false)}
        movie={movie}
        currentRating={userRating}
      />
    </>
  )
}
