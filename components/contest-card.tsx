"use client"

import { useState, useEffect } from "react"
import type { Contest } from "@/types/contest"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Hourglass } from "lucide-react"
import AutoSolutionFinder from "./auto-solution-finder"
import YouTubePreview from "./youtube-preview"
import CalendarExportButton from "./calendar-export-button"
import ContestAnalysisButton from "./contest-analysis-button"
import { getPlatformIcon, getPlatformColor } from "@/lib/platform-service"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useMediaQuery } from "@/hooks/use-media-query"

interface ContestCardProps {
  contest: Contest
  isBookmarked: boolean
  onToggleBookmark: () => void
  showCountdown?: boolean
  solutionLink?: string | null
  onSolutionFound?: (contestId: string, youtubeUrl: string) => void
}

export default function ContestCard({
  contest,
  isBookmarked,
  onToggleBookmark,
  showCountdown = false,
  solutionLink = null,
  onSolutionFound,
}: ContestCardProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("")
  const [isAnimating, setIsAnimating] = useState(false)
  const { resolvedTheme } = useTheme()
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Format contest date
  const formatDate = (date: Date) => {
    if (isMobile) {
      return date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    }
    return date.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Calculate contest duration
  const getDuration = (start: Date, end: Date) => {
    const durationMs = end.getTime() - start.getTime()
    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  // Update countdown timer
  useEffect(() => {
    if (!showCountdown) return

    const calculateTimeRemaining = () => {
      const now = new Date()
      const timeUntilStart = contest.startTime.getTime() - now.getTime()

      if (timeUntilStart <= 0) {
        setTimeRemaining("Started!")
        return
      }

      const days = Math.floor(timeUntilStart / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeUntilStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeUntilStart % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeUntilStart % (1000 * 60)) / 1000)

      if (days > 0) {
        setTimeRemaining(isMobile ? `${days}d ${hours}h` : `${days}d ${hours}h ${minutes}m ${seconds}s`)
      } else {
        setTimeRemaining(isMobile ? `${hours}h ${minutes}m` : `${hours}h ${minutes}m ${seconds}s`)
      }

      // Trigger animation on seconds change
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 500)
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [contest, showCountdown, isMobile])

  // Platform badge variant
  const getPlatformVariant = (platform: string) => {
    switch (platform) {
      case "Codeforces":
        return "default"
      case "CodeChef":
        return "secondary"
      case "LeetCode":
        return "destructive"
      case "AtCoder":
        return "outline"
      default:
        return "default"
    }
  }

  // Get platform color for contest title
  const platformColor = getPlatformColor(contest.platform)

  return (
    <Card
      className={`contest-card overflow-hidden hover:shadow-md transition-all ${isBookmarked ? "border-l-4 border-l-yellow-400" : ""}`}
    >
      <CardHeader className="p-3 pb-0 flex flex-row justify-between items-start space-y-0">
        <Badge variant={getPlatformVariant(contest.platform)} className="flex items-center gap-1.5">
          <Image
            src={getPlatformIcon(contest.platform) || "/placeholder.svg"}
            alt={contest.platform}
            width={16}
            height={16}
          />
          {contest.platform}
        </Badge>
        <div className="flex items-center">
          {contest.isPast && <ContestAnalysisButton contest={contest} />}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleBookmark}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            className="transition-transform duration-200 hover:scale-110 h-8 w-8"
          >
            <Star className={`h-4 w-4 ${isBookmarked ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-3 space-y-3">
        <h3 className="font-heading font-semibold text-base line-clamp-2">
          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary flex items-center gap-1 transition-colors"
            style={{
              color: platformColor,
              // Add text shadow for better contrast in dark mode
              textShadow:
                resolvedTheme === "dark" && contest.platform === "AtCoder" ? "0 0 1px rgba(255,255,255,0.5)" : "none",
            }}
          >
            {contest.title}
            <ExternalLink className="h-3.5 w-3.5 inline opacity-70" />
          </a>
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div>
            <span className="font-medium text-foreground">Starts:</span>
            <br />
            {formatDate(contest.startTime)}
          </div>
          <div>
            <span className="font-medium text-foreground">Duration:</span>
            <br />
            {getDuration(contest.startTime, contest.endTime)}
          </div>
        </div>

        {showCountdown && (
          <div className="bg-muted p-2 rounded-md text-center flex items-center justify-center gap-2">
            <Hourglass className={`h-4 w-4 text-primary ${isAnimating ? "animate-pulse" : ""}`} />
            <span className="font-medium text-xs">Time:</span>{" "}
            <span className={`text-primary font-bold text-sm ${isAnimating ? "scale-105 transition-transform" : ""}`}>
              {timeRemaining}
            </span>
          </div>
        )}

        {solutionLink && (
          <div className="mt-2">
            <YouTubePreview url={solutionLink} />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {!contest.isPast && <CalendarExportButton contest={contest} />}

          {contest.isPast && !solutionLink && onSolutionFound && (
            <AutoSolutionFinder contest={contest} onSolutionFound={onSolutionFound} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

