"use client"

import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function CalendarLegend() {
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-4 sm:mb-6 text-[0.65rem] sm:text-xs">
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-primary/10 rounded"></div>
        <span>Upcoming</span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-muted rounded"></div>
        <span>Past</span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="w-2 sm:w-3 h-2 sm:h-3 border-l-2 border-l-yellow-400 bg-primary/10 rounded"></div>
        <span>Bookmarked</span>
      </div>
      {!isMobile && (
        <>
          <div className="flex items-center gap-1 sm:gap-2">
            <Badge variant="outline" className="h-3 px-1 text-[0.6rem]">
              Platform
            </Badge>
            <span>Platform</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-red-500 text-xs">•</span>
            <span>Has Solution</span>
          </div>
        </>
      )}
    </div>
  )
}

