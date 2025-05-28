"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { Contest } from "@/types/contest"
import ContestCard from "./contest-card"
import CalendarView from "./calendar-view"
import { getSolutionLinks } from "@/lib/storage-service"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContestTabsProps {
  contests: Contest[]
  selectedPlatforms: string[]
  bookmarkedContests: string[]
  onToggleBookmark: (contestId: string) => void
  onAddSolution: () => void
  onSolutionFound?: (contestId: string, youtubeUrl: string) => void
}

export default function ContestTabs({
  contests,
  selectedPlatforms,
  bookmarkedContests,
  onToggleBookmark,
  onAddSolution,
  onSolutionFound,
}: ContestTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("upcoming")

  // Filter contests based on selected platforms
  const filteredContests =
    selectedPlatforms.length === 0
      ? contests
      : contests.filter((contest) => selectedPlatforms.includes(contest.platform))

  // Get upcoming and past contests
  const upcomingContests = filteredContests.filter((contest) => !contest.isPast)

  // Get past contests from the last week
  const now = new Date()
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const recentPastContests = filteredContests.filter((contest) => contest.isPast && contest.endTime >= oneWeekAgo)

  return (
    <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-between items-center mb-6">
        <TabsList>
          <TabsTrigger value="upcoming" className="px-6 font-heading">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="px-6 font-heading">
            Recent
          </TabsTrigger>
          <TabsTrigger value="calendar" className="px-6 font-heading">
            Calendar
          </TabsTrigger>
        </TabsList>

        {activeTab === "past" && (
          <Button
            onClick={onAddSolution}
            variant="secondary"
            size="sm"
            className="flex items-center gap-1.5 font-heading"
          >
            <Plus className="h-4 w-4" />
            Add Solution
          </Button>
        )}
      </div>

      <TabsContent value="upcoming" className="mt-0">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcomingContests.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">No upcoming contests found for the selected platforms.</p>
            </div>
          ) : (
            upcomingContests.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                isBookmarked={bookmarkedContests.includes(contest.id)}
                onToggleBookmark={() => onToggleBookmark(contest.id)}
                showCountdown={true}
              />
            ))
          )}
        </div>
      </TabsContent>

      <TabsContent value="past" className="mt-0">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentPastContests.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">
                No past contests found for the selected platforms in the last week.
              </p>
            </div>
          ) : (
            recentPastContests.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                isBookmarked={bookmarkedContests.includes(contest.id)}
                onToggleBookmark={() => onToggleBookmark(contest.id)}
                solutionLink={getSolutionLink(contest.id)}
                onSolutionFound={onSolutionFound}
              />
            ))
          )}
        </div>
      </TabsContent>

      <TabsContent value="calendar" className="mt-0">
        <CalendarView
          contests={filteredContests}
          selectedPlatforms={selectedPlatforms}
          bookmarkedContests={bookmarkedContests}
          onToggleBookmark={onToggleBookmark}
          solutionLinks={getSolutionLinks()}
          onSolutionFound={onSolutionFound}
        />
      </TabsContent>
    </Tabs>
  )

  // Helper function to get solution link for a contest
  function getSolutionLink(contestId: string) {
    const solutionLinks = getSolutionLinks()
    const link = solutionLinks.find((link) => link.contestId === contestId)
    return link ? link.youtubeUrl : null
  }
}

