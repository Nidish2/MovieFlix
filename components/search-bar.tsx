"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchMovies } from "@/lib/tmdb"

interface SearchBarProps {
  onSearchResults: (results: any[]) => void
  onClearSearch: () => void
}

export function SearchBar({ onSearchResults, onClearSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim().length > 2) {
        setIsSearching(true)
        try {
          const results = await searchMovies(query)
          onSearchResults(results.results || [])
        } catch (error) {
          console.error("Search error:", error)
          onSearchResults([])
        } finally {
          setIsSearching(false)
        }
      } else if (query.trim().length === 0) {
        onClearSearch()
      }
    }

    const debounceTimer = setTimeout(handleSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [query, onSearchResults, onClearSearch])

  const handleClear = () => {
    setQuery("")
    onClearSearch()
  }

  return (
    <div className="relative max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white focus:ring-netflix-red focus:border-netflix-red transition-all duration-200 hover:bg-gray-700"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {isSearching && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-netflix-red border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}
