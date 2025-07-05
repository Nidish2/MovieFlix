"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/user-context"
import Link from "next/link"

interface TopNavigationProps {
  onProfileClick: () => void
}

export function TopNavigation({ onProfileClick }: TopNavigationProps) {
  const { currentProfile } = useUser()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-netflix-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <div className="text-netflix-red text-2xl font-bold hover:text-red-400 transition-colors duration-300">
              MOVIEFLIX
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            className="text-white hover:bg-gray-800 flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={onProfileClick}
          >
            <span className="text-lg">{currentProfile?.avatar}</span>
            <span className="hidden sm:inline">{currentProfile?.name}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
