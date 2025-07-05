"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star, Heart, ThumbsUp, ThumbsDown } from "lucide-react"
import { useState } from "react"
import { useMovieContext } from "@/context/movie-context"

interface UserRatingModalProps {
  isOpen: boolean
  onClose: () => void
  movie: any
  currentRating?: number
}

export function UserRatingModal({ isOpen, onClose, movie, currentRating }: UserRatingModalProps) {
  const [rating, setRating] = useState(currentRating || 0)
  const [hoverRating, setHoverRating] = useState(0)
  const { dispatch } = useMovieContext()

  const handleSaveRating = () => {
    dispatch({
      type: "SET_USER_RATING",
      payload: { movieId: movie.id, rating },
    })
    onClose()
  }

  const handleRemoveRating = () => {
    dispatch({
      type: "REMOVE_USER_RATING",
      payload: movie.id,
    })
    setRating(0)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-netflix-black border-gray-800 text-white max-w-md animate-fadeIn">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Rate this Movie</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
            <p className="text-gray-400 text-sm">TMDB Rating: ⭐ {movie.vote_average?.toFixed(1)}</p>
          </div>

          <div className="text-center">
            <p className="text-gray-300 mb-4">Your Rating</p>
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button
                  key={star}
                  className="transition-all duration-200 hover:scale-125"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              {hoverRating || rating ? `${hoverRating || rating}/10` : "Click to rate"}
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSaveRating}
              disabled={rating === 0}
              className="flex-1 bg-netflix-red hover:bg-red-700 transition-all duration-200 hover:scale-105"
            >
              <Heart className="h-4 w-4 mr-2" />
              Save Rating
            </Button>

            {currentRating && (
              <Button
                onClick={handleRemoveRating}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
              >
                Remove
              </Button>
            )}
          </div>

          <div className="text-center">
            <div className="flex justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>Like</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsDown className="h-4 w-4" />
                <span>Dislike</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
