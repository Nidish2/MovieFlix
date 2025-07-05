"use client"

import Image from "next/image"
import { Play, Info, Plus, Check, Volume2, VolumeX } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { getImageUrl } from "@/lib/tmdb"
import { useMovieContext } from "@/context/movie-context"
import { useUser } from "@/context/user-context"
import Link from "next/link"
import { useState } from "react"

interface HeroSectionProps {
  movie: any
}

export function HeroSection({ movie }: HeroSectionProps) {
  const { state, dispatch } = useMovieContext()
  const { currentProfile } = useUser()
  const [isMuted, setIsMuted] = useState(true)
  const isInList = state.myList.some((m) => m.id === movie.id)
  const isKidsProfile = currentProfile?.type === "kids"

  const handleToggleList = () => {
    if (isInList) {
      dispatch({ type: "REMOVE_FROM_LIST", payload: movie.id })
    } else {
      dispatch({ type: "ADD_TO_LIST", payload: movie })
    }
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(movie.backdrop_path) || "/placeholder.svg?height=1080&width=1920"}
          alt={movie.title}
          fill
          className="object-cover scale-105 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl space-y-6 animate-fadeInUp">
            {isKidsProfile && (
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  KIDS SAFE
                </span>
                <span className="text-yellow-400 text-sm">⭐ Family Friendly</span>
              </div>
            )}

            <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 text-white">
              <span className="bg-netflix-red px-3 py-1 rounded text-sm font-bold">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
              <span className="text-lg">{new Date(movie.release_date).getFullYear()}</span>
              {!isKidsProfile && <span className="border border-gray-400 px-2 py-1 text-sm">HD</span>}
            </div>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed line-clamp-3 max-w-2xl drop-shadow-lg">
              {movie.overview}
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 font-bold text-lg px-8 py-3 rounded-md transition-all duration-200 hover:scale-105"
              >
                <Play className="mr-3 h-6 w-6 fill-current" />
                {isKidsProfile ? "Watch Now" : "Play"}
              </Button>

              <Link href={`/movie/${movie.id}`}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-gray-600/80 text-white hover:bg-gray-600 font-bold text-lg px-8 py-3 rounded-md transition-all duration-200 hover:scale-105"
                >
                  <Info className="mr-3 h-6 w-6" />
                  More Info
                </Button>
              </Link>

              <Button
                size="lg"
                variant="ghost"
                onClick={handleToggleList}
                className="text-white hover:bg-white/20 border border-white/50 font-bold px-6 py-3 rounded-md transition-all duration-200 hover:scale-105"
              >
                {isInList ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-5 w-5" />
                    My List
                  </>
                )}
              </Button>

              <Button
                size="lg"
                variant="ghost"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:bg-white/20 border border-white/50 h-12 w-12 p-0 rounded-full transition-all duration-200 hover:scale-105"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Age Rating */}
      <div className="absolute bottom-20 right-8 text-white text-right">
        <div className="bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-gray-300">Age Rating</p>
          <p className="text-lg font-bold">{isKidsProfile ? "G" : "PG-13"}</p>
        </div>
      </div>
    </div>
  )
}
