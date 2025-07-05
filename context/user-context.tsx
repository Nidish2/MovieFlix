"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface UserProfile {
  id: string
  name: string
  type: "kids" | "adult" | "guest"
  avatar: string
}

interface UserContextType {
  profiles: UserProfile[]
  currentProfile: UserProfile | null
  showProfileSelector: boolean
  setCurrentProfile: (profile: UserProfile) => void
  setShowProfileSelector: (show: boolean) => void
}

const UserContext = createContext<UserContextType | null>(null)

const defaultProfiles: UserProfile[] = [
  {
    id: "adult",
    name: "Adult",
    type: "adult",
    avatar: "👤",
  },
  {
    id: "kids",
    name: "Kids",
    type: "kids",
    avatar: "🧒",
  },
  {
    id: "guest",
    name: "Guest",
    type: "guest",
    avatar: "👥",
  },
]

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profiles] = useState<UserProfile[]>(defaultProfiles)
  const [currentProfile, setCurrentProfileState] = useState<UserProfile | null>(null)
  const [showProfileSelector, setShowProfileSelector] = useState(true)

  useEffect(() => {
    const savedProfile = localStorage.getItem("currentProfile")
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile)
        setCurrentProfileState(profile)
        setShowProfileSelector(false)
      } catch (error) {
        console.error("Error loading saved profile:", error)
      }
    }
  }, [])

  const setCurrentProfile = (profile: UserProfile) => {
    console.log("Setting profile:", profile) // Debug log
    setCurrentProfileState(profile)
    localStorage.setItem("currentProfile", JSON.stringify(profile))
    setShowProfileSelector(false)
  }

  return (
    <UserContext.Provider
      value={{
        profiles,
        currentProfile,
        showProfileSelector,
        setCurrentProfile,
        setShowProfileSelector,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}
