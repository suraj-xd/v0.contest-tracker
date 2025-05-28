// Creating a new search component that uses command+K
"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Clock, Bookmark, ExternalLink } from "lucide-react"
import type { Contest } from "@/types/contest"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { getPlatformIcon } from "@/lib/platform-service"
import Image from "next/image"

interface CommandSearchProps {
  contests: Contest[]
  bookmarkedContests: string[]
}

export default function CommandSearch({ contests, bookmarkedContests }: CommandSearchProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Setup keyboard shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-3xl">
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search contests, platforms..." />
            <CommandList className="max-h-[70vh] overflow-y-auto">
              <CommandEmpty>No contests found.</CommandEmpty>
              <CommandGroup heading="Upcoming Contests">
                {contests
                  .filter((contest) => !contest.isPast)
                  .slice(0, 10)
                  .map((contest) => (
                    <CommandItem
                      key={contest.id}
                      onSelect={() => {
                        window.open(contest.url, "_blank")
                        setOpen(false)
                      }}
                      className="flex items-start gap-2 p-2"
                    >
                      <div className="flex-shrink-0 w-6 h-6 mt-1">
                        <Image
                          src={getPlatformIcon(contest.platform) || "/placeholder.svg"}
                          alt={contest.platform}
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="font-medium truncate group-hover:text-primary">{contest.title}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatDate(contest.startTime)}</span>
                          </div>
                          {bookmarkedContests.includes(contest.id) && (
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Bookmark className="h-3 w-3 fill-yellow-500" />
                              <span>Bookmarked</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground mt-1" />
                    </CommandItem>
                  ))}
              </CommandGroup>

              <CommandGroup heading="Recent Contests">
                {contests
                  .filter((contest) => contest.isPast)
                  .slice(0, 5)
                  .map((contest) => (
                    <CommandItem
                      key={contest.id}
                      onSelect={() => {
                        window.open(contest.url, "_blank")
                        setOpen(false)
                      }}
                      className="flex items-start gap-2 p-2"
                    >
                      <div className="flex-shrink-0 w-6 h-6 mt-1">
                        <Image
                          src={getPlatformIcon(contest.platform) || "/placeholder.svg"}
                          alt={contest.platform}
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="font-medium truncate">{contest.title}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            Past
                          </Badge>
                          <span>{formatDate(contest.startTime)}</span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground mt-1" />
                    </CommandItem>
                  ))}
              </CommandGroup>

              <CommandGroup heading="Bookmarked">
                {contests
                  .filter((contest) => bookmarkedContests.includes(contest.id))
                  .slice(0, 5)
                  .map((contest) => (
                    <CommandItem
                      key={contest.id}
                      onSelect={() => {
                        window.open(contest.url, "_blank")
                        setOpen(false)
                      }}
                      className="flex items-start gap-2 p-2"
                    >
                      <div className="flex-shrink-0 w-6 h-6 mt-1">
                        <Image
                          src={getPlatformIcon(contest.platform) || "/placeholder.svg"}
                          alt={contest.platform}
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="font-medium truncate">{contest.title}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Bookmark className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span>{contest.isPast ? "Past" : "Upcoming"}</span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground mt-1" />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}

