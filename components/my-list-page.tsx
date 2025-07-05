"use client"

import { useMovieContext } from "@/context/movie-context"
import { MovieCard } from "./movie-card"
import { Heart, ArrowLeft, Download, Share } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function MyListPage() {
  const { state } = useMovieContext()

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold">My List</h1>
              <p className="text-gray-400 mt-2">
                {state.myList.length} movie{state.myList.length !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>

          {state.myList.length > 0 && (
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                <Share className="h-4 w-4 mr-2" />
                Share List
              </Button>
            </div>
          )}
        </div>

        {state.myList.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-fadeIn">
            <Heart className="h-24 w-24 text-gray-600 mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-gray-400">Your list is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md text-lg">
              Start building your personal watchlist by adding movies you want to watch later.
            </p>
            <Link href="/">
              <Button className="bg-netflix-red hover:bg-red-700 text-lg px-8 py-3">
                Browse Movies
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 animate-fadeIn">
            {state.myList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} size="small" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
