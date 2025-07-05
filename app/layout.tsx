import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { MovieProvider } from "@/context/movie-context"
import { UserProvider } from "@/context/user-context"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MovieFlix - Premium Streaming Experience",
  description: "Discover movies and TV shows with advanced filtering and user profiles",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <UserProvider>
            <MovieProvider>{children}</MovieProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
