"use client"

import { Home, Heart, Film, User, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMovieContext } from "@/context/movie-context"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"

interface HoverSidebarProps {
  isVisible: boolean
  onVisibilityChange: (visible: boolean) => void
}

export function HoverSidebar({ isVisible, onVisibilityChange }: HoverSidebarProps) {
  const pathname = usePathname()
  const { state } = useMovieContext()
  const { currentProfile, setShowProfileSelector } = useUser()

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

  const handleProfileSwitch = () => {
    setShowProfileSelector(true)
    onVisibilityChange(false)
  }

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-netflix-black/95 backdrop-blur-sm border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        onMouseLeave={() => onVisibilityChange(false)}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-netflix-red" />
            <span className="text-lg font-semibold text-white">MovieFlix</span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{currentProfile?.avatar}</div>
            <div>
              <p className="text-white font-medium">{currentProfile?.name}</p>
              <p className="text-gray-400 text-sm capitalize">{currentProfile?.type} Profile</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                onClick={() => onVisibilityChange(false)}
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

          <div className="mt-8 pt-4 border-t border-gray-800 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={handleProfileSwitch}
            >
              <User className="h-5 w-5 mr-3" />
              Switch Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Button>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => onVisibilityChange(false)} />
      )}
    </>
  )
}
