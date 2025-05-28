"use client"

import type { Contest, SolutionLink } from "@/types/contest"
import ContestCard from "./contest-card"

interface ContestListProps {
  contests: Contest[]
  selectedPlatforms: string[]
  bookmarkedContests: string[]
  solutionLinks: SolutionLink[]
  onToggleBookmark: (contestId: string) => void
  onAddSolution: () => void
  onSolutionFound?: (contestId: string, youtubeUrl: string) => void
}

export default function ContestList({
  contests,
  selectedPlatforms,
  bookmarkedContests,
  solutionLinks,
  onToggleBookmark,
  onAddSolution,
  onSolutionFound,
}: ContestListProps) {
  // Filter contests based on selected platforms
  const filteredContests =
    selectedPlatforms.length === 0
      ? contests
      : contests.filter((contest) => selectedPlatforms.includes(contest.platform))

  // Separate into upcoming and past contests
  const now = new Date()
  const upcomingContests = filteredContests.filter((contest) => !contest.isPast)
  const pastContests = filteredContests.filter((contest) => contest.isPast)

  // Further filter past contests to only show last week
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const recentPastContests = pastContests.filter((contest) => contest.endTime >= oneWeekAgo)

  // Sort upcoming contests by start time
  upcomingContests.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())

  // Sort past contests by start time (most recent first)
  recentPastContests.sort((a, b) => b.startTime.getTime() - a.startTime.getTime())

  // Find solution link for a contest
  const getSolutionLink = (contestId: string) => {
    const link = solutionLinks.find((link) => link.contestId === contestId)
    return link ? link.youtubeUrl : null
  }

  return (
    <div className="space-y-10">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">Upcoming Contests</h2>
        </div>

        {upcomingContests.length === 0 ? (
          <p className="text-muted-foreground">No upcoming contests found for the selected platforms.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingContests.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                isBookmarked={bookmarkedContests.includes(contest.id)}
                onToggleBookmark={() => onToggleBookmark(contest.id)}
                showCountdown={true}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">Recent Past Contests (Last 7 Days)</h2>
          <button
            onClick={onAddSolution}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Add YouTube Solution
          </button>
        </div>

        {recentPastContests.length === 0 ? (
          <p className="text-muted-foreground">No past contests found for the selected platforms in the last week.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentPastContests.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                isBookmarked={bookmarkedContests.includes(contest.id)}
                onToggleBookmark={() => onToggleBookmark(contest.id)}
                solutionLink={getSolutionLink(contest.id)}
                onSolutionFound={onSolutionFound}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

