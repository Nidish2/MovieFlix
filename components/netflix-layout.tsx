"use client"

import type React from "react"

import { useState } from "react"
import { NetflixSidebar } from "./netflix-sidebar"
import { NetflixHeader } from "./netflix-header"

interface NetflixLayoutProps {
  children: React.ReactNode
}

export function NetflixLayout({ children }: NetflixLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <NetflixHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <NetflixSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}>
          <div className="pt-16">{children}</div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
