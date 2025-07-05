"use client"

import { MovieCard } from "./movie-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"

interface MovieSectionProps {
  title: string
  movies: any[]
  showMatchPercentage?: boolean
}

export function MovieSection({ title, movies, showMatchPercentage = false }: MovieSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll)
      handleScroll()
      return () => scrollElement.removeEventListener("scroll", handleScroll)
    }
  }, [movies])

  if (!movies || movies.length === 0) return null

  return (
    <div className="group relative px-4 lg:px-8 mb-8 animate-fadeIn">
      <h2 className="text-2xl font-bold text-white mb-4 animate-slideIn">{title}</h2>

      <div className="relative">
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 h-12 w-12 shadow-2xl hover:scale-110"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 h-12 w-12 shadow-2xl hover:scale-110"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie, index) => (
            <div key={`${movie.id}-${index}`} className="flex-none">
              <MovieCard movie={movie} showMatchPercentage={showMatchPercentage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
