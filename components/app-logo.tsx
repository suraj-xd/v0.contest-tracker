"use client"

import { Trophy } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AppLogoProps {
  className?: string
}

export default function AppLogo({ className }: AppLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <div className="relative w-8 h-8 flex items-center justify-center bg-primary rounded-lg text-primary-foreground">
        <Trophy className="h-5 w-5" />
      </div>
      <span className={cn("font-bold text-xl md:text-2xl", className)}>Contest Tracker</span>
    </Link>
  )
}

