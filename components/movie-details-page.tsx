"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft, Star, Calendar, Clock, Play, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies, getImageUrl } from "@/lib/tmdb"
import { useMovieContext } from "@/context/movie-context"
import { MovieSection } from "./movie-section"
import { LoadingSpinner } from "./loading-spinner"
import Link from "next/link"

interface MovieDetailsPageProps {
  movieId: number
}

export function MovieDetailsPage({ movieId }: MovieDetailsPageProps) {
  const [movie, setMovie] = useState<any>(null)
  const [credits, setCredits] = useState<any>(null)
  const [similarMovies, setSimilarMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { state, dispatch } = useMovieContext()

  const isInList = movie && state.myList.some((m) => m.id === movie.id)

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        const [movieData, creditsData, similarData] = await Promise.all([
          fetchMovieDetails(movieId),
          fetchMovieCredits(movieId),
          fetchSimilarMovies(movieId),
        ])

        setMovie(movieData)
        setCredits(creditsData)
        setSimilarMovies(similarData.results || [])
      } catch (error) {
        console.error("Error loading movie data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMovieData()
  }, [movieId])

  const handleToggleList = () => {
    if (!movie) return

    if (isInList) {
      dispatch({ type: "REMOVE_FROM_LIST", payload: movie.id })
    } else {
      dispatch({ type: "ADD_TO_LIST", payload: movie })
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
          <Link href="/">
            <Button className="bg-netflix-red hover:bg-red-700">Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const director = credits?.crew?.find((person: any) => person.job === "Director")
  const mainCast = credits?.cast?.slice(0, 6) || []

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(movie.backdrop_path) || "/placeholder.svg?height=1080&width=1920"}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex items-center h-full">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-start gap-4 mb-6">
              <Link href="/">
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
              {/* Movie Poster */}
              <div className="lg:col-span-1">
                <div className="relative aspect-[2/3] max-w-sm mx-auto lg:mx-0">
                  <Image
                    src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Movie Details */}
              <div className="lg:col-span-2 space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">{movie.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{movie.vote_average?.toFixed(1)}</span>
                  </div>
                  {movie.release_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  )}
                  {movie.runtime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{movie.runtime} min</span>
                    </div>
                  )}
                </div>

                {movie.genres && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre: any) => (
                      <Badge key={genre.id} variant="secondary" className="bg-gray-700 text-white">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold">
                    <Play className="mr-2 h-5 w-5 fill-current" />
                    Play
                  </Button>

                  <Button
                    size="lg"
                    variant="ghost"
                    onClick={handleToggleList}
                    className="text-white hover:bg-gray-600/50 border border-gray-600"
                  >
                    {isInList ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Remove from List
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-5 w-5" />
                        Add to My List
                      </>
                    )}
                  </Button>
                </div>

                {movie.overview && (
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Overview</h2>
                    <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
                  </div>
                )}

                {director && (
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Director</h2>
                    <p className="text-gray-300">{director.name}</p>
                  </div>
                )}

                {mainCast.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Cast</h2>
                    <div className="flex flex-wrap gap-2">
                      {mainCast.map((actor: any) => (
                        <Badge key={actor.id} variant="outline" className="border-gray-600 text-gray-300">
                          {actor.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="relative z-10 -mt-32 pb-8">
          <MovieSection title="More Like This" movies={similarMovies.slice(0, 12)} />
        </div>
      )}
    </div>
  )
}
