"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X, Settings } from "lucide-react"
import { useState } from "react"
import { SettingsModal } from "./settings-modal"

interface FilterBarProps {
  filters: {
    genre: string
    year: string
    rating: string
    sortBy: string
  }
  onFiltersChange: (filters: any) => void
  isKidsProfile: boolean
}

const adultGenres = [
  { id: "28", name: "Action" },
  { id: "12", name: "Adventure" },
  { id: "16", name: "Animation" },
  { id: "35", name: "Comedy" },
  { id: "80", name: "Crime" },
  { id: "18", name: "Drama" },
  { id: "14", name: "Fantasy" },
  { id: "27", name: "Horror" },
  { id: "9648", name: "Mystery" },
  { id: "10749", name: "Romance" },
  { id: "878", name: "Sci-Fi" },
  { id: "53", name: "Thriller" },
]

const kidsGenres = [
  { id: "16", name: "Animation" },
  { id: "10751", name: "Family" },
  { id: "35", name: "Comedy" },
  { id: "12", name: "Adventure" },
  { id: "14", name: "Fantasy" },
  { id: "10402", name: "Music" },
]

export function FilterBar({ filters, onFiltersChange, isKidsProfile }: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const genres = isKidsProfile ? kidsGenres : adultGenres

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      genre: "",
      year: "",
      rating: "",
      sortBy: "popularity.desc",
    })
  }

  const hasActiveFilters = filters.genre || filters.year || filters.rating

  return (
    <>
      <div className="space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-600 text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:border-netflix-red/50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 bg-netflix-red text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  {Object.values(filters).filter(Boolean).length}
                </span>
              )}
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}

            <Button
              variant="ghost"
              onClick={() => setShowSettings(true)}
              className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setShowFilters(false)}>
            <div
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-gray-900/95 to-gray-800/95 rounded-xl backdrop-blur-md border border-gray-700 animate-slideIn shadow-2xl mx-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Genre</label>
                  <Select value={filters.genre} onValueChange={(value) => updateFilter("genre", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 transition-colors">
                      <SelectValue placeholder="All Genres" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Genres</SelectItem>
                      {genres.map((genre) => (
                        <SelectItem key={genre.id} value={genre.id}>
                          {genre.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Year</label>
                  <Select value={filters.year} onValueChange={(value) => updateFilter("year", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 transition-colors">
                      <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                      <SelectItem value="2019">2019</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Min Rating</label>
                  <Select value={filters.rating} onValueChange={(value) => updateFilter("rating", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 transition-colors">
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="any">Any Rating</SelectItem>
                      <SelectItem value="6">6.0+</SelectItem>
                      <SelectItem value="7">7.0+</SelectItem>
                      <SelectItem value="8">8.0+</SelectItem>
                      <SelectItem value="9">9.0+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Sort By</label>
                  <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="popularity.desc">Most Popular</SelectItem>
                      <SelectItem value="vote_average.desc">Highest Rated</SelectItem>
                      <SelectItem value="release_date.desc">Newest First</SelectItem>
                      <SelectItem value="title.asc">A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  )
}
