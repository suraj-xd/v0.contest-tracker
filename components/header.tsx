"use client"
import { Info } from "lucide-react"
import AppLogo from "./app-logo"
import { ThemeToggle } from "./theme-toggle"
import CmdButton from "./cmd-button"
import SearchBar from "./search-bar"
import Link from "next/link"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import NotificationButton from "./notification-button"
import { useMediaQuery } from "@/hooks/use-media-query"

interface HeaderProps {
  onSearch: (query: string) => void
  upcomingContests: any[]
}

export default function Header({ onSearch, upcomingContests }: HeaderProps) {
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center justify-between">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <AppLogo className="font-heading" />
            <div className="flex items-center gap-2 sm:hidden">
              <CmdButton />
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-2 order-3 sm:order-2">
            <div className="w-full sm:w-auto">
              <SearchBar onSearch={onSearch} />
            </div>

            {!isMobile && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/about">
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <Info className="h-5 w-5" />
                          <span className="sr-only">About</span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>About Contest Tracker</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <CmdButton />
                <ThemeToggle />
              </>
            )}

            <NotificationButton upcomingContests={upcomingContests} />
          </div>
        </div>
      </div>
    </header>
  )
}

