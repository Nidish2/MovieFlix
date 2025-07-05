"use client"

import type React from "react"
import { useState } from "react"
import { HoverSidebar } from "./hover-sidebar"
import { TopNavigation } from "./top-navigation"
import { useUser } from "@/context/user-context"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const { currentProfile } = useUser()

  if (!currentProfile) {
    return null // Profile selector will handle this
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <TopNavigation onProfileClick={() => {}} />

      <HoverSidebar isVisible={sidebarVisible} onVisibilityChange={setSidebarVisible} />

      <main className="relative">
        <div className="pt-16">{children}</div>
      </main>

      {/* Hover trigger area */}
      <div className="fixed left-0 top-0 w-4 h-full z-40" onMouseEnter={() => setSidebarVisible(true)} />
    </div>
  )
}
