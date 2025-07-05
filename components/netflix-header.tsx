"use client"

import { Search, Bell, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface NetflixHeaderProps {
  onMenuClick: () => void
}

export function NetflixHeader({ onMenuClick }: NetflixHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-netflix-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-white hover:bg-gray-800">
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="text-netflix-red text-2xl font-bold">MOVIEFLIX</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {searchOpen ? (
              <Input
                placeholder="Search movies..."
                className="w-64 bg-gray-800 border-gray-700 text-white"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="text-white hover:bg-gray-800"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
            <Bell className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
