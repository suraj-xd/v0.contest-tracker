"use client"

import { useState } from "react"
import type { Contest } from "@/types/contest"
import { searchYouTubeSolutions } from "@/lib/youtube-service"
import { Button } from "@/components/ui/button"
import { YoutubeIcon, Search, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AutoSolutionFinderProps {
  contest: Contest
  onSolutionFound: (contestId: string, youtubeUrl: string) => void
}

export default function AutoSolutionFinder({ contest, onSolutionFound }: AutoSolutionFinderProps) {
  const [isSearching, setIsSearching] = useState(false)
  const [searchUrl, setSearchUrl] = useState<string | null>(null)

  const handleFindSolution = async () => {
    setIsSearching(true)
    try {
      const url = await searchYouTubeSolutions(contest)
      setSearchUrl(url)
    } catch (error) {
      console.error("Error finding solution:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="mt-4">
      {!searchUrl ? (
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center gap-2"
          onClick={handleFindSolution}
          disabled={isSearching}
        >
          {isSearching ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              Searching YouTube...
            </div>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Find Solution on YouTube
            </>
          )}
        </Button>
      ) : (
        <Card className="bg-muted/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-sm">
              <YoutubeIcon className="h-5 w-5 text-red-600" />
              <span>YouTube search results ready</span>
            </div>
            <div className="mt-2">
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm flex items-center gap-1"
              >
                View search results <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

