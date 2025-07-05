"use client"

import { Button } from "@/components/ui/button"
import { Heart, HeartOff } from "lucide-react"
import { useMovieContext } from "@/context/movie-context"

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  overview?: string
  release_date?: string
}

interface AddToListButtonProps {
  movie: Movie
}

export function AddToListButton({ movie }: AddToListButtonProps) {
  const { state, dispatch } = useMovieContext()

  const isInList = state.myList.some((m) => m.id === movie.id)

  const handleToggle = () => {
    if (isInList) {
      dispatch({ type: "REMOVE_FROM_LIST", payload: movie.id })
    } else {
      dispatch({ type: "ADD_TO_LIST", payload: movie })
    }
  }

  return (
    <Button onClick={handleToggle} variant={isInList ? "destructive" : "default"} className="w-full sm:w-auto">
      {isInList ? (
        <>
          <HeartOff className="mr-2 h-4 w-4" />
          Remove from My List
        </>
      ) : (
        <>
          <Heart className="mr-2 h-4 w-4" />
          Add to My List
        </>
      )}
    </Button>
  )
}
