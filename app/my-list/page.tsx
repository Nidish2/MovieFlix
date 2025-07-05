"use client"

import { MovieCard } from "@/components/movie-card"
import { useMovieContext } from "@/context/movie-context"
import { Heart } from 'lucide-react'
import { MainLayout } from "@/components/main-layout"
import { MyListPage as MyListPageComponent } from "@/components/my-list-page"

export default function Page() {
  return (
    <MainLayout>
      <MyListPageComponent />
    </MainLayout>
  )
}

function MyListPage() {
  const { state } = useMovieContext()

  if (state.myList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <Heart className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your list is empty</h2>
          <p className="text-muted-foreground">Start adding movies to your list by browsing the home page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">My List</h1>
          <p className="text-muted-foreground">
            {state.myList.length} movie{state.myList.length !== 1 ? "s" : ""} in your list
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {state.myList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showLink={false} />
          ))}
        </div>
      </div>
    </div>
  )
}
