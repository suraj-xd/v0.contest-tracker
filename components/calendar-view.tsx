"use client"

import { useState, useEffect } from "react"
import type { Contest } from "@/types/contest"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import ContestDialog from "./contest-dialog"
import CalendarLegend from "./calendar-legend"
import { useMediaQuery } from "@/hooks/use-media-query"

interface CalendarViewProps {
  contests: Contest[]
  selectedPlatforms: string[]
  bookmarkedContests: string[]
  onToggleBookmark: (contestId: string) => void
  solutionLinks: Array<{ contestId: string; youtubeUrl: string }>
  onSolutionFound?: (contestId: string, youtubeUrl: string) => void
}

export default function CalendarView({
  contests,
  selectedPlatforms,
  bookmarkedContests,
  onToggleBookmark,
  solutionLinks,
  onSolutionFound,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<Date[]>([])
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Filter contests based on selected platforms
  const filteredContests =
    selectedPlatforms.length === 0
      ? contests
      : contests.filter((contest) => selectedPlatforms.includes(contest.platform))

  // Generate calendar days for the current month
  useEffect(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()

    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek
    const prevMonthLastDay = new Date(year, month, 0).getDate()

    const days: Date[] = []

    // Add days from previous month
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i))
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    // Add days from next month to complete the grid (6 rows of 7 days)
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i))
    }

    setCalendarDays(days)
  }, [currentDate])

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Navigate to current month
  const goToCurrentMonth = () => {
    setCurrentDate(new Date())
  }

  // Format month and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Check if a date is in the current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  // Get contests for a specific day
  const getContestsForDay = (date: Date) => {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    return filteredContests.filter((contest) => {
      // Contest starts on this day
      const contestStartsToday = contest.startTime >= startOfDay && contest.startTime <= endOfDay

      // Contest ends on this day
      const contestEndsToday = contest.endTime >= startOfDay && contest.endTime <= endOfDay

      // Contest spans over this day
      const contestSpansOverDay = contest.startTime < startOfDay && contest.endTime > endOfDay

      return contestStartsToday || contestEndsToday || contestSpansOverDay
    })
  }

  // Get solution link for a contest
  const getSolutionLink = (contestId: string) => {
    const link = solutionLinks.find((link) => link.contestId === contestId)
    return link ? link.youtubeUrl : null
  }

  // Handle contest click
  const handleContestClick = (contest: Contest) => {
    setSelectedContest(contest)
    setDialogOpen(true)
  }

  // Get abbreviated weekday names for mobile
  const getWeekdayNames = () => {
    if (isMobile) {
      return ["S", "M", "T", "W", "T", "F", "S"]
    }
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  }

  return (
    <div className="space-y-4">
      <CalendarLegend />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-base sm:text-lg md:text-xl">{formatMonthYear(currentDate)}</CardTitle>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={goToCurrentMonth} className="mx-auto mt-2 flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" />
            <span>Today</span>
          </Button>
        </CardHeader>
        <CardContent className="p-1 sm:p-2 md:p-4">
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Weekday headers */}
            {getWeekdayNames().map((day) => (
              <div key={day} className="text-center font-medium text-xs sm:text-sm py-1 sm:py-2">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              const dayContests = getContestsForDay(day)
              const hasContests = dayContests.length > 0

              return (
                <div
                  key={index}
                  className={`min-h-[60px] sm:min-h-[80px] md:min-h-[100px] p-1 border rounded-md ${
                    isToday(day)
                      ? "bg-primary/5 border-primary"
                      : isCurrentMonth(day)
                        ? "bg-card"
                        : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  <div className="text-right text-xs p-1">{day.getDate()}</div>

                  <div className="space-y-1 mt-1">
                    {dayContests.slice(0, isMobile ? 1 : isTablet ? 2 : 3).map((contest) => {
                      const isPast = contest.isPast
                      const isBookmarked = bookmarkedContests.includes(contest.id)
                      const hasSolution = getSolutionLink(contest.id) !== null

                      return (
                        <div
                          key={contest.id}
                          onClick={() => handleContestClick(contest)}
                          className={`
                            text-xs p-1 rounded cursor-pointer truncate
                            ${isPast ? "bg-muted" : "bg-primary/10"}
                            ${isBookmarked ? "border-l-2 border-l-yellow-400" : ""}
                            hover:bg-primary/20 transition-colors
                          `}
                        >
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="h-3 px-1 text-[0.6rem] whitespace-nowrap">
                              {isMobile ? contest.platform.substring(0, 3) : contest.platform}
                            </Badge>
                            {hasSolution && <span className="text-red-500 text-[0.6rem]">•</span>}
                          </div>
                          {!isMobile && (
                            <div className="truncate" title={contest.title}>
                              {contest.title}
                            </div>
                          )}
                        </div>
                      )
                    })}

                    {dayContests.length > (isMobile ? 1 : isTablet ? 2 : 3) && (
                      <div className="text-xs text-center text-muted-foreground">
                        +{dayContests.length - (isMobile ? 1 : isTablet ? 2 : 3)} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Contest details dialog */}
      {selectedContest && (
        <ContestDialog
          contest={selectedContest}
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          isBookmarked={bookmarkedContests.includes(selectedContest.id)}
          onToggleBookmark={() => onToggleBookmark(selectedContest.id)}
          solutionLink={getSolutionLink(selectedContest.id)}
          onSolutionFound={onSolutionFound}
        />
      )}
    </div>
  )
}

