"use client"

import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"

export function ProfileSelector() {
  const { profiles, showProfileSelector, setCurrentProfile } = useUser()

  if (!showProfileSelector) {
    return null
  }

  const handleProfileSelect = (profile: any) => {
    console.log("Profile clicked:", profile) // Debug log
    setCurrentProfile(profile)
  }

  return (
    <div className="fixed inset-0 bg-netflix-black z-50 flex items-center justify-center p-4">
      <div className="text-center space-y-12 w-full max-w-6xl">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white">Who's watching?</h1>
          <p className="text-gray-400 text-xl">Select your profile to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center max-w-4xl mx-auto">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="group cursor-pointer transition-all duration-500 hover:scale-110"
              onClick={() => handleProfileSelect(profile)}
            >
              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center space-y-6 hover:bg-gray-700/80 hover:border-netflix-red/50 transition-all duration-300 hover:shadow-2xl hover:shadow-netflix-red/20">
                <div className="text-8xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {profile.avatar}
                </div>
                <div className="space-y-3">
                  <h3 className="text-white text-2xl font-bold group-hover:text-netflix-red transition-colors duration-300">
                    {profile.name}
                  </h3>
                  <p className="text-gray-400 text-base">
                    {profile.type === "kids"
                      ? "Safe for children"
                      : profile.type === "adult"
                        ? "Full access"
                        : "Limited access"}
                  </p>
                </div>
                <Button
                  className="w-full bg-netflix-red hover:bg-red-700 text-white font-semibold py-3 text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleProfileSelect(profile)
                  }}
                >
                  Select Profile
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-gray-500 text-sm">
          <p>You can change your profile anytime from the menu</p>
        </div>
      </div>
    </div>
  )
}
