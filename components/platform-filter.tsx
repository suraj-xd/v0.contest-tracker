"use client"

import { Badge } from "@/components/ui/badge"
import { getPlatformIcon } from "@/lib/platform-service"
import Image from "next/image"

interface PlatformFilterProps {
  platforms: string[]
  selectedPlatforms: string[]
  onTogglePlatform: (platform: string) => void
}

export default function PlatformFilter({ platforms, selectedPlatforms, onTogglePlatform }: PlatformFilterProps) {
  // Sort platforms to ensure consistent order
  const sortedPlatforms = [...platforms].sort()

  return (
    <div className="flex flex-wrap gap-2">
      {sortedPlatforms.map((platform) => (
        <Badge
          key={platform}
          variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
          className={`cursor-pointer text-sm px-3 py-1 flex items-center gap-1.5 transition-all ${
            selectedPlatforms.includes(platform) ? "scale-105" : "opacity-70 hover:opacity-100"
          }`}
          onClick={() => onTogglePlatform(platform)}
        >
          <Image
            src={getPlatformIcon(platform) || "/placeholder.svg"}
            alt={platform}
            width={16}
            height={16}
            className="rounded-sm"
          />
          {platform}
        </Badge>
      ))}
    </div>
  )
}

