"use client"

import { useState, useEffect } from "react"
import { fetchContests } from "@/lib/contest-service"
import {
  getBookmarkedContests,
  toggleBookmarkedContest,
  getSelectedPlatforms,
  setSelectedPlatforms,
  addSolutionLink,
} from "@/lib/storage-service"
import SolutionLinkForm from "@/components/solution-link-form"
import SearchBar from "@/components/search-bar"
import NotificationButton from "@/components/notification-button"
import CmdButton from "@/components/cmd-button"
import CommandSearch from "@/app/search"
import { ThemeToggle } from "@/components/theme-toggle"
import AppLogo from "@/components/app-logo"
import Footer from "@/components/footer"
import PlatformFilter from "@/components/platform-filter"
import ContestTabs from "@/components/contest-tabs"
import type { Contest } from "@/types/contest"

export default function ContestTracker() {
  const [contests, setContests] = useState<Contest[]>([])
  const [filteredContests, setFilteredContests] = useState<Contest[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPlatforms, setSelectedPlatformsState] = useState<string[]>(getSelectedPlatforms())
  const [bookmarkedContests, setBookmarkedContests] = useState<string[]>(getBookmarkedContests())
  const [showSolutionForm, setShowSolutionForm] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Function to update selected platforms
  const updateSelectedPlatforms = (platforms: string[]) => {
    setSelectedPlatformsState(platforms)
    setSelectedPlatforms(platforms)
  }

  // Function to toggle bookmark status
  const handleToggleBookmark = (contestId: string) => {
    const updated = toggleBookmarkedContest(contestId)
    setBookmarkedContests(updated)
  }

  // Function to handle solution link addition
  const handleAddSolutionLink = (contestId: string, youtubeUrl: string) => {
    addSolutionLink(contestId, youtubeUrl)
    setShowSolutionForm(false)
  }

  // Function to handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Fetch contests on component mount
  useEffect(() => {
    const loadContests = async () => {
      try {
        setLoading(true)
        const contestData = await fetchContests()
        setContests(contestData)
        setFilteredContests(contestData)
        setError(null)
      } catch (err) {
        setError("Failed to load contests. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadContests()
  }, [])

  // Filter contests based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredContests(contests)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = contests.filter(
      (contest) => contest.title.toLowerCase().includes(query) || contest.platform.toLowerCase().includes(query),
    )
    setFilteredContests(filtered)
  }, [searchQuery, contests])

  // Get all unique platforms from contests
  const allPlatforms = Array.from(new Set(contests.map((contest) => contest.platform)))

  // Get upcoming contests for notifications
  const upcomingContests = contests.filter((contest) => !contest.isPast)

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl fade-in-animation min-h-screen flex flex-col">
      {/* Header with logo, search, cmd+k, theme toggle */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <AppLogo />
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:w-64">
              <SearchBar onSearch={handleSearch} />
            </div>
            <CmdButton />
            <ThemeToggle />
            <NotificationButton upcomingContests={upcomingContests} />
          </div>
        </div>

        {/* Platform filter */}
        <div className="mb-6">
          <PlatformFilter
            platforms={allPlatforms}
            selectedPlatforms={selectedPlatforms}
            onTogglePlatform={(platform) => {
              const newSelection = selectedPlatforms.includes(platform)
                ? selectedPlatforms.filter((p) => p !== platform)
                : [...selectedPlatforms, platform]
              updateSelectedPlatforms(newSelection)
            }}
          />
        </div>
      </header>

      {/* Command search - accessible via Cmd+K */}
      <CommandSearch contests={contests} bookmarkedContests={bookmarkedContests} />

      <main className="flex-1">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-muted-foreground">Loading contests...</div>
          </div>
        ) : error ? (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">{error}</div>
        ) : (
          <>
            <ContestTabs
              contests={filteredContests}
              selectedPlatforms={selectedPlatforms}
              bookmarkedContests={bookmarkedContests}
              onToggleBookmark={handleToggleBookmark}
              onAddSolution={() => setShowSolutionForm(true)}
              onSolutionFound={handleAddSolutionLink}
            />

            {showSolutionForm && (
              <SolutionLinkForm
                contests={contests.filter((c) => c.isPast)}
                onSubmit={handleAddSolutionLink}
                onCancel={() => setShowSolutionForm(false)}
              />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

