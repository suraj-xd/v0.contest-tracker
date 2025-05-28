"use client"

import type { Contest } from "@/types/contest"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ExternalLink, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import AutoSolutionFinder from "./auto-solution-finder"
import YouTubePreview from "./youtube-preview"
import CalendarExportButton from "./calendar-export-button"
import ContestAnalysisButton from "./contest-analysis-button"

interface ContestDialogProps {
  contest: Contest
  isOpen: boolean
  onClose: () => void
  isBookmarked: boolean
  onToggleBookmark: () => void
  solutionLink: string | null
  onSolutionFound?: (contestId: string, youtubeUrl: string) => void
}

export default function ContestDialog({
  contest,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  solutionLink,
  onSolutionFound,
}: ContestDialogProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("")

  // Format contest date
  const formatDate = (date: Date) => {
    return date.toLocaleString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Calculate contest duration
  const getDuration = (start: Date, end: Date) => {
    const durationMs = end.getTime() - start.getTime()
    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours} hours ${minutes} minutes`
  }

  // Update countdown timer
  useEffect(() => {
    if (contest.isPast) return

    const calculateTimeRemaining = () => {
      const now = new Date()
      const timeUntilStart = contest.startTime.getTime() - now.getTime()

      if (timeUntilStart <= 0) {
        setTimeRemaining("Contest has started!")
        return
      }

      const days = Math.floor(timeUntilStart / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeUntilStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeUntilStart % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeUntilStart % (1000 * 60)) / 1000)

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      } else {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
      }
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [contest])

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <Badge variant={getPlatformVariant(contest.platform)} className="mb-2">
              {contest.platform}
            </Badge>
            <div className="flex items-center">
              {contest.isPast && <ContestAnalysisButton contest={contest} />}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleBookmark()
                }}
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <Star className={`h-5 w-5 ${isBookmarked ? "fill-yellow-400 text-yellow-400" : ""}`} />
              </Button>
            </div>
          </div>
          <DialogTitle className="text-xl font-heading">{contest.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Start Time</div>
                  <div className="text-sm text-muted-foreground">{formatDate(contest.startTime)}</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">End Time</div>
                  <div className="text-sm text-muted-foreground">{formatDate(contest.endTime)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-medium">Duration</div>
            <div className="text-sm text-muted-foreground">{getDuration(contest.startTime, contest.endTime)}</div>
          </div>

          {!contest.isPast && (
            <div className="bg-muted p-3 rounded-md text-center">
              <span className="font-medium">Time remaining:</span>{" "}
              <span className="text-primary font-bold">{timeRemaining}</span>
            </div>
          )}

          {contest.description && (
            <div className="space-y-2">
              <div className="font-medium">Description</div>
              {contest.hasHtmlDescription ? (
                <div
                  className="text-sm text-muted-foreground prose prose-sm max-w-none prose-a:text-primary hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: contest.description }}
                />
              ) : (
                <div className="text-sm text-muted-foreground whitespace-pre-line">{contest.description}</div>
              )}
            </div>
          )}

          {solutionLink && (
            <div className="mt-4">
              <div className="font-medium mb-2">Solution</div>
              <YouTubePreview url={solutionLink} />
            </div>
          )}

          {!contest.isPast && (
            <div className="mt-4">
              <div className="font-medium mb-2">Add to Calendar</div>
              <CalendarExportButton contest={contest} />
            </div>
          )}

          {contest.isPast && !solutionLink && onSolutionFound && (
            <div className="mt-4">
              <div className="font-medium mb-2">Find Solution</div>
              <AutoSolutionFinder contest={contest} onSolutionFound={onSolutionFound} />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button asChild>
            <a href={contest.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Go to Contest
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

