"use client"

import { Home, Heart, Film, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useMovieContext } from "@/context/movie-context"

interface NetflixSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function NetflixSidebar({ isOpen, onClose }: NetflixSidebarProps) {
  const pathname = usePathname()
  const { state } = useMovieContext()

  const menuItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "My List",
      url: "/my-list",
      icon: Heart,
      badge: state.myList.length > 0 ? state.myList.length : undefined,
    },
  ]

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-netflix-black/95 backdrop-blur-sm border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${isOpen ? "lg:relative" : "lg:absolute lg:-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-netflix-red" />
            <span className="text-lg font-semibold text-white">Movie Explorer</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-gray-800 lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                onClick={onClose}
                className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-800 ${
                  pathname === item.url ? "bg-netflix-red text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </div>
                {item.badge && (
                  <span className="bg-netflix-red text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>
                )}
              </Link>
            ))}
          </div>
        </nav>
      </aside>
    </>
  )
}
