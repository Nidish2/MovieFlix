"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { MovieSection } from "./movie-section"
import { HeroSection } from "./hero-section"
import { FilterBar } from "./filter-bar"
import { SearchBar } from "./search-bar"
import { useUser } from "@/context/user-context"
import { useMovieContext } from "@/context/movie-context"
import {
  fetchNowPlaying,
  fetchPopular,
  fetchTopRated,
  fetchUpcoming,
  fetchKidsContent,
  fetchMoviesByGenre,
  fetchTrendingMovies,
  calculateMatchPercentage,
} from "@/lib/tmdb"

export function HomePage() {
  const [sections, setSections] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    rating: "",
    sortBy: "popularity.desc",
  })
  const { currentProfile } = useUser()
  const { state } = useMovieContext()

  const isKidsProfile = currentProfile?.type === "kids"

  const userPreferences = useMemo(() => {
    const favoriteGenres = state.myList.reduce((genres: number[], movie: any) => {
      return [...genres, ...(movie.genre_ids || [])]
    }, [])

    const uniqueGenres = [...new Set(favoriteGenres)]
    const avgRating =
      state.myList.length > 0
        ? state.myList.reduce((sum: number, movie: any) => sum + movie.vote_average, 0) / state.myList.length
        : 7

    return {
      favoriteGenres: uniqueGenres.slice(0, 3),
      minRating: avgRating,
      preferredYears: [2023, 2024, 2025],
    }
  }, [state.myList])

  const loadMovies = useCallback(async () => {
    setLoading(true)
    try {
      if (isKidsProfile) {
        const [kidsMovies, familyMovies, animatedMovies, educationalMovies] = await Promise.all([
          fetchKidsContent(),
          fetchMoviesByGenre(10751),
          fetchMoviesByGenre(16),
          fetchMoviesByGenre(99),
        ])

        setSections({
          featured: kidsMovies.results?.slice(0, 15) || [],
          family: familyMovies.results?.slice(0, 15) || [],
          animated: animatedMovies.results?.slice(0, 15) || [],
          educational: educationalMovies.results?.slice(0, 10) || [],
        })
      } else {
        const [nowPlaying, popular, topRated, upcoming, trending, actionMovies, comedyMovies, dramaMovies] =
          await Promise.all([
            fetchNowPlaying(1),
            fetchPopular(1),
            fetchTopRated(1),
            fetchUpcoming(1),
            fetchTrendingMovies(),
            fetchMoviesByGenre(28),
            fetchMoviesByGenre(35),
            fetchMoviesByGenre(18),
          ])

        const recommendedMovies =
          popular.results
            ?.map((movie: any) => ({
              ...movie,
              matchPercentage: calculateMatchPercentage(movie, userPreferences),
            }))
            .sort((a: any, b: any) => b.matchPercentage - a.matchPercentage) || []

        setSections({
          trending: trending.results?.slice(0, 20) || [],
          nowPlaying: nowPlaying.results?.slice(0, 20) || [],
          popular: popular.results?.slice(0, 25) || [],
          topRated: topRated.results?.slice(0, 20) || [],
          upcoming: upcoming.results?.slice(0, 15) || [],
          recommended: recommendedMovies.slice(0, 15),
          action: actionMovies.results?.slice(0, 15) || [],
          comedy: comedyMovies.results?.slice(0, 15) || [],
          drama: dramaMovies.results?.slice(0, 15) || [],
        })
      }
    } catch (error) {
      console.error("Error loading movies:", error)
    } finally {
      setLoading(false)
    }
  }, [isKidsProfile, userPreferences])

  useEffect(() => {
    loadMovies()
  }, [loadMovies])

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results)
    setIsSearching(true)
  }

  const handleClearSearch = () => {
    setSearchResults([])
    setIsSearching(false)
  }

  const filteredSections = useMemo(() => {
    if (!filters.genre && !filters.year && !filters.rating) {
      return sections
    }

    const filterMovies = (movies: any[]) => {
      return movies.filter((movie) => {
        if (filters.genre && !movie.genre_ids?.includes(Number.parseInt(filters.genre))) {
          return false
        }
        if (filters.year && new Date(movie.release_date).getFullYear().toString() !== filters.year) {
          return false
        }
        if (filters.rating && movie.vote_average < Number.parseFloat(filters.rating)) {
          return false
        }
        return true
      })
    }

    const filtered: any = {}
    Object.keys(sections).forEach((key) => {
      filtered[key] = filterMovies(sections[key] || [])
    })
    return filtered
  }, [sections, filters])

  const heroMovie = isKidsProfile
    ? filteredSections.featured?.[0]
    : filteredSections.trending?.[0] || filteredSections.popular?.[0]

  // Show search results if searching
  if (isSearching && searchResults.length > 0) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <div className="pt-20 px-4 lg:px-8 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Search Results</h1>
            <SearchBar onSearchResults={handleSearchResults} onClearSearch={handleClearSearch} />
          </div>
          <MovieSection title={`Found ${searchResults.length} movies`} movies={searchResults} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {heroMovie && <HeroSection movie={heroMovie} />}

      <div className="relative z-10 -mt-32 space-y-8 pb-8">
        <div className="px-4 lg:px-8 space-y-6">
          <SearchBar onSearchResults={handleSearchResults} onClearSearch={handleClearSearch} />
          <FilterBar filters={filters} onFiltersChange={setFilters} isKidsProfile={isKidsProfile} />
        </div>

        {isKidsProfile ? (
          <>
            <MovieSection title="🌟 Featured for Kids" movies={filteredSections.featured || []} />
            <MovieSection title="👨‍👩‍👧‍👦 Family Movies" movies={filteredSections.family || []} />
            <MovieSection title="🎨 Animated Adventures" movies={filteredSections.animated || []} />
            <MovieSection title="📚 Educational & Fun" movies={filteredSections.educational || []} />
          </>
        ) : (
          <>
            <MovieSection title="🔥 Trending Now" movies={filteredSections.trending || []} />
            <MovieSection
              title="🎯 Recommended for You"
              movies={filteredSections.recommended || []}
              showMatchPercentage
            />
            <MovieSection title="🎬 Now Playing" movies={filteredSections.nowPlaying || []} />
            <MovieSection title="⭐ Popular Movies" movies={filteredSections.popular || []} />
            <MovieSection title="🏆 Top Rated" movies={filteredSections.topRated || []} />
            <MovieSection title="🔜 Coming Soon" movies={filteredSections.upcoming || []} />
            <MovieSection title="💥 Action Movies" movies={filteredSections.action || []} />
            <MovieSection title="😂 Comedy Movies" movies={filteredSections.comedy || []} />
            <MovieSection title="🎭 Drama Movies" movies={filteredSections.drama || []} />
          </>
        )}
      </div>
    </div>
  )
}
