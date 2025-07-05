"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Volume2, Download, Trash2, User, Bell, Palette, Monitor, Moon } from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState({
    autoplay: true,
    notifications: true,
    downloadQuality: "HD",
    volume: 80,
    subtitles: true,
    language: "en",
    parentalControls: false,
    dataUsage: "standard",
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedSettings = localStorage.getItem("movieflix-settings")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings(parsed)
        console.log("Loaded settings:", parsed)
      } catch (error) {
        console.error("Error loading settings:", error)
      }
    }
  }, [])

  const updateSetting = (key: string, value: any) => {
    console.log("Updating setting:", key, "to:", value)
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem("movieflix-settings", JSON.stringify(newSettings))
  }

  const clearCache = () => {
    try {
      localStorage.removeItem("movieList")
      localStorage.removeItem("userRatings")
      localStorage.removeItem("watchProgress")
      localStorage.removeItem("movieflix-settings")
      console.log("Cache cleared successfully")
      alert("Cache cleared successfully!")
    } catch (error) {
      console.error("Error clearing cache:", error)
      alert("Error clearing cache")
    }
  }

  const handleThemeChange = (newTheme: string) => {
    console.log("Changing theme to:", newTheme)
    setTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-netflix-black border-gray-800 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-netflix-red to-yellow-500 bg-clip-text text-transparent">
            Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-4">
          {/* Appearance */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </h3>
            <div className="flex items-center justify-between">
              <span>Theme</span>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      Dark
                    </div>
                  </SelectItem>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Light
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      System
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Playback */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Playback
            </h3>
            <div className="flex items-center justify-between">
              <span>Autoplay</span>
              <Switch
                checked={settings.autoplay}
                onCheckedChange={(checked) => {
                  console.log("Autoplay changed to:", checked)
                  updateSetting("autoplay", checked)
                }}
              />
            </div>
            <div className="space-y-2">
              <span>Volume: {settings.volume}%</span>
              <Slider
                value={[settings.volume]}
                onValueChange={(value) => {
                  console.log("Volume changed to:", value[0])
                  updateSetting("volume", value[0])
                }}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Subtitles</span>
              <Switch
                checked={settings.subtitles}
                onCheckedChange={(checked) => {
                  console.log("Subtitles changed to:", checked)
                  updateSetting("subtitles", checked)
                }}
              />
            </div>
          </div>

          {/* Downloads */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Download className="h-5 w-5" />
              Downloads
            </h3>
            <div className="flex items-center justify-between">
              <span>Download Quality</span>
              <Select
                value={settings.downloadQuality}
                onValueChange={(value) => {
                  console.log("Download quality changed to:", value)
                  updateSetting("downloadQuality", value)
                }}
              >
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="SD">SD</SelectItem>
                  <SelectItem value="HD">HD</SelectItem>
                  <SelectItem value="4K">4K</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span>Data Usage</span>
              <Select
                value={settings.dataUsage}
                onValueChange={(value) => {
                  console.log("Data usage changed to:", value)
                  updateSetting("dataUsage", value)
                }}
              >
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </h3>
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => {
                  console.log("Notifications changed to:", checked)
                  updateSetting("notifications", checked)
                }}
              />
            </div>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Account
            </h3>
            <div className="flex items-center justify-between">
              <span>Language</span>
              <Select
                value={settings.language}
                onValueChange={(value) => {
                  console.log("Language changed to:", value)
                  updateSetting("language", value)
                }}
              >
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span>Parental Controls</span>
              <Switch
                checked={settings.parentalControls}
                onCheckedChange={(checked) => {
                  console.log("Parental controls changed to:", checked)
                  updateSetting("parentalControls", checked)
                }}
              />
            </div>
          </div>

          {/* Data Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Data Management
            </h3>
            <Button
              onClick={clearCache}
              variant="outline"
              className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200 bg-transparent hover:scale-105"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cache & Data
            </Button>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => {
                console.log("Settings saved")
                onClose()
              }}
              className="flex-1 bg-netflix-red hover:bg-red-700 transition-all duration-200 hover:scale-105"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
