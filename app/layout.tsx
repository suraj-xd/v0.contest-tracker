import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Space_Grotesk } from "next/font/google"

// Load Space Grotesk font for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Contest Tracker",
  description: "Track programming contests from multiple platforms",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable}`}>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
          forcedTheme={undefined}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'