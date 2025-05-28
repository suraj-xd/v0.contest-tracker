"use client"

import type React from "react"

import { useState } from "react"
import type { Contest } from "@/types/contest"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface SolutionLinkFormProps {
  contests: Contest[]
  onSubmit: (contestId: string, youtubeUrl: string) => void
  onCancel: () => void
}

export default function SolutionLinkForm({ contests, onSubmit, onCancel }: SolutionLinkFormProps) {
  const [contestId, setContestId] = useState<string>("")
  const [youtubeUrl, setYoutubeUrl] = useState<string>("")
  const [urlError, setUrlError] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Filter contests based on search query
  const filteredContests = contests.filter((contest) => {
    const query = searchQuery.toLowerCase()
    return (
      contest.title.toLowerCase().includes(query) ||
      contest.platform.toLowerCase().includes(query) ||
      new Date(contest.startTime).toLocaleDateString().includes(query)
    )
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (contestId && youtubeUrl && isValidYoutubeUrl(youtubeUrl)) {
      onSubmit(contestId, youtubeUrl)
    }
  }

  // Validate YouTube URL (basic validation)
  const isValidYoutubeUrl = (url: string) => {
    return url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.*$/i)
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setYoutubeUrl(url)

    if (url && !isValidYoutubeUrl(url)) {
      setUrlError("Please enter a valid YouTube URL")
    } else {
      setUrlError("")
    }
  }

  // Format contest date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Format contest title for mobile
  const formatTitle = (platform: string, title: string) => {
    if (isMobile && title.length > 30) {
      return `${platform}: ${title.substring(0, 27)}...`
    }
    return `${platform}: ${title}`
  }

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[550px] w-[95vw] max-w-[95vw] sm:w-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl sm:text-2xl">Add YouTube Solution</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="contest-select" className="font-medium">
              Select Contest
            </Label>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                  {contestId
                    ? formatTitle(
                        contests.find((contest) => contest.id === contestId)?.platform || "",
                        contests.find((contest) => contest.id === contestId)?.title || "",
                      )
                    : "Select a contest"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[calc(95vw-2rem)] sm:w-[550px] p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search contests..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    className="h-9"
                  />
                  <CommandList className="max-h-[40vh] sm:max-h-[300px] overflow-auto">
                    <CommandEmpty>No contests found.</CommandEmpty>
                    <CommandGroup>
                      {filteredContests.map((contest) => (
                        <CommandItem
                          key={contest.id}
                          value={contest.id}
                          onSelect={() => {
                            setContestId(contest.id)
                            setOpen(false)
                          }}
                          className="flex items-center justify-between py-3"
                        >
                          <div className="flex flex-col truncate pr-2">
                            <span className="font-medium truncate">{formatTitle(contest.platform, contest.title)}</span>
                            <span className="text-xs text-muted-foreground">{formatDate(contest.startTime)}</span>
                          </div>
                          {contestId === contest.id && <Check className="h-4 w-4 text-primary flex-shrink-0" />}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube-url" className="font-medium">
              YouTube URL
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="youtube-url"
                type="url"
                value={youtubeUrl}
                onChange={handleUrlChange}
                placeholder="https://www.youtube.com/watch?v=..."
                className="pl-10"
              />
            </div>
            {urlError && <p className="text-sm text-destructive">{urlError}</p>}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" disabled={!contestId || !youtubeUrl || !!urlError} className="w-full sm:w-auto">
              Add Solution Link
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

