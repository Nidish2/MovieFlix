"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, Copy, Check, Download, Share } from "lucide-react"
import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  movie: any
  imdbUrl: string
}

export function QRCodeModal({ isOpen, onClose, movie, imdbUrl }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(imdbUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const handleOpenIMDB = () => {
    window.open(imdbUrl, "_blank", "noopener,noreferrer")
  }

  const handleDownloadQR = () => {
    const svg = document.querySelector("#qr-code-svg")
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)

        const link = document.createElement("a")
        link.download = `${movie.title}-qr-code.png`
        link.href = canvas.toDataURL()
        link.click()
      }

      img.src = "data:image/svg+xml;base64," + btoa(svgData)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: movie.title,
          text: `Check out ${movie.title} on IMDB`,
          url: imdbUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      handleCopy()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-netflix-black border-gray-800 text-white max-w-lg animate-fadeIn">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-netflix-red to-yellow-500 bg-clip-text text-transparent">
            {movie.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-4">
          <div className="text-center">
            <p className="text-gray-400 mb-4 text-lg">Scan QR code to view on IMDB</p>

            <div className="bg-white p-6 rounded-xl inline-block shadow-2xl hover:shadow-netflix-red/20 transition-all duration-300 hover:scale-105">
              <QRCodeSVG
                id="qr-code-svg"
                value={imdbUrl}
                size={250}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
                includeMargin={true}
                imageSettings={{
                  src: "/placeholder.svg?height=40&width=40",
                  x: undefined,
                  y: undefined,
                  height: 40,
                  width: 40,
                  excavate: true,
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleOpenIMDB}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open IMDB
            </Button>

            <Button
              onClick={handleCopy}
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 bg-transparent transition-all duration-200 hover:scale-105"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>

            <Button
              onClick={handleDownloadQR}
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 bg-transparent transition-all duration-200 hover:scale-105"
            >
              <Download className="h-4 w-4 mr-2" />
              Download QR
            </Button>

            <Button
              onClick={handleShare}
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 bg-transparent transition-all duration-200 hover:scale-105"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="text-center text-sm text-gray-400 bg-gray-900/50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span>Rating: ⭐ {movie.vote_average?.toFixed(1)}</span>
              <span>Year: {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">Scan with any QR code reader to open IMDB page</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
